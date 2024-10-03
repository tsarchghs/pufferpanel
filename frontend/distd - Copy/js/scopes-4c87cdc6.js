const e={admin:"Admin",login:"Login","self-edit":"Edit own account","self-clients":"Manage own OAuth2 clients","settings-edit":"Edit panel settings","server-create":"Create new servers","nodes-view":"View Nodes","nodes-create":"Create new Nodes","nodes-edit":"Edit existing Nodes","nodes-deploy":"Deploy Nodes","nodes-delete":"Delete Nodes","users-info-search":"View a list of all users","users-info-view":"View user information","users-info-edit":"Edit user information","users-perms-view":"View user permissions","users-perms-edit":"Edit user permissions","templates-view":"View templates","templates-local-edit":"Create/Edit/Delete local templates","templates-repo-view":"View template repos","templates-repo-add":"Add template repos","templates-repo-remove":"Remove template repos","server-view":"Can view this server","server-admin":"Has full access to this server","server-delete":"Can delete this server","server-definition-view":"Can view the server definition","server-definition-edit":"Can edit the server definition","server-data-view":"Can see server settings","server-data-edit":"Can change server settings","server-data-edit-admin":"Can change admin-only server settings","server-flags-view":"Can see autostart settings","server-flags-edit":"Can change autostart settings","server-name-edit":"Can change the server name","server-users-view":"Can see this user list","server-users-create":"Can add new users to the server","server-users-edit":"Can edit users permissions","server-users-delete":"Can remove users from the server","server-start":"Can start the server","server-stop":"Can stop the server","server-kill":"Can kill the server","server-install":"Can install the server","server-files-view":"Can view files","server-files-edit":"Can edit files","server-sftp":"Can access files via SFTP","server-console":"Can see the console","server-console-send":"Can send commands to the console","server-stats":"Can see resource usage","server-status":"Can see the current server status"},s={admin:"Grants all permissions",login:"Allows the user to log in","self-edit":"Lets the user change their password, update their email and manage 2FA for their account","settings-edit":"Allows editing global panel settings like master url, email integration etc"},r="Rediger serveren",t="Installer serveren",n="Vis konsollen",i="Send kommandoer til konsollen",a="Tving serveren til at stoppe",l="Starte serveren",o="Vis CPU-og minnestatistikk",d="Gi tilgang til filer via SFTP",v="Vis og last ned filer ved hjelp av filbehandleren",c="Rediger og last opp filer ved hjelp av filbehandleren",m="Rediger brukerens tilgang til denne serveren",p="Admin (dette gir alle mulige tillatelser)",S="Se servere",g="Opprett nye servere",u="Slett servere",w="Rediger serverinnstillinger",C="Se noder",h="Rediger noder",f="Installer nye noder",E="Se maler",V="Rediger maler",k="Se alle brukere",A="Rediger andre brukere",N="Endre panelinnstillinger";var F={name:e,hint:s,ServersEdit:r,ServersInstall:t,ServersConsole:n,ServersConsoleSend:i,ServersStop:a,ServersStart:l,ServersStat:o,ServersFiles:d,ServersFilesGet:v,ServersFilesPut:c,ServersEditUsers:m,Admin:p,ViewServers:S,CreateServers:g,DeleteServers:u,EditServerAdmin:w,ViewNodes:C,EditNodes:h,DeployNodes:f,ViewTemplates:E,EditTemplates:V,ViewUsers:k,EditUsers:A,PanelSettings:N};export{p as Admin,g as CreateServers,u as DeleteServers,f as DeployNodes,h as EditNodes,w as EditServerAdmin,V as EditTemplates,A as EditUsers,N as PanelSettings,n as ServersConsole,i as ServersConsoleSend,r as ServersEdit,m as ServersEditUsers,d as ServersFiles,v as ServersFilesGet,c as ServersFilesPut,t as ServersInstall,l as ServersStart,o as ServersStat,a as ServersStop,C as ViewNodes,S as ViewServers,E as ViewTemplates,k as ViewUsers,F as default,s as hint,e as name};
//# sourceMappingURL=scopes-4c87cdc6.js.map
