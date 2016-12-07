"object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(a){return 10>a?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return"string"==typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g,h=gap,i=b[a];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(a)),"function"==typeof rep&&(i=rep.call(b,a,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,g=[],"[object Array]"===Object.prototype.toString.apply(i)){for(f=i.length,c=0;f>c;c+=1)g[c]=str(c,i)||"null";return e=0===g.length?"[]":gap?"[\n"+gap+g.join(",\n"+gap)+"\n"+h+"]":"["+g.join(",")+"]",gap=h,e}if(rep&&"object"==typeof rep)for(f=rep.length,c=0;f>c;c+=1)"string"==typeof rep[c]&&(d=rep[c],e=str(d,i),e&&g.push(quote(d)+(gap?": ":":")+e));else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&g.push(quote(d)+(gap?": ":":")+e));return e=0===g.length?"{}":gap?"{\n"+gap+g.join(",\n"+gap)+"\n"+h+"}":"{"+g.join(",")+"}",gap=h,e}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;"function"!=typeof JSON.stringify&&(JSON.stringify=function(a,b,c){var d;if(gap="",indent="","number"==typeof c)for(d=0;c>d;d+=1)indent+=" ";else"string"==typeof c&&(indent=c);if(rep=b,b&&"function"!=typeof b&&("object"!=typeof b||"number"!=typeof b.length))throw new Error("JSON.stringify");return str("",{"":a})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&"object"==typeof e)for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),void 0!==d?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();
/**
 * easyXDM
 * http://easyxdm.net/
 * Copyright(c) 2009-2011, Øyvind Sean Kinsey, oyvind@kinsey.no.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function(N,d,p,K,k,H){var b=this;var n=Math.floor(Math.random()*10000);var q=Function.prototype;var Q=/^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/;var R=/[\-\w]+\/\.\.\//;var F=/([^:])\/\//g;var I="";var o={};var M=N.easyXDM;var U="easyXDM_";var E;var y=false;var i;var h;function C(X,Z){var Y=typeof X[Z];return Y=="function"||(!!(Y=="object"&&X[Z]))||Y=="unknown"}function u(X,Y){return !!(typeof(X[Y])=="object"&&X[Y])}function r(X){return Object.prototype.toString.call(X)==="[object Array]"}function c(){var Z="Shockwave Flash",ad="application/x-shockwave-flash";if(!t(navigator.plugins)&&typeof navigator.plugins[Z]=="object"){var ab=navigator.plugins[Z].description;if(ab&&!t(navigator.mimeTypes)&&navigator.mimeTypes[ad]&&navigator.mimeTypes[ad].enabledPlugin){i=ab.match(/\d+/g)}}if(!i){var Y;try{Y=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");i=Array.prototype.slice.call(Y.GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/),1);Y=null}catch(ac){}}if(!i){return false}var X=parseInt(i[0],10),aa=parseInt(i[1],10);h=X>9&&aa>0;return true}var v,x;if(C(N,"addEventListener")){v=function(Z,X,Y){Z.addEventListener(X,Y,false)};x=function(Z,X,Y){Z.removeEventListener(X,Y,false)}}else{if(C(N,"attachEvent")){v=function(X,Z,Y){X.attachEvent("on"+Z,Y)};x=function(X,Z,Y){X.detachEvent("on"+Z,Y)}}else{throw new Error("Browser not supported")}}var W=false,J=[],L;if("readyState" in d){L=d.readyState;W=L=="complete"||(~navigator.userAgent.indexOf("AppleWebKit/")&&(L=="loaded"||L=="interactive"))}else{W=!!d.body}function s(){if(W){return}W=true;for(var X=0;X<J.length;X++){J[X]()}J.length=0}if(!W){if(C(N,"addEventListener")){v(d,"DOMContentLoaded",s)}else{v(d,"readystatechange",function(){if(d.readyState=="complete"){s()}});if(d.documentElement.doScroll&&N===top){var g=function(){if(W){return}try{d.documentElement.doScroll("left")}catch(X){K(g,1);return}s()};g()}}v(N,"load",s)}function G(Y,X){if(W){Y.call(X);return}J.push(function(){Y.call(X)})}function m(){var Z=parent;if(I!==""){for(var X=0,Y=I.split(".");X<Y.length;X++){Z=Z[Y[X]]}}return Z.easyXDM}function e(X){N.easyXDM=M;I=X;if(I){U="easyXDM_"+I.replace(".","_")+"_"}return o}function z(X){return X.match(Q)[3]}function f(X){return X.match(Q)[4]||""}function j(Z){var X=Z.toLowerCase().match(Q);var aa=X[2],ab=X[3],Y=X[4]||"";if((aa=="http:"&&Y==":80")||(aa=="https:"&&Y==":443")){Y=""}return aa+"//"+ab+Y}function B(X){X=X.replace(F,"$1/");if(!X.match(/^(http||https):\/\//)){var Y=(X.substring(0,1)==="/")?"":p.pathname;if(Y.substring(Y.length-1)!=="/"){Y=Y.substring(0,Y.lastIndexOf("/")+1)}X=p.protocol+"//"+p.host+Y+X}while(R.test(X)){X=X.replace(R,"")}return X}function P(X,aa){var ac="",Z=X.indexOf("#");if(Z!==-1){ac=X.substring(Z);X=X.substring(0,Z)}var ab=[];for(var Y in aa){if(aa.hasOwnProperty(Y)){ab.push(Y+"="+H(aa[Y]))}}return X+(y?"#":(X.indexOf("?")==-1?"?":"&"))+ab.join("&")+ac}var S=(function(X){X=X.substring(1).split("&");var Z={},aa,Y=X.length;while(Y--){aa=X[Y].split("=");Z[aa[0]]=k(aa[1])}return Z}(/xdm_e=/.test(p.search)?p.search:p.hash));function t(X){return typeof X==="undefined"}var O=function(){var Y={};var Z={a:[1,2,3]},X='{"a":[1,2,3]}';if(typeof JSON!="undefined"&&typeof JSON.stringify==="function"&&JSON.stringify(Z).replace((/\s/g),"")===X){return JSON}if(Object.toJSON){if(Object.toJSON(Z).replace((/\s/g),"")===X){Y.stringify=Object.toJSON}}if(typeof String.prototype.evalJSON==="function"){Z=X.evalJSON();if(Z.a&&Z.a.length===3&&Z.a[2]===3){Y.parse=function(aa){return aa.evalJSON()}}}if(Y.stringify&&Y.parse){O=function(){return Y};return Y}return null};function T(X,Y,Z){var ab;for(var aa in Y){if(Y.hasOwnProperty(aa)){if(aa in X){ab=Y[aa];if(typeof ab==="object"){T(X[aa],ab,Z)}else{if(!Z){X[aa]=Y[aa]}}}else{X[aa]=Y[aa]}}}return X}function a(){var Y=d.body.appendChild(d.createElement("form")),X=Y.appendChild(d.createElement("input"));X.name=U+"TEST"+n;E=X!==Y.elements[X.name];d.body.removeChild(Y)}function A(Y){if(t(E)){a()}var ac;if(E){ac=d.createElement('<iframe name="'+Y.props.name+'"/>')}else{ac=d.createElement("IFRAME");ac.name=Y.props.name}ac.id=ac.name=Y.props.name;delete Y.props.name;if(typeof Y.container=="string"){Y.container=d.getElementById(Y.container)}if(!Y.container){T(ac.style,{position:"absolute",top:"-2000px",left:"0px"});Y.container=d.body}var ab=Y.props.src;Y.props.src="javascript:false";T(ac,Y.props);ac.border=ac.frameBorder=0;ac.allowTransparency=true;Y.container.appendChild(ac);if(Y.onLoad){v(ac,"load",Y.onLoad)}if(Y.usePost){var aa=Y.container.appendChild(d.createElement("form")),X;aa.target=ac.name;aa.action=ab;aa.method="POST";if(typeof(Y.usePost)==="object"){for(var Z in Y.usePost){if(Y.usePost.hasOwnProperty(Z)){if(E){X=d.createElement('<input name="'+Z+'"/>')}else{X=d.createElement("INPUT");X.name=Z}X.value=Y.usePost[Z];aa.appendChild(X)}}}aa.submit();aa.parentNode.removeChild(aa)}else{ac.src=ab}Y.props.src=ab;return ac}function V(aa,Z){if(typeof aa=="string"){aa=[aa]}var Y,X=aa.length;while(X--){Y=aa[X];Y=new RegExp(Y.substr(0,1)=="^"?Y:("^"+Y.replace(/(\*)/g,".$1").replace(/\?/g,".")+"$"));if(Y.test(Z)){return true}}return false}function l(Z){var ae=Z.protocol,Y;Z.isHost=Z.isHost||t(S.xdm_p);y=Z.hash||false;if(!Z.props){Z.props={}}if(!Z.isHost){Z.channel=S.xdm_c.replace(/["'<>\\]/g,"");Z.secret=S.xdm_s;Z.remote=S.xdm_e.replace(/["'<>\\]/g,"");ae=S.xdm_p;if(Z.acl&&!V(Z.acl,Z.remote)){throw new Error("Access denied for "+Z.remote)}}else{Z.remote=B(Z.remote);Z.channel=Z.channel||"default"+n++;Z.secret=Math.random().toString(16).substring(2);if(t(ae)){if(j(p.href)==j(Z.remote)){ae="4"}else{if(C(N,"postMessage")||C(d,"postMessage")){ae="1"}else{if(Z.swf&&C(N,"ActiveXObject")&&c()){ae="6"}else{if(navigator.product==="Gecko"&&"frameElement" in N&&navigator.userAgent.indexOf("WebKit")==-1){ae="5"}else{if(Z.remoteHelper){ae="2"}else{ae="0"}}}}}}}Z.protocol=ae;switch(ae){case"0":T(Z,{interval:100,delay:2000,useResize:true,useParent:false,usePolling:false},true);if(Z.isHost){if(!Z.local){var ac=p.protocol+"//"+p.host,X=d.body.getElementsByTagName("img"),ad;var aa=X.length;while(aa--){ad=X[aa];if(ad.src.substring(0,ac.length)===ac){Z.local=ad.src;break}}if(!Z.local){Z.local=N}}var ab={xdm_c:Z.channel,xdm_p:0};if(Z.local===N){Z.usePolling=true;Z.useParent=true;Z.local=p.protocol+"//"+p.host+p.pathname+p.search;ab.xdm_e=Z.local;ab.xdm_pa=1}else{ab.xdm_e=B(Z.local)}if(Z.container){Z.useResize=false;ab.xdm_po=1}Z.remote=P(Z.remote,ab)}else{T(Z,{channel:S.xdm_c,remote:S.xdm_e,useParent:!t(S.xdm_pa),usePolling:!t(S.xdm_po),useResize:Z.useParent?false:Z.useResize})}Y=[new o.stack.HashTransport(Z),new o.stack.ReliableBehavior({}),new o.stack.QueueBehavior({encode:true,maxLength:4000-Z.remote.length}),new o.stack.VerifyBehavior({initiate:Z.isHost})];break;case"1":Y=[new o.stack.PostMessageTransport(Z)];break;case"2":if(Z.isHost){Z.remoteHelper=B(Z.remoteHelper)}Y=[new o.stack.NameTransport(Z),new o.stack.QueueBehavior(),new o.stack.VerifyBehavior({initiate:Z.isHost})];break;case"3":Y=[new o.stack.NixTransport(Z)];break;case"4":Y=[new o.stack.SameOriginTransport(Z)];break;case"5":Y=[new o.stack.FrameElementTransport(Z)];break;case"6":if(!i){c()}Y=[new o.stack.FlashTransport(Z)];break}Y.push(new o.stack.QueueBehavior({lazy:Z.lazy,remove:true}));return Y}function D(aa){var ab,Z={incoming:function(ad,ac){this.up.incoming(ad,ac)},outgoing:function(ac,ad){this.down.outgoing(ac,ad)},callback:function(ac){this.up.callback(ac)},init:function(){this.down.init()},destroy:function(){this.down.destroy()}};for(var Y=0,X=aa.length;Y<X;Y++){ab=aa[Y];T(ab,Z,true);if(Y!==0){ab.down=aa[Y-1]}if(Y!==X-1){ab.up=aa[Y+1]}}return ab}function w(X){X.up.down=X.down;X.down.up=X.up;X.up=X.down=null}T(o,{version:"2.4.18.25",query:S,stack:{},apply:T,getJSONObject:O,whenReady:G,noConflict:e});o.DomHelper={on:v,un:x,requiresJSON:function(X){if(!u(N,"JSON")){d.write('<script type="text/javascript" src="'+X+'"><\/script>')}}};(function(){var X={};o.Fn={set:function(Y,Z){X[Y]=Z},get:function(Z,Y){var aa=X[Z];if(Y){delete X[Z]}return aa}}}());o.Socket=function(Y){var X=D(l(Y).concat([{incoming:function(ab,aa){Y.onMessage(ab,aa)},callback:function(aa){if(Y.onReady){Y.onReady(aa)}}}])),Z=j(Y.remote);this.origin=j(Y.remote);this.destroy=function(){X.destroy()};this.postMessage=function(aa){X.outgoing(aa,Z)};X.init()};o.Rpc=function(Z,Y){if(Y.local){for(var ab in Y.local){if(Y.local.hasOwnProperty(ab)){var aa=Y.local[ab];if(typeof aa==="function"){Y.local[ab]={method:aa}}}}}var X=D(l(Z).concat([new o.stack.RpcBehavior(this,Y),{callback:function(ac){if(Z.onReady){Z.onReady(ac)}}}]));this.origin=j(Z.remote);this.destroy=function(){X.destroy()};X.init()};o.stack.SameOriginTransport=function(Y){var Z,ab,aa,X;return(Z={outgoing:function(ad,ae,ac){aa(ad);if(ac){ac()}},destroy:function(){if(ab){ab.parentNode.removeChild(ab);ab=null}},onDOMReady:function(){X=j(Y.remote);if(Y.isHost){T(Y.props,{src:P(Y.remote,{xdm_e:p.protocol+"//"+p.host+p.pathname,xdm_c:Y.channel,xdm_p:4}),name:U+Y.channel+"_provider"});ab=A(Y);o.Fn.set(Y.channel,function(ac){aa=ac;K(function(){Z.up.callback(true)},0);return function(ad){Z.up.incoming(ad,X)}})}else{aa=m().Fn.get(Y.channel,true)(function(ac){Z.up.incoming(ac,X)});K(function(){Z.up.callback(true)},0)}},init:function(){G(Z.onDOMReady,Z)}})};o.stack.FlashTransport=function(aa){var ac,X,ab,ad,Y,ae;function af(ah,ag){K(function(){ac.up.incoming(ah,ad)},0)}function Z(ah){var ag=aa.swf+"?host="+aa.isHost;var aj="easyXDM_swf_"+Math.floor(Math.random()*10000);o.Fn.set("flash_loaded"+ah.replace(/[\-.]/g,"_"),function(){o.stack.FlashTransport[ah].swf=Y=ae.firstChild;var ak=o.stack.FlashTransport[ah].queue;for(var al=0;al<ak.length;al++){ak[al]()}ak.length=0});if(aa.swfContainer){ae=(typeof aa.swfContainer=="string")?d.getElementById(aa.swfContainer):aa.swfContainer}else{ae=d.createElement("div");T(ae.style,h&&aa.swfNoThrottle?{height:"20px",width:"20px",position:"fixed",right:0,top:0}:{height:"1px",width:"1px",position:"absolute",overflow:"hidden",right:0,top:0});d.body.appendChild(ae)}var ai="callback=flash_loaded"+H(ah.replace(/[\-.]/g,"_"))+"&proto="+b.location.protocol+"&domain="+H(z(b.location.href))+"&port="+H(f(b.location.href))+"&ns="+H(I);ae.innerHTML="<object height='20' width='20' type='application/x-shockwave-flash' id='"+aj+"' data='"+ag+"'><param name='allowScriptAccess' value='always'></param><param name='wmode' value='transparent'><param name='movie' value='"+ag+"'></param><param name='flashvars' value='"+ai+"'></param><embed type='application/x-shockwave-flash' FlashVars='"+ai+"' allowScriptAccess='always' wmode='transparent' src='"+ag+"' height='1' width='1'></embed></object>"}return(ac={outgoing:function(ah,ai,ag){Y.postMessage(aa.channel,ah.toString());if(ag){ag()}},destroy:function(){try{Y.destroyChannel(aa.channel)}catch(ag){}Y=null;if(X){X.parentNode.removeChild(X);X=null}},onDOMReady:function(){ad=aa.remote;o.Fn.set("flash_"+aa.channel+"_init",function(){K(function(){ac.up.callback(true)})});o.Fn.set("flash_"+aa.channel+"_onMessage",af);aa.swf=B(aa.swf);var ah=z(aa.swf);var ag=function(){o.stack.FlashTransport[ah].init=true;Y=o.stack.FlashTransport[ah].swf;Y.createChannel(aa.channel,aa.secret,j(aa.remote),aa.isHost);if(aa.isHost){if(h&&aa.swfNoThrottle){T(aa.props,{position:"fixed",right:0,top:0,height:"20px",width:"20px"})}T(aa.props,{src:P(aa.remote,{xdm_e:j(p.href),xdm_c:aa.channel,xdm_p:6,xdm_s:aa.secret}),name:U+aa.channel+"_provider"});X=A(aa)}};if(o.stack.FlashTransport[ah]&&o.stack.FlashTransport[ah].init){ag()}else{if(!o.stack.FlashTransport[ah]){o.stack.FlashTransport[ah]={queue:[ag]};Z(ah)}else{o.stack.FlashTransport[ah].queue.push(ag)}}},init:function(){G(ac.onDOMReady,ac)}})};o.stack.PostMessageTransport=function(aa){var ac,ad,Y,Z;function X(ae){if(ae.origin){return j(ae.origin)}if(ae.uri){return j(ae.uri)}if(ae.domain){return p.protocol+"//"+ae.domain}throw"Unable to retrieve the origin of the event"}function ab(af){var ae=X(af);if(ae==Z&&af.data.substring(0,aa.channel.length+1)==aa.channel+" "){ac.up.incoming(af.data.substring(aa.channel.length+1),ae)}}return(ac={outgoing:function(af,ag,ae){Y.postMessage(aa.channel+" "+af,ag||Z);if(ae){ae()}},destroy:function(){x(N,"message",ab);if(ad){Y=null;ad.parentNode.removeChild(ad);ad=null}},onDOMReady:function(){Z=j(aa.remote);if(aa.isHost){var ae=function(af){if(af.data==aa.channel+"-ready"){Y=("postMessage" in ad.contentWindow)?ad.contentWindow:ad.contentWindow.document;x(N,"message",ae);v(N,"message",ab);K(function(){ac.up.callback(true)},0)}};v(N,"message",ae);T(aa.props,{src:P(aa.remote,{xdm_e:j(p.href),xdm_c:aa.channel,xdm_p:1}),name:U+aa.channel+"_provider"});ad=A(aa)}else{v(N,"message",ab);Y=("postMessage" in N.parent)?N.parent:N.parent.document;Y.postMessage(aa.channel+"-ready",Z);K(function(){ac.up.callback(true)},0)}},init:function(){G(ac.onDOMReady,ac)}})};o.stack.FrameElementTransport=function(Y){var Z,ab,aa,X;return(Z={outgoing:function(ad,ae,ac){aa.call(this,ad);if(ac){ac()}},destroy:function(){if(ab){ab.parentNode.removeChild(ab);ab=null}},onDOMReady:function(){X=j(Y.remote);if(Y.isHost){T(Y.props,{src:P(Y.remote,{xdm_e:j(p.href),xdm_c:Y.channel,xdm_p:5}),name:U+Y.channel+"_provider"});ab=A(Y);ab.fn=function(ac){delete ab.fn;aa=ac;K(function(){Z.up.callback(true)},0);return function(ad){Z.up.incoming(ad,X)}}}else{if(d.referrer&&j(d.referrer)!=S.xdm_e){N.top.location=S.xdm_e}aa=N.frameElement.fn(function(ac){Z.up.incoming(ac,X)});Z.up.callback(true)}},init:function(){G(Z.onDOMReady,Z)}})};o.stack.NameTransport=function(ab){var ac;var ae,ai,aa,ag,ah,Y,X;function af(al){var ak=ab.remoteHelper+(ae?"#_3":"#_2")+ab.channel;ai.contentWindow.sendMessage(al,ak)}function ad(){if(ae){if(++ag===2||!ae){ac.up.callback(true)}}else{af("ready");ac.up.callback(true)}}function aj(ak){ac.up.incoming(ak,Y)}function Z(){if(ah){K(function(){ah(true)},0)}}return(ac={outgoing:function(al,am,ak){ah=ak;af(al)},destroy:function(){ai.parentNode.removeChild(ai);ai=null;if(ae){aa.parentNode.removeChild(aa);aa=null}},onDOMReady:function(){ae=ab.isHost;ag=0;Y=j(ab.remote);ab.local=B(ab.local);if(ae){o.Fn.set(ab.channel,function(al){if(ae&&al==="ready"){o.Fn.set(ab.channel,aj);ad()}});X=P(ab.remote,{xdm_e:ab.local,xdm_c:ab.channel,xdm_p:2});T(ab.props,{src:X+"#"+ab.channel,name:U+ab.channel+"_provider"});aa=A(ab)}else{ab.remoteHelper=ab.remote;o.Fn.set(ab.channel,aj)}var ak=function(){var al=ai||this;x(al,"load",ak);o.Fn.set(ab.channel+"_load",Z);(function am(){if(typeof al.contentWindow.sendMessage=="function"){ad()}else{K(am,50)}}())};ai=A({props:{src:ab.local+"#_4"+ab.channel},onLoad:ak})},init:function(){G(ac.onDOMReady,ac)}})};o.stack.HashTransport=function(Z){var ac;var ah=this,af,aa,X,ad,am,ab,al;var ag,Y;function ak(ao){if(!al){return}var an=Z.remote+"#"+(am++)+"_"+ao;((af||!ag)?al.contentWindow:al).location=an}function ae(an){ad=an;ac.up.incoming(ad.substring(ad.indexOf("_")+1),Y)}function aj(){if(!ab){return}var an=ab.location.href,ap="",ao=an.indexOf("#");if(ao!=-1){ap=an.substring(ao)}if(ap&&ap!=ad){ae(ap)}}function ai(){aa=setInterval(aj,X)}return(ac={outgoing:function(an,ao){ak(an)},destroy:function(){N.clearInterval(aa);if(af||!ag){al.parentNode.removeChild(al)}al=null},onDOMReady:function(){af=Z.isHost;X=Z.interval;ad="#"+Z.channel;am=0;ag=Z.useParent;Y=j(Z.remote);if(af){T(Z.props,{src:Z.remote,name:U+Z.channel+"_provider"});if(ag){Z.onLoad=function(){ab=N;ai();ac.up.callback(true)}}else{var ap=0,an=Z.delay/50;(function ao(){if(++ap>an){throw new Error("Unable to reference listenerwindow")}try{ab=al.contentWindow.frames[U+Z.channel+"_consumer"]}catch(aq){}if(ab){ai();ac.up.callback(true)}else{K(ao,50)}}())}al=A(Z)}else{ab=N;ai();if(ag){al=parent;ac.up.callback(true)}else{T(Z,{props:{src:Z.remote+"#"+Z.channel+new Date(),name:U+Z.channel+"_consumer"},onLoad:function(){ac.up.callback(true)}});al=A(Z)}}},init:function(){G(ac.onDOMReady,ac)}})};o.stack.ReliableBehavior=function(Y){var aa,ac;var ab=0,X=0,Z="";return(aa={incoming:function(af,ad){var ae=af.indexOf("_"),ag=af.substring(0,ae).split(",");af=af.substring(ae+1);if(ag[0]==ab){Z="";if(ac){ac(true)}}if(af.length>0){aa.down.outgoing(ag[1]+","+ab+"_"+Z,ad);if(X!=ag[1]){X=ag[1];aa.up.incoming(af,ad)}}},outgoing:function(af,ad,ae){Z=af;ac=ae;aa.down.outgoing(X+","+(++ab)+"_"+af,ad)}})};o.stack.QueueBehavior=function(Z){var ac,ad=[],ag=true,aa="",af,X=0,Y=false,ab=false;function ae(){if(Z.remove&&ad.length===0){w(ac);return}if(ag||ad.length===0||af){return}ag=true;var ah=ad.shift();ac.down.outgoing(ah.data,ah.origin,function(ai){ag=false;if(ah.callback){K(function(){ah.callback(ai)},0)}ae()})}return(ac={init:function(){if(t(Z)){Z={}}if(Z.maxLength){X=Z.maxLength;ab=true}if(Z.lazy){Y=true}else{ac.down.init()}},callback:function(ai){ag=false;var ah=ac.up;ae();ah.callback(ai)},incoming:function(ak,ai){if(ab){var aj=ak.indexOf("_"),ah=parseInt(ak.substring(0,aj),10);aa+=ak.substring(aj+1);if(ah===0){if(Z.encode){aa=k(aa)}ac.up.incoming(aa,ai);aa=""}}else{ac.up.incoming(ak,ai)}},outgoing:function(al,ai,ak){if(Z.encode){al=H(al)}var ah=[],aj;if(ab){while(al.length!==0){aj=al.substring(0,X);al=al.substring(aj.length);ah.push(aj)}while((aj=ah.shift())){ad.push({data:ah.length+"_"+aj,origin:ai,callback:ah.length===0?ak:null})}}else{ad.push({data:al,origin:ai,callback:ak})}if(Y){ac.down.init()}else{ae()}},destroy:function(){af=true;ac.down.destroy()}})};o.stack.VerifyBehavior=function(ab){var ac,aa,Y,Z=false;function X(){aa=Math.random().toString(16).substring(2);ac.down.outgoing(aa)}return(ac={incoming:function(af,ad){var ae=af.indexOf("_");if(ae===-1){if(af===aa){ac.up.callback(true)}else{if(!Y){Y=af;if(!ab.initiate){X()}ac.down.outgoing(af)}}}else{if(af.substring(0,ae)===Y){ac.up.incoming(af.substring(ae+1),ad)}}},outgoing:function(af,ad,ae){ac.down.outgoing(aa+"_"+af,ad,ae)},callback:function(ad){if(ab.initiate){X()}}})};o.stack.RpcBehavior=function(ad,Y){var aa,af=Y.serializer||O();var ae=0,ac={};function X(ag){ag.jsonrpc="2.0";aa.down.outgoing(af.stringify(ag))}function ab(ag,ai){var ah=Array.prototype.slice;return function(){var aj=arguments.length,al,ak={method:ai};if(aj>0&&typeof arguments[aj-1]==="function"){if(aj>1&&typeof arguments[aj-2]==="function"){al={success:arguments[aj-2],error:arguments[aj-1]};ak.params=ah.call(arguments,0,aj-2)}else{al={success:arguments[aj-1]};ak.params=ah.call(arguments,0,aj-1)}ac[""+(++ae)]=al;ak.id=ae}else{ak.params=ah.call(arguments,0)}if(ag.namedParams&&ak.params.length===1){ak.params=ak.params[0]}X(ak)}}function Z(an,am,ai,al){if(!ai){if(am){X({id:am,error:{code:-32601,message:"Procedure not found."}})}return}var ak,ah;if(am){ak=function(ao){ak=q;X({id:am,result:ao})};ah=function(ao,ap){ah=q;var aq={id:am,error:{code:-32099,message:ao}};if(ap){aq.error.data=ap}X(aq)}}else{ak=ah=q}if(!r(al)){al=[al]}try{var ag=ai.method.apply(ai.scope,al.concat([ak,ah]));if(!t(ag)){ak(ag)}}catch(aj){ah(aj.message)}}return(aa={incoming:function(ah,ag){var ai=af.parse(ah);if(ai.method){if(Y.handle){Y.handle(ai,X)}else{Z(ai.method,ai.id,Y.local[ai.method],ai.params)}}else{var aj=ac[ai.id];if(ai.error){if(aj.error){aj.error(ai.error)}}else{if(aj.success){aj.success(ai.result)}}delete ac[ai.id]}},init:function(){if(Y.remote){for(var ag in Y.remote){if(Y.remote.hasOwnProperty(ag)){ad[ag]=ab(Y.remote[ag],ag)}}}aa.down.init()},destroy:function(){for(var ag in Y.remote){if(Y.remote.hasOwnProperty(ag)&&ad.hasOwnProperty(ag)){delete ad[ag]}}aa.down.destroy()}})};b.easyXDM=o})(window,document,location,window.setTimeout,decodeURIComponent,encodeURIComponent);
!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){function d(a,b,c){return!0}function e(a,b,c,e){return a.global?d(b||y,c,e):void 0}function f(a){a.global&&0===conektaAjax.active++&&e(a,null,"ajaxStart")}function g(a){a.global&&!--conektaAjax.active&&e(a,null,"ajaxStop")}function h(a,b){var c=b.context;return b.beforeSend.call(c,a,b)===!1||e(b,c,"ajaxBeforeSend",[a,b])===!1?!1:void e(b,c,"ajaxSend",[a,b])}function i(a,b,c){var d=c.context,f="success";c.success.call(d,a,f,b),e(c,d,"ajaxSuccess",[b,c,a]),k(f,b,c)}function j(a,b,c,d){var f=d.context;d.error.call(f,c,b,a),e(d,f,"ajaxError",[c,d,a]),k(b,c,d)}function k(a,b,c){var d=c.context;c.complete.call(d,b,a),e(c,d,"ajaxComplete",[b,c]),g(c)}function l(){}function m(a){return a&&(a==C?"html":a==B?"json":z.test(a)?"script":A.test(a)&&"xml")||"text"}function n(a,b){return(a+"&"+b).replace(/[&?]{1,2}/,"?")}function o(a){"object"===s(a.data)&&(a.data=q(a.data)),!a.data||a.type&&"GET"!=a.type.toUpperCase()||(a.url=n(a.url,a.data))}function p(a,b,c,d){var e="array"===s(b);for(var f in b){var g=b[f];d&&(f=c?d:d+"["+(e?"":f)+"]"),!d&&e?a.add(g.name,g.value):(c?"array"===s(g):"object"===s(g))?p(a,g,c,f):a.add(f,g)}}function q(a,b){var c=[];return c.add=function(a,b){this.push(E(a)+"="+E(b))},p(c,a,b),c.join("&").replace("%20","+")}function r(a){for(var b=Array.prototype.slice,c=b.call(arguments,1),d=c.length,e=0;d>e;e++){source=c[e];for(v in source)void 0!==source[v]&&(a[v]=source[v])}return a}var s;try{s=a("type-of")}catch(t){var u=a;s=u("type")}var v,w,x=0,y=window.document,z=/^(?:text|application)\/javascript/i,A=/^(?:text|application)\/xml/i,B="application/json",C="text/html",D=/^\s*$/;window.conektaAjax=b.exports=function(a){var b=r({},a||{});for(v in conektaAjax.settings)void 0===b[v]&&(b[v]=conektaAjax.settings[v]);f(b),b.crossDomain||(b.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(b.url)&&RegExp.$2!=window.location.host);var c=b.dataType,d=/=\?/.test(b.url);if("jsonp"==c||d)return d||(b.url=n(b.url,"callback=?")),conektaAjax.JSONP(b);b.url||(b.url=window.location.toString()),o(b);var e,g=b.accepts[c],k={},p=/^([\w-]+:)\/\//.test(b.url)?RegExp.$1:window.location.protocol,q=conektaAjax.settings.xhr();b.crossDomain||(k["X-Requested-With"]="XMLHttpRequest"),g&&(k.Accept=g,g.indexOf(",")>-1&&(g=g.split(",",2)[0]),q.overrideMimeType&&q.overrideMimeType(g)),(b.contentType||b.data&&"GET"!=b.type.toUpperCase())&&(k["Content-Type"]=b.contentType||"application/x-www-form-urlencoded"),b.headers=r(k,b.headers||{}),q.onreadystatechange=function(){if(4==q.readyState){clearTimeout(e);var a,d=!1;if(q.status>=200&&q.status<300||304==q.status||0==q.status&&"file:"==p){c=c||m(q.getResponseHeader("content-type")),a=q.responseText;try{"script"==c?(1,eval)(a):"xml"==c?a=q.responseXML:"json"==c&&(a=D.test(a)?null:JSON.parse(a))}catch(f){d=f}d?j(d,"parsererror",q,b):i(a,q,b)}else j(null,"error",q,b)}};var s="async"in b?b.async:!0;q.open(b.type,b.url,s);for(w in b.headers)q.setRequestHeader(w,b.headers[w]);return h(q,b)===!1?(q.abort(),!1):(b.timeout>0&&(e=setTimeout(function(){q.onreadystatechange=l,q.abort(),j(null,"timeout",q,b)},b.timeout)),q.send(b.data?b.data:null),q)},conektaAjax.active=0,conektaAjax.JSONP=function(a){if(!("type"in a))return conektaAjax(a);var b="jsonp"+ ++x;a.jsonpCallback&&(b=a.jsonpCallback);var c,d=y.createElement("script"),e=function(){b in window&&(window[b]=l),k("abort",f,a)},f={abort:e},g=y.getElementsByTagName("head")[0]||y.documentElement;return a.error&&(d.onerror=function(){f.abort(),a.error()}),window[b]=function(d){clearTimeout(c);try{delete window[b]}catch(e){window[b]=void 0}i(d,f,a)},o(a),d.src=a.url.replace(/=\?/,"="+b),g.insertBefore(d,g.firstChild),a.timeout>0&&(c=setTimeout(function(){f.abort(),k("timeout",f,a)},a.timeout)),f},conektaAjax.settings={type:"GET",beforeSend:l,success:l,error:l,complete:l,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript",json:B,xml:"application/xml, text/xml",html:C,text:"text/plain"},crossDomain:!1,timeout:0},conektaAjax.get=function(a,b){return conektaAjax({url:a,success:b})},conektaAjax.post=function(a,b,c,d){return"function"===s(b)&&(d=d||c,c=b,b=null),conektaAjax({type:"POST",url:a,data:b,success:c,dataType:d})},conektaAjax.getJSON=function(a,b){return conektaAjax({url:a,success:b,dataType:"json"})};var E=encodeURIComponent},{"type-of":2}],2:[function(a,b,c){var d=Object.prototype.toString;b.exports=function(a){switch(d.call(a)){case"[object Function]":return"function";case"[object Date]":return"date";case"[object RegExp]":return"regexp";case"[object Arguments]":return"arguments";case"[object Array]":return"array";case"[object String]":return"string"}return null===a?"null":void 0===a?"undefined":a&&1===a.nodeType?"element":a===Object(a)?"object":typeof a}},{}]},{},[1]);
/* 
 * conekta.js v1.0.0
 * Conekta 2013
 * https://github.com/conekta/conekta.js/blob/master/LICENSE.txt
 */

