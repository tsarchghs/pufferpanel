const e="D\xFC\u011F\xFCm",n="D\xFC\u011F\xFCmler",t="D\xFC\u011F\xFCm\xFC d\xFCzenle",a="D\xFC\u011F\xFCm ekle",o="Create Node",s="D\xFC\u011F\xFCm\xFC g\xFCncelle",r="D\xFC\u011F\xFCm sil",l="Do you really want to delete the node {name}?",i="Created Node",d="Updated Node",c="Deleted Node",u="This node is correctly set up and running",p="This node is either not set up correctly or currently unavailable",f={os:{label:"Operating System",linux:"Linux",windows:"Windows"},arch:{label:"CPU Architecture",amd64:"x86 64bit",arm:"ARM 32bit",arm64:"ARM 64bit"},docker:{true:"Docker available",false:"Docker not available"},envs:"Available Environments"},h="Ana sunucu",y="Ana port",P="Yerel sunucu",m="Yerel port",b="SFTP Port",v='Sunucudan sunucuya haberle\u015Fme i\xE7in farkl\u0131 bir "sunucu/port" kullan\u0131n',D="Bu ayr\u0131 adres, ana d\xFC\u011F\xFCm\xFCn yeni d\xFC\u011F\xFCmle konu\u015Fmas\u0131 gerekti\u011Finde kullan\u0131l\u0131r. \xD6rne\u011Fin, d\xFC\u011F\xFCmler NAT arkas\u0131nda ayn\u0131 a\u011Fda oldu\u011Funda kullan\u0131\u015Fl\u0131d\u0131r.",g=`The local node does not have any editable settings

To change the host displayed with servers hosted on this node adjust the panels master url in the panel settings`,w="Deploy Node",S={Step1:`## Step 1

Install PufferPanel on the new server, [see the docs for details](https://docs.pufferpanel.com/en/latest/installing.html)`,Step2:"## Step 2\n\nStop the PufferPanel service on the new server if it was started during installation by running `sudo systemctl stop pufferpanel`",Step3:"## Step 3\n\nReplace the contents of the PufferPanel config file on the new server with the code below\n\nThe config file is usually found at `/etc/pufferpanel/config.json`\n\n```\n{config}\n```",Step4:"## Step 4\n\nEnable and (re)start the PufferPanel service on the new server by running `sudo systemctl enable --now pufferpanel`",Step5:"### Your new node is now set up and ready to go"},k="D\xFC\u011F\xFCm\xFC yerle\u015Ftirmek i\xE7in, PufferPanel'i yeni sunucuya kurun ve yap\u0131land\u0131rma dosyas\u0131n\u0131 `/etc/pufferpanel/` dizinine yerle\u015Ftirin.<br/>Daha sonra yeni sunucuda PufferPanel'i yeniden ba\u015Flat\u0131n.";var A={Node:e,Nodes:n,Edit:t,Add:a,Create:o,Update:s,Delete:r,ConfirmDelete:l,Created:i,Updated:d,Deleted:c,Reachable:u,Unreachable:p,features:f,PublicHost:h,PublicPort:y,PrivateHost:P,PrivatePort:m,SftpPort:b,WithPrivateAddress:v,WithPrivateAddressHint:D,LocalNodeEdit:g,Deploy:w,deploy:S,DeploymentInstruction:k};export{a as Add,l as ConfirmDelete,o as Create,i as Created,r as Delete,c as Deleted,w as Deploy,k as DeploymentInstruction,t as Edit,g as LocalNodeEdit,e as Node,n as Nodes,P as PrivateHost,m as PrivatePort,h as PublicHost,y as PublicPort,u as Reachable,b as SftpPort,p as Unreachable,s as Update,d as Updated,v as WithPrivateAddress,D as WithPrivateAddressHint,A as default,S as deploy,f as features};
//# sourceMappingURL=nodes-bb72cb6c.js.map