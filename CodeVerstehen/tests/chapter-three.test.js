import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import vm from 'node:vm';
import { loadCatalog, createRuntime } from '../runtime.js';
import { buildTask, evaluate, publicTask, parseSkill } from '../task-engine.js';
import { parameterVariants } from '../chapter-one.js';
import { applyInteractionForm, mixedForms } from '../interaction-forms.js';
import { referenceAnswer } from './task-answer.js';

const catalog = await loadCatalog(async url => new Response(await readFile(url,'utf8')));
const families = catalog.families.filter(family => family.metadata.chapter === 3 && !['loop-break','loop-continue'].includes(family.metadata.learning_objective));

// Execute the actual displayed JS, independently of the loop-plan interpreter.
// Instrument source statements and header checks to compare every visit/state.
function execute(code) {
  const visits = [], outputs = [], groups = []; let segment = [], names = new Set(), loopName;
  const snapshot = () => `{${[...names].join(',')}}`;
  const flush = () => {
    if (!segment.length) return;
    const own = [];
    const context = vm.createContext({
      tap: (line, variables, condition = null, output = '') => visits.push({line,variables,condition,output}),
      check: (line, condition, variables) => { visits.push({line,variables,condition,output:''}); return condition; },
      emit: (line, value, variables) => { own.push(value); outputs.push(value); visits.push({line,variables,condition:null,output:String(value)}); }
    });
    vm.runInContext(segment.join('\n'), context, {timeout:100});
    groups.push(own); segment = []; names = new Set(); loopName = undefined;
  };
  code.forEach((source,index) => {
    const text = source.trim(), line = index + 1;
    if (text.startsWith('//')) { flush(); return; }
    if (text.startsWith('for (')) {
      loopName = text.match(/for \(let (\w+)/)[1]; names.add(loopName);
      segment.push(source.replace(/; (.*?);/, `; check(${line}, $1, ${snapshot()});`));
    } else if (text.startsWith('while (')) {
      segment.push(source.replace(/while \((.*)\)/, `while (check(${line}, $1, ${snapshot()}))`));
    } else if (text === '}') {
      segment.push(source); if (loopName) { names.delete(loopName); loopName = undefined; }
    } else if (text.startsWith('console.log(')) {
      segment.push(source.replace(/console.log\((.*)\);/, `emit(${line}, $1, ${snapshot()});`));
    } else {
      const declared = text.match(/^let (\w+)/); if (declared) names.add(declared[1]);
      segment.push(`${source}\ntap(${line},${snapshot()});`);
    }
  });
  flush();
  return {visits:JSON.parse(JSON.stringify(visits)),outputs,groups};
}

test('Chapter 3: twelve authored references agree in both languages, including outputs and loop counts', async () => {
  assert.equal(families.length,4); let checked = 0;
  for (const family of families) {
    const references = JSON.parse(await readFile(new URL(`../skills/${family.metadata.name}/examples.json`,import.meta.url),'utf8'));
    for (const reference of references.cases) for (const language of ['python','javascript']) {
      const task = buildTask({template_id:reference.template_id,parameters:reference.parameters},family.templates,language);
      assert.deepEqual(task.solution.gaps,reference.gaps);
      assert.deepEqual(task.trace.filter(step=>step.output!=='').map(step=>Number(step.output)),reference.outputs);
      const programs = [...new Set(task.trace.map(step=>step.program))];
      const counts = programs.map(program=>task.trace.filter(step=>step.program===program && step.condition===true).length);
      assert.deepEqual(counts,reference.iterations);
      assert.equal(evaluate(task,task.solution).correct,true);
      assert.equal(publicTask(task).trace,undefined); checked++;
    }
  }
  assert.equal(checked,24);
});

test('Every loop parameter variant: actual JavaScript matches every executed line, state, condition and output', () => {
  for (const family of families) for (const template of family.templates) for (const parameters of parameterVariants(template)) {
    const task = buildTask({template_id:template.id,parameters},[template],'javascript');
    const actual = execute(task.code);
    assert.deepEqual(actual.visits,task.trace.filter(step=>step.executed).map(({line,variables,condition,output})=>({line,variables,condition,output})),`${template.id} ${JSON.stringify(parameters)}`);
    for (const program of [...new Set(task.trace.map(step=>step.program))]) {
      const checks = task.trace.filter(step=>step.program===program && typeof step.condition==='boolean');
      assert.equal(checks.at(-1).condition,false);
      assert.ok(checks.length<=9);
    }
    for (const form of mixedForms) {
      const converted = applyInteractionForm(structuredClone(task),form,()=>0.5);
      assert.equal(evaluate(converted,converted.solution).correct,true);
      if (form==='ordering') assert.equal(new Set(converted.steps.map(step=>step.id)).size,converted.steps.length);
      if (form==='multiple-choice') {
        assert.ok(converted.options.every(option=>/Nach (?:der \d+\. Ausführung von )?Zeile/.test(option.text)));
        assert.equal(new Set(converted.options.map(option=>option.text)).size,4);
      }
    }
  }
});

test('Loop boundaries: no first iteration, excluded range stop, overshoot, final false check, and language-specific for scope', () => {
  const build = (id,parameters,language='python')=>buildTask({template_id:id,parameters},families.flatMap(f=>f.templates),language);
  for (const [id,parameters] of [['repeat-fixed-v1',{count:0}],['while-up-v1',{start:2,distance:0}]]) {
    const task=build(id,parameters);
    assert.equal(task.solution.gaps.count,'n:0');
    assert.equal(task.trace.filter(step=>step.condition===true).length,0);
    assert.ok(task.trace.some(step=>step.executed===false));
  }
  const ranged=build('repeat-range-v1',{start:1,stop:6});
  assert.deepEqual(ranged.trace.filter(step=>step.condition===true).map(step=>step.variables.schritt),[1,3,5]);
  assert.equal(ranged.trace.filter(step=>step.executed).at(-1).variables.schritt,5);
  const js=build('repeat-range-v1',{start:1,stop:6},'javascript');
  assert.equal(js.trace.filter(step=>step.executed).at(-1).variables.schritt,undefined);
  const jump=build('while-jump-v1',{start:0,distance:3});
  assert.equal(jump.solution.gaps.last,'n:4');
  assert.deepEqual(jump.trace.filter(step=>step.condition!==null).map(step=>step.condition),[true,true,false]);
  const comparison=build('loop-sum-order-v1',{stop:3});
  assert.deepEqual(comparison.solution.gaps,{a:'n:6',b:'n:9'});
});

test('Chapter 3 model bounds, deterministic fallback, type mixing, grading and saved chapter/occurrences', async () => {
  for (const family of families) for (const difficulty of [1,2,3]) {
    const runtime=createRuntime(catalog,{random:()=>0,modelCompletion:async (_config,messages)=>{
      const request=JSON.parse(messages[1].content);
      if (request.catalog) return JSON.stringify({skill_id:family.metadata.name});
      const template=request.templates[0];
      return JSON.stringify({template_id:template.id,parameters:Object.fromEntries(Object.entries(template.parameter_ranges).map(([key,[min]])=>[key,min])),variation:{names:'standard',answer_form:'single-choice'}});
    }});
    const request={session:randomUUID(),chapter:3,learningObjective:family.metadata.learning_objective,difficulty,language:'python',config:{provider:'lmstudio'}};
    const forms=new Set(); let previous;
    for (let i=0;i<5;i++) {
      const {task,warning}=await runtime.next({...request,previousTaskId:previous?.id,previousTemplate:previous?.templateId});
      assert.equal(warning,''); assert.notEqual(task.type,previous?.type); forms.add(task.type);
      const submission={session:request.session,taskId:task.id,submissionId:randomUUID(),answer:referenceAnswer(task,family.templates)};
      const submitted=runtime.submit(submission);
      assert.equal(submitted.result.correct,true); assert.equal(submitted.record.chapter,3);
      assert.ok(submitted.result.trace.every(step=>Number.isInteger(step.occurrence)));
      assert.deepEqual(runtime.submit(submission),submitted); previous=task;
    }
    assert.equal(forms.size,5);
    const broken=createRuntime(catalog,{modelCompletion:async()=>'{"code":"while True: pass"}'});
    const fallback=await broken.next(request); assert.match(fallback.warning,/Ersatzaufgabe/); assert.equal(fallback.task.chapter,3);
    const template=family.templates.find(template=>template.difficulty===difficulty), parameters=parameterVariants(template)[0];
    assert.throws(()=>buildTask({template_id:template.id,parameters:{...parameters,injected:1}},[template]));
    assert.throws(()=>buildTask({template_id:template.id,parameters,variation:{names:'punkte',answer_form:'original'}},[template]),/Kontextnamen/);
    const key=Object.keys(parameters)[0];
    for(const value of [-100,1.5,100000]) assert.throws(()=>buildTask({template_id:template.id,parameters:{...parameters,[key]:value}},[template]));
    const source=family.metadata;
    assert.equal(source.chapter,3);
  }
  const markdown=await readFile(new URL('../skills/feste-wiederholungen/SKILL.md',import.meta.url),'utf8');
  assert.throws(()=>parseSkill(markdown.replace('chapter: 3','chapter: 2')));
});
