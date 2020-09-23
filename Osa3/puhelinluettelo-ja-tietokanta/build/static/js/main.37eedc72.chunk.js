(this["webpackJsonposa3-puhelinluettelon-frontend"]=this["webpackJsonposa3-puhelinluettelon-frontend"]||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),u=t.n(o),c=(t(19),t(2)),l=function(e){var n=e.nameFilter,t=e.handleChange;return r.a.createElement("div",null,"filter shown with",r.a.createElement("input",{value:n,onChange:t}))},i=function(e){var n=e.handleSubmit,t=e.name,a=e.number,o=e.handleNameChange,u=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:o})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:a,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},m=function(e){var n=e.person,t=e.handleDeletion;return r.a.createElement("p",null,n.name," ",n.number,r.a.createElement("button",{onClick:function(){window.confirm("Delete ".concat(n.name,"?"))&&t(n.id)}},"delete"))},d=function(e){var n=e.filteredPersons,t=e.handleDeletion;return r.a.createElement(r.a.Fragment,null,n.map((function(e,n){return r.a.createElement(m,{person:e,handleDeletion:t,key:n})})))},f=t(3),s=t.n(f),h="/api/persons",b=function(){return s.a.get(h)},p=function(e){return s.a.post(h,e)},E=function(e,n){return s.a.put("".concat(h,"/").concat(e),n)},v=function(e){return s.a.delete("".concat(h,"/").concat(e))},g=function(e){var n=e.operation,t=e.message;return null===n?null:r.a.createElement("div",{className:n},t)},w=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),m=Object(c.a)(u,2),f=m[0],s=m[1],h=Object(a.useState)(""),w=Object(c.a)(h,2),C=w[0],j=w[1],O=Object(a.useState)(""),S=Object(c.a)(O,2),N=S[0],D=S[1],k=Object(a.useState)(null),L=Object(c.a)(k,2),P=L[0],y=L[1],F=Object(a.useState)(""),J=Object(c.a)(F,2),x=J[0],A=J[1];Object(a.useEffect)((function(){b().then((function(e){return o(e.data)}))}),[]);var B=function(e,n){y(e),A(n),setTimeout((function(){y(null),A("")}),3e3)},I=function(){var e=t.find((function(e){return e.name.toLowerCase()===f.toLowerCase()})),n={name:e.name,number:C};E(e.id,n).then((function(){b().then((function(n){o(n.data),s(""),j(""),B("updatePerson","Updated number of ".concat(e.name))}))})).catch((function(e){console.log(e),B("error","Number minimum length is 8")}))},M=t.filter((function(e){return e.name.toLowerCase().includes(N.toLowerCase())}));return r.a.createElement("div",null,r.a.createElement("h1",null,"Phonebook"),r.a.createElement(g,{operation:P,message:x}),r.a.createElement(l,{nameFilter:N,handleChange:function(e){D(e.target.value)}}),r.a.createElement("h2",null,"add a new"),r.a.createElement(i,{handleSubmit:function(e){e.preventDefault();var n=t.find((function(e){return e.name.toLowerCase()===f.toLowerCase()})),a={name:f,number:C};n?window.confirm("".concat(f," is already added to phonebook, ")+"replace the old number with a new one?")&&I():p(a).then((function(e){o(t.concat(e.data)),B("addPerson","Added ".concat(a.name)),s(""),j("")})).catch((function(e){B("error","Name or number is too short!")}))},name:f,number:C,handleNameChange:function(e){s(e.target.value)},handleNumberChange:function(e){j(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(d,{filteredPersons:M,handleDeletion:function(e){var n=t.find((function(n){return n.id===e}));v(e).then((function(){o(t.filter((function(n){return n.id!==e}))),B("deletePerson","Deleted ".concat(n.name))}))}}))};u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.37eedc72.chunk.js.map