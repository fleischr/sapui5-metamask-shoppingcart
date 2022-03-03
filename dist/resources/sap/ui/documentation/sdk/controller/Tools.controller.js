/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/documentation/sdk/controller/BaseController","sap/base/Log","sap/ui/documentation/sdk/model/formatter","sap/ui/model/json/JSONModel","sap/ui/documentation/sdk/controller/util/ToolsInfo"],function(t,e,o,n,i,s){"use strict";return e.extend("sap.ui.documentation.sdk.controller.Tools",{formatter:n,onInit:function(){e.prototype.onInit.call(this);this._onOrientationChange({landscape:t.orientation.landscape});this._oModel=new i;this.getView().setModel(this._oModel);s.getToolsConfig().then(this._onToolConfigLoaded.bind(this));this.getRouter().getRoute("tools").attachPatternMatched(this._onMatched,this)},_onToolConfigLoaded:function(t){var e={};t.forEach(function(t){e[t.id]=t},this);this._oModel.setData(e);this.setModel(new i({inspectorHomeLink:"topic/b24e72443eb34d0fb7bf6940f2d697eb",supportAssistantHomeLink:e.supportAssistant.href,iconExplorerHomeLink:"topic/21ea0ea94614480d9a910b2e93431291"}),"newWindowLinks")},onBeforeRendering:function(){this._deregisterOrientationChange()},onAfterRendering:function(){this._registerOrientationChange()},onExit:function(){this._deregisterOrientationChange()},_onMatched:function(){try{this.hideMasterSide()}catch(t){o.error(t)}}})});