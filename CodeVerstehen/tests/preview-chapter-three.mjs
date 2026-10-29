import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/thoma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge'});
process.env.CODE_PREVIEW_PORT='5204';
const {server}=await import('./preview-model-monitor.mjs');
try {
  const page=await browser.newPage({viewport:{width:1280,height:720}}),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.addInitScript(()=>{Math.random=()=>0.51;});
  await page.goto('http://127.0.0.1:5204');
  const ready=()=>page.waitForFunction(()=>!document.getElementById('next').disabled);
  await ready();
  assert.equal(await page.locator('#chapter option').count(),5);
  await page.locator('#chapter').selectOption('3');
  assert.equal(await page.locator('#learning-objective option').count(),6);
  await page.locator('#selection-apply').click(); await ready();
  assert.match(await page.locator('#chapter-eyebrow').innerText(),/03.*WIEDERHOLUNGEN/);
  const topics=await page.locator('#learning-objective option').evaluateAll(options=>options.map(option=>option.value).filter(value=>!['loop-break','loop-continue'].includes(value)));
  await mkdir('specs/assets',{recursive:true});
  let submitted=0;
  for(const language of ['python','javascript']) for(const topic of topics) for(const difficulty of [1,2,3]) {
    await page.locator('#language').selectOption(language);
    await page.locator('#learning-objective').selectOption(topic);
    while(await page.locator('#difficulty').getAttribute('value')!==String(difficulty)) await page.locator('#difficulty').click();
    if(!await page.locator('#selection-apply').isDisabled()) {await page.locator('#selection-apply').click();await ready();}
    const forms=new Set(); let last;
    for(let i=0;i<5;i++) {
      const type=await page.locator('#task-type').innerText(); assert.notEqual(type,last); last=type;forms.add(type);
      const layout=await page.locator('#task-card').evaluate(card=>({overflow:card.scrollHeight-card.clientHeight,next:document.getElementById('next').getBoundingClientRect().bottom}));
      assert.ok(layout.overflow<=1,`${language}/${topic}/${difficulty}/${type}: overflow ${layout.overflow}`);
      assert.ok(layout.next<=720);
      if(i===0 && language==='python' && difficulty===2) await page.screenshot({path:`specs/assets/kapitel-3-${topic}.png`,fullPage:true});
      await page.locator('#answer-fields select').evaluateAll(selects=>selects.forEach(select=>{select.value=select.options[1].value;}));
      const choices=page.locator('#answer-fields input');if(await choices.count()) await choices.first().check();
      await page.locator('#submit').click();submitted++;
      assert.equal(await page.locator('#feedback').isVisible(),true);
      assert.match(await page.locator('#progress').innerText(),new RegExp(`^${submitted}Abgaben`));
      if(i===0) {
        await page.locator('#feedback details').last().locator('summary').click();
        const headings=await page.locator('.trace-table th').allTextContents();
        assert.ok(headings.includes('Ausführung'));assert.ok(headings.includes('Runde'));
        assert.ok(await page.locator('.trace-table tbody tr').count()>0);
      }
      if(i<4) {await page.locator('#next').click();await ready();}
    }
    assert.equal(forms.size,5);
  }
  await page.locator('#teacher-open').click();
  assert.match(await page.locator('#level-summary').innerText(),/Kapitel 3/);
  const downloadEvent=page.waitForEvent('download');await page.locator('#export').click();
  const download=await downloadEvent;
  const stream=await download.createReadStream();let text='';for await(const part of stream) text+=part;
  const exported=JSON.parse(text);assert.equal(exported.records.length,120);
  assert.ok(exported.records.every(record=>record.chapter===3));
  await page.locator('#import').setInputFiles({name:'kapitel-3.json',mimeType:'application/json',buffer:Buffer.from(text)});
  await page.waitForFunction(()=>document.getElementById('teacher-status').textContent.startsWith('0 neue Abgaben'));
  assert.match(await page.locator('#teacher-status').innerText(),/0 neue Abgaben/);
  await page.locator('#teacher-close').click();
  // Verify saved chapter-three records survive a real reload and are included.
  await page.reload();await ready();await page.locator('#teacher-open').click();
  assert.match(await page.locator('#level-summary').innerText(),/Kapitel 3/);
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('code-verstehen-v2')).records.length),120);
  await page.locator('#teacher-close').click();
  await page.locator('#chapter').selectOption('3');
  await page.locator('#learning-objective').selectOption('loop-change');
  await page.locator('#selection-apply').click();await ready();
  await page.setViewportSize({width:390,height:844});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:'specs/assets/kapitel-3-mobil.png',fullPage:true});
  assert.deepEqual(errors,[]);
  console.log('Chapter 3 browser: 120 submissions, all topics/levels/forms in both languages; no task overflow at 1280×720; trace, export/import and reload verified.');
} finally {await browser.close();server.close();}
