var X=Object.defineProperty,Y=Object.defineProperties;var Z=Object.getOwnPropertyDescriptors;var R=Object.getOwnPropertySymbols;var ee=Object.prototype.hasOwnProperty,te=Object.prototype.propertyIsEnumerable;var z=(f,l,a)=>l in f?X(f,l,{enumerable:!0,configurable:!0,writable:!0,value:a}):f[l]=a,O=(f,l)=>{for(var a in l||(l={}))ee.call(l,a)&&z(f,a,l[a]);if(R)for(var a of R(l))te.call(l,a)&&z(f,a,l[a]);return f},G=(f,l)=>Y(f,Z(l));import{l as T,k as F,r as m,p as H,o as b,h as S,q as x,t as $,s as y,F as P,v as J,C as p,B as q,N as B,G as ne,n as A,x as N,A as M,H as ae}from"./vendor-943aface.js";import{e as U,a as j,m as se,b as le,_ as re}from"./index-b96ce60d.js";import{L as oe,D as K}from"./Dropdown-f05f24bf.js";import{_ as ue}from"./EnvironmentConfig-793daa60.js";import{_ as ie}from"./Variables-1867ca26.js";import"./Suggestion-7a5f46c0.js";import"./Toggle-edd22afa.js";const ve={class:"select-template"},de=["textContent"],ce=["textContent"],me=["onClick"],pe=["textContent"],fe=["innerHTML"],ye={class:"actions"},ke={props:{arch:{type:String,required:!0},env:{type:String,required:!0},os:{type:String,required:!0}},emits:["selected","back"],setup(f,{emit:l}){const a=f,{t:g}=T(),n=F("api"),o=m([]),C=m(!1),r=m({});function h(t){if(!Array.isArray(t.supportedEnvironments)){if(!t.environment)return!1;t.supportedEnvironments=[t.environment]}return t.supportedEnvironments.filter(e=>e.type===a.env).length>0}function s(t){return!t.requirements||!t.requirements.os?!0:t.requirements.os===a.os}function k(t){return!t.requirements||!t.requirements.arch?!0:t.requirements.arch===a.arch}async function V(){const t=await n.template.listAllTemplates(),e=[];Object.keys(t).sort((d,u)=>t[d].id>t[u].id).map(d=>{if(t[d].templates.length===0)return;const u=t[d].templates.filter(w=>h(w)&&s(w)&&k(w));e.push(G(O({},t[d]),{templates:u}))}),o.value=e}H(async()=>{V()});async function E(t,e){r.value=await n.template.get(t,e),r.value.readme?C.value=!0:l("selected",r.value)}function v(t){C.value=!1,t&&l("selected",r.value)}return(t,e)=>(b(),S("div",ve,[x("h2",{textContent:$(y(g)("servers.SelectTemplate"))},null,8,de),(b(!0),S(P,null,J(o.value,d=>(b(),S("div",{key:d.id,class:"list"},[x("h3",{class:"list-header",textContent:$(d.name)},null,8,ce),(b(!0),S(P,null,J(d.templates,u=>(b(),S("div",{key:u.name,class:"list-item template",onClick:w=>E(d.id,u.name)},[x("span",{class:"title",textContent:$(u.display)},null,8,pe)],8,me))),128))]))),128)),p(j,{color:"error",onClick:e[0]||(e[0]=d=>l("back"))},{default:q(()=>[p(U,{name:"back"}),B($(y(g)("common.Back")),1)]),_:1}),p(le,{modelValue:C.value,"onUpdate:modelValue":e[3]||(e[3]=d=>C.value=d),title:r.value.display,closable:""},{default:q(()=>[x("div",{dir:"ltr",class:"readme",innerHTML:y(se)(r.value.readme)},null,8,fe),x("div",ye,[p(j,{color:"error",onClick:e[1]||(e[1]=d=>v(!1))},{default:q(()=>[p(U,{name:"close"}),B($(y(g)("common.Cancel")),1)]),_:1}),p(j,{color:"primary",onClick:e[2]||(e[2]=d=>v(!0))},{default:q(()=>[p(U,{name:"check"}),B($(y(g)("servers.SelectThisTemplate")),1)]),_:1})])]),_:1},8,["modelValue","title"])]))}},be={class:"environment"},ge={class:"dropdown-wrapper"},Ce=["textContent"],$e={props:{nouser:{type:Boolean,default:()=>!0}},emits:["confirm"],setup(f,{emit:l}){const{t:a}=T(),g=F("api"),n=m(""),o=m(null),C=m([]),r=m(void 0),h=m({}),s=m("unsupported"),k=m([]),V=m(null),E=m(null),v=m([]),t=m(null);H(async()=>{const _=await g.self.get();ne(()=>{t.value.select({value:_.username,label:_.username})}),C.value=(await g.node.list()).map(i=>({value:i.id,label:i.name})),r.value=C.value.length===1?C.value[0].value:null,e()});async function e(){if(!(r.value===null||r.value===void 0))try{V.value=null,h.value=await g.node.features(r.value),h.value.environments=h.value.environments.filter(_=>_==="docker"?h.value.features.indexOf("docker")>=0:!(_==="tty"||_==="standard")),k.value=h.value.environments.map(_=>({value:_,label:a(`env.${_}.name`)})),k.value.length>0?s.value=k.value[0].value:(E.value.select({value:"unsupported",label:""}),V.value=a("servers.NoSupportedEnvironmentOnSelectedNode"))}catch{k.value=[],E.value.select({value:"unsupported",label:""}),V.value=a("servers.CannotFetchNodeEnvironments")}}function d(){return s.value&&s.value!=="unsupported"}function u(){return!!n.value.trim().match(/^[\x20-\x7e]+$/)}function w(){u()?o.value=void 0:o.value=a("servers.NameInvalid")}async function Q(_){return(await g.user.search(_)).map(c=>({value:c.username,label:c.username}))}function L(){return v.value.length>0}function I(){return u()&&d()&&L()}function W(){!I()||l("confirm",n.value.trim(),r.value,h.value.os,h.value.arch,s.value,v.value)}return(_,i)=>(b(),S("div",be,[p(re,{modelValue:n.value,"onUpdate:modelValue":i[0]||(i[0]=c=>n.value=c),label:y(a)("servers.Name"),error:o.value,autofocus:"",onBlur:i[1]||(i[1]=c=>w()),onChange:i[2]||(i[2]=c=>o.value=void 0)},null,8,["modelValue","label","error"]),x("div",ge,[x("div",{class:A(["dropdown",L()?"":"error"])},[p(y(oe),{id:"userselect",ref:(c,D)=>{D.msUsers=c,t.value=c},modelValue:v.value,"onUpdate:modelValue":i[3]||(i[3]=c=>v.value=c),mode:"tags",placeholder:"t('server.SearchUsers')","close-on-select":!1,"can-clear":!1,"filter-results":!1,"min-chars":1,"resolve-on-load":!1,delay:500,searchable:!0,options:Q,disabled:f.nouser},null,8,["modelValue","disabled"]),x("label",{for:"userselect",onClick:i[4]||(i[4]=c=>t.value.open())},$(y(a)("users.Users")),1)],2),L()?N("",!0):(b(),S("span",{key:0,class:"error",textContent:$(y(a)("servers.AtLeastOneUserRequired"))},null,8,Ce))]),p(K,{modelValue:r.value,"onUpdate:modelValue":i[5]||(i[5]=c=>r.value=c),options:C.value,label:y(a)("nodes.Node"),onChange:i[6]||(i[6]=c=>e())},null,8,["modelValue","options","label"]),p(K,{ref:(c,D)=>{D.msEnv=c,E.value=c},modelValue:s.value,"onUpdate:modelValue":i[7]||(i[7]=c=>s.value=c),options:k.value,label:y(a)("servers.Environment"),error:V.value},null,8,["modelValue","options","label","error"]),p(j,{color:"primary",disabled:!I(),onClick:i[8]||(i[8]=c=>W())},{default:q(()=>[p(U,{name:"check"}),B($(y(a)("common.Next")),1)]),_:1},8,["disabled"])]))}},he={class:"settings"},_e=["textContent"],xe={props:{data:{type:Object,default:()=>({})},groups:{type:Array,default:void 0},env:{type:Object,required:!0}},emits:["back","confirm"],setup(f,{emit:l}){const a=f,{t:g}=T(),n=m({}),o=m(null);H(async()=>{n.value=a.data?O({},a.data):{},o.value=O({},a.env),Object.keys(n.value).map(s=>{n.value[s].type==="boolean"&&(n.value[s].value=n.value[s].value!=="false"&&n.value[s].value!==!1)})});function C(s){n.value=s.data}function r(){for(let s in n.value)if(n.value[s].required){if(n.value[s].internal||n.value[s].type==="boolean"||n.value[s].type==="integer"&&n.value[s].value===0)continue;if(!n.value[s].value)return!1}return!0}function h(){l("confirm",n.value,o.value)}return(s,k)=>(b(),S("div",he,[o.value?(b(),M(ue,{key:0,modelValue:o.value,"onUpdate:modelValue":k[0]||(k[0]=V=>o.value=V)},null,8,["modelValue"])):N("",!0),p(ie,{"model-value":{data:n.value,groups:f.groups},"onUpdate:modelValue":C},null,8,["model-value"]),Object.keys(n.value).length===0?(b(),S("div",{key:1,textContent:$(y(g)("servers.NoSettings"))},null,8,_e)):N("",!0),p(j,{color:"error",onClick:k[1]||(k[1]=V=>l("back"))},{default:q(()=>[p(U,{name:"back"}),B($(y(g)("common.Back")),1)]),_:1}),p(j,{color:"primary",disabled:!r(),onClick:k[2]||(k[2]=V=>h())},{default:q(()=>[p(U,{name:"save"}),B($(y(g)("servers.Create")),1)]),_:1},8,["disabled"])]))}},Ve={class:"servercreate"},Se=["textContent"],we={key:0},Ee=["textContent"],Me={setup(f){const l=ae(),{t:a}=T(),g=F("api"),n=m("environment"),o=m({}),C=m([]),r=m({});function h(v,t,e,d,u,w){C.value=w,o.value={name:v,nodeId:t,nodeOs:e,nodeArch:d,env:u},n.value="template"}function s(){o.value={},C.value=[],n.value="environment"}function k(v){Array.isArray(v.supportedEnvironments)||(v.supportedEnvironments=[v.environment]),r.value=v,n.value="settings"}function V(){r.value={},n.value="template"}async function E(v,t){const e=r.value;e.name=o.value.name,e.node=o.value.nodeId,e.environment=t,e.users=C.value,e.data={};for(const u in v)e.data[u]=v[u],e.data[u].type==="boolean"&&(e.data[u].value=e.data[u].value!=="false"&&e.data[u].value!==!1),e.data[u].type==="integer"&&(e.data[u].value=Number(e.data[u].value));const d=await g.server.create(e);l.push({name:"ServerView",params:{id:d},query:{created:!0}})}return(v,t)=>(b(),S("div",Ve,[x("h1",{textContent:$(y(a)("servers.Create"))},null,8,Se),v.$api.auth.hasScope("nodes.view")&&v.$api.auth.hasScope("templates.view")?(b(),S("div",we,[x("div",{class:A(["progress","on-step-"+n.value])},[x("div",{class:A(["step","step-environment",n.value==="environment"?"step-current":""])},null,2),x("div",{class:A(["step","step-template",n.value==="template"?"step-current":""])},null,2),x("div",{class:A(["step","step-settings",n.value==="settings"?"step-current":""])},null,2)],2),n.value==="environment"?(b(),M($e,{key:0,nouser:!v.$api.auth.hasScope("users.info.search"),onConfirm:h},null,8,["nouser"])):N("",!0),n.value==="template"?(b(),M(ke,{key:1,env:o.value.env,os:o.value.nodeOs,arch:o.value.nodeArch,onBack:t[0]||(t[0]=e=>s()),onSelected:k},null,8,["env","os","arch"])):N("",!0),n.value==="settings"?(b(),M(xe,{key:2,data:r.value.data,groups:r.value.groups,env:r.value.supportedEnvironments.filter(e=>e.type===o.value.env)[0],onBack:t[1]||(t[1]=e=>V()),onConfirm:E},null,8,["data","groups","env"])):N("",!0)])):(b(),S("div",{key:1,textContent:$(y(a)("servers.CreateMissingPermissions"))},null,8,Ee))]))}};export{Me as default};
//# sourceMappingURL=ServerCreate-9ec4b4e2.js.map
