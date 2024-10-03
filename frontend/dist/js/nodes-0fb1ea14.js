const e="N\u0153ud",t="N\u0153uds",n="\xC9diter le N\u0153ud",r="Ajouter un N\u0153ud",s="Cr\xE9er un noeud",o="Mettre \xE0 jour le N\u0153ud",u="Supprimer le N\u0153ud",a="Voulez-vous vraiment supprimer le n\u0153ud {name} ?",l="Cr\xE9er un noeud",i="Mettre \xE0 jour le N\u0153ud",d="Supprimer le N\u0153ud",c="Ce n\u0153ud est correctement configur\xE9 et ex\xE9cut\xE9",p="Ce noeud est soit mal configur\xE9e ou actuellement indisponible",f={os:{label:"Syst\xE8me d'exploitation",linux:"Linux",windows:"Windows"},arch:{label:"Architecture du CPU",amd64:"x86 64bits",arm:"ARM 32bits",arm64:"ARM 64bits"},docker:{true:"Docker disponible",false:"Docker indisponible"},envs:"Environnements disponibles"},P="H\xF4te Public",m="Port Public",v="H\xF4te Priv\xE9",b="Port Priv\xE9",h="Port SFTP",N="Utiliser un h\xF4te/port diff\xE9rent pour la communication serveur \xE0 serveur",A="Cette adresse s\xE9par\xE9e est utilis\xE9e lorsque le n\u0153ud principal a besoin de parler au nouveau n\u0153ud. Utile par exemple lorsque les n\u0153uds sont dans le m\xEAme r\xE9seau derri\xE8re NAT.",D=`Le n\u0153ud local n'a pas de param\xE8tres modifiables

Pour modifier l'h\xF4te affich\xE9 avec les serveurs h\xE9berg\xE9s sur ce n\u0153ud, ajustez l'url principale du panel dans les param\xE8tres`,C="D\xE9ployer le N\u0153ud",g={Step1:`## \xC9tape 1

Installez PufferPanel sur le nouveau serveur, [voir la documentation pour plus de d\xE9tails](https://docs.pufferpanel.com/en/latest/installing.html)`,Step2:"## \xC9tape 2\n\nArr\xEAtez le service PufferPanel sur le nouveau serveur s'il a \xE9t\xE9 d\xE9marr\xE9 pendant l'installation en ex\xE9cutant `sudo systemctl stop pufferpanel`",Step3:"## \xC9tape 3\n\nRemplacez le contenu du fichier de configuration de PufferPanel sur le nouveau serveur par le code ci-dessous\n\nLe fichier de configuration se trouve g\xE9n\xE9ralement dans `/etc/pufferpanel/config.json`\n\n```\n{config}\n```",Step4:"## \xC9tape 4\n\nActivez et (re)d\xE9marrez le service PufferPanel sur le nouveau serveur en ex\xE9cutant `sudo systemctl enable --now pufferpanel`",Step5:"### Votre nouveau n\u0153ud est maintenant configur\xE9 et pr\xEAt \xE0 \xEAtre utilis\xE9"},y="Pour d\xE9ployer le n\u0153ud, installez PufferPanel sur le nouveau serveur et placez le fichier de configuration dans `/etc/pufferpanel`<br/>Red\xE9marrez PufferPanel sur le nouveau serveur une fois termin\xE9.";var S={Node:e,Nodes:t,Edit:n,Add:r,Create:s,Update:o,Delete:u,ConfirmDelete:a,Created:l,Updated:i,Deleted:d,Reachable:c,Unreachable:p,features:f,PublicHost:P,PublicPort:m,PrivateHost:v,PrivatePort:b,SftpPort:h,WithPrivateAddress:N,WithPrivateAddressHint:A,LocalNodeEdit:D,Deploy:C,deploy:g,DeploymentInstruction:y};export{r as Add,a as ConfirmDelete,s as Create,l as Created,u as Delete,d as Deleted,C as Deploy,y as DeploymentInstruction,n as Edit,D as LocalNodeEdit,e as Node,t as Nodes,v as PrivateHost,b as PrivatePort,P as PublicHost,m as PublicPort,c as Reachable,h as SftpPort,p as Unreachable,o as Update,i as Updated,N as WithPrivateAddress,A as WithPrivateAddressHint,S as default,g as deploy,f as features};
//# sourceMappingURL=nodes-0fb1ea14.js.map
