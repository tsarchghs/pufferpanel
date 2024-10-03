const e="Node",t="Node-uri",n="Editare modul",o="Adaug\u0103 modul",r="Creaz\u0103 Node",i="Actualizare modul",a="\u0218terge modul",s="E\u015Fti sigur c\u0103 vrei s\u0103 \u015Ftergi node-ul {name}?",l="Node creat",u="Node actualizat",c="Node \u0219ters",d="Acest node este configurat \u0219i func\u021Bioneaz\u0103 corect",p="Acest node nu este configurat corect sau nu este disponibil \xEEn prezent",f={os:{label:"Sistem de operare",linux:"Linux",windows:"Windows"},arch:{label:"Arhitectura procesorului",amd64:"x86 64bit",arm:"ARM 32bit",arm64:"ARM 64bit"},docker:{true:"Docker disponibil",false:"Docker indisponibil"},envs:"Available Environments"},P="Host Public",m="Port Public",v="Host Privat",b="Port privat",A="Port SFTP",N="Folose\u0219te un host/port diferit pentru comunicarea dintre servere",g="Acest\u0103 adres\u0103 separat\u0103 este folosit\u0103 atunci c\xE2nd node-ul principal comunic\u0103 cu node-ul nou. Folositor, de exemplu, pentru node-uri care se afl\u0103 \xEEn aceea\u0219i re\u021Bea \xEEn spatele unui NAT.",h=`Node-ul local nu are nicio setare editabil\u0103

Pentru a schimba hostul afi\u015Fat cu servere g\u0103zduite pe acest node ajusteaz\u0103 url-ul panoului \xEEn set\u0103rile panoului`,D="Lanseaz\u0103 Node",z={Step1:`## Pasul 1

Instaleaz\u0103 PufferPanel pe noul server, [vezi documenta\u021Bia pentru detalii](https://docs.pufferpanel.com/en/latest/installing.html)`,Step2:"## Pasul 2\n\nOpri\u021Bi serviciul PufferPanel pe noul server dac\u0103 a fost pornit \xEEn timpul instal\u0103rii execut\xE2nd `sudo systemctl stop pufferpanel`",Step3:"## Pasul 3\n\n\xCEnlocuie\u015Fte con\u0163inutul fi\u015Fierului de configurare PufferPanel pe noul server cu codul de mai jos\n\nFi\u0219ierul de configurare este g\u0103sit de obicei la `/etc/pufferpanel/config.json`\n\n```\n{config}\n```",Step4:"## Pasul 4\n\nActiveaz\u0103 \u015Fi (re)porne\u015Fte serviciul PufferPanel pe noul server prin rularea `sudo systemctl enable --now pufferpanel`",Step5:"### Noul dvs. node este acum configurat"},S="Pentru a implementa acest modul, instalati PufferPanel pe noul server si plasati fisierul de configurare in `/etc/pufferpanel/`<br/>Reporni\u0163i PufferPanel pe noul server dupa.";var y={Node:e,Nodes:t,Edit:n,Add:o,Create:r,Update:i,Delete:a,ConfirmDelete:s,Created:l,Updated:u,Deleted:c,Reachable:d,Unreachable:p,features:f,PublicHost:P,PublicPort:m,PrivateHost:v,PrivatePort:b,SftpPort:A,WithPrivateAddress:N,WithPrivateAddressHint:g,LocalNodeEdit:h,Deploy:D,deploy:z,DeploymentInstruction:S};export{o as Add,s as ConfirmDelete,r as Create,l as Created,a as Delete,c as Deleted,D as Deploy,S as DeploymentInstruction,n as Edit,h as LocalNodeEdit,e as Node,t as Nodes,v as PrivateHost,b as PrivatePort,P as PublicHost,m as PublicPort,d as Reachable,A as SftpPort,p as Unreachable,i as Update,u as Updated,N as WithPrivateAddress,g as WithPrivateAddressHint,y as default,z as deploy,f as features};
//# sourceMappingURL=nodes-304485f8.js.map
