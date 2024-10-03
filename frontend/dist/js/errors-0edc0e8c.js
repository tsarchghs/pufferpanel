const r="Ne\u017Einoma klaida",i="Ne\u017Einoma klaida",e="Neteisingi prisijungimo duomenys",a="Paslauga nepasiekiama",t="El. pa\u0161to adresas nesukonfig\u016Bruotas",n="Netinkamas tokenas",o="Klientas nerastas",s="Vartotojas nerastas",l="Prisijungimas neleistinas",d="Netinkama tokeno b\u016Bsena",E="{setting} nesukonfig\u016Bruotas",u="\u0160ablonas pavadinimu '{name}' nerastas",m="{service} nepalaiko {provider}",c="{field} yra privalomas",k="{field} turi b\u016Bti atspausdinamas su \u201EASCII\u201C simboliais",p="{field} negali tur\u0117ti simboli\u0173, kuri\u0173 negalima naudoti surinkt URL",N="{field} turi b\u016Bti galimas IP arba FQDN",v="{field} turi b\u016Bti galimas IP",g="{field} negali b\u016Bti ilgesnis, nei {max}",b="{field} negali b\u016Bti trumpesnis, nei {min}",I="{field} turi b\u016Bti tarp {min} ir {max}",S="{field1} negali b\u016Bti toks pat, kaip {field2}",F="{field1} n\u0117ra toks pat, kaip {field2}",f="{field} n\u0117ra leistinas el. pa\u0161to adresas",P="{field} turi b\u016Bti bent {length} simboli\u0173",j="J\u016Bs neturite leidimo atlikti \u0161\u012F veiksm\u0105",T="Duomen\u0173 baz\u0117 neprieinama",y="N\u0117ra prieinam\u0173 ta\u0161k\u0173",U="N\u0117ra prieinam\u0173 \u0161ablon\u0173",C="Slapta\u017Eodis turi b\u016Bti bent 8 simboli\u0173",D="Vartotojo vardas turi b\u016Bti bent 5 simboli\u0173 ir j\u012F sudaryti tik raidiniai, skaitiniai skaitmenys, _ arba -",q="Slapta\u017Eod\u017Eiai nesutampa",R="N\u0117ra leistinas el. pa\u0161to adresas",h="J\u016Bs\u0173 sesija baig\u0117si, pra\u0161ome prisijungti i\u0161 naujo",L="J\u016Bs neturite leidimo atlikti \u0161\u012F veiksm\u0105",w="JSON duomenys netinkami",A="Ry\u0161yje WebSocket \u012Fvyko klaida, kai kurios funkcijos gali veikti l\u0117tai arba neveikti",J="Pana\u0161u, lyg j\u016Bs\u0173 kvietimo nuoroda netinkama",O="\u012Evyko klaida kuriant j\u016Bs\u0173 paskyr\u0105",x="Serveris su tokiu pavadinimu jau egzistuoja",B="Ta\u0161kas su tokiu pavadinimu jau egzistuoja",M="Negalima \u012Fkelti aplankal\u0173",$="\u201EDocker\u201C nepalaikomas \u0161itam ta\u0161ke",H="Tr\u016Bksta binar\u0117s: ${expected}",z="OS (${actual}) nepalaikoma. Palaikoma OS: ${expected}",G="Architekt\u016Bra ${actual} nepalaikoma. Palaikomos architekt\u016Bros: ${expected}",V="Jokia komanda negal\u0117jo b\u016Bt i\u0161rinkta, panaudoti \u0161iam serveriui";var K={ErrGeneric:r,ErrUnknownError:i,ErrInvalidCredentials:e,ErrServiceNotAvailable:a,ErrEmailNotConfigured:t,ErrTokenInvalid:n,ErrClientNotFound:o,ErrUserNotFound:s,ErrLoginNotPermitted:l,ErrInvalidTokenState:d,ErrSettingNotConfigured:E,ErrNoTemplate:u,ErrServiceInvalidProvider:m,ErrFieldRequired:c,ErrFieldMustBePrintable:k,ErrFieldHasURICharacters:p,ErrFieldIsInvalidHost:N,ErrFieldIsInvalidIP:v,ErrFieldTooLarge:g,ErrFieldTooSmall:b,ErrFieldNotBetween:I,ErrFieldEqual:S,ErrFieldNotEqual:F,ErrFieldNotEmail:f,ErrFieldLength:P,ErrNoPermission:j,ErrDatabaseNotAvailable:T,ErrNoNodes:y,ErrNoTemplates:U,ErrPasswordRequirements:C,ErrUsernameRequirements:D,ErrPasswordsNotIdentical:q,ErrEmailInvalid:R,ErrSessionTimedOut:h,ErrMissingScope:L,ErrInvalidJson:w,ErrSocketFailed:A,ErrInviteLinkInvalid:J,ErrSavingInviteduser:O,ErrDuplicateServerName:x,ErrDuplicateNodeName:B,ErrDirectoryUploadNotSupported:M,ErrDockerNotSupported:$,ErrMissingBinary:H,ErrUnsupportedOS:z,ErrUnsupportedArch:G,ErrNoCommand:V};export{o as ErrClientNotFound,T as ErrDatabaseNotAvailable,M as ErrDirectoryUploadNotSupported,$ as ErrDockerNotSupported,B as ErrDuplicateNodeName,x as ErrDuplicateServerName,R as ErrEmailInvalid,t as ErrEmailNotConfigured,S as ErrFieldEqual,p as ErrFieldHasURICharacters,N as ErrFieldIsInvalidHost,v as ErrFieldIsInvalidIP,P as ErrFieldLength,k as ErrFieldMustBePrintable,I as ErrFieldNotBetween,f as ErrFieldNotEmail,F as ErrFieldNotEqual,c as ErrFieldRequired,g as ErrFieldTooLarge,b as ErrFieldTooSmall,r as ErrGeneric,e as ErrInvalidCredentials,w as ErrInvalidJson,d as ErrInvalidTokenState,J as ErrInviteLinkInvalid,l as ErrLoginNotPermitted,H as ErrMissingBinary,L as ErrMissingScope,V as ErrNoCommand,y as ErrNoNodes,j as ErrNoPermission,u as ErrNoTemplate,U as ErrNoTemplates,C as ErrPasswordRequirements,q as ErrPasswordsNotIdentical,O as ErrSavingInviteduser,m as ErrServiceInvalidProvider,a as ErrServiceNotAvailable,h as ErrSessionTimedOut,E as ErrSettingNotConfigured,A as ErrSocketFailed,n as ErrTokenInvalid,i as ErrUnknownError,G as ErrUnsupportedArch,z as ErrUnsupportedOS,s as ErrUserNotFound,D as ErrUsernameRequirements,K as default};
//# sourceMappingURL=errors-0edc0e8c.js.map