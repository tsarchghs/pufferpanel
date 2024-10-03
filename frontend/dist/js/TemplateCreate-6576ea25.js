import{k as d,l as k,m as b,H as $,r as V,Z as w,p as x,o as S,h as T,q as C,C as o,B as s,s as i,N as U,t as B}from"./vendor-943aface.js";import{_ as E,a as N}from"./Environment-92ccbbf8.js";import{_ as R,a as D,b as I,c as O}from"./RunConfig-a666fd53.js";import{_ as q}from"./Ace-74f6f60f.js";import{a as H,e as J}from"./index-b96ce60d.js";import{T as L,_ as r}from"./Tab-85f76cb0.js";import"./Dropdown-f05f24bf.js";import"./EnvironmentConfig-793daa60.js";import"./Suggestion-7a5f46c0.js";import"./Toggle-edd22afa.js";const A={class:"templatecreate"},Y={setup(G){const p=d("api"),_=d("toast"),f=d("events"),{t:l}=k(),g=b(),y=$();let m=`{
    "name": "",
    "display": "",
    "type": "",
    "data": {},
    "groups": [],
    "install": [],
    "run": {
        "command": "",
        "stop": "",
        "workingDirectory": "",
        "pre": [],
        "post": [],
        "environmentVars": {}
    },
    "environment": {
        "type": "host"
    },
    "supportedEnvironments": [
      { "type": "host" }
    ]
}`;const a=V(m),u=V({general:!1,run:!1});let v=!1;w(()=>v||m===a.value?!0:new Promise(n=>{f.emit("confirm",l("common.ConfirmLeave"),{text:l("common.Discard"),icon:"remove",color:"error",action:()=>{n(!0)}},{color:"primary",action:()=>{n(!1)}})})),x(()=>{if(g.query.copy){const n=sessionStorage.getItem("copiedTemplate");n&&(a.value=n,sessionStorage.removeItem("copiedTemplate"),setTimeout(()=>{m=a.value},50))}});async function j(){if(!c())return;const n=JSON.parse(a.value).name,e=await p.template.exists(0,n),t=async()=>{await p.template.save(n,a.value),_.success(l("templates.Saved")),v=!0,y.push({name:"TemplateView",params:{repo:0,id:n}})};e?f.emit("confirm",l("templates.ConfirmOverwrite"),{text:l("templates.Overwrite"),icon:"check",action:()=>{t()}}):t()}function c(){return Object.values(u.value).filter(n=>n===!1).length===0}return(n,e)=>(S(),T("div",A,[C("div",null,[o(L,{anchors:""},{default:s(()=>[o(r,{id:"general",title:i(l)("templates.General"),icon:"general",hotkey:"t g"},{default:s(()=>[o(E,{modelValue:a.value,"onUpdate:modelValue":e[0]||(e[0]=t=>a.value=t),"id-editable":"",onValid:e[1]||(e[1]=t=>u.value.general=t)},null,8,["modelValue"])]),_:1},8,["title"]),o(r,{id:"variables",title:i(l)("templates.Variables"),icon:"variables",hotkey:"t v"},{default:s(()=>[o(R,{modelValue:a.value,"onUpdate:modelValue":e[2]||(e[2]=t=>a.value=t)},null,8,["modelValue"])]),_:1},8,["title"]),o(r,{id:"install",title:i(l)("templates.Install"),icon:"install",hotkey:"t i"},{default:s(()=>[o(D,{modelValue:a.value,"onUpdate:modelValue":e[3]||(e[3]=t=>a.value=t)},null,8,["modelValue"])]),_:1},8,["title"]),o(r,{id:"run",title:i(l)("templates.RunConfig"),icon:"start",hotkey:"t r"},{default:s(()=>[o(I,{modelValue:a.value,"onUpdate:modelValue":e[4]||(e[4]=t=>a.value=t),onValid:e[5]||(e[5]=t=>u.value.run=t)},null,8,["modelValue"])]),_:1},8,["title"]),o(r,{id:"hooks",title:i(l)("templates.Hooks"),icon:"hooks",hotkey:"t h"},{default:s(()=>[o(O,{modelValue:a.value,"onUpdate:modelValue":e[6]||(e[6]=t=>a.value=t)},null,8,["modelValue"])]),_:1},8,["title"]),o(r,{id:"environment",title:i(l)("templates.Environment"),icon:"environment",hotkey:"t e"},{default:s(()=>[o(N,{modelValue:a.value,"onUpdate:modelValue":e[7]||(e[7]=t=>a.value=t)},null,8,["modelValue"])]),_:1},8,["title"]),o(r,{id:"json",title:i(l)("templates.Json"),icon:"json",hotkey:"t j"},{default:s(()=>[o(q,{id:"template-json",modelValue:a.value,"onUpdate:modelValue":e[8]||(e[8]=t=>a.value=t),class:"template-json-editor",mode:"json"},null,8,["modelValue"])]),_:1},8,["title"])]),_:1}),o(H,{color:"primary",disabled:!c(),onClick:e[9]||(e[9]=t=>j())},{default:s(()=>[o(J,{name:"save"}),U(B(i(l)("common.Save")),1)]),_:1},8,["disabled"])])]))}};export{Y as default};
//# sourceMappingURL=TemplateCreate-6576ea25.js.map
