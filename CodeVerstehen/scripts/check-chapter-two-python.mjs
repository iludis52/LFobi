// Ergänzende Entwicklungsprüfung; Python gehört nicht zur Browser-Auslieferung.
import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { loadCatalog } from '../runtime.js';
import { buildTask } from '../task-engine.js';
import { parameterVariants } from '../chapter-one.js';
import { branchKinds, fallbackBranchDraft, buildBranchTask } from '../branch-workshop.js';
const catalog = await loadCatalog(async url => new Response(await readFile(new URL(url), 'utf8')));
const jobs = [];
function addJob(task, id, parameters) {
  const labels = [...new Set(task.trace.map(step => step.program))];
  jobs.push({ id, parameters, programs: labels.map(label => ({
    code: task.code.filter((_, index) => task.trace[index].program === label).join('\n'),
    outputs: task.trace.filter(step => step.program === label && step.output !== '').map(step => ['True', 'False'].includes(step.output) ? step.output === 'True' : /^-?\d+$/.test(step.output) ? Number(step.output) : step.output),
    final: task.trace.filter(step => step.program === label && step.executed).at(-1).variables
  })) });
}
for (const family of catalog.families.filter(f => f.metadata.chapter === 2)) for (const template of family.templates) for (const parameters of parameterVariants(template)) {
  const task = buildTask({ template_id: template.id, parameters }, [template], 'python');
  addJob(task, template.id, parameters);
}
for (const difficulty of [1,2,3]) for (const kind of branchKinds) for (const seed of [0,1,2]) for (let variant = 0; variant < 8; variant++) addJob(buildBranchTask(fallbackBranchDraft(kind,difficulty,seed,variant),difficulty,'python',kind), `workshop-${kind}`, {difficulty,seed,variant});
const result = spawnSync('python', ['-c', `
import json, sys
jobs = json.load(sys.stdin)
for job in jobs:
    for program in job['programs']:
        output = []
        namespace = {'print': lambda value: output.append(value)}
        exec(program['code'], namespace)
        actual = {name: namespace[name] for name in program['final']}
        assert output == program['outputs'], (job['id'], job['parameters'], output)
        assert actual == program['final'], (job['id'], job['parameters'], actual)
print(str(len(jobs)) + ' Python variants verified: outputs and final states.')
`], { input: JSON.stringify(jobs), encoding: 'utf8' });
if (result.error) throw result.error;
process.stdout.write(result.stdout); process.stderr.write(result.stderr);
process.exitCode = result.status;
