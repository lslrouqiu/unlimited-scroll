!function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){n(1),n(5),function(t){function e(e,n){let i=t.extend({},{loadHeight:0,upscroll:!1,isSrolling:!1,startY:0,percentage:.2,upDivId:"upText",downDivId:"downText",upHeight:100,downHeight:300},n),r=[],o={begin:0,end:0,height:0,scrollTop:0},s=t(e),a=0;function c(t){return t==window?document.documentElement.scrollTop||document.body.scrollTop:t.scrollTop}this.initParam=function(){i.upscroll&&s.prepend('<div id = "'+i.upDivId+'" style = "display:none">下拉刷新</div>'),i.height?(s.height(i.height),s.css("overflow-y","scroll")):s.css("height","100vh").css("overflow-y","scroll"),i.autoLoad&&function(){const e=i.scrollDom;t(e).prop("scrollHeight")<s.height()&&i.onLoad().then(n=>{if(0==n.num)s.append('<div id = "'+i.downDivId+'">加载完毕</div>'),setTimeout(function(){t("#"+i.downDivId).remove()},1e3);else{let i=t('<div class = "scroll-container" id = "page-'+a+'">'+n.str+"</div>");t(e).append(i);let s=i.height();r.push({id:"page-"+a,height:s,src:n.str}),o.height+=s,a++}}).catch(()=>{s.append('<div id = "'+i.downDivId+'">加载失败</div>'),setTimeout(function(){t("#"+i.downDivId).remove()},1e3)})}()},this.bindEvent=function(){let n=!1;const u=s.height(),l=5*u;s.on("touchstart",function(t){i.startY=t.touches[0].clientY}),s.on("touchmove",function(r){i.currentY=r.touches[0].clientY-i.startY;const o=c(e),a=i.currentY/window.screen.height,u=a*i.upHeight;n||(requestAnimationFrame(()=>{i.currentY>0&&0==o&&i.upscroll&&(t("#"+i.upDivId).show(),a>=i.percentage?t("#"+i.upDivId).text("释放刷新").show():t("#"+i.upDivId).text("下拉刷新").show(),s.css("transform","translate(0,"+u+"px)")),n=!1}),n=!0)}),s.on("touchend",function(n){const f=i.scrollDom,h=i.currentY,p=h/window.screen.height,d=c(e);if(h>0)if(0==d&&i.upscroll)p>=i.percentage&&(t("#"+i.upDivId).text("正在刷新..."),i.onRefresh().then(e=>{let n=t('<div class = "scroll-container" id = "page-'+a+'">'+e.str+"</div>");t(f).prepend(n);let s=n.height();if(r.unshift({id:"page-"+a,height:s,src:e.str}),o.height>=l&&l-o.height+r[o.end].height<s){let e=r[o.end+1];o.height+=s-e.height,t("#"+e.id).empty()}else o.end++,o.height+=s;o.scrollTop=0,a++,t("#"+i.upDivId).text("刷新成功,更新了"+e.num+"条数据")}).catch(e=>{t("#"+i.upDivId).text("刷新失败..."),s.css("transition","330ms").css("transform","translate(0,0)")})),setTimeout(function(){t("#"+i.upDivId).hide(),s.css("transition","330ms").css("transform","translate(0,0)")},1e3);else{let e=d-o.scrollTop;const n=r[o.end];if(o.begin>0&&(o.height-e-n.height>=3*u&&(t("#"+n.id).empty(),o.end--,o.height-=n.height),e<2*u)){o.begin--;const e=r[o.begin];t("#"+e.id).html(e.src),o.scrollTop-=e.height,o.height+=e.height}}else{let n=d-o.scrollTop;const c=r[o.begin].height;if(r.length-1>o.end){if(n>2*u){if(o.height-n<3*u){o.end++;const e=r[o.end];t("#"+e.id).html(e.src),o.height+=e.height}n-c>=2*u&&(t("#"+r[o.begin].id).height(c).empty(),o.begin++,o.scrollTop+=c,o.height-=c)}}else(function(t){if(t==window){let t=document.documentElement.scrollTop||document.body.scrollTop;return document.documentElement.scrollHeight-document.documentElement.clientHeight-t}return t.scrollHeight-t.clientHeight-t.scrollTop})(e)<=i.downHeight&&i.onLoad().then(e=>{if(0==e.num)s.append('<div id = "'+i.downDivId+'">加载完毕</div>'),setTimeout(function(){t("#"+i.downDivId).remove()},1e3);else{let n=t('<div class = "scroll-container" id = "page-'+a+'">'+e.str+"</div>");t(f).append(n);let i=n.height();if(r.push({id:"page-"+a,height:i,src:e.str}),a++,o.height>=l&&l-o.height+r[o.begin].height<domHeight){let e=r[o.begin];o.height+=i-e.height,t("#"+e.id).height(e.height).empty(),o.begin++,o.end++,o.scrollTop+=e.height}else o.end++,o.height+=i}}).catch(e=>{s.append('<div id = "'+i.downDivId+'">加载失败</div>'),setTimeout(function(){t("#"+i.downDivId).remove()},1e3)})}})}}e.prototype.init=function(){this.initParam(),this.bindEvent()},t.fn.unlimitedScroll=function(t){this.each(function(){new e(this,t).init()})}}(Zepto)},function(t,e,n){n(2),n(3),n(4),window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),t.exports=$},function(t,e){var n=function(){var t,e,n,i,r,o,s=[],a=s.concat,c=s.filter,u=s.slice,l=window.document,f={},h={},p={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},d=/^\s*<(\w+|!)[^>]*>/,m=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,g=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,v=/^(?:body|html)$/i,y=/([A-Z])/g,w=["val","css","html","text","data","width","height","offset"],x=l.createElement("table"),b=l.createElement("tr"),E={tr:l.createElement("tbody"),tbody:x,thead:x,tfoot:x,td:b,th:b,"*":l.createElement("div")},T=/^[\w-]*$/,j={},S=j.toString,D={},N=l.createElement("div"),O={tabindex:"tabIndex",readonly:"readOnly",for:"htmlFor",class:"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},C=Array.isArray||function(t){return t instanceof Array};function P(t){return null==t?String(t):j[S.call(t)]||"object"}function A(t){return"function"==P(t)}function F(t){return null!=t&&t==t.window}function L(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function I(t){return"object"==P(t)}function $(t){return I(t)&&!F(t)&&Object.getPrototypeOf(t)==Object.prototype}function M(t){var e=!!t&&"length"in t&&t.length,i=n.type(t);return"function"!=i&&!F(t)&&("array"==i||0===e||"number"==typeof e&&e>0&&e-1 in t)}function H(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function Z(t){return t in h?h[t]:h[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function q(t,e){return"number"!=typeof e||p[H(t)]?e:e+"px"}function R(t){return"children"in t?u.call(t.children):n.map(t.childNodes,function(t){if(1==t.nodeType)return t})}function k(t,e){var n,i=t?t.length:0;for(n=0;n<i;n++)this[n]=t[n];this.length=i,this.selector=e||""}function _(t,e){return null==e?n(t):n(t).filter(e)}function z(t,e,n,i){return A(e)?e.call(t,n,i):e}function Y(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function V(e,n){var i=e.className||"",r=i&&i.baseVal!==t;if(n===t)return r?i.baseVal:i;r?i.baseVal=n:e.className=n}function B(t){try{return t?"true"==t||"false"!=t&&("null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?n.parseJSON(t):t):t}catch(e){return t}}return D.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.matches||t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=N).appendChild(t),i=~D.qsa(r,e).indexOf(t),o&&N.removeChild(t),i},r=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},o=function(t){return c.call(t,function(e,n){return t.indexOf(e)==n})},D.fragment=function(e,i,r){var o,s,a;return m.test(e)&&(o=n(l.createElement(RegExp.$1))),o||(e.replace&&(e=e.replace(g,"<$1></$2>")),i===t&&(i=d.test(e)&&RegExp.$1),i in E||(i="*"),(a=E[i]).innerHTML=""+e,o=n.each(u.call(a.childNodes),function(){a.removeChild(this)})),$(r)&&(s=n(o),n.each(r,function(t,e){w.indexOf(t)>-1?s[t](e):s.attr(t,e)})),o},D.Z=function(t,e){return new k(t,e)},D.isZ=function(t){return t instanceof D.Z},D.init=function(e,i){var r;if(!e)return D.Z();if("string"==typeof e)if("<"==(e=e.trim())[0]&&d.test(e))r=D.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=D.qsa(l,e)}else{if(A(e))return n(l).ready(e);if(D.isZ(e))return e;if(C(e))r=function(t){return c.call(t,function(t){return null!=t})}(e);else if(I(e))r=[e],e=null;else if(d.test(e))r=D.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=D.qsa(l,e)}}return D.Z(r,e)},(n=function(t,e){return D.init(t,e)}).extend=function(n){var i,r=u.call(arguments,1);return"boolean"==typeof n&&(i=n,n=r.shift()),r.forEach(function(r){!function n(i,r,o){for(e in r)o&&($(r[e])||C(r[e]))?($(r[e])&&!$(i[e])&&(i[e]={}),C(r[e])&&!C(i[e])&&(i[e]=[]),n(i[e],r[e],o)):r[e]!==t&&(i[e]=r[e])}(n,r,i)}),n},D.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],o=i||r?e.slice(1):e,s=T.test(o);return t.getElementById&&s&&i?(n=t.getElementById(o))?[n]:[]:1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType?[]:u.call(s&&!i&&t.getElementsByClassName?r?t.getElementsByClassName(o):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=l.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},n.type=P,n.isFunction=A,n.isWindow=F,n.isArray=C,n.isPlainObject=$,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.isNumeric=function(t){var e=Number(t),n=typeof t;return null!=t&&"boolean"!=n&&("string"!=n||t.length)&&!isNaN(e)&&isFinite(e)||!1},n.inArray=function(t,e,n){return s.indexOf.call(e,t,n)},n.camelCase=r,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.noop=function(){},n.map=function(t,e){var i,r,o,s=[];if(M(t))for(r=0;r<t.length;r++)null!=(i=e(t[r],r))&&s.push(i);else for(o in t)null!=(i=e(t[o],o))&&s.push(i);return function(t){return t.length>0?n.fn.concat.apply([],t):t}(s)},n.each=function(t,e){var n,i;if(M(t)){for(n=0;n<t.length;n++)if(!1===e.call(t[n],n,t[n]))return t}else for(i in t)if(!1===e.call(t[i],i,t[i]))return t;return t},n.grep=function(t,e){return c.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){j["[object "+e+"]"]=e.toLowerCase()}),n.fn={constructor:D.Z,length:0,forEach:s.forEach,reduce:s.reduce,push:s.push,sort:s.sort,splice:s.splice,indexOf:s.indexOf,concat:function(){var t,e,n=[];for(t=0;t<arguments.length;t++)e=arguments[t],n[t]=D.isZ(e)?e.toArray():e;return a.apply(D.isZ(this)?this.toArray():this,n)},map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(u.apply(this,arguments))},ready:function(t){if("complete"===l.readyState||"loading"!==l.readyState&&!l.documentElement.doScroll)setTimeout(function(){t(n)},0);else{var e=function(){l.removeEventListener("DOMContentLoaded",e,!1),window.removeEventListener("load",e,!1),t(n)};l.addEventListener("DOMContentLoaded",e,!1),window.addEventListener("load",e,!1)}return this},get:function(e){return e===t?u.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return s.every.call(this,function(e,n){return!1!==t.call(e,n,e)}),this},filter:function(t){return A(t)?this.not(this.not(t)):n(c.call(this,function(e){return D.matches(e,t)}))},add:function(t,e){return n(o(this.concat(n(t,e))))},is:function(t){return"string"==typeof t?this.length>0&&D.matches(this[0],t):t&&this.selector==t.selector},not:function(e){var i=[];if(A(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):M(e)&&A(e.item)?u.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return I(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!I(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!I(t)?t:n(t)},find:function(t){var e=this;return t?"object"==typeof t?n(t).filter(function(){var t=this;return s.some.call(e,function(e){return n.contains(e,t)})}):1==this.length?n(D.qsa(this[0],t)):this.map(function(){return D.qsa(this,t)}):n()},closest:function(t,e){var i=[],r="object"==typeof t&&n(t);return this.each(function(n,o){for(;o&&!(r?r.indexOf(o)>=0:D.matches(o,t));)o=o!==e&&!L(o)&&o.parentNode;o&&i.indexOf(o)<0&&i.push(o)}),n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){if((t=t.parentNode)&&!L(t)&&e.indexOf(t)<0)return e.push(t),t});return _(e,t)},parent:function(t){return _(o(this.pluck("parentNode")),t)},children:function(t){return _(this.map(function(){return R(this)}),t)},contents:function(){return this.map(function(){return this.contentDocument||u.call(this.childNodes)})},siblings:function(t){return _(this.map(function(t,e){return c.call(R(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=function(t){var e,n;return f[t]||(e=l.createElement(t),l.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),f[t]=n),f[t]}(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=A(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){var e;for(n(this[0]).before(t=n(t));(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=A(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var i=this.innerHTML;n(this).empty().append(z(this,t,e,i))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=z(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this.pluck("textContent").join(""):null},attr:function(n,i){var r;return"string"!=typeof n||1 in arguments?this.each(function(t){if(1===this.nodeType)if(I(n))for(e in n)Y(this,e,n[e]);else Y(this,n,z(this,i,t,this.getAttribute(n)))}):0 in this&&1==this[0].nodeType&&null!=(r=this[0].getAttribute(n))?r:t},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){Y(this,t)},this)})},prop:function(t,n){return"string"!=typeof(t=O[t]||t)||1 in arguments?this.each(function(i){if(I(t))for(e in t)this[O[e]||e]=t[e];else this[t]=z(this,n,i,this[t])}):this[0]&&this[0][t]},removeProp:function(t){return t=O[t]||t,this.each(function(){delete this[t]})},data:function(e,n){var i="data-"+e.replace(y,"-$1").toLowerCase(),r=1 in arguments?this.attr(i,n):this.attr(i);return null!==r?B(r):t},val:function(t){return 0 in arguments?(null==t&&(t=""),this.each(function(e){this.value=z(this,t,e,this.value)})):this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=z(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(s.position="relative"),i.css(s)});if(!this.length)return null;if(l.documentElement!==this[0]&&!n.contains(l.documentElement,this[0]))return{top:0,left:0};var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var o=this[0];if("string"==typeof t){if(!o)return;return o.style[r(t)]||getComputedStyle(o,"").getPropertyValue(t)}if(C(t)){if(!o)return;var s={},a=getComputedStyle(o,"");return n.each(t,function(t,e){s[e]=o.style[r(e)]||a.getPropertyValue(e)}),s}}var c="";if("string"==P(t))i||0===i?c=H(t)+":"+q(t,i):this.each(function(){this.style.removeProperty(H(t))});else for(e in t)t[e]||0===t[e]?c+=H(e)+":"+q(e,t[e])+";":this.each(function(){this.style.removeProperty(H(e))});return this.each(function(){this.style.cssText+=";"+c})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return!!t&&s.some.call(this,function(t){return this.test(V(t))},Z(t))},addClass:function(t){return t?this.each(function(e){if("className"in this){i=[];var r=V(this);z(this,t,e,r).split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&V(this,r+(r?" ":"")+i.join(" "))}}):this},removeClass:function(e){return this.each(function(n){if("className"in this){if(e===t)return V(this,"");i=V(this),z(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(Z(t)," ")}),V(this,i.trim())}})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this);z(this,e,r,V(this)).split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=v.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||l.body;t&&!v.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];return r===t?F(s)?s["inner"+i]:L(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){(s=n(this)).css(e,z(this,r,t,s[e]()))})}}),["after","prepend","before","append"].forEach(function(e,i){var r=i%2;n.fn[e]=function(){var e,o,s=n.map(arguments,function(i){var r=[];return"array"==(e=P(i))?(i.forEach(function(e){return e.nodeType!==t?r.push(e):n.zepto.isZ(e)?r=r.concat(e.get()):void(r=r.concat(D.fragment(e)))}),r):"object"==e||null==i?i:D.fragment(i)}),a=this.length>1;return s.length<1?this:this.each(function(t,e){o=r?e:e.parentNode,e=0==i?e.nextSibling:1==i?e.firstChild:2==i?e:null;var c=n.contains(l.documentElement,o);s.forEach(function(t){if(a)t=t.cloneNode(!0);else if(!o)return n(t).remove();o.insertBefore(t,e),c&&function t(e,n){n(e);for(var i=0,r=e.childNodes.length;i<r;i++)t(e.childNodes[i],n)}(t,function(t){if(!(null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src)){var e=t.ownerDocument?t.ownerDocument.defaultView:window;e.eval.call(e,t.innerHTML)}})})})},n.fn[r?e+"To":"insert"+(i?"Before":"After")]=function(t){return n(t)[e](this),this}}),D.Z.prototype=k.prototype=n.fn,D.uniq=o,D.deserializeValue=B,n.zepto=D,n}();window.Zepto=n,void 0===window.$&&(window.$=n)},function(t,e){!function(t){var e,n=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},s={},a={},c="onfocusin"in window,u={focus:"focusin",blur:"focusout"},l={mouseenter:"mouseover",mouseleave:"mouseout"};function f(t){return t._zid||(t._zid=n++)}function h(t,e,n,i){if((e=p(e)).ns)var r=function(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}(e.ns);return(s[f(t)]||[]).filter(function(t){return t&&(!e.e||t.e==e.e)&&(!e.ns||r.test(t.ns))&&(!n||f(t.fn)===f(n))&&(!i||t.sel==i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t,e){return t.del&&!c&&t.e in u||!!e}function m(t){return l[t]||c&&u[t]||t}function g(n,i,r,o,a,c,u){var h=f(n),g=s[h]||(s[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var s=p(i);s.fn=r,s.sel=a,s.e in l&&(r=function(e){var n=e.relatedTarget;if(!n||n!==this&&!t.contains(this,n))return s.fn.apply(this,arguments)}),s.del=c;var f=c||r;s.proxy=function(t){if(!(t=E(t)).isImmediatePropagationStopped()){t.data=o;var i=f.apply(n,t._args==e?[t]:[t].concat(t._args));return!1===i&&(t.preventDefault(),t.stopPropagation()),i}},s.i=g.length,g.push(s),"addEventListener"in n&&n.addEventListener(m(s.e),s.proxy,d(s,u))})}function v(t,e,n,i,r){var o=f(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(m(e.e),e.proxy,d(e,r))})})}a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:g,remove:v},t.proxy=function(e,n){var s=2 in arguments&&i.call(arguments,2);if(r(e)){var a=function(){return e.apply(n,s?s.concat(i.call(arguments)):arguments)};return a._zid=f(e),a}if(o(n))return s?(s.unshift(e[n],e),t.proxy.apply(null,s)):t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var y=function(){return!0},w=function(){return!1},x=/^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,b={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};function E(n,i){if(i||!n.isDefaultPrevented){i||(i=n),t.each(b,function(t,e){var r=i[t];n[t]=function(){return this[e]=y,r&&r.apply(i,arguments)},n[e]=w});try{n.timeStamp||(n.timeStamp=Date.now())}catch(t){}(i.defaultPrevented!==e?i.defaultPrevented:"returnValue"in i?!1===i.returnValue:i.getPreventDefault&&i.getPreventDefault())&&(n.isDefaultPrevented=y)}return n}function T(t){var n,i={originalEvent:t};for(n in t)x.test(n)||t[n]===e||(i[n]=t[n]);return E(i,t)}t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(n,s,a,c,u){var l,f,h=this;return n&&!o(n)?(t.each(n,function(t,e){h.on(t,s,a,e,u)}),h):(o(s)||r(c)||!1===c||(c=a,a=s,s=e),c!==e&&!1!==a||(c=a,a=e),!1===c&&(c=w),h.each(function(e,r){u&&(l=function(t){return v(r,t.type,c),c.apply(this,arguments)}),s&&(f=function(e){var n,o=t(e.target).closest(s,r).get(0);if(o&&o!==r)return n=t.extend(T(e),{currentTarget:o,liveFired:r}),(l||c).apply(o,[n].concat(i.call(arguments,1)))}),g(r,n,c,a,s,f||l)}))},t.fn.off=function(n,i,s){var a=this;return n&&!o(n)?(t.each(n,function(t,e){a.off(t,i,e)}),a):(o(i)||r(s)||!1===s||(s=i,i=e),!1===s&&(s=w),a.each(function(){v(this,n,s,i)}))},t.fn.trigger=function(e,n){return(e=o(e)||t.isPlainObject(e)?t.Event(e):E(e))._args=n,this.each(function(){e.type in u&&"function"==typeof this[e.type]?this[e.type]():"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(s,a){(i=T(o(e)?t.Event(e):e))._args=n,i.target=a,t.each(h(a,e.type||e),function(t,e){if(r=e.proxy(i),i.isImmediatePropagationStopped())return!1})}),r},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return 0 in arguments?this.bind(e,t):this.trigger(e)}}),t.Event=function(t,e){o(t)||(t=(e=t).type);var n=document.createEvent(a[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),E(n)}}(Zepto)},function(t,e){!function(t){var e,n,i=+new Date,r=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,a=/^(?:text|application)\/xml/i,c="application/json",u="text/html",l=/^\s*$/,f=r.createElement("a");function h(e,n,i,o){if(e.global)return function(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}(n||r,i,o)}function p(t,e){var n=e.context;if(!1===e.beforeSend.call(n,t,e)||!1===h(e,n,"ajaxBeforeSend",[t,e]))return!1;h(e,n,"ajaxSend",[t,e])}function d(t,e,n,i){var r=n.context;n.success.call(r,t,"success",e),i&&i.resolveWith(r,[t,"success",e]),h(n,r,"ajaxSuccess",[e,n,t]),g("success",e,n)}function m(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),h(i,o,"ajaxError",[n,i,t||e]),g(e,n,i)}function g(e,n,i){var r=i.context;i.complete.call(r,n,e),h(i,r,"ajaxComplete",[n,i]),function(e){e.global&&!--t.active&&h(e,null,"ajaxStop")}(i)}function v(){}function y(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function w(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}f.href=window.location.href,t.active=0,t.ajaxJSONP=function(e,n){if(!("type"in e))return t.ajax(e);var o,s,a=e.jsonpCallback,c=(t.isFunction(a)?a():a)||"Zepto"+i++,u=r.createElement("script"),l=window[c],f=function(e){t(u).triggerHandler("error",e||"abort")},h={abort:f};return n&&n.promise(h),t(u).on("load error",function(i,r){clearTimeout(s),t(u).off().remove(),"error"!=i.type&&o?d(o[0],h,e,n):m(null,r||"error",h,e,n),window[c]=l,o&&t.isFunction(l)&&l(o[0]),l=o=void 0}),!1===p(h,e)?(f("abort"),h):(window[c]=function(){o=arguments},u.src=e.url.replace(/\?(.+)=\?/,"?$1="+c),r.head.appendChild(u),e.timeout>0&&(s=setTimeout(function(){f("timeout")},e.timeout)),h)},t.ajaxSettings={type:"GET",beforeSend:v,success:v,error:v,complete:v,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:c,xml:"application/xml, text/xml",html:u,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0,dataFilter:v},t.ajax=function(i){var o,g,w=t.extend({},i||{}),x=t.Deferred&&t.Deferred();for(e in t.ajaxSettings)void 0===w[e]&&(w[e]=t.ajaxSettings[e]);!function(e){e.global&&0==t.active++&&h(e,null,"ajaxStart")}(w),w.crossDomain||((o=r.createElement("a")).href=w.url,o.href=o.href,w.crossDomain=f.protocol+"//"+f.host!=o.protocol+"//"+o.host),w.url||(w.url=window.location.toString()),(g=w.url.indexOf("#"))>-1&&(w.url=w.url.slice(0,g)),function(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()&&"jsonp"!=e.dataType||(e.url=y(e.url,e.data),e.data=void 0)}(w);var b=w.dataType,E=/\?.+=\?/.test(w.url);if(E&&(b="jsonp"),!1!==w.cache&&(i&&!0===i.cache||"script"!=b&&"jsonp"!=b)||(w.url=y(w.url,"_="+Date.now())),"jsonp"==b)return E||(w.url=y(w.url,w.jsonp?w.jsonp+"=?":!1===w.jsonp?"":"callback=?")),t.ajaxJSONP(w,x);var T,j=w.accepts[b],S={},D=function(t,e){S[t.toLowerCase()]=[t,e]},N=/^([\w-]+:)\/\//.test(w.url)?RegExp.$1:window.location.protocol,O=w.xhr(),C=O.setRequestHeader;if(x&&x.promise(O),w.crossDomain||D("X-Requested-With","XMLHttpRequest"),D("Accept",j||"*/*"),(j=w.mimeType||j)&&(j.indexOf(",")>-1&&(j=j.split(",",2)[0]),O.overrideMimeType&&O.overrideMimeType(j)),(w.contentType||!1!==w.contentType&&w.data&&"GET"!=w.type.toUpperCase())&&D("Content-Type",w.contentType||"application/x-www-form-urlencoded"),w.headers)for(n in w.headers)D(n,w.headers[n]);if(O.setRequestHeader=D,O.onreadystatechange=function(){if(4==O.readyState){O.onreadystatechange=v,clearTimeout(T);var e,n=!1;if(O.status>=200&&O.status<300||304==O.status||0==O.status&&"file:"==N){if(b=b||function(t){return t&&(t=t.split(";",2)[0]),t&&(t==u?"html":t==c?"json":s.test(t)?"script":a.test(t)&&"xml")||"text"}(w.mimeType||O.getResponseHeader("content-type")),"arraybuffer"==O.responseType||"blob"==O.responseType)e=O.response;else{e=O.responseText;try{e=function(t,e,n){if(n.dataFilter==v)return t;var i=n.context;return n.dataFilter.call(i,t,e)}(e,b,w),"script"==b?(0,eval)(e):"xml"==b?e=O.responseXML:"json"==b&&(e=l.test(e)?null:t.parseJSON(e))}catch(t){n=t}if(n)return m(n,"parsererror",O,w,x)}d(e,O,w,x)}else m(O.statusText||null,O.status?"error":"abort",O,w,x)}},!1===p(O,w))return O.abort(),m(null,"abort",O,w,x),O;var P=!("async"in w)||w.async;if(O.open(w.type,w.url,P,w.username,w.password),w.xhrFields)for(n in w.xhrFields)O[n]=w.xhrFields[n];for(n in S)C.apply(O,S[n]);return w.timeout>0&&(T=setTimeout(function(){O.onreadystatechange=v,O.abort(),m(null,"timeout",O,w,x)},w.timeout)),O.send(w.data?w.data:null),O},t.get=function(){return t.ajax(w.apply(null,arguments))},t.post=function(){var e=w.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=w.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var r,s=this,a=e.split(/\s/),c=w(e,n,i),u=c.success;return a.length>1&&(c.url=a[0],r=a[1]),c.success=function(e){s.html(r?t("<div>").html(e.replace(o,"")).find(r):e),u&&u.apply(s,arguments)},t.ajax(c),this};var x=encodeURIComponent;t.param=function(e,n){var i=[];return i.add=function(e,n){t.isFunction(n)&&(n=n()),null==n&&(n=""),this.push(x(e)+"="+x(n))},function e(n,i,r,o){var s,a=t.isArray(i),c=t.isPlainObject(i);t.each(i,function(i,u){s=t.type(u),o&&(i=r?o:o+"["+(c||"object"==s||"array"==s?i:"")+"]"),!o&&a?n.add(u.name,u.value):"array"==s||!r&&"object"==s?e(n,u,r,i):n.add(i,u)})}(i,e,n),i.join("&").replace(/%20/g,"+")}}(Zepto)},function(t,e){!function(){for(var t=0,e=["ms","moz","webkit","o"],n=0;n<e.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[e[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[n]+"CancelAnimationFrame"]||window[e[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,n){var i=(new Date).getTime(),r=Math.max(0,16-(i-t)),o=window.setTimeout(function(){e(i+r)},r);return t=i+r,o}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}()}]);