const e="Csom\xF3pont",t="Csom\xF3pontok",n="Csom\xF3pont szerkeszt\xE9se",o="\xDAj csom\xF3pont",s="Create Node",a="Csom\xF3pont friss\xEDt\xE9se",r="Csom\xF3pont t\xF6rl\xE9se",l="Do you really want to delete the node {name}?",i="Created Node",d="Updated Node",c="Deleted Node",p="This node is correctly set up and running",h="This node is either not set up correctly or currently unavailable",u={os:{label:"Operating System",linux:"Linux",windows:"Windows"},arch:{label:"CPU Architecture",amd64:"x86 64bit",arm:"ARM 32bit",arm64:"ARM 64bit"},docker:{true:"Docker available",false:"Docker not available"},envs:"Available Environments"},f="Nyilv\xE1nos kiszolg\xE1l\xF3",m="Nyilv\xE1nos port",P="Priv\xE1t kiszolg\xE1l\xF3",v="Priv\xE1t port",b="SFTP port",y="Haszn\xE1lj m\xE1sik ip/portot a k\xE9t szerver k\xF6z\xF6tti kommunik\xE1ci\xF3hoz",k="Ez a k\xFCl\xF6n c\xEDm akkor haszn\xE1latos, amikor a f\u0151csom\xF3pont kommunik\xE1l az \xFAj csom\xF3ponttal. Olyan esetekben hasznos, mint pl.: a csom\xF3pontok azonos h\xE1l\xF3zaton vannak NAT m\xF6g\xF6tt.",z=`The local node does not have any editable settings

To change the host displayed with servers hosted on this node adjust the panels master url in the panel settings`,g="Deploy Node",w={Step1:`## Step 1

Install PufferPanel on the new server, [see the docs for details](https://docs.pufferpanel.com/en/latest/installing.html)`,Step2:"## Step 2\n\nStop the PufferPanel service on the new server if it was started during installation by running `sudo systemctl stop pufferpanel`",Step3:"## Step 3\n\nReplace the contents of the PufferPanel config file on the new server with the code below\n\nThe config file is usually found at `/etc/pufferpanel/config.json`\n\n```\n{config}\n```",Step4:"## Step 4\n\nEnable and (re)start the PufferPanel service on the new server by running `sudo systemctl enable --now pufferpanel`",Step5:"### Your new node is now set up and ready to go"},D="A csom\xF3pont berendez\xE9s\xE9hez telep\xEDtse a PufferPanelt az \xFAj szerveren \xE9s helyezze a konfigur\xE1ci\xF3s f\xE1jlt a k\xF6vetkez\u0151 helyre: `/etc/pufferpanel/`<br/>Majd ind\xEDtsa \xFAjra a PufferPanelt az \xFAj szerveren.";var C={Node:e,Nodes:t,Edit:n,Add:o,Create:s,Update:a,Delete:r,ConfirmDelete:l,Created:i,Updated:d,Deleted:c,Reachable:p,Unreachable:h,features:u,PublicHost:f,PublicPort:m,PrivateHost:P,PrivatePort:v,SftpPort:b,WithPrivateAddress:y,WithPrivateAddressHint:k,LocalNodeEdit:z,Deploy:g,deploy:w,DeploymentInstruction:D};export{o as Add,l as ConfirmDelete,s as Create,i as Created,r as Delete,c as Deleted,g as Deploy,D as DeploymentInstruction,n as Edit,z as LocalNodeEdit,e as Node,t as Nodes,P as PrivateHost,v as PrivatePort,f as PublicHost,m as PublicPort,p as Reachable,b as SftpPort,h as Unreachable,a as Update,d as Updated,y as WithPrivateAddress,k as WithPrivateAddressHint,C as default,w as deploy,u as features};
//# sourceMappingURL=nodes-b993f29b.js.map