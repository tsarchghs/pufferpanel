import{k as V,l as U,H as g,r as o,o as c,h as B,q as _,t as P,s as t,C as s,A as C,x as H,B as $,N as j}from"./vendor-943aface.js";import{_ as r,a as w,e as A}from"./index-b96ce60d.js";import{_ as q}from"./Toggle-edd22afa.js";const S={class:"nodecreate"},T=["textContent"],R={setup(W){const y=V("api"),x=V("toast"),{t:l}=U(),k=g(),u=o(!1),v=o(""),d=o(""),i=o("8080"),m=o(""),p=o("8080"),f=o("5657");function b(){return!(!v.value||!d.value||!i.value||!f.value||u.value&&(!m.value||!p.value))}async function N(){if(!b())return;const n={name:v.value,publicHost:d.value,publicPort:i.value,sftpPort:f.value};u.value?(n.privateHost=m.value,n.privatePort=p.value):(n.privateHost=d.value,n.privatePort=i.value);const e=await y.node.create(n);x.success(l("nodes.Created")),k.push({name:"NodeView",params:{id:e},query:{created:!0}})}return(n,e)=>(c(),B("div",S,[_("h1",{textContent:P(t(l)("nodes.Create"))},null,8,T),s(r,{modelValue:v.value,"onUpdate:modelValue":e[0]||(e[0]=a=>v.value=a),autofocus:"",class:"name",label:t(l)("common.Name")},null,8,["modelValue","label"]),s(r,{modelValue:d.value,"onUpdate:modelValue":e[1]||(e[1]=a=>d.value=a),class:"public-host",label:t(l)("nodes.PublicHost")},null,8,["modelValue","label"]),s(r,{modelValue:i.value,"onUpdate:modelValue":e[2]||(e[2]=a=>i.value=a),class:"public-port",label:t(l)("nodes.PublicPort"),type:"number"},null,8,["modelValue","label"]),s(q,{modelValue:u.value,"onUpdate:modelValue":e[3]||(e[3]=a=>u.value=a),class:"private-toggle",label:t(l)("nodes.WithPrivateAddress"),hint:t(l)("nodes.WithPrivateAddressHint")},null,8,["modelValue","label","hint"]),u.value?(c(),C(r,{key:0,modelValue:m.value,"onUpdate:modelValue":e[4]||(e[4]=a=>m.value=a),class:"private-host",label:t(l)("nodes.PrivateHost")},null,8,["modelValue","label"])):H("",!0),u.value?(c(),C(r,{key:1,modelValue:p.value,"onUpdate:modelValue":e[5]||(e[5]=a=>p.value=a),class:"private-port",label:t(l)("nodes.PrivatePort"),type:"number"},null,8,["modelValue","label"])):H("",!0),s(r,{modelValue:f.value,"onUpdate:modelValue":e[6]||(e[6]=a=>f.value=a),class:"sftp-port",label:t(l)("nodes.SftpPort"),type:"number"},null,8,["modelValue","label"]),s(w,{disabled:!b(),color:"primary",onClick:e[7]||(e[7]=a=>N())},{default:$(()=>[s(A,{name:"save"}),j(P(t(l)("nodes.Create")),1)]),_:1},8,["disabled"])]))}};export{R as default};
//# sourceMappingURL=NodeCreate-d2dfb049.js.map
