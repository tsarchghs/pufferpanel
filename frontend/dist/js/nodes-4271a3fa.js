const e="\uB178\uB4DC",t="\uB178\uB4DC",n="\uB178\uB4DC \uC218\uC815",o="\uB178\uB4DC \uCD94\uAC00",s="Create Node",a="\uB178\uB4DC \uC218\uC815",r="\uB178\uB4DC \uC0AD\uC81C",l="Do you really want to delete the node {name}?",d="Created Node",i="Updated Node",c="Deleted Node",p="This node is correctly set up and running",u="This node is either not set up correctly or currently unavailable",f={os:{label:"Operating System",linux:"Linux",windows:"Windows"},arch:{label:"CPU Architecture",amd64:"x86 64bit",arm:"ARM 32bit",arm64:"ARM 64bit"},docker:{true:"Docker available",false:"Docker not available"},envs:"Available Environments"},h="\uACF5\uAC1C \uD638\uC2A4\uD2B8",P="\uACF5\uAC1C \uD3EC\uD2B8",b="\uB0B4\uBD80 \uD638\uC2A4\uD2B8",v="\uB0B4\uBD80 \uD3EC\uD2B8",y="SFTP \uD3EC\uD2B8",m="\uC11C\uBC84\uAC04 \uD1B5\uC2E0\uC5D0 \uB2E4\uB978 \uD638\uC2A4\uD2B8\uB098 \uD3EC\uD2B8 \uC0AC\uC6A9",w="\uC774 \uBCC4\uB3C4\uC758 \uC8FC\uC18C\uB294 \uC8FC \uB178\uB4DC\uAC00 \uC0C8 \uB178\uB4DC\uC640 \uD1B5\uC2E0\uD574\uC57C \uD560 \uB54C \uC0AC\uC6A9\uB429\uB2C8\uB2E4. \uC608\uB97C \uB4E4\uC5B4 \uB178\uB4DC\uAC00 NAT \uB4A4\uC758 \uB3D9\uC77C\uD55C \uB124\uD2B8\uC6CC\uD06C\uC5D0 \uC788\uB294 \uACBD\uC6B0\uC5D0 \uC720\uC6A9\uD569\uB2C8\uB2E4.",D=`The local node does not have any editable settings

To change the host displayed with servers hosted on this node adjust the panels master url in the panel settings`,g="Deploy Node",S={Step1:`## Step 1

Install PufferPanel on the new server, [see the docs for details](https://docs.pufferpanel.com/en/latest/installing.html)`,Step2:"## Step 2\n\nStop the PufferPanel service on the new server if it was started during installation by running `sudo systemctl stop pufferpanel`",Step3:"## Step 3\n\nReplace the contents of the PufferPanel config file on the new server with the code below\n\nThe config file is usually found at `/etc/pufferpanel/config.json`\n\n```\n{config}\n```",Step4:"## Step 4\n\nEnable and (re)start the PufferPanel service on the new server by running `sudo systemctl enable --now pufferpanel`",Step5:"### Your new node is now set up and ready to go"},N="\uC774 \uB178\uB4DC\uB97C \uCD94\uAC00\uD558\uAE30 \uC704\uD574\uC11C \uC0C8 \uC11C\uBC84\uC5D0 PufferPanel\uC744 \uC124\uCE58\uD558\uACE0 \uC774 \uC124\uC815 \uD30C\uC77C\uC744 `/etc/pufferpanel`\uC5D0 \uB123\uC5B4\uC8FC\uC138\uC694.<br/>\uADF8 \uD6C4\uC5D0 \uC0C8\uB85C\uC6B4 \uC11C\uBC84\uC5D0 \uC124\uCE58\uB41C PufferPanel\uC744 \uC7AC\uC2DC\uC791 \uD574\uC8FC\uC138\uC694.";var A={Node:e,Nodes:t,Edit:n,Add:o,Create:s,Update:a,Delete:r,ConfirmDelete:l,Created:d,Updated:i,Deleted:c,Reachable:p,Unreachable:u,features:f,PublicHost:h,PublicPort:P,PrivateHost:b,PrivatePort:v,SftpPort:y,WithPrivateAddress:m,WithPrivateAddressHint:w,LocalNodeEdit:D,Deploy:g,deploy:S,DeploymentInstruction:N};export{o as Add,l as ConfirmDelete,s as Create,d as Created,r as Delete,c as Deleted,g as Deploy,N as DeploymentInstruction,n as Edit,D as LocalNodeEdit,e as Node,t as Nodes,b as PrivateHost,v as PrivatePort,h as PublicHost,P as PublicPort,p as Reachable,y as SftpPort,u as Unreachable,a as Update,i as Updated,m as WithPrivateAddress,w as WithPrivateAddressHint,A as default,S as deploy,f as features};
//# sourceMappingURL=nodes-4271a3fa.js.map