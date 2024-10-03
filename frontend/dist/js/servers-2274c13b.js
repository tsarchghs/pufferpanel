const e="\u0421\u0435\u0440\u0432\u0435\u0440\u0438",t="\u0414\u043E\u0434\u0430\u0442\u0438 \u0441\u0435\u0440\u0432\u0435\u0440",n="\u0422\u0435\u0440\u043C\u0456\u043D\u0430\u043B",s="\u0412\u0456\u0434\u043E\u043C\u043E\u0441\u0442\u0456 \u043F\u0440\u043E SFTP",o="\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0438",a="\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0438",i="\u0412\u0431\u0438\u0442\u0438",l="\u0412\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0438",r="Do you want to run the automatic install right now?",c="If you don't run it now you'll have to either run it later or set the server up manually",d="\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430",m="\u0426\u041F",v="\u041F\u0430\u043C'\u044F\u0442\u044C",S="Heapspace allocated",p="Heapspace in use",h="Metaspace allocated",u="Metaspace in use",g="\u0424\u0430\u0439\u043B\u0438",y="\u0406\u043C'\u044F \u0441\u0435\u0440\u0432\u0435\u0440\u0430",C="Edit server name",f="\u0406\u043C'\u044F \u0441\u0435\u0440\u0432\u0435\u0440\u0430 \u043D\u0435 \u043C\u043E\u0436\u0435 \u0431\u0443\u0442\u0438 \u043F\u0443\u0441\u0442\u0438\u043C \u0430\u0431\u043E \u043C\u0456\u0441\u0442\u0438\u0442\u0438 \u0441\u043F\u0435\u0446\u0456\u0430\u043B\u044C\u043D\u0456 \u0441\u0438\u043C\u0432\u043E\u043B\u0438",I="\u0411\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u043E\u0431\u0435\u0440\u0456\u0442\u044C \u0448\u0430\u0431\u043B\u043E\u043D",P="\u0412\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0432\u0430\u0442\u0438 \u0446\u0435\u0439 \u0448\u0430\u0431\u043B\u043E\u043D",A="\u0421\u0435\u0440\u0435\u0434\u043E\u0432\u0438\u0449\u0435",T="\u0410\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u043E\u0440",N="\u041D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F",w="Save Settings",E="Settings saved",H="This setting is only visible to admins",M="This server does not have any settings you can change",U="\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0441\u0435\u0440\u0432\u0435\u0440",D="\u0412\u0438 \u0434\u0456\u0439\u0441\u043D\u043E \u0431\u0430\u0436\u0430\u0454\u0442\u0435 \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0446\u0435\u0439 \u0441\u0435\u0440\u0432\u0435\u0440? (\u0446\u0435 \u043D\u0435 \u043C\u043E\u0436\u043D\u0430 \u0441\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438)",F="\u0421\u0435\u0440\u0432\u0435\u0440 \u0431\u0443\u0432 \u0432\u0438\u0434\u0430\u043B\u0435\u043D",J="\u041F\u0456\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u044F \u0434\u043E SFTP",R="\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438 \u0432\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u0441\u0435\u0440\u0432\u0435\u0440\u0430",O="\u041F\u0435\u0440\u0435\u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u0442\u0438 \u0434\u0430\u043D\u0456 \u0437 \u0434\u0438\u0441\u043A\u0430",k="\u041F\u0435\u0440\u0435\u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0434\u0430\u043D\u0438\u0445 \u0441\u0435\u0440\u0432\u0435\u0440\u0430",b="Create Server",x="API",B="This server does not have any associated users",K="Invite user",W="Changes to these settings will only apply after reloading the server definition",G="Command",Y="You don't have permission to view nodes or templates, these are needed for server creation, please talk to your admin",j="Autostart conditions",q="The websocket connection failed, the console will only update every few seconds",z="{current}/{max} players online",L={autoStart:"Start the server when the node starts",autoRestartOnGraceful:"Restart the server when it stops normally",autoRestartOnCrash:"Restart the server when it crashes"};var Q={Servers:e,Add:t,Console:n,SFTPInfo:s,Start:o,Stop:a,Kill:i,Install:l,InstallPrompt:r,InstallPromptBody:c,Statistics:d,CPU:m,Memory:v,JvmHeapAlloc:S,JvmHeapUsed:p,JvmMetaAlloc:h,JvmMetaUsed:u,Files:g,Name:y,EditName:C,NameInvalid:f,SelectTemplate:I,SelectThisTemplate:P,Environment:A,Admin:T,Settings:N,SaveSettings:w,SettingsSaved:E,AdminOnlySetting:H,NoSettings:M,Delete:U,ConfirmDelete:D,Deleted:F,SftpConnection:J,EditDefinition:R,Reload:O,Reloaded:k,Create:b,API:x,NoUsers:B,InviteUser:K,EnvironmentEditHint:W,Command:G,CreateMissingPermissions:Y,FlagsHeader:j,SocketWarnConsole:q,NumPlayersOnline:z,flags:L};export{x as API,t as Add,T as Admin,H as AdminOnlySetting,m as CPU,G as Command,D as ConfirmDelete,n as Console,b as Create,Y as CreateMissingPermissions,U as Delete,F as Deleted,R as EditDefinition,C as EditName,A as Environment,W as EnvironmentEditHint,g as Files,j as FlagsHeader,l as Install,r as InstallPrompt,c as InstallPromptBody,K as InviteUser,S as JvmHeapAlloc,p as JvmHeapUsed,h as JvmMetaAlloc,u as JvmMetaUsed,i as Kill,v as Memory,y as Name,f as NameInvalid,M as NoSettings,B as NoUsers,z as NumPlayersOnline,O as Reload,k as Reloaded,s as SFTPInfo,w as SaveSettings,I as SelectTemplate,P as SelectThisTemplate,e as Servers,N as Settings,E as SettingsSaved,J as SftpConnection,q as SocketWarnConsole,o as Start,d as Statistics,a as Stop,Q as default,L as flags};
//# sourceMappingURL=servers-2274c13b.js.map