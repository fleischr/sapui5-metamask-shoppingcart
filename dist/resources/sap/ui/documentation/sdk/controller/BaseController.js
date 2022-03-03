/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/documentation/library","sap/ui/core/Fragment","sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/ui/model/resource/ResourceModel","sap/ui/Device","sap/m/library","sap/ui/documentation/sdk/controller/util/APIInfo","sap/base/strings/formatMessage","sap/ui/documentation/WebPageTitleUtil"],function(e,t,n,i,o,r,s,a,u,l){"use strict";var d=s.SplitAppMode;var g=new l;var c=[];return n.extend("sap.ui.documentation.sdk.controller.BaseController",{_oCore:sap.ui.getCore(),formatMessage:u,appendPageTitle:function(e){if(e===null){c=[]}else{if(c.indexOf(e)>=0){return this}c.length===2?c[0]=e:c.unshift(e)}g.setTitle(c.join(" - "));return this},onInit:function(){var e=new o({bundleName:"sap.ui.documentation.messagebundle"});this.setModel(e,"i18n");if(r.system.phone||r.system.tablet){this.getOwnerComponent().loadVersionInfo()}},hideMasterSide:function(){var e=this.getSplitApp();e.setMode(d.HideMode)},showMasterSide:function(){var e=this.getSplitApp();e.setMode(d.ShowHideMode)},getSplitApp:function(){return this.getView().getParent().getParent()},getRouter:function(){return this.getOwnerComponent().getRouter()},getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){return this.getView().setModel(e,t)},getConfig:function(){return this.getOwnerComponent().getMetadata().getConfig()},onNavBack:function(e){var t=i.getInstance().getPreviousHash();if(t!==undefined){if(t.indexOf("search/")===0){this.getRouter().navTo("search",{searchParam:t.split("/")[1]},false)}else{history.go(-1)}}else{var n=window.location.hash;if(n.indexOf("#/topic/")==0){this.getRouter().navTo("topic",{},true)}else if(n.indexOf("#/api/")==0){this.getRouter().navTo("api",{},true)}}},searchResultsButtonVisibilitySwitch:function(e){var t=i.getInstance().getPreviousHash();if(t&&t.indexOf("search/")===0){e.setVisible(true)}else{e.setVisible(false)}},getRootView:function(){var e=this.getOwnerComponent();return e.byId(e.getManifestEntry("/sap.ui5/rootView").id)},onDisclaimerLinkPress:function(e){var n=e.getSource?e.getSource():e.target;if(!this.oDisclaimerPopover){t.load({name:"sap.ui.documentation.sdk.view.LegalDisclaimerPopover"}).then(function(e){this.getView().addDependent(e);this.oDisclaimerPopover=e;e.openBy(n)}.bind(this));return}else if(this.oDisclaimerPopover.isOpen()){this.oDisclaimerPopover.close()}this.oDisclaimerPopover.openBy(n)},_getControlComponent:function(t,n){var i=n.libComponentInfos,o=e._getLibraryInfoSingleton();return o._getActualComponent(i,t)},_onOrientationChange:function(e){var t=this.byId("phoneImage");if(r.system.phone&&t){t.toggleStyleClass("phoneHeaderImageLandscape",e.landscape)}},_registerOrientationChange:function(){r.orientation.attachHandler(this._onOrientationChange,this)},_deregisterOrientationChange:function(){r.orientation.detachHandler(this._onOrientationChange,this)},handleLandingImageLoad:function(){this.getView().byId("landingImageHeadline").setVisible(true)},getAPIReferenceCheckPromise:function(e){return a.getIndexJsonPromise().then(function(t){function n(t){return t.some(function(t){var i=t.name===e;if(!i&&t.nodes){return n(t.nodes)}return i})}return n(t)})},onRouteNotFound:function(){var e=this.getModel("i18n").getProperty("NOT_FOUND_TITLE");this.getRouter().myNavToWithoutHash("sap.ui.documentation.sdk.view.NotFound","XML",false);setTimeout(this.appendPageTitle.bind(this,e));return}})});