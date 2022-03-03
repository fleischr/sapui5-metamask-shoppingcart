/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/m/Button","sap/m/library","sap/ui/core/Core","sap/m/SearchField"],function(e,t,n,i,a){"use strict";var r=e.extend("sap.ui.documentation.Search",{metadata:{library:"sap.ui.documentation",properties:{isOpen:{type:"boolean",group:"Appearance",defaultValue:false},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},value:{type:"string",group:"Data",defaultValue:null}},aggregations:{_openingButton:{type:"sap.m.Button",multiple:false},_closingButton:{type:"sap.m.Button",multiple:false},_searchField:{type:"sap.m.SearchField",multiple:false},suggestionItems:{type:"sap.m.SuggestionItem",multiple:true,singularName:"suggestionItem",forwarding:{getter:"_lazyLoadSearchField",aggregation:"suggestionItems"}}},events:{toggle:{isOpen:{type:"boolean"}},search:{parameters:{query:{type:"string"},suggestionItem:{type:"sap.m.SuggestionItem"},refreshButtonPressed:{type:"boolean"},clearButtonPressed:{type:"boolean"}}},liveChange:{parameters:{newValue:{type:"string"}}},suggest:{parameters:{suggestValue:{type:"string"}}}}},renderer:{apiVersion:2,render:function(e,t){var n=t.getWidth(),i,a,r;e.openStart("div",t);e.style("width",n);e.class("sapUiDocumentationSearch");e.openEnd();if(t.getIsOpen()){r=t._lazyLoadSearchField(true);a=t._lazyLoadClosingButton(true);e.renderControl(r);e.renderControl(a)}else{i=t._lazyLoadOpeningButton(true);e.renderControl(i)}e.close("div")}}});r.prototype.onAfterRendering=function(){if(this.getIsOpen()){this._maximizeSearchField()}};r.prototype.onsapescape=function(){if(this.getIsOpen()){this._toggleOpen(false)}};r.prototype.getValue=function(){return this._lazyLoadSearchField().getValue()};r.prototype.setValue=function(e){this._lazyLoadSearchField().setValue(e);return this};r.prototype._maximizeSearchField=function(){return this._resizeSearchField("100%")};r.prototype._minimizeSearchField=function(){return this._resizeSearchField("10%")};r.prototype.suggest=function(){this._lazyLoadSearchField().suggest()};r.prototype.attachSuggest=function(){a.prototype.attachSuggest.apply(this._lazyLoadSearchField(),arguments);return this};r.prototype._resizeSearchField=function(e){return new Promise(function(t,n){var i=this.$("searchField");if(!i.length){n()}if(i.css("max-width")===e){t()}i.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(){t()});i.css("max-width",e)}.bind(this))};r.prototype._toggleOpen=function(e){this.setIsOpen(e);this.fireToggle({isOpen:e})};r.prototype._lazyLoadOpeningButton=function(e){if(!this.getAggregation("_openingButton")){var i=new t(this.getId()+"-openingBtn",{icon:"sap-icon://search",type:n.ButtonType.Transparent,press:function(){this._toggleOpen(true)}.bind(this)});i.addStyleClass("sdkHeaderSearchButton");this.setAggregation("_openingButton",i,e)}return this.getAggregation("_openingButton")};r.prototype._lazyLoadClosingButton=function(e){if(!this.getAggregation("_closingButton")){var a=new t(this.getId()+"-closingBtn",{text:i.getLibraryResourceBundle("sap.ui.documentation").getText("APP_SEARCH_FIELD_CLOSE"),type:n.ButtonType.Transparent,press:function(){this._minimizeSearchField().then(function(){this._toggleOpen(false)}.bind(this))}.bind(this)});this.setAggregation("_closingButton",a,e)}return this.getAggregation("_closingButton")};r.prototype._lazyLoadSearchField=function(e){if(!this.getAggregation("_searchField")){var t=new a(this.getId()+"-searchField",{showSearchButton:true,search:function(e){var t=e.getParameters();t.id=this.getId();this.fireSearch(t)}.bind(this),liveChange:function(e){var t=e.getParameters();t.id=this.getId();this.fireLiveChange(t)}.bind(this)});t.addStyleClass("sdkHeaderSearchField");this.setAggregation("_searchField",t,e)}return this.getAggregation("_searchField")};r.prototype._updateValue=function(e){this._lazyLoadSearchField()._updateValue(e)};return r});