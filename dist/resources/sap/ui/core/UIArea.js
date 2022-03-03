/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","./Element","./RenderManager","sap/ui/performance/trace/Interaction","sap/ui/dom/containsOrEquals","sap/ui/util/ActivityDetection","sap/ui/events/KeyCodes","sap/base/Log","sap/base/assert","sap/ui/performance/Measurement","sap/ui/events/jquery/EventExtension","sap/ui/events/ControlEvents","sap/ui/events/F6Navigation","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/control"],function(e,t,o,n,r,i,a,s,d,u,l,f,p,g){"use strict";l.apply();g(document).on("keydown",function(e){p.handleF6GroupNavigation(e,null)});var c=s.getLogger("sap.ui.Rendering",window["sap-ui-config"]&&(window["sap-ui-config"]["xx-debugRendering"]||window["sap-ui-config"]["xx-debugrendering"])||/sap-ui-xx-debug(R|-r)endering=(true|x|X)/.test(document.location.search)?s.Level.DEBUG:Math.min(s.Level.INFO,s.getLevel())),h=function(e){return e},v=function(){},y=function(){};if(c.isLoggable()){h=function(e){var t;try{throw new Error}catch(e){t=e.stack||e.stacktrace||(e.sourceURL?e.sourceURL+":"+e.line:null);t=t?t.split(/\n\s*/g).slice(2):undefined}return{obj:e,location:t}};v=function(e,t){var o=sap.ui.getCore(),n={},r,i;for(r in t){i=o.byId(r);n[r]={type:i?i.getMetadata().getName():t[r].obj===e?"UIArea":"(no such control)",location:t[r].location,reason:t[r].reason}}c.debug("  UIArea '"+e.getId()+"', pending updates: "+JSON.stringify(n,null,"\t"))};y=function(e,t){var o;for(o in t){if(e[o]!=null){if(e[o].obj!==t[o].obj){t[o].reason="replaced during rendering"}else{t[o].reason="invalidated again during rendering"}}else{t[o].reason="invalidated during rendering"}}}}var m=e.extend("sap.ui.core.UIArea",{constructor:function(t,o){if(arguments.length===0){return}e.apply(this);this.oCore=t;this.bLocked=false;this.bInitial=true;this.aContentToRemove=[];this.bNeedsRerendering=false;if(o!=null){this.setRootNode(o);this.bNeedsRerendering=this.bNeedsRerendering&&!document.getElementById(o.id+"-Init")}this.mInvalidatedControls={};if(!this.bNeedsRerendering){this.bRenderSelf=false}else{this.oCore.addInvalidatedUIArea(this)}},metadata:{publicMethods:["setRootNode","getRootNode","setRootControl","getRootControl","lock","unlock","isLocked"],aggregations:{content:{name:"content",type:"sap.ui.core.Control",multiple:true,singularName:"content"},dependents:{name:"dependents",type:"sap.ui.core.Control",multiple:true}}},insertDependent:function(e,t){return this.insertAggregation("dependents",e,t,true)},addDependent:function(e){return this.addAggregation("dependents",e,true)},removeDependent:function(e){return this.removeAggregation("dependents",e,true)},removeAllDependents:function(){return this.removeAllAggregation("dependents",true)},destroyDependents:function(){return this.destroyAggregation("dependents",true)}});m.prototype.isInvalidateSuppressed=function(){return this.iSuppressInvalidate>0};m.prototype.getId=function(){return this.oRootNode?this.oRootNode.id:null};m.prototype.getUIArea=function(){return this};m.prototype.setRootNode=function(e){if(this.oRootNode===e){return}d(!e||e.nodeType===1&&!g(e).attr("data-sap-ui-area"),"UIArea root node must be a DOMElement");if(this.oRootNode){this._ondetach()}this.oRootNode=e;if(this.getContent().length>0){this.invalidate()}if(this.oRootNode){this._onattach()}};m.prototype.getRootNode=function(){return this.oRootNode};m.prototype.setRootControl=function(e){this.removeAllContent();this.addContent(e)};m.prototype.getRootControl=function(e){var t=this.getContent();if(t.length>0){if(e>=0&&e<t.length){return t[e]}return t[0]}return null};m.prototype._addRemovedContent=function(e){if(this.oRootNode&&e){this.aContentToRemove.push(e)}};m.prototype.addContent=function(e,t){this.addAggregation("content",e,t);if(t!==true){this.invalidate()}return this};m.prototype.removeContent=function(e,t){var o=this.removeAggregation("content",e,t);if(!t){var n;if(o&&o.getDomRef){n=o.getDomRef()}this._addRemovedContent(n)}return o};m.prototype.removeAllContent=function(){var e=this.removeAllAggregation("content");for(var t=0;t<e.length;t++){var o;var n=e[t];if(n&&n.getDomRef){o=n.getDomRef()}this._addRemovedContent(o)}return e};m.prototype.destroyContent=function(){var e=this.getContent();for(var t=0;t<e.length;t++){var o;var n=e[t];if(n&&n.getDomRef){o=n.getDomRef()}this._addRemovedContent(o)}this.destroyAggregation("content");return this};m.prototype.lock=function(){this.bLocked=true};m.prototype.unlock=function(){if(this.bLocked&&this.bNeedsRerendering){this.oCore.addInvalidatedUIArea(this)}this.bLocked=false};m.prototype.isLocked=function(){return this.bLocked};m.prototype.getBindingContext=function(){return null};m.prototype.getEventingParent=function(){return this.oCore._getEventProvider()};m.prototype.isActive=function(){return!!this.getId()&&document.getElementById(this.getId())!=null};m.prototype.invalidate=function(){this.addInvalidatedControl(this)};m.prototype.addInvalidatedControl=function(e){if(this.bRenderSelf){return}if(!this.bNeedsRerendering){this.oCore.addInvalidatedUIArea(this)}var t=e.getId();if(e===this){this.bRenderSelf=true;this.bNeedsRerendering=true;this.mInvalidatedControls={};this.mInvalidatedControls[t]=h(this);return}if(this.mInvalidatedControls[t]){return}if(!this.bRenderSelf){this.mInvalidatedControls[t]=h(e);this.bNeedsRerendering=true}};m.prototype.rerender=function(e){var t=this;function n(){t.bRenderSelf=false;t.aContentToRemove=[];t.mInvalidatedControls={};t.bNeedsRerendering=false}if(e){this.bNeedsRerendering=true}if(this.bLocked||!this.bNeedsRerendering){return false}var r=this.bRenderSelf,i=this.aContentToRemove,a=this.mInvalidatedControls,d=false;n();u.pause("renderPendingUIUpdates");u.start(this.getId()+"---rerender","Rerendering of "+this.getMetadata().getName());v(this,a);if(r){if(this.oRootNode){c.debug("Full Rendering of UIArea '"+this.getId()+"'");o.preserveContent(this.oRootNode,false,this.bInitial);this.bInitial=false;var l=function(e,n){var r=e.length;var i;for(var a=0;a<r;a++){i=n?e[a].getDomRef():e[a];if(i&&!o.isPreservedContent(i)&&t.oRootNode===i.parentNode){g(i).remove()}}return r};var f=document.activeElement;var p=this.oCore.oFocusHandler.getControlFocusInfo();l(i);var h=this.getContent();var m=l(h,true);var C=document.activeElement;for(var R=0;R<m;R++){if(h[R]&&h[R].getParent()===this){this.oCore.oRenderManager.render(h[R],this.oRootNode,true)}}d=true;if(f&&f!=C&&C===document.activeElement){try{this.oCore.oFocusHandler.restoreFocus(p)}catch(e){s.warning("Problems while restoring the focus after full UIArea rendering: "+e,null,this)}}}else{c.debug("Full Rendering of UIArea '"+this.getId()+"' postponed, no root node")}}else{var I=function(e){for(;;){if(e.getMetadata&&e.getMetadata().isInstanceOf("sap.ui.core.PopupInterface")){break}e=e.getParent();if(!e||e===t){return false}if(a.hasOwnProperty(e.getId())){return true}}};for(var b in a){var N=this.oCore.byId(b);if(N&&!I(N)){N.rerender();d=true}}}y(a,this.mInvalidatedControls);u.end(this.getId()+"---rerender");u.resume("renderPendingUIUpdates");return d};m.prototype._onControlRendered=function(e){var t=e.getId();if(this.mInvalidatedControls[t]){delete this.mInvalidatedControls[t]}};m.rerenderControl=function(e){var t=null;if(e){t=e.getDomRef();if(!t||o.isPreservedContent(t)){t=document.getElementById(o.RenderPrefixes.Invisible+e.getId())}}var n=t&&t.parentNode;if(n){var r=e.getUIArea();var i=r?r.oCore.oRenderManager:sap.ui.getCore().createRenderManager();c.debug("Rerender Control '"+e.getId()+"'"+(r?"":" (using a temp. RenderManager)"));o.preserveContent(t,true,false,e);i.render(e,n)}else{var r=e.getUIArea();r&&r._onControlRendered(e);c.warning("Couldn't rerender '"+e.getId()+"', as its DOM location couldn't be determined")}};var C=/^(mousedown|mouseup|click|keydown|keyup|keypress|touchstart|touchend|tap)$/;var R=[],I=[];var b={mousemove:1,mouseover:1,mouseout:1,scroll:1,dragover:1,dragenter:1,dragleave:1};m.addEventPreprocessor=function(e){R.push(e)};m.getEventPreprocessors=function(){return R};m.addEventPostprocessor=function(e){I.push(e)};m.getEventPostprocessors=function(){return I};m.configureEventLogging=function(e){Object.assign(b,e);return Object.assign({},b)};m.prototype._handleEvent=function(e){var o,a,d;o=a=g(e.target).control(0);i.refresh();if(o==null){return}if(e.isMarked("delayedMouseEvent")){return}var u=e.getMark("handledByUIArea"),l=this.getId();if(u&&u!==l){e.setMark("firstUIArea",false);return}e.setMarked("firstUIArea");e.srcControl=o;if(e.type==="contextmenu"&&e.shiftKey&&e.altKey&&(e.metaKey||e.ctrlKey)){s.info("Suppressed forwarding the contextmenu event as control event because CTRL+SHIFT+ALT is pressed!");return}R.forEach(function(t){t(e)});this.oCore._handleControlEvent(e,l);if(this.bLocked||this.oCore.isLocked()){return}if(n.getActive()){d=e.type.match(C);if(d){n.notifyEventStart(e)}}var f=[];if(e.getPseudoTypes){f=e.getPseudoTypes()}f.push(e.type);var p=false;while(a instanceof t&&a.isActive()&&!e.isPropagationStopped()){var c=e.getMark("scopeCheckId"),h=c&&window.document.getElementById(c),v=a.getDomRef();if(!h||r(v,h)){for(var y=0,m=f.length;y<m;y++){var N=f[y];e.type=N;e.currentTarget=a.getDomRef();a._handleEvent(e);if(e.isImmediatePropagationStopped()){break}}if(!p&&!e.isMarked("enterKeyConsumedAsContent")){p=this._handleGroupChange(e,a)}if(e.isPropagationStopped()){break}if(a.bStopEventBubbling){break}v=a.getDomRef();if(!v){break}}v=v.parentNode;a=null;if(e.isMarked("fromMouseout")&&r(v,e.relatedTarget)){break}while(v&&v!==this.getRootNode()){if(v.id){a=g(v).control(0);if(a){break}}v=v.parentNode}}I.forEach(function(t){t(e)});if(d){n.notifyEventEnd(e)}e.currentTarget=this.getRootNode();e.setMark("handledByUIArea",l);if(e.isPropagationStopped()){s.debug("'"+e.type+"' propagation has been stopped")}var A=e.type;if(!b[A]){if(o){s.debug("Event fired: '"+A+"' on "+o,"","sap.ui.core.UIArea")}else{s.debug("Event fired: '"+A+"'","","sap.ui.core.UIArea")}}};m.prototype._onattach=function(){var e=this.getRootNode();if(e==null){return}g(e).attr("data-sap-ui-area",e.id).on(f.events.join(" "),this._handleEvent.bind(this))};m.prototype._ondetach=function(){var e=this.getRootNode();if(e==null){return}g(e).removeAttr("data-sap-ui-area").off()};m.prototype.clone=function(){throw new Error("UIArea can't be cloned")};m.prototype._handleGroupChange=function(e,t){var o=m._oFieldGroupValidationKey;if(e.type==="focusin"||e.type==="focusout"){if(e.type==="focusout"){t=g(document.activeElement).control(0)}if(m._iFieldGroupDelayTimer){clearTimeout(m._iFieldGroupDelayTimer);m._iFieldGroupDelayTimer=null}m._iFieldGroupDelayTimer=setTimeout(this.setFieldGroupControl.bind(this,t),0);return true}else if(this.getFieldGroupControl()&&e.type==="keyup"&&e.keyCode===o.keyCode&&e.shiftKey===o.shiftKey&&e.altKey===o.altKey&&e.ctrlKey===o.ctrlKey){if(m._iFieldGroupTriggerDelay){clearTimeout(m._iFieldGroupTriggerDelay)}var n=this.getFieldGroupControl(),r=n?n._getFieldGroupIds():[];if(r.length>0){n.triggerValidateFieldGroup(r)}return true}return false};m.prototype.setFieldGroupControl=function(e){var o=e;while(o&&!(o instanceof t&&o.isA("sap.ui.core.Control"))){o=o.getParent()}var n=this.getFieldGroupControl();if(o!=n){var r=n?n._getFieldGroupIds():[],i=o?o._getFieldGroupIds():[],a=r.filter(function(e){return i.indexOf(e)<0});if(a.length>0){n.triggerValidateFieldGroup(a)}m._oFieldGroupControl=o}return this};m.prototype.getFieldGroupControl=function(){if(m._oFieldGroupControl&&!m._oFieldGroupControl.bIsDestroyed){return m._oFieldGroupControl}return null};m._oFieldGroupControl=null;m._iFieldGroupDelayTimer=null;m._oFieldGroupValidationKey={keyCode:a.ENTER,shiftKey:false,altKey:false,ctrlKey:false};m._oRenderLog=c;return m});