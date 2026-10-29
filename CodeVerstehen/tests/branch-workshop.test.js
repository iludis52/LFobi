import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { branchKinds, fallbackBranchDraft, validateBranchDraft, buildBranchTask, branchFingerprint, checkBranchNovelty, createBranchWorkshop } from '../branch-workshop.js';
import { evaluate, publicTask } from '../task-engine.js';
import { loadCatalog, createRuntime } from '../runtime.js';
import { createModelMonitor } from '../model-monitor.js';

function execute(code) {
  const runs = [], visits = [], checks = []; let segment = [], names = new Set();
  const flush = () => {
    if (!segment.length) return;
    const outputs = [], context = vm.createContext({ console: { log: value => outputs.push(value) }, visit: line => visits.push(line), check: (line, value) => { visits.push(line); checks.push([line, value]); return value; } });
    vm.runInContext(segment.join('\n'), context, { timeout: 100 });
    runs.push({ outputs, variables: Object.fromEntries([...names].map(name => [name, vm.runInContext(name, context)])) }); segment = []; names = new Set();
  };
  code.forEach((line, index) => {
    const text = line.trim(), number = index + 1;
    if (text.startsWith('//')) { flush(); return; }
    const assignment = text.match(/^(?:let )?(\w+) =/); if (assignment) names.add(assignment[1]);
    if (text.startsWith('if (')) segment.push(line.replace(/if \((.*)\) \{$/, `if (check(${number}, $1)) {`));
    else if (text === '} else {') segment.push(`${line}\nvisit(${number});`);
    else if (text === '}') segment.push(line);
    else segment.push(`visit(${number}); ${line}`);
  }); flush(); return { runs, visits, checks };
}

test('Workshop: all six question kinds at all stages have independent JS agreement, valid answers and no public solution', () => {
  for (const difficulty of [1,2,3]) for (const kind of branchKinds) for (const seed of [0,1,2]) for (let variant = 0; variant < 8; variant++) {
    const draft = fallbackBranchDraft(kind, difficulty, seed, variant);
    const task = buildBranchTask(draft, difficulty, 'javascript', kind);
    const actual = execute(task.code);
    assert.deepEqual(actual.visits, task.trace.filter(step => step.executed === true).map(step => step.line));
    assert.deepEqual(actual.checks, task.trace.filter(step => typeof step.condition === 'boolean').map(step => [step.line, step.condition]));
    const programs = [...new Set(task.trace.map(step => step.program))];
    assert.deepEqual(actual.runs.map(run => run.variables), programs.map(program => task.trace.filter(step => step.program === program && step.executed).at(-1).variables));
    assert.deepEqual(actual.runs.flatMap(run => run.outputs).map(String), task.trace.filter(step => step.output !== '').map(step => step.output));
    assert.equal(evaluate(task, task.solution).correct, true);
    const python = buildBranchTask(draft, difficulty, 'python', kind);
    if (kind === 'lines') assert.deepEqual(python.solution.selected.map(id=>python.trace.find(step=>`line-${step.line}`===id).nodeId),task.solution.selected.map(id=>task.trace.find(step=>`line-${step.line}`===id).nodeId));
    else assert.deepEqual(python.solution, task.solution);
    const view = publicTask(task); assert.equal(view.solution, undefined); assert.equal(view.trace, undefined); assert.equal(view.generation.draft, undefined);
    if (task.type === 'single-choice') for (const option of task.options.filter(option => !task.solution.selected.includes(option.id))) assert.equal(evaluate(task, { selected: [option.id] }).correct, false);
    if (task.type === 'multiple-choice') { assert.equal(evaluate(task, { selected: task.options.map(option => option.id) }).correct, false); assert.equal(evaluate(task, { selected: task.solution.selected.slice(1) }).correct, false); }
    if (task.gaps) for (const gap of task.gaps) { const wrong = gap.choices.find(choice => choice.id !== task.solution.gaps[gap.id]); assert.equal(evaluate(task, { gaps: { ...task.solution.gaps, [gap.id]: wrong.id } }).correct, false); }
  }
});

test('Independent reference observations: real branches, state, repair alternatives and changed comparison', () => {
  const expected = { output: ['Training'], state: [6], condition: ['Pumpen'], lines: [6,2], repair: [5], compare: ['Starten',5,'Warten',5] };
  for (const kind of branchKinds) {
    const task = buildBranchTask(fallbackBranchDraft(kind, 1), 1, 'javascript', kind);
    assert.deepEqual(execute(task.code).runs.flatMap(run => run.outputs), expected[kind]);
    if (kind === 'repair') {
      assert.deepEqual(task.solution.selected, ['change-3']);
      for (const option of task.options) {
        const text = task.code.join('\n').replace('(vorrat + 1)', `(vorrat + ${Number(option.id.slice(7))})`);
        assert.equal(execute(text.split('\n')).runs[0].variables.vorrat === 7, task.solution.selected.includes(option.id));
      }
    }
  }
});

test('Untrusted model trees: both branches, fields, identifiers, types, operators, depth, complexity and observations checked', () => {
  const invalid = mutate => { const draft = fallbackBranchDraft('state', 1); mutate(draft); assert.throws(() => buildBranchTask(draft, 1, 'javascript', 'state')); };
  invalid(d => { d.solution = 7; });
  invalid(d => { d.program[1].otherwise[0].value.left.name = 'unbekannt'; });
  invalid(d => { d.program[0].name = 'delete'; });
  invalid(d => { d.program[0].name = '__proto__'; });
  invalid(d => { d.program[1].otherwise[0].value.op = '*'; });
  invalid(d => { d.program[1].otherwise[0].value = { kind: 'literal', value: 'Falschtyp' }; });
  invalid(d => { d.program[1].otherwise[0].value.left = { kind: 'binary', op: '+', left: { kind: 'variable', name: 'energie' }, right: { kind: 'literal', value: 1 } }; });
  invalid(d => { d.program[1].otherwise[0].value.right.value = 999; });
  invalid(d => { d.program[1].otherwise[0].name = 'neuername'; });
  invalid(d => { d.program[1].otherwise = [structuredClone(d.program[1])]; });
  invalid(d => { d.program.push({ id:'fremd', kind:'call', target:'fetch' }); });
  invalid(d => { d.program[1].branches.push(structuredClone(d.program[1].branches[0])); });
  invalid(d => { d.program[1].otherwise[0].id = d.program[0].id; });
  invalid(d => { d.program[1].otherwise[0].value.left = { kind: 'literal', value: 'Zahl' }; });
  invalid(d => { d.question.variable = 'nichtda'; });
  invalid(d => { d.question.kind = 'output'; });
  invalid(d => { d.title = '<script>unzulässig</script>'; });
  invalid(d => { d.program[1].otherwise = structuredClone(d.program[1].branches[0].body); d.program[1].otherwise[0].id = 'andererzweig'; });
  assert.throws(() => validateBranchDraft(fallbackBranchDraft('output',1),3,'output'), /komplexität/);
  const output = fallbackBranchDraft('output',1); output.question.index = 3;
  assert.throws(() => buildBranchTask(output,1,'python','output'), /Ausgabe fehlt/);
  const repair = fallbackBranchDraft('repair',1); repair.question.expected = 5;
  assert.throws(() => buildBranchTask(repair,1,'python','repair'), /bereits/);
  repair.question.expected = 29; assert.throws(() => buildBranchTask(repair,1,'python','repair'), /nicht eindeutig/);
  repair.question.node = 'entnahme'; assert.throws(() => buildBranchTask(repair,1,'python','repair'), /ausgeführte/);
  const compare = fallbackBranchDraft('compare',1); compare.program[0].value.value = 6;
  assert.throws(() => buildBranchTask(compare,1,'python','compare'), /unterschiedliche/);
});

test('Structure heuristic ignores names/numbers; six question kinds rotate at every stage without answers in model history', async () => {
  const first = fallbackBranchDraft('state',1), renamed = structuredClone(first);
  const replace = object => { for (const [key,value] of Object.entries(object)) { if (key === 'name' && value === 'energie') object[key] = 'akku'; else if (typeof value === 'number') object[key] += 1; else if (value && typeof value === 'object') replace(value); } };
  replace(renamed.program);
  assert.equal(branchFingerprint(first), branchFingerprint(renamed));
  assert.throws(() => checkBranchNovelty(renamed, [{ fingerprint: branchFingerprint(first), context:'anderer kontext' }]), /Programmstruktur/);
  assert.doesNotThrow(() => checkBranchNovelty(renamed, [{ fingerprint: branchFingerprint(first), context:'anderer kontext' }, ...Array.from({length:3},(_,i)=>({fingerprint:String(i),context:String(i)}))]));
  const workshop = createBranchWorkshop({ random: () => 0 });
  for (const difficulty of [1,2,3]) { const kinds=[]; for(let index=0;index<18;index++) kinds.push((await workshop.next({session:'a',difficulty,language:index%2?'python':'javascript',config:{provider:'demo'}})).task.taskKind); assert.deepEqual(kinds,[...branchKinds,...branchKinds,...branchKinds]); }
});

test('One correction maximum, transport failure once, structured custom models and repeated schema rejected', async () => {
  let calls = [];
  const corrected = createBranchWorkshop({ random: () => 0, modelCompletion: async (_config, messages, options) => {
    calls.push({ messages: structuredClone(messages), options });
    if (calls.length === 1) return '{"code":"print(7)"}';
    const draft = fallbackBranchDraft('output',1); draft.title = 'Eine neue Meldung im Museum'; draft.context = 'Ein Museum kontrolliert eine Schwelle und zeigt eine passende Besuchermeldung.';
    draft.program[0].name = 'besucher'; draft.program[1].branches[0].test.left.name = 'besucher'; draft.program[1].branches[0].test.op = '<=';
    return JSON.stringify(draft);
  } });
  const request = {session:'a',difficulty:1,language:'javascript',config:{provider:'lmstudio'}};
  const result = await corrected.next(request);
  assert.equal(result.warning,''); assert.equal(result.task.source,'Modellaufgabe · unabhängig geprüft');
  assert.deepEqual(result.task.generation.attempts.map(attempt=>attempt.result),['rejected','accepted']);
  assert.deepEqual(calls.map(call=>call.options.purpose),['task-generation','task-correction']);
  assert.equal(calls.every(call=>call.options.maxTokens===1800),true);
  assert.equal(calls[1].messages.length,3);
  let invalidCalls=0;
  const invalid=createBranchWorkshop({random:()=>0,modelCompletion:async()=>{invalidCalls++;return '{}';}});
  const fallback=await invalid.next(request); assert.equal(invalidCalls,2); assert.equal(fallback.task.source,'Geprüfte Ersatzaufgabe'); assert.match(fallback.warning,/verworfen/);
  let failedCalls=0; const offline=createBranchWorkshop({random:()=>0,modelCompletion:async()=>{failedCalls++;throw Error('offline');}});
  assert.equal((await offline.next(request)).task.source,'Geprüfte Ersatzaufgabe'); assert.equal(failedCalls,1);
  const same=createBranchWorkshop({random:()=>0,modelCompletion:async()=>JSON.stringify(fallbackBranchDraft('output',1))});
  await same.next(request); const second=await same.next(request); assert.equal(second.task.taskKind,'state'); assert.equal(second.task.source,'Geprüfte Ersatzaufgabe');
});

test('Observed values must depend on the decision; curated fallback also avoids a model-created previous shape', async () => {
  const output=fallbackBranchDraft('output',1); output.program.push({id:'constant',kind:'output',value:{kind:'literal',value:3}}); output.question.index=1;
  assert.throws(()=>buildBranchTask(output,1,'python','output'),/vom gewählten Zweig abhängen/);
  const state=fallbackBranchDraft('state',2); state.question.variable='reserve';
  assert.throws(()=>buildBranchTask(state,2,'javascript','state'),/vom gewählten Zweig abhängen/);
  let calls=0;
  const workshop=createBranchWorkshop({random:()=>0,modelCompletion:async()=>{
    calls++; if(calls>1)return '{}';
    const draft=fallbackBranchDraft('state',1); draft.question={kind:'output',index:0}; return JSON.stringify(draft);
  }});
  const request={session:'collision',difficulty:1,language:'python',config:{provider:'lmstudio'}};
  const first=await workshop.next(request); const second=await workshop.next(request);
  assert.equal(first.task.source,'Modellaufgabe · unabhängig geprüft'); assert.equal(second.task.source,'Geprüfte Ersatzaufgabe');
  assert.notEqual(branchFingerprint(first.task.generation.draft),branchFingerprint(second.task.generation.draft));
  assert.equal(calls,3);
});

test('Browser runtime integration saves generation version/draft, grades deterministically, counts correction tokens and avoids duplicate submissions', async () => {
  const catalog=await loadCatalog(async url=>new Response(await readFile(new URL(url),'utf8'))); let requests=0;
  const monitor=createModelMonitor({fetchImpl:async (_url,options)=>{
    requests++; assert.equal(JSON.parse(options.body).max_tokens,1800);
    return new Response(JSON.stringify({usage:{prompt_tokens:100,completion_tokens:50,total_tokens:150},choices:[{message:{content:requests===1?'{}':JSON.stringify(fallbackBranchDraft('output',1))}}]}));
  }});
  const config={provider:'lmstudio',baseUrl:'http://127.0.0.1:1234/v1',model:'test'}; monitor.setActive(config);
  const runtime=createRuntime(catalog,{random:()=>0,modelCompletion:(config,messages,options)=>monitor.request(config,messages,options)});
  const session=randomUUID(); const next=await runtime.next({session,chapter:2,learningObjective:'branch-choice',difficulty:1,language:'python',config});
  assert.equal(next.task.generation.draft,undefined); assert.equal(next.task.taskKind,'output');
  const submission={session,taskId:next.task.id,submissionId:randomUUID(),answer:{selected:['value-0']}};
  const first=runtime.submit(submission); assert.equal(first.result.correct,true); assert.deepEqual(runtime.submit(submission),first);
  assert.equal(first.record.generation.version,1); assert.equal(first.record.generation.draft.program.length,2); assert.equal(first.record.taskKind,'output');
  const stats=monitor.snapshot(); assert.equal(stats.session.requests,2); assert.equal(stats.session.total,300); assert.equal(stats.connection.phase,'connected');
  assert.deepEqual(stats.recent.map(row=>row.purpose).sort(),['task-correction','task-generation']);
  assert.equal(JSON.stringify(stats).includes('program'),false);
});