(function() {
  var $tag, Base64, _language, antifraud_config, base_url, fingerprint, getAntifraudConfig, getCartCallback, i, j, k, kount_merchant_id, localstorageGet, localstorageSet, originalGetCart, originalOnCartUpdated, originalOnItemAdded, public_key, random_index, random_value_array, ref, s_url, send_beacon, session_id, useable_characters;

  base_url = 'https://api.conekta.io/';

  s_url = 'https://s.conekta.io';

  session_id = "";

  _language = 'es';

  kount_merchant_id = '205000';

  antifraud_config = {};

  if (!window.conektaAjax) {
    if (typeof jQuery !== 'undefined') {
      window.conektaAjax = jQuery.ajax;
    } else {
      console.error("no either a jQuery or ajax function provided");
    }
  }

  localstorageGet = function(key) {
    var error;
    if (typeof localStorage !== 'undefined' && typeof localStorage.getItem !== 'undefined') {
      try {
        localStorage.setItem('testKey', '1');
        localStorage.removeItem('testKey');
        return localStorage.getItem(key);
      } catch (_error) {
        error = _error;
        return null;
      }
    } else {
      return null;
    }
  };

  localstorageSet = function(key, value) {
    var error;
    if (typeof localStorage !== 'undefined' && typeof localStorage.setItem !== 'undefined') {
      try {
        localStorage.setItem('testKey', '1');
        localStorage.removeItem('testKey');
        return localStorage.setItem(key, value);
      } catch (_error) {
        error = _error;
        return null;
      }
    } else {
      return null;
    }
  };

  public_key = localstorageGet('_conekta_publishable_key');

  fingerprint = function() {
    var body, e, iframe, image;
    if (typeof document !== 'undefined' && typeof document.body !== 'undefined' && document.body && (document.readyState === 'interactive' || document.readyState === 'complete') && 'undefined' !== typeof Conekta) {
      if (Conekta._helpers.finger_printed() !== '1') {
        body = document.getElementsByTagName('body')[0];
        iframe = document.createElement('iframe');
        iframe.setAttribute("height", "1");
        iframe.setAttribute("scrolling", "no");
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("width", "1");
        iframe.setAttribute("src", base_url + "fraud_providers/kount/logo.htm?m=" + kount_merchant_id + "&s=" + session_id);
        image = document.createElement('img');
        image.setAttribute("height", "1");
        image.setAttribute("width", "1");
        image.setAttribute("src", base_url + "fraud_providers/kount/logo.gif?m=" + kount_merchant_id + "&s=" + session_id);
        Conekta.Fingerprint(function(params) {
          var img;
          img = document.createElement('img');
          img.setAttribute("width", "1");
          img.setAttribute("height", "1");
          img.setAttribute("border", "0");
          img.setAttribute("scrolling", "no");
          img.setAttribute("src", (s_url + "/images/" + session_id + ".gif?") + params.join('&'));
          return body.appendChild(img);
        });
        try {
          iframe.appendChild(image);
        } catch (_error) {
          e = _error;
        }
        body.appendChild(iframe);
        localstorageSet('_conekta_finger_printed', '1');
      }
    } else {
      setTimeout(fingerprint, 150);
    }
  };

  send_beacon = function() {
    var _user_id, ls;
    if (typeof document !== 'undefined' && typeof document.body !== 'undefined' && document.body && (document.readyState === 'interactive' || document.readyState === 'complete') && 'undefined' !== typeof Conekta) {
      if (!Conekta._helpers.beacon_sent) {
        if (antifraud_config['riskified']) {
          ls = function() {
            var s, store_domain, url, x;
            store_domain = antifraud_config['riskified']['domain'];
            session_id = session_id;
            url = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'beacon.riskified.com?shop=' + store_domain + '&sid=' + session_id;
            s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = url;
            x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
          };
          ls();
        }
        if (antifraud_config['siftscience']) {
          _user_id = session_id;
          window._sift = window._sift || [];
          _sift.push(["_setAccount", antifraud_config['siftscience']['beacon_key']]);
          _sift.push(["_setSessionId", session_id]);
          _sift.push(["_trackPageview"]);
          ls = function() {
            var e, s;
            e = document.createElement("script");
            e.type = "text/javascript";
            e.async = true;
            e.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'cdn.siftscience.com/s.js';
            s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(e, s);
          };
          ls();
        }
      }
    } else {
      setTimeout(send_beacon, 150);
    }
  };

  if (localstorageGet('_conekta_session_id') && localstorageGet('_conekta_session_id_timestamp') && ((new Date).getTime() - 600000) < parseInt(localstorageGet('_conekta_session_id_timestamp'))) {
    session_id = localStorage.getItem('_conekta_session_id');
    fingerprint();
  } else if (typeof Shopify !== 'undefined') {
    if (typeof Shopify.getCart === 'undefined' && typeof jQuery !== 'undefined') {
      Shopify.getCart = function(callback) {
        return jQuery.getJSON("/cart.js", function(cart) {
          if ("function" === typeof callback) {
            return callback(cart);
          }
        });
      };
    }
    getCartCallback = function(cart) {
      session_id = cart['token'];
      if (session_id !== null && session_id !== '') {
        fingerprint();
        send_beacon();
        localstorageSet('_conekta_session_id', session_id);
        localstorageSet('_conekta_session_id_timestamp', (new Date).getTime().toString());
      }
    };
    if (typeof Shopify.getCart !== 'undefined') {
      Shopify.getCart(function(cart) {
        getCartCallback(cart);
      });
    }
    originalGetCart = Shopify.getCart;
    Shopify.getCart = function(callback) {
      var tapped_callback;
      tapped_callback = function(cart) {
        getCartCallback(cart);
        callback(cart);
      };
      originalGetCart(tapped_callback);
    };
    originalOnItemAdded = Shopify.onItemAdded;
    Shopify.onItemAdded = function(callback) {
      var tapped_callback;
      tapped_callback = function(item) {
        Shopify.getCart(function(cart) {
          getCartCallback(cart);
        });
        callback(item);
      };
      originalOnItemAdded(tapped_callback);
    };
    originalOnCartUpdated = Shopify.onCartUpdated;
    Shopify.onCartUpdated = function(callback) {
      var tapped_callback;
      tapped_callback = function(cart) {
        getCartCallback(cart);
        callback(cart);
      };
      originalOnCartUpdated(tapped_callback);
    };
    if (typeof jQuery !== 'undefined') {
      jQuery(document).ajaxSuccess(function(event, request, options, data) {
        if (options['url'] === 'cart/add.js') {
          Shopify.getCart(function(cart) {
            getCartCallback(cart);
          });
        }
      });
    }
  } else {
    useable_characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues !== 'undefined') {
      random_value_array = new Uint32Array(32);
      crypto.getRandomValues(random_value_array);
      for (i = j = 0, ref = random_value_array.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        session_id += useable_characters.charAt(random_value_array[i] % 36);
      }
    } else {
      for (i = k = 0; k <= 30; i = ++k) {
        random_index = Math.floor(Math.random() * 36);
        session_id += useable_characters.charAt(random_index);
      }
    }
    localstorageSet('_conekta_session_id', session_id);
    localstorageSet('_conekta_session_id_timestamp', (new Date).getTime().toString());
    fingerprint();
  }

  getAntifraudConfig = function() {
    var error_callback, success_callback, unparsed_antifraud_config, url;
    unparsed_antifraud_config = localstorageGet('conekta_antifraud_config');
    if (unparsed_antifraud_config && unparsed_antifraud_config.match(/^\{/)) {
      return antifraud_config = JSON.parse(unparsed_antifraud_config);
    } else {
      success_callback = function(config) {
        antifraud_config = config;
        localstorageSet('conekta_antifraud_config', antifraud_config);
        return send_beacon();
      };
      error_callback = function() {};
      url = "https://d3fxnri0mz3rya.cloudfront.net/antifraud/" + public_key + ".js";
      return conektaAjax({
        url: url,
        dataType: 'jsonp',
        jsonpCallback: 'conekta_antifraud_config_jsonp',
        success: success_callback,
        error: error_callback
      });
    }
  };

  getAntifraudConfig();

  Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(input) {
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4, output;
      output = "";
      chr1 = void 0;
      chr2 = void 0;
      chr3 = void 0;
      enc1 = void 0;
      enc2 = void 0;
      enc3 = void 0;
      enc4 = void 0;
      i = 0;
      input = Base64._utf8_encode(input);
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else {
          if (isNaN(chr3)) {
            enc4 = 64;
          }
        }
        output = output + Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) + Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
      }
      return output;
    },
    decode: function(input) {
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4, output;
      output = "";
      chr1 = void 0;
      chr2 = void 0;
      chr3 = void 0;
      enc1 = void 0;
      enc2 = void 0;
      enc3 = void 0;
      enc4 = void 0;
      i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      while (i < input.length) {
        enc1 = Base64._keyStr.indexOf(input.charAt(i++));
        enc2 = Base64._keyStr.indexOf(input.charAt(i++));
        enc3 = Base64._keyStr.indexOf(input.charAt(i++));
        enc4 = Base64._keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 !== 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 !== 64) {
          output = output + String.fromCharCode(chr3);
        }
      }
      output = Base64._utf8_decode(output);
      return output;
    },
    _utf8_encode: function(string) {
      var c, n, utftext;
      string = string.replace(/\r\n/g, "\n");
      utftext = "";
      n = 0;
      while (n < string.length) {
        c = string.charCodeAt(n);
        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
        n++;
      }
      return utftext;
    },
    _utf8_decode: function(utftext) {
      var c, c1, c2, c3, string;
      string = "";
      i = 0;
      c = c1 = c2 = 0;
      while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        } else if ((c > 191) && (c < 224)) {
          c2 = utftext.charCodeAt(i + 1);
          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
        } else {
          c2 = utftext.charCodeAt(i + 1);
          c3 = utftext.charCodeAt(i + 2);
          string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
          i += 3;
        }
      }
      return string;
    }
  };

  if (!window.Conekta) {
    window.Conekta = {
      b64: Base64,
      setLanguage: function(language) {
        return _language = language;
      },
      getLanguage: function() {
        return _language;
      },
      setPublicKey: function(key) {
        if (typeof key === 'string' && key.match(/^[a-zA-Z0-9_]*$/) && key.length >= 20 && key.length < 30) {
          public_key = key;
          localstorageSet('_conekta_publishable_key', public_key);
        } else {
          Conekta._helpers.log('Unusable public key: ' + key);
        }
      },
      setPublishableKey: function(key) {
        return setPublicKey(key);
      },
      getPublicKey: function(key) {
        return public_key;
      },
      getPublishableKey: function() {
        return getPublicKey();
      },
      _helpers: {
        finger_printed: function() {
          return localstorageGet('_conekta_finger_printed');
        },
        beacon_sent: false,
        objectKeys: function(obj) {
          var keys, p;
          keys = [];
          for (p in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, p)) {
              keys.push(p);
            }
          }
          return keys;
        },
        parseForm: function(form_object) {
          var all_inputs, attribute, attribute_name, attributes, input, inputs, json_object, l, last_attribute, len, len1, m, node, o, parent_node, q, r, ref1, ref2, ref3, selects, textareas, val;
          json_object = {};
          if (typeof form_object === 'object') {
            if (typeof jQuery !== 'undefined' && (form_object instanceof jQuery || 'jquery' in Object(form_object))) {
              form_object = form_object.get()[0];
              if (typeof form_object !== 'object') {
                return {};
              }
            }
            if (form_object.nodeType) {
              textareas = form_object.getElementsByTagName('textarea');
              inputs = form_object.getElementsByTagName('input');
              selects = form_object.getElementsByTagName('select');
              all_inputs = new Array(textareas.length + inputs.length + selects.length);
              for (i = l = 0, ref1 = textareas.length - 1; l <= ref1; i = l += 1) {
                all_inputs[i] = textareas[i];
              }
              for (i = m = 0, ref2 = inputs.length - 1; m <= ref2; i = m += 1) {
                all_inputs[i + textareas.length] = inputs[i];
              }
              for (i = o = 0, ref3 = selects.length - 1; o <= ref3; i = o += 1) {
                all_inputs[i + textareas.length + inputs.length] = selects[i];
              }
              for (q = 0, len = all_inputs.length; q < len; q++) {
                input = all_inputs[q];
                if (input) {
                  attribute_name = input.getAttribute('data-conekta');
                  if (attribute_name) {
                    if (input.tagName === 'SELECT') {
                      val = input.value;
                    } else {
                      val = input.getAttribute('value') || input.innerHTML || input.value;
                    }
                    attributes = attribute_name.replace(/\]/g, '').replace(/\-/g, '_').split(/\[/);
                    parent_node = null;
                    node = json_object;
                    last_attribute = null;
                    for (r = 0, len1 = attributes.length; r < len1; r++) {
                      attribute = attributes[r];
                      if (!node[attribute]) {
                        node[attribute] = {};
                      }
                      parent_node = node;
                      last_attribute = attribute;
                      node = node[attribute];
                    }
                    parent_node[last_attribute] = val;
                  }
                }
              }
            } else {
              json_object = form_object;
            }
          }
          return json_object;
        },
        getSessionId: function() {
          return session_id;
        },
        xDomainPost: function(params) {
          var error_callback, rpc, success_callback;
          success_callback = function(data, textStatus, jqXHR) {
            if (!data || (data.object === 'error') || !data.id) {
              return params.error(data || {
                object: 'error',
                type: 'api_error',
                message: "Something went wrong on Conekta's end",
                message_to_purchaser: "Your code could not be processed, please try again later"
              });
            } else {
              return params.success(data);
            }
          };
          error_callback = function() {
            return params.error({
              object: 'error',
              type: 'api_error',
              message: 'Something went wrong, possibly a connectivity issue',
              message_to_purchaser: "Your code could not be processed, please try again later"
            });
          };
          if (document.location.protocol === 'file:' && navigator.userAgent.indexOf("MSIE") !== -1) {
            params.url = (params.jsonp_url || params.url) + '/create.js';
            params.data['_Version'] = "0.3.0";
            params.data['_RaiseHtmlError'] = false;
            params.data['auth_token'] = Conekta.getPublicKey();
            params.data['conekta_client_user_agent'] = '{"agent":"Conekta JavascriptBindings/0.3.0"}';
            return conektaAjax({
              url: base_url + params.url,
              dataType: 'jsonp',
              data: params.data,
              success: success_callback,
              error: error_callback
            });
          } else {
            if (typeof (new XMLHttpRequest()).withCredentials !== 'undefined') {
              return conektaAjax({
                url: base_url + params.url,
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(params.data),
                contentType: 'application/json',
                headers: {
                  'RaiseHtmlError': false,
                  'Accept': 'application/vnd.conekta-v0.3.0+json',
                  'Accept-Language': Conekta.getLanguage(),
                  'Conekta-Client-User-Agent': '{"agent":"Conekta JavascriptBindings/0.3.0"}',
                  'Authorization': 'Basic ' + Base64.encode(Conekta.getPublicKey() + ':')
                },
                success: success_callback,
                error: error_callback
              });
            } else {
              rpc = new easyXDM.Rpc({
                swf: "https://conektaapi.s3.amazonaws.com/v0.3.2/flash/easyxdm.swf",
                remote: base_url + "easyxdm_cors_proxy.html"
              }, {
                remote: {
                  request: {}
                }
              });
              return rpc.request({
                url: base_url + params.url,
                method: 'POST',
                headers: {
                  'RaiseHtmlError': false,
                  'Accept': 'application/vnd.conekta-v0.3.0+json',
                  'Accept-Language': Conekta.getLanguage(),
                  'Conekta-Client-User-Agent': '{"agent":"Conekta JavascriptBindings/0.3.0"}',
                  'Authorization': 'Basic ' + Base64.encode(Conekta.getPublicKey() + ':')
                },
                data: JSON.stringify(params.data)
              }, success_callback, error_callback);
            }
          }
        },
        log: function(data) {
          if (typeof console !== 'undefined' && console.log) {
            return console.log(data);
          }
        },
        querySelectorAll: function(selectors) {
          var element, elements, style;
          if (!document.querySelectorAll) {
            style = document.createElement('style');
            elements = [];
            document.documentElement.firstChild.appendChild(style);
            document._qsa = [];
            if (style.styleSheet) {
              style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
            } else {
              style.style.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
            }
            window.scrollBy(0, 0);
            style.parentNode.removeChild(style);
            while (document._qsa.length) {
              element = document._qsa.shift();
              element.style.removeAttribute('x-qsa');
              elements.push(element);
            }
            document._qsa = null;
            return elements;
          } else {
            return document.querySelectorAll(selectors);
          }
        },
        querySelector: function(selectors) {
          var elements;
          if (!document.querySelector) {
            elements = this.querySelectorAll(selectors);
            if (elements.length > 0) {
              return elements[0];
            } else {
              return null;
            }
          } else {
            return document.querySelector(selectors);
          }
        }
      }
    };
    if (Conekta._helpers.querySelectorAll('script[data-conekta-session-id]').length > 0) {
      $tag = Conekta._helpers.querySelectorAll('script[data-conekta-session-id]')[0];
      session_id = $tag.getAttribute('data-conekta-session-id');
    }
    if (Conekta._helpers.querySelectorAll('script[data-conekta-public-key]').length > 0) {
      $tag = Conekta._helpers.querySelectorAll('script[data-conekta-public-key]')[0];
      window.Conekta.setPublicKey($tag.getAttribute('data-conekta-public-key'));
    }
  }

}).call(this);

(function() {
  var accepted_cards, card_types, get_card_type, is_valid_length, is_valid_luhn, parseMonth, parseYear,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  card_types = [
    {
      name: 'amex',
      pattern: /^3[47]/,
      valid_length: [15]
    }, {
      name: 'diners_club_carte_blanche',
      pattern: /^30[0-5]/,
      valid_length: [14]
    }, {
      name: 'diners_club_international',
      pattern: /^36/,
      valid_length: [14]
    }, {
      name: 'jcb',
      pattern: /^35(2[89]|[3-8][0-9])/,
      valid_length: [16]
    }, {
      name: 'laser',
      pattern: /^(6304|670[69]|6771)/,
      valid_length: [16, 17, 18, 19]
    }, {
      name: 'visa_electron',
      pattern: /^(4026|417500|4508|4844|491(3|7))/,
      valid_length: [16]
    }, {
      name: 'visa',
      pattern: /^4/,
      valid_length: [16]
    }, {
      name: 'mastercard',
      pattern: /^5[1-5]/,
      valid_length: [16]
    }, {
      name: 'maestro',
      pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
      valid_length: [12, 13, 14, 15, 16, 17, 18, 19]
    }, {
      name: 'discover',
      pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
      valid_length: [16]
    }
  ];

  is_valid_luhn = function(number) {
    var digit, i, len, n, ref, sum;
    sum = 0;
    ref = number.split('').reverse();
    for (n = i = 0, len = ref.length; i < len; n = ++i) {
      digit = ref[n];
      digit = +digit;
      if (n % 2) {
        digit *= 2;
        if (digit < 10) {
          sum += digit;
        } else {
          sum += digit - 9;
        }
      } else {
        sum += digit;
      }
    }
    return sum % 10 === 0;
  };

  is_valid_length = function(number, card_type) {
    var ref;
    return ref = number.length, indexOf.call(card_type.valid_length, ref) >= 0;
  };

  accepted_cards = ['visa', 'mastercard', 'maestro', 'visa_electron', 'amex', 'laser', 'diners_club_carte_blanche', 'diners_club_international', 'discover', 'jcb'];

  get_card_type = function(number) {
    var card, card_type, i, len, ref;
    ref = (function() {
      var j, len, ref, results;
      results = [];
      for (j = 0, len = card_types.length; j < len; j++) {
        card = card_types[j];
        if (ref = card.name, indexOf.call(accepted_cards, ref) >= 0) {
          results.push(card);
        }
      }
      return results;
    })();
    for (i = 0, len = ref.length; i < len; i++) {
      card_type = ref[i];
      if (number.match(card_type.pattern)) {
        return card_type;
      }
    }
    return null;
  };

  parseMonth = function(month) {
    if (typeof month === 'string' && month.match(/^[\d]{1,2}$/)) {
      return parseInt(month);
    } else {
      return month;
    }
  };

  parseYear = function(year) {
    if (typeof year === 'number' && year < 100) {
      year += 2000;
    }
    if (typeof year === 'string' && year.match(/^([\d]{2,2}|20[\d]{2,2})$/)) {
      if (year.match(/^([\d]{2,2})$/)) {
        year = '20' + year;
      }
      return parseInt(year);
    } else {
      return year;
    }
  };

  Conekta.card = {};

  Conekta.card.getBrand = function(number) {
    var brand;
    if (typeof number === 'string') {
      number = number.replace(/[ -]/g, '');
    } else if (typeof number === 'number') {
      number = toString(number);
    }
    brand = get_card_type(number);
    if (brand && brand.name) {
      return brand.name;
    }
    return null;
  };

  Conekta.card.validateCVC = function(cvc) {
    return (typeof cvc === 'number' && cvc >= 0 && cvc < 10000) || (typeof cvc === 'string' && cvc.match(/^[\d]{3,4}$/) !== null);
  };

  Conekta.card.validateExpMonth = function(exp_month) {
    var month;
    month = parseMonth(exp_month);
    return typeof month === 'number' && month > 0 && month < 13;
  };

  Conekta.card.validateExpYear = function(exp_year) {
    var year;
    year = parseYear(exp_year);
    return typeof year === 'number' && year > 2013 && year < 2035;
  };

  Conekta.card.validateExpirationDate = function(exp_month, exp_year) {
    var month, year;
    month = parseMonth(exp_month);
    year = parseYear(exp_year);
    if ((typeof month === 'number' && month > 0 && month < 13) && (typeof year === 'number' && year > 2013 && year < 2035)) {
      return (new Date(year, month, new Date(year, month, 0).getDate())) > (new Date());
    } else {
      return false;
    }
  };

  Conekta.card.validateExpiry = function(exp_month, exp_year) {
    return Conekta.card.validateExpirationDate(exp_month, exp_year);
  };

  Conekta.card.validateName = function(name) {
    return typeof name === 'string' && name.match(/^\s*[A-z]+\s+[A-z]+[\sA-z]*$/) !== null && name.match(/visa|master\s*card|amex|american\s*express|banorte|banamex|bancomer|hsbc|scotiabank|jcb|diners\s*club|discover/i) === null;
  };

  Conekta.card.validateNumber = function(number) {
    var card_type, length_valid, luhn_valid;
    if (typeof number === 'string') {
      number = number.replace(/[ -]/g, '');
    } else if (typeof number === 'number') {
      number = number.toString();
    } else {
      number = "";
    }
    card_type = get_card_type(number);
    luhn_valid = false;
    length_valid = false;
    if (card_type != null) {
      luhn_valid = is_valid_luhn(number);
      length_valid = is_valid_length(number, card_type);
    }
    return luhn_valid && length_valid;
  };

  Conekta.Card = Conekta.card;

}).call(this);

(function() {
  Conekta.Token = {};

  Conekta.Token.create = function(token_form, success_callback, failure_callback) {
    var token;
    if (typeof success_callback !== 'function') {
      success_callback = Conekta._helpers.log;
    }
    if (typeof failure_callback !== 'function') {
      failure_callback = Conekta._helpers.log;
    }
    token = Conekta._helpers.parseForm(token_form);
    if (typeof token === 'object') {
      if (Conekta._helpers.objectKeys(token).length > 0) {
        if (token.card) {
          token.card.device_fingerprint = Conekta._helpers.getSessionId();
        } else {
          failure_callback({
            'object': 'error',
            'type': 'invalid_request_error',
            'message': "The form or hash has no attributes 'card'.  If you are using a form, please ensure that you have have an input or text area with the data-conekta attribute 'card[number]'.  For an example form see: https://github.com/conekta/conekta.js/blob/master/examples/credit_card.html",
            'message_to_purchaser': "The card could not be processed, please try again later"
          });
        }
        if (token.card && token.card.address && !(token.card.address.street1 || token.card.address.street2 || token.card.address.street3 || token.card.address.city || token.card.address.state || token.card.address.country || token.card.address.zip)) {
          delete token.card.address;
        }
        return Conekta._helpers.xDomainPost({
          jsonp_url: 'tokens',
          url: 'tokens',
          data: token,
          success: success_callback,
          error: failure_callback
        });
      } else {
        return failure_callback({
          'object': 'error',
          'type': 'invalid_request_error',
          'message': "supplied parameter 'token' is usable object but has no values (e.g. amount, description) associated with it",
          'message_to_purchaser': "The card could not be processed, please try again later"
        });
      }
    } else {
      return failure_callback({
        'object': 'error',
        'type': 'invalid_request_error',
        'message': "Supplied parameter 'token' is not a javascript object or a form",
        'message_to_purchaser': "The card could not be processed, please try again later"
      });
    }
  };

  Conekta.token = {};

  Conekta.token.create = Conekta.Token.create;

}).call(this);

(function() {
  Date.prototype.stdTimezoneOffset = function() {
    var jan, jul;
    jan = new Date(this.getFullYear(), 0, 1);
    jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  };

  Conekta.Fingerprint = function(done) {
    var addBehaviorKey, colorDepthKey, cpuClassKey, each, fontsKey, getCharacterSet, getFonts, getHasLiedLanguages, getIEPlugins, getRegularPlugins, getScreenResolution, hasLiedLanguagesKey, hostnameKey, indexedDbKey, isIE, keys, languageKey, localStorageKey, map, mimeTypesKey, nativeForEach, nativeMap, openDatabaseKey, options, pixelRatioKey, platformKey, pluginsKey, pluginsShouldBeSorted, screenResolutionKey, sessionStorageKey, stdTimezoneOffset, timezoneOffsetKey, titleKey, urlKey, userAgentKey;
    options = {
      detectScreenOrientation: true,
      excludeJsFonts: false,
      excludeFlashFonts: false,
      excludePlugins: false,
      excludeIEPlugins: false,
      userDefinedFonts: [],
      sortPluginsFor: [/palemoon/i]
    };
    nativeForEach = Array.prototype.forEach;
    nativeMap = Array.prototype.map;
    each = function(obj, iterator, context) {
      var i, k, key, len, len1, m, x;
      if (obj === null) {
        return;
      }
      if (nativeForEach && obj.forEach === nativeForEach) {
        return obj.forEach(iterator, context);
      } else if (obj.length === +obj.length) {
        for (i = k = 0, len = obj.length; k < len; i = ++k) {
          x = obj[i];
          if (iterator.call(context, obj[i], i, obj === {})) {
            return;
          }
        }
      } else {
        for (m = 0, len1 = obj.length; m < len1; m++) {
          key = obj[m];
          if (obj.hasOwnProperty(key)) {
            if (iterator.call(context, obj[key], key, obj) === {}) {
              return;
            }
          }
        }
      }
    };
    map = function(obj, iterator, context) {
      var results;
      results = [];
      if (obj === null) {
        return results;
      }
      if (this.nativeMap && obj.map === this.nativeMap) {
        return obj.map(iterator, context);
      }
      each(obj, function(value, index, list) {
        return results[results.length] = iterator.call(context, value, index, list);
      });
      return results;
    };
    userAgentKey = function(keys) {
      keys.push({
        key: "ua",
        value: navigator.userAgent
      });
      return keys;
    };
    languageKey = function(keys) {
      keys.push({
        key: "l",
        value: navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || ""
      });
      return keys;
    };
    colorDepthKey = function(keys) {
      keys.push({
        key: "cd",
        value: screen.colorDepth
      });
      return keys;
    };
    pixelRatioKey = function(keys) {
      keys.push({
        key: "pr",
        value: window.devicePixelRatio || ""
      });
      return keys;
    };
    screenResolutionKey = function(keys) {
      getScreenResolution(keys);
      return keys;
    };
    getScreenResolution = function(keys) {
      var resolution;
      if (options.detectScreenOrientation) {
        resolution = [screen.width, screen.height];
        if (screen.height > screen.width) {
          resolution = [screen.height, screen.width];
        }
      } else {
        resolution = [screen.width, screen.height];
      }
      if (typeof resolution !== "undefined") {
        keys.push({
          key: "sw",
          value: resolution[0]
        });
        keys.push({
          key: "sh",
          value: resolution[1]
        });
      }
      return keys;
    };
    getCharacterSet = function() {
      var charset;
      charset = document.inputEncoding || document.characterSet || document.charset || document.defaultCharset;
      if (typeof charset !== "undefined") {
        keys.push({
          key: 'cs',
          value: charset
        });
      }
      return keys;
    };
    timezoneOffsetKey = function() {
      keys.push({
        key: "to",
        value: new Date().getTimezoneOffset()
      });
      return keys;
    };
    stdTimezoneOffset = function() {
      keys.push({
        key: "d",
        value: new Date().stdTimezoneOffset() - new Date().getTimezoneOffset()
      });
      return keys;
    };
    sessionStorageKey = function() {
      keys.push({
        key: "ss",
        value: window.hasOwnProperty('sessionStorage') ? 1 : 0
      });
      return keys;
    };
    localStorageKey = function() {
      keys.push({
        key: "ls",
        value: window.hasOwnProperty('localStorage') ? 1 : 0
      });
      return keys;
    };
    indexedDbKey = function() {
      keys.push({
        key: "idx",
        value: window.hasOwnProperty('indexedDB') ? 1 : 0
      });
      return keys;
    };
    addBehaviorKey = function() {
      if (document.body && document.body.addBehavior) {
        keys.push({
          key: "add_behavior",
          value: 1
        });
      }
      return keys;
    };
    openDatabaseKey = function() {
      keys.push({
        key: "odb",
        value: window.openDatabase ? 1 : 0
      });
      return keys;
    };
    cpuClassKey = function() {
      keys.push({
        key: "cc",
        value: navigator.cpuClass || ""
      });
      return keys;
    };
    platformKey = function() {
      keys.push({
        key: "np",
        value: navigator.platform || ""
      });
      return keys;
    };
    hasLiedLanguagesKey = function(keys) {
      keys.push({
        key: "hll",
        value: getHasLiedLanguages() ? 1 : 0
      });
      return keys;
    };
    getHasLiedLanguages = function() {
      var err, firstLanguages;
      if (typeof navigator.languages !== "undefined") {
        try {
          firstLanguages = navigator.languages[0].substr(0, 2);
          if (firstLanguages !== navigator.language.substr(0, 2)) {
            return true;
          }
        } catch (_error) {
          err = _error;
          return true;
        }
      }
      return false;
    };
    mimeTypesKey = function(keys) {
      var k, len, mime, mtypes, ref;
      mtypes = [];
      ref = navigator.mimeTypes;
      for (k = 0, len = ref.length; k < len; k++) {
        mime = ref[k];
        mtypes.push(mime.type);
      }
      keys.push({
        key: "mtn",
        value: mtypes.length
      });
      keys.push({
        key: "mth",
        value: md5(mtypes.join(';'))
      });
      return keys;
    };
    isIE = function() {
      if (navigator.appName === 'Microsoft Internet Explorer') {
        return true;
      } else if (navigator.appName === 'Netscape' && /Trident/.test(navigator.userAgent)) {
        return true;
      }
      return false;
    };
    pluginsKey = function(keys) {
      var _plugins;
      if (!options.excludePlugins) {
        if (isIE()) {
          if (!options.excludeIEPlugins) {
            _plugins = getIEPlugins();
            keys.push({
              key: 'ieph',
              value: md5(_plugins.join(';'))
            });
            keys.push({
              key: 'iepn',
              value: _plugins.length
            });
          }
        } else {
          _plugins = getRegularPlugins();
          keys.push({
            key: 'rph',
            value: md5(_plugins.join(';'))
          });
          keys.push({
            key: 'rpn',
            value: _plugins.length
          });
        }
      }
      return keys;
    };
    getRegularPlugins = function() {
      var i, l, plugins;
      plugins = [];
      i = 0;
      l = navigator.plugins.length;
      while (i < l) {
        plugins.push(navigator.plugins[i]);
        i++;
      }
      if (pluginsShouldBeSorted()) {
        plugins = plugins.sort(function(a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
      }
      return map(plugins, (function(p) {
        var mimeTypes;
        mimeTypes = map(p, function(mt) {
          return [mt.type, mt.suffixes].join('~');
        }).join(',');
        return [p.name, p.description, mimeTypes].join('::');
      }), this);
    };
    getIEPlugins = function() {
      var names, result;
      result = [];
      if (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, 'ActiveXObject') || 'ActiveXObject' in window) {
        names = ['AcroPDF.PDF', 'Adodb.Stream', 'AgControl.AgControl', 'DevalVRXCtrl.DevalVRXCtrl.1', 'MacromediaFlashPaper.MacromediaFlashPaper', 'Msxml2.DOMDocument', 'Msxml2.XMLHTTP', 'PDF.PdfCtrl', 'QuickTime.QuickTime', 'QuickTimeCheckObject.QuickTimeCheck.1', 'RealPlayer', 'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)', 'RealVideo.RealVideo(tm) ActiveX Control (32-bit)', 'Scripting.Dictionary', 'SWCtl.SWCtl', 'Shell.UIHelper', 'ShockwaveFlash.ShockwaveFlash', 'Skype.Detection', 'TDCCtl.TDCCtl', 'WMPlayer.OCX', 'rmocx.RealPlayer G2 Control', 'rmocx.RealPlayer G2 Control.1'];
        result = map(names, function(name) {
          var e;
          try {
            new ActiveXObject(name);
            return name;
          } catch (_error) {
            e = _error;
            return null;
          }
        });
      }
      if (navigator.plugins) {
        result = result.concat(getRegularPlugins());
      }
      return result;
    };
    pluginsShouldBeSorted = function() {
      var i, l, re, should;
      should = false;
      i = 0;
      l = options.sortPluginsFor.length;
      while (i < l) {
        re = options.sortPluginsFor[i];
        if (navigator.userAgent.match(re)) {
          should = true;
          break;
        }
        i++;
      }
      return should;
    };
    getFonts = function(keys, done) {
      var callback;
      callback = function() {
        var available, baseFont, baseFonts, baseFontsDiv, baseFontsSpans, createSpan, createSpanWithFonts, defaultHeight, defaultWidth, extendedFontList, fontItem, fontList, fontsDiv, fontsSpans, h, i, index, initializeBaseFontsSpans, initializeFontsSpans, isFontAvailable, k, len, len1, m, testSize, testString;
        baseFonts = ["monospace", "sans-serif", "serif"];
        fontList = ["Andale Mono", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "Bitstream Vera Sans Mono", "Book Antiqua", "Bookman Old Style", "Calibri", "Cambria", "Cambria Math", "Century", "Century Gothic", "Century Schoolbook", "Comic Sans", "Comic Sans MS", "Consolas", "Courier", "Courier New", "Garamond", "Geneva", "Georgia", "Helvetica", "Helvetica Neue", "Impact", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "MYRIAD", "MYRIAD PRO", "Palatino", "Palatino Linotype", "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Tahoma", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS", "Verdana", "Wingdings", "Wingdings 2", "Wingdings 3"];
        extendedFontList = ["Abadi MT Condensed Light", "Academy Engraved LET", "ADOBE CASLON PRO", "Adobe Garamond", "ADOBE GARAMOND PRO", "Agency FB", "Aharoni", "Albertus Extra Bold", "Albertus Medium", "Algerian", "Amazone BT", "American Typewriter", "American Typewriter Condensed", "AmerType Md BT", "Andalus", "Angsana New", "AngsanaUPC", "Antique Olive", "Aparajita", "Apple Chancery", "Apple Color Emoji", "Apple SD Gothic Neo", "Arabic Typesetting", "ARCHER", "ARNO PRO", "Arrus BT", "Aurora Cn BT", "AvantGarde Bk BT", "AvantGarde Md BT", "AVENIR", "Ayuthaya", "Bandy", "Bangla Sangam MN", "Bank Gothic", "BankGothic Md BT", "Baskerville", "Baskerville Old Face", "Batang", "BatangChe", "Bauer Bodoni", "Bauhaus 93", "Bazooka", "Bell MT", "Bembo", "Benguiat Bk BT", "Berlin Sans FB", "Berlin Sans FB Demi", "Bernard MT Condensed", "BernhardFashion BT", "BernhardMod BT", "Big Caslon", "BinnerD", "Blackadder ITC", "BlairMdITC TT", "Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72 Smallcaps", "Bodoni MT", "Bodoni MT Black", "Bodoni MT Condensed", "Bodoni MT Poster Compressed", "Bookshelf Symbol 7", "Boulder", "Bradley Hand", "Bradley Hand ITC", "Bremen Bd BT", "Britannic Bold", "Broadway", "Browallia New", "BrowalliaUPC", "Brush Script MT", "Californian FB", "Calisto MT", "Calligrapher", "Candara", "CaslonOpnface BT", "Castellar", "Centaur", "Cezanne", "CG Omega", "CG Times", "Chalkboard", "Chalkboard SE", "Chalkduster", "Charlesworth", "Charter Bd BT", "Charter BT", "Chaucer", "ChelthmITC Bk BT", "Chiller", "Clarendon", "Clarendon Condensed", "CloisterBlack BT", "Cochin", "Colonna MT", "Constantia", "Cooper Black", "Copperplate", "Copperplate Gothic", "Copperplate Gothic Bold", "Copperplate Gothic Light", "CopperplGoth Bd BT", "Corbel", "Cordia New", "CordiaUPC", "Cornerstone", "Coronet", "Cuckoo", "Curlz MT", "DaunPenh", "Dauphin", "David", "DB LCD Temp", "DELICIOUS", "Denmark", "DFKai-SB", "Didot", "DilleniaUPC", "DIN", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Edwardian Script ITC", "Elephant", "English 111 Vivace BT", "Engravers MT", "EngraversGothic BT", "Eras Bold ITC", "Eras Demi ITC", "Eras Light ITC", "Eras Medium ITC", "EucrosiaUPC", "Euphemia", "Euphemia UCAS", "EUROSTILE", "Exotc350 Bd BT", "FangSong", "Felix Titling", "Fixedsys", "FONTIN", "Footlight MT Light", "Forte", "FrankRuehl", "Fransiscan", "Freefrm721 Blk BT", "FreesiaUPC", "Freestyle Script", "French Script MT", "FrnkGothITC Bk BT", "Fruitger", "FRUTIGER", "Futura", "Futura Bk BT", "Futura Lt BT", "Futura Md BT", "Futura ZBlk BT", "FuturaBlack BT", "Gabriola", "Galliard BT", "Gautami", "Geeza Pro", "Geometr231 BT", "Geometr231 Hv BT", "Geometr231 Lt BT", "GeoSlab 703 Lt BT", "GeoSlab 703 XBd BT", "Gigi", "Gill Sans", "Gill Sans MT", "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed Bold", "Gill Sans Ultra Bold", "Gill Sans Ultra Bold Condensed", "Gisha", "Gloucester MT Extra Condensed", "GOTHAM", "GOTHAM BOLD", "Goudy Old Style", "Goudy Stout", "GoudyHandtooled BT", "GoudyOLSt BT", "Gujarati Sangam MN", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe", "Gurmukhi MN", "Haettenschweiler", "Harlow Solid Italic", "Harrington", "Heather", "Heiti SC", "Heiti TC", "HELV", "Herald", "High Tower Text", "Hiragino Kaku Gothic ProN", "Hiragino Mincho ProN", "Hoefler Text", "Humanst 521 Cn BT", "Humanst521 BT", "Humanst521 Lt BT", "Imprint MT Shadow", "Incised901 Bd BT", "Incised901 BT", "Incised901 Lt BT", "INCONSOLATA", "Informal Roman", "Informal011 BT", "INTERSTATE", "IrisUPC", "Iskoola Pota", "JasmineUPC", "Jazz LET", "Jenson", "Jester", "Jokerman", "Juice ITC", "Kabel Bk BT", "Kabel Ult BT", "Kailasa", "KaiTi", "Kalinga", "Kannada Sangam MN", "Kartika", "Kaufmann Bd BT", "Kaufmann BT", "Khmer UI", "KodchiangUPC", "Kokila", "Korinna BT", "Kristen ITC", "Krungthep", "Kunstler Script", "Lao UI", "Latha", "Leelawadee", "Letter Gothic", "Levenim MT", "LilyUPC", "Lithograph", "Lithograph Light", "Long Island", "Lydian BT", "Magneto", "Maiandra GD", "Malayalam Sangam MN", "Malgun Gothic", "Mangal", "Marigold", "Marion", "Marker Felt", "Market", "Marlett", "Matisse ITC", "Matura MT Script Capitals", "Meiryo", "Meiryo UI", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "MingLiU-ExtB", "Minion", "Minion Pro", "Miriam", "Miriam Fixed", "Mistral", "Modern", "Modern No. 20", "Mona Lisa Solid ITC TT", "Mongolian Baiti", "MONO", "MoolBoran", "Mrs Eaves", "MS LineDraw", "MS Mincho", "MS PMincho", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "MUSEO", "MV Boli", "Nadeem", "Narkisim", "NEVIS", "News Gothic", "News GothicMT", "NewsGoth BT", "Niagara Engraved", "Niagara Solid", "Noteworthy", "NSimSun", "Nyala", "OCR A Extended", "Old Century", "Old English Text MT", "Onyx", "Onyx BT", "OPTIMA", "Oriya Sangam MN", "OSAKA", "OzHandicraft BT", "Palace Script MT", "Papyrus", "Parchment", "Party LET", "Pegasus", "Perpetua", "Perpetua Titling MT", "PetitaBold", "Pickwick", "Plantagenet Cherokee", "Playbill", "PMingLiU", "PMingLiU-ExtB", "Poor Richard", "Poster", "PosterBodoni BT", "PRINCETOWN LET", "Pristina", "PTBarnum BT", "Pythagoras", "Raavi", "Rage Italic", "Ravie", "Ribbon131 Bd BT", "Rockwell", "Rockwell Condensed", "Rockwell Extra Bold", "Rod", "Roman", "Sakkal Majalla", "Santa Fe LET", "Savoye LET", "Sceptre", "Script", "Script MT Bold", "SCRIPTINA", "Serifa", "Serifa BT", "Serifa Th BT", "ShelleyVolante BT", "Sherwood", "Shonar Bangla", "Showcard Gothic", "Shruti", "Signboard", "SILKSCREEN", "SimHei", "Simplified Arabic", "Simplified Arabic Fixed", "SimSun", "SimSun-ExtB", "Sinhala Sangam MN", "Sketch Rockwell", "Skia", "Small Fonts", "Snap ITC", "Snell Roundhand", "Socket", "Souvenir Lt BT", "Staccato222 BT", "Steamer", "Stencil", "Storybook", "Styllo", "Subway", "Swis721 BlkEx BT", "Swiss911 XCm BT", "Sylfaen", "Synchro LET", "System", "Tamil Sangam MN", "Technical", "Teletype", "Telugu Sangam MN", "Tempus Sans ITC", "Terminal", "Thonburi", "Traditional Arabic", "Trajan", "TRAJAN PRO", "Tristan", "Tubular", "Tunga", "Tw Cen MT", "Tw Cen MT Condensed", "Tw Cen MT Condensed Extra Bold", "TypoUpright BT", "Unicorn", "Univers", "Univers CE 55 Medium", "Univers Condensed", "Utsaah", "Vagabond", "Vani", "Vijaya", "Viner Hand ITC", "VisualUI", "Vivaldi", "Vladimir Script", "Vrinda", "Westminster", "WHITNEY", "Wide Latin", "ZapfEllipt BT", "ZapfHumnst BT", "ZapfHumnst Dm BT", "Zapfino", "Zurich BlkEx BT", "Zurich Ex BT", "ZWAdobeF"];
        if (options.extendedJsFonts) {
          fontList = fontList.concat(extendedFontList);
        }
        fontList = fontList.concat(options.userDefinedFonts);
        testString = "conekticute";
        testSize = "72px";
        h = document.getElementsByTagName("body")[0];
        baseFontsDiv = document.createElement("div");
        fontsDiv = document.createElement("div");
        defaultWidth = {};
        defaultHeight = {};
        createSpan = function() {
          var s;
          s = document.createElement("span");
          'We need this css as in some weird browser this\nspan elements shows up for a microSec which creates a\nbad user experience';
          s.style.position = "absolute";
          s.style.left = "-9999px";
          s.style.fontSize = testSize;
          s.innerHTML = testString;
          return s;
        };
        createSpanWithFonts = function(fontToDetect, baseFont) {
          var s;
          s = createSpan();
          s.style.fontFamily = "'" + fontToDetect + "'," + baseFont;
          return s;
        };
        initializeBaseFontsSpans = function() {
          var baseFont, k, len, s, spans;
          spans = [];
          for (k = 0, len = baseFonts.length; k < len; k++) {
            baseFont = baseFonts[k];
            s = createSpan();
            s.style.fontFamily = baseFonts[index];
            baseFontsDiv.appendChild(s);
            spans.push(s);
          }
          return spans;
        };
        initializeFontsSpans = function() {
          var fontItem, fontSpans, i, item, j, k, len, len1, m, s, spans;
          spans = {};
          for (i = k = 0, len = fontList.length; k < len; i = ++k) {
            fontItem = fontList[i];
            fontSpans = [];
            for (j = m = 0, len1 = baseFonts.length; m < len1; j = ++m) {
              item = baseFonts[j];
              s = createSpanWithFonts(fontItem, item);
              fontsDiv.appendChild(s);
              fontSpans.push(s);
            }
            spans[fontItem] = fontSpans;
          }
          return spans;
        };
        isFontAvailable = function(fontSpans) {
          var baseItem, detected, i, k, len;
          detected = false;
          for (i = k = 0, len = baseFonts.length; k < len; i = ++k) {
            baseItem = baseFonts[i];
            detected = fontSpans[i].offsetWidth !== defaultWidth[baseFonts[i]] || fontSpans[i].offsetHeight !== defaultHeight[baseFonts[i]];
            if (detected) {
              return detected;
            }
          }
        };
        baseFontsSpans = initializeBaseFontsSpans();
        h.appendChild(baseFontsDiv);
        for (index = k = 0, len = baseFonts.length; k < len; index = ++k) {
          baseFont = baseFonts[index];
          defaultWidth[baseFont] = baseFontsSpans[index].offsetWidth;
          defaultHeight[baseFont] = baseFontsSpans[index].offsetHeight;
        }
        fontsSpans = initializeFontsSpans();
        h.appendChild(fontsDiv);
        available = [];
        for (i = m = 0, len1 = fontList.length; m < len1; i = ++m) {
          fontItem = fontList[i];
          if (isFontAvailable(fontsSpans[fontItem])) {
            available.push(fontItem);
          }
        }
        h.removeChild(fontsDiv);
        h.removeChild(baseFontsDiv);
        keys.push({
          key: "hf",
          value: md5(available.join(';'))
        });
        keys.push({
          key: "nf",
          value: available.length
        });
        return done(keys);
      };
      return setTimeout(callback, 1);
    };
    fontsKey = function(keys, done) {
      return getFonts(keys, done);
    };
    hostnameKey = function(keys) {
      var hostname;
      hostname = document.location.host;
      if (document.location.hostname !== "") {
        hostname = document.location.hostname;
      }
      if (window.location.host !== "") {
        hostname = window.location.host;
      }
      if (window.location.hostname !== "") {
        hostname = window.location.hostname;
      }
      keys.push({
        key: "h",
        value: hostname
      });
      return keys;
    };
    titleKey = function(keys) {
      var title;
      title = document.title;
      if (title) {
        keys.push({
          key: "t",
          value: title
        });
      }
      return keys;
    };
    urlKey = function(keys) {
      var url;
      url = document.URL;
      if (window.location.href !== "") {
        url = window.location.href;
      }
      keys.push({
        key: "u",
        value: url
      });
      return keys;
    };
    keys = [];
    keys = userAgentKey(keys);
    keys = languageKey(keys);
    keys = colorDepthKey(keys);
    keys = pixelRatioKey(keys);
    keys = screenResolutionKey(keys);
    keys = timezoneOffsetKey(keys);
    keys = sessionStorageKey(keys);
    keys = localStorageKey(keys);
    keys = indexedDbKey(keys);
    keys = addBehaviorKey(keys);
    keys = openDatabaseKey(keys);
    keys = cpuClassKey(keys);
    keys = platformKey(keys);
    keys = getCharacterSet(keys);
    keys = stdTimezoneOffset(keys);
    keys = hasLiedLanguagesKey(keys);
    keys = mimeTypesKey(keys);
    keys = pluginsKey(keys);
    keys = hostnameKey(keys);
    keys = titleKey(keys);
    fontsKey(keys, function(newKeys) {
      var values;
      values = [];
      each(newKeys, function(pair) {
        return values.push(pair.key + '=' + pair.value);
      });
      return done(values);
    });
  };

}).call(this);

/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*global unescape, define, module */

;(function ($) {
  'use strict'

  /*
  * Add integers, wrapping at 2^32. This uses 16-bit operations internally
  * to work around bugs in some JS interpreters.
  */
  function safe_add (x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF)
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xFFFF)
  }

  /*
  * Bitwise rotate a 32-bit number to the left.
  */
  function bit_rol (num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt))
  }

  /*
  * These functions implement the four basic operations the algorithm uses.
  */
  function md5_cmn (q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
  }
  function md5_ff (a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t)
  }
  function md5_gg (a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t)
  }
  function md5_hh (a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t)
  }
  function md5_ii (a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t)
  }

  /*
  * Calculate the MD5 of an array of little-endian words, and a bit length.
  */
  function binl_md5 (x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << (len % 32)
    x[(((len + 64) >>> 9) << 4) + 14] = len

    var i
    var olda
    var oldb
    var oldc
    var oldd
    var a = 1732584193
    var b = -271733879
    var c = -1732584194
    var d = 271733878

    for (i = 0; i < x.length; i += 16) {
      olda = a
      oldb = b
      oldc = c
      oldd = d

      a = md5_ff(a, b, c, d, x[i], 7, -680876936)
      d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586)
      c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819)
      b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330)
      a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897)
      d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426)
      c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341)
      b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983)
      a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416)
      d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417)
      c = md5_ff(c, d, a, b, x[i + 10], 17, -42063)
      b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162)
      a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682)
      d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101)
      c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290)
      b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329)

      a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510)
      d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632)
      c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713)
      b = md5_gg(b, c, d, a, x[i], 20, -373897302)
      a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691)
      d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083)
      c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335)
      b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848)
      a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438)
      d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690)
      c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961)
      b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501)
      a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467)
      d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784)
      c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473)
      b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734)

      a = md5_hh(a, b, c, d, x[i + 5], 4, -378558)
      d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463)
      c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562)
      b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556)
      a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060)
      d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353)
      c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632)
      b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640)
      a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174)
      d = md5_hh(d, a, b, c, x[i], 11, -358537222)
      c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979)
      b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189)
      a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487)
      d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835)
      c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520)
      b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651)

      a = md5_ii(a, b, c, d, x[i], 6, -198630844)
      d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415)
      c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905)
      b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055)
      a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571)
      d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606)
      c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523)
      b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799)
      a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359)
      d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744)
      c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380)
      b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649)
      a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070)
      d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379)
      c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259)
      b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551)

      a = safe_add(a, olda)
      b = safe_add(b, oldb)
      c = safe_add(c, oldc)
      d = safe_add(d, oldd)
    }
    return [a, b, c, d]
  }

  /*
  * Convert an array of little-endian words to a string
  */
  function binl2rstr (input) {
    var i
    var output = ''
    var length32 = input.length * 32
    for (i = 0; i < length32; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF)
    }
    return output
  }

  /*
  * Convert a raw string to an array of little-endian words
  * Characters >255 have their high-byte silently ignored.
  */
  function rstr2binl (input) {
    var i
    var output = []
    output[(input.length >> 2) - 1] = undefined
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0
    }
    var length8 = input.length * 8
    for (i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32)
    }
    return output
  }

  /*
  * Calculate the MD5 of a raw string
  */
  function rstr_md5 (s) {
    return binl2rstr(binl_md5(rstr2binl(s), s.length * 8))
  }

  /*
  * Calculate the HMAC-MD5, of a key and some data (raw strings)
  */
  function rstr_hmac_md5 (key, data) {
    var i
    var bkey = rstr2binl(key)
    var ipad = []
    var opad = []
    var hash
    ipad[15] = opad[15] = undefined
    if (bkey.length > 16) {
      bkey = binl_md5(bkey, key.length * 8)
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636
      opad[i] = bkey[i] ^ 0x5C5C5C5C
    }
    hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
    return binl2rstr(binl_md5(opad.concat(hash), 512 + 128))
  }

  /*
  * Convert a raw string to a hex string
  */
  function rstr2hex (input) {
    var hex_tab = '0123456789abcdef'
    var output = ''
    var x
    var i
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i)
      output += hex_tab.charAt((x >>> 4) & 0x0F) +
      hex_tab.charAt(x & 0x0F)
    }
    return output
  }

  /*
  * Encode a string as utf-8
  */
  function str2rstr_utf8 (input) {
    return unescape(encodeURIComponent(input))
  }

  /*
  * Take string arguments and return either raw or hex encoded strings
  */
  function raw_md5 (s) {
    return rstr_md5(str2rstr_utf8(s))
  }
  function hex_md5 (s) {
    return rstr2hex(raw_md5(s))
  }
  function raw_hmac_md5 (k, d) {
    return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))
  }
  function hex_hmac_md5 (k, d) {
    return rstr2hex(raw_hmac_md5(k, d))
  }

  function md5 (string, key, raw) {
    if (!key) {
      if (!raw) {
        return hex_md5(string)
      }
      return raw_md5(string)
    }
    if (!raw) {
      return hex_hmac_md5(key, string)
    }
    return raw_hmac_md5(key, string)
  }

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return md5
    })
  } else if (typeof module === 'object' && module.exports) {
    module.exports = md5
  } else {
    $.md5 = md5
  }
}(this))