import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {advancedDefinitions} from '../advanced-lessons.js';
import {advancedFamilies,advancedExamples} from '../advanced-content.js';
const root=new URL('../',import.meta.url);
const registry=JSON.parse(await readFile(new URL('skills/catalog.json',root),'utf8'));
for(const [chapter,mode,name,title,content] of advancedFamilies) {
  const folder=new URL(`skills/${name}/`,root);await mkdir(folder,{recursive:true});
  const templates=Object.entries(advancedDefinitions).filter(([,d])=>d.mode===mode).map(([id,d])=>({
    id,chapter,mode,difficulty:d.difficulty,type:'gap-fill',
    title:`${title} · ${['Einstieg','Ablauf verfolgen','Übertragen'][d.difficulty-1]}`,
    context:d.explain,prompt:'Verfolge das Programm. Welche Werte zeigen die beiden letzten Ausgaben? Frühere Ausgaben aus Aufrufen sind zusätzliche Beobachtungen.',
    choicePrompt:'Welche Antwort nennt die beiden letzten Ausgaben richtig?',criteria:[mode,'trace-observations'],hints:[d.explain,d.explain]
  }));
  const skill=`---\nname: ${name}\ndescription: ${JSON.stringify(`Kapitel ${chapter}: ${title}. Drei Schwierigkeiten; ${templates.length} kuratierte Programme, fünf wechselnde Antwortformen.`)}\nversion: "1.0"\nstatus: approved\nchapter: ${chapter}\nlearning_objective: ${mode}\ndifficulty_levels: [1, 2, 3]\ninteraction_types: ["gap-fill", "single-choice", "multiple-choice", "diagram-choice", "ordering"]\ninstruction_language: de\nlearner_language: de\ncontent: content.de.md\ntemplates: templates.json\nexamples: examples.json\n---\n\n# ${title}\n\nNur JSON mit template_id und parameters entsprechend der gelieferten Vorlage und parameter_ranges. Ausschließlich ganze Zahlen in den Grenzen. Optional variation mit names: standard und answer_form: original oder single-choice gemäß variation_choices. Keine weiteren Felder, kein Code, kein AST, keine Texte, keine Lösungen.\n\nDie App erzeugt Programme, sprachgerechte Beobachtungen und Lösungen aus dem geprüften Lernprogramm. Arrays, Zuordnungen, Scopes, Funktionsaufrufe und Seiteneffekte werden deterministisch ausgewertet. Das Modell darf diesen Umfang nicht erweitern. Die App bestimmt die endgültige Antwortform: mindestens fünf je Stufe, nie derselbe Typ direkt hintereinander. Die letzte Aufgabenvariante darf zur Variation dienen, keine Lernendenantworten.\n`;
  const cases=templates.map(template=>{const reference=advancedExamples[template.id];if(!reference)throw Error(`Referenz fehlt ${template.id}`);return {template_id:template.id,parameters:reference[0],last_outputs:reference[1]};});
  await writeFile(new URL('SKILL.md',folder),skill);
  await writeFile(new URL('content.de.md',folder),`${content}\n`);
  await writeFile(new URL('templates.json',folder),`${JSON.stringify({version:1,templates},null,2)}\n`);
  await writeFile(new URL('examples.json',folder),`${JSON.stringify({version:1,cases},null,2)}\n`);
  if(!registry.skills.includes(name))registry.skills.push(name);
}
await writeFile(new URL('skills/catalog.json',root),`${JSON.stringify(registry,null,2)}\n`);
console.log(`${advancedFamilies.length} neue Themen mit ${Object.keys(advancedDefinitions).length} Vorlagen geschrieben.`);
