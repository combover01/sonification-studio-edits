/*
 Highcharts JS v8.2.0 (2020-08-27)

 (c) 2014-2019 Highsoft AS
 Authors: Jon Arild Nygard / Oystein Moseng

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/treemap",["highcharts"],function(n){a(n);a.Highcharts=n;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function n(a,c,g,r){a.hasOwnProperty(c)||(a[c]=r.apply(null,g))}a=a?a._modules:{};n(a,"Mixins/ColorMapSeries.js",[a["Core/Globals.js"],a["Core/Series/Point.js"],a["Core/Utilities.js"]],function(a,c,g){var r=g.defined;
return{colorMapPointMixin:{dataLabelOnNull:!0,isValid:function(){return null!==this.value&&Infinity!==this.value&&-Infinity!==this.value},setState:function(a){c.prototype.setState.call(this,a);this.graphic&&this.graphic.attr({zIndex:"hover"===a?1:0})}},colorMapSeriesMixin:{pointArrayMap:["value"],axisTypes:["xAxis","yAxis","colorAxis"],trackerGroups:["group","markerGroup","dataLabelsGroup"],getSymbol:a.noop,parallelArrays:["x","y","value"],colorKey:"value",pointAttribs:a.seriesTypes.column.prototype.pointAttribs,
colorAttribs:function(a){var g={};r(a.color)&&(g[this.colorProp||"fill"]=a.color);return g}}}});n(a,"Mixins/TreeSeries.js",[a["Core/Color.js"],a["Core/Utilities.js"]],function(a,c){var g=c.extend,r=c.isArray,x=c.isNumber,h=c.isObject,v=c.merge,k=c.pick;return{getColor:function(g,f){var y=f.index,G=f.mapOptionsToLevel,c=f.parentColor,h=f.parentColorIndex,C=f.series,p=f.colors,K=f.siblings,q=C.points,r=C.chart.options.chart,u;if(g){q=q[g.i];g=G[g.level]||{};if(G=q&&g.colorByPoint){var x=q.index%(p?
p.length:r.colorCount);var v=p&&p[x]}if(!C.chart.styledMode){p=q&&q.options.color;r=g&&g.color;if(u=c)u=(u=g&&g.colorVariation)&&"brightness"===u.key?a.parse(c).brighten(y/K*u.to).get():c;u=k(p,r,v,u,C.color)}var n=k(q&&q.options.colorIndex,g&&g.colorIndex,x,h,f.colorIndex)}return{color:u,colorIndex:n}},getLevelOptions:function(a){var f=null;if(h(a)){f={};var k=x(a.from)?a.from:1;var c=a.levels;var B={};var n=h(a.defaults)?a.defaults:{};r(c)&&(B=c.reduce(function(a,f){if(h(f)&&x(f.level)){var c=v({},
f);var y="boolean"===typeof c.levelIsConstant?c.levelIsConstant:n.levelIsConstant;delete c.levelIsConstant;delete c.level;f=f.level+(y?0:k-1);h(a[f])?g(a[f],c):a[f]=c}return a},{}));c=x(a.to)?a.to:1;for(a=0;a<=c;a++)f[a]=v({},n,h(B[a])?B[a]:{})}return f},setTreeValues:function A(a,c){var f=c.before,h=c.idRoot,r=c.mapIdToNode[h],p=c.points[a.i],x=p&&p.options||{},q=0,n=[];g(a,{levelDynamic:a.level-(("boolean"===typeof c.levelIsConstant?c.levelIsConstant:1)?0:r.level),name:k(p&&p.name,""),visible:h===
a.id||("boolean"===typeof c.visible?c.visible:!1)});"function"===typeof f&&(a=f(a,c));a.children.forEach(function(f,k){var h=g({},c);g(h,{index:k,siblings:a.children.length,visible:a.visible});f=A(f,h);n.push(f);f.visible&&(q+=f.val)});a.visible=0<q||a.visible;f=k(x.value,q);g(a,{children:n,childrenTotal:q,isLeaf:a.visible&&!q,val:f});return a},updateRootId:function(a){if(h(a)){var c=h(a.options)?a.options:{};c=k(a.rootNode,c.rootId,"");h(a.userOptions)&&(a.userOptions.rootId=c);a.rootNode=c}return c}}});
n(a,"Mixins/DrawPoint.js",[],function(){var a=function(a){return"function"===typeof a},c=function(c){var g,n=this,h=n.graphic,v=c.animatableAttribs,k=c.onComplete,G=c.css,f=c.renderer,y=null===(g=n.series)||void 0===g?void 0:g.options.animation;if(n.shouldDraw())h||(n.graphic=h=f[c.shapeType](c.shapeArgs).add(c.group)),h.css(G).attr(c.attribs).animate(v,c.isNew?!1:y,k);else if(h){var A=function(){n.graphic=h=h.destroy();a(k)&&k()};Object.keys(v).length?h.animate(v,void 0,function(){A()}):A()}};return{draw:c,
drawPoint:function(a){(a.attribs=a.attribs||{})["class"]=this.getClassName();c.call(this,a)},isFn:a}});n(a,"Series/TreemapSeries.js",[a["Core/Globals.js"],a["Mixins/ColorMapSeries.js"],a["Mixins/TreeSeries.js"],a["Mixins/DrawPoint.js"],a["Core/Color.js"],a["Mixins/LegendSymbol.js"],a["Core/Series/Point.js"],a["Core/Utilities.js"]],function(a,c,g,n,x,h,v,k){var r=c.colorMapSeriesMixin,f=g.getColor,y=g.getLevelOptions,A=g.updateRootId,B=x.parse,J=k.addEvent,C=k.correctFloat,p=k.defined,K=k.error,q=
k.extend,P=k.fireEvent,u=k.isArray,O=k.isNumber,Q=k.isObject,H=k.isString,D=k.merge,R=k.objectEach,w=k.pick;c=k.seriesType;var S=k.stableSort,L=a.seriesTypes;k=a.noop;var E=a.Series,T=function(b,d,e){e=e||this;R(b,function(a,m){d.call(e,a,m,b)})},I=function(b,d,e){e=e||this;b=d.call(e,b);!1!==b&&I(b,d,e)},M=!1;c("treemap","scatter",{allowTraversingTree:!1,animationLimit:250,showInLegend:!1,marker:!1,colorByPoint:!1,dataLabels:{defer:!1,enabled:!0,formatter:function(){var b=this&&this.point?this.point:
{};return H(b.name)?b.name:""},inside:!0,verticalAlign:"middle"},tooltip:{headerFormat:"",pointFormat:"<b>{point.name}</b>: {point.value}<br/>"},ignoreHiddenPoint:!0,layoutAlgorithm:"sliceAndDice",layoutStartingDirection:"vertical",alternateStartingDirection:!1,levelIsConstant:!0,drillUpButton:{position:{align:"right",x:-10,y:10}},traverseUpButton:{position:{align:"right",x:-10,y:10}},borderColor:"#e6e6e6",borderWidth:1,colorKey:"colorValue",opacity:.15,states:{hover:{borderColor:"#999999",brightness:L.heatmap?
0:.1,halo:!1,opacity:.75,shadow:!1}}},{pointArrayMap:["value"],directTouch:!0,optionalAxis:"colorAxis",getSymbol:k,parallelArrays:["x","y","value","colorValue"],colorKey:"colorValue",trackerGroups:["group","dataLabelsGroup"],getListOfParents:function(b,d){b=u(b)?b:[];var e=u(d)?d:[];d=b.reduce(function(b,d,e){d=w(d.parent,"");"undefined"===typeof b[d]&&(b[d]=[]);b[d].push(e);return b},{"":[]});T(d,function(b,d,a){""!==d&&-1===e.indexOf(d)&&(b.forEach(function(b){a[""].push(b)}),delete a[d])});return d},
getTree:function(){var b=this.data.map(function(b){return b.id});b=this.getListOfParents(this.data,b);this.nodeMap=[];return this.buildNode("",-1,0,b,null)},hasData:function(){return!!this.processedXData.length},init:function(b,d){r&&(this.colorAttribs=r.colorAttribs);var e=J(this,"setOptions",function(b){b=b.userOptions;p(b.allowDrillToNode)&&!p(b.allowTraversingTree)&&(b.allowTraversingTree=b.allowDrillToNode,delete b.allowDrillToNode);p(b.drillUpButton)&&!p(b.traverseUpButton)&&(b.traverseUpButton=
b.drillUpButton,delete b.drillUpButton)});E.prototype.init.call(this,b,d);delete this.opacity;this.eventsToUnbind.push(e);this.options.allowTraversingTree&&this.eventsToUnbind.push(J(this,"click",this.onClickDrillToNode))},buildNode:function(b,d,e,a,m){var c=this,l=[],t=c.points[d],N=0,F;(a[b]||[]).forEach(function(d){F=c.buildNode(c.points[d].id,d,e+1,a,b);N=Math.max(F.height+1,N);l.push(F)});d={id:b,i:d,children:l,height:N,level:e,parent:m,visible:!1};c.nodeMap[d.id]=d;t&&(t.node=d);return d},setTreeValues:function(b){var d=
this,e=d.options,a=d.nodeMap[d.rootNode];e="boolean"===typeof e.levelIsConstant?e.levelIsConstant:!0;var m=0,c=[],l=d.points[b.i];b.children.forEach(function(b){b=d.setTreeValues(b);c.push(b);b.ignore||(m+=b.val)});S(c,function(b,d){return b.sortIndex-d.sortIndex});var z=w(l&&l.options.value,m);l&&(l.value=z);q(b,{children:c,childrenTotal:m,ignore:!(w(l&&l.visible,!0)&&0<z),isLeaf:b.visible&&!m,levelDynamic:b.level-(e?0:a.level),name:w(l&&l.name,""),sortIndex:w(l&&l.sortIndex,-z),val:z});return b},
calculateChildrenAreas:function(b,d){var e=this,a=e.options,m=e.mapOptionsToLevel[b.level+1],c=w(e[m&&m.layoutAlgorithm]&&m.layoutAlgorithm,a.layoutAlgorithm),l=a.alternateStartingDirection,z=[];b=b.children.filter(function(b){return!b.ignore});m&&m.layoutStartingDirection&&(d.direction="vertical"===m.layoutStartingDirection?0:1);z=e[c](d,b);b.forEach(function(b,a){a=z[a];b.values=D(a,{val:b.childrenTotal,direction:l?1-d.direction:d.direction});b.pointValues=D(a,{x:a.x/e.axisRatio,y:100-a.y-a.height,
width:a.width/e.axisRatio});b.children.length&&e.calculateChildrenAreas(b,b.values)})},setPointValues:function(){var b=this,d=b.xAxis,a=b.yAxis,c=b.chart.styledMode;b.points.forEach(function(e){var m=e.node,l=m.pointValues;m=m.visible;if(l&&m){m=l.height;var t=l.width,f=l.x,F=l.y,g=c?0:(b.pointAttribs(e)["stroke-width"]||0)%2/2;l=Math.round(d.toPixels(f,!0))-g;t=Math.round(d.toPixels(f+t,!0))-g;f=Math.round(a.toPixels(F,!0))-g;m=Math.round(a.toPixels(F+m,!0))-g;e.shapeArgs={x:Math.min(l,t),y:Math.min(f,
m),width:Math.abs(t-l),height:Math.abs(m-f)};e.plotX=e.shapeArgs.x+e.shapeArgs.width/2;e.plotY=e.shapeArgs.y+e.shapeArgs.height/2}else delete e.plotX,delete e.plotY})},setColorRecursive:function(b,d,a,c,m){var e=this,l=e&&e.chart;l=l&&l.options&&l.options.colors;if(b){var t=f(b,{colors:l,index:c,mapOptionsToLevel:e.mapOptionsToLevel,parentColor:d,parentColorIndex:a,series:e,siblings:m});if(d=e.points[b.i])d.color=t.color,d.colorIndex=t.colorIndex;(b.children||[]).forEach(function(d,a){e.setColorRecursive(d,
t.color,t.colorIndex,a,b.children.length)})}},algorithmGroup:function(b,d,e,a){this.height=b;this.width=d;this.plot=a;this.startDirection=this.direction=e;this.lH=this.nH=this.lW=this.nW=this.total=0;this.elArr=[];this.lP={total:0,lH:0,nH:0,lW:0,nW:0,nR:0,lR:0,aspectRatio:function(b,d){return Math.max(b/d,d/b)}};this.addElement=function(b){this.lP.total=this.elArr[this.elArr.length-1];this.total+=b;0===this.direction?(this.lW=this.nW,this.lP.lH=this.lP.total/this.lW,this.lP.lR=this.lP.aspectRatio(this.lW,
this.lP.lH),this.nW=this.total/this.height,this.lP.nH=this.lP.total/this.nW,this.lP.nR=this.lP.aspectRatio(this.nW,this.lP.nH)):(this.lH=this.nH,this.lP.lW=this.lP.total/this.lH,this.lP.lR=this.lP.aspectRatio(this.lP.lW,this.lH),this.nH=this.total/this.width,this.lP.nW=this.lP.total/this.nH,this.lP.nR=this.lP.aspectRatio(this.lP.nW,this.nH));this.elArr.push(b)};this.reset=function(){this.lW=this.nW=0;this.elArr=[];this.total=0}},algorithmCalcPoints:function(b,d,a,c){var e,t,l,f,g=a.lW,k=a.lH,h=a.plot,
n=0,q=a.elArr.length-1;if(d)g=a.nW,k=a.nH;else var p=a.elArr[a.elArr.length-1];a.elArr.forEach(function(b){if(d||n<q)0===a.direction?(e=h.x,t=h.y,l=g,f=b/l):(e=h.x,t=h.y,f=k,l=b/f),c.push({x:e,y:t,width:l,height:C(f)}),0===a.direction?h.y+=f:h.x+=l;n+=1});a.reset();0===a.direction?a.width-=g:a.height-=k;h.y=h.parent.y+(h.parent.height-a.height);h.x=h.parent.x+(h.parent.width-a.width);b&&(a.direction=1-a.direction);d||a.addElement(p)},algorithmLowAspectRatio:function(b,d,a){var e=[],c=this,f,l={x:d.x,
y:d.y,parent:d},g=0,h=a.length-1,k=new this.algorithmGroup(d.height,d.width,d.direction,l);a.forEach(function(a){f=a.val/d.val*d.height*d.width;k.addElement(f);k.lP.nR>k.lP.lR&&c.algorithmCalcPoints(b,!1,k,e,l);g===h&&c.algorithmCalcPoints(b,!0,k,e,l);g+=1});return e},algorithmFill:function(b,d,a){var e=[],c,f=d.direction,l=d.x,g=d.y,h=d.width,k=d.height,n,q,p,r;a.forEach(function(a){c=a.val/d.val*d.height*d.width;n=l;q=g;0===f?(r=k,p=c/r,h-=p,l+=p):(p=h,r=c/p,k-=r,g+=r);e.push({x:n,y:q,width:p,height:r});
b&&(f=1-f)});return e},strip:function(b,a){return this.algorithmLowAspectRatio(!1,b,a)},squarified:function(b,a){return this.algorithmLowAspectRatio(!0,b,a)},sliceAndDice:function(b,a){return this.algorithmFill(!0,b,a)},stripes:function(b,a){return this.algorithmFill(!1,b,a)},translate:function(){var b=this,a=b.options,e=A(b);E.prototype.translate.call(b);var c=b.tree=b.getTree();var m=b.nodeMap[e];b.renderTraverseUpButton(e);b.mapOptionsToLevel=y({from:m.level+1,levels:a.levels,to:c.height,defaults:{levelIsConstant:b.options.levelIsConstant,
colorByPoint:a.colorByPoint}});""===e||m&&m.children.length||(b.setRootNode("",!1),e=b.rootNode,m=b.nodeMap[e]);I(b.nodeMap[b.rootNode],function(a){var d=!1,e=a.parent;a.visible=!0;if(e||""===e)d=b.nodeMap[e];return d});I(b.nodeMap[b.rootNode].children,function(b){var a=!1;b.forEach(function(b){b.visible=!0;b.children.length&&(a=(a||[]).concat(b.children))});return a});b.setTreeValues(c);b.axisRatio=b.xAxis.len/b.yAxis.len;b.nodeMap[""].pointValues=e={x:0,y:0,width:100,height:100};b.nodeMap[""].values=
e=D(e,{width:e.width*b.axisRatio,direction:"vertical"===a.layoutStartingDirection?0:1,val:c.val});b.calculateChildrenAreas(c,e);b.colorAxis||a.colorByPoint||b.setColorRecursive(b.tree);a.allowTraversingTree&&(a=m.pointValues,b.xAxis.setExtremes(a.x,a.x+a.width,!1),b.yAxis.setExtremes(a.y,a.y+a.height,!1),b.xAxis.setScale(),b.yAxis.setScale());b.setPointValues()},drawDataLabels:function(){var b=this,a=b.mapOptionsToLevel,e,c;b.points.filter(function(b){return b.node.visible}).forEach(function(d){c=
a[d.node.level];e={style:{}};d.node.isLeaf||(e.enabled=!1);c&&c.dataLabels&&(e=D(e,c.dataLabels),b._hasPointLabels=!0);d.shapeArgs&&(e.style.width=d.shapeArgs.width,d.dataLabel&&d.dataLabel.css({width:d.shapeArgs.width+"px"}));d.dlOptions=D(e,d.options.dataLabels)});E.prototype.drawDataLabels.call(this)},alignDataLabel:function(b,a,e){var d=e.style;!p(d.textOverflow)&&a.text&&a.getBBox().width>a.text.textWidth&&a.css({textOverflow:"ellipsis",width:d.width+="px"});L.column.prototype.alignDataLabel.apply(this,
arguments);b.dataLabel&&b.dataLabel.attr({zIndex:(b.node.zIndex||0)+1})},pointAttribs:function(b,a){var d=Q(this.mapOptionsToLevel)?this.mapOptionsToLevel:{},c=b&&d[b.node.level]||{};d=this.options;var f=a&&d.states[a]||{},g=b&&b.getClassName()||"";b={stroke:b&&b.borderColor||c.borderColor||f.borderColor||d.borderColor,"stroke-width":w(b&&b.borderWidth,c.borderWidth,f.borderWidth,d.borderWidth),dashstyle:b&&b.borderDashStyle||c.borderDashStyle||f.borderDashStyle||d.borderDashStyle,fill:b&&b.color||
this.color};-1!==g.indexOf("highcharts-above-level")?(b.fill="none",b["stroke-width"]=0):-1!==g.indexOf("highcharts-internal-node-interactive")?(a=w(f.opacity,d.opacity),b.fill=B(b.fill).setOpacity(a).get(),b.cursor="pointer"):-1!==g.indexOf("highcharts-internal-node")?b.fill="none":a&&(b.fill=B(b.fill).brighten(f.brightness).get());return b},drawPoints:function(){var b=this,a=b.chart,e=a.renderer,c=a.styledMode,f=b.options,g=c?{}:f.shadow,h=f.borderRadius,k=a.pointCount<f.animationLimit,n=f.allowTraversingTree;
b.points.forEach(function(a){var d=a.node.levelDynamic,l={},m={},t={},p="level-group-"+d,r=!!a.graphic,v=k&&r,u=a.shapeArgs;a.shouldDraw()&&(h&&(m.r=h),D(!0,v?l:m,r?u:{},c?{}:b.pointAttribs(a,a.selected&&"select")),b.colorAttribs&&c&&q(t,b.colorAttribs(a)),b[p]||(b[p]=e.g(p).attr({zIndex:1E3-d}).add(b.group),b[p].survive=!0));a.draw({animatableAttribs:l,attribs:m,css:t,group:b[p],renderer:e,shadow:g,shapeArgs:u,shapeType:"rect"});n&&a.graphic&&(a.drillId=f.interactByLeaf?b.drillToByLeaf(a):b.drillToByGroup(a))})},
onClickDrillToNode:function(b){var a=(b=b.point)&&b.drillId;H(a)&&(this.isDrillAllowed?this.isDrillAllowed(a):1)&&(b.setState(""),this.setRootNode(a,!0,{trigger:"click"}))},drillToByGroup:function(b){var a=!1;1!==b.node.level-this.nodeMap[this.rootNode].level||b.node.isLeaf||(a=b.id);return a},drillToByLeaf:function(b){var a=!1;if(b.node.parent!==this.rootNode&&b.node.isLeaf)for(b=b.node;!a;)b=this.nodeMap[b.parent],b.parent===this.rootNode&&(a=b.id);return a},drillUp:function(){var b=this.nodeMap[this.rootNode];
b&&H(b.parent)&&this.setRootNode(b.parent,!0,{trigger:"traverseUpButton"})},drillToNode:function(b,a){K(32,!1,void 0,{"treemap.drillToNode":"use treemap.setRootNode"});this.setRootNode(b,a)},setRootNode:function(b,a,e){b=q({newRootId:b,previousRootId:this.rootNode,redraw:w(a,!0),series:this},e);P(this,"setRootNode",b,function(b){var a=b.series;a.idPreviousRoot=b.previousRootId;a.rootNode=b.newRootId;a.isDirty=!0;b.redraw&&a.chart.redraw()})},isDrillAllowed:function(b){var a=this.tree,e=a.children[0];
return!(1===a.children.length&&(""===this.rootNode&&b===e.id||this.rootNode===e.id&&""===b))},renderTraverseUpButton:function(b){var a=this,e=a.nodeMap[b],c=a.options.traverseUpButton,f=w(c.text,e.name,"< Back");""!==b&&(!a.isDrillAllowed||H(e.parent)&&a.isDrillAllowed(e.parent))?this.drillUpButton?(this.drillUpButton.placed=!1,this.drillUpButton.attr({text:f}).align()):(e=(b=c.theme)&&b.states,this.drillUpButton=this.chart.renderer.button(f,null,null,function(){a.drillUp()},b,e&&e.hover,e&&e.select).addClass("highcharts-drillup-button").attr({align:c.position.align,
zIndex:7}).add().align(c.position,!1,c.relativeTo||"plotBox")):a.drillUpButton&&(a.drillUpButton=a.drillUpButton.destroy())},buildKDTree:k,drawLegendSymbol:h.drawRectangle,getExtremes:function(){var b=E.prototype.getExtremes.call(this,this.colorValueData),a=b.dataMax;this.valueMin=b.dataMin;this.valueMax=a;return E.prototype.getExtremes.call(this)},getExtremesFromAll:!0,setState:function(b){this.options.inactiveOtherPoints=!0;E.prototype.setState.call(this,b,!1);this.options.inactiveOtherPoints=!1},
utils:{recursive:I}},{draw:n.drawPoint,setVisible:L.pie.prototype.pointClass.prototype.setVisible,getClassName:function(){var b=v.prototype.getClassName.call(this),a=this.series,c=a.options;this.node.level<=a.nodeMap[a.rootNode].level?b+=" highcharts-above-level":this.node.isLeaf||w(c.interactByLeaf,!c.allowTraversingTree)?this.node.isLeaf||(b+=" highcharts-internal-node"):b+=" highcharts-internal-node-interactive";return b},isValid:function(){return this.id||O(this.value)},setState:function(b){v.prototype.setState.call(this,
b);this.graphic&&this.graphic.attr({zIndex:"hover"===b?1:0})},shouldDraw:function(){return O(this.plotY)&&null!==this.y}});J(a.Series,"afterBindAxes",function(){var b=this.xAxis,a=this.yAxis;if(b&&a)if(this.is("treemap")){var c={endOnTick:!1,gridLineWidth:0,lineWidth:0,min:0,dataMin:0,minPadding:0,max:100,dataMax:100,maxPadding:0,startOnTick:!1,title:null,tickPositions:[]};q(a.options,c);q(b.options,c);M=!0}else M&&(a.setOptions(a.userOptions),b.setOptions(b.userOptions),M=!1)});""});n(a,"masters/modules/treemap.src.js",
[],function(){})});
//# sourceMappingURL=treemap.js.map