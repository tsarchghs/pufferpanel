var x=Object.defineProperty,w=Object.defineProperties;var B=Object.getOwnPropertyDescriptors;var d=Object.getOwnPropertySymbols;var D=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable;var m=(e,l,t)=>l in e?x(e,l,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[l]=t,n=(e,l)=>{for(var t in l||(l={}))D.call(l,t)&&m(e,t,l[t]);if(d)for(var t of d(l))I.call(l,t)&&m(e,t,l[t]);return e},u=(e,l)=>w(e,B(l));import{l as N,o as s,h as i,A as j,x as p,q as c,t as C}from"./vendor-943aface.js";import{D as L}from"./Dropdown-f05f24bf.js";const q={class:"theme-setting-wrapper"},S={key:1,class:"color-input"},z={class:"label"},A=["textContent"],E=["value"],F={props:{modelValue:{type:Object,required:!0}},emits:["update:modelValue"],setup(e,{emit:l}){const t=e,{t:f,locale:V,fallbackLocale:b}=N();function v(a){l("update:modelValue",u(n({},t.modelValue),{current:a}))}function k(a){l("update:modelValue",u(n({},t.modelValue),{current:a.target.value}))}function r(a){const o=a.label||void 0;return a.tkey?f(a.tkey,o):a.tlabels&&(a.tlabels[V.value]||a.tlabels[b.value])||o}function y(a){return a.map(o=>u(n({},o),{label:r(o)}))}return(a,o)=>(s(),i("div",q,[e.modelValue.type==="class"?(s(),j(L,{key:0,"model-value":e.modelValue.current,options:y(e.modelValue.options),label:r(e.modelValue),"onUpdate:modelValue":o[0]||(o[0]=h=>v(h))},null,8,["model-value","options","label"])):p("",!0),e.modelValue.type==="color"?(s(),i("label",S,[c("span",z,[c("span",{textContent:C(r(e.modelValue))},null,8,A)]),c("input",{type:"color",value:e.modelValue.current,onInput:k},null,40,E)])):p("",!0)]))}};export{F as _};
//# sourceMappingURL=ThemeSetting-f50c637e.js.map