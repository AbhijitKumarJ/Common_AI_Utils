(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[510],{3373:function(e,t,n){Promise.resolve().then(n.bind(n,5948))},5948:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return w}});var a=n(7437),l=n(2265);let s=e=>"boolean"==typeof e||e instanceof Boolean,o=e=>"number"==typeof e||e instanceof Number,r=e=>"bigint"==typeof e||e instanceof BigInt,i=e=>!!e&&e instanceof Date,c=e=>"string"==typeof e||e instanceof String,d=e=>Array.isArray(e),u=e=>e instanceof Object&&null!==e,m=1,p=()=>m++;function h(e){let{field:t,value:n,data:a,lastElement:s,openBracket:o,closeBracket:r,level:i,style:c,shouldExpandNode:d,clickToExpandNode:u}=e,m=(0,l.useRef)(!1),[h,b,f]=function(e){let[t,n]=(0,l.useState)(e());return[t,()=>n(e=>!e),n]}(()=>d(i,n,t));(0,l.useEffect)(()=>{m.current?f(d(i,n,t)):m.current=!0},[d]);let g=h?c.collapseIcon:c.expandIcon,y=h?"collapse JSON":"expand JSON",N=function(){let e=(0,l.useRef)();return void 0===e.current&&(e.current=`:jsnvw:${p()}:`),e.current}(),_=i+1,S=a.length-1,E=e=>{" "===e.key&&(e.preventDefault(),b())};return(0,l.createElement)("div",{className:c.basicChildStyle,role:"list"},(0,l.createElement)("span",{className:g,onClick:b,onKeyDown:E,role:"button",tabIndex:0,"aria-label":y,"aria-expanded":h,"aria-controls":h?N:void 0}),t&&(u?(0,l.createElement)("span",{className:c.clickableLabel,onClick:b,onKeyDown:E,role:"button",tabIndex:-1},t,":"):(0,l.createElement)("span",{className:c.label},t,":")),(0,l.createElement)("span",{className:c.punctuation},o),h?(0,l.createElement)("div",{id:N},a.map((e,t)=>(0,l.createElement)(x,{key:e[0]||t,field:e[0],value:e[1],style:c,lastElement:t===S,level:_,shouldExpandNode:d,clickToExpandNode:u}))):(0,l.createElement)("span",{className:c.collapsedContent,onClick:b,onKeyDown:E,role:"button",tabIndex:-1,"aria-hidden":!0,"aria-label":y,"aria-expanded":h}),(0,l.createElement)("span",{className:c.punctuation},r),!s&&(0,l.createElement)("span",{className:c.punctuation},","))}function b(e){let{field:t,value:n,style:a,lastElement:l,shouldExpandNode:s,clickToExpandNode:o,level:r}=e;return h({field:t,value:n,lastElement:l||!1,level:r,openBracket:"{",closeBracket:"}",style:a,shouldExpandNode:s,clickToExpandNode:o,data:Object.keys(n).map(e=>[e,n[e]])})}function f(e){let{field:t,value:n,style:a,lastElement:l,level:s,shouldExpandNode:o,clickToExpandNode:r}=e;return h({field:t,value:n,lastElement:l||!1,level:s,openBracket:"[",closeBracket:"]",style:a,shouldExpandNode:o,clickToExpandNode:r,data:n.map(e=>[void 0,e])})}function g(e){let{field:t,value:n,style:a,lastElement:d}=e,u=n,m=a.otherValue;return null===n?(u="null",m=a.nullValue):void 0===n?(u="undefined",m=a.undefinedValue):c(n)?(u=a.noQuotesForStringValues?n:`"${n}"`,m=a.stringValue):s(n)?(u=n?"true":"false",m=a.booleanValue):o(n)?(u=n.toString(),m=a.numberValue):r(n)?(u=`${n.toString()}n`,m=a.numberValue):u=i(n)?n.toISOString():n.toString(),""===t&&(t='""'),(0,l.createElement)("div",{className:a.basicChildStyle,role:"listitem"},t&&(0,l.createElement)("span",{className:a.label},t,":"),(0,l.createElement)("span",{className:m},u),!d&&(0,l.createElement)("span",{className:a.punctuation},","))}function x(e){let t=e.value;return d(t)?(0,l.createElement)(f,Object.assign({},e)):u(t)&&!i(t)?(0,l.createElement)(b,Object.assign({},e)):(0,l.createElement)(g,Object.assign({},e))}var y="_2bkNM";let N={container:"_2IvMF _GzYRV",basicChildStyle:y,label:"_1MGIk",clickableLabel:"_2YKJg _1MGIk _1MFti",nullValue:"_2T6PJ",undefinedValue:"_1Gho6",stringValue:"_vGjyY",booleanValue:"_3zQKs",numberValue:"_1bQdo",otherValue:"_1xvuR",punctuation:"_3uHL6 _3eOF8",collapseIcon:"_oLqym _f10Tu _1MFti _1LId0",expandIcon:"_2AXVT _f10Tu _1MFti _1UmXx",collapsedContent:"_2KJWg _1pNG9 _1MFti",noQuotesForStringValues:!1},_={container:"_11RoI _GzYRV",basicChildStyle:y,label:"_2bSDX",clickableLabel:"_1RQEj _2bSDX _1MFti",nullValue:"_LaAZe",undefinedValue:"_GTKgm",stringValue:"_Chy1W",booleanValue:"_2vRm-",numberValue:"_2bveF",otherValue:"_1prJR",punctuation:"_gsbQL _3eOF8",collapseIcon:"_3QHg2 _f10Tu _1MFti _1LId0",expandIcon:"_17H2C _f10Tu _1MFti _1UmXx",collapsedContent:"_3fDAz _1pNG9 _1MFti",noQuotesForStringValues:!1},S=()=>!0,E=e=>{let{data:t,style:n=N,shouldExpandNode:a=S,clickToExpandNode:s=!1}=e;return(0,l.createElement)("div",{className:n.container},(0,l.createElement)(x,{value:t,style:n,lastElement:!0,level:0,shouldExpandNode:a,clickToExpandNode:s}))};n(8385);let v=[{name:"Generate",endpoint:"/api/generate",method:"POST"},{name:"Chat",endpoint:"/api/chat",method:"POST"},{name:"Create Model",endpoint:"/api/create",method:"POST"},{name:"List Models",endpoint:"/api/tags",method:"GET"},{name:"Show Model Info",endpoint:"/api/show",method:"POST"},{name:"Copy Model",endpoint:"/api/copy",method:"POST"},{name:"Delete Model",endpoint:"/api/delete",method:"DELETE"},{name:"Pull Model",endpoint:"/api/pull",method:"POST"},{name:"Push Model",endpoint:"/api/push",method:"POST"},{name:"Generate Embeddings",endpoint:"/api/embed",method:"POST"},{name:"List Running Models",endpoint:"/api/ps",method:"GET"}];var j=()=>{let[e,t]=(0,l.useState)("http://localhost:11434"),[n,s]=(0,l.useState)(v[0]),[o,r]=(0,l.useState)('{\n  "model": "",\n  "prompt": "Why is the sky blue?"\n}'),[i,c]=(0,l.useState)(null),[d,u]=(0,l.useState)(!0),[m,p]=(0,l.useState)(!1),[h,b]=(0,l.useState)([]),[f,g]=(0,l.useState)(""),[x,y]=(0,l.useState)(null);(0,l.useEffect)(()=>{N()},[e]);let N=async()=>{try{let t=await fetch("".concat(e,"/api/tags")),n=await t.json();b(n.models.map(e=>e.name)),n.models.length>0&&(g(n.models[0].name),j(n.models[0].name))}catch(e){console.error("Error fetching models:",e)}},j=e=>{try{let t=JSON.parse(o);t.model=e,r(JSON.stringify(t,null,2))}catch(e){console.error("Error updating request data:",e)}},O=(e,t)=>{switch(e.name){case"Generate":return JSON.stringify({model:t,prompt:"Why is the sky blue?"},null,2);case"Chat":return JSON.stringify({model:t,messages:[{role:"user",content:"Hello!"}]},null,2);case"Create Model":return JSON.stringify({name:"my-model",modelfile:"FROM llama2"},null,2);case"Show Model Info":case"Delete Model":case"Pull Model":case"Push Model":return JSON.stringify({name:t},null,2);case"Copy Model":return JSON.stringify({source:t,destination:"new-model-name"},null,2);case"Generate Embeddings":return JSON.stringify({model:t,prompt:"Hello, world!"},null,2);default:return"{}"}},w=async()=>{p(!0),c(null),y(null);try{let a=JSON.parse(o),l="".concat(e).concat(n.endpoint),s=n.method,r={method:s,headers:{"Content-Type":"application/json"}};"GET"!==s&&(r.body=JSON.stringify({...a,stream:d})),y({url:l,method:s,headers:r.headers,body:r.body});let i=await fetch(l,r);if(d&&"POST"===s){var t;let e=null===(t=i.body)||void 0===t?void 0:t.getReader();if(e)for(;;){let{done:t,value:n}=await e.read();if(t)break;new TextDecoder().decode(n).split("\n").filter(e=>""!==e.trim()).forEach(e=>{try{let t=JSON.parse(e);c(e=>[...e||[],t])}catch(e){console.error("Error parsing JSON:",e)}})}}else{let e=await i.json();c(e)}}catch(e){console.error("Error:",e),c({error:"An error occurred while fetching the data."})}p(!1)};return(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsxs)("div",{className:"flex space-x-4",children:[(0,a.jsx)("input",{type:"text",value:e,onChange:e=>t(e.target.value),className:"flex-grow bg-gray-800 text-white p-2 rounded",placeholder:"Ollama Base URL"}),(0,a.jsx)("button",{onClick:()=>{N()},className:"bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700",children:"Update Base URL"})]}),(0,a.jsxs)("div",{className:"flex space-x-4",children:[(0,a.jsx)("select",{value:f,onChange:e=>{let t=e.target.value;g(t),j(t)},className:"bg-gray-800 text-white p-2 rounded",children:h.map(e=>(0,a.jsx)("option",{value:e,children:e},e))}),(0,a.jsx)("select",{value:n.endpoint,onChange:e=>{let t=v.find(t=>t.endpoint===e.target.value);t&&(s(t),r(O(t,f)))},className:"bg-gray-800 text-white p-2 rounded",children:v.map(e=>(0,a.jsx)("option",{value:e.endpoint,children:e.name},e.endpoint))}),(0,a.jsxs)("span",{className:"bg-gray-700 text-white p-2 rounded",children:["Method: ",n.method]}),"POST"===n.method&&(0,a.jsxs)("label",{className:"flex items-center space-x-2",children:[(0,a.jsx)("input",{type:"checkbox",checked:d,onChange:()=>u(!d),className:"form-checkbox h-5 w-5 text-blue-600"}),(0,a.jsx)("span",{children:"Streaming"})]})]}),(0,a.jsx)("textarea",{value:o,onChange:e=>r(e.target.value),className:"w-full h-64 bg-gray-800 text-white p-4 rounded",placeholder:"Enter request data in JSON format"}),(0,a.jsx)("button",{onClick:w,disabled:m,className:"bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400",children:m?"Loading...":"Send Request"}),x&&(0,a.jsxs)("div",{className:"bg-gray-800 p-4 rounded",children:[(0,a.jsx)("h2",{className:"text-xl font-bold mb-2",children:"Actual Request:"}),(0,a.jsx)(E,{data:x,shouldExpandNode:S,style:_})]}),i&&(0,a.jsxs)("div",{className:"bg-gray-800 p-4 rounded",children:[(0,a.jsx)("h2",{className:"text-xl font-bold mb-2",children:"Response:"}),(0,a.jsx)(E,{data:i,shouldExpandNode:S,style:_})]})]})},O=n(7138);function w(){return(0,a.jsxs)("div",{className:"min-h-screen bg-gray-900 text-white p-8",children:[(0,a.jsxs)("div",{className:"flex justify-between items-center mb-6",children:[(0,a.jsx)("h1",{className:"text-4xl font-bold mb-8 text-center",children:"Ollama API Tester"}),(0,a.jsx)(O.default,{href:"/",children:(0,a.jsx)("button",{className:"px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700",children:"Return to Dashboard"})})]}),(0,a.jsx)(j,{})]})}},7138:function(e,t,n){"use strict";n.d(t,{default:function(){return l.a}});var a=n(231),l=n.n(a)},8385:function(){}},function(e){e.O(0,[546,231,971,23,744],function(){return e(e.s=3373)}),_N_E=e.O()}]);