/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Control","./DataTableFilterRangeRenderer"],function(t,e,a){"use strict";var n=e.extend("sap.ui.documentation.sdk.DataTableFilterRange",{metadata:{aggregations:{from:{type:"sap.m.Input",multiple:false},to:{type:"sap.m.Input",multiple:false}}},renderer:a});n.M_EVENTS={LIVECHANGE:"liveChange"};n.prototype.onBeforeRendering=function(){this.attachEvents()};n.prototype.attachEvents=function(){var t,e,a;if(!this.bEventsAttached){this.bEventsAttached=true;e=this.getAggregation("from");a=this.getAggregation("to");[e,a].forEach(function(n){n.attachLiveChange(function(){t={from:e.getValue(),to:a.getValue()};this.fireEvent("liveChange",{value:t})},this)},this)}};return n});