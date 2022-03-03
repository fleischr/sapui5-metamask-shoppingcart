/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./View","./XMLViewRenderer","./ViewType","sap/base/util/merge","sap/ui/base/ManagedObject","sap/ui/core/XMLTemplateProcessor","sap/ui/core/Control","sap/ui/core/RenderManager","sap/ui/core/cache/CacheManager","sap/ui/model/resource/ResourceModel","sap/ui/util/XMLHelper","sap/base/strings/hash","sap/base/Log","sap/base/util/LoaderExtensions","sap/ui/performance/trace/Interaction","sap/ui/core/Core"],function(e,t,r,n,i,o,s,a,c,u,l,p,d,f,h,m){"use strict";var g=c.RenderPrefixes,v="XMLViewCacheError",y={};var w=a.extend("sap.ui.core.mvc.XMLAfterRenderingNotifier",{metadata:{library:"sap.ui.core"},renderer:{apiVersion:2,render:function(e,t){e.text("")}}});var C=t.extend("sap.ui.core.mvc.XMLView",{metadata:{library:"sap.ui.core",specialSettings:{containingView:{type:"sap.ui.core.mvc.XMLView",visibility:"hidden"},xmlNode:{type:"Element",visibility:"hidden"},cache:"Object",processingMode:{type:"sap.ui.core.mvc.XMLProcessingMode",visibility:"hidden"}},designtime:"sap/ui/core/designtime/mvc/XMLView.designtime"},renderer:r});sap.ui.xmlview=function(e,t){return sap.ui.view(e,t,n.XML)};C.create=function(e){var r=i({},e);r.viewContent=r.definition;r.async=true;r.type=n.XML;return t.create(r)};C._sType=n.XML;C.asyncSupport=true;C._bUseCache=sap.ui.getCore().getConfiguration().getViewCache()&&u._isSupportedEnvironment();function P(e){if(e.parseError.errorCode!==0){var t=e.parseError;throw new Error("The following problem occurred: XML parse Error for "+t.url+" code: "+t.errorCode+" reason: "+t.reason+" src: "+t.srcText+" line: "+t.line+" linepos: "+t.linepos+" filepos: "+t.filepos)}}function M(e,t){if(!t){throw new Error("mSettings must be given")}else if(t.viewName&&t.viewContent){throw new Error("View name and view content are given. There is no point in doing this, so please decide.")}else if((t.viewName||t.viewContent)&&t.xmlNode){throw new Error("View name/content AND an XML node are given. There is no point in doing this, so please decide.")}else if(!(t.viewName||t.viewContent)&&!t.xmlNode){throw new Error("Neither view name/content nor an XML node is given. One of them is required.")}else if(t.cache&&!(t.cache.keys&&t.cache.keys.length)){throw new Error("No cache keys provided. At least one is required.")}}function b(e,t){e.mProperties["viewContent"]=t.viewContent;var r=p.parse(t.viewContent);P(r);return r.documentElement}function E(e,t){if((e._resourceBundleName||e._resourceBundleUrl)&&(!t.models||!t.models[e._resourceBundleAlias])){var r=new l({bundleName:e._resourceBundleName,bundleUrl:e._resourceBundleUrl,bundleLocale:e._resourceBundleLocale,async:t.async});var n=r.getResourceBundle();if(n instanceof Promise){return n.then(function(){e.setModel(r,e._resourceBundleAlias)})}e.setModel(r,e._resourceBundleAlias)}}function x(e){e.oAfterRenderingNotifier=new w;e.oAfterRenderingNotifier.addDelegate({onAfterRendering:function(){e.onAfterRenderingBeforeChildren()}})}function N(e){var t=sap.ui.require("sap/ui/core/Component"),r;if(t){while(e){var n=t.getOwnerComponentFor(e);if(n){e=r=n}else{if(e instanceof t){r=e}e=e.getParent&&e.getParent()}}}return r}function _(e,t){var r=N(e),n=r?JSON.stringify(r.getManifest()):null,i=[];i=i.concat(L(e,r),I(),T(e),t.keys);return R(e,i).then(function(e){return{key:e+"("+d(n||"")+")",componentManifest:n,additionalData:t.additionalData}})}function V(e){return e}function R(e,t){return Promise.all(t).then(function(e){e=e.filter(function(e){return e!==y});if(e.every(V)){return e.join("_")}else{var t=new Error("Provided cache keys may not be empty or undefined.");t.name=v;return Promise.reject(t)}})}function L(e,t){var r=t&&t.getMetadata().getName();return[r||window.location.host+window.location.pathname,e.getId(),sap.ui.getCore().getConfiguration().getLanguageTag()].concat(t&&t.getActiveTerminologies()||[])}function T(e){var t=e.getPreprocessors(),r=e.getPreprocessorInfo(false),n=[];function i(e){n.push(e.preprocessor.then(function(e){if(e.getCacheKey){return e.getCacheKey(r)}else{return y}}))}for(var o in t){t[o].forEach(i)}return n}function I(){return sap.ui.getVersionInfo({async:true}).then(function(e){var t="";if(!e.libraries){t=sap.ui.buildinfo.buildtime}else{e.libraries.forEach(function(e){t+=e.buildTimestamp})}return t}).catch(function(e){f.warning("sap.ui.getVersionInfo could not be retrieved","sap.ui.core.mvc.XMLView");f.debug(e);return""})}function A(e,t){var r=e.key;delete e.key;e.xml=p.serialize(t);return u.set(r,e)}function X(e){return u.get(e.key).then(function(t){if(t&&t.componentManifest==e.componentManifest){t.xml=p.parse(t.xml,"application/xml").documentElement;if(t.additionalData){i(e.additionalData,t.additionalData)}return t}})}C.prototype.initViewSettings=function(e){var r=this,n;function o(n){r._xContent=n;if(t._supportInfo){t._supportInfo({context:r._xContent,env:{caller:"view",viewinfo:i({},r),settings:i({},e||{}),type:"xmlview"}})}if(!r.isSubView()){var o={};s.parseViewAttributes(n,r,o);if(!e.async){Object.assign(e,o)}else{r.applySettings(o)}}else{delete e.controller}var a=E(r,e);if(a instanceof Promise){return a.then(function(){x(r)})}x(r)}function a(e,t){if(r.hasPreprocessor("viewxml")){return s.enrichTemplateIdsPromise(e,r,t).then(function(){return r.runPreprocessor("viewxml",e,!t)})}return e}function c(e){var t=m.notifyAsyncStep("VIEW PREPROCESSING");return r.runPreprocessor("xml",e).then(function(e){return a(e,true)}).finally(t)}function u(e){return h.loadResource(e,{async:true}).then(function(e){return e.documentElement})}function l(e,t){return u(e).then(c).then(function(e){if(t){A(t,e)}return e})}function p(e,t){return _(r,t).then(function(t){return X(t).then(function(r){if(!r){return l(e,t)}else{return r.xml}})}).catch(function(t){if(t.name===v){f.error(t.message,t.name,"sap.ui.core.mvc.XMLView");f.error("Processing the View without caching.","sap.ui.core.mvc.XMLView");return l(e)}else{return Promise.reject(t)}})}this._oContainingView=e.containingView||this;this._sProcessingMode=e.processingMode;if(this.oAsyncState){this.oAsyncState.suppressPreserve=true}M(this,e);if(e.viewName){var d=e.viewName.replace(/\./g,"/")+".view.xml";if(e.async){if(e.cache&&C._bUseCache){return p(d,e.cache).then(o)}else{return u(d).then(c).then(o)}}else{n=h.loadResource(d).documentElement}}else if(e.viewContent){if(e.viewContent.nodeType===window.Node.DOCUMENT_NODE){n=e.viewContent.documentElement}else{n=b(this,e)}}else if(e.xmlNode){n=e.xmlNode}if(e.async){return c(n).then(o)}else{n=this.runPreprocessor("xml",n,true);n=a(n,false);if(n&&typeof n.getResult==="function"){if(n.isRejected()){throw n.getResult()}n=n.getResult()}o(n)}};C.prototype.onBeforeRendering=function(){var e=this.getDomRef();if(e&&!c.isPreservedContent(e)){c.preserveContent(e,true)}t.prototype.onBeforeRendering.apply(this,arguments)};C.prototype.exit=function(){if(this.oAfterRenderingNotifier){this.oAfterRenderingNotifier.destroy()}t.prototype.exit.apply(this,arguments)};C.prototype.onControllerConnected=function(e){var t=this;function r(e){return o.runWithPreprocessors(e,{settings:t._fnSettingsPreprocessor})}if(!this.oAsyncState){this._aParsedContent=r(s.parseTemplate.bind(null,this._xContent,this))}else{var n=m.notifyAsyncStep("VIEW PROCESSING");return s.parseTemplatePromise(this._xContent,this,true,{fnRunWithPreprocessor:r}).then(function(e){t._aParsedContent=e;delete t.oAsyncState.suppressPreserve}).finally(n)}};C.prototype.getControllerName=function(){return this._controllerName};C.prototype.isSubView=function(){return this._oContainingView!=this};C.prototype.onAfterRenderingBeforeChildren=function(){if(this._$oldContent.length!==0){var t=this.getAggregation("content");if(t){for(var r=0;r<t.length;r++){var n=document.getElementById(g.Temporary+t[r].getId())||t[r].getDomRef()||document.getElementById(g.Invisible+t[r].getId());if(n){e(document.getElementById(g.Dummy+t[r].getId())).replaceWith(n)}}}e(document.getElementById(g.Temporary+this.getId())).replaceWith(this._$oldContent)}this._$oldContent=undefined};C.prototype._onChildRerenderedEmpty=function(t,r){e(r).replaceWith('<div id="'+g.Dummy+t.getId()+'" class="sapUiHidden"></div>');return true};C.registerPreprocessor=function(e,r,n,i,o,s){var a=this.getMetadata().getClass()._sType;if(typeof n==="string"){if(n!==a){throw new TypeError("View types other than "+a+" are not supported by XMLView.registerPreprocessor,"+" check View.registerPreprocessor instead")}}else{s=o;o=i;i=n}e=e.toUpperCase();if(C.PreprocessorType[e]){t.registerPreprocessor(C.PreprocessorType[e],r,a,i,o,s)}else{f.error('Preprocessor could not be registered due to unknown sType "'+e+'"',this.getMetadata().getName())}};C.PreprocessorType={XML:"xml",VIEWXML:"viewxml",CONTROLS:"controls"};C.registerPreprocessor("xml","sap.ui.core.util.XMLPreprocessor",true,true);return C});