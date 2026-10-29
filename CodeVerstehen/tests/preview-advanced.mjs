import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/thoma/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge'});
process.env.CODE_PREVIEW_PORT='5205';const {server}=await import('./preview-model-monitor.mjs');
try {
  const page=await browser.newPage({viewport:{width:1280,height:720}}),errors=[],overflow=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.addInitScript(()=>{Math.random=()=>0.37;});
  await page.goto('http://127.0.0.1:5205');
  const ready=()=>page.waitForFunction(()=>!document.getElementById('next').disabled);
  await ready();assert.equal(await page.locator('#chapter option').count(),5);
  await mkdir('specs/assets',{recursive:true});let submitted=0;
  for(const language of ['python','javascript']) for(const chapter of ['3','4','5']) {
    await page.locator('#chapter').selectOption(chapter);
    let topics=await page.locator('#learning-objective option').evaluateAll(options=>options.map(option=>option.value));
    assert.equal(topics.length,6);
    if(chapter==='3')topics=topics.filter(topic=>['loop-break','loop-continue'].includes(topic));
    for(const topic of topics) for(const difficulty of [1,2,3]) {
      await page.locator('#language').selectOption(language);await page.locator('#learning-objective').selectOption(topic);
      while(await page.locator('#difficulty').getAttribute('value')!==String(difficulty))await page.locator('#difficulty').click();
      if(!await page.locator('#selection-apply').isDisabled()){await page.locator('#selection-apply').click();await ready();}
      const forms=new Set();let previous;
      for(let i=0;i<5;i++) {
        const type=await page.locator('#task-type').innerText();assert.notEqual(type,previous);previous=type;forms.add(type);
        const layout=await page.locator('#task-card').evaluate(card=>({overflow:card.scrollHeight-card.clientHeight,next:document.getElementById('next').getBoundingClientRect().bottom}));
        if(layout.overflow>1) {
          overflow.push({chapter,topic,difficulty,language,type,...layout});
          if(overflow.length<=4)await page.screenshot({path:`specs/assets/advanced-overflow-${overflow.length}.png`,fullPage:true});
        }
        assert.ok(layout.next<=720);
        if(i===0&&difficulty===2&&language==='python')await page.screenshot({path:`specs/assets/kapitel-${chapter}-${topic}.png`,fullPage:true});
        await page.locator('#answer-fields select').evaluateAll(selects=>selects.forEach(select=>{select.value=select.options[1].value;}));
        const choices=page.locator('#answer-fields input');if(await choices.count())await choices.first().check();
        await page.locator('#submit').click();submitted++;
        assert.equal(await page.locator('#feedback').isVisible(),true);
        assert.match(await page.locator('#progress').innerText(),new RegExp(`^${submitted}Abgaben`));
        if(i===0) {
          await page.locator('#feedback details').last().locator('summary').click();
          assert.ok((await page.locator('.trace-table th').allTextContents()).includes('Bereich'));
          assert.ok((await page.locator('.trace-table th').allTextContents()).includes('Rückgabewert'));
          assert.equal(await page.locator('.trace-table').innerText().then(text=>text.includes('[object Object]')),false);
          if(topic==='function-scope'&&language==='python'&&difficulty===2)await page.screenshot({path:'specs/assets/kapitel-5-ablauf.png',fullPage:true});
        }
        if(i<4){await page.locator('#next').click();await ready();}
      }
      assert.equal(forms.size,5);
    }
    console.log(language,chapter,submitted,'submissions');
  }
  console.log('Overflow',JSON.stringify(overflow));assert.deepEqual(overflow,[]);
  await page.locator('#teacher-open').click();
  const downloadEvent=page.waitForEvent('download');await page.locator('#export').click();const download=await downloadEvent;
  const stream=await download.createReadStream();let data='';for await(const part of stream)data+=part;
  const exported=JSON.parse(data);assert.equal(exported.records.length,420);assert.ok(exported.records.some(record=>record.chapter===5));
  await page.locator('#import').setInputFiles({name:'user-tests.json',mimeType:'application/json',buffer:Buffer.from(data)});
  await page.waitForFunction(()=>document.getElementById('teacher-status').textContent.startsWith('0 neue Abgaben'));
  await page.reload();await ready();assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('code-verstehen-v2')).records.length),420);
  await page.locator('#teacher-open').click();const summary=await page.locator('#level-summary').innerText();assert.match(summary,/Kapitel 4/);assert.match(summary,/Kapitel 5/);
  await page.locator('#teacher-close').click();await page.locator('#chapter').selectOption('5');
  await page.locator('#learning-objective').selectOption('function-return');await page.locator('#selection-apply').click();await ready();
  await page.setViewportSize({width:390,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:'specs/assets/kapitel-5-mobil.png',fullPage:true});
  assert.deepEqual(errors,[]);console.log('420 browser submissions passed; chapter selection, all forms, scopes, export/import, persistence and mobile width verified.');
} finally {await browser.close();server.close();}
