var S=Object.defineProperty,$=Object.defineProperties;var D=Object.getOwnPropertyDescriptors;var C=Object.getOwnPropertySymbols;var N=Object.prototype.hasOwnProperty,w=Object.prototype.propertyIsEnumerable;var O=(e,t,l)=>t in e?S(e,t,{enumerable:!0,configurable:!0,writable:!0,value:l}):e[t]=l,f=(e,t)=>{for(var l in t||(t={}))N.call(t,l)&&O(e,l,t[l]);if(C)for(var l of C(t))w.call(t,l)&&O(e,l,t[l]);return e},p=(e,t)=>$(e,D(t));import{l as q,o,h as i,A as b,s as A,k as E,S as F,F as v,v as y,q as V,t as k,C as x,x as G}from"./vendor-943aface.js";import{D as I}from"./Dropdown-f05f24bf.js";import{_ as L}from"./Toggle-edd22afa.js";import{_ as T}from"./Suggestion-7a5f46c0.js";import{_ as z}from"./index-b96ce60d.js";const H={class:"setting-input-wrapper"},j={props:{disabled:{type:Boolean,default:()=>!1},modelValue:{type:Object,required:!0}},emits:["update:modelValue"],setup(e,{emit:t}){const l=e,{t:g}=q();function m(c){t("update:modelValue",p(f({},l.modelValue),{value:c}))}return(c,n)=>(o(),i("div",H,[e.modelValue.type==="boolean"?(o(),b(L,{key:0,"model-value":e.modelValue.value,class:"setting-input",disabled:e.disabled,label:e.modelValue.display,hint:e.modelValue.desc,"onUpdate:modelValue":n[0]||(n[0]=r=>m(r))},null,8,["model-value","disabled","label","hint"])):e.modelValue.type==="option"?(o(),b(I,{key:1,"model-value":e.modelValue.value,"label-prop":"display",class:"setting-input",disabled:e.disabled,options:e.modelValue.options,label:e.modelValue.display,hint:e.modelValue.desc,"onUpdate:modelValue":n[1]||(n[1]=r=>m(r))},null,8,["model-value","disabled","options","label","hint"])):e.modelValue.options?(o(),b(T,{key:2,"model-value":e.modelValue.value,"label-prop":"display",class:"setting-input",disabled:e.disabled,options:e.modelValue.options,label:e.modelValue.display,hint:e.modelValue.desc,"onUpdate:modelValue":n[2]||(n[2]=r=>m(r))},null,8,["model-value","disabled","options","label","hint"])):(o(),b(z,{key:3,"model-value":e.modelValue.value,class:"setting-input",disabled:e.disabled,label:e.modelValue.display,required:e.modelValue.required,type:e.modelValue.type==="integer"?"number":"text",hint:e.modelValue.desc,"after-icon":e.modelValue.userEdit?void 0:"admin","after-hint":e.modelValue.userEdit?void 0:A(g)("servers.AdminOnlySetting"),"onUpdate:modelValue":n[3]||(n[3]=r=>m(r))},null,8,["model-value","disabled","label","required","type","hint","after-icon","after-hint"]))]))}},J={key:0},K={class:"group-header"},M={class:"title"},P=["textContent"],Q=["textContent"],R={key:0},W={class:"group-header"},X=["textContent"],Y={key:1},de={props:{modelValue:{type:Object,required:!0},disabled:{type:Boolean,default:()=>!1}},emits:["update:modelValue"],setup(e,{emit:t}){const l=e,{t:g}=q(),m=E("conditions");if(Array.isArray(l.modelValue.groups)&&!!!l.modelValue.groups.reduce((a,d)=>a===!1||a.order>d.order?!1:d)){const a=p(f({},l.modelValue),{groups:[...l.modelValue.groups]});a.groups.sort((d,s)=>d.order>s.order?1:-1),t("update:modelValue",a)}const c=F(()=>Array.isArray(l.modelValue.groups)?Object.keys(l.modelValue.data).filter(u=>l.modelValue.groups.map(a=>a.variables).flat().indexOf(u)===-1):Object.keys(l.modelValue.data));function n(u,a){const d=f({},l.modelValue);d.data[u].value=a.value,t("update:modelValue",d)}function r(){const u={};return Object.keys(l.modelValue.data).map(a=>{u[a]=l.modelValue.data[a].value}),l.modelValue.groups.filter(a=>a.if?m(a.if,u):!0)}function B(u){return u.variables.filter(a=>l.modelValue.data[a]&&!l.modelValue.data[a].internal)}function U(){return c.value.filter(u=>l.modelValue.data[u]&&!l.modelValue.data[u].internal)}return(u,a)=>e.modelValue.groups&&e.modelValue.groups.length>0?(o(),i("div",J,[(o(!0),i(v,null,y(r(),d=>(o(),i("div",{key:d.order},[V("div",K,[V("div",M,[V("h3",{textContent:k(d.display)},null,8,P),V("div",{class:"hint",textContent:k(d.description)},null,8,Q)])]),(o(!0),i(v,null,y(B(d),s=>(o(),i("div",{key:s},[x(j,{"model-value":e.modelValue.data[s],disabled:e.disabled,"onUpdate:modelValue":h=>n(s,h)},null,8,["model-value","disabled","onUpdate:modelValue"])]))),128))]))),128)),U().length>0?(o(),i("div",R,[V("div",W,[V("h3",{class:"title",textContent:k(A(g)("templates.NoGroup"))},null,8,X)]),(o(!0),i(v,null,y(U(),d=>(o(),i("div",{key:d},[x(j,{"model-value":e.modelValue.data[d],disabled:e.disabled,"onUpdate:modelValue":s=>n(d,s)},null,8,["model-value","disabled","onUpdate:modelValue"])]))),128))])):G("",!0)])):(o(),i("div",Y,[(o(!0),i(v,null,y(e.modelValue.data,(d,s)=>(o(),i("div",{key:s},[x(j,{"model-value":e.modelValue.data[s],disabled:e.disabled,"onUpdate:modelValue":h=>n(s,h)},null,8,["model-value","disabled","onUpdate:modelValue"])]))),128))]))}};export{de as _};
//# sourceMappingURL=Variables-1867ca26.js.map
