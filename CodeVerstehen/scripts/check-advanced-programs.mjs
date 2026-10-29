// Execute rendered sources in the real language runtimes, independently of the
// lesson interpreter. No learner/model-provided source is accepted here.
import {readFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {loadCatalog} from '../runtime.js';
import {parameterVariants} from '../chapter-one.js';
import {advancedDefinitions} from '../advanced-lessons.js';
import {runLearningProgram} from '../learning-program.js';
const catalog=await loadCatalog(async url=>new Response(await readFile(url,'utf8'))),jobs=[];
for(const family of catalog.families) for(const template of family.templates) {
  const d=advancedDefinitions[template.id];if(!d)continue;
  for(const parameters of parameterVariants(template)) for(const language of ['python','javascript']) {
    const result=runLearningProgram(d.program(parameters),language);
    jobs.push({id:template.id,parameters,language,code:result.code.join('\n'),outputs:result.outputs,variables:result.variables});
  }
}
const jsJobs=jobs.filter(job=>job.language==='javascript');
const moduleUrl=new URL('../lesson-tools.js',import.meta.url).href;
const js=spawnSync(process.execPath,['--input-type=module','-e',`
import assert from 'node:assert/strict';
let input='';for await(const part of process.stdin)input+=part;
const jobs=JSON.parse(input);
const normalize=value=>value===undefined?null:value instanceof Map?Object.fromEntries([...value].map(([key,val])=>[key,normalize(val)])):Array.isArray(value)?value.map(normalize):value&&typeof value==='object'?Object.fromEntries(Object.entries(value).map(([key,val])=>[key,normalize(val)])):value;
let index=0;
for(const job of jobs) {
  const actual=[];globalThis.__lessonCapture=value=>actual.push(normalize(value));
  const code='const console = {log: value => globalThis.__lessonCapture(value)};\\n'+job.code.replaceAll('./lesson-tools.js',${JSON.stringify(moduleUrl)})+'\\nexport const state = {'+Object.keys(job.variables).join(',')+'};\\n// job '+index++;
  const module=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
  assert.deepEqual(actual,job.outputs,job.id+' '+JSON.stringify(job.parameters));
  assert.deepEqual(normalize(module.state),job.variables,job.id+' final state');
}
delete globalThis.__lessonCapture;
console.log(jobs.length+' JavaScript ES-module programs verified: all outputs and final states, real imports.');
`],{input:JSON.stringify(jsJobs),encoding:'utf8',timeout:30000,maxBuffer:3*1024*1024});
if(js.error)throw js.error;process.stdout.write(js.stdout);process.stderr.write(js.stderr);if(js.status!==0)process.exit(js.status||1);
const py=spawnSync(process.env.CODE_PYTHON||'python',['-c',`
import json, sys
sys.dont_write_bytecode=True
sys.path.insert(0, sys.argv[1])
jobs=json.load(sys.stdin)
for job in jobs:
    actual=[]
    namespace={'print':lambda value:actual.append(value)}
    exec(job['code'],namespace)
    assert actual==job['outputs'], (job['id'],job['parameters'],actual,job['outputs'])
    state={name:namespace[name] for name in job['variables']}
    assert state==job['variables'], (job['id'],job['parameters'],state,job['variables'])
print(str(len(jobs))+' Python programs verified: all outputs and final states, real module imports.')
`,fileURLToPath(new URL('../',import.meta.url))],{input:JSON.stringify(jobs.filter(job=>job.language==='python')),encoding:'utf8',timeout:30000,maxBuffer:3*1024*1024});
if(py.error)throw py.error;process.stdout.write(py.stdout);process.stderr.write(py.stderr);process.exitCode=py.status;
