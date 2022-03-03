/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/documentation/sdk/controller/BaseController","sap/ui/model/json/JSONModel","sap/ui/documentation/sdk/controller/util/NewsInfo","sap/ui/core/Core","sap/m/library"],function(e,t,o,n,s){"use strict";return e.extend("sap.ui.documentation.sdk.controller.News",{onInit:function(){this.getRouter().getRoute("news").attachPatternMatched(this._onMatched,this);this._oModel=new t;this.setModel(this._oModel);o.prepareNewsData(this.getOwnerComponent().getConfigUtil());n.getEventBus().subscribe("newsChanged","onDemoKitNewsChanged",this._syncModelWithNewsInfo,this)},onAfterRendering:function(){this._syncModelWithNewsInfo()},handleNewsItemClose:function(e){var t=e.getSource(),n=t.getCustomData()[0].getValue(),s=this._oModel.getProperty("/new").find(function(e){return e.id===n});o.moveNewItemToOld(s)},handleMarkAsRead:function(){o.moveAllNewItemsToOld()},handleVisitLink:function(e){var t=e.getSource(),o=t.getCustomData()[0].getValue();s.URLHelper.redirect(o,true)},_syncModelWithNewsInfo:function(){var e=o.getPreparationFailureMessage();if(!e){this._oModel.setProperty("/new",o.getNewNewsArray().slice());this._oModel.setProperty("/old",o.getOldNewsArray().slice())}this._oModel.setProperty("/preparationFailureMessage",e)},_onMatched:function(){try{this.hideMasterSide()}catch(e){}}})});