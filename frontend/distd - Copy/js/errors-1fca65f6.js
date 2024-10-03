const r="\u672A\u77E5\u932F\u8AA4",e="\u672A\u77E5\u932F\u8AA4",o="\u7121\u6548\u6191\u8B49",t="\u670D\u52D9\u7121\u6CD5\u4F7F\u7528",i="\u5C1A\u672A\u8A2D\u5B9A\u96FB\u5B50\u90F5\u4EF6",n="\u7121\u6548 Token",s="\u627E\u4E0D\u5230\u7528\u6236\u7AEF",d="\u627E\u4E0D\u5230\u4F7F\u7528\u8005",a="\u4E0D\u5141\u8A31\u767B\u5165",l="\u672A\u77E5 token \u72C0\u614B",E="\u672A\u8A2D\u5B9A {setting}",c="\u627E\u4E0D\u5230\u540D\u70BA\u300C{name}\u300D\u7684\u7BC4\u672C",u="{service} \u4E0D\u652F\u63F4 {provider}",N="{field} \u5FC5\u586B",m="{field} \u5FC5\u9808\u662F\u500B\u53EF\u986F\u793A\u7684 ascii \u5B57\u5143",p="{field} \u4E2D\u4E0D\u80FD\u5305\u542B\u4E0D\u80FD\u5728\u7DB2\u5740\u4E2D\u4F7F\u7528\u7684\u5B57\u5143",v="{field} \u5FC5\u9808\u70BA\u6709\u6548\u7684 IP \u6216 FQDN",I="{field} \u5FC5\u9808\u70BA\u6709\u6548\u7684 IP",S="{field} \u4E0D\u80FD\u5927\u65BC {max}",F="{field} \u4E0D\u80FD\u5C0F\u65BC {min}",g="{field} \u5FC5\u9808\u5305\u542B\u5728 {min} \u8207 {max} \u4E4B\u9593",f="{field1} \u4E0D\u80FD\u7B49\u65BC {field2}",k="{field1} \u4E0D\u7B49\u65BC {field2}",P="{field} \u4E0D\u662F\u4E00\u500B\u6709\u6548\u7684\u96FB\u5B50\u90F5\u4EF6",h="{field} \u5FC5\u9808\u81F3\u5C11\u6709 {length} \u5B57\u5143",T="\u60A8\u7121\u6B0A\u57F7\u884C\u6B64\u64CD\u4F5C",U="\u8CC7\u6599\u5EAB\u7121\u6CD5\u4F7F\u7528",b="\u6C92\u6709\u5DF2\u77E5\u7BC0\u9EDE",C="\u6C92\u6709\u5DF2\u77E5\u7BC4\u672C",D="\u5BC6\u78BC\u5FC5\u9808\u81F3\u5C11\u6709 8 \u500B\u5B57\u5143",q="\u4F7F\u7528\u8005\u540D\u7A31\u5FC5\u9808\u81F3\u5C11\u6709 3 \u5B57\u5143\u4E14\u53EA\u80FD\u5305\u542B\u82F1\u6587\u3001\u6578\u5B57\u3001\u5E95\u7DDA\u8207\u6E1B\u865F",w="\u5BC6\u78BC\u4E0D\u76F8\u540C",A="Not a valid email",x="\u60A8\u7684\u767B\u5165\u968E\u6BB5\u5DF2\u904E\u671F\uFF0C\u8ACB\u91CD\u65B0\u767B\u5165",L="\u60A8\u7121\u6B0A\u57F7\u884C\u6B64\u64CD\u4F5C",R="\u7121\u6548\u7684 JSON \u6A94\u6848",y="WebSocket \u9023\u7DDA\u51FA\u73FE\u932F\u8AA4\uFF0C\u6709\u4E9B\u529F\u80FD\u53EF\u80FD\u6703\u8B8A\u6162\u6216\u7121\u6CD5\u4F7F\u7528",M="\u60A8\u7684\u9080\u8ACB\u9023\u7D50\u4F3C\u4E4E\u7121\u6548",O="\u5EFA\u7ACB\u5E33\u6236\u6642\u767C\u751F\u932F\u8AA4",B="A server with this name already exists",$="A node with this name already exists",H="\u7121\u6CD5\u4E0A\u50B3\u8CC7\u6599\u593E",J="Docker is not supported on this node",G="Missing binary: ${expected}",Q="OS (${actual}) not supported. Supported OS: ${expected}",W="Architecture ${actual} not supported. Supported Architectures: ${expected}",j="No command could be determined to be used for this server";var z={ErrGeneric:r,ErrUnknownError:e,ErrInvalidCredentials:o,ErrServiceNotAvailable:t,ErrEmailNotConfigured:i,ErrTokenInvalid:n,ErrClientNotFound:s,ErrUserNotFound:d,ErrLoginNotPermitted:a,ErrInvalidTokenState:l,ErrSettingNotConfigured:E,ErrNoTemplate:c,ErrServiceInvalidProvider:u,ErrFieldRequired:N,ErrFieldMustBePrintable:m,ErrFieldHasURICharacters:p,ErrFieldIsInvalidHost:v,ErrFieldIsInvalidIP:I,ErrFieldTooLarge:S,ErrFieldTooSmall:F,ErrFieldNotBetween:g,ErrFieldEqual:f,ErrFieldNotEqual:k,ErrFieldNotEmail:P,ErrFieldLength:h,ErrNoPermission:T,ErrDatabaseNotAvailable:U,ErrNoNodes:b,ErrNoTemplates:C,ErrPasswordRequirements:D,ErrUsernameRequirements:q,ErrPasswordsNotIdentical:w,ErrEmailInvalid:A,ErrSessionTimedOut:x,ErrMissingScope:L,ErrInvalidJson:R,ErrSocketFailed:y,ErrInviteLinkInvalid:M,ErrSavingInviteduser:O,ErrDuplicateServerName:B,ErrDuplicateNodeName:$,ErrDirectoryUploadNotSupported:H,ErrDockerNotSupported:J,ErrMissingBinary:G,ErrUnsupportedOS:Q,ErrUnsupportedArch:W,ErrNoCommand:j};export{s as ErrClientNotFound,U as ErrDatabaseNotAvailable,H as ErrDirectoryUploadNotSupported,J as ErrDockerNotSupported,$ as ErrDuplicateNodeName,B as ErrDuplicateServerName,A as ErrEmailInvalid,i as ErrEmailNotConfigured,f as ErrFieldEqual,p as ErrFieldHasURICharacters,v as ErrFieldIsInvalidHost,I as ErrFieldIsInvalidIP,h as ErrFieldLength,m as ErrFieldMustBePrintable,g as ErrFieldNotBetween,P as ErrFieldNotEmail,k as ErrFieldNotEqual,N as ErrFieldRequired,S as ErrFieldTooLarge,F as ErrFieldTooSmall,r as ErrGeneric,o as ErrInvalidCredentials,R as ErrInvalidJson,l as ErrInvalidTokenState,M as ErrInviteLinkInvalid,a as ErrLoginNotPermitted,G as ErrMissingBinary,L as ErrMissingScope,j as ErrNoCommand,b as ErrNoNodes,T as ErrNoPermission,c as ErrNoTemplate,C as ErrNoTemplates,D as ErrPasswordRequirements,w as ErrPasswordsNotIdentical,O as ErrSavingInviteduser,u as ErrServiceInvalidProvider,t as ErrServiceNotAvailable,x as ErrSessionTimedOut,E as ErrSettingNotConfigured,y as ErrSocketFailed,n as ErrTokenInvalid,e as ErrUnknownError,W as ErrUnsupportedArch,Q as ErrUnsupportedOS,d as ErrUserNotFound,q as ErrUsernameRequirements,z as default};
//# sourceMappingURL=errors-1fca65f6.js.map
