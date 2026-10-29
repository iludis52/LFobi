import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/thoma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
process.env.CODE_PREVIEW_PORT = '5207';
const { server } = await import('./preview-model-monitor.mjs');
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:5207');
  await page.waitForFunction(() => !document.getElementById('next').disabled);
  await page.locator('#chapter').selectOption('4');
  await page.locator('#learning-objective').selectOption('map-record');
  for (const language of ['python', 'javascript']) {
    await page.locator('#language').selectOption(language);
    await page.locator('#selection-apply').click();
    for (let i = 0; i < 6; i++) {
      await page.waitForFunction(() => !document.getElementById('next').disabled);
      if (await page.locator('#task-type').innerText() === 'Alle richtigen wählen') break;
      await page.locator('#next').click();
    }
    assert.equal(await page.locator('#task-type').innerText(), 'Alle richtigen wählen');
    const text = await page.locator('#answer-fields').innerText();
    assert.match(text, /Nach Zeile \d+ hat \w+ den Wert/);
    assert.doesNotMatch(text, /Bereich|main|Ausführung|#\d/);
    if (language === 'python') await page.screenshot({ path: 'specs/assets/verstaendliche-aufgabentexte.png', fullPage: true });
  }
  assert.deepEqual(errors, []);
  console.log('Task wording browser checks passed for Python and JavaScript.');
} finally { await browser.close(); server.close(); }
