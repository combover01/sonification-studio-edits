/*
 Highcharts JS v8.0.0 (2020-02-13)

 (c) 2016-2019 Highsoft AS
 Authors: Jon Arild Nygard

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/sunburst",["highcharts"],function(w){b(w);b.Highcharts=w;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function w(b,c,K,k){b.hasOwnProperty(c)||(b[c]=k.apply(null,K))}b=b?b._modules:{};w(b,"mixins/draw-point.js",[],function(){var b=function(c){var b=this,k=b.graphic,g=c.animatableAttribs,t=c.onComplete,G=c.css,q=c.renderer;
if(b.shouldDraw())k||(b.graphic=k=q[c.shapeType](c.shapeArgs).add(c.group)),k.css(G).attr(c.attribs).animate(g,c.isNew?!1:void 0,t);else if(k){var m=function(){b.graphic=k=k.destroy();"function"===typeof t&&t()};Object.keys(g).length?k.animate(g,void 0,function(){m()}):m()}};return function(c){(c.attribs=c.attribs||{})["class"]=this.getClassName();b.call(this,c)}});w(b,"mixins/tree-series.js",[b["parts/Color.js"],b["parts/Utilities.js"]],function(b,c){var t=c.extend,k=c.isArray,g=c.isNumber,z=c.isObject,
G=c.merge,q=c.pick;return{getColor:function(m,c){var C=c.index,F=c.mapOptionsToLevel,g=c.parentColor,t=c.parentColorIndex,k=c.series,v=c.colors,D=c.siblings,A=k.points,r=k.chart.options.chart,y;if(m){A=A[m.i];m=F[m.level]||{};if(F=A&&m.colorByPoint){var z=A.index%(v?v.length:r.colorCount);var G=v&&v[z]}if(!k.chart.styledMode){v=A&&A.options.color;r=m&&m.color;if(y=g)y=(y=m&&m.colorVariation)&&"brightness"===y.key?b.parse(g).brighten(C/D*y.to).get():g;y=q(v,r,G,y,k.color)}var w=q(A&&A.options.colorIndex,
m&&m.colorIndex,z,t,c.colorIndex)}return{color:y,colorIndex:w}},getLevelOptions:function(c){var b=null;if(z(c)){b={};var C=g(c.from)?c.from:1;var m=c.levels;var q={};var w=z(c.defaults)?c.defaults:{};k(m)&&(q=m.reduce(function(c,b){if(z(b)&&g(b.level)){var m=G({},b);var F="boolean"===typeof m.levelIsConstant?m.levelIsConstant:w.levelIsConstant;delete m.levelIsConstant;delete m.level;b=b.level+(F?0:C-1);z(c[b])?t(c[b],m):c[b]=m}return c},{}));m=g(c.to)?c.to:1;for(c=0;c<=m;c++)b[c]=G({},w,z(q[c])?q[c]:
{})}return b},setTreeValues:function L(c,b){var g=b.before,k=b.idRoot,C=b.mapIdToNode[k],v=b.points[c.i],z=v&&v.options||{},A=0,r=[];t(c,{levelDynamic:c.level-(("boolean"===typeof b.levelIsConstant?b.levelIsConstant:1)?0:C.level),name:q(v&&v.name,""),visible:k===c.id||("boolean"===typeof b.visible?b.visible:!1)});"function"===typeof g&&(c=g(c,b));c.children.forEach(function(g,k){var q=t({},b);t(q,{index:k,siblings:c.children.length,visible:c.visible});g=L(g,q);r.push(g);g.visible&&(A+=g.val)});c.visible=
0<A||c.visible;g=q(z.value,A);t(c,{children:r,childrenTotal:A,isLeaf:c.visible&&!A,val:g});return c},updateRootId:function(c){if(z(c)){var b=z(c.options)?c.options:{};b=q(c.rootNode,b.rootId,"");z(c.userOptions)&&(c.userOptions.rootId=b);c.rootNode=b}return b}}});w(b,"modules/treemap.src.js",[b["parts/Globals.js"],b["mixins/tree-series.js"],b["mixins/draw-point.js"],b["parts/Color.js"],b["parts/Utilities.js"]],function(b,c,w,k,g){var z=k.parse,t=g.addEvent,q=g.correctFloat,m=g.defined,F=g.error,C=
g.extend,L=g.fireEvent,I=g.isArray,N=g.isNumber,K=g.isObject,v=g.isString,D=g.merge,A=g.objectEach,r=g.pick,y=g.stableSort;k=b.seriesType;var M=b.seriesTypes;g=b.noop;var O=c.getColor,P=c.getLevelOptions,E=b.Series,R=function(a,d,e){e=e||this;A(a,function(u,l){d.call(e,u,l,a)})},f=function(a,d,e){e=e||this;a=d.call(e,a);!1!==a&&f(a,d,e)},p=c.updateRootId,h=!1;k("treemap","scatter",{allowTraversingTree:!1,animationLimit:250,showInLegend:!1,marker:!1,colorByPoint:!1,dataLabels:{defer:!1,enabled:!0,
formatter:function(){var a=this&&this.point?this.point:{};return v(a.name)?a.name:""},inside:!0,verticalAlign:"middle"},tooltip:{headerFormat:"",pointFormat:"<b>{point.name}</b>: {point.value}<br/>"},ignoreHiddenPoint:!0,layoutAlgorithm:"sliceAndDice",layoutStartingDirection:"vertical",alternateStartingDirection:!1,levelIsConstant:!0,drillUpButton:{position:{align:"right",x:-10,y:10}},traverseUpButton:{position:{align:"right",x:-10,y:10}},borderColor:"#e6e6e6",borderWidth:1,colorKey:"colorValue",
opacity:.15,states:{hover:{borderColor:"#999999",brightness:M.heatmap?0:.1,halo:!1,opacity:.75,shadow:!1}}},{pointArrayMap:["value"],directTouch:!0,optionalAxis:"colorAxis",getSymbol:g,parallelArrays:["x","y","value","colorValue"],colorKey:"colorValue",trackerGroups:["group","dataLabelsGroup"],getListOfParents:function(a,d){a=I(a)?a:[];var e=I(d)?d:[];d=a.reduce(function(a,d,e){d=r(d.parent,"");"undefined"===typeof a[d]&&(a[d]=[]);a[d].push(e);return a},{"":[]});R(d,function(a,d,f){""!==d&&-1===e.indexOf(d)&&
(a.forEach(function(a){f[""].push(a)}),delete f[d])});return d},getTree:function(){var a=this.data.map(function(a){return a.id});a=this.getListOfParents(this.data,a);this.nodeMap=[];return this.buildNode("",-1,0,a,null)},hasData:function(){return!!this.processedXData.length},init:function(a,d){var e=b.colorMapSeriesMixin;e&&(this.colorAttribs=e.colorAttribs);this.eventsToUnbind.push(t(this,"setOptions",function(a){a=a.userOptions;m(a.allowDrillToNode)&&!m(a.allowTraversingTree)&&(a.allowTraversingTree=
a.allowDrillToNode,delete a.allowDrillToNode);m(a.drillUpButton)&&!m(a.traverseUpButton)&&(a.traverseUpButton=a.drillUpButton,delete a.drillUpButton)}));E.prototype.init.call(this,a,d);this.options.allowTraversingTree&&this.eventsToUnbind.push(t(this,"click",this.onClickDrillToNode))},buildNode:function(a,d,e,f,l){var c=this,u=[],b=c.points[d],p=0,n;(f[a]||[]).forEach(function(d){n=c.buildNode(c.points[d].id,d,e+1,f,a);p=Math.max(n.height+1,p);u.push(n)});d={id:a,i:d,children:u,height:p,level:e,parent:l,
visible:!1};c.nodeMap[d.id]=d;b&&(b.node=d);return d},setTreeValues:function(a){var d=this,e=d.options,f=d.nodeMap[d.rootNode];e="boolean"===typeof e.levelIsConstant?e.levelIsConstant:!0;var l=0,c=[],b=d.points[a.i];a.children.forEach(function(a){a=d.setTreeValues(a);c.push(a);a.ignore||(l+=a.val)});y(c,function(a,d){return a.sortIndex-d.sortIndex});var B=r(b&&b.options.value,l);b&&(b.value=B);C(a,{children:c,childrenTotal:l,ignore:!(r(b&&b.visible,!0)&&0<B),isLeaf:a.visible&&!l,levelDynamic:a.level-
(e?0:f.level),name:r(b&&b.name,""),sortIndex:r(b&&b.sortIndex,-B),val:B});return a},calculateChildrenAreas:function(a,d){var e=this,f=e.options,l=e.mapOptionsToLevel[a.level+1],c=r(e[l&&l.layoutAlgorithm]&&l.layoutAlgorithm,f.layoutAlgorithm),b=f.alternateStartingDirection,B=[];a=a.children.filter(function(a){return!a.ignore});l&&l.layoutStartingDirection&&(d.direction="vertical"===l.layoutStartingDirection?0:1);B=e[c](d,a);a.forEach(function(a,l){l=B[l];a.values=D(l,{val:a.childrenTotal,direction:b?
1-d.direction:d.direction});a.pointValues=D(l,{x:l.x/e.axisRatio,y:100-l.y-l.height,width:l.width/e.axisRatio});a.children.length&&e.calculateChildrenAreas(a,a.values)})},setPointValues:function(){var a=this,d=a.xAxis,e=a.yAxis,f=a.chart.styledMode;a.points.forEach(function(l){var c=l.node,b=c.pointValues;c=c.visible;if(b&&c){c=b.height;var u=b.width,p=b.x,n=b.y,h=f?0:(a.pointAttribs(l)["stroke-width"]||0)%2/2;b=Math.round(d.toPixels(p,!0))-h;u=Math.round(d.toPixels(p+u,!0))-h;p=Math.round(e.toPixels(n,
!0))-h;c=Math.round(e.toPixels(n+c,!0))-h;l.shapeArgs={x:Math.min(b,u),y:Math.min(p,c),width:Math.abs(u-b),height:Math.abs(c-p)};l.plotX=l.shapeArgs.x+l.shapeArgs.width/2;l.plotY=l.shapeArgs.y+l.shapeArgs.height/2}else delete l.plotX,delete l.plotY})},setColorRecursive:function(a,d,e,c,l){var f=this,b=f&&f.chart;b=b&&b.options&&b.options.colors;if(a){var u=O(a,{colors:b,index:c,mapOptionsToLevel:f.mapOptionsToLevel,parentColor:d,parentColorIndex:e,series:f,siblings:l});if(d=f.points[a.i])d.color=
u.color,d.colorIndex=u.colorIndex;(a.children||[]).forEach(function(d,e){f.setColorRecursive(d,u.color,u.colorIndex,e,a.children.length)})}},algorithmGroup:function(a,d,e,c){this.height=a;this.width=d;this.plot=c;this.startDirection=this.direction=e;this.lH=this.nH=this.lW=this.nW=this.total=0;this.elArr=[];this.lP={total:0,lH:0,nH:0,lW:0,nW:0,nR:0,lR:0,aspectRatio:function(a,d){return Math.max(a/d,d/a)}};this.addElement=function(a){this.lP.total=this.elArr[this.elArr.length-1];this.total+=a;0===
this.direction?(this.lW=this.nW,this.lP.lH=this.lP.total/this.lW,this.lP.lR=this.lP.aspectRatio(this.lW,this.lP.lH),this.nW=this.total/this.height,this.lP.nH=this.lP.total/this.nW,this.lP.nR=this.lP.aspectRatio(this.nW,this.lP.nH)):(this.lH=this.nH,this.lP.lW=this.lP.total/this.lH,this.lP.lR=this.lP.aspectRatio(this.lP.lW,this.lH),this.nH=this.total/this.width,this.lP.nW=this.lP.total/this.nH,this.lP.nR=this.lP.aspectRatio(this.lP.nW,this.nH));this.elArr.push(a)};this.reset=function(){this.lW=this.nW=
0;this.elArr=[];this.total=0}},algorithmCalcPoints:function(a,d,e,c){var f,b,u,p,h=e.lW,n=e.lH,g=e.plot,m=0,k=e.elArr.length-1;if(d)h=e.nW,n=e.nH;else var t=e.elArr[e.elArr.length-1];e.elArr.forEach(function(a){if(d||m<k)0===e.direction?(f=g.x,b=g.y,u=h,p=a/u):(f=g.x,b=g.y,p=n,u=a/p),c.push({x:f,y:b,width:u,height:q(p)}),0===e.direction?g.y+=p:g.x+=u;m+=1});e.reset();0===e.direction?e.width-=h:e.height-=n;g.y=g.parent.y+(g.parent.height-e.height);g.x=g.parent.x+(g.parent.width-e.width);a&&(e.direction=
1-e.direction);d||e.addElement(t)},algorithmLowAspectRatio:function(a,d,e){var c=[],f=this,b,p={x:d.x,y:d.y,parent:d},g=0,h=e.length-1,n=new this.algorithmGroup(d.height,d.width,d.direction,p);e.forEach(function(e){b=e.val/d.val*d.height*d.width;n.addElement(b);n.lP.nR>n.lP.lR&&f.algorithmCalcPoints(a,!1,n,c,p);g===h&&f.algorithmCalcPoints(a,!0,n,c,p);g+=1});return c},algorithmFill:function(a,d,e){var c=[],f,b=d.direction,p=d.x,g=d.y,h=d.width,n=d.height,m,k,q,t;e.forEach(function(e){f=e.val/d.val*
d.height*d.width;m=p;k=g;0===b?(t=n,q=f/t,h-=q,p+=q):(q=h,t=f/q,n-=t,g+=t);c.push({x:m,y:k,width:q,height:t});a&&(b=1-b)});return c},strip:function(a,d){return this.algorithmLowAspectRatio(!1,a,d)},squarified:function(a,d){return this.algorithmLowAspectRatio(!0,a,d)},sliceAndDice:function(a,d){return this.algorithmFill(!0,a,d)},stripes:function(a,d){return this.algorithmFill(!1,a,d)},translate:function(){var a=this,d=a.options,e=p(a);E.prototype.translate.call(a);var c=a.tree=a.getTree();var b=a.nodeMap[e];
a.renderTraverseUpButton(e);a.mapOptionsToLevel=P({from:b.level+1,levels:d.levels,to:c.height,defaults:{levelIsConstant:a.options.levelIsConstant,colorByPoint:d.colorByPoint}});""===e||b&&b.children.length||(a.setRootNode("",!1),e=a.rootNode,b=a.nodeMap[e]);f(a.nodeMap[a.rootNode],function(d){var e=!1,c=d.parent;d.visible=!0;if(c||""===c)e=a.nodeMap[c];return e});f(a.nodeMap[a.rootNode].children,function(a){var d=!1;a.forEach(function(a){a.visible=!0;a.children.length&&(d=(d||[]).concat(a.children))});
return d});a.setTreeValues(c);a.axisRatio=a.xAxis.len/a.yAxis.len;a.nodeMap[""].pointValues=e={x:0,y:0,width:100,height:100};a.nodeMap[""].values=e=D(e,{width:e.width*a.axisRatio,direction:"vertical"===d.layoutStartingDirection?0:1,val:c.val});a.calculateChildrenAreas(c,e);a.colorAxis||d.colorByPoint||a.setColorRecursive(a.tree);d.allowTraversingTree&&(d=b.pointValues,a.xAxis.setExtremes(d.x,d.x+d.width,!1),a.yAxis.setExtremes(d.y,d.y+d.height,!1),a.xAxis.setScale(),a.yAxis.setScale());a.setPointValues()},
drawDataLabels:function(){var a=this,d=a.mapOptionsToLevel,e,c;a.points.filter(function(a){return a.node.visible}).forEach(function(b){c=d[b.node.level];e={style:{}};b.node.isLeaf||(e.enabled=!1);c&&c.dataLabels&&(e=D(e,c.dataLabels),a._hasPointLabels=!0);b.shapeArgs&&(e.style.width=b.shapeArgs.width,b.dataLabel&&b.dataLabel.css({width:b.shapeArgs.width+"px"}));b.dlOptions=D(e,b.options.dataLabels)});E.prototype.drawDataLabels.call(this)},alignDataLabel:function(a,d,e){var c=e.style;!m(c.textOverflow)&&
d.text&&d.getBBox().width>d.text.textWidth&&d.css({textOverflow:"ellipsis",width:c.width+="px"});M.column.prototype.alignDataLabel.apply(this,arguments);a.dataLabel&&a.dataLabel.attr({zIndex:(a.node.zIndex||0)+1})},pointAttribs:function(a,d){var e=K(this.mapOptionsToLevel)?this.mapOptionsToLevel:{},c=a&&e[a.node.level]||{};e=this.options;var b=d&&e.states[d]||{},f=a&&a.getClassName()||"";a={stroke:a&&a.borderColor||c.borderColor||b.borderColor||e.borderColor,"stroke-width":r(a&&a.borderWidth,c.borderWidth,
b.borderWidth,e.borderWidth),dashstyle:a&&a.borderDashStyle||c.borderDashStyle||b.borderDashStyle||e.borderDashStyle,fill:a&&a.color||this.color};-1!==f.indexOf("highcharts-above-level")?(a.fill="none",a["stroke-width"]=0):-1!==f.indexOf("highcharts-internal-node-interactive")?(d=r(b.opacity,e.opacity),a.fill=z(a.fill).setOpacity(d).get(),a.cursor="pointer"):-1!==f.indexOf("highcharts-internal-node")?a.fill="none":d&&(a.fill=z(a.fill).brighten(b.brightness).get());return a},drawPoints:function(){var a=
this,d=a.chart,e=d.renderer,c=d.styledMode,b=a.options,f=c?{}:b.shadow,p=b.borderRadius,g=d.pointCount<b.animationLimit,h=b.allowTraversingTree;a.points.forEach(function(d){var l=d.node.levelDynamic,u={},m={},n={},k="level-group-"+l,J=!!d.graphic,S=g&&J,q=d.shapeArgs;d.shouldDraw()&&(p&&(m.r=p),D(!0,S?u:m,J?q:{},c?{}:a.pointAttribs(d,d.selected&&"select")),a.colorAttribs&&c&&C(n,a.colorAttribs(d)),a[k]||(a[k]=e.g(k).attr({zIndex:1E3-l}).add(a.group),a[k].survive=!0));d.draw({animatableAttribs:u,attribs:m,
css:n,group:a[k],renderer:e,shadow:f,shapeArgs:q,shapeType:"rect"});h&&d.graphic&&(d.drillId=b.interactByLeaf?a.drillToByLeaf(d):a.drillToByGroup(d))})},onClickDrillToNode:function(a){var d=(a=a.point)&&a.drillId;v(d)&&(a.setState(""),this.setRootNode(d,!0,{trigger:"click"}))},drillToByGroup:function(a){var d=!1;1!==a.node.level-this.nodeMap[this.rootNode].level||a.node.isLeaf||(d=a.id);return d},drillToByLeaf:function(a){var d=!1;if(a.node.parent!==this.rootNode&&a.node.isLeaf)for(a=a.node;!d;)a=
this.nodeMap[a.parent],a.parent===this.rootNode&&(d=a.id);return d},drillUp:function(){var a=this.nodeMap[this.rootNode];a&&v(a.parent)&&this.setRootNode(a.parent,!0,{trigger:"traverseUpButton"})},drillToNode:function(a,d){F("WARNING: treemap.drillToNode has been renamed to treemap.setRootNode, and will be removed in the next major version.");this.setRootNode(a,d)},setRootNode:function(a,d,e){a=C({newRootId:a,previousRootId:this.rootNode,redraw:r(d,!0),series:this},e);L(this,"setRootNode",a,function(a){var d=
a.series;d.idPreviousRoot=a.previousRootId;d.rootNode=a.newRootId;d.isDirty=!0;a.redraw&&d.chart.redraw()})},renderTraverseUpButton:function(a){var d=this,e=d.options.traverseUpButton,c=r(e.text,d.nodeMap[a].name,"< Back");if(""===a)d.drillUpButton&&(d.drillUpButton=d.drillUpButton.destroy());else if(this.drillUpButton)this.drillUpButton.placed=!1,this.drillUpButton.attr({text:c}).align();else{var b=(a=e.theme)&&a.states;this.drillUpButton=this.chart.renderer.button(c,null,null,function(){d.drillUp()},
a,b&&b.hover,b&&b.select).addClass("highcharts-drillup-button").attr({align:e.position.align,zIndex:7}).add().align(e.position,!1,e.relativeTo||"plotBox")}},buildKDTree:g,drawLegendSymbol:b.LegendSymbolMixin.drawRectangle,getExtremes:function(){E.prototype.getExtremes.call(this,this.colorValueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;E.prototype.getExtremes.call(this)},getExtremesFromAll:!0,setState:function(a){this.options.inactiveOtherPoints=!0;E.prototype.setState.call(this,a,
!1);this.options.inactiveOtherPoints=!1},utils:{recursive:f}},{draw:w,setVisible:M.pie.prototype.pointClass.prototype.setVisible,getClassName:function(){var a=b.Point.prototype.getClassName.call(this),d=this.series,e=d.options;this.node.level<=d.nodeMap[d.rootNode].level?a+=" highcharts-above-level":this.node.isLeaf||r(e.interactByLeaf,!e.allowTraversingTree)?this.node.isLeaf||(a+=" highcharts-internal-node"):a+=" highcharts-internal-node-interactive";return a},isValid:function(){return this.id||
N(this.value)},setState:function(a){b.Point.prototype.setState.call(this,a);this.graphic&&this.graphic.attr({zIndex:"hover"===a?1:0})},shouldDraw:function(){return N(this.plotY)&&null!==this.y}});t(b.Series,"afterBindAxes",function(){var a=this.xAxis,d=this.yAxis;if(a&&d)if(this.is("treemap")){var e={endOnTick:!1,gridLineWidth:0,lineWidth:0,min:0,dataMin:0,minPadding:0,max:100,dataMax:100,maxPadding:0,startOnTick:!1,title:null,tickPositions:[]};C(d.options,e);C(a.options,e);h=!0}else h&&(d.setOptions(d.userOptions),
a.setOptions(a.userOptions),h=!1)});""});w(b,"modules/sunburst.src.js",[b["parts/Globals.js"],b["parts/Utilities.js"],b["mixins/draw-point.js"],b["mixins/tree-series.js"]],function(b,c,w,k){var g=c.correctFloat,t=c.error,G=c.extend,q=c.isNumber,m=c.isObject,F=c.isString,C=c.merge,L=c.splat;c=b.CenteredSeriesMixin;var I=b.Series,N=c.getCenter,K=k.getColor,v=k.getLevelOptions,D=c.getStartAndEndRadians,A=180/Math.PI;c=b.seriesType;var r=b.seriesTypes,y=k.setTreeValues,M=k.updateRootId,O=function(b,c){var f=
[];if(q(b)&&q(c)&&b<=c)for(;b<=c;b++)f.push(b);return f},P=function(b,c){c=m(c)?c:{};var f=0,a;if(m(b)){var d=C({},b);b=q(c.from)?c.from:0;var e=q(c.to)?c.to:0;var p=O(b,e);b=Object.keys(d).filter(function(a){return-1===p.indexOf(+a)});var g=a=q(c.diffRadius)?c.diffRadius:0;p.forEach(function(b){b=d[b];var c=b.levelSize.unit,e=b.levelSize.value;"weight"===c?f+=e:"percentage"===c?(b.levelSize={unit:"pixels",value:e/100*g},a-=b.levelSize.value):"pixels"===c&&(a-=e)});p.forEach(function(b){var c=d[b];
"weight"===c.levelSize.unit&&(c=c.levelSize.value,d[b].levelSize={unit:"pixels",value:c/f*a})});b.forEach(function(a){d[a].levelSize={value:0,unit:"pixels"}})}return d},E=function(b){var c=b.level;return{from:0<c?c:1,to:c+b.height}},R=function(b,c){var f=c.mapIdToNode[b.parent],a=c.series,d=a.chart,e=a.points[b.i];f=K(b,{colors:a.options.colors||d&&d.options.colors,colorIndex:a.colorIndex,index:c.index,mapOptionsToLevel:c.mapOptionsToLevel,parentColor:f&&f.color,parentColorIndex:f&&f.colorIndex,series:c.series,
siblings:c.siblings});b.color=f.color;b.colorIndex=f.colorIndex;e&&(e.color=b.color,e.colorIndex=b.colorIndex,b.sliced=b.id!==c.idRoot?e.sliced:!1);return b};c("sunburst","treemap",{center:["50%","50%"],colorByPoint:!1,opacity:1,dataLabels:{allowOverlap:!0,defer:!0,rotationMode:"auto",style:{textOverflow:"ellipsis"}},rootId:void 0,levelIsConstant:!0,levelSize:{value:1,unit:"weight"},slicedOffset:10},{drawDataLabels:b.noop,drawPoints:function(){var b=this,c=b.mapOptionsToLevel,g=b.shapeRoot,a=b.group,
d=b.hasRendered,e=b.rootNode,u=b.idPreviousRoot,l=b.nodeMap,k=l[u],t=k&&k.shapeArgs;k=b.points;var B=b.startAndEndRadians,r=b.chart,n=r&&r.options&&r.options.chart||{},w="boolean"===typeof n.animation?n.animation:!0,v=b.center[3]/2,z=b.chart.renderer,y=!1,D=!1;if(n=!!(w&&d&&e!==u&&b.dataLabelsGroup)){b.dataLabelsGroup.attr({opacity:0});var E=function(){y=!0;b.dataLabelsGroup&&b.dataLabelsGroup.animate({opacity:1,visibility:"visible"})}}k.forEach(function(f){var p=f.node,h=c[p.level];var k=f.shapeExisting||
{};var n=p.shapeArgs||{},J=!(!p.visible||!p.shapeArgs);if(d&&w){var y={};var Q={end:n.end,start:n.start,innerR:n.innerR,r:n.r,x:n.x,y:n.y};J?!f.graphic&&t&&(y=e===f.id?{start:B.start,end:B.end}:t.end<=n.start?{start:B.end,end:B.end}:{start:B.start,end:B.start},y.innerR=y.r=v):f.graphic&&(u===f.id?Q={innerR:v,r:v}:g&&(Q=g.end<=k.start?{innerR:v,r:v,start:B.end,end:B.end}:{innerR:v,r:v,start:B.start,end:B.start}));k=y}else Q=n,k={};y=[n.plotX,n.plotY];if(!f.node.isLeaf)if(e===f.id){var x=l[e];x=x.parent}else x=
f.id;G(f,{shapeExisting:n,tooltipPos:y,drillId:x,name:""+(f.name||f.id||f.index),plotX:n.plotX,plotY:n.plotY,value:p.val,isNull:!J});x=f.options;p=m(n)?n:{};x=m(x)?x.dataLabels:{};h=L(m(h)?h.dataLabels:{})[0];h=C({style:{}},h,x);x=h.rotationMode;if(!q(h.rotation)){if("auto"===x||"circular"===x)if(1>f.innerArcLength&&f.outerArcLength>p.radius){var H=0;f.dataLabelPath&&"circular"===x&&(h.textPath={enabled:!0})}else 1<f.innerArcLength&&f.outerArcLength>1.5*p.radius?"circular"===x?h.textPath={enabled:!0,
attributes:{dy:5}}:x="parallel":(f.dataLabel&&f.dataLabel.textPathWrapper&&"circular"===x&&(h.textPath={enabled:!1}),x="perpendicular");"auto"!==x&&"circular"!==x&&(H=p.end-(p.end-p.start)/2);h.style.width="parallel"===x?Math.min(2.5*p.radius,(f.outerArcLength+f.innerArcLength)/2):p.radius;"perpendicular"===x&&f.series.chart.renderer.fontMetrics(h.style.fontSize).h>f.outerArcLength&&(h.style.width=1);h.style.width=Math.max(h.style.width-2*(h.padding||0),1);H=H*A%180;"parallel"===x&&(H-=90);90<H?H-=
180:-90>H&&(H+=180);h.rotation=H}h.textPath&&(0===f.shapeExisting.innerR&&h.textPath.enabled?(h.rotation=0,h.textPath.enabled=!1,h.style.width=Math.max(2*f.shapeExisting.r-2*(h.padding||0),1)):f.dlOptions&&f.dlOptions.textPath&&!f.dlOptions.textPath.enabled&&"circular"===x&&(h.textPath.enabled=!0),h.textPath.enabled&&(h.rotation=0,h.style.width=Math.max((f.outerArcLength+f.innerArcLength)/2-2*(h.padding||0),1)));0===h.rotation&&(h.rotation=.001);f.dlOptions=h;if(!D&&J){D=!0;var F=E}f.draw({animatableAttribs:Q,
attribs:G(k,!r.styledMode&&b.pointAttribs(f,f.selected&&"select")),onComplete:F,group:a,renderer:z,shapeType:"arc",shapeArgs:n})});n&&D?(b.hasRendered=!1,b.options.dataLabels.defer=!0,I.prototype.drawDataLabels.call(b),b.hasRendered=!0,y&&E()):I.prototype.drawDataLabels.call(b)},pointAttribs:r.column.prototype.pointAttribs,layoutAlgorithm:function(b,c,h){var a=b.start,d=b.end-a,e=b.val,f=b.x,g=b.y,p=h&&m(h.levelSize)&&q(h.levelSize.value)?h.levelSize.value:0,k=b.r,t=k+p,r=h&&q(h.slicedOffset)?h.slicedOffset:
0;return(c||[]).reduce(function(b,c){var h=1/e*c.val*d,l=a+h/2,u=f+Math.cos(l)*r;l=g+Math.sin(l)*r;c={x:c.sliced?u:f,y:c.sliced?l:g,innerR:k,r:t,radius:p,start:a,end:a+h};b.push(c);a=c.end;return b},[])},setShapeArgs:function(b,c,h){var a=[],d=h[b.level+1];b=b.children.filter(function(a){return a.visible});a=this.layoutAlgorithm(c,b,d);b.forEach(function(b,d){d=a[d];var c=d.start+(d.end-d.start)/2,e=d.innerR+(d.r-d.innerR)/2,f=d.end-d.start;e=0===d.innerR&&6.28<f?{x:d.x,y:d.y}:{x:d.x+Math.cos(c)*
e,y:d.y+Math.sin(c)*e};var g=b.val?b.childrenTotal>b.val?b.childrenTotal:b.val:b.childrenTotal;this.points[b.i]&&(this.points[b.i].innerArcLength=f*d.innerR,this.points[b.i].outerArcLength=f*d.r);b.shapeArgs=C(d,{plotX:e.x,plotY:e.y+4*Math.abs(Math.cos(c))});b.values=C(d,{val:g});b.children.length&&this.setShapeArgs(b,b.values,h)},this)},translate:function(){var b=this,c=b.options,h=b.center=N.call(b),a=b.startAndEndRadians=D(c.startAngle,c.endAngle),d=h[3]/2,e=h[2]/2-d,g=M(b),l=b.nodeMap,k=l&&l[g],
m={};b.shapeRoot=k&&k.shapeArgs;I.prototype.translate.call(b);var q=b.tree=b.getTree();b.renderTraverseUpButton(g);l=b.nodeMap;k=l[g];var r=F(k.parent)?k.parent:"";r=l[r];var n=E(k);var w=n.from,z=n.to;n=v({from:w,levels:b.options.levels,to:z,defaults:{colorByPoint:c.colorByPoint,dataLabels:c.dataLabels,levelIsConstant:c.levelIsConstant,levelSize:c.levelSize,slicedOffset:c.slicedOffset}});n=P(n,{diffRadius:e,from:w,to:z});y(q,{before:R,idRoot:g,levelIsConstant:c.levelIsConstant,mapOptionsToLevel:n,
mapIdToNode:l,points:b.points,series:b});c=l[""].shapeArgs={end:a.end,r:d,start:a.start,val:k.val,x:h[0],y:h[1]};this.setShapeArgs(r,c,n);b.mapOptionsToLevel=n;b.data.forEach(function(a){m[a.id]&&t(31,!1,b.chart);m[a.id]=!0});m={}},alignDataLabel:function(b,c,h){if(!h.textPath||!h.textPath.enabled)return r.treemap.prototype.alignDataLabel.apply(this,arguments)},animate:function(b){var c=this.chart,f=[c.plotWidth/2,c.plotHeight/2],a=c.plotLeft,d=c.plotTop;c=this.group;b?(b={translateX:f[0]+a,translateY:f[1]+
d,scaleX:.001,scaleY:.001,rotation:10,opacity:.01},c.attr(b)):(b={translateX:a,translateY:d,scaleX:1,scaleY:1,rotation:0,opacity:1},c.animate(b,this.options.animation),this.animate=null)},utils:{calculateLevelSizes:P,getLevelFromAndTo:E,range:O}},{draw:w,shouldDraw:function(){return!this.isNull},isValid:function(){return!0},getDataLabelPath:function(b){var c=this.series.chart.renderer,f=this.shapeExisting,a=f.start,d=f.end,e=a+(d-a)/2;e=0>e&&e>-Math.PI||e>Math.PI;var k=f.r+(b.options.distance||0);
a===-Math.PI/2&&g(d)===g(1.5*Math.PI)&&(a=-Math.PI+Math.PI/360,d=-Math.PI/360,e=!0);if(d-a>Math.PI){e=!1;var l=!0}this.dataLabelPath&&(this.dataLabelPath=this.dataLabelPath.destroy());this.dataLabelPath=c.arc({open:!0,longArc:l?1:0}).add(b);this.dataLabelPath.attr({start:e?a:d,end:e?d:a,clockwise:+e,x:f.x,y:f.y,r:(k+f.innerR)/2});return this.dataLabelPath}})});w(b,"masters/modules/sunburst.src.js",[],function(){})});
//# sourceMappingURL=sunburst.js.map