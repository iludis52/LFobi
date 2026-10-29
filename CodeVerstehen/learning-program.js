import { grundbonus, mitBonus, verdoppeln } from './lesson-tools.js';

// Closed lesson DSL. Only curated definitions construct nodes. Learner/model
// input is restricted to bounded integers, never source or arbitrary AST nodes.
export const v = name => ({ kind:'var', name });
export const x = (op, ...args) => ({ kind:'expr', op, args });
export const set = (name, value) => ({ kind:'set', name, value });
export const out = value => ({ kind:'out', value });
export const action = value => ({ kind:'action', value });
export const put = (target, key, value, map=false) => ({ kind:'put', target, key, value, map });
export const iff = (test, yes, no=[]) => ({ kind:'if', test, yes, no });
export const loop = (name, values, body) => ({ kind:'for', name, values, body });
export const repeat = (name, count, body) => ({ kind:'repeat', name, count, body });
export const wh = (test, body) => ({ kind:'while', test, body });
export const stop = () => ({ kind:'break' });
export const skip = () => ({ kind:'continue' });
export const fn = (name, params, body) => ({ kind:'fn', name, params, body });
export const ret = value => ({ kind:'return', value });
export const use = (names, alias) => ({ kind:'import', names, alias });
export const call = (name, ...args) => x('call',name,...args);
export const list = (...args) => x('list',...args);
export const record = entries => x('record',entries);
export const dict = entries => x('dict',entries);
const libraries = { mit_bonus:mitBonus, verdoppeln, grundbonus };
const jsNames = { mit_bonus:'mitBonus', verdoppeln:'verdoppeln', grundbonus:'grundbonus' };
const clone = value => structuredClone(value);

export function runLearningProgram(input, language) {
  const js=language==='javascript', program=clone(input), code=[], trace=[], outputs=[];
  const functions=new Map(), imported=new Map(), visits=new Map(), root={vars:{},scope:'main'}, frames=[root];
  let calls=0, iterations=0, operations=0;
  const line=text=>{code.push(text);return code.length;};
  const lit=value=>value===null ? js?'undefined':'None' : typeof value==='string'?JSON.stringify(value):String(value);
  function source(value) {
    if(!value || typeof value!=='object') return lit(value);
    if(value.kind==='var') return value.name;
    if(value.kind!=='expr') throw Error('Unbekannter Ausdruck.');
    const a=value.args, s=index=>source(a[index]);
    if(['+','-','*','>','>=','<','<=','==','!=','%'].includes(value.op)) return `(${s(0)} ${js && value.op==='=='?'===':js && value.op==='!='?'!==':value.op} ${s(1)})`;
    if(value.op==='list') return `[${a.map(source).join(', ')}]`;
    if(value.op==='record' || value.op==='dict') {
      const entries=Object.entries(a[0]);
      return value.op==='dict' && js ? `new Map([${entries.map(([key,val])=>`[${lit(key)}, ${source(val)}]`).join(', ')}])`
        : `{${entries.map(([key,val])=>`${lit(key)}: ${source(val)}`).join(', ')}}`;
    }
    if(value.op==='get') return `${s(0)}[${s(1)}]`;
    if(value.op==='mapget') return js?`${s(0)}.get(${s(1)})`:`${s(0)}[${s(1)}]`;
    if(value.op==='length') return js?`${s(0)}.length`:`len(${s(0)})`;
    if(value.op==='mapsize') return js?`${s(0)}.size`:`len(${s(0)})`;
    if(value.op==='keys') return js?`Array.from(${s(0)}.keys())`:`list(${s(0)}.keys())`;
    if(value.op==='append') return `${s(0)}.${js?'push':'append'}(${s(1)})`;
    if(value.op==='pop') return `${s(0)}.pop()`;
    if(value.op==='removeAt') return js?`${s(0)}.splice(${s(1)}, 1)`:`${s(0)}.pop(${s(1)})`;
    if(value.op==='sort') return js?`${s(0)}.sort((links, rechts) => links - rechts)`:`${s(0)}.sort()`;
    if(value.op==='split') return `${s(0)}.split(${s(1)})`;
    if(value.op==='join') return js?`${s(0)}.join(${s(1)})`:`${s(1)}.join(${s(0)})`;
    if(value.op==='upper' || value.op==='lower') return `${s(0)}.${js?(value.op==='upper'?'toUpperCase':'toLowerCase'):value.op}()`;
    if(value.op==='find') return `${s(0)}.${js?'indexOf':'find'}(${s(1)})`;
    if(value.op==='replace') return js?`${s(0)}.split(${s(1)}).join(${s(2)})`:`${s(0)}.replace(${s(1)}, ${s(2)})`;
    if(value.op==='floor' || value.op==='sqrt') return `${js?'Math':'math'}.${value.op}(${s(0)})`;
    if(value.op==='call') {
      const name=imported.has(a[0]) ? imported.get(a[0]) : a[0];
      return `${name}(${a.slice(1).map(source).join(', ')})`;
    }
    throw Error(`Nicht freigegebener Ausdruck: ${value.op}`);
  }
  function render(body,depth=0,known=new Set()) {
    const indent='    '.repeat(depth);
    for(const node of body) {
      if(node.kind==='set') {
        const declaration=js&&!known.has(node.name)?'let ':'';known.add(node.name);
        node.line=line(`${indent}${declaration}${node.name} = ${source(node.value)}${js?';':''}`);
      } else if(node.kind==='out') node.line=line(`${indent}${js?`console.log(${source(node.value)});`:`print(${source(node.value)})`}`);
      else if(node.kind==='action') node.line=line(`${indent}${source(node.value)}${js?';':''}`);
      else if(node.kind==='put') node.line=line(js&&node.map?`${indent}${source(node.target)}.set(${source(node.key)}, ${source(node.value)});`:`${indent}${source(node.target)}[${source(node.key)}] = ${source(node.value)}${js?';':''}`);
      else if(['break','continue'].includes(node.kind)) node.line=line(`${indent}${node.kind}${js?';':''}`);
      else if(node.kind==='return') node.line=line(`${indent}return ${source(node.value)}${js?';':''}`);
      else if(node.kind==='import') {
        if(node.names==='math') node.line=line(js?'// Math ist in JavaScript eingebaut.':'import math');
        else {
          for(const name of node.names) imported.set(name,node.alias || (js ? jsNames[name] || name : name));
          node.line=line(js?`import { ${node.names.map(name=>`${jsNames[name]||name}${node.alias?` as ${node.alias}`:''}`).join(', ')} } from "./lesson-tools.js";`
            :`from lernbausteine import ${node.names.map(name=>`${name}${node.alias?` as ${node.alias}`:''}`).join(', ')}`);
        }
      } else if(node.kind==='fn') {
        node.line=line(`${indent}${js?'function':'def'} ${node.name}(${node.params.join(', ')})${js?' {':':'}`);
        render(node.body,depth+1,new Set(node.params));if(js) line(`${indent}}`);
      } else if(node.kind==='if') {
        node.line=line(`${indent}if${js?' (':' '}${source(node.test)}${js?') {':':'}`);
        render(node.yes,depth+1,known);
        if(node.no.length) {node.elseLine=line(`${indent}${js?'} else {':'else:'}`);render(node.no,depth+1,known);}
        if(js) line(`${indent}}`);
      } else if(['for','repeat','while'].includes(node.kind)) {
        node.line=line(node.kind==='repeat'
          ?`${indent}${js?`for (let ${node.name} = 0; ${node.name} < ${source(node.count)}; ${node.name} = ${node.name} + 1) {`:`for ${node.name} in range(${source(node.count)}):`}`
          :node.kind==='for'
          ?`${indent}${js?`for (const ${node.name} of ${source(node.values)}) {`:`for ${node.name} in ${source(node.values)}:`}`
          :`${indent}${js?`while (${source(node.test)}) {`:`while ${source(node.test)}:`}`);
        const bodyKnown=new Set(known);if(node.name) bodyKnown.add(node.name);
        render(node.body,depth+1,bodyKnown);if(js) line(`${indent}}`);
      } else throw Error(`Nicht freigegebene Anweisung: ${node.kind}`);
    }
  }
  render(program);
  const frame=()=>frames.at(-1);
  const read=name=>Object.hasOwn(frame().vars,name)?frame().vars[name]:Object.hasOwn(root.vars,name)?root.vars[name]:Object.hasOwn(libraries,name)?libraries[name]:(()=>{throw Error(`Unbekannter Name ${name}`);})();
  const event=(node,extra={})=>{
    if(++operations>400) throw Error('Zu viele Lernprogramm-Schritte.');
    const key=`${frame().scope}:${node.line}`, occurrence=(visits.get(key)||0)+1;visits.set(key,occurrence);
    trace.push({line:node.line,scope:frame().scope,occurrence,iteration:iterations,executed:true,condition:null,
      variables:clone({...root.vars,...frame().vars}),output:'',...extra});
  };
  const display=value=>value===null?js?'undefined':'None':Array.isArray(value)?`[${value.map(display).join(', ')}]`:typeof value==='object'?JSON.stringify(value):typeof value==='boolean'?js?String(value):value?'True':'False':String(value);
  function evaluate(value) {
    if(!value||typeof value!=='object') return value;
    if(value.kind==='var') return read(value.name);
    const args=value.args, a=()=>evaluate(args[0]), b=()=>evaluate(args[1]);
    if(value.op==='list') return args.map(evaluate);
    if(['record','dict'].includes(value.op)) return Object.fromEntries(Object.entries(args[0]).map(([key,val])=>[key,evaluate(val)]));
    if(value.op==='call') {
      const values=args.slice(1).map(evaluate), name=args[0];
      if(Object.hasOwn(libraries,name) && typeof libraries[name]==='function') return libraries[name](...values);
      const definition=functions.get(name);if(!definition||definition.params.length!==values.length||frames.length>8) throw Error('Ungültiger Funktionsaufruf.');
      const callFrame={scope:`${name}#${++calls}`,vars:Object.fromEntries(definition.params.map((name,i)=>[name,values[i]]))};
      frames.push(callFrame);event(definition,{event:'call'});
      const result=execute(definition.body);frames.pop();
      return result?.kind==='return'?result.value:null;
    }
    if(value.op==='get'||value.op==='mapget') return a()[b()];
    if(value.op==='length') return a().length;
    if(value.op==='mapsize') return Object.keys(a()).length;
    if(value.op==='keys') return Object.keys(a());
    if(value.op==='append') {a().push(b());return null;}
    if(value.op==='pop') return a().pop();
    if(value.op==='removeAt') {a().splice(b(),1);return null;}
    if(value.op==='sort') {a().sort((left,right)=>left-right);return null;}
    if(value.op==='split') return a().split(b());
    if(value.op==='join') return a().join(b());
    if(value.op==='upper') return a().toUpperCase();
    if(value.op==='lower') return a().toLowerCase();
    if(value.op==='find') return a().indexOf(b());
    if(value.op==='replace') return a().split(b()).join(evaluate(args[2]));
    if(value.op==='floor') return Math.floor(a());
    if(value.op==='sqrt') return Math.sqrt(a());
    const left=a(),right=b();
    if(value.op==='+') return left+right;if(value.op==='-') return left-right;if(value.op==='*') return left*right;
    if(value.op==='%') return left%right;if(value.op==='>') return left>right;if(value.op==='>=') return left>=right;
    if(value.op==='<') return left<right;if(value.op==='<=') return left<=right;if(value.op==='==') return left===right;if(value.op==='!=') return left!==right;
    throw Error('Nicht freigegebene Auswertung.');
  }
  function execute(body) {
    for(const node of body) {
      if(node.kind==='fn') {functions.set(node.name,node);continue;}
      if(node.kind==='import') {event(node,{executed:js&&node.names==='math'?null:true,event:'import'});continue;}
      if(node.kind==='set') {frame().vars[node.name]=evaluate(node.value);event(node);}
      else if(node.kind==='out') {const value=evaluate(node.value);outputs.push(clone(value));event(node,{output:display(value)});}
      else if(node.kind==='action') {evaluate(node.value);event(node);}
      else if(node.kind==='put') {evaluate(node.target)[evaluate(node.key)]=evaluate(node.value);event(node);}
      else if(['break','continue','return'].includes(node.kind)) {const value=node.kind==='return'?evaluate(node.value):null;event(node,{event:node.kind,returnValue:value});return {kind:node.kind,value};}
      else if(node.kind==='if') {
        const condition=Boolean(evaluate(node.test));event(node,{condition});
        if(!condition&&node.no.length) event({line:node.elseLine});
        const result=execute(condition?node.yes:node.no);if(result)return result;
      } else if(['for','repeat','while'].includes(node.kind)) {
        const values=node.kind==='for'?[...evaluate(node.values)]:node.kind==='repeat'?Array.from({length:evaluate(node.count)},(_,i)=>i):null;
        let index=0;const oldIteration=iterations;let aborted=false;
        while(true) {
          const condition=values?index<values.length:Boolean(evaluate(node.test));
          if(condition && index>=12) throw Error('Schleife überschreitet zwölf Durchläufe.');
          if(condition&&node.name) frame().vars[node.name]=values[index];
          iterations=index+1;event(node,{condition});if(!condition)break;
          const result=execute(node.body);index++;
          if(result?.kind==='return') {iterations=oldIteration;return result;}
          if(result?.kind==='break') {aborted=true;break;}
        }
        if(js&&node.name) delete frame().vars[node.name];
        iterations=oldIteration;
        if(aborted) trace.at(-1).stoppedLoop=true;
      }
    }
    return null;
  }
  execute(program);
  if(code.length>60) throw Error('Lernprogramm ist zu lang.');
  return {code,trace,outputs,variables:clone(root.vars)};
}
