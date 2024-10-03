const e="\u30CE\u30FC\u30C9",t="\u30CE\u30FC\u30C9",n="\u30CE\u30FC\u30C9\u3092\u7DE8\u96C6",o="\u30CE\u30FC\u30C9\u3092\u8FFD\u52A0\u3059\u308B",s="\u30CE\u30FC\u30C9\u3092\u4F5C\u6210",a="\u30CE\u30FC\u30C9\u3092\u66F4\u65B0",r="\u30CE\u30FC\u30C9\u3092\u524A\u9664",c="\u672C\u5F53\u306B\u3053\u306E\u30CE\u30FC\u30C9\u3092\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F",l="\u4F5C\u6210\u3057\u305F\u30CE\u30FC\u30C9",d="\u66F4\u65B0\u3055\u308C\u305F\u30CE\u30FC\u30C9",i="\u524A\u9664\u3057\u305F\u30CE\u30FC\u30C9",f="\u3053\u306E\u30CE\u30FC\u30C9\u306F\u6B63\u3057\u304F\u8A2D\u5B9A\u3055\u308C\u5B9F\u884C\u3055\u308C\u3066\u3044\u307E\u3059",P="\u3053\u306E\u30CE\u30FC\u30C9\u306F\u6B63\u3057\u304F\u8A2D\u5B9A\u3055\u308C\u3066\u3044\u306A\u3044\u304B\u3001\u73FE\u5728\u5229\u7528\u3067\u304D\u307E\u305B\u3093",p={os:{label:"OS",linux:"Linux",windows:"Windows"},arch:{label:"CPU\u69CB\u6210",amd64:"x86 64bit",arm:"ARM 32bit",arm64:"ARM 64bit"},docker:{true:"Docker\u304C\u5229\u7528\u53EF\u80FD\u3067\u3059",false:"Docker\u304C\u5229\u7528\u3067\u304D\u307E\u305B\u3093"},envs:"\u5229\u7528\u53EF\u80FD\u306A\u74B0\u5883"},u="\u516C\u958B\u30DB\u30B9\u30C8",b="\u516C\u958B\u30DD\u30FC\u30C8",D="\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u30DB\u30B9\u30C8",h="\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u30DD\u30FC\u30C8",m="SFTP \u30DD\u30FC\u30C8",v="\u30B5\u30FC\u30D0\u30FC\u3068\u306E\u901A\u4FE1\u306B\u5225\u306E\u30DB\u30B9\u30C8/\u30DD\u30FC\u30C8\u3092\u4F7F\u7528\u3059\u308B",A="\u3053\u306E\u5225\u306E\u30A2\u30C9\u30EC\u30B9\u306F\u3001\u30E1\u30A4\u30F3\u30CE\u30FC\u30C9\u304C\u65B0\u3057\u3044\u30CE\u30FC\u30C9\u3068\u901A\u4FE1\u3059\u308B\u5FC5\u8981\u304C\u3042\u308B\u5834\u5408\u4F7F\u7528\u3055\u308C\u307E\u3059\u3002\u4F8B\u3048\u3070\u3001NAT\u306E\u5F8C\u308D\u3067\u30CE\u30FC\u30C9\u304C\u540C\u3058\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u306B\u3042\u308B\u5834\u5408\u4FBF\u5229\u3067\u3059\u3002",S=`\u30ED\u30FC\u30AB\u30EB\u30CE\u30FC\u30C9\u306B\u306F\u7DE8\u96C6\u53EF\u80FD\u306A\u8A2D\u5B9A\u304C\u3042\u308A\u307E\u305B\u3093\u3002

\u3053\u306E\u30CE\u30FC\u30C9\u3067\u30DB\u30B9\u30C8\u3055\u308C\u3066\u3044\u308B\u30B5\u30FC\u30D0\u3067\u8868\u793A\u3055\u308C\u308B\u30DB\u30B9\u30C8\u3092\u5909\u66F4\u3059\u308B\u306B\u306F\u3001\u30D1\u30CD\u30EB\u8A2D\u5B9A\u3067\u30D1\u30CD\u30EB\u30DE\u30B9\u30BF\u30FCURL\u3092\u8ABF\u6574\u3057\u307E\u3059\u3002`,y="\u30CE\u30FC\u30C9\u3092\u30C7\u30D7\u30ED\u30A4",U={Step1:`## \u624B\u9806 1

\u65B0\u3057\u3044\u30B5\u30FC\u30D0\u30FC\u306B PufferPanel \u3092\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3057\u307E\u3059\u3002[\u8A73\u7D30\u306F\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8(\u82F1\u8A9E)](https://docs.pufferpanel.com/en/latest/installing.html)`,Step2:"## \u30B9\u30C6\u30C3\u30D7 2\n\n`sudo systemctl stop pufferpanel` \u3092\u5B9F\u884C\u3057\u3066\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u4E2D\u306B\u8D77\u52D5\u3057\u305F\u5834\u5408\u3001\u65B0\u3057\u3044\u30B5\u30FC\u30D0\u30FC\u306E PufferPanel \u30B5\u30FC\u30D3\u30B9\u3092\u505C\u6B62\u3057\u307E\u3059\u3002",Step3:"## \u30B9\u30C6\u30C3\u30D73\n\n\u65B0\u3057\u3044\u30B5\u30FC\u30D0\u306EPufferPanel\u306E\u8A2D\u5B9A\u30D5\u30A1\u30A4\u30EB\u306E\u5185\u5BB9\u3092\u4EE5\u4E0B\u306E\u30B3\u30FC\u30C9\u3067\u7F6E\u304D\u63DB\u3048\u307E\u3059\u3002\n\n\u8A2D\u5B9A\u30D5\u30A1\u30A4\u30EB\u306F\u901A\u5E38 `/etc/pufferpanel/config.json` \u306B\u3042\u308A\u307E\u3059\u3002\n\n```\n{config}\n```",Step4:"## \u30B9\u30C6\u30C3\u30D74\n\n`sudo systemctl enable --now pufferpanel`\u3092\u5B9F\u884C\u3057\u3066\u3001\u65B0\u3057\u3044\u30B5\u30FC\u30D0\u30FC\u3067PufferPanel\u30B5\u30FC\u30D3\u30B9\u3092\u6709\u52B9\u306B\u3057\u3066\u518D\u8D77\u52D5\u3057\u307E\u3059\u3002",Step5:"### \u65B0\u3057\u3044\u30CE\u30FC\u30C9\u306E\u8A2D\u5B9A\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F\u3002"},C="\u30CE\u30FC\u30C9\u3092\u30C7\u30D7\u30ED\u30A4\u3059\u308B\u306B\u306F\u3001\u65B0\u3057\u3044\u30B5\u30FC\u30D0\u306B PufferPanel \u3092\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3057\u3001`/etc/pufferpanel/` \u306Bconfig \u30D5\u30A1\u30A4\u30EB\u3092\u914D\u7F6E\u3057\u307E\u3059\u3002<br/>\u305D\u306E\u5F8C\u3001\u65B0\u3057\u3044\u30B5\u30FC\u30D0\u3067 PufferPanel \u3092\u518D\u8D77\u52D5\u3057\u307E\u3059\u3002";var N={Node:e,Nodes:t,Edit:n,Add:o,Create:s,Update:a,Delete:r,ConfirmDelete:c,Created:l,Updated:d,Deleted:i,Reachable:f,Unreachable:P,features:p,PublicHost:u,PublicPort:b,PrivateHost:D,PrivatePort:h,SftpPort:m,WithPrivateAddress:v,WithPrivateAddressHint:A,LocalNodeEdit:S,Deploy:y,deploy:U,DeploymentInstruction:C};export{o as Add,c as ConfirmDelete,s as Create,l as Created,r as Delete,i as Deleted,y as Deploy,C as DeploymentInstruction,n as Edit,S as LocalNodeEdit,e as Node,t as Nodes,D as PrivateHost,h as PrivatePort,u as PublicHost,b as PublicPort,f as Reachable,m as SftpPort,P as Unreachable,a as Update,d as Updated,v as WithPrivateAddress,A as WithPrivateAddressHint,N as default,U as deploy,p as features};
//# sourceMappingURL=nodes-d4a9b519.js.map
