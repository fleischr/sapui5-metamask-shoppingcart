/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery","sap/ui/documentation/sdk/controller/BaseController","sap/ui/documentation/sdk/controller/util/NewsInfo","sap/ui/documentation/sdk/controller/util/SearchUtil","sap/ui/core/mvc/Controller","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/json/JSONModel","sap/ui/core/ResizeHandler","sap/ui/Device","sap/ui/core/Fragment","sap/base/util/UriParameters","sap/ui/documentation/library","sap/ui/core/IconPool","sap/m/MessageBox","sap/m/library","sap/base/Log","sap/base/util/Version","sap/ui/core/syncStyleClass","sap/ui/core/Core","sap/ui/documentation/sdk/model/formatter","sap/m/ResponsivePopover","sap/ui/documentation/sdk/controller/util/Highlighter","sap/m/Button","sap/m/Toolbar","sap/ui/documentation/sdk/util/Resources","sap/base/util/LoaderExtensions"],function(e,t,i,o,a,s,n,r,l,h,c,g,u,d,p,f,_,m,b,S,D,w,v,y,C,P,k,I){"use strict";var V=_.SplitAppMode;var M="Demo Kit - � SDK",T={topic:"Documentation - "+M,api:"API Reference - "+M,controls:"Samples - "+M,demoapps:"Demo Apps - "+M,tools:"Tools - "+M,home:M};function A(e){return k.getResourcesVersion()&&!self["sap-ui-documentation-config"]?window.origin+e:k.getResourceOriginPath(e)}var R=_.URLHelper,E=A("/neo-app.json"),F=A("/versionoverview.json"),L="about",N="feedback",O="https://demokit-feedback-proxy.cfapps.eu12.hana.ondemand.com/issue",x="change_version",U="settings",B="cookie_preferences",K="en",H="light",G="dark",j="auto",z=Object.create(null),W="language",q="appearance",X="sitemap";z[H]="sap_fiori_3";z[G]="sap_fiori_3_dark";z[j]="sap_fiori_3";return i.extend("sap.ui.documentation.sdk.controller.App",{formatter:w,_arrToTreeConverter:function(){var e,t=this._aNeoAppVersions.slice(),i=[],o=0,a="";for(var s=0;s<t.length;s++){a=t[s].groupTitle;o=0;e=[];while(t[s]&&t[s].groupTitle&&t[s].groupTitle===a){e.push(t[s]);o++;s++}s--;i.push({groupTitle:a,version:a+" ("+o+" versions)",nodes:e,path:e[0].path})}return i},onInit:function(){i.prototype.onInit.call(this);var t=new l({busy:false,delay:0,bPhoneSize:false,bShowVersionSwitchInHeader:false,bShowVersionSwitchInMenu:false,bLandscape:c.orientation.landscape,bHasMaster:false,bSearchMode:false,bHideTopicSection:!!window["sap-ui-documentation-hideTopicSection"],bHideApiSection:!!window["sap-ui-documentation-hideApiSection"],sAboutInfoSAPUI5:"Looking for the Demo Kit for a specific SAPUI5 version? "+"Check at <a href = 'https://sapui5.hana.ondemand.com/versionoverview.html'>https://sapui5.hana.ondemand.com/versionoverview.html</a> "+"which versions are available. "+"You can view the version-specific Demo Kit by adding the version number to the URL, e.g. "+"<a href='https://sapui5.hana.ondemand.com/1.52.4/'>https://sapui5.hana.ondemand.com/1.52.4/</a>",sAboutInfoOpenUI5:"Looking for the Demo Kit for a specific OpenUI5 version? "+"Check at <a href = 'https://openui5.hana.ondemand.com/versionoverview.html'>https://openui5.hana.ondemand.com/versionoverview.html</a> "+"which versions are available. "+"You can view the version-specific Demo Kit by adding the version number to the URL, e.g. "+"<a href='https://openui5.hana.ondemand.com/1.52.4/'>https://openui5.hana.ondemand.com/1.52.4/</a>"});var a=this.getOwnerComponent();this.MENU_LINKS_MAP={legal:"https://www.sap.com/corporate/en/legal/impressum.html",privacy:"https://www.sap.com/corporate/en/legal/privacy.html",terms_of_use:"https://www.sap.com/corporate/en/legal/terms-of-use.html",copyright:"https://www.sap.com/corporate/en/legal/copyright.html",trademark:"https://www.sap.com/corporate/en/legal/trademark.html",disclaimer:"https://help.sap.com/viewer/disclaimer",sitemap:"sitemap",license:"LICENSE.txt"};this.getOwnerComponent().loadVersionInfo().then(function(){var e;if(this.getModel("versionData").getProperty("/isOpenUI5")){this.MENU_LINKS_MAP["Terms of Use"]="TermsOfUse.txt";e="OPENUI5"}else{e="SAPUI5"}M=M.replace("�",e);Object.keys(T).forEach(function(t){T[t]=T[t].replace("�",e)});if(this._sKey){this.appendPageTitle(null).appendPageTitle(T[this._sKey])}}.bind(this));this._oNewsModel=new l;this.setModel(this._oNewsModel,"news");this._oSupportedLangModel=new l;this.setModel(this._oSupportedLangModel,"supportedLanguages");this.setModel(new l,"messagesData");this._oView=this.getView();this.setModel(t,"appView");this.oHeader=this._oView.byId("headerToolbar");this.oRouter=this.getRouter();this._selectHeader=this._oView.byId("selectHeader");this._tabHeader=this._oView.byId("tabHeader");this._oConfigUtil=this.getOwnerComponent().getConfigUtil();this._oCookieNames=this._oConfigUtil.COOKIE_NAMES;this._sLocalStorageNewsName=this._oConfigUtil.LOCAL_STORAGE_NAMES["OLD_NEWS_IDS"];o.prepareNewsData(this._oConfigUtil);this._bSupportsPrefersColorScheme=!!(window.matchMedia&&(window.matchMedia("(prefers-color-scheme: dark)").matches||window.matchMedia("(prefers-color-scheme: light)").matches));h.register(this.oHeader,this.onHeaderResize.bind(this));this.oRouter.attachRouteMatched(this.onRouteChange.bind(this));this.oRouter.attachBypassed(this.onRouteNotFound.bind(this));this._registerFeedbackRatingIcons();this._requestVersionInfo();this.byId("splitApp").attachEvent("afterMasterClose",function(e){t.setProperty("/bIsShownMaster",false)},this);this.bus=D.getEventBus();this.bus.subscribe("newsChanged","onDemoKitNewsChanged",this._syncNewsModelWithNewsInfo,this);this._createConfigurationBasedOnURIInput();this.getOwnerComponent().loadMessagesInfo().then(function(e){if(e){this._updateMessagesModel(e)}}.bind(this));if(this._oConfigUtil.getCookieValue(this._oCookieNames.ALLOW_REQUIRED_COOKIES)==="1"&&this._aConfiguration.length>0){this._applyCookiesConfiguration(this._aConfiguration)}else{this._applyDefaultConfiguration(this._aConfiguration)}this.initSearch();document.addEventListener("keydown",function(t){if(t.keyCode===e.F&&t.shiftKey&&t.ctrlKey){this.byId("searchControl")._toggleOpen(true)}}.bind(this));a.getCookiesManagement().enable(a.getRootControl())},_updateMessagesModel:function(e){var t=this._oConfigUtil.getCookieValue(this._oCookieNames["DEMOKIT_IMPORTANT_MESSAGES_READ"]),i=0;e.messages.length&&e.messages.forEach(function(e){e.isMessageVisible=new Date(e.expire).getTime()-new Date>0&&!t.includes(e.id);e.isMessageVisible&&i++});e.iVisibleMessagesCount=i;this.getModel("messagesData").setData(e)},onBeforeRendering:function(){c.orientation.detachHandler(this._onOrientationChange,this)},onAfterRendering:function(){t(document.body).addClass(this.getOwnerComponent().getContentDensityClass());c.orientation.attachHandler(this._onOrientationChange,this);this._syncNewsModelWithNewsInfo()},onExit:function(){c.orientation.detachHandler(this._onOrientationChange,this);if(this.highlighter){this.highlighter.destroy()}},onRouteChange:function(e){if(!this.oRouter.getRoute(e.getParameter("name"))._oConfig.target){return}var t=e.getParameter("name"),i=this.oRouter.getRoute(t)._oConfig.target[0]+"Tab",o=this._oView.byId(i),a=o?o.getKey():"home",s=this.getModel("appView"),n=s.getProperty("/bPhoneSize"),r=s.getProperty("/bSearchMode"),l=c.system.phone,h=this.getOwnerComponent().getConfigUtil().hasMasterView(t),g,u;this._setHeaderSelectedKey(a);s.setProperty("/bHasMaster",h);if(n&&!r){this._selectHeader.setVisible(true)}if(l&&h){g=this.getOwnerComponent().getConfigUtil().getMasterView(t);u=g&&g.getId();s.setProperty("/sMasterViewId",u)}this.byId("splitApp").hideMaster();s.setProperty("/bIsShownMaster",false);this.appendPageTitle(null).appendPageTitle(T[a])},toggleMaster:function(e){var t=e.getParameter("pressed"),i=c.system.phone,o=this.byId("splitApp"),a=o.getMode()===V.ShowHideMode,s=o.getMode()===V.HideMode,n=this.getModel("appView").getProperty("/sMasterViewId"),r;if(!i&&(a||s)){r=t?o.showMaster:o.hideMaster;r.call(o);return}if(i){if(t){o.to(n)}else{o.backDetail()}}},navigateToSection:function(e){var t=e.getParameter("key"),i;if(!t){i=e.getParameter("selectedItem");i&&(t=i.getKey())}e.preventDefault();if(t&&t!=="home"){this.getRouter().navTo(t,{})}else{this.getRouter().navTo("welcome",{});this._setHeaderSelectedKey("home")}},navigateToNews:function(){this.getRouter().navTo("news")},handleNewsPress:function(e){var t=e.getSource(),i=this.getView();if(this._oNewsModel.getProperty("/newsCount")===0){this.navigateToNews()}else if(!this._oNewsPopover){g.load({name:"sap.ui.documentation.sdk.view.NewsPopover",controller:this}).then(function(e){i.addDependent(e);this._oNewsPopover=e;this._oNewsPopover.openBy(t)}.bind(this))}else{this._oNewsPopover.openBy(t)}},handleShowAllPress:function(){this._oNewsPopover.close();this.navigateToNews()},handleDismissAllPress:function(){o.moveAllNewItemsToOld()},handleNewsItemClose:function(e){var t=e.getSource(),i=t.getCustomData()[0].getValue(),a=this._oNewsModel.getProperty("/items").find(function(e){return e.id===i});o.moveNewItemToOld(a)},handleVisitNewsLink:function(e){var t=e.getSource(),i=t.getCustomData()[0].getValue();R.redirect(i,true)},_syncNewsModelWithNewsInfo:function(){var e,t=o.getPreparationFailureMessage();if(!t){e=o.getNewNewsArray().slice();this._oNewsModel.setProperty("/items",e);this._oNewsModel.setProperty("/newsCount",e.length)}this._oNewsModel.setProperty("/newsPreparationFailureMessage",t)},handleMenuItemClick:function(e){var t=e.getParameter("item").getKey(),i=this.MENU_LINKS_MAP[t];if(t===L){this.aboutDialogOpen()}else if(t===N){this.feedbackDialogOpen()}else if(t===U){this.settingsDialogOpen()}else if(t===B){this.getOwnerComponent().getCookiesManagement().cookieSettingsDialogOpen({showCookieDetails:true},this.getView())}else if(t===x){this.onChangeVersionButtonPress()}else if(z[t]){this._updateAppearance(t)}else if(i===X){this.onSiteMapPress()}else if(i){R.redirect(i,true)}this.sTarget=i},createSearchPopover:function(){var e=_.PlacementType,t=this.getView().byId("searchControl"),i=new v({showArrow:false,showHeader:false,contentWidth:"600px",placement:e.Vertical,horizontalScrolling:false,initialFocus:this.getView().byId("searchControl-searchField")}).addStyleClass("sapMSltPicker-CTX");i.open=function(){i.openBy(t)};this.getView().addDependent(i);return i},createSearchPicker:function(){var e=c.system.phone?this.createSearchDialog():this.createSearchPopover();this.createSearchPickerContent().then(function(t){e.addContent(t)});return e},createSearchDialog:function(){var e,t,i,o,a,s,n;var r=this.getView().byId("searchControl");i=new(sap.ui.require("sap/m/SearchField"))({liveChange:function(e){var t=e.getParameter("newValue");r._updateValue(t);r.fireLiveChange({newValue:t})},search:function(t){if(!t.getParameter("clearButtonPressed")){e.close();n=true}}});s=new C({icon:"sap-icon://decline",press:function(){e._oCloseTrigger=true;e.close();r._updateValue(t)}});o=new P({content:[i,s]});a=new C({text:D.getLibraryResourceBundle("sap.m").getText("MSGBOX_OK"),press:function(){e.close()}});function l(e){if(typeof e.selectionStart=="number"){e.selectionStart=e.selectionEnd=e.value.length}else if(typeof e.createTextRange!="undefined"){e.focus();var t=e.createTextRange();t.collapse(false);t.select()}}e=new(sap.ui.require("sap/m/Dialog"))({stretch:true,customHeader:o,beginButton:a,beforeClose:function(){r._bSuggestionSuppressed=true},beforeOpen:function(){t=r.getValue();i._updateValue(t);n=false},afterOpen:function(){var e=i.$().find("input");e.trigger("focus");l(e.get(0))},afterClose:function(e){if(n){r.fireSearch({query:r.getValue(),clearButtonPressed:false})}}});this.getView().addDependent(e);return e},createSearchPickerContent:function(){return g.load({name:"sap.ui.documentation.sdk.view.GlobalSearchPicker",controller:this}).then(function(e){var t=D.byId("shortList"),i=this,o;t.addEventDelegate({onAfterRendering:function(){var e={useExternalStyles:false,shouldBeObserved:true,isCaseSensitive:false};i.highlighter=new y(t.getDomRef(),e);o=i.getModel("searchData").getProperty("/query");o&&i.highlighter.highlight(o);t.removeEventDelegate(this)}});return e}.bind(this))},initSearch:function(){var e=this.getModel("searchData"),t={topics:["topic","topicId","subTopicId"],entity:["sample","controlsMaster","controls","code","entity"],apiref:["api","apiSpecialRoute","apiId"]};this.oRouter.attachRouteMatched(function(){e.setProperty("/preferencedCategory",null)});Object.keys(t).forEach(function(i){var o=t[i];o.forEach(function(t){this.oRouter.getRoute(t).attachPatternMatched(function(){e.setProperty("/preferencedCategory",i)})}.bind(this))}.bind(this))},getSearchPickerTitle:function(e){var t=D.getLibraryResourceBundle("sap.ui.documentation"),i;switch(this.getModel("searchData").getProperty("/preferencedCategory")){case"topics":i=t.getText("SEARCH_SUGGESTIONS_TITLE_DOCUMENTATION");break;case"apiref":i=t.getText("SEARCH_SUGGESTIONS_TITLE_API_REFERENCE");break;case"entity":i=t.getText("SEARCH_SUGGESTIONS_TITLE_SAMPLES");break;default:i=t.getText("SEARCH_SUGGESTIONS_TITLE_ALL")}return i},onSearchResultsSummaryPress:function(e){var t=e.oSource.data("category");this.navToSearchResults(t)},onSearchPickerItemPress:function(e){var t=e.oSource.getBindingContextPath(),i=this.getModel("searchData").getProperty(t);this.getRouter().parsePath(i.path);this.oPicker.close()},_updateAppearance:function(e){if(e===j&&this._bSupportsPrefersColorScheme){this._toggleLightOrDarkAppearance(window.matchMedia("(prefers-color-scheme: dark)").matches);this._attachPrefersColorSchemeChangeListener()}else{D.applyTheme(z[e])}this._sLastKnownAppearanceKey=e;this.bus.publish("themeChanged","onDemoKitThemeChanged",{sThemeActive:z[e]});if(this._oConfigUtil.getCookieValue(this._oCookieNames.ALLOW_REQUIRED_COOKIES)==="1"){this._oConfigUtil.setCookie(q,e)}},_toggleLightOrDarkAppearance:function(e){if(e){D.applyTheme(z[G])}else{D.applyTheme(z[H])}},_attachPrefersColorSchemeChangeListener:function(){var e=this;if(!this._bAttachedPrefersColorSchemeChangeListener){var t=window.matchMedia("(prefers-color-scheme: dark)");var i=function(t){if(e._sLastKnownAppearanceKey===j){e._toggleLightOrDarkAppearance(t.matches);e.bus.publish("themeChanged","onDemoKitThemeChanged",{sThemeActive:z[t.matches?G:H]})}};if(t.addEventListener){t.addEventListener("change",i)}else{t.addListener(i)}this._bAttachedPrefersColorSchemeChangeListener=true}},_createConfigurationBasedOnURIInput:function(){var e=u.fromQuery(window.location.search);this._aConfiguration=[];if(!(e.has("sap-ui-language")||e.has("sap-language"))){this._aConfiguration.push(W)}if(!(e.has("sap-ui-theme")||e.has("sap-theme"))){this._aConfiguration.push(q)}},_applyDefaultConfiguration:function(){this._aConfiguration.forEach(function(e){if(e===W){D.getConfiguration().setLanguage(K)}else if(e===q){this._updateAppearance(j)}},this);this._oSupportedLangModel.setProperty("/selectedLang",D.getConfiguration().getLanguage())},_applyCookiesConfiguration:function(){var e,t,i;for(i=0;i<this._aConfiguration.length;i++){t=this._aConfiguration[i];e=this._oConfigUtil.getCookieValue(t);if(e!==""){if(t===W){this._setSelectedLanguage(e)}else if(t===q){this._updateAppearance(e)}this._aConfiguration.splice(i,1);i--}}if(this._aConfiguration.length>0){this._applyDefaultConfiguration()}},_prepareSupportedLangModelData:function(){return D.getConfiguration().getLanguagesDeliveredWithCore().reduce(function(e,t){var i,o=t,a=t;if(typeof t==="string"&&t.length>0){switch(t){case"sh":o="sr_Latn";break;case"no":o="nb";break;case"iw":o="he";a="he";break;case"zh_TW":a="zh_Hant";break;case"zh_CN":a="zh_Hans";break}e.push(new Promise(function(e,s){I.loadResource("sap/ui/core/cldr/"+o+".json",{async:true}).then(function(o){i=o.languages[a];e({text:typeof i==="string"?i.charAt(0).toUpperCase()+i.substring(1):"Unknown",key:t})})}))}return e},[])},_setSelectedLanguage:function(e){this._oSupportedLangModel.setProperty("/selectedLang",e);D.getConfiguration().setLanguage(e);if(this._oConfigUtil.getCookieValue(this._oCookieNames.ALLOW_REQUIRED_COOKIES)==="1"){this._oConfigUtil.setCookie(W,e)}},_getSelectedLanguage:function(){return this._oSupportedLangModel.getProperty("/selectedLang")},settingsDialogOpen:function(){var e;if(!this._oSettingsDialog){g.load({name:"sap.ui.documentation.sdk.view.globalSettingsDialog",controller:this}).then(function(e){this._oView.addDependent(e);this._oSettingsDialog=e;D.byId("LanguageSelect").setSelectedKey(this._getSelectedLanguage());this._oSettingsDialog.open()}.bind(this))}else{this._oSettingsDialog.open()}if(!this._oSupportedLangModel.getProperty("/langs")){e=this._oSupportedLangModel;e.setProperty("/selectBusy",true);Promise.all(this._prepareSupportedLangModelData()).then(function(t){e.setProperty("/selectBusy",false);e.setProperty("/langs",t)})}},handleCloseAppSettings:function(){this._oSettingsDialog.close()},handleSaveAppSettings:function(){var e=D.byId("LanguageSelect").getSelectedKey();this._oSettingsDialog.close();this._applyAppConfiguration(e)},_applyAppConfiguration:function(e){this._setSelectedLanguage(e)},aboutDialogOpen:function(){if(!this._oAboutDialog){this._oAboutDialog=new sap.ui.xmlfragment("aboutDialogFragment","sap.ui.documentation.sdk.view.AboutDialog",this);this._oView.addDependent(this._oAboutDialog)}else{this._oAboutDialog.getContent()[0].backToTop()}this._oAboutDialog.open()},aboutDialogClose:function(e){this._oAboutDialog.close()},onAboutVersionDetails:function(e){var t=this.getModel("appView"),i=t.getData(),o=this;d._loadAllLibInfo("","_getLibraryInfo","",function(e,a){var s={};var n=d._getLibraryInfoSingleton();for(var r=0,l=e.length;r<l;r++){e[r]=a[e[r]];e[r].libDefaultComponent=n._getDefaultComponent(e[r])}s.libs=e;i.oVersionInfo=s;t.setData(i);o.setModel(t,"appView")});var a=g.byId("aboutDialogFragment","aboutNavCon"),s=g.byId("aboutDialogFragment","aboutDetail");a.to(s)},onAboutThirdParty:function(e){var t=this.getModel("appView"),i=t.getData(),o=this;d._loadAllLibInfo("","_getThirdPartyInfo",function(e,a){if(!e){return}var s={};s.thirdparty=[];for(var n=0;n<e.length;n++){var r=a[e[n]];for(var l=0;l<r.libs.length;l++){var h=r.libs[l];h._lib=e[n];s.thirdparty.push(h)}}s.thirdparty.sort(function(e,t){var i=(e.displayName||"").toUpperCase();var o=(t.displayName||"").toUpperCase();if(i>o){return 1}else if(i<o){return-1}else{return 0}});i.oThirdPartyInfo=s;t.setData(i);o.setModel(t,"appView")});var a=g.byId("aboutDialogFragment","aboutNavCon"),s=g.byId("aboutDialogFragment","aboutThirdParty");a.to(s)},onReleaseDialogOpen:function(e){var t=d._getLibraryInfoSingleton(),i=e.getSource().data("version"),o=e.getSource().data("library"),a=new l,s=new l,n=this;if(!this._oReleaseDialog){this._oReleaseDialog=new sap.ui.xmlfragment("releaseDialogFragment","sap.ui.documentation.sdk.view.ReleaseDialog",this);this._oView.addDependent(this._oReleaseDialog)}if(!this._oNotesView){this._oNotesView=sap.ui.view({id:"notesView",viewName:"sap.ui.documentation.sdk.view.ReleaseNotesView",type:"Template"});this._oNotesView.setModel(a)}t._getReleaseNotes(o,i,function(e,t){var i={};if(e&&e[t]&&e[t].notes&&e[t].notes.length>0){n._oNotesView.getModel().setData(e);n._oNotesView.bindObject("/"+t)}else{i.noData=true}i.library=o;s.setData(i)});this._oReleaseDialog.setModel(s);this._oReleaseDialog.addContent(this._oNotesView);this._oReleaseDialog.open()},onReleaseDialogClose:function(e){this._oReleaseDialog.close()},onAboutNavBack:function(e){var t=g.byId("aboutDialogFragment","aboutNavCon");t.back()},onChangeVersionButtonPress:function(){this.getVersionSwitchDialog().open()},onCloseVersionDialog:function(){this.getVersionSwitchDialog().close()},onChangeVersionDialogSearch:function(e){var t=e.getParameter("newValue"),i=new n("version",r.Contains,t),o=D.byId("versionList"),a=o.getBinding("items");a.filter([i]);if(a.getChildCount()===1){a.expand(0)}else{o.collapseAll()}},onLogoIconPress:function(){this.oRouter.navTo("welcome",{})},onSiteMapPress:function(){this.oRouter.navTo("sitemap",{})},onLatestVersionItemPress:function(){if(k.getResourcesVersion()){window.sessionStorage.removeItem("versionPrefixPath");window.location.reload()}else{window.location.href="/"}},onVersionItemPress:function(e){var t=sap.ui.getCore().byId("versionList").getSelectedItem(),i=t.getCustomData()[0];if(i&&i.getKey()==="path"){if(k.getHasProxy()){window.sessionStorage.setItem("versionPrefixPath",i.getValue());window.location.reload()}else{window.location.href=i.getValue()}}},getVersionSwitchDialog:function(){if(!this._oChangeVersionDialog){this._createVersionDialog()}return this._oChangeVersionDialog},versionSwitchCustomComparator:function(e,t){return b(e).compareTo(b(t))},_updateVersionSwitchVisibility:function(){var e=this.getModel("appView"),t=e.getProperty("/bPhoneSize");e.setProperty("/bShowVersionSwitchInHeader",!t&&!!this._aNeoAppVersions);e.setProperty("/bShowVersionSwitchInMenu",t&&!!this._aNeoAppVersions)},_createVersionDialog:function(){this._oChangeVersionDialog=new sap.ui.xmlfragment("sap.ui.documentation.sdk.view.ChangeVersionDialog",this);this._oChangeVersionDialog.setModel(this._buildVersionDialogModel());this._oView.addDependent(this._oChangeVersionDialog)},_buildVersionDialogModel:function(){var e=new l;e.setSizeLimit(1e3);e.setData(this._aNeoAppVersions);e.setData(this._arrToTreeConverter(this._aNeoAppVersions));return e},feedbackDialogOpen:function(){var e=this;var t;if(!this._oFeedbackDialog){t=this.getModel("i18n").getResourceBundle();this._oFeedbackDialog=new sap.ui.xmlfragment("feedbackDialogFragment","sap.ui.documentation.sdk.view.FeedbackDialog",this);this._oView.addDependent(this._oFeedbackDialog);this._oFeedbackDialog.textInput=g.byId("feedbackDialogFragment","feedbackInput");this._oFeedbackDialog.contextCheckBox=g.byId("feedbackDialogFragment","pageContext");this._oFeedbackDialog.contextData=g.byId("feedbackDialogFragment","contextData");this._oFeedbackDialog.ratingStatus=g.byId("feedbackDialogFragment","ratingStatus");this._oFeedbackDialog.ratingStatus.value=0;this._oFeedbackDialog.sendButton=g.byId("feedbackDialogFragment","sendButton");this._oFeedbackDialog.ratingBar=[{button:g.byId("feedbackDialogFragment","excellent"),status:"Excellent",displayStatus:t.getText("FEEDBACK_DIALOG_STATUS_EXCELLENT")},{button:g.byId("feedbackDialogFragment","good"),status:"Good",displayStatus:t.getText("FEEDBACK_DIALOG_STATUS_GOOD")},{button:g.byId("feedbackDialogFragment","average"),status:"Average",displayStatus:t.getText("FEEDBACK_DIALOG_STATUS_AVERAGE")},{button:g.byId("feedbackDialogFragment","poor"),status:"Poor",displayStatus:t.getText("FEEDBACK_DIALOG_STATUS_POOR")},{button:g.byId("feedbackDialogFragment","veryPoor"),status:"Very Poor",displayStatus:t.getText("FEEDBACK_DIALOG_STATUS_VERY_POOR")}];this._oFeedbackDialog.reset=function(){this.sendButton.setEnabled(false);this.textInput.setValue("");this.contextCheckBox.setSelected(true);this.ratingStatus.setText("");this.ratingStatus.setState("None");this.ratingStatus.value=0;this.contextData.setVisible(false);this.ratingBar.forEach(function(e){if(e.button.getPressed()){e.button.setPressed(false)}})};this._oFeedbackDialog.updateContextData=function(){var t=e._getUI5Version(),i=e._getUI5Distribution();if(this.contextCheckBox.getSelected()){this.contextData.setValue("Location: "+e._getCurrentPageRelativeURL()+"\n"+i+" Version: "+t)}else{this.contextData.setValue(i+" Version: "+t)}};this._oFeedbackDialog.updateContextData()}this._oFeedbackDialog.updateContextData();if(!this._oFeedbackDialog.isOpen()){S("sapUiSizeCompact",this.getView(),this._oFeedbackDialog);this._oFeedbackDialog.open()}},onFeedbackDialogSend:function(){var e=b(sap.ui.version),i={text:this._oFeedbackDialog.textInput.getValue(),rating:this._oFeedbackDialog.ratingStatus.value,major:e.getMajor(),minor:e.getMinor(),patch:e.getPatch(),distribution:this._getUI5Distribution(),snapshot:e.getSuffix().indexOf("SNAPSHOT")>-1,url:this._getCurrentURL(),page:this._getCurrentPageRelativeURL(),pageContext:this._oFeedbackDialog.contextCheckBox.getSelected()},o=this.getModel("i18n").getResourceBundle();this._oFeedbackDialog.setBusyIndicatorDelay(0);this._oFeedbackDialog.setBusy(true);t.ajax({url:O,type:"POST",contentType:"application/json",data:JSON.stringify(i)}).done(function(){f.success(o.getText("FEEDBACK_DIALOG_TEXT_SUCCESS"),{title:o.getText("FEEDBACK_DIALOG_TITLE_SUCCESS")});this._oFeedbackDialog.reset();this._oFeedbackDialog.close();this._oFeedbackDialog.setBusy(false)}.bind(this)).fail(function(e,t,i){var a=i;f.error(o.getText("FEEDBACK_DIALOG_TEXT_ERROR")+a,{title:o.getText("FEEDBACK_DIALOG_TITLE_ERROR")});this._oFeedbackDialog.setBusy(false)}.bind(this))},onFeedbackDialogCancel:function(){this._oFeedbackDialog.reset();this._oFeedbackDialog.close()},onShowHideContextData:function(){this._oFeedbackDialog.contextData.setVisible(!this._oFeedbackDialog.contextData.getVisible())},onContextSelect:function(){this._oFeedbackDialog.updateContextData()},onPressRatingButton:function(e){var t=this;var i=e.getSource();t._oFeedbackDialog.ratingBar.forEach(function(e){if(i!==e.button){e.button.setPressed(false)}else{if(!e.button.getPressed()){o("None","",0)}else{switch(e.status){case"Excellent":o("Success",e.displayStatus,5);break;case"Good":o("Success",e.displayStatus,4);break;case"Average":o("None",e.displayStatus,3);break;case"Poor":o("Warning",e.displayStatus,2);break;case"Very Poor":o("Error",e.displayStatus,1)}}}});function o(e,i,o){t._oFeedbackDialog.ratingStatus.setState(e);t._oFeedbackDialog.ratingStatus.setText(i);t._oFeedbackDialog.ratingStatus.value=o;if(o){t._oFeedbackDialog.sendButton.setEnabled(true)}else{t._oFeedbackDialog.sendButton.setEnabled(false)}}},onSearch:function(e){var t=encodeURIComponent(e.getParameter("query"));if(!t){return}this.getRouter().navTo("search",{searchParam:t},false);this.oPicker.close()},navToSearchResults:function(e){var t=this.getModel("searchData").getProperty("/query"),i={searchParam:t};if(!t){return}if(e){i["?options"]={category:e}}this.getRouter().navTo("search",i,true);this.oPicker.close()},onSearchLiveChange:function(e){var t=this.getModel("searchData"),i=e.getParameter("newValue"),o=t.getProperty("/preferencedCategory"),s=t.getProperty("/includeDeprecated");if(!this.oPicker){this.oPicker=this.createSearchPicker()}if(!this.oPicker.isOpen()){this.oPicker.open()}if(this.highlighter){this.highlighter.highlight(i)}t.setProperty("/query",i);a.search(i,{preferencedCategory:o,includeDeprecated:s}).then(function(e){t.setProperty("/matches",e.matches)})},onHeaderResize:function(e){var t=e.size.width,i=c.system.phone||t<c.media._predefinedRangeSets[c.media.RANGESETS.SAP_STANDARD_EXTENDED].points[0],o=this.getModel("appView"),a=o.getProperty("/bSearchMode");if(i!==o.getProperty("/bPhoneSize")){o.setProperty("/bPhoneSize",i);this._updateVersionSwitchVisibility();this._tabHeader.setVisible(!i);this._selectHeader.setVisible(i)}if(a){this._selectHeader.setVisible(false)}},_onOrientationChange:function(){this.getModel("appView").setProperty("/bLandscape",c.orientation.landscape)},onToggleSearchMode:function(e){var t=e.getParameter("isOpen"),i=this.getModel("appView"),o=i.getProperty("/bPhoneSize");i.setProperty("/bSearchMode",t);if(t){a.init();setTimeout(function(){this._oView.byId("searchControl").getAggregation("_searchField").getFocusDomRef().focus()}.bind(this),0);if(o){this._selectHeader.setVisible(false)}}else if(o){this._selectHeader.setVisible(true)}},_registerFeedbackRatingIcons:function(){p.addIcon("icon-face-very-bad","FeedbackRatingFaces",{fontFamily:"FeedbackRatingFaces",content:"E086",suppressMirroring:true});p.addIcon("icon-face-bad","FeedbackRatingFaces",{fontFamily:"FeedbackRatingFaces",content:"E087",suppressMirroring:true});p.addIcon("icon-face-neutral","FeedbackRatingFaces",{fontFamily:"FeedbackRatingFaces",content:"E089",suppressMirroring:true});p.addIcon("icon-face-happy","FeedbackRatingFaces",{fontFamily:"FeedbackRatingFaces",content:"E08B",suppressMirroring:true});p.addIcon("icon-face-very-happy","FeedbackRatingFaces",{fontFamily:"FeedbackRatingFaces",content:"E08C",suppressMirroring:true})},_processVersionOverview:function(e){var t=e.versions,i=[];if(Array.isArray(t)){t=t.filter(function(e){return!!e.hidden}).forEach(function(e){var t=e.hidden.split(",").map(function(e){return e.trim()});i=i.concat(t)})}return i},_processNeoAppJSON:function(e){var t=this.getModel("versionData"),i=t.getProperty("/isInternal"),o=t.getProperty("/isSnapshotVersion"),a=[];if(!(e&&e.routes)){m.warning("No versions were found");return}a=e.routes;a.pop();if(!i&&!o){a=a.filter(function(e){return e.target.version.indexOf("-beta")===-1})}a=a.map(function(e){var t=b(e.target.version),i={};i.patchVersion=t.getPatch();i.groupTitle=t.getMajor()+"."+t.getMinor();i.version=t.toString();i.path=e.path;return i});return a},_requestVersionInfo:function(){Promise.all([t.ajax(E),t.ajax(F)]).then(function(e){var t=this._processNeoAppJSON(e[0]),i=this._processVersionOverview(e[1]);if(Array.isArray(t)){t=t.filter(function(e){return i.indexOf(e.version)===-1});this._aNeoAppVersions=t;this._updateVersionSwitchVisibility();this.getModel("versionData").setProperty("/latestVersion",this._aNeoAppVersions[0].version)}else{m.warning("No multi-version environment detected")}}.bind(this),function(){m.warning("No neo-app.json or versionoverview.json was detected")})},_getUI5Version:function(){return k.getResourcesVersion()?window.sessionStorage.getItem("versionPrefixPath"):this.getModel("versionData").getProperty("/version")},_getUI5VersionGav:function(){return this.getModel("versionData").getProperty("/versionGav")},_getUI5Distribution:function(){var e=this._getUI5VersionGav();var t="SAPUI5";if(e&&/openui5/i.test(e)){t="OpenUI5"}return t},_getCurrentPageRelativeURL:function(){var e=window.location;return e.pathname+e.hash+e.search},_getCurrentURL:function(){var e=window.location;return e.href},_setHeaderSelectedKey:function(e){this._selectHeader.setSelectedKey(e);this._tabHeader.setSelectedKey(e);this._sKey=e},onCloseImportantMessage:function(e){var t=this._oConfigUtil.getCookieValue(this._oCookieNames["DEMOKIT_IMPORTANT_MESSAGES_READ"]).split(",").filter(function(e){return e!==""}),i=e.getSource().getCustomData().find(function(e){return e.getKey()==="messageID"}),o=i.getValue();t.push(o);this._oConfigUtil.setCookie(this._oCookieNames["DEMOKIT_IMPORTANT_MESSAGES_READ"],t.join(","));this._updateMessagesModel(this.getModel("messagesData").getData())}})});