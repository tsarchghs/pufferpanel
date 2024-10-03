const e="Mallipohjat",t="Save Template",o="Template saved",n="Delete Template",s="Do you really want to delete the template {name}?",a="Mallipohja poistettu",i="Luo uusi mallipohja",r="You can only save changes made to local templates",l="Create local copy",d="A template with this name already exists. Overwrite it?",m="Overwrite",p="JSON",c="N\xE4ytt\xF6nimi",u="Tyyppi",h="Lis\xE4\xE4 muuttuja",v="Muuttujat",y="Lis\xE4\xE4 Asennusvaihe",S="Asenna",b="Tiedoston nimi",C="Versio",f="Ymp\xE4rist\xF6",g="Environment Enabled",w="Lis\xE4\xE4 env muuttuja",T="Ymp\xE4rist\xF6n muuttujat",A="Docker Image",k="Suorita Asetukset",I="Add Pre Run Step",D="Pre Run Hook",E="Add Post Run Step",R="Post Run Hook",H="Shutdown",V="Command",G="Stop Command",P="Stop Signal",O="No Group",N="Add Variable Group",L="Use this command only if this condition is met",j="Add Command",x="Add Environment",M={"1":"SIGHUP","2":"SIGINT (CTRL+C)","9":"SIGKILL","15":"SIGTERM"},W={NameInvalid:"A template name cannot be blank and cannot contain spaces or special characters",DisplayInvalid:"The display name cannot be blank",TypeInvalid:"The type cannot be blank",CommandInvalid:"The command cannot be blank"},J={Description:"Description",Type:"Type",Value:"Default Value",Required:"This variable is required",UserEdit:"Non-admin users can edit this variable",Internal:"Internal (never shown to users or admins)",Options:"Options",ConditionHint:"Only show this group if this condition is met",types:{String:"String",Boolean:"Boolean",Number:"Number",Options:"Options"},EditGroup:"Edit group",RemoveGroup:"Remove group",MoveToGroup:"Move to different group",Remove:"Remove"},U={Name:"This name is used as an identifier for the template",Display:"This is the name that will be displayed to users for example during server creation",Type:"This is used to group different templates and to decide what icon to display for it on the server list",Variables:"Variables will be shown to users as settings on a server, they are useful for example to let the user define what version to use or to define some settings like the port to use",Install:"Here you define what steps will be run when a user hits the install button of a server created from this template",Command:"This is the command that will be executed to start the server",StopCommand:"Write a command to the servers console when a users hits the srvers stop button",StopSignal:"Send a signal to the server when a users hits the srvers stop button, this can for example be used to emulate hitting CTRL+C",PreRunHook:"Here you can define some steps to run every time just before the server starts",PostRunHook:"Here you can define some steps to run every time after the server stops"},Y="Working Directory",q="General",B="Hooks",F="Import template";var K={Templates:e,Save:t,Saved:o,Delete:n,ConfirmDelete:s,Deleted:a,New:i,EditLocalOnly:r,CreateLocalCopy:l,ConfirmOverwrite:d,Overwrite:m,Json:p,Display:c,Type:u,AddVariable:h,Variables:v,AddInstallStep:y,Install:S,Filename:b,Version:C,Environment:f,EnvEnabled:g,AddEnvVar:w,EnvVars:T,DockerImage:A,RunConfig:k,AddPreStep:I,PreRunHook:D,AddPostStep:E,PostRunHook:R,Shutdown:H,Command:V,StopCommand:G,StopSignal:P,NoGroup:O,AddVariableGroup:N,CommandConditionHint:L,AddCommand:j,AddEnvironment:x,signals:M,errors:W,variables:J,description:U,WorkingDirectory:Y,General:q,Hooks:B,Import:F,import:{CommunityWarning:"These templates are made by the community and provided without any warranties"}};export{j as AddCommand,w as AddEnvVar,x as AddEnvironment,y as AddInstallStep,E as AddPostStep,I as AddPreStep,h as AddVariable,N as AddVariableGroup,V as Command,L as CommandConditionHint,s as ConfirmDelete,d as ConfirmOverwrite,l as CreateLocalCopy,n as Delete,a as Deleted,c as Display,A as DockerImage,r as EditLocalOnly,g as EnvEnabled,T as EnvVars,f as Environment,b as Filename,q as General,B as Hooks,F as Import,S as Install,p as Json,i as New,O as NoGroup,m as Overwrite,R as PostRunHook,D as PreRunHook,k as RunConfig,t as Save,o as Saved,H as Shutdown,G as StopCommand,P as StopSignal,e as Templates,u as Type,v as Variables,C as Version,Y as WorkingDirectory,K as default,U as description,W as errors,M as signals,J as variables};
//# sourceMappingURL=templates-5a2e32a7.js.map
