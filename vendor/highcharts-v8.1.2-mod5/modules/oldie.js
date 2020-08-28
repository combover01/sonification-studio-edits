/*
 Highcharts JS v8.2.0 (2020-08-27)

 Old IE (v6, v7, v8) module for Highcharts v6+.

 (c) 2010-2019 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/oldie",["highcharts"],function(C){a(C);a.Highcharts=C;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function C(t,a,p,u){t.hasOwnProperty(a)||(t[a]=u.apply(null,p))}a=a?a._modules:{};C(a,"Extensions/Math3D.js",[a["Core/Globals.js"],a["Core/Utilities.js"]],function(a,A){var t=A.pick,u=a.deg2rad,h=a.perspective3D=function(a,
e,h){e=0<h&&h<Number.POSITIVE_INFINITY?h/(a.z+e.z+h):1;return{x:a.x*e,y:a.y*e}},r=a.perspective=function(a,e,r,n){var f=e.options.chart.options3d,y=t(n,r?e.inverted:!1),v={x:e.plotWidth/2,y:e.plotHeight/2,z:f.depth/2,vd:t(f.depth,1)*t(f.viewDistance,0)},P=e.scale3d||1;n=u*f.beta*(y?-1:1);f=u*f.alpha*(y?-1:1);var p=Math.cos(f),A=Math.cos(-n),F=Math.sin(f),J=Math.sin(-n);r||(v.x+=e.plotLeft,v.y+=e.plotTop);return a.map(function(a){var e=(y?a.y:a.x)-v.x;var f=(y?a.x:a.y)-v.y;a=(a.z||0)-v.z;e={x:A*e-
J*a,y:-F*J*e+p*f-A*F*a,z:p*J*e+F*f+p*A*a};f=h(e,v,v.vd);f.x=f.x*P+v.x;f.y=f.y*P+v.y;f.z=e.z*P+v.z;return{x:y?f.y:f.x,y:y?f.x:f.y,z:f.z}})};A=a.pointCameraDistance=function(a,e){var f=e.options.chart.options3d,h=e.plotWidth/2;e=e.plotHeight/2;f=t(f.depth,1)*t(f.viewDistance,0)+f.depth;return Math.sqrt(Math.pow(h-t(a.plotX,a.x),2)+Math.pow(e-t(a.plotY,a.y),2)+Math.pow(f-t(a.plotZ,a.z),2))};var e=a.shapeArea=function(a){var e=0,f;for(f=0;f<a.length;f++){var h=(f+1)%a.length;e+=a[f].x*a[h].y-a[h].x*a[f].y}return e/
2};a=a.shapeArea3d=function(a,h,t){return e(r(a,h,t))};return{perspective:r,perspective3D:h,pointCameraDistance:A,shapeArea:e,shapeArea3D:a}});C(a,"Core/Renderer/SVG/SVGRenderer3D.js",[a["Core/Color.js"],a["Core/Globals.js"],a["Extensions/Math3D.js"],a["Core/Renderer/SVG/SVGElement.js"],a["Core/Renderer/SVG/SVGRenderer.js"],a["Core/Utilities.js"]],function(a,A,p,u,h,r){function e(m,a,b,c,x,g,D,d){var k=[],l=g-x;return g>x&&g-x>Math.PI/2+.0001?(k=k.concat(e(m,a,b,c,x,x+Math.PI/2,D,d)),k=k.concat(e(m,
a,b,c,x+Math.PI/2,g,D,d))):g<x&&x-g>Math.PI/2+.0001?(k=k.concat(e(m,a,b,c,x,x-Math.PI/2,D,d)),k=k.concat(e(m,a,b,c,x-Math.PI/2,g,D,d))):[["C",m+b*Math.cos(x)-b*N*l*Math.sin(x)+D,a+c*Math.sin(x)+c*N*l*Math.cos(x)+d,m+b*Math.cos(g)+b*N*l*Math.sin(g)+D,a+c*Math.sin(g)-c*N*l*Math.cos(g)+d,m+b*Math.cos(g)+D,a+c*Math.sin(g)+d]]}var f=a.parse,t=p.perspective,y=p.shapeArea,n=r.animObject,G=r.defined,C=r.extend,v=r.merge,Q=r.objectEach,H=r.pick,I=Math.cos,F=Math.PI,J=Math.sin,M=A.charts,K=A.deg2rad;var N=
4*(Math.sqrt(2)-1)/3/(F/2);h.prototype.toLinePath=function(a,e){var b=[];a.forEach(function(c){b.push(["L",c.x,c.y])});a.length&&(b[0][0]="M",e&&b.push(["Z"]));return b};h.prototype.toLineSegments=function(a){var m=[],b=!0;a.forEach(function(c){m.push(b?["M",c.x,c.y]:["L",c.x,c.y]);b=!b});return m};h.prototype.face3d=function(a){var m=this,b=this.createElement("path");b.vertexes=[];b.insidePlotArea=!1;b.enabled=!0;b.attr=function(b){if("object"===typeof b&&(G(b.enabled)||G(b.vertexes)||G(b.insidePlotArea))){this.enabled=
H(b.enabled,this.enabled);this.vertexes=H(b.vertexes,this.vertexes);this.insidePlotArea=H(b.insidePlotArea,this.insidePlotArea);delete b.enabled;delete b.vertexes;delete b.insidePlotArea;var c=t(this.vertexes,M[m.chartIndex],this.insidePlotArea),g=m.toLinePath(c,!0);c=y(c);c=this.enabled&&0<c?"visible":"hidden";b.d=g;b.visibility=c}return u.prototype.attr.apply(this,arguments)};b.animate=function(b){if("object"===typeof b&&(G(b.enabled)||G(b.vertexes)||G(b.insidePlotArea))){this.enabled=H(b.enabled,
this.enabled);this.vertexes=H(b.vertexes,this.vertexes);this.insidePlotArea=H(b.insidePlotArea,this.insidePlotArea);delete b.enabled;delete b.vertexes;delete b.insidePlotArea;var c=t(this.vertexes,M[m.chartIndex],this.insidePlotArea),g=m.toLinePath(c,!0);c=y(c);c=this.enabled&&0<c?"visible":"hidden";b.d=g;this.attr("visibility",c)}return u.prototype.animate.apply(this,arguments)};return b.attr(a)};h.prototype.polyhedron=function(a){var m=this,b=this.g(),c=b.destroy;this.styledMode||b.attr({"stroke-linejoin":"round"});
b.faces=[];b.destroy=function(){for(var a=0;a<b.faces.length;a++)b.faces[a].destroy();return c.call(this)};b.attr=function(c,g,a,d){if("object"===typeof c&&G(c.faces)){for(;b.faces.length>c.faces.length;)b.faces.pop().destroy();for(;b.faces.length<c.faces.length;)b.faces.push(m.face3d().add(b));for(var k=0;k<c.faces.length;k++)m.styledMode&&delete c.faces[k].fill,b.faces[k].attr(c.faces[k],null,a,d);delete c.faces}return u.prototype.attr.apply(this,arguments)};b.animate=function(c,g,a){if(c&&c.faces){for(;b.faces.length>
c.faces.length;)b.faces.pop().destroy();for(;b.faces.length<c.faces.length;)b.faces.push(m.face3d().add(b));for(var d=0;d<c.faces.length;d++)b.faces[d].animate(c.faces[d],g,a);delete c.faces}return u.prototype.animate.apply(this,arguments)};return b.attr(a)};a={initArgs:function(a){var m=this,b=m.renderer,c=b[m.pathType+"Path"](a),e=c.zIndexes;m.parts.forEach(function(g){m[g]=b.path(c[g]).attr({"class":"highcharts-3d-"+g,zIndex:e[g]||0}).add(m)});m.attr({"stroke-linejoin":"round",zIndex:e.group});
m.originalDestroy=m.destroy;m.destroy=m.destroyParts;m.forcedSides=c.forcedSides},singleSetterForParts:function(a,e,b,c,x,g){var m={};c=[null,null,c||"attr",x,g];var d=b&&b.zIndexes;b?(d&&d.group&&this.attr({zIndex:d.group}),Q(b,function(k,l){m[l]={};m[l][a]=k;d&&(m[l].zIndex=b.zIndexes[l]||0)}),c[1]=m):(m[a]=e,c[0]=m);return this.processParts.apply(this,c)},processParts:function(a,e,b,c,x){var g=this;g.parts.forEach(function(m){e&&(a=H(e[m],!1));if(!1!==a)g[m][b](a,c,x)});return g},destroyParts:function(){this.processParts(null,
null,"destroy");return this.originalDestroy()}};var O=v(a,{parts:["front","top","side"],pathType:"cuboid",attr:function(a,e,b,c){if("string"===typeof a&&"undefined"!==typeof e){var m=a;a={};a[m]=e}return a.shapeArgs||G(a.x)?this.singleSetterForParts("d",null,this.renderer[this.pathType+"Path"](a.shapeArgs||a)):u.prototype.attr.call(this,a,void 0,b,c)},animate:function(a,e,b){if(G(a.x)&&G(a.y)){a=this.renderer[this.pathType+"Path"](a);var c=a.forcedSides;this.singleSetterForParts("d",null,a,"animate",
e,b);this.attr({zIndex:a.zIndexes.group});c!==this.forcedSides&&(this.forcedSides=c,O.fillSetter.call(this,this.fill))}else u.prototype.animate.call(this,a,e,b);return this},fillSetter:function(a){this.forcedSides=this.forcedSides||[];this.singleSetterForParts("fill",null,{front:a,top:f(a).brighten(0<=this.forcedSides.indexOf("top")?0:.1).get(),side:f(a).brighten(0<=this.forcedSides.indexOf("side")?0:-.1).get()});this.color=this.fill=a;return this}});h.prototype.elements3d={base:a,cuboid:O};h.prototype.element3d=
function(a,e){var b=this.g();C(b,this.elements3d[a]);b.initArgs(e);return b};h.prototype.cuboid=function(a){return this.element3d("cuboid",a)};h.prototype.cuboidPath=function(a){function e(d){return 0===D&&1<d&&6>d?{x:z[d].x,y:z[d].y+10,z:z[d].z}:z[0].x===z[7].x&&4<=d?{x:z[d].x+10,y:z[d].y,z:z[d].z}:0===k&&2>d||5<d?{x:z[d].x,y:z[d].y,z:z[d].z+10}:z[d]}function b(d){return z[d]}var c=a.x,m=a.y,g=a.z||0,D=a.height,d=a.width,k=a.depth,l=M[this.chartIndex],q=l.options.chart.options3d.alpha,L=0,z=[{x:c,
y:m,z:g},{x:c+d,y:m,z:g},{x:c+d,y:m+D,z:g},{x:c,y:m+D,z:g},{x:c,y:m+D,z:g+k},{x:c+d,y:m+D,z:g+k},{x:c+d,y:m,z:g+k},{x:c,y:m,z:g+k}],f=[];z=t(z,l,a.insidePlotArea);var w=function(d,k,l){var a=[[],-1],c=d.map(b),g=k.map(b);d=d.map(e);k=k.map(e);0>y(c)?a=[c,0]:0>y(g)?a=[g,1]:l&&(f.push(l),a=0>y(d)?[c,0]:0>y(k)?[g,1]:[c,0]);return a};var B=w([3,2,1,0],[7,6,5,4],"front");a=B[0];var h=B[1];B=w([1,6,7,0],[4,5,2,3],"top");d=B[0];var E=B[1];B=w([1,2,5,6],[0,7,4,3],"side");w=B[0];B=B[1];1===B?L+=1E6*(l.plotWidth-
c):B||(L+=1E6*c);L+=10*(!E||0<=q&&180>=q||360>q&&357.5<q?l.plotHeight-m:10+m);1===h?L+=100*g:h||(L+=100*(1E3-g));return{front:this.toLinePath(a,!0),top:this.toLinePath(d,!0),side:this.toLinePath(w,!0),zIndexes:{group:Math.round(L)},forcedSides:f,isFront:h,isTop:E}};h.prototype.arc3d=function(a){function e(b){var a=!1,d={},k;b=v(b);for(k in b)-1!==m.indexOf(k)&&(d[k]=b[k],delete b[k],a=!0);return a?[d,b]:!1}var b=this.g(),c=b.renderer,m="x y r innerR start end depth".split(" ");a=v(a);a.alpha=(a.alpha||
0)*K;a.beta=(a.beta||0)*K;b.top=c.path();b.side1=c.path();b.side2=c.path();b.inn=c.path();b.out=c.path();b.onAdd=function(){var a=b.parentGroup,c=b.attr("class");b.top.add(b);["out","inn","side1","side2"].forEach(function(d){b[d].attr({"class":c+" highcharts-3d-side"}).add(a)})};["addClass","removeClass"].forEach(function(a){b[a]=function(){var c=arguments;["top","out","inn","side1","side2"].forEach(function(d){b[d][a].apply(b[d],c)})}});b.setPaths=function(a){var c=b.renderer.arc3dPath(a),d=100*
c.zTop;b.attribs=a;b.top.attr({d:c.top,zIndex:c.zTop});b.inn.attr({d:c.inn,zIndex:c.zInn});b.out.attr({d:c.out,zIndex:c.zOut});b.side1.attr({d:c.side1,zIndex:c.zSide1});b.side2.attr({d:c.side2,zIndex:c.zSide2});b.zIndex=d;b.attr({zIndex:d});a.center&&(b.top.setRadialReference(a.center),delete a.center)};b.setPaths(a);b.fillSetter=function(a){var b=f(a).brighten(-.1).get();this.fill=a;this.side1.attr({fill:b});this.side2.attr({fill:b});this.inn.attr({fill:b});this.out.attr({fill:b});this.top.attr({fill:a});
return this};["opacity","translateX","translateY","visibility"].forEach(function(a){b[a+"Setter"]=function(a,d){b[d]=a;["out","inn","side1","side2","top"].forEach(function(k){b[k].attr(d,a)})}});b.attr=function(a){var c;if("object"===typeof a&&(c=e(a))){var d=c[0];arguments[0]=c[1];C(b.attribs,d);b.setPaths(b.attribs)}return u.prototype.attr.apply(b,arguments)};b.animate=function(a,c,d){var k=this.attribs,l="data-"+Math.random().toString(26).substring(2,9);delete a.center;delete a.z;delete a.alpha;
delete a.beta;var q=n(H(c,this.renderer.globalAnimation));if(q.duration){c=e(a);b[l]=0;a[l]=1;b[l+"Setter"]=A.noop;if(c){var g=c[0];q.step=function(d,a){function b(d){return k[d]+(H(g[d],k[d])-k[d])*a.pos}a.prop===l&&a.elem.setPaths(v(k,{x:b("x"),y:b("y"),r:b("r"),innerR:b("innerR"),start:b("start"),end:b("end"),depth:b("depth")}))}}c=q}return u.prototype.animate.call(this,a,c,d)};b.destroy=function(){this.top.destroy();this.out.destroy();this.inn.destroy();this.side1.destroy();this.side2.destroy();
return u.prototype.destroy.call(this)};b.hide=function(){this.top.hide();this.out.hide();this.inn.hide();this.side1.hide();this.side2.hide()};b.show=function(a){this.top.show(a);this.out.show(a);this.inn.show(a);this.side1.show(a);this.side2.show(a)};return b};h.prototype.arc3dPath=function(a){function m(d){d%=2*Math.PI;d>Math.PI&&(d=2*Math.PI-d);return d}var b=a.x,c=a.y,h=a.start,g=a.end-.00001,f=a.r,d=a.innerR||0,k=a.depth||0,l=a.alpha,q=a.beta,L=Math.cos(h),z=Math.sin(h);a=Math.cos(g);var t=Math.sin(g),
w=f*Math.cos(q);f*=Math.cos(l);var B=d*Math.cos(q),r=d*Math.cos(l);d=k*Math.sin(q);var E=k*Math.sin(l);k=[["M",b+w*L,c+f*z]];k=k.concat(e(b,c,w,f,h,g,0,0));k.push(["L",b+B*a,c+r*t]);k=k.concat(e(b,c,B,r,g,h,0,0));k.push(["Z"]);var u=0<q?Math.PI/2:0;q=0<l?0:Math.PI/2;u=h>-u?h:g>-u?-u:h;var n=g<F-q?g:h<F-q?F-q:g,p=2*F-q;l=[["M",b+w*I(u),c+f*J(u)]];l=l.concat(e(b,c,w,f,u,n,0,0));g>p&&h<p?(l.push(["L",b+w*I(n)+d,c+f*J(n)+E]),l=l.concat(e(b,c,w,f,n,p,d,E)),l.push(["L",b+w*I(p),c+f*J(p)]),l=l.concat(e(b,
c,w,f,p,g,0,0)),l.push(["L",b+w*I(g)+d,c+f*J(g)+E]),l=l.concat(e(b,c,w,f,g,p,d,E)),l.push(["L",b+w*I(p),c+f*J(p)]),l=l.concat(e(b,c,w,f,p,n,0,0))):g>F-q&&h<F-q&&(l.push(["L",b+w*Math.cos(n)+d,c+f*Math.sin(n)+E]),l=l.concat(e(b,c,w,f,n,g,d,E)),l.push(["L",b+w*Math.cos(g),c+f*Math.sin(g)]),l=l.concat(e(b,c,w,f,g,n,0,0)));l.push(["L",b+w*Math.cos(n)+d,c+f*Math.sin(n)+E]);l=l.concat(e(b,c,w,f,n,u,d,E));l.push(["Z"]);q=[["M",b+B*L,c+r*z]];q=q.concat(e(b,c,B,r,h,g,0,0));q.push(["L",b+B*Math.cos(g)+d,c+
r*Math.sin(g)+E]);q=q.concat(e(b,c,B,r,g,h,d,E));q.push(["Z"]);L=[["M",b+w*L,c+f*z],["L",b+w*L+d,c+f*z+E],["L",b+B*L+d,c+r*z+E],["L",b+B*L,c+r*z],["Z"]];b=[["M",b+w*a,c+f*t],["L",b+w*a+d,c+f*t+E],["L",b+B*a+d,c+r*t+E],["L",b+B*a,c+r*t],["Z"]];t=Math.atan2(E,-d);c=Math.abs(g+t);a=Math.abs(h+t);h=Math.abs((h+g)/2+t);c=m(c);a=m(a);h=m(h);h*=1E5;g=1E5*a;c*=1E5;return{top:k,zTop:1E5*Math.PI+1,out:l,zOut:Math.max(h,g,c),inn:q,zInn:Math.max(h,g,c),side1:L,zSide1:.99*c,side2:b,zSide2:.99*g}};return h});C(a,
"Extensions/Oldie/VMLAxis3D.js",[a["Core/Utilities.js"]],function(a){var t=a.addEvent,p=function(){return function(a){this.axis=a}}();return function(){function a(){}a.compose=function(h){h.keepProps.push("vml");t(h,"init",a.onInit);t(h,"render",a.onRender)};a.onInit=function(){this.vml||(this.vml=new p(this))};a.onRender=function(){var a=this.vml;a.sideFrame&&(a.sideFrame.css({zIndex:0}),a.sideFrame.front.attr({fill:a.sideFrame.color}));a.bottomFrame&&(a.bottomFrame.css({zIndex:1}),a.bottomFrame.front.attr({fill:a.bottomFrame.color}));
a.backFrame&&(a.backFrame.css({zIndex:0}),a.backFrame.front.attr({fill:a.backFrame.color}))};return a}()});C(a,"Extensions/Oldie/VMLRenderer3D.js",[a["Core/Axis/Axis.js"],a["Core/Utilities.js"],a["Extensions/Oldie/VMLAxis3D.js"]],function(a,A,p){var t=A.setOptions;return function(){function h(){}h.compose=function(h,e){var f=e.prototype;h=h.prototype;t({animate:!1});h.face3d=f.face3d;h.polyhedron=f.polyhedron;h.elements3d=f.elements3d;h.element3d=f.element3d;h.cuboid=f.cuboid;h.cuboidPath=f.cuboidPath;
h.toLinePath=f.toLinePath;h.toLineSegments=f.toLineSegments;h.arc3d=function(a){a=f.arc3d.call(this,a);a.css({zIndex:a.zIndex});return a};h.arc3dPath=f.arc3dPath;p.compose(a)};return h}()});C(a,"Extensions/Oldie/Oldie.js",[a["Core/Chart/Chart.js"],a["Core/Color.js"],a["Core/Globals.js"],a["Core/Pointer.js"],a["Core/Renderer/SVG/SVGElement.js"],a["Core/Renderer/SVG/SVGRenderer3D.js"],a["Core/Utilities.js"],a["Extensions/Oldie/VMLRenderer3D.js"]],function(a,A,p,u,h,r,e,f){var t=A.parse,y=p.deg2rad,
n=p.doc,G=p.noop,C=p.svg,v=p.win,Q=e.addEvent,H=e.createElement,I=e.css,F=e.defined,J=e.discardElement,M=e.erase,K=e.extend,N=e.extendClass,O=e.getOptions,m=e.isArray,R=e.isNumber,b=e.isObject;A=e.merge;var c=e.offset,x=e.pick,g=e.pInt,D=e.uniqueKey;O().global.VMLRadialGradientURL="http://code.highcharts.com/8.2.0/gfx/vml-radial-gradient.png";n&&!n.defaultView&&(p.getStyle=e.getStyle=function(d,a){var k={width:"clientWidth",height:"clientHeight"}[a];if(d.style[a])return g(d.style[a]);"opacity"===
a&&(a="filter");if(k)return d.style.zoom=1,Math.max(d[k]-2*e.getStyle(d,"padding"),0);d=d.currentStyle[a.replace(/\-(\w)/g,function(d,a){return a.toUpperCase()})];"filter"===a&&(d=d.replace(/alpha\(opacity=([0-9]+)\)/,function(d,a){return a/100}));return""===d?1:g(d)});C||(Q(h,"afterInit",function(){"text"===this.element.nodeName&&this.css({position:"absolute"})}),u.prototype.normalize=function(d,a){d=d||v.event;d.target||(d.target=d.srcElement);a||(this.chartPosition=a=c(this.chart.container));return K(d,
{chartX:Math.round(Math.max(d.x,d.clientX-a.left)),chartY:Math.round(d.y)})},a.prototype.ieSanitizeSVG=function(d){return d=d.replace(/<IMG /g,"<image ").replace(/<(\/?)TITLE>/g,"<$1title>").replace(/height=([^" ]+)/g,'height="$1"').replace(/width=([^" ]+)/g,'width="$1"').replace(/hc-svg-href="([^"]+)">/g,'xlink:href="$1"/>').replace(/ id=([^" >]+)/g,' id="$1"').replace(/class=([^" >]+)/g,'class="$1"').replace(/ transform /g," ").replace(/:(path|rect)/g,"$1").replace(/style="([^"]+)"/g,function(d){return d.toLowerCase()})},
a.prototype.isReadyToRender=function(){var d=this;return C||v!=v.top||"complete"===n.readyState?!0:(n.attachEvent("onreadystatechange",function(){n.detachEvent("onreadystatechange",d.firstRender);"complete"===n.readyState&&d.firstRender()}),!1)},n.createElementNS||(n.createElementNS=function(d,a){return n.createElement(a)}),p.addEventListenerPolyfill=function(d,a){function k(d){d.target=d.srcElement||v;a.call(b,d)}var b=this;b.attachEvent&&(b.hcEventsIE||(b.hcEventsIE={}),a.hcKey||(a.hcKey=D()),b.hcEventsIE[a.hcKey]=
k,b.attachEvent("on"+d,k))},p.removeEventListenerPolyfill=function(d,a){this.detachEvent&&(a=this.hcEventsIE[a.hcKey],this.detachEvent("on"+d,a))},a={docMode8:n&&8===n.documentMode,init:function(d,a){var b=["<",a,' filled="f" stroked="f"'],k=["position: ","absolute",";"],c="div"===a;("shape"===a||c)&&k.push("left:0;top:0;width:1px;height:1px;");k.push("visibility: ",c?"hidden":"visible");b.push(' style="',k.join(""),'"/>');a&&(b=c||"span"===a||"img"===a?b.join(""):d.prepVML(b),this.element=H(b));
this.renderer=d},add:function(d){var a=this.renderer,b=this.element,c=a.box,e=d&&d.inverted;c=d?d.element||d:c;d&&(this.parentGroup=d);e&&a.invertChild(b,c);c.appendChild(b);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();if(this.onAdd)this.onAdd();this.className&&this.attr("class",this.className);return this},updateTransform:h.prototype.htmlUpdateTransform,setSpanRotation:function(){var d=this.rotation,a=Math.cos(d*y),b=Math.sin(d*y);I(this.element,{filter:d?["progid:DXImageTransform.Microsoft.Matrix(M11=",
a,", M12=",-b,", M21=",b,", M22=",a,", sizingMethod='auto expand')"].join(""):"none"})},getSpanCorrection:function(d,a,b,c,e){var k=c?Math.cos(c*y):1,l=c?Math.sin(c*y):0,g=x(this.elemHeight,this.element.offsetHeight);this.xCorr=0>k&&-d;this.yCorr=0>l&&-g;var f=0>k*l;this.xCorr+=l*a*(f?1-b:b);this.yCorr-=k*a*(c?f?b:1-b:1);e&&"left"!==e&&(this.xCorr-=d*b*(0>k?-1:1),c&&(this.yCorr-=g*b*(0>l?-1:1)),I(this.element,{textAlign:e}))},pathToVML:function(d){for(var a=d.length,b=[];a--;)R(d[a])?b[a]=Math.round(10*
d[a])-5:"Z"===d[a]?b[a]="x":(b[a]=d[a],!d.isArc||"wa"!==d[a]&&"at"!==d[a]||(b[a+5]===b[a+7]&&(b[a+7]+=d[a+7]>d[a+5]?1:-1),b[a+6]===b[a+8]&&(b[a+8]+=d[a+8]>d[a+6]?1:-1)));return b.join(" ")||"x"},clip:function(a){var d=this;if(a){var b=a.members;M(b,d);b.push(d);d.destroyClip=function(){M(b,d)};a=a.getCSS(d)}else d.destroyClip&&d.destroyClip(),a={clip:d.docMode8?"inherit":"rect(auto)"};return d.css(a)},css:h.prototype.htmlCss,safeRemoveChild:function(a){a.parentNode&&J(a)},destroy:function(){this.destroyClip&&
this.destroyClip();return h.prototype.destroy.apply(this)},on:function(a,b){this.element["on"+a]=function(){var a=v.event;a.target=a.srcElement;b(a)};return this},cutOffPath:function(a,b){a=a.split(/[ ,]/);var d=a.length;if(9===d||11===d)a[d-4]=a[d-2]=g(a[d-2])-10*b;return a.join(" ")},shadow:function(a,b,c){var d=[],k,l=this.element,e=this.renderer,f=l.style,h=l.path;h&&"string"!==typeof h.value&&(h="x");var m=h;if(a){var n=x(a.width,3);var t=(a.opacity||.15)/n;for(k=1;3>=k;k++){var p=2*n+1-2*k;
c&&(m=this.cutOffPath(h.value,p+.5));var r=['<shape isShadow="true" strokeweight="',p,'" filled="false" path="',m,'" coordsize="10 10" style="',l.style.cssText,'" />'];var u=H(e.prepVML(r),null,{left:g(f.left)+x(a.offsetX,1),top:g(f.top)+x(a.offsetY,1)});c&&(u.cutOff=p+1);r=['<stroke color="',a.color||"#000000",'" opacity="',t*k,'"/>'];H(e.prepVML(r),null,null,u);b?b.element.appendChild(u):l.parentNode.insertBefore(u,l);d.push(u)}this.shadows=d}return this},updateShadows:G,setAttr:function(a,b){this.docMode8?
this.element[a]=b:this.element.setAttribute(a,b)},getAttr:function(a){return this.docMode8?this.element[a]:this.element.getAttribute(a)},classSetter:function(a){(this.added?this.element:this).className=a},dashstyleSetter:function(a,b,c){(c.getElementsByTagName("stroke")[0]||H(this.renderer.prepVML(["<stroke/>"]),null,null,c))[b]=a||"solid";this[b]=a},dSetter:function(a,b,c){var d=this.shadows;a=a||[];this.d=a.join&&a.join(" ");c.path=a=this.pathToVML(a);if(d)for(c=d.length;c--;)d[c].path=d[c].cutOff?
this.cutOffPath(a,d[c].cutOff):a;this.setAttr(b,a)},fillSetter:function(a,b,c){var d=c.nodeName;"SPAN"===d?c.style.color=a:"IMG"!==d&&(c.filled="none"!==a,this.setAttr("fillcolor",this.renderer.color(a,c,b,this)))},"fill-opacitySetter":function(a,b,c){H(this.renderer.prepVML(["<",b.split("-")[0],' opacity="',a,'"/>']),null,null,c)},opacitySetter:G,rotationSetter:function(a,b,c){c=c.style;this[b]=c[b]=a;c.left=-Math.round(Math.sin(a*y)+1)+"px";c.top=Math.round(Math.cos(a*y))+"px"},strokeSetter:function(a,
b,c){this.setAttr("strokecolor",this.renderer.color(a,c,b,this))},"stroke-widthSetter":function(a,b,c){c.stroked=!!a;this[b]=a;R(a)&&(a+="px");this.setAttr("strokeweight",a)},titleSetter:function(a,b){this.setAttr(b,a)},visibilitySetter:function(a,b,c){"inherit"===a&&(a="visible");this.shadows&&this.shadows.forEach(function(d){d.style[b]=a});"DIV"===c.nodeName&&(a="hidden"===a?"-999em":0,this.docMode8||(c.style[b]=a?"visible":"hidden"),b="top");c.style[b]=a},xSetter:function(a,b,c){this[b]=a;"x"===
b?b="left":"y"===b&&(b="top");this.updateClipping?(this[b]=a,this.updateClipping()):c.style[b]=a},zIndexSetter:function(a,b,c){c.style[b]=a},fillGetter:function(){return this.getAttr("fillcolor")||""},strokeGetter:function(){return this.getAttr("strokecolor")||""},classGetter:function(){return this.getAttr("className")||""}},a["stroke-opacitySetter"]=a["fill-opacitySetter"],p.VMLElement=a=N(h,a),a.prototype.ySetter=a.prototype.widthSetter=a.prototype.heightSetter=a.prototype.xSetter,u={Element:a,
isIE8:-1<v.navigator.userAgent.indexOf("MSIE 8.0"),init:function(a,b,c){this.crispPolyLine=r.prototype.crispPolyLine;this.alignedObjects=[];var d=this.createElement("div").css({position:"relative"});var k=d.element;a.appendChild(d.element);this.isVML=!0;this.box=k;this.boxWrapper=d;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(b,c,!1);if(!n.namespaces.hcv){n.namespaces.add("hcv","urn:schemas-microsoft-com:vml");try{n.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}catch(z){n.styleSheets[0].cssText+=
"hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}}},isHidden:function(){return!this.box.offsetWidth},clipRect:function(a,c,l,e){var d=this.createElement(),k=b(a);return K(d,{members:[],count:0,left:(k?a.x:a)+1,top:(k?a.y:c)+1,width:(k?a.width:l)-1,height:(k?a.height:e)-1,getCSS:function(a){var d=a.element,b=d.nodeName,c=a.inverted,k=this.top-("shape"===b?d.offsetTop:0),l=this.left;d=l+this.width;var e=k+this.height;k={clip:"rect("+Math.round(c?
l:k)+"px,"+Math.round(c?e:d)+"px,"+Math.round(c?d:e)+"px,"+Math.round(c?k:l)+"px)"};!c&&a.docMode8&&"DIV"===b&&K(k,{width:d+"px",height:e+"px"});return k},updateClipping:function(){d.members.forEach(function(a){a.element&&a.css(d.getCSS(a))})}})},color:function(a,b,c,e){var d=this,k=/^rgba/,l,g,f="none";a&&a.linearGradient?g="gradient":a&&a.radialGradient&&(g="pattern");if(g){var h,m,q=a.linearGradient||a.radialGradient,n,p,r,u,v="";a=a.stops;var x=[],y=function(){l=['<fill colors="'+x.join(",")+
'" opacity="',p,'" o:opacity2="',n,'" type="',g,'" ',v,'focus="100%" method="any" />'];H(d.prepVML(l),null,null,b)};var A=a[0];var C=a[a.length-1];0<A[0]&&a.unshift([0,A[1]]);1>C[0]&&a.push([1,C[1]]);a.forEach(function(a,b){k.test(a[1])?(M=t(a[1]),h=M.get("rgb"),m=M.get("a")):(h=a[1],m=1);x.push(100*a[0]+"% "+h);b?(p=m,r=h):(n=m,u=h)});if("fill"===c)if("gradient"===g)c=q.x1||q[0]||0,a=q.y1||q[1]||0,A=q.x2||q[2]||0,q=q.y2||q[3]||0,v='angle="'+(90-180*Math.atan((q-a)/(A-c))/Math.PI)+'"',y();else{f=
q.r;var D=2*f,F=2*f,G=q.cx,J=q.cy,I=b.radialReference,K;f=function(){I&&(K=e.getBBox(),G+=(I[0]-K.x)/K.width-.5,J+=(I[1]-K.y)/K.height-.5,D*=I[2]/K.width,F*=I[2]/K.height);v='src="'+O().global.VMLRadialGradientURL+'" size="'+D+","+F+'" origin="0.5,0.5" position="'+G+","+J+'" color2="'+u+'" ';y()};e.added?f():e.onAdd=f;f=r}else f=h}else if(k.test(a)&&"IMG"!==b.tagName){var M=t(a);e[c+"-opacitySetter"](M.get("a"),c,b);f=M.get("rgb")}else f=b.getElementsByTagName(c),f.length&&(f[0].opacity=1,f[0].type=
"solid"),f=a;return f},prepVML:function(a){var b=this.isIE8;a=a.join("");b?(a=a.replace("/>",' xmlns="urn:schemas-microsoft-com:vml" />'),a=-1===a.indexOf('style="')?a.replace("/>",' style="display:inline-block;behavior:url(#default#VML);" />'):a.replace('style="','style="display:inline-block;behavior:url(#default#VML);')):a=a.replace("<","<hcv:");return a},text:r.prototype.html,path:function(a){var d={coordsize:"10 10"};m(a)?d.d=a:b(a)&&K(d,a);return this.createElement("shape").attr(d)},circle:function(a,
c,e){var d=this.symbol("circle");b(a)&&(e=a.r,c=a.y,a=a.x);d.isCircle=!0;d.r=e;return d.attr({x:a,y:c})},g:function(a){var b;a&&(b={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement("div").attr(b)},image:function(a,b,c,e,f){var d=this.createElement("img").attr({src:a});1<arguments.length&&d.attr({x:b,y:c,width:e,height:f});return d},createElement:function(a){return"rect"===a?this.symbol(a):r.prototype.createElement.call(this,a)},invertChild:function(a,b){var d=this;b=b.style;
var c="IMG"===a.tagName&&a.style;I(a,{flip:"x",left:g(b.width)-(c?g(c.top):1),top:g(b.height)-(c?g(c.left):1),rotation:-90});[].forEach.call(a.childNodes,function(b){d.invertChild(b,a)})},symbols:{arc:function(a,b,c,e,f){var d=f.start,k=f.end,g=f.r||c||e;c=f.innerR;e=Math.cos(d);var h=Math.sin(d),l=Math.cos(k),m=Math.sin(k);if(0===k-d)return["x"];d=["wa",a-g,b-g,a+g,b+g,a+g*e,b+g*h,a+g*l,b+g*m];f.open&&!c&&d.push("e","M",a,b);d.push("at",a-c,b-c,a+c,b+c,a+c*l,b+c*m,a+c*e,b+c*h,"x","e");d.isArc=!0;
return d},circle:function(a,b,c,e,f){f&&F(f.r)&&(c=e=2*f.r);f&&f.isCircle&&(a-=c/2,b-=e/2);return["wa",a,b,a+c,b+e,a+c,b+e/2,a+c,b+e/2,"e"]},rect:function(a,b,c,e,f){return r.prototype.symbols[F(f)&&f.r?"callout":"square"].call(0,a,b,c,e,f)}}},p.VMLRenderer=a=function(){this.init.apply(this,arguments)},a.prototype=A(a.prototype,r.prototype,u),p.Renderer=a,f.compose(a,r));r.prototype.getSpanWidth=function(a,b){var c=a.getBBox(!0).width;!C&&this.forExport&&(c=this.measureSpanWidth(b.firstChild.data,
a.styles));return c};r.prototype.measureSpanWidth=function(a,b){var c=n.createElement("span");a=n.createTextNode(a);c.appendChild(a);I(c,b);this.box.appendChild(c);b=c.offsetWidth;J(c);return b}});C(a,"masters/modules/oldie.src.js",[],function(){})});
//# sourceMappingURL=oldie.js.map