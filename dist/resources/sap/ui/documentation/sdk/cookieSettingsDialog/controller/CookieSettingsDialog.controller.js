/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/library","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/ui/model/resource/ResourceModel","sap/ui/core/Core"],function(e,o,i,t,s,n){"use strict";return e.extend("sap.ui.documentation.sdk.cookieSettingsDialog.controller.CookieSettingsDialog",{constructor:function(){this._oCookiesUtil=null;this._oRootView=null;this._oInitOptions=null;this._oModel=new i},openCookieSettingsDialog:function(e,o,i){this._oInitOptions=e;this._oModel.setData(e,true);if(this._oCookieSettingsDialog){this._oCookieSettingsDialog.open()}else{this._initData(o,i);t.load({name:"sap.ui.documentation.sdk.cookieSettingsDialog.view.CookieSettingsDialog",controller:this}).then(this._initDialog.bind(this)).then(function(e){this._oCookieSettingsDialog=e;this._oCookieSettingsDialog.open()}.bind(this))}},_initDialog:function(e){var o=new s({bundleName:"sap.ui.documentation.sdk.cookieSettingsDialog.i18n.i18n"});e.setModel(this._oModel,"cookieData");e.setModel(o,"i18n");this._oRootView.addDependent(e);e.attachBeforeOpen(function(){this._oCookieSettingsDialog.toggleStyleClass("cookiesDetailedView",this._oModel.getProperty("/showCookieDetails"))},this);e.attachAfterOpen(function(){n.byId("btnSetPreferences").focus()});if(!this._bAlreadyRequestedCookiesApproval){e.attachEventOnce("afterClose",function(){this._bAlreadyRequestedCookiesApproval=true;this._oCookiesUtil.setCookie(this._oCookiesUtil.COOKIE_NAMES.APPROVAL_REQUESTED,"1")},this)}return e},formatCookieValue:function(e){return Boolean(Number(e))},onAcceptAllCookies:function(){this._saveCookiePreference(this._oCookieNames.ALLOW_REQUIRED_COOKIES,true);this._saveCookiePreference(this._oCookieNames.ALLOW_USAGE_TRACKING,this._oModel.getProperty("/supportsUsageTracking"));this._oCookieSettingsDialog.close()},onRejectAllCookies:function(){this._saveCookiePreference(this._oCookieNames.ALLOW_REQUIRED_COOKIES,false);this._saveCookiePreference(this._oCookieNames.ALLOW_USAGE_TRACKING,false);this._oCookieSettingsDialog.close()},onSaveCookies:function(){var e=n.byId("requiredCookiesSwitch").getState(),o=n.byId("functionalCookiesSwitch").getState();this._saveCookiePreference(this._oCookieNames.ALLOW_REQUIRED_COOKIES,e);this._saveCookiePreference(this._oCookieNames.ALLOW_USAGE_TRACKING,o);this._oCookieSettingsDialog.close()},showCookieDetails:function(){this._oModel.setProperty("/showCookieDetails",true);this._oCookieSettingsDialog.addStyleClass("cookiesDetailedView");this._focusButton(n.byId("btnSavePreferences"))},onCancelPress:function(){if(this._oInitOptions.showCookieDetails===true){this.onCancelEditCookies()}else{this.hideCookieDetails()}},hideCookieDetails:function(){this._oModel.setProperty("/showCookieDetails",false);this._oCookieSettingsDialog.removeStyleClass("cookiesDetailedView");this._focusButton(n.byId("btnSetPreferences"))},onCancelEditCookies:function(){this._oCookieSettingsDialog.close();n.byId("requiredCookiesSwitch").setState(this._oCookiesUtil.getCookieValue(this._oCookieNames.ALLOW_REQUIRED_COOKIES)==="1");n.byId("functionalCookiesSwitch").setState(this._oCookiesUtil.getCookieValue(this._oCookieNames.ALLOW_USAGE_TRACKING)==="1")},_saveCookiePreference:function(e,o){var i=o?"1":"0",t;if(e===this._oCookieNames.ALLOW_USAGE_TRACKING){t=this._oCookiesUtil.getCookieValue(e);if(t!==i){o&&this._oCookiesUtil.enableUsageTracking();!o&&this._oCookiesUtil.disableUsageTracking()}}this._oCookiesUtil.setCookie(e,i);this._oModel.setProperty("/"+e,i)},_initData:function(e,o){this._oCookiesUtil=o;this._oRootView=e;this._oCookieNames=this._oCookiesUtil.COOKIE_NAMES;this._bAlreadyRequestedCookiesApproval=this._oCookiesUtil.getCookieValue(this._oCookieNames.APPROVAL_REQUESTED)==="1";this._setInitialCookieValues()},_setInitialCookieValues:function(){var e={};if(!this._bAlreadyRequestedCookiesApproval){e[this._oCookieNames.ALLOW_REQUIRED_COOKIES]="1";e[this._oCookieNames.ALLOW_USAGE_TRACKING]="1"}else{e[this._oCookieNames.ALLOW_REQUIRED_COOKIES]=this._oCookiesUtil.getCookieValue(this._oCookieNames.ALLOW_REQUIRED_COOKIES);e[this._oCookieNames.ALLOW_USAGE_TRACKING]=this._oCookiesUtil.getCookieValue(this._oCookieNames.ALLOW_USAGE_TRACKING)}this._oModel.setData(e,true)},_focusButton:function(e){if(e.getDomRef()){e.focus();return}e.addEventDelegate({onAfterRendering:function(){e.focus();e.removeEventDelegate(this)}})}})});