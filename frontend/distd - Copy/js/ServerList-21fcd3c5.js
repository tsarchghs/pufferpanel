import{k as j,l as z,r,p as D,G as x,L as F,y as I,o,h as l,q as a,t as i,s as c,z as C,F as P,v as A,C as d,x as E,R as $,B as V,n as G,N as T}from"./vendor-943aface.js";import{c as W,e as q}from"./index-b96ce60d.js";const M={class:"serverlist"},U=["textContent"],J=["data-online"],K=["title"],O={class:"type"},Q={class:"subline"},X={key:0,class:"list-item"},Y={key:1,class:"list-item"},Z={class:"createLink"},se={setup(ee){const h=j("api"),{t:y}=z(),u=r([]);let f=0,p=!1;const v=r(!1),m=r(null),_=r(null);let w=null;function b(e){e.map(t=>u.value.push(t)),S()}async function S(){u.value.map(async e=>{if(e.canGetStatus){e.online="loading";try{e.online=await h.server.getStatus(e.id)}catch{e.online=void 0}}})}function k(){if(!m.value)return!1;const e=window.innerWidth||document.documentElement.clientWidth,t=window.innerHeight||document.documentElement.clientHeight,s=m.value.$el.getBoundingClientRect();return s.top>=0&&s.left>=0&&s.bottom<=t&&s.right<=e}async function g(e=1){p=!0;const t=await h.server.list(e);b(t.servers),f=t.paging.page,v.value=t.paging.page*t.paging.pageSize>=(t.paging.total||0),x(()=>{p=!1,!v.value&&k()&&g(f+1)})}function L(){!p&&k()&&g(f+1)}D(()=>{w=setInterval(S,30*1e3),x(()=>{g(),window.addEventListener("scroll",L)})}),F(()=>{clearInterval(w),window.removeEventListener("scroll",L)});function B(e){let t=e.node.publicHost;return e.ip&&e.ip!=="0.0.0.0"&&(t=e.ip),t+(e.port?":"+e.port:"")}function N(e){_.value||(_.value=e)}function R(){_.value.$el.focus()}return(e,t)=>{const s=I("hotkey");return o(),l("div",M,[a("h1",{textContent:i(c(y)("servers.Servers"))},null,8,U),C(a("div",{class:"list",onHotkey:t[0]||(t[0]=n=>R())},[(o(!0),l(P,null,A(u.value,n=>(o(),l("div",{key:n.id,class:"list-item"},[d(c($),{ref:N,to:{name:"ServerView",params:{id:n.id}}},{default:V(()=>[a("div",{class:G(["server",`server-${n.icon||"none"}`]),"data-online":n.online},[a("span",{class:"title",title:n.name},i(n.name),9,K),a("span",O,i(n.type),1),a("span",Q,i(B(n))+" @ "+i(n.node.name),1)],10,J)]),_:2},1032,["to"])]))),128)),v.value?E("",!0):(o(),l("div",X,[d(W,{ref:(n,H)=>{H.loaderRef=n,m.value=n},small:""},null,512)])),e.$api.auth.hasScope("server.create")?(o(),l("div",Y,[C(d(c($),{to:{name:"ServerCreate"}},{default:V(()=>[a("div",Z,[d(q,{name:"plus"}),T(i(c(y)("servers.Add")),1)])]),_:1},512),[[s,"c"]])])):E("",!0)],544),[[s,"l"]])])}}};export{se as default};
//# sourceMappingURL=ServerList-21fcd3c5.js.map