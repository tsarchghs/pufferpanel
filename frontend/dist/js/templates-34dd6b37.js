const i="\u0160ablonai",a="I\u0161saugoti \u0161ablon\u0105",t="\u0160ablonas i\u0161saugotas",o="I\u0161trinti \u0161ablon\u0105",n="Ar tikrai norite i\u0161trinti \u0161ablon\u0105, pavadinimu \u201E{name}\u201C?",s="\u0160ablonas i\u0161trintas",e="Sukurti nauj\u0105 \u0161ablon\u0105",r="J\u016Bs galite i\u0161saugoti pakeitimus tik vietiniams \u0161ablonams",d="Sukurti vietin\u0119 kopij\u0105",u="\u0160ablonas su \u0161iuo pavadinimu jau egzistuoja. Perra\u0161yti j\u012F?",m="Perra\u0161yti",l="JSON",p="Rodomas pavadinimas",k="Tipas",v="Prid\u0117ti kintam\u0105j\u012F",c="Kintamieji",g="Prid\u0117ti instaliacijos \u017Eingsn\u012F",y="Instaliuoti",b="Failo pavadinimas",j="Versija",S="Aplinka",C="Aplinka \u012Fjungta",P="Prid\u0117ti aplinkos pavadinim\u0105",I="Aplinkos kintamieji",A="\u201EDocker\u201C kopija",T="Startavimo konfig\u016Bracija",D="Prid\u0117ti prie\u0161 startavimo \u017Eingsn\u012F",E="Prie\u0161 startavimo u\u017Ekabis",R="Prid\u0117ti po startavimo \u017Eingsn\u012F",V="Po paleidimo u\u017Ekabis",N="I\u0161jungti",G="Komanda",H="Stop komanda",f="Stop signalas",O="Jokios grup\u0117s",w="Prid\u0117ti kintamojo grup\u0119",L="Naudoti \u0161i\u0105 komand\u0105 tik jei atitinka \u0161i\u0105 s\u0105lyg\u0105",J="Prid\u0117ti komand\u0105",z="Prid\u0117ti aplink\u0105",K={"1":"SIGHUP","2":"SIGINT (CTRL+C)","9":"SIGKILL","15":"SIGTERM"},B={NameInvalid:"\u0160ablono pavadinimas negali b\u016Bti tu\u0161\u010Dias ir tur\u0117ti tarp\u0173 ar speciali\u0173 simboli\u0173",DisplayInvalid:"Pavadinimas negali b\u016Bti tu\u0161\u010Dias",TypeInvalid:"Tipas negali b\u016Bti tu\u0161\u010Dias",CommandInvalid:"Komanda negali b\u016Bti tu\u0161\u010Dia"},F={Description:"Apra\u0161ymas",Type:"Tipas",Value:"Numatytoji reik\u0161m\u0117",Required:"\u0160is kintamasis yra privalomas",UserEdit:"Vartotojai, be administratori\u0173 teisi\u0173, gali redaguoti \u0161\u012F kintam\u0105j\u012F",Internal:"Vidinis (niekada nerodomas vartotojams ar administratoriams)",Options:"Nustatymai",ConditionHint:"Rodyti \u0161i\u0105 grup\u0119 tik jei atitinka \u0161i\u0105 s\u0105lyg\u0105",types:{String:"String",Boolean:"Boolean",Number:"Numeris",Options:"Nustatymai"},EditGroup:"Redaguoti grup\u0119",RemoveGroup:"Panaikinti grup\u0119",MoveToGroup:"Perkelti \u012F kit\u0105 grup\u0119",Remove:"Panaikinti"},U={Name:"\u0160is pavadinimas yra naudojamas kaip identifikatorius \u0161ablonui",Display:"Tai yra pavadinimas kuris bus rodomas vartotojams, pavyzd\u017Eiui, serverio k\u016Brimo metu",Type:"Tai yra naudojama grupuoti skirtingus \u0161ablonus ir nuspr\u0119sti kok\u012F paveiksl\u0117l\u012F rodyti jam serveri\u0173 s\u0105ra\u0161e",Variables:"\u0160ablonai bus rodomi vartotojams kaip nustatymai serveryje, jie yra naudingi, pavyzd\u017Eiui, leisti vartotojui nustatyti koki\u0105 versij\u0105 naudoti ar nustatyti kokius nustatymus, kaip kur\u012F port\u0105 naudoti",Install:"\u010Cia j\u016Bs nustatote kokie, serverio sukurto i\u0161 \u0161io \u0161ablono, \u017Eingsniai bus \u012Fvykdyti kai vartotojas paspaus instaliavimo mygtuk\u0105",Command:"Tai yra komanda kuri bus \u012Fvykdyta, kad startuoti server\u012F",StopCommand:"Para\u0161yti komand\u0105 serverio konsolei, kai vartotojas paspaud\u017Eia serverio stabdymo mygtuk\u0105",StopSignal:"I\u0161si\u0173sti signal\u0105 serveriui, kai vartotojas paspaud\u017Eia serverio stabdymo mygtuk\u0105, tai gali, pavyzd\u017Eiui, b\u016Bti naudojama emuliuoti CTRL+C paspaudim\u0105",PreRunHook:"\u010Cia j\u016Bs galite nustatyti kelis \u017Eingsnius kurie bus paleisti, kiekvien\u0105 kart\u0105, prie\u0161 startuojant serveriui",PostRunHook:"\u010Cia j\u016Bs galite nustatyti kelis \u017Eingsnius kurie bus paleisti, kiekvien\u0105 kart\u0105, serveriui sustojus"},W="Darbin\u0117 direktorija",h="Bendra",M="U\u017Ekabiai",q="\u012Ekelti \u0161ablon\u0105";var x={Templates:i,Save:a,Saved:t,Delete:o,ConfirmDelete:n,Deleted:s,New:e,EditLocalOnly:r,CreateLocalCopy:d,ConfirmOverwrite:u,Overwrite:m,Json:l,Display:p,Type:k,AddVariable:v,Variables:c,AddInstallStep:g,Install:y,Filename:b,Version:j,Environment:S,EnvEnabled:C,AddEnvVar:P,EnvVars:I,DockerImage:A,RunConfig:T,AddPreStep:D,PreRunHook:E,AddPostStep:R,PostRunHook:V,Shutdown:N,Command:G,StopCommand:H,StopSignal:f,NoGroup:O,AddVariableGroup:w,CommandConditionHint:L,AddCommand:J,AddEnvironment:z,signals:K,errors:B,variables:F,description:U,WorkingDirectory:W,General:h,Hooks:M,Import:q,import:{CommunityWarning:"\u0160ie \u0161ablonai yra sukurti bendruomen\u0117s ir tiekiami be joki\u0173 garantij\u0173"}};export{J as AddCommand,P as AddEnvVar,z as AddEnvironment,g as AddInstallStep,R as AddPostStep,D as AddPreStep,v as AddVariable,w as AddVariableGroup,G as Command,L as CommandConditionHint,n as ConfirmDelete,u as ConfirmOverwrite,d as CreateLocalCopy,o as Delete,s as Deleted,p as Display,A as DockerImage,r as EditLocalOnly,C as EnvEnabled,I as EnvVars,S as Environment,b as Filename,h as General,M as Hooks,q as Import,y as Install,l as Json,e as New,O as NoGroup,m as Overwrite,V as PostRunHook,E as PreRunHook,T as RunConfig,a as Save,t as Saved,N as Shutdown,H as StopCommand,f as StopSignal,i as Templates,k as Type,c as Variables,j as Version,W as WorkingDirectory,x as default,U as description,B as errors,K as signals,F as variables};
//# sourceMappingURL=templates-34dd6b37.js.map