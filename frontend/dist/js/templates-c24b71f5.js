const e="Mod\xE8les",n="Enregistrer le mod\xE8le",o="Mod\xE8le enregistr\xE9",r="Supprimer le mod\xE8le",t="Voulez-vous vraiment supprimer ce mod\xE8le {name} ?",s="Mod\xE8le supprim\xE9",i="Cr\xE9er un nouveau mod\xE8le",a="Vous pouvez seulement enregistrer les modifications apport\xE9es aux mod\xE8les locaux",u="Enregistrez une copie locale",l="Un mod\xE8le avec ce nom existe d\xE9j\xE0. Voulez-vous l'\xE9craser ?",d="\xC9craser",c="JSON",m="Nom",p="Type",v="Ajouter une variable",C="Variables",f="Ajouter une \xE9tape d'Installation",A="Installer",I="Nom du fichier",S="Version",g="Environnement",b="Environnement activ\xE9",E="Ajouter une nouvelle variable d'environnement",x="Variables d'environnement",y="Image Docker",V="Configuration d'Ex\xE9cution",q="Ajouter une \xE9tape de pr\xE9-ex\xE9cution",D="Avant-ex\xE9cution",T="Ajouter une \xE9tape d'apr\xE8s-ex\xE9cution",N="Apr\xE8s-ex\xE9cution",R="Arr\xEAter",G="Commande",k="Commande d'arr\xEAt",h="Arr\xEAter le signal",L="Aucun groupe",O="Ajouter un Groupe de Variables",H="Utiliser cette commande uniquement si cette condition est remplie",P="Ajouter une Commande",j="Ajouter un Environnement",w={"1":"INSCRIPTION","2":"SIGINT (CTRL+C)","9":"SIGKILL","15":"SIGTERM"},z={NameInvalid:"Un nom de mod\xE8le ne peut pas \xEAtre vide et ne peut pas contenir d'espaces ou de caract\xE8res sp\xE9ciaux",DisplayInvalid:"Ne nom affich\xE9 ne peut pas \xEAtre vide",TypeInvalid:"Le type ne peut pas \xEAtre vide",CommandInvalid:"La commande ne peut pas \xEAtre vide"},M={Description:"Description",Type:"Type",Value:"Valeur par d\xE9faut",Required:"Cette variable est requise",UserEdit:"Les utilisateurs non-administrateurs peuvent modifier cette variable",Internal:"Interne (jamais affich\xE9 aux utilisateurs ou aux administrateurs)",Options:"Options",ConditionHint:"Afficher ce groupe uniquement si cette condition est remplie",types:{String:"Texte",Boolean:"Bool\xE9en",Number:"Nombre",Options:"Options"},EditGroup:"\xC9diter le groupe",RemoveGroup:"Supprimer le groupe",MoveToGroup:"D\xE9placer vers un groupe diff\xE9rent",Remove:"Supprimer"},U={Name:"Ce nom est utilis\xE9 comme identifiant pour le mod\xE8le",Display:"Il s'agit du nom qui sera affich\xE9 aux utilisateurs comme exemple durant la cr\xE9ation de serveurs",Type:"Ceci est utilis\xE9 pour grouper diff\xE9rents mod\xE8les et d\xE9cider quelle ic\xF4ne afficher sur la liste du serveur",Variables:"Les variables seront affich\xE9es aux utilisateurs comme des param\xE8tres sur un serveur, elles sont utiles par exemple pour permettre \xE0 l'utilisateur de d\xE9finir la version \xE0 utiliser ou de d\xE9finir certains param\xE8tres comme le port \xE0 utiliser",Install:"D\xE9finissez ici quelles \xE9tapes seront ex\xE9cut\xE9es lorsqu'un utilisateur clique sur le bouton d'installation d'un serveur cr\xE9\xE9 \xE0 partir de ce mod\xE8le",Command:"C'est la commande qui sera ex\xE9cut\xE9e pour d\xE9marrer le serveur",StopCommand:"\xC9crire une commande dans la console du serveur lorsqu'un utilisateur clique sur le bouton d'arr\xEAt du serveur",StopSignal:"Envoyer un signal au serveur lorsqu'un utilisateur clique sur le bouton d'arr\xEAt du serveur, cela peut par exemple \xEAtre utilis\xE9 pour \xE9muler appuyer sur CTRL+C",PreRunHook:"Ici, vous pouvez d\xE9finir quelques \xE9tapes \xE0 ex\xE9cuter \xE0 chaque fois avant que le serveur ne d\xE9marre",PostRunHook:"Ici, vous pouvez d\xE9finir quelques \xE9tapes \xE0 ex\xE9cuter \xE0 chaque fois apr\xE8s l'arr\xEAt du serveur"},J="Dossier de travail",W="G\xE9n\xE9ral",B="Crochets",F="Importer un mod\xE8le";var K={Templates:e,Save:n,Saved:o,Delete:r,ConfirmDelete:t,Deleted:s,New:i,EditLocalOnly:a,CreateLocalCopy:u,ConfirmOverwrite:l,Overwrite:d,Json:c,Display:m,Type:p,AddVariable:v,Variables:C,AddInstallStep:f,Install:A,Filename:I,Version:S,Environment:g,EnvEnabled:b,AddEnvVar:E,EnvVars:x,DockerImage:y,RunConfig:V,AddPreStep:q,PreRunHook:D,AddPostStep:T,PostRunHook:N,Shutdown:R,Command:G,StopCommand:k,StopSignal:h,NoGroup:L,AddVariableGroup:O,CommandConditionHint:H,AddCommand:P,AddEnvironment:j,signals:w,errors:z,variables:M,description:U,WorkingDirectory:J,General:W,Hooks:B,Import:F,import:{CommunityWarning:"Ces mod\xE8les sont r\xE9alis\xE9s par la communaut\xE9 et sont fournis sans garantie"}};export{P as AddCommand,E as AddEnvVar,j as AddEnvironment,f as AddInstallStep,T as AddPostStep,q as AddPreStep,v as AddVariable,O as AddVariableGroup,G as Command,H as CommandConditionHint,t as ConfirmDelete,l as ConfirmOverwrite,u as CreateLocalCopy,r as Delete,s as Deleted,m as Display,y as DockerImage,a as EditLocalOnly,b as EnvEnabled,x as EnvVars,g as Environment,I as Filename,W as General,B as Hooks,F as Import,A as Install,c as Json,i as New,L as NoGroup,d as Overwrite,N as PostRunHook,D as PreRunHook,V as RunConfig,n as Save,o as Saved,R as Shutdown,k as StopCommand,h as StopSignal,e as Templates,p as Type,C as Variables,S as Version,J as WorkingDirectory,K as default,U as description,z as errors,w as signals,M as variables};
//# sourceMappingURL=templates-c24b71f5.js.map
