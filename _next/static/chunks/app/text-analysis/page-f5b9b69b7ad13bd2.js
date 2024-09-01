(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[995],{9442:function(e,t,n){Promise.resolve().then(n.bind(n,9535))},9535:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return l}});var r=n(7437),i=n(2265),s=n(7138),a=n(357);let o=["Named Entity Recognition","Summarization","Translation","Sentiment Analysis","Entity Relationship Analysis","Topic Modeling","Keyword Extraction","Text Classification","Semantic Similarity"],c={"Named Entity Recognition":"Identify and categorize named entities (e.g., person names, organizations, locations) in the text.",Summarization:"Provide a concise summary of the main points in the text.",Translation:"Translate the text to [target language]. Please specify the target language.","Sentiment Analysis":"Analyze the overall sentiment of the text (positive, negative, or neutral) and provide a brief explanation.","Entity Relationship Analysis":"Identify key entities in the text and describe their relationships to each other.","Topic Modeling":"Identify the main topics discussed in the text and provide a brief description of each.","Keyword Extraction":"Extract the most important keywords or phrases from the text.","Text Classification":"Classify the text into appropriate categories or genres.","Semantic Similarity":"Compare the semantic similarity between different parts of the text or with a provided reference text."};function l(){let[e,t]=(0,i.useState)(""),[n,l]=(0,i.useState)(c[o[0]]),[u,d]=(0,i.useState)(o[0]),[h,p]=(0,i.useState)([]),[m,f]=(0,i.useState)([]),[x,y]=(0,i.useState)(!1),[g,b]=(0,i.useState)(null),[v,w]=(0,i.useState)([]);(0,i.useEffect)(()=>{l(c[u])},[u]);let j=async()=>{y(!0),b(null);let t=h.filter(e=>m.includes(e.id)).map(e=>"Type: ".concat(e.type,"\nInstruction: ").concat(e.instruction,"\nResponse: ").concat(e.response)).join("\n\n"),r="".concat(t,"\n\nCurrent Request:\nType: ").concat(u,"\nInstruction: ").concat(n,"\nText: ").concat(e,"\n\nPlease perform the requested analysis.");try{let e=window.backendAvailable,t=window.openRouterApiKey;if(!e&&!t)throw Error("API key is required when backend is not available");let i=await fetch("https://openrouter.ai/api/v1/chat/completions",{method:"POST",headers:{Authorization:"Bearer ".concat(e?a.env.NEXT_PUBLIC_OPENROUTER_API_KEY:t),"Content-Type":"application/json"},body:JSON.stringify({model:"meta-llama/llama-3.1-8b-instruct:free",messages:[{role:"user",content:r}]})});if(!i.ok)throw Error("Failed to fetch response from API");let s=(await i.json()).choices[0].message.content,o={id:h.length+1,type:u,instruction:n,request:r,response:s};p([...h,o]),w([...v,o.id])}catch(e){b(e instanceof Error?e.message:"An unknown error occurred")}finally{y(!1)}},N=e=>{w(v.includes(e)?v.filter(t=>t!==e):[...v,e])};return(0,r.jsxs)("div",{className:"min-h-screen bg-gray-900 text-white p-8",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center mb-6",children:[(0,r.jsx)("h1",{className:"text-4xl font-bold",children:"Text Analysis"}),(0,r.jsx)(s.default,{href:"/",children:(0,r.jsx)("button",{className:"px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700",children:"Return to Dashboard"})})]}),(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsx)("textarea",{className:"w-full p-2 bg-gray-800 rounded",rows:5,value:e,onChange:e=>t(e.target.value),placeholder:"Enter text to analyze"}),(0,r.jsxs)("div",{className:"flex space-x-4",children:[(0,r.jsx)("select",{className:"w-1/2 p-2 bg-gray-800 rounded",value:u,onChange:e=>d(e.target.value),children:o.map(e=>(0,r.jsx)("option",{value:e,children:e},e))}),(0,r.jsx)("textarea",{className:"w-1/2 p-2 bg-gray-800 rounded",rows:3,value:n,onChange:e=>l(e.target.value),placeholder:"Enter analysis instructions"})]}),(0,r.jsx)("button",{className:"w-full p-2 rounded ".concat(x?"bg-gray-600":"bg-blue-600 hover:bg-blue-700"),onClick:j,disabled:x,children:x?"Analyzing...":"Analyze"}),g&&(0,r.jsx)("p",{className:"text-red-500",children:g})]}),(0,r.jsx)("div",{className:"mt-8 space-y-4",children:h.map(e=>(0,r.jsxs)("div",{className:"bg-gray-800 p-4 rounded",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,r.jsxs)("div",{className:"flex items-center",children:[(0,r.jsx)("input",{type:"checkbox",checked:m.includes(e.id),onChange:()=>{f(m.includes(e.id)?m.filter(t=>t!==e.id):[...m,e.id])},className:"mr-2"}),(0,r.jsxs)("h3",{className:"text-xl font-semibold",children:[e.type," Analysis"]})]}),(0,r.jsx)("button",{onClick:()=>N(e.id),className:"text-blue-400 hover:text-blue-300",children:v.includes(e.id)?"Collapse":"Expand"})]}),(0,r.jsxs)("p",{className:"mb-2",children:["Instruction: ",e.instruction]}),v.includes(e.id)&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("details",{className:"mb-2",children:[(0,r.jsx)("summary",{className:"cursor-pointer",children:"View Request"}),(0,r.jsx)("pre",{className:"bg-gray-700 p-2 rounded mt-2 whitespace-pre-wrap",children:e.request})]}),(0,r.jsx)("h4",{className:"font-semibold mb-1",children:"Response:"}),(0,r.jsx)("div",{className:"bg-gray-700 p-2 rounded whitespace-pre-wrap",children:e.response})]})]},e.id))})]})}},7138:function(e,t,n){"use strict";n.d(t,{default:function(){return i.a}});var r=n(231),i=n.n(r)},357:function(e,t,n){"use strict";var r,i;e.exports=(null==(r=n.g.process)?void 0:r.env)&&"object"==typeof(null==(i=n.g.process)?void 0:i.env)?n.g.process:n(8081)},8081:function(e){!function(){var t={229:function(e){var t,n,r,i=e.exports={};function s(){throw Error("setTimeout has not been defined")}function a(){throw Error("clearTimeout has not been defined")}function o(e){if(t===setTimeout)return setTimeout(e,0);if((t===s||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:s}catch(e){t=s}try{n="function"==typeof clearTimeout?clearTimeout:a}catch(e){n=a}}();var c=[],l=!1,u=-1;function d(){l&&r&&(l=!1,r.length?c=r.concat(c):u=-1,c.length&&h())}function h(){if(!l){var e=o(d);l=!0;for(var t=c.length;t;){for(r=c,c=[];++u<t;)r&&r[u].run();u=-1,t=c.length}r=null,l=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===a||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function m(){}i.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];c.push(new p(e,t)),1!==c.length||l||o(h)},p.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=m,i.addListener=m,i.once=m,i.off=m,i.removeListener=m,i.removeAllListeners=m,i.emit=m,i.prependListener=m,i.prependOnceListener=m,i.listeners=function(e){return[]},i.binding=function(e){throw Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw Error("process.chdir is not supported")},i.umask=function(){return 0}}},n={};function r(e){var i=n[e];if(void 0!==i)return i.exports;var s=n[e]={exports:{}},a=!0;try{t[e](s,s.exports,r),a=!1}finally{a&&delete n[e]}return s.exports}r.ab="//";var i=r(229);e.exports=i}()}},function(e){e.O(0,[231,971,23,744],function(){return e(e.s=9442)}),_N_E=e.O()}]);