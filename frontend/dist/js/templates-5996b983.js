const e="\uD15C\uD50C\uB9BF",t="Save Template",o="Template saved",n="Delete Template",s="Do you really want to delete the template {name}?",a="\uD15C\uD50C\uB9BF\uC774 \uC0AD\uC81C\uB418\uC5C8\uC2B5\uB2C8\uB2E4",r="\uC0C8 \uD15C\uD50C\uB9BF \uB9CC\uB4E4\uAE30",i="You can only save changes made to local templates",l="Create local copy",d="A template with this name already exists. Overwrite it?",m="Overwrite",c="JSON",p="\uC774\uB984",u="\uC720\uD615",v="\uBCC0\uC218 \uCD94\uAC00",h="\uBCC0\uC218",b="\uC124\uCE58 \uACFC\uC815 \uCD94\uAC00",y="\uC124\uCE58",S="\uD30C\uC77C \uC774\uB984",C="\uBC84\uC804",f="\uD658\uACBD",g="Environment Enabled",w="\uD658\uACBD \uBCC0\uC218 \uCD94\uAC00",T="\uD658\uACBD \uBCC0\uC218",I="Docker \uC774\uBBF8\uC9C0",k="\uC2E4\uD589 \uC124\uC815",A="\uC2E4\uD589 \uC804 \uB2E8\uACC4 \uCD94\uAC00",E="Pre Run Hook",D="\uC2E4\uD589 \uD6C4 \uB2E8\uACC4 \uCD94\uAC00",H="Post Run Hook",R="\uC815\uC9C0",V="\uBA85\uB839",G="Stop Command",O="Stop Signal",P="No Group",N="Add Variable Group",L="Use this command only if this condition is met",x="Add Command",W="Add Environment",J={"1":"SIGHUP","2":"SIGINT (CTRL+C)","9":"SIGKILL","15":"SIGTERM"},M={NameInvalid:"A template name cannot be blank and cannot contain spaces or special characters",DisplayInvalid:"The display name cannot be blank",TypeInvalid:"The type cannot be blank",CommandInvalid:"The command cannot be blank"},U={Description:"Description",Type:"Type",Value:"Default Value",Required:"This variable is required",UserEdit:"Non-admin users can edit this variable",Internal:"Internal (never shown to users or admins)",Options:"Options",ConditionHint:"Only show this group if this condition is met",types:{String:"String",Boolean:"Boolean",Number:"Number",Options:"Options"},EditGroup:"Edit group",RemoveGroup:"Remove group",MoveToGroup:"Move to different group",Remove:"Remove"},q={Name:"This name is used as an identifier for the template",Display:"This is the name that will be displayed to users for example during server creation",Type:"This is used to group different templates and to decide what icon to display for it on the server list",Variables:"Variables will be shown to users as settings on a server, they are useful for example to let the user define what version to use or to define some settings like the port to use",Install:"Here you define what steps will be run when a user hits the install button of a server created from this template",Command:"This is the command that will be executed to start the server",StopCommand:"Write a command to the servers console when a users hits the srvers stop button",StopSignal:"Send a signal to the server when a users hits the srvers stop button, this can for example be used to emulate hitting CTRL+C",PreRunHook:"Here you can define some steps to run every time just before the server starts",PostRunHook:"Here you can define some steps to run every time after the server stops"},B="\uC791\uC5C5 \uD3F4\uB354",F="General",j="Hooks",K="Import template";var Y={Templates:e,Save:t,Saved:o,Delete:n,ConfirmDelete:s,Deleted:a,New:r,EditLocalOnly:i,CreateLocalCopy:l,ConfirmOverwrite:d,Overwrite:m,Json:c,Display:p,Type:u,AddVariable:v,Variables:h,AddInstallStep:b,Install:y,Filename:S,Version:C,Environment:f,EnvEnabled:g,AddEnvVar:w,EnvVars:T,DockerImage:I,RunConfig:k,AddPreStep:A,PreRunHook:E,AddPostStep:D,PostRunHook:H,Shutdown:R,Command:V,StopCommand:G,StopSignal:O,NoGroup:P,AddVariableGroup:N,CommandConditionHint:L,AddCommand:x,AddEnvironment:W,signals:J,errors:M,variables:U,description:q,WorkingDirectory:B,General:F,Hooks:j,Import:K,import:{CommunityWarning:"\uC774 \uD15C\uD50C\uB9BF\uC740 \uCEE4\uBBA4\uB2C8\uD2F0\uC5D0\uC11C \uC81C\uC791\uB418\uBA70, \uBCF4\uC99D\uC5C6\uC774 \uC81C\uACF5\uB429\uB2C8\uB2E4."}};export{x as AddCommand,w as AddEnvVar,W as AddEnvironment,b as AddInstallStep,D as AddPostStep,A as AddPreStep,v as AddVariable,N as AddVariableGroup,V as Command,L as CommandConditionHint,s as ConfirmDelete,d as ConfirmOverwrite,l as CreateLocalCopy,n as Delete,a as Deleted,p as Display,I as DockerImage,i as EditLocalOnly,g as EnvEnabled,T as EnvVars,f as Environment,S as Filename,F as General,j as Hooks,K as Import,y as Install,c as Json,r as New,P as NoGroup,m as Overwrite,H as PostRunHook,E as PreRunHook,k as RunConfig,t as Save,o as Saved,R as Shutdown,G as StopCommand,O as StopSignal,e as Templates,u as Type,h as Variables,C as Version,B as WorkingDirectory,Y as default,q as description,M as errors,J as signals,U as variables};
//# sourceMappingURL=templates-5996b983.js.map
