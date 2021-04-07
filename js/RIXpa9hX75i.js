if (self.CavalryLogger) { CavalryLogger.start_js(["JUbDc23"]); }

__d("OldInteractionTracingMetrics",["gkx","performanceNavigationStart","performanceNow","recoverableViolation"],(function(a,b,c,d,e,f){"use strict";var g,h=new Map(),i=new Map(),j=new Map(),k={},l=b("performanceNavigationStart")();a=function(){var a=new Map(j),c=function(b){a.forEach(function(a){b(a)})},d={addBootload:function(a,b,d,e){c(function(c){var f=a.join(";");c.bootloads[f]={allResourcesDownloaded:e,components:a,duration:d,end:b+d-l,start:b-l}})},addGlobalMetadata:function(a,b){k[a]=b,d.addMetadata(a,b)},addMarkerPoint:function(a,d,e,f){var h=(e=e)!=null?e:(g||(g=b("performanceNow")))();c(function(b){h>=b.start&&(b.markerPoints[a]={timestamp:h,type:d},f&&(b.markerPoints[a].data=f))})},addMetadata:function(a,b){c(function(c){c.metadata[a]=b})},addRequireDeferred:function(a,b){var d=[];c(function(c){if(c.requireDeferreds[a]!=null)return;c=c.requireDeferreds[a]={start:b};d.push(c)});return function(a,c){d.forEach(function(d){d.end=a,d.duration=a-b,c&&(d.alreadyRequired=!0)})}},addSubspan:function(a,b,d,e,f){var g={data:f,end:e,start:d,type:b};c(function(b){b.subSpans[a]?b.subSpans[a].push(g):b.subSpans[a]=[g]})},addTag:function(a,b){c(function(c){c.tagSet[a]||(c.tagSet[a]=new Set()),c.tagSet[a].add(b)})},forEach:function(a){c(function(b){a(b)})}};return d};var m={addFactoryTiming:function(a,c){var d=i.get(a);if(!d){b("gkx")("1745526")&&b("recoverableViolation")("Tried to add FactoryTiming to an untraced interaction: "+a,"comet_infra");return}d.factoryTimings.push(c)},addGlobalMetadata:function(a,b,c){k[b]=c,m.addMetadata(a,b,c)},addHeroBootload:function(a,b){a=i.get(a);if(!a)return;a.heroBootloads.push(b)},addHeroRelay:function(a,b){a=i.get(a);if(!a)return;a.heroRelay.push(b)},addHiddenTiming:function(a,c){var d=i.get(a);if(!d){b("gkx")("1745526")&&b("recoverableViolation")("Tried to add HiddenTiming to an untraced interaction: "+a,"comet_infra");return}d.hiddenTimings=c},addImagePreloader:function(a,c,d){var e=i.get(a);if(!e){b("gkx")("1745526")&&b("recoverableViolation")("Tried to add imagePreloader to an untraced interaction: "+a,"comet_infra");return}e.imagePreloaderTimings[c]=d},addMarkerPoint:function(a,c,d,e,f){e===void 0&&(e=(g||(g=b("performanceNow")))());var h=i.get(a);if(!h){b("gkx")("1745526")&&b("recoverableViolation")("Tried to add markerPoint to an untraced interaction: "+a,"comet_infra");return}e>=h.start&&(h.markerPoints[c]={timestamp:e,type:d},f&&(h.markerPoints[c].data=f))},addMetadata:function(a,c,d){var e=i.get(a);if(!e){b("gkx")("1745526")&&b("recoverableViolation")("Tried to add metadata to an untraced interaction: "+a,"comet_infra");return}e.metadata[c]=d},addOfflineTiming:function(a,c){var d=i.get(a);if(!d){b("gkx")("1745526")&&b("recoverableViolation")("Tried to add OfflineTiming to an untraced interaction: "+a,"comet_infra");return}d.offlineTimings=c},addPayloadResource:function(a,c,d){var e=i.get(a);if(!e){b("gkx")("1745526")&&b("recoverableViolation")("Tried to add payloadResource to an untraced interaction: "+a,"comet_infra");return}e.payloadResources[c]=d},addPayloadTiming:function(a,c,d){var e=i.get(a);if(!e){b("gkx")("1745526")&&b("recoverableViolation")("Tried to add payloadTiming to an untraced interaction: "+a,"comet_infra");return}e.payloadTimings[c]=d},addReactRender:function(a,c,d,e,f,g,h){var j=i.get(a);if(!j){b("gkx")("1745526")&&b("recoverableViolation")("Tried to add ReactRender to an untraced interaction: "+a,"comet_infra");return}a={actualDuration:f,baseDuration:g,duration:e-d,end:e,phase:h,start:d};j.reactRender[c]?j.reactRender[c].push(a):j.reactRender[c]=[a];j.commitSet.add(e)},addSubspan:function(a,c,d,e,f,g){var h=i.get(a);if(!h){b("gkx")("1745526")&&b("recoverableViolation")("Tried to add subspan to an untraced interaction: "+a,"comet_infra");return}a={data:g,end:f,start:e,type:d};h.subSpans[c]?h.subSpans[c].push(a):h.subSpans[c]=[a]},addTag:function(a,c,d){var e=i.get(a);if(!e){b("gkx")("1745526")&&b("recoverableViolation")("Tried to add tag to an untraced interaction: "+a,"comet_infra");return}e.tagSet[c]||(e.tagSet[c]=new Set());e.tagSet[c].add(d)},addTracedInteraction:function(a,b,c){b={bootloads:{},commitSet:new Set(),factoryTimings:[],hasVcReport:!1,heroBootloads:[],heroRelay:[],hiddenTimings:[],imagePreloaderTimings:{},markerPoints:{},metadata:{},navigationTiming:{},offlineTimings:[],payloadResources:{},payloadTimings:{},reactRender:{},requireDeferreds:{},start:b,subSpans:{},tagSet:{},traceId:a,vcStateLog:null,wasCanceled:!1,wasOffline:!1};for(var d in k)b.metadata[d]=k[d];i.set(a,b);j.set(a,b);h.set(a,c);return b},complete:function(a){var c=i.get(a);if(!c)b("gkx")("1745526")&&b("recoverableViolation")("Untraced interaction is marked as completed: "+a,"comet_infra");else if(c.completed==null){c.metadata.endedByHeroComplete=1;c.completed=(g||(g=b("performanceNow")))();var d=h.get(a);d&&d(c);h["delete"](a);j["delete"](a)}},currentInteractionLogger:a,dump:function(){var a={};i.forEach(function(b,c){a[c]=babelHelpers["extends"]({},b,{e2e:b.completed!=null?((b.completed-b.start)/1e3).toFixed(2):"?"})});return a},get:function(a){return i.get(a)},removeMarkerPoint:function(a,b){a=i.get(a);a&&delete a.markerPoints[b]},setInteractionClass:function(a,b){a=i.get(a);a&&(a.interactionClass=b)},setInteractionType:function(a,b,c,d){a=i.get(a);a&&(a.interactionClass=b,a.type=c,a.qplEvent=d)}};c=m;e.exports=c}),null);