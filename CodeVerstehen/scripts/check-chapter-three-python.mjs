// Development check only; Python is not required by the browser application.
import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { loadCatalog } from '../runtime.js';
import { buildTask } from '../task-engine.js';
import { parameterVariants } from '../chapter-one.js';
const catalog = await loadCatalog(async url => new Response(await readFile(url,'utf8')));
const jobs = [];
for (const family of catalog.families.filter(family=>family.metadata.chapter===3 && !['loop-break','loop-continue'].includes(family.metadata.learning_objective))) for (const template of family.templates) for (const parameters of parameterVariants(template)) {
  const task=buildTask({template_id:template.id,parameters},[template],'python');
  const groups=[]; let lines=[];
  task.code.forEach((source,index)=>{
    if(source.startsWith('#')) {if(lines.length) groups.push(lines); lines=[];}
    else lines.push({source,line:index+1});
  });
  if(lines.length) groups.push(lines);
  jobs.push({id:template.id,parameters,programs:groups.map(lines=>({lines,
    expected:task.trace.filter(step=>step.executed && lines.some(line=>line.line===step.line)).map(({line,variables,condition,output})=>({line,variables,condition,output}))
  }))});
}
const result=spawnSync(process.env.CODE_PYTHON || 'python',['-c',`
import ast, json, sys
jobs = json.load(sys.stdin)
for job in jobs:
    for program in job['programs']:
        sources = [line['source'] for line in program['lines']]
        mapping = [line['line'] for line in program['lines']]
        code = '\\n'.join(sources)
        names = {node.id for node in ast.walk(ast.parse(code)) if isinstance(node, ast.Name) and isinstance(node.ctx, ast.Store)}
        pending = [None]
        printed = ['']
        actual = []
        def capture(value):
            printed[0] = str(value)
        def tracer(frame, event, arg):
            if frame.f_code.co_filename != '<loop-reference>':
                return tracer
            if event in ('line', 'return'):
                previous = pending[0]
                if previous is not None:
                    source = sources[previous - 1]
                    condition = None
                    if source.startswith(('while ', 'for ')):
                        condition = event == 'line' and sources[frame.f_lineno - 1].startswith('    ')
                    actual.append({'line': mapping[previous - 1], 'variables': {name: frame.f_locals[name] for name in names if name in frame.f_locals}, 'condition': condition, 'output': printed[0]})
                    printed[0] = ''
                pending[0] = frame.f_lineno if event == 'line' else None
            return tracer
        namespace = {'print': capture}
        sys.settrace(tracer)
        try:
            exec(compile(code, '<loop-reference>', 'exec'), namespace)
        finally:
            sys.settrace(None)
        assert actual == program['expected'], (job['id'], job['parameters'], actual, program['expected'])
print(str(len(jobs)) + ' Python loop variants verified: every visit, state, check and output.')
`],{input:JSON.stringify(jobs),encoding:'utf8',maxBuffer:5*1024*1024,timeout:30000});
if(result.error) throw result.error;
process.stdout.write(result.stdout); process.stderr.write(result.stderr); process.exitCode=result.status;
