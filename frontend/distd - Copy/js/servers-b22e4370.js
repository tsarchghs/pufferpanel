const e="\u062E\u0648\u0627\u062F\u0645",t="\u0625\u0636\u0627\u0641\u0629 \u062E\u0627\u062F\u0645",n="\u0648\u062D\u062F\u0629 \u0627\u0644\u062A\u062D\u0643\u0645",s="\u0645\u0639\u0644\u0648\u0645\u0627\u062A SFTP",o="\u0628\u062F\u0621",a="\u0625\u064A\u0642\u0627\u0641",i="\u0641\u0631\u0636 \u0627\u0644\u0625\u064A\u0642\u0627\u0641",r="\u062A\u062B\u0628\u064A\u062A",l="Do you want to run the automatic install right now?",c="If you don't run it now you'll have to either run it later or set the server up manually",d="\u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A",m="\u0648\u062D\u062F\u0629 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0631\u0643\u0632\u064A\u0629",v="\u0630\u0627\u0643\u0631\u0629 \u0627\u0644\u0648\u0635\u0648\u0644 \u0627\u0644\u0639\u0634\u0648\u0627\u0626\u064A",S="Heapspace allocated",p="Heapspace in use",h="Metaspace allocated",u="Metaspace in use",g="\u0627\u0644\u0645\u0644\u0641\u0627\u062A",y="\u0627\u0633\u0645 \u0627\u0644\u062E\u0627\u062F\u0645",C="Edit server name",f="The server name cannot be empty or contain special characters",I="\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u0642\u0627\u0644\u0628",P="\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0647\u0630\u0627 \u0627\u0644\u0642\u0627\u0644\u0628",T="\u0628\u064A\u0626\u0629 \u0627\u0644\u0646\u0638\u0627\u0645",A="\u0627\u0644\u0645\u0634\u0631\u0641",E="\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A",N="Save Settings",w="Settings saved",D="This setting is only visible to admins",H="This server does not have any settings you can change",M="\u062D\u0630\u0641 \u0627\u0644\u062E\u0627\u062F\u0645",U="\u0647\u0644 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062E\u0627\u062F\u0645 \u062D\u0642\u0627\u064B\u061F (\u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0647\u0630\u0627)",F="\u0627\u0644\u062E\u0627\u062F\u0645 \u0627\u0644\u0645\u062D\u0630\u0648\u0641",J="\u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0640 SFTP",R="Edit Server Definition",O="\u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062E\u0627\u062F\u0645 \u0645\u0646 \u0627\u0644\u0642\u0631\u0635",k="\u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062E\u0627\u062F\u0645",b="Create Server",x="API",B="This server does not have any associated users",K="Invite user",W="Changes to these settings will only apply after reloading the server definition",G="Command",Y="You don't have permission to view nodes or templates, these are needed for server creation, please talk to your admin",j="Autostart conditions",q="The websocket connection failed, the console will only update every few seconds",z="{current}/{max} players online",L={autoStart:"Start the server when the node starts",autoRestartOnGraceful:"Restart the server when it stops normally",autoRestartOnCrash:"Restart the server when it crashes"};var Q={Servers:e,Add:t,Console:n,SFTPInfo:s,Start:o,Stop:a,Kill:i,Install:r,InstallPrompt:l,InstallPromptBody:c,Statistics:d,CPU:m,Memory:v,JvmHeapAlloc:S,JvmHeapUsed:p,JvmMetaAlloc:h,JvmMetaUsed:u,Files:g,Name:y,EditName:C,NameInvalid:f,SelectTemplate:I,SelectThisTemplate:P,Environment:T,Admin:A,Settings:E,SaveSettings:N,SettingsSaved:w,AdminOnlySetting:D,NoSettings:H,Delete:M,ConfirmDelete:U,Deleted:F,SftpConnection:J,EditDefinition:R,Reload:O,Reloaded:k,Create:b,API:x,NoUsers:B,InviteUser:K,EnvironmentEditHint:W,Command:G,CreateMissingPermissions:Y,FlagsHeader:j,SocketWarnConsole:q,NumPlayersOnline:z,flags:L};export{x as API,t as Add,A as Admin,D as AdminOnlySetting,m as CPU,G as Command,U as ConfirmDelete,n as Console,b as Create,Y as CreateMissingPermissions,M as Delete,F as Deleted,R as EditDefinition,C as EditName,T as Environment,W as EnvironmentEditHint,g as Files,j as FlagsHeader,r as Install,l as InstallPrompt,c as InstallPromptBody,K as InviteUser,S as JvmHeapAlloc,p as JvmHeapUsed,h as JvmMetaAlloc,u as JvmMetaUsed,i as Kill,v as Memory,y as Name,f as NameInvalid,H as NoSettings,B as NoUsers,z as NumPlayersOnline,O as Reload,k as Reloaded,s as SFTPInfo,N as SaveSettings,I as SelectTemplate,P as SelectThisTemplate,e as Servers,E as Settings,w as SettingsSaved,J as SftpConnection,q as SocketWarnConsole,o as Start,d as Statistics,a as Stop,Q as default,L as flags};
//# sourceMappingURL=servers-b22e4370.js.map
