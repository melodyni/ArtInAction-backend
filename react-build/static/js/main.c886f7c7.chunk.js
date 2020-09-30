(this.webpackJsonpgoogleauthlogin=this.webpackJsonpgoogleauthlogin||[]).push([[0],{17:function(e,t,a){e.exports=a.p+"static/media/logout.e75855a1.svg"},19:function(e,t,a){e.exports=a.p+"static/media/left-arrow.6468634d.svg"},21:function(e,t,a){e.exports=a(32)},26:function(e,t,a){},32:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(16),l=a.n(c),o=(a(26),a(2)),i={authUrl:function(){return fetch("/auth/init").then((function(e){return e.json()}))},artWork:function(){return fetch("/api/artWork").then((function(e){return e.json()}))},isLoggedIn:function(){return fetch("/api/isLoggedIn").then((function(e){return e.json()}))}};i.register=function(e){return t=e,fetch("/api/registerUser",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});var t},i.logout=function(){return fetch("/api/logout")};var m=i,u=(a(8),function(){var e=Object(n.useState)(""),t=Object(o.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)((function(){m.authUrl().then((function(e){var t=e.url;return c(t)}))}),[]),console.log(a),r.a.createElement("div",{className:"welcome "},r.a.createElement("h1",null,"Art in Action"),r.a.createElement("h2",null,"Imagination is the beginning of creation."),r.a.createElement("h3",null,"Keep being Artistic"),r.a.createElement("button",{onClick:function(){return window.location.href=a},className:"btn blue"},"Login With Google"))}),s=a(17),g=a.n(s),b=a(1),E=function(e){var t=e.user,a=t.avatar,n=t.username,c=Object(b.g)();return r.a.createElement("div",{className:"inline titleBar"},r.a.createElement("span",{className:"large-font"},"Art In Action"),r.a.createElement("div",{className:"user"},r.a.createElement("span",{className:"large-font"},n),r.a.createElement("img",{src:a,alt:"avatar",className:"avatar"}),r.a.createElement("img",{src:g.a,alt:"logout",className:"icon",onClick:function(){m.logout().then((function(){return c.push("/login")}))}})))},f=a(4),p=function(e){var t=e.title,a=e.tags,n=e.caption,c=e.name;return r.a.createElement("div",{className:"img-card"},r.a.createElement(f.b,{to:"/image/".concat(c,"/").concat(t)},r.a.createElement("img",{src:"/api/images/".concat(c),alt:c,className:"img-card-img"})),r.a.createElement("div",null,r.a.createElement("div",{className:"small-font"},t),r.a.createElement("div",{className:"small-font"},n),a.map((function(e,t){return r.a.createElement(f.b,{to:"/gallery/".concat(e),key:t,className:"small-font"},"#"+e)}))))},d=function(e){var t=e.artWorks.map((function(e){var t=e.md5,a=e.name,n=e.caption,c=e.tags,l=e.title;return r.a.createElement(p,{key:t,name:a,caption:n,tags:c,title:l})}));return r.a.createElement("div",{className:"flex-wrap"},t)},h=function(e){var t=e.artWorks,a=e.tag,n=t.filter((function(e){return e.tags.includes(a)}));return r.a.createElement(d,{artWorks:n})},v=function(){var e=Object(b.g)(),t=Object(n.useState)([]),a=Object(o.a)(t,2),c=a[0],l=a[1],i=Object(n.useState)({}),u=Object(o.a)(i,2),s=u[0],g=u[1];Object(n.useEffect)((function(){m.artWork().then((function(e){var t=e.id,a=e.name,n=e.username,r=e.avatar,c=e.email,o=e.bio,i=e.artWorks;g({id:t,username:n,name:a,avatar:r,email:c,bio:o}),l(i)}))}),[]);var p=Array.from(new Set(c.map((function(e){return e.tags})).flat())),v=p.map((function(e){return r.a.createElement(f.c,{to:"/gallery/".concat(e),key:e,activeClassName:"activeLink"},e)})),j=p.map((function(e){return r.a.createElement(b.b,{exact:!0,path:"/gallery/".concat(e),key:e},r.a.createElement(h,{artWorks:c,tag:e}))}));return r.a.createElement("div",null,r.a.createElement(E,{user:s}),r.a.createElement("div",{className:"inline"},r.a.createElement("div",{className:"links"},r.a.createElement(f.c,{to:"/gallery/all",activeClassName:"activeLink"},"all"),v),r.a.createElement("button",{className:"btn blue",onClick:function(){return e.push("/addArt")}},"Add Art")),r.a.createElement(b.d,null,r.a.createElement(b.b,{exact:!0,path:"/gallery/all"},r.a.createElement(d,{artWorks:c})),j))},j=a(19),O=a.n(j),y=function(){var e=Object(b.g)(),t=Object(b.h)(),a=t.name,n=t.title;return r.a.createElement("div",null,r.a.createElement("img",{src:O.a,alt:"ZoomedImage",className:"icon",onClick:function(){return e.push("/gallery/all")}}),r.a.createElement("div",{className:"zoomed-img"},r.a.createElement("div",{className:"side-panel "},n),r.a.createElement("img",{src:"/api/images/".concat(a),alt:a})))},N=function(e){var t=e.type,a=e.onChange,c=e.label,l=Object(n.useState)(""),i=Object(o.a)(l,2),m=i[0],u=i[1];return r.a.createElement("div",null,r.a.createElement("label",null,c),r.a.createElement("div",null,r.a.createElement("input",{onChange:function(e){var t=e.target.value;u(t),a(t)},type:t,value:m,required:!0})))},k=function(){var e=Object(b.g)(),t=Object(n.useState)(""),a=Object(o.a)(t,2),c=a[0],l=a[1],i=Object(n.useState)(""),u=Object(o.a)(i,2),s=u[0],g=u[1],E=Object(n.useState)(""),f=Object(o.a)(E,2),p=f[0],d=f[1],h=Object(n.useState)(""),v=Object(o.a)(h,2),j=v[0],O=v[1];return r.a.createElement("div",{className:"border"},r.a.createElement("form",{onSubmit:function(t){t.preventDefault(),m.register({name:c,username:s,email:p,bio:j}).then((function(){return e.push("/gallery/all")}))}},r.a.createElement(N,{type:"text",label:"Name",onChange:l}),r.a.createElement(N,{type:"text",label:"UserName",onChange:g}),r.a.createElement(N,{type:"email",label:"Email",onChange:d}),r.a.createElement("label",null,"Bio"),r.a.createElement("br",null),r.a.createElement("textarea",{value:j,onChange:function(e){return O(e.target.value)},required:!0}),r.a.createElement("br",null),r.a.createElement("button",{type:"submit",className:"btn blue"},"Submit"),r.a.createElement("button",{className:"btn red"},"Cancel")))},S=function(){var e=Object(b.g)(),t=Object(n.useState)(""),a=Object(o.a)(t,2),c=a[0],l=a[1],i=Object(n.useState)(""),m=Object(o.a)(i,2),u=m[0],s=m[1],g=Object(n.useState)([]),E=Object(o.a)(g,2),f=E[0],p=E[1],d=Object(n.useState)(null),h=Object(o.a)(d,2),v=h[0],j=h[1];return r.a.createElement("div",{className:"border"},r.a.createElement("div",{className:"preview"},r.a.createElement("img",{src:v,alt:"preview"})),r.a.createElement("form",{onSubmit:function(t){t.preventDefault();var a=new FormData(t.target);a.append("title",c),a.append("caption",u),a.append("tags",f),fetch("api/saveArt",{method:"POST",body:a}).then((function(){return e.push("/gallery/all")}))}},r.a.createElement("label",{htmlFor:"img"},"Image"),r.a.createElement("input",{id:"img",type:"file",name:"image",onChange:function(e){var t=Object(o.a)(e.target.files,1)[0],a=new FileReader;a.onload=function(){j("".concat(a.result))},t&&a.readAsDataURL(t)},required:!0}),r.a.createElement("br",null),r.a.createElement(N,{type:"text",label:"Title",onChange:l}),r.a.createElement(N,{type:"text",label:"Tags",onChange:p}),r.a.createElement(N,{type:"text",label:"Caption",onChange:s}),r.a.createElement("br",null),r.a.createElement("button",{type:"submit",className:"btn blue"},"Submit"),r.a.createElement("button",{className:"btn red"},"Cancel")))},C=a(20),w=function(e){var t=e.component,a=Object(C.a)(e,["component"]),c=Object(n.useState)({userId:null,isLoggedIn:!1,isRegisteredUser:!1}),l=Object(o.a)(c,2),i=l[0],u=l[1],s=Object(n.useState)(!1),g=Object(o.a)(s,2),E=g[0],f=g[1];return Object(n.useEffect)((function(){m.isLoggedIn().then(u).then((function(){return f(!0)}))}),[]),E?r.a.createElement(b.b,Object.assign({},a,{render:function(e){return i.isLoggedIn?i.isRegisteredUser?r.a.createElement(t,Object.assign({},e,{user:i})):r.a.createElement(b.a,{to:"/register"}):r.a.createElement(b.a,{to:"/login"})}})):r.a.createElement("p",null,"Loading...")},x=function(){return r.a.createElement(f.a,null,r.a.createElement(b.d,null,r.a.createElement(w,{exact:!0,path:"/",component:v}),r.a.createElement(b.b,{exact:!0,path:"/login",component:u}),r.a.createElement(b.b,{path:"/register",component:k}),r.a.createElement(b.b,{exact:!0,path:"/addArt",component:S}),r.a.createElement(w,{path:"/gallery/:category",component:v}),r.a.createElement(b.b,{path:"/image/:name/:title",component:y})))},A=function(){return r.a.createElement(f.a,null,r.a.createElement(x,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(A,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e,t,a){}},[[21,1,2]]]);
//# sourceMappingURL=main.c886f7c7.chunk.js.map