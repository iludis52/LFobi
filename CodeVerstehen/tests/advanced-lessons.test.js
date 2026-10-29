import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {randomUUID} from 'node:crypto';
import {loadCatalog,createRuntime} from '../runtime.js';
import {buildTask,evaluate,publicTask} from '../task-engine.js';
import {parameterVariants} from '../chapter-one.js';
import {advancedDefinitions} from '../advanced-lessons.js';
import {runLearningProgram} from '../learning-program.js';
import {applyInteractionForm,mixedForms} from '../interaction-forms.js';
import {validateEqualWords} from '../skills/zuweisung-reihenfolge/tools/validate.js';
import {referenceAnswer} from './task-answer.js';
const catalog=await loadCatalog(async url=>new Response(await readFile(url,'utf8')));
const families=catalog.families.filter(f=>f.templates.some(t=>Object.hasOwn(advancedDefinitions,t.id)));

test('43 independently authored examples: final observations agree in both languages, with no public solution',async()=>{
  let count=0;
  for(const family of families) {
    const examples=JSON.parse(await readFile(new URL(`../skills/${family.metadata.name}/examples.json`,import.meta.url),'utf8'));
    for(const example of examples.cases) for(const language of ['python','javascript']) {
      const task=buildTask({template_id:example.template_id,parameters:example.parameters},family.templates,language);
      const actual=runLearningProgram(advancedDefinitions[example.template_id].program(example.parameters),language);
      assert.deepEqual(actual.outputs.slice(-2),example.last_outputs,example.template_id);
      assert.equal(evaluate(task,task.solution).correct,true);
      for(const key of ['solution','trace','gapHints','explanation']) assert.equal(publicTask(task)[key],undefined);
      assert.ok(task.code.length<=60);count++;
    }
  }
  assert.equal(count,86);
});

test('Every advanced variant, language and form: unique options/cards, exact grading and stable snapshots under three shuffles',()=>{
  for(const family of families) for(const template of family.templates) for(const parameters of parameterVariants(template)) for(const language of ['python','javascript']) {
    const original=buildTask({template_id:template.id,parameters},[template],language);
    for(const form of mixedForms) for(const value of [0,0.37,0.99]) {
      const task=applyInteractionForm(structuredClone(original),form,()=>value);
      assert.equal(evaluate(task,task.solution).correct,true,`${template.id}/${form}`);
      if(task.options) {
        validateEqualWords(task.options);
        for(const option of task.options.filter(option=>!task.solution.selected.includes(option.id))) assert.equal(evaluate(task,{selected:[option.id]}).correct,false);
      }
      if(task.type==='ordering') {
        assert.equal(new Set(task.steps.map(step=>step.id)).size,task.steps.length);
        assert.equal(evaluate(task,{order:[...task.solution.order].reverse()}).correct,false);
      }
      if(task.gaps) for(const gap of task.gaps) {
        const wrong=gap.choices.find(choice=>choice.id!==task.solution.gaps[gap.id]).id;
        assert.equal(evaluate(task,{gaps:{...task.solution.gaps,[gap.id]:wrong}}).correct,false);
      }
    }
  }
});

test('break stops without inventing a final false check; continue preserves progress and skips only the remaining body',()=>{
  const a=runLearningProgram(advancedDefinitions['break-first-v1'].program({limit:3}),'python');
  const header=a.trace.filter(step=>step.line===2);
  assert.deepEqual(header.map(step=>step.condition),[true,true,true]);
  assert.equal(a.trace.filter(step=>step.event==='break').length,1);
  const b=runLearningProgram(advancedDefinitions['continue-one-v1'].program({skip:2}),'javascript');
  assert.deepEqual(b.outputs,[8,4]);assert.equal(b.trace.filter(step=>step.event==='continue').length,1);
  const sumRows=b.trace.filter(step=>step.variables.summe!==undefined && /summe =/.test(b.code[step.line-1]));
  assert.ok(sumRows.every(step=>step.variables.summe!==3));
});

test('Scope, call identity, return, mutation and rebinding stay distinct; earlier array snapshots are immutable',()=>{
  const run=(id,parameters)=>runLearningProgram(advancedDefinitions[id].program(parameters),'javascript');
  const local=run('scope-parameter-v1',{start:3});
  assert.deepEqual(local.outputs,[6,3]);assert.equal(local.variables.wert,3);
  assert.ok(local.trace.some(step=>step.scope==='aendern#1'&&step.variables.wert===6));
  const calls=run('scope-calls-v1',{start:3});
  assert.deepEqual([...new Set(calls.trace.filter(step=>step.event==='call').map(step=>step.scope))],['schritt#1','schritt#2']);
  const printed=run('print-not-return-v1',{start:3});assert.deepEqual(printed.outputs,[6,null,3]);
  const mutated=run('effect-list-v1',{start:3});assert.deepEqual(mutated.variables.werte,[3,4,5,9]);
  const before=mutated.trace.find(step=>step.variables.werte);
  assert.deepEqual(before.variables.werte,[3,4,5]);
  const rebound=run('effect-rebind-v1',{start:3});assert.deepEqual(rebound.variables.werte,[3,4,5]);
  assert.deepEqual(rebound.outputs,[2,3]);
});

test('Language-specific methods, Map/record access, numeric sorting, replacement and real module contracts remain explicit',()=>{
  const code=(id,p,l)=>buildTask({template_id:id,parameters:p},families.flatMap(f=>f.templates),l).code.join('\n');
  assert.match(code('list-append-v1',{start:3},'python'),/\.append\(9\)/);
  assert.match(code('list-append-v1',{start:3},'javascript'),/\.push\(9\)/);
  assert.match(code('transform-sort-v1',{large:11},'javascript'),/sort\(\(links, rechts\) => links - rechts\)/);
  assert.match(code('map-key-v1',{points:4},'javascript'),/new Map/);
  assert.match(code('text-replace-v1',{missing:0},'javascript'),/split\("rot"\).join\("blau"\)/);
  assert.match(code('module-interface-v1',{start:3},'javascript'),/mitBonus as bonus_funktion/);
  assert.match(code('module-interface-v1',{start:3},'python'),/mit_bonus as bonus_funktion/);
});

test('Every new topic and level: model selection, fallback, five-form breadth, grading, persisted chapter and bounded parameters',async()=>{
  for(const family of families) for(const difficulty of [1,2,3]) {
    const runtime=createRuntime(catalog,{random:()=>0.37,modelCompletion:async(_config,messages)=>{
      const request=JSON.parse(messages[1].content);
      if(request.catalog)return JSON.stringify({skill_id:family.metadata.name});
      const t=request.templates[0];return JSON.stringify({template_id:t.id,parameters:Object.fromEntries(Object.entries(t.parameter_ranges).map(([key,[min]])=>[key,min]))});
    }});
    const request={session:randomUUID(),chapter:family.metadata.chapter,learningObjective:family.metadata.learning_objective,difficulty,language:'javascript',config:{provider:'lmstudio'}};
    const forms=new Set();let previous;
    for(let i=0;i<5;i++) {
      const {task,warning}=await runtime.next({...request,previousTaskId:previous?.id,previousTemplate:previous?.templateId});
      assert.equal(warning,'');assert.notEqual(task.type,previous?.type);forms.add(task.type);
      const submit={session:request.session,taskId:task.id,submissionId:randomUUID(),answer:referenceAnswer(task,family.templates)};
      const result=runtime.submit(submit);assert.equal(result.result.correct,true);assert.equal(result.record.chapter,request.chapter);
      assert.deepEqual(runtime.submit(submit),result);previous=task;
    }
    assert.equal(forms.size,5);
    const offline=createRuntime(catalog,{modelCompletion:async()=>{throw Error('offline');}});
    assert.match((await offline.next(request)).warning,/Ersatzaufgabe/);
    for(const template of family.templates.filter(t=>t.difficulty===difficulty)) {
      const parameters=parameterVariants(template)[0],key=Object.keys(parameters)[0];
      for(const invalid of [999,-999,1.25,'eval()'])assert.throws(()=>buildTask({template_id:template.id,parameters:{...parameters,[key]:invalid}},[template]));
      assert.throws(()=>buildTask({template_id:template.id,parameters:{...parameters,code:'evil'}},[template]));
    }
  }
});
