const r="\u672A\u77E5\u932F\u8AA4",e="\u672A\u77E5\u932F\u8AA4",o="\u7121\u6548\u6191\u8B49",t="\u670D\u52D9\u4E0D\u53EF\u7528",i="\u96FB\u90F5\u672A\u5B8C\u6210\u914D\u7F6E",n="\u91D1\u9470\u7121\u6548",s="\u627E\u4E0D\u5230\u6B64\u5BA2\u6236",d="\u627E\u4E0D\u5230\u6B64\u7528\u6236",a="\u767B\u5165\u88AB\u62D2",l="\u91D1\u9470\u72C0\u614B\u7121\u6548",E="{setting} \u672A\u5B8C\u6210\u914D\u7F6E",c="\u627E\u4E0D\u5230{name}\u7BC4\u672C",u="{service}\u4E0D\u652F\u63F4{provider}",p="{field}\u70BA\u5FC5\u586B",N="{field}\u5FC5\u9700\u70BA\u53EF\u986F\u793A\u7684ASCII\u5B57\u7B26",v="{field}\u53EA\u53EF\u5305\u542B\u53EF\u7528\u5728URI\u7684\u5B57\u7B26",m="{field}\u5FC5\u9700\u70BA\u4E00\u500B\u6709\u6548IP\u5730\u5740\u6216\u5B8C\u5168\u8CC7\u683C\u57DF\u540D",I="{field}\u5FC5\u9700\u70BA\u4E00\u500B\u6709\u6548IP\u5730\u5740",S="{field}\u4E0D\u53EF\u5927\u65BC{max}",F="{field}\u4E0D\u53EF\u5C0F\u65BC{min}",g="{field}\u9700\u5728{min}\u548C{max}\u4E4B\u9593",f="{field1}\u4E0D\u53EF\u8207{field2}\u76F8\u540C",h="{field1}\u8207{field2}\u4E0D\u76F8\u540C",P="{field}\u4E0D\u662F\u4E00\u500B\u6709\u6548\u7684\u96FB\u90F5",k="{field}\u4E0D\u53EF\u5C11\u65BC{length}\u5B57",T="\u4F60\u6C92\u6709\u64CD\u4F5C\u6B0A\u9650",U="\u8CC7\u6599\u5EAB\u4E0D\u53EF\u7528",C="\u6C92\u6709\u53EF\u7528\u4E3B\u6A5F",b="\u6C92\u6709\u53EF\u7528\u7BC4\u672C",w="\u5BC6\u78BC\u4E0D\u80FD\u5C11\u65BC8\u500B\u5B57\u7B26",A="\u7528\u6236\u540D\u7A31\u4E0D\u53EF\u5C11\u65BC3\u500B\u5B57\uFF0C\u7576\u4E2D\u53EA\u80FD\u5305\u542B\u5B57\u6BCD\u3001\u6578\u5B57\u3001 _ \u6216 -",D="\u5BC6\u78BC\u4E0D\u76F8\u540C",q="Not a valid email",R="\u4F60\u7684\u767B\u5165\u6642\u6548\u5DF2\u904E\uFF0C\u8ACB\u91CD\u65B0\u767B\u5165",x="\u60A8\u6C92\u6B0A\u9650\u57F7\u884C\u6B64\u64CD\u4F5C",y="json\u6578\u64DA\u7121\u6548",L="WebSocket\u9023\u63A5\u51FA\u73FE\u932F\u8AA4\uFF0C\u67D0\u4E9B\u529F\u80FD\u53EF\u80FD\u6703\u8B8A\u5F97\u7DE9\u6162\u6216\u7121\u6CD5\u4F7F\u7528",M="Your invite link appears to be invalid",B="There was an error creating your account",O="A server with this name already exists",$="A node with this name already exists",H="Cannot upload folders",G="Docker is not supported on this node",J="Missing binary: ${expected}",j="OS (${actual}) not supported. Supported OS: ${expected}",W="Architecture ${actual} not supported. Supported Architectures: ${expected}",Y="No command could be determined to be used for this server";var _={ErrGeneric:r,ErrUnknownError:e,ErrInvalidCredentials:o,ErrServiceNotAvailable:t,ErrEmailNotConfigured:i,ErrTokenInvalid:n,ErrClientNotFound:s,ErrUserNotFound:d,ErrLoginNotPermitted:a,ErrInvalidTokenState:l,ErrSettingNotConfigured:E,ErrNoTemplate:c,ErrServiceInvalidProvider:u,ErrFieldRequired:p,ErrFieldMustBePrintable:N,ErrFieldHasURICharacters:v,ErrFieldIsInvalidHost:m,ErrFieldIsInvalidIP:I,ErrFieldTooLarge:S,ErrFieldTooSmall:F,ErrFieldNotBetween:g,ErrFieldEqual:f,ErrFieldNotEqual:h,ErrFieldNotEmail:P,ErrFieldLength:k,ErrNoPermission:T,ErrDatabaseNotAvailable:U,ErrNoNodes:C,ErrNoTemplates:b,ErrPasswordRequirements:w,ErrUsernameRequirements:A,ErrPasswordsNotIdentical:D,ErrEmailInvalid:q,ErrSessionTimedOut:R,ErrMissingScope:x,ErrInvalidJson:y,ErrSocketFailed:L,ErrInviteLinkInvalid:M,ErrSavingInviteduser:B,ErrDuplicateServerName:O,ErrDuplicateNodeName:$,ErrDirectoryUploadNotSupported:H,ErrDockerNotSupported:G,ErrMissingBinary:J,ErrUnsupportedOS:j,ErrUnsupportedArch:W,ErrNoCommand:Y};export{s as ErrClientNotFound,U as ErrDatabaseNotAvailable,H as ErrDirectoryUploadNotSupported,G as ErrDockerNotSupported,$ as ErrDuplicateNodeName,O as ErrDuplicateServerName,q as ErrEmailInvalid,i as ErrEmailNotConfigured,f as ErrFieldEqual,v as ErrFieldHasURICharacters,m as ErrFieldIsInvalidHost,I as ErrFieldIsInvalidIP,k as ErrFieldLength,N as ErrFieldMustBePrintable,g as ErrFieldNotBetween,P as ErrFieldNotEmail,h as ErrFieldNotEqual,p as ErrFieldRequired,S as ErrFieldTooLarge,F as ErrFieldTooSmall,r as ErrGeneric,o as ErrInvalidCredentials,y as ErrInvalidJson,l as ErrInvalidTokenState,M as ErrInviteLinkInvalid,a as ErrLoginNotPermitted,J as ErrMissingBinary,x as ErrMissingScope,Y as ErrNoCommand,C as ErrNoNodes,T as ErrNoPermission,c as ErrNoTemplate,b as ErrNoTemplates,w as ErrPasswordRequirements,D as ErrPasswordsNotIdentical,B as ErrSavingInviteduser,u as ErrServiceInvalidProvider,t as ErrServiceNotAvailable,R as ErrSessionTimedOut,E as ErrSettingNotConfigured,L as ErrSocketFailed,n as ErrTokenInvalid,e as ErrUnknownError,W as ErrUnsupportedArch,j as ErrUnsupportedOS,d as ErrUserNotFound,A as ErrUsernameRequirements,_ as default};
//# sourceMappingURL=errors-37a94de5.js.map