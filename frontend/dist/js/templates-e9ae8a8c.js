const e="\u6A21\u677F",t="Save Template",o="Template saved",n="Delete Template",s="Do you really want to delete the template {name}?",a="\u5DF2\u5220\u9664\u6A21\u677F",r="\u521B\u5EFA\u65B0\u6A21\u677F",i="You can only save changes made to local templates",l="Create local copy",d="A template with this name already exists. Overwrite it?",m="Overwrite",c="JSON",p="\u663E\u793A\u540D\u79F0",u="\u7C7B\u578B",v="\u6DFB\u52A0\u53D8\u91CF",h="\u53D8\u91CF",y="\u6DFB\u52A0\u5B89\u88C5\u6B65\u9AA4",b="\u5B89\u88C5",S="\u6587\u4EF6\u540D",C="\u7248\u672C",f="\u73AF\u5883",w="Environment Enabled",g="\u6DFB\u52A0\u73AF\u5883\u53D8\u91CF",T="\u73AF\u5883\u53D8\u91CF",I="Docker \u955C\u50CF",k="\u8FD0\u884C\u914D\u7F6E",A="\u6DFB\u52A0\u8FD0\u884C\u524D\u6B65\u9AA4",E="Pre Run Hook",D="\u6DFB\u52A0\u8FD0\u884C\u540E\u6B65\u9AA4",H="Post Run Hook",R="\u5173\u95ED",V="\u547D\u4EE4",G="Stop Command",O="Stop Signal",P="No Group",N="Add Variable Group",L="Use this command only if this condition is met",x="Add Command",W="Add Environment",J={"1":"SIGHUP","2":"SIGINT (CTRL+C)","9":"SIGKILL","15":"SIGTERM"},M={NameInvalid:"A template name cannot be blank and cannot contain spaces or special characters",DisplayInvalid:"The display name cannot be blank",TypeInvalid:"The type cannot be blank",CommandInvalid:"The command cannot be blank"},U={Description:"Description",Type:"Type",Value:"Default Value",Required:"This variable is required",UserEdit:"Non-admin users can edit this variable",Internal:"Internal (never shown to users or admins)",Options:"Options",ConditionHint:"Only show this group if this condition is met",types:{String:"String",Boolean:"Boolean",Number:"Number",Options:"Options"},EditGroup:"Edit group",RemoveGroup:"Remove group",MoveToGroup:"Move to different group",Remove:"Remove"},q={Name:"This name is used as an identifier for the template",Display:"This is the name that will be displayed to users for example during server creation",Type:"This is used to group different templates and to decide what icon to display for it on the server list",Variables:"Variables will be shown to users as settings on a server, they are useful for example to let the user define what version to use or to define some settings like the port to use",Install:"Here you define what steps will be run when a user hits the install button of a server created from this template",Command:"This is the command that will be executed to start the server",StopCommand:"Write a command to the servers console when a users hits the srvers stop button",StopSignal:"Send a signal to the server when a users hits the srvers stop button, this can for example be used to emulate hitting CTRL+C",PreRunHook:"Here you can define some steps to run every time just before the server starts",PostRunHook:"Here you can define some steps to run every time after the server stops"},B="\u5DE5\u4F5C\u76EE\u5F55",F="General",j="Hooks",K="Import template";var Y={Templates:e,Save:t,Saved:o,Delete:n,ConfirmDelete:s,Deleted:a,New:r,EditLocalOnly:i,CreateLocalCopy:l,ConfirmOverwrite:d,Overwrite:m,Json:c,Display:p,Type:u,AddVariable:v,Variables:h,AddInstallStep:y,Install:b,Filename:S,Version:C,Environment:f,EnvEnabled:w,AddEnvVar:g,EnvVars:T,DockerImage:I,RunConfig:k,AddPreStep:A,PreRunHook:E,AddPostStep:D,PostRunHook:H,Shutdown:R,Command:V,StopCommand:G,StopSignal:O,NoGroup:P,AddVariableGroup:N,CommandConditionHint:L,AddCommand:x,AddEnvironment:W,signals:J,errors:M,variables:U,description:q,WorkingDirectory:B,General:F,Hooks:j,Import:K,import:{CommunityWarning:"These templates are made by the community and provided without any warranties"}};export{x as AddCommand,g as AddEnvVar,W as AddEnvironment,y as AddInstallStep,D as AddPostStep,A as AddPreStep,v as AddVariable,N as AddVariableGroup,V as Command,L as CommandConditionHint,s as ConfirmDelete,d as ConfirmOverwrite,l as CreateLocalCopy,n as Delete,a as Deleted,p as Display,I as DockerImage,i as EditLocalOnly,w as EnvEnabled,T as EnvVars,f as Environment,S as Filename,F as General,j as Hooks,K as Import,b as Install,c as Json,r as New,P as NoGroup,m as Overwrite,H as PostRunHook,E as PreRunHook,k as RunConfig,t as Save,o as Saved,R as Shutdown,G as StopCommand,O as StopSignal,e as Templates,u as Type,h as Variables,C as Version,B as WorkingDirectory,Y as default,q as description,M as errors,J as signals,U as variables};
//# sourceMappingURL=templates-e9ae8a8c.js.map