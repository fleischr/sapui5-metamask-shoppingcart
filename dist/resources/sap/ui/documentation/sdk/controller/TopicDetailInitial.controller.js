/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/documentation/sdk/controller/BaseController","sap/ui/Device","sap/ui/thirdparty/jquery"],function(e,n,t){"use strict";var i="https://github.com/SAP/openui5-docs";return e.extend("sap.ui.documentation.sdk.controller.TopicDetailInitial",{onInit:function(){e.prototype.onInit.call(this);this._onOrientationChange({landscape:n.orientation.landscape});this.handleDocumentationDisclaimer()},handleDocumentationDisclaimer:function(){t.ajax(this.getConfig().docuPath+"disclaimer.json",{dataType:"json"}).then(function(e){var n=this.getView();if(e.showDisclaimer&&e.message){n.byId("disclaimerBlock").setVisible(true);n.byId("disclaimerMessage").setText(e.message)}}.bind(this),function(){})},onBeforeRendering:function(){this._deregisterOrientationChange()},onAfterRendering:function(){this._registerOrientationChange()},onExit:function(){this._deregisterOrientationChange()},onDownloadButtonPress:function(){window.open(this._determineFileLocation(),"_blank")},onGitHubButtonPress:function(){window.open(i,"_blank")},_determineFileLocation:function(){var e=this.getModel("versionData"),n=e.getProperty("/isDevVersion"),t=e.getProperty("/isOpenUI5");if(t){return"https://help.sap.com/OpenUI5_PDF/OpenUI5.pdf"}return n?"https://help.sap.com/DRAFT/SAPUI5_Internal_PDF/SAPUI5_Internal.pdf":"https://help.sap.com/SAPUI5_PDF/SAPUI5.pdf"}})});