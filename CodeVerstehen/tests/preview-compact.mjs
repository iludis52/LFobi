import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/thoma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
process.env.CODE_PREVIEW_PORT = '5203';
const { server } = await import('./preview-model-monitor.mjs');
try {
const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
const errors = []; page.on('pageerror', error => errors.push(error.message));
await page.goto('http://127.0.0.1:5203');
await page.waitForFunction(() => !document.getElementById('next').disabled);
await mkdir('specs/assets', { recursive: true });
for (const size of [{width:1366,height:768}, {width:1280,height:720}, {width:1920,height:1080}, {width:390,height:844}]) {
  await page.setViewportSize(size);
  await page.screenshot({ path: `specs/assets/compact-${size.width}.png`, fullPage: true });
  const layout = await page.evaluate(() => {
    const header = document.querySelector('.topbar'), next = document.getElementById('next').getBoundingClientRect();
    const card = document.getElementById('task-card'), chapter = document.getElementById('chapter-content');
    return { headerHeight: header.clientHeight, headerScroll: header.scrollWidth > header.clientWidth,
      pageWidth: document.documentElement.scrollWidth, pageHeight: document.documentElement.scrollHeight,
      nextBottom: next.bottom, cardScroll: card.scrollHeight > card.clientHeight, chapterScroll: chapter.scrollHeight > chapter.clientHeight };
  });
  console.log(size, layout);
  assert.ok(layout.pageWidth <= size.width);
  assert.ok(layout.headerHeight <= 65);
  if (size.width >= 1000) {
    assert.ok(layout.pageHeight <= size.height);
    assert.ok(layout.nextBottom <= size.height);
    assert.equal(layout.cardScroll, false);
  }
}
await page.setViewportSize({ width:1366,height:768 });
await page.getByRole('button', { name: /Schwierigkeit 1 von 3/ }).click();
assert.equal(await page.locator('#difficulty').innerText(), '2/3');
await page.locator('#selection-apply').click();
await page.waitForFunction(() => !document.getElementById('next').disabled);
assert.match(await page.locator('#task-difficulty').innerText(), /^2/);
const types = [];
for (let i = 0; i < 10; i++) {
  const type = await page.locator('#task-type').innerText();
  assert.notEqual(type, types.at(-1)); types.push(type);
  await page.locator('#answer-fields select').evaluateAll(selects => selects.forEach(select => { select.value = select.options[1].value; }));
  const choices = page.locator('#answer-fields input');
  if (await choices.count()) await choices.first().check();
  await page.locator('#submit').click();
  assert.equal(await page.locator('#feedback').isVisible(), true);
  assert.match(await page.locator('#progress').innerText(), new RegExp(`^${i + 1}Abgaben`));
  await page.locator('#next').click();
  await page.waitForFunction(() => !document.getElementById('next').disabled);
}
assert.ok(new Set(types).size >= 5);
await page.locator('#language').selectOption('javascript');
await page.locator('#selection-apply').click();
await page.waitForFunction(() => !document.getElementById('next').disabled);
assert.equal(await page.locator('#lab-language').innerText(), 'JavaScript');
await page.locator('#teacher-open').click();
assert.equal(await page.locator('#teacher').evaluate(node => node.open), true);
await page.locator('#teacher-close').click();
await page.screenshot({ path:'specs/assets/compact-javascript.png', fullPage:true });
// Inspect the longer references as well as the compact startup task.
await page.setViewportSize({ width:1280,height:720 });
const overflow = [];
for (const chapter of ['1', '2', '3']) {
  await page.locator('#chapter').selectOption(chapter);
  const objectives = await page.locator('#learning-objective option').evaluateAll(options => options.map(option => option.value));
  for (const objective of objectives) for (const level of [1, 2, 3]) {
    await page.locator('#learning-objective').selectOption(objective);
    while (await page.locator('#difficulty').getAttribute('value') !== String(level)) await page.locator('#difficulty').click();
    if (!await page.locator('#selection-apply').isDisabled()) await page.locator('#selection-apply').click();
    for (let i = 0; i < 5; i++) {
      await page.waitForFunction(() => !document.getElementById('next').disabled);
      const layout = await page.locator('#task-card').evaluate(card => ({ height:card.clientHeight, overflow:card.scrollHeight-card.clientHeight }));
      if (layout.overflow > 1) {
        overflow.push({chapter,objective,level,type:await page.locator('#task-type').innerText(), ...layout});
        await page.screenshot({path:`specs/assets/overflow-${chapter}-${objective}-${level}.png`,fullPage:true});
      }
      await page.locator('#next').click();
    }
  }
}
console.log('Long-reference overflow at 1280×720:', JSON.stringify(overflow));
assert.deepEqual(overflow, []);
await page.screenshot({ path:'specs/assets/compact-programmvergleich.png', fullPage:true });
assert.deepEqual(errors, []);
console.log('Browser checks passed', types);
} finally { await browser.close(); server.close(); }
