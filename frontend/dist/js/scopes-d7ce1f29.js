const e={admin:"Admin",login:"Login","self-edit":"Edit own account","self-clients":"Manage own OAuth2 clients","settings-edit":"Edit panel settings","server-create":"Create new servers","nodes-view":"View Nodes","nodes-create":"Create new Nodes","nodes-edit":"Edit existing Nodes","nodes-deploy":"Deploy Nodes","nodes-delete":"Delete Nodes","users-info-search":"View a list of all users","users-info-view":"View user information","users-info-edit":"Edit user information","users-perms-view":"View user permissions","users-perms-edit":"Edit user permissions","templates-view":"View templates","templates-local-edit":"Create/Edit/Delete local templates","templates-repo-view":"View template repos","templates-repo-add":"Add template repos","templates-repo-remove":"Remove template repos","server-view":"Can view this server","server-admin":"Has full access to this server","server-delete":"Can delete this server","server-definition-view":"Can view the server definition","server-definition-edit":"Can edit the server definition","server-data-view":"Can see server settings","server-data-edit":"Can change server settings","server-data-edit-admin":"Can change admin-only server settings","server-flags-view":"Can see autostart settings","server-flags-edit":"Can change autostart settings","server-name-edit":"Can change the server name","server-users-view":"Can see this user list","server-users-create":"Can add new users to the server","server-users-edit":"Can edit users permissions","server-users-delete":"Can remove users from the server","server-start":"Can start the server","server-stop":"Can stop the server","server-kill":"Can kill the server","server-install":"Can install the server","server-files-view":"Can view files","server-files-edit":"Can edit files","server-sftp":"Can access files via SFTP","server-console":"Can see the console","server-console-send":"Can send commands to the console","server-stats":"Can see resource usage","server-status":"Can see the current server status"},s={admin:"Grants all permissions",login:"Allows the user to log in","self-edit":"Lets the user change their password, update their email and manage 2FA for their account","settings-edit":"Allows editing global panel settings like master url, email integration etc"},t="Edit the server",r="Install the server",i="View the console",n="Send commands to the console",a="Stop and kill the server",o="Start the server",l="View CPU and memory statistics",d="Allow access to files using SFTP",v="View and download files using the file manager",c="Edit and upload files using the file manager",m="Edit user's access to this server",S="Admin (this grants every possible permission)",p="See Servers",w="Create new Servers",h="Delete Servers",u="Edit Server Settings",g="See Nodes",C="Edit Nodes",f="Deploy new Nodes",E="See Templates",V="Edit Templates",N="See all Users",A="Edit other Users",D="Change panel settings";var F={name:e,hint:s,ServersEdit:t,ServersInstall:r,ServersConsole:i,ServersConsoleSend:n,ServersStop:a,ServersStart:o,ServersStat:l,ServersFiles:d,ServersFilesGet:v,ServersFilesPut:c,ServersEditUsers:m,Admin:S,ViewServers:p,CreateServers:w,DeleteServers:h,EditServerAdmin:u,ViewNodes:g,EditNodes:C,DeployNodes:f,ViewTemplates:E,EditTemplates:V,ViewUsers:N,EditUsers:A,PanelSettings:D};export{S as Admin,w as CreateServers,h as DeleteServers,f as DeployNodes,C as EditNodes,u as EditServerAdmin,V as EditTemplates,A as EditUsers,D as PanelSettings,i as ServersConsole,n as ServersConsoleSend,t as ServersEdit,m as ServersEditUsers,d as ServersFiles,v as ServersFilesGet,c as ServersFilesPut,r as ServersInstall,o as ServersStart,l as ServersStat,a as ServersStop,g as ViewNodes,p as ViewServers,E as ViewTemplates,N as ViewUsers,F as default,s as hint,e as name};
//# sourceMappingURL=scopes-d7ce1f29.js.map
