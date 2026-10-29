import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/thoma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
process.env.CODE_PREVIEW_PORT = '5206';
const { server } = await import('./preview-model-monitor.mjs');
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  let release, explanationCalls = 0;
  const gate = new Promise(resolve => { release = resolve; });
  await page.route('**/v1/chat/completions', async route => {
    const data = route.request().postDataJSON(), system = data.messages[0].content;
    let content;
    if (system.includes('Write friendly German feedback')) {
      explanationCalls++;
      if (explanationCalls === 1) await gate;
      content = JSON.stringify({ explanation: 'Prüfe den Wert nach jeder ausgeführten Zuweisung. Eine Ausgabe verändert diesen Wert nicht.' });
    } else {
      const input = JSON.parse(data.messages[1].content);
      if (input.catalog) content = JSON.stringify({ skill_id: input.catalog[0].name });
      else {
        const t = input.templates[0];
        content = JSON.stringify({ template_id: t.id, parameters: Object.fromEntries(Object.entries(t.parameter_ranges).map(([k, [min]]) => [k, min])) });
      }
    }
    await route.fulfill({ contentType: 'application/json', body: JSON.stringify({ choices: [{ message: { content } }], usage: { prompt_tokens: 50, completion_tokens: 20, total_tokens: 70 } }) });
  });
  await page.goto('http://127.0.0.1:5206');
  await page.waitForFunction(() => !document.getElementById('next').disabled);
  assert.equal(await page.locator('#short-explanation').isVisible(), false);
  // Select answers from the rendered controls, independent of shuffled forms.
  const submit = async () => {
    await page.locator('#answer-fields select').evaluateAll(selects => selects.forEach(select => { select.value = select.options[1].value; }));
    const choices = page.locator('#answer-fields input');
    if (await choices.count()) await choices.first().check();
    await page.locator('#submit').click();
    await page.waitForFunction(() => !document.getElementById('next').disabled);
  };
  await page.locator('#settings-open').click();
  await page.locator('#provider').selectOption('lmstudio');
  await page.locator('#base-url').fill('http://127.0.0.1:5206/v1');
  await page.locator('#model').fill('adaptive-mock');
  await page.locator('#settings-form button[type=submit]').click();
  const firstRequest = page.waitForRequest(request => request.url().includes('/chat/completions') && request.postDataJSON().messages[0].content.includes('Write friendly German feedback'));
  await submit(); await firstRequest;
  assert.match(await page.locator('#short-explanation').innerText(), /Geprüfte Rückmeldung/);
  assert.equal(await page.locator('#next').isEnabled(), true);
  await page.locator('#next').click();
  await page.waitForFunction(() => !document.getElementById('next').disabled);
  const firstResponse = page.waitForResponse(response => response.request().postDataJSON()?.messages?.[0]?.content.includes('Write friendly German feedback'));
  release(); await firstResponse;
  assert.equal(await page.locator('#short-explanation').isVisible(), false, 'Late result cannot expose an explanation on a fresh task');
  await submit();
  await page.waitForFunction(() => document.getElementById('short-explanation').textContent.includes('KI-Kurzerklärung'));
  assert.equal(explanationCalls, 2);
  for (const viewport of [{ width: 1280, height: 720 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    const layout = await page.evaluate(() => {
      const code = document.getElementById('code').getBoundingClientRect();
      const explanation = document.getElementById('short-explanation').getBoundingClientRect();
      return { width: document.documentElement.scrollWidth, codeBottom: code.bottom, explanationTop: explanation.top,
        color: getComputedStyle(document.getElementById('short-explanation')).color };
    });
    assert.ok(layout.width <= viewport.width);
    assert.ok(layout.explanationTop >= layout.codeBottom - 1);
    assert.equal(layout.color, 'rgb(36, 98, 71)');
    await page.locator('#short-explanation').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `specs/assets/adaptive-${viewport.width}.png`, fullPage: true });
  }
  await page.locator('#token-details-open').click();
  assert.match(await page.locator('#token-requests').innerText(), /Kurzerklärung zur Antwort/);
  await page.locator('#token-details-close').click();
  await page.locator('#learning-reset').click();
  assert.match(await page.locator('#adaptation-note').innerText(), /zurückgesetzt/);
  await page.reload();
  await page.waitForFunction(() => !document.getElementById('next').disabled);
  assert.equal(await page.locator('#short-explanation').isVisible(), false);
  assert.deepEqual(errors, []);
  console.log('Adaptive browser checks passed: immediate fallback, late response, model explanation, token log, reset, desktop/mobile.');
} finally { await browser.close(); server.close(); }
