const e="Templates",t="Save Template",o="Template saved",n="Delete Template",s="Do you really want to delete the template {name}?",a="Template deleted",r="Create new template",i="You can only save changes made to local templates",l="Create local copy",d="A template with this name already exists. Overwrite it?",m="Overwrite",p="JSON",c="Display Name",u="Type",v="Add variable",h="Variables",y="Add Install Step",b="Install",S="Filename",C="Version",f="Environment",g="Environment Enabled",w="Add env variable",T="Environment variables",A="Docker Image",I="Run Configuration",E="Add Pre Run Step",k="Pre Run Hook",D="Add Post Run Step",R="Post Run Hook",V="Shutdown",H="Command",G="Stop Command",P="Stop Signal",O="No Group",N="Add Variable Group",L="Use this command only if this condition is met",x="Add Command",W="Add Environment",F={"1":"SIGHUP","2":"SIGINT (CTRL+C)","9":"SIGKILL","15":"SIGTERM"},J={NameInvalid:"A template name cannot be blank and cannot contain spaces or special characters",DisplayInvalid:"The display name cannot be blank",TypeInvalid:"The type cannot be blank",CommandInvalid:"The command cannot be blank"},M={Description:"Description",Type:"Type",Value:"Default Value",Required:"This variable is required",UserEdit:"Non-admin users can edit this variable",Internal:"Internal (never shown to users or admins)",Options:"Options",ConditionHint:"Only show this group if this condition is met",types:{String:"String",Boolean:"Boolean",Number:"Number",Options:"Options"},EditGroup:"Edit group",RemoveGroup:"Remove group",MoveToGroup:"Move to different group",Remove:"Remove"},U={Name:"This name is used as an identifier for the template",Display:"This is the name that will be displayed to users for example during server creation",Type:"This is used to group different templates and to decide what icon to display for it on the server list",Variables:"Variables will be shown to users as settings on a server, they are useful for example to let the user define what version to use or to define some settings like the port to use",Install:"Here you define what steps will be run when a user hits the install button of a server created from this template",Command:"This is the command that will be executed to start the server",StopCommand:"Write a command to the servers console when a users hits the srvers stop button",StopSignal:"Send a signal to the server when a users hits the srvers stop button, this can for example be used to emulate hitting CTRL+C",PreRunHook:"Here you can define some steps to run every time just before the server starts",PostRunHook:"Here you can define some steps to run every time after the server stops"},q="Working Directory",B="General",j="Hooks",K="Import template";var Y={Templates:e,Save:t,Saved:o,Delete:n,ConfirmDelete:s,Deleted:a,New:r,EditLocalOnly:i,CreateLocalCopy:l,ConfirmOverwrite:d,Overwrite:m,Json:p,Display:c,Type:u,AddVariable:v,Variables:h,AddInstallStep:y,Install:b,Filename:S,Version:C,Environment:f,EnvEnabled:g,AddEnvVar:w,EnvVars:T,DockerImage:A,RunConfig:I,AddPreStep:E,PreRunHook:k,AddPostStep:D,PostRunHook:R,Shutdown:V,Command:H,StopCommand:G,StopSignal:P,NoGroup:O,AddVariableGroup:N,CommandConditionHint:L,AddCommand:x,AddEnvironment:W,signals:F,errors:J,variables:M,description:U,WorkingDirectory:q,General:B,Hooks:j,Import:K,import:{CommunityWarning:"These templates are made by the community and provided without any warranties"}};export{x as AddCommand,w as AddEnvVar,W as AddEnvironment,y as AddInstallStep,D as AddPostStep,E as AddPreStep,v as AddVariable,N as AddVariableGroup,H as Command,L as CommandConditionHint,s as ConfirmDelete,d as ConfirmOverwrite,l as CreateLocalCopy,n as Delete,a as Deleted,c as Display,A as DockerImage,i as EditLocalOnly,g as EnvEnabled,T as EnvVars,f as Environment,S as Filename,B as General,j as Hooks,K as Import,b as Install,p as Json,r as New,O as NoGroup,m as Overwrite,R as PostRunHook,k as PreRunHook,I as RunConfig,t as Save,o as Saved,V as Shutdown,G as StopCommand,P as StopSignal,e as Templates,u as Type,h as Variables,C as Version,q as WorkingDirectory,Y as default,U as description,J as errors,F as signals,M as variables};
//# sourceMappingURL=templates-117d528e.js.map
