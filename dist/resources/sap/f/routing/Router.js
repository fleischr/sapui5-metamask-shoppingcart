/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/routing/Router","./TargetHandler","./Targets"],function(t,e,r){"use strict";var a=t.extend("sap.f.routing.Router",{constructor:function(){this._oTargetHandler=new e;t.prototype.constructor.apply(this,arguments)},destroy:function(){t.prototype.destroy.apply(this,arguments);this._oTargetHandler.destroy();this._oTargetHandler=null},getTargetHandler:function(){return this._oTargetHandler},_createTargets:function(t,e){return new r({views:this._oViews,config:t,targets:e,targetHandler:this._oTargetHandler})},fireRouteMatched:function(e){var r=this.getRoute(e.name),a;if(r._oTarget){a=r._oTarget._oOptions;this._oTargetHandler.addNavigation({navigationIdentifier:e.name,transition:a.transition,transitionParameters:a.transitionParameters,eventData:e.arguments,targetControl:e.targetControl,view:e.view,layout:r._oConfig.layout})}return t.prototype.fireRouteMatched.apply(this,arguments)},fireRoutePatternMatched:function(e){var r=e.name,a;if(this._oTargets&&this._oTargets._oLastDisplayedTarget){a=this._oTargets._getViewLevel(this._oTargets._oLastDisplayedTarget)}this._oTargetHandler.navigate({navigationIdentifier:r,viewLevel:a,askHistory:true});return t.prototype.fireRoutePatternMatched.apply(this,arguments)}});return a});