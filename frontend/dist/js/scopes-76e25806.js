const e={admin:"Admin",login:"Login","self-edit":"Edit own account","self-clients":"Manage own OAuth2 clients","settings-edit":"Edit panel settings","server-create":"Create new servers","nodes-view":"View Nodes","nodes-create":"Create new Nodes","nodes-edit":"Edit existing Nodes","nodes-deploy":"Deploy Nodes","nodes-delete":"Delete Nodes","users-info-search":"View a list of all users","users-info-view":"View user information","users-info-edit":"Edit user information","users-perms-view":"View user permissions","users-perms-edit":"Edit user permissions","templates-view":"View templates","templates-local-edit":"Create/Edit/Delete local templates","templates-repo-view":"View template repos","templates-repo-add":"Add template repos","templates-repo-remove":"Remove template repos","server-view":"Can view this server","server-admin":"Has full access to this server","server-delete":"Can delete this server","server-definition-view":"Can view the server definition","server-definition-edit":"Can edit the server definition","server-data-view":"Can see server settings","server-data-edit":"Can change server settings","server-data-edit-admin":"Can change admin-only server settings","server-flags-view":"Can see autostart settings","server-flags-edit":"Can change autostart settings","server-name-edit":"Can change the server name","server-users-view":"Can see this user list","server-users-create":"Can add new users to the server","server-users-edit":"Can edit users permissions","server-users-delete":"Can remove users from the server","server-start":"Can start the server","server-stop":"Can stop the server","server-kill":"Can kill the server","server-install":"Can install the server","server-files-view":"Can view files","server-files-edit":"Can edit files","server-sftp":"Can access files via SFTP","server-console":"Can see the console","server-console-send":"Can send commands to the console","server-stats":"Can see resource usage","server-status":"Can see the current server status"},s={admin:"Grants all permissions",login:"Allows the user to log in","self-edit":"Lets the user change their password, update their email and manage 2FA for their account","settings-edit":"Allows editing global panel settings like master url, email integration etc"},t="Szerkeztheti a szervert",r="Telep\xEDtheti a szervert",a="L\xE1thatja a konzolt",n="K\xFCldhet parancsokat a konzolnak",i="Le\xE1ll\xEDthatja \xE9s kil\u0151heti a szervert",o="Elind\xEDthatja a szervert",l="L\xE1thatja a CPU \xE9s mem\xF3ria statisztik\xE1it",v="Az adatok hozz\xE1f\xE9r\xE9se SFTPn kereszt\xFCl megenged\xE9lyez\xE9se",d="Megtekinthet \xE9s let\xF6lthet f\xE1jlokat a f\xE1jlkezel\u0151n kereszt\xFCl",c="Szerkeszthet \xE9s felt\xF6lthet f\xE1jlokat a f\xE1jlkezel\xF6n kereszt\xFCl",h="Szerkesztheti a felhaszn\xE1l\xF3k szerverhez val\xF3 engeded\xE9lyeit",m="Admin (megkap minden jogot)",S="Szerverek megtekint\xE9se",p="L\xE9trehozhat \xFAj szervereket",k="T\xF6r\xF6lhet szervereket",z="M\xF3dos\xEDthat szerverbe\xE1ll\xEDt\xE1sokat",g="Megtekinthet csom\xF3pontokat",u="Szerkeszthet csom\xF3pontokat",w="Be\xE1ll\xEDthat \xFAj csom\xF3pontokat",C="Megtekinthet sablonokat",f="Szerkeszthet sablonokat",E="L\xE1thatja az \xF6sszes felhaszn\xE1l\xF3t",V="Szerkesztheti m\xE1s felhaszn\xE1l\xF3k adatait",A="A panel be\xE1ll\xEDt\xE1sainak m\xF3dos\xEDt\xE1sa";var j={name:e,hint:s,ServersEdit:t,ServersInstall:r,ServersConsole:a,ServersConsoleSend:n,ServersStop:i,ServersStart:o,ServersStat:l,ServersFiles:v,ServersFilesGet:d,ServersFilesPut:c,ServersEditUsers:h,Admin:m,ViewServers:S,CreateServers:p,DeleteServers:k,EditServerAdmin:z,ViewNodes:g,EditNodes:u,DeployNodes:w,ViewTemplates:C,EditTemplates:f,ViewUsers:E,EditUsers:V,PanelSettings:A};export{m as Admin,p as CreateServers,k as DeleteServers,w as DeployNodes,u as EditNodes,z as EditServerAdmin,f as EditTemplates,V as EditUsers,A as PanelSettings,a as ServersConsole,n as ServersConsoleSend,t as ServersEdit,h as ServersEditUsers,v as ServersFiles,d as ServersFilesGet,c as ServersFilesPut,r as ServersInstall,o as ServersStart,l as ServersStat,i as ServersStop,g as ViewNodes,S as ViewServers,C as ViewTemplates,E as ViewUsers,j as default,s as hint,e as name};
//# sourceMappingURL=scopes-76e25806.js.map