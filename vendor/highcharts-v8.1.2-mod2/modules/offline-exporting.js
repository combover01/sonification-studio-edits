/*
 Highcharts JS v8.1.2 (2020-07-10)

 Client side exporting module

 (c) 2015-2019 Torstein Honsi / Oystein Moseng

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/offline-exporting",["highcharts","highcharts/modules/exporting"],function(f){a(f);a.Highcharts=f;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function f(a,b,p,d){a.hasOwnProperty(b)||(a[b]=d.apply(null,p))}a=a?a._modules:{};f(a,"mixins/download-url.js",[a["Core/Globals.js"]],function(a){var b=a.win,p=b.navigator,
d=b.document,f=b.URL||b.webkitURL||b,w=/Edge\/\d+/.test(p.userAgent),e=a.dataURLtoBlob=function(a){if((a=a.match(/data:([^;]*)(;base64)?,([0-9A-Za-z+/]+)/))&&3<a.length&&b.atob&&b.ArrayBuffer&&b.Uint8Array&&b.Blob&&f.createObjectURL){var k=b.atob(a[3]),e=new b.ArrayBuffer(k.length);e=new b.Uint8Array(e);for(var d=0;d<e.length;++d)e[d]=k.charCodeAt(d);a=new b.Blob([e],{type:a[1]});return f.createObjectURL(a)}};a=a.downloadURL=function(a,f){var l=d.createElement("a");if("string"===typeof a||a instanceof
String||!p.msSaveOrOpenBlob){if(w||2E6<a.length)if(a=e(a),!a)throw Error("Failed to convert to blob");if("undefined"!==typeof l.download)l.href=a,l.download=f,d.body.appendChild(l),l.click(),d.body.removeChild(l);else try{var k=b.open(a,"chart");if("undefined"===typeof k||null===k)throw Error("Failed to open window");}catch(B){b.location.href=a}}else p.msSaveOrOpenBlob(a,f)};return{dataURLtoBlob:e,downloadURL:a}});f(a,"modules/offline-exporting.src.js",[a["Core/Chart/Chart.js"],a["Core/Globals.js"],
a["Core/Renderer/SVG/SVGRenderer.js"],a["Core/Utilities.js"],a["mixins/download-url.js"]],function(a,b,f,d,G){function w(a,b){var g=k.getElementsByTagName("head")[0],c=k.createElement("script");c.type="text/javascript";c.src=a;c.onload=b;c.onerror=function(){l("Error loading script "+a)};g.appendChild(c)}var e=b.win,k=b.doc,p=d.addEvent,l=d.error,H=d.extend,B=d.getOptions,D=d.merge,A=G.downloadURL,E=e.URL||e.webkitURL||e,x=e.navigator,C=/Edge\/|Trident\/|MSIE /.test(x.userAgent),I=C?150:0;b.CanVGRenderer=
{};b.svgToDataUrl=function(a){var b=-1<x.userAgent.indexOf("WebKit")&&0>x.userAgent.indexOf("Chrome");try{if(!b&&0>x.userAgent.toLowerCase().indexOf("firefox"))return E.createObjectURL(new e.Blob([a],{type:"image/svg+xml;charset-utf-16"}))}catch(g){}return"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(a)};b.imageToDataUrl=function(a,b,g,c,d,m,f,n,t){var h=new e.Image,r=function(){setTimeout(function(){var e=k.createElement("canvas"),m=e.getContext&&e.getContext("2d");try{if(m){e.height=h.height*
c;e.width=h.width*c;m.drawImage(h,0,0,e.width,e.height);try{var y=e.toDataURL(b);d(y,b,g,c)}catch(F){q(a,b,g,c)}}else f(a,b,g,c)}finally{t&&t(a,b,g,c)}},I)},z=function(){n(a,b,g,c);t&&t(a,b,g,c)};var q=function(){h=new e.Image;q=m;h.crossOrigin="Anonymous";h.onload=r;h.onerror=z;h.src=a};h.onload=r;h.onerror=z;h.src=a};b.downloadSVGLocal=function(a,d,g,c){function f(a,b){var c=a.width.baseVal.value+2*b;b=a.height.baseVal.value+2*b;c=new e.jsPDF(b>c?"p":"l","pt",[c,b]);[].forEach.call(a.querySelectorAll('*[visibility="hidden"]'),
function(a){a.parentNode.removeChild(a)});e.svg2pdf(a,c,{removeInvalid:!0});return c.output("datauristring")}function m(){t.innerHTML=a;var b=t.getElementsByTagName("text"),e;[].forEach.call(b,function(a){["font-family","font-size"].forEach(function(b){for(var c=a;c&&c!==t;){if(c.style[b]){a.style[b]=c.style[b];break}c=c.parentNode}});a.style["font-family"]=a.style["font-family"]&&a.style["font-family"].split(" ").splice(-1);e=a.getElementsByTagName("title");[].forEach.call(e,function(b){a.removeChild(b)})});
b=f(t.firstChild,0);try{A(b,r),c&&c()}catch(J){g(J)}}var l=!0,n=d.libURL||B().exporting.libURL,t=k.createElement("div"),h=d.type||"image/png",r=(d.filename||"chart")+"."+("image/svg+xml"===h?"svg":h.split("/")[1]),p=d.scale||1;n="/"!==n.slice(-1)?n+"/":n;if("image/svg+xml"===h)try{if("undefined"!==typeof x.msSaveOrOpenBlob){var q=new MSBlobBuilder;q.append(a);var u=q.getBlob("image/svg+xml")}else u=b.svgToDataUrl(a);A(u,r);c&&c()}catch(y){g(y)}else if("application/pdf"===h)e.jsPDF&&e.svg2pdf?m():
(l=!0,w(n+"jspdf.js",function(){w(n+"svg2pdf.js",function(){m()})}));else{u=b.svgToDataUrl(a);var v=function(){try{E.revokeObjectURL(u)}catch(y){}};b.imageToDataUrl(u,h,{},p,function(a){try{A(a,r),c&&c()}catch(F){g(F)}},function(){var b=k.createElement("canvas"),d=b.getContext("2d"),m=a.match(/^<svg[^>]*width\s*=\s*"?(\d+)"?[^>]*>/)[1]*p,f=a.match(/^<svg[^>]*height\s*=\s*"?(\d+)"?[^>]*>/)[1]*p,z=function(){d.drawSvg(a,0,0,m,f);try{A(x.msSaveOrOpenBlob?b.msToBlob():b.toDataURL(h),r),c&&c()}catch(K){g(K)}finally{v()}};
b.width=m;b.height=f;e.canvg?z():(l=!0,w(n+"rgbcolor.js",function(){w(n+"canvg.js",function(){z()})}))},g,g,function(){l&&v()})}};a.prototype.getSVGForLocalExport=function(a,e,g,c){var d=this,m=0,f,n,l,h,k=function(){m===q.length&&c(d.sanitizeSVG(f.innerHTML,n))},r=function(a,b,c){++m;c.imageElement.setAttributeNS("http://www.w3.org/1999/xlink","href",a);k()};d.unbindGetSVG=p(d,"getSVG",function(a){n=a.chartCopy.options;f=a.chartCopy.container.cloneNode(!0)});d.getSVGForExport(a,e);var q=f.getElementsByTagName("image");
try{if(!q.length){c(d.sanitizeSVG(f.innerHTML,n));return}var u=0;for(l=q.length;u<l;++u){var v=q[u];(h=v.getAttributeNS("http://www.w3.org/1999/xlink","href"))?b.imageToDataUrl(h,"image/png",{imageElement:v},a.scale,r,g,g,g):(++m,v.parentNode.removeChild(v),k())}}catch(y){g(y)}d.unbindGetSVG()};a.prototype.exportChartLocal=function(a,e){var d=this,c=D(d.options.exporting,a),k=function(a){!1===c.fallbackToExportServer?c.error?c.error(c,a):l(28,!0):d.exportChart(c)};a=function(){return[].some.call(d.container.getElementsByTagName("image"),
function(a){a=a.getAttribute("href");return""!==a&&0!==a.indexOf("data:")})};C&&d.styledMode&&(f.prototype.inlineWhitelist=[/^blockSize/,/^border/,/^caretColor/,/^color/,/^columnRule/,/^columnRuleColor/,/^cssFloat/,/^cursor/,/^fill$/,/^fillOpacity/,/^font/,/^inlineSize/,/^length/,/^lineHeight/,/^opacity/,/^outline/,/^parentRule/,/^rx$/,/^ry$/,/^stroke/,/^textAlign/,/^textAnchor/,/^textDecoration/,/^transform/,/^vectorEffect/,/^visibility/,/^x$/,/^y$/]);C&&("application/pdf"===c.type||d.container.getElementsByTagName("image").length&&
"image/svg+xml"!==c.type)||"application/pdf"===c.type&&a()?k("Image type not supported for this chart/browser."):d.getSVGForLocalExport(c,e,k,function(a){-1<a.indexOf("<foreignObject")&&"image/svg+xml"!==c.type?k("Image type not supportedfor charts with embedded HTML"):b.downloadSVGLocal(a,H({filename:d.getFilename()},c),k)})};D(!0,B().exporting,{libURL:"https://code.highcharts.com/8.1.2/lib/",menuItemDefinitions:{downloadPNG:{textKey:"downloadPNG",onclick:function(){this.exportChartLocal()}},downloadJPEG:{textKey:"downloadJPEG",
onclick:function(){this.exportChartLocal({type:"image/jpeg"})}},downloadSVG:{textKey:"downloadSVG",onclick:function(){this.exportChartLocal({type:"image/svg+xml"})}},downloadPDF:{textKey:"downloadPDF",onclick:function(){this.exportChartLocal({type:"application/pdf"})}}}})});f(a,"masters/modules/offline-exporting.src.js",[],function(){})});
//# sourceMappingURL=offline-exporting.js.map