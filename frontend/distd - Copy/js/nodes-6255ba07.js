const e="N\xF3",t="N\xF3s",n="Editar n\xF3",o="Adicionar n\xF3",s="Criar n\xF3",a="Atualizar n\xF3",r="Apagar n\xF3",i="Queres apagar o n\xF3 {name}?",d="N\xF3 criado",l="N\xF3 atualizado",c="N\xF3 apagado",p="This node is correctly set up and running",h="This node is either not set up correctly or currently unavailable",u={os:{label:"Sistema operativo",linux:"Linux",windows:"Windows"},arch:{label:"Arquitetura do processador",amd64:"x86 64bit",arm:"ARM 32bit",arm64:"ARM 64bit"},docker:{true:"Docker dispon\xEDvel",false:"Docker n\xE3o dispon\xEDvel"},envs:"Ambientes dispon\xEDveis"},f="Host p\xFAblico",P="Porta p\xFAblica",v="Host privado",b="Porta privada",w="Porta SFTP",m="Usar um host/porta diferente para a comunica\xE7\xE3o entre servidores",y="This separate address is used when the main node needs to talk to the new node. Useful for example when the nodes are in the same network behind NAT.",g=`The local node does not have any editable settings

To change the host displayed with servers hosted on this node adjust the panels master url in the panel settings`,A="Deploy Node",S={Step1:`## Step 1

Install PufferPanel on the new server, [see the docs for details](https://docs.pufferpanel.com/en/latest/installing.html)`,Step2:"## Step 2\n\nStop the PufferPanel service on the new server if it was started during installation by running `sudo systemctl stop pufferpanel`",Step3:"## Step 3\n\nReplace the contents of the PufferPanel config file on the new server with the code below\n\nThe config file is usually found at `/etc/pufferpanel/config.json`\n\n```\n{config}\n```",Step4:"## Step 4\n\nEnable and (re)start the PufferPanel service on the new server by running `sudo systemctl enable --now pufferpanel`",Step5:"### Your new node is now set up and ready to go"},D="To deploy the node, install PufferPanel on the new server and place the config file in `/etc/pufferpanel/`<br/>Restart PufferPanel on the new server afterwards.";var N={Node:e,Nodes:t,Edit:n,Add:o,Create:s,Update:a,Delete:r,ConfirmDelete:i,Created:d,Updated:l,Deleted:c,Reachable:p,Unreachable:h,features:u,PublicHost:f,PublicPort:P,PrivateHost:v,PrivatePort:b,SftpPort:w,WithPrivateAddress:m,WithPrivateAddressHint:y,LocalNodeEdit:g,Deploy:A,deploy:S,DeploymentInstruction:D};export{o as Add,i as ConfirmDelete,s as Create,d as Created,r as Delete,c as Deleted,A as Deploy,D as DeploymentInstruction,n as Edit,g as LocalNodeEdit,e as Node,t as Nodes,v as PrivateHost,b as PrivatePort,f as PublicHost,P as PublicPort,p as Reachable,w as SftpPort,h as Unreachable,a as Update,l as Updated,m as WithPrivateAddress,y as WithPrivateAddressHint,N as default,S as deploy,u as features};
//# sourceMappingURL=nodes-6255ba07.js.map
