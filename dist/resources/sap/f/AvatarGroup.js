/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/delegate/ItemNavigation","sap/ui/dom/units/Rem","./AvatarGroupRenderer","sap/m/Button","sap/m/library","sap/ui/core/ResizeHandler","sap/ui/events/KeyCodes","sap/ui/core/Core"],function(t,e,o,i,r,a,s,n,h,p){"use strict";var u=t.AvatarGroupType;var l=s.AvatarColor;var _=s.AvatarSize;var v={XS:2,S:3,M:4,L:5,XL:7};var g={XS:.75,S:1.25,M:1.625,L:2,XL:2.75};var d={XS:.0625,S:.125,M:.125,L:.125,XL:.25};var f=e.extend("sap.f.AvatarGroup",{metadata:{library:"sap.f",properties:{groupType:{type:"sap.f.AvatarGroupType",group:"Appearance",defaultValue:u.Group},avatarDisplaySize:{type:"sap.m.AvatarSize",group:"Appearance",defaultValue:_.S}},defaultAggregation:"items",aggregations:{items:{type:"sap.f.AvatarGroupItem",multiple:true}},events:{press:{parameters:{groupType:{type:"string"},overflowButtonPressed:{type:"boolean"},avatarsDisplayed:{type:"int"}}}}}});f.prototype.init=function(){this._oShowMoreButton=new a({});this._oShowMoreButton.addStyleClass("sapFAvatarGroupMoreButton");this._bFirstRendering=true;this._onResizeRef=this._onResize.bind(this);this._iCurrentAvatarColorNumber=1;this._bShowMoreButton=false};f.prototype.exit=function(){this._detachResizeHandlers();if(this._oItemNavigation){this.removeEventDelegate(this._oItemNavigation);this._oItemNavigation.destroy();this._oItemNavigation=null}this._oShowMoreButton.destroy();this._oShowMoreButton=null};f.prototype.onBeforeRendering=function(){if(this._bFirstRendering){this._iAvatarsToShow=this.getItems().length;this._bFirstRendering=false}};f.prototype.onAfterRendering=function(){var t,e=[];if(!this._oItemNavigation){this._oItemNavigation=new o(null,null);this._oItemNavigation.setDisabledModifiers({sapnext:["alt","meta"],sapprevious:["alt","meta"]});this.addEventDelegate(this._oItemNavigation)}t=this.getDomRef();this._oItemNavigation.setRootDomRef(t);if(this.getGroupType()===u.Individual){this.getItems().forEach(function(t){e.push(t.getDomRef())});this._oItemNavigation.setItemDomRefs(e)}this._detachResizeHandlers();this._attachResizeHandlers();if(p.isThemeApplied()){this._onResize()}if(this._shouldShowMoreButton()){this._oShowMoreButton.$().attr("role","button");if(this.getGroupType()===u.Group){this._oShowMoreButton.$().attr("tabindex","-1")}else{this._oShowMoreButton.$().attr("aria-label",this._getResourceBundle().getText("AVATARGROUP_POPUP"))}}this._updateAccState()};f.prototype.onThemeChanged=function(){if(!this.getDomRef()){return}this._onResize()};f.prototype._getResourceBundle=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.f")};f.prototype._updateAccState=function(){var t=this._getResourceBundle(),e=t.getText("AVATARGROUP_NUMBER_OF_AVATARS",[this._iAvatarsToShow,this.getItems().length-this._iAvatarsToShow]),o=t.getText("AVATARGROUP_POPUP");if(this.getGroupType()===u.Group){this.$().attr("aria-label",o+" "+e)}};f.prototype._attachResizeHandlers=function(){this._iResizeHandlerId=n.register(this,this._onResizeRef)};f.prototype._detachResizeHandlers=function(){if(this._iResizeHandlerId){n.deregister(this._iResizeHandlerId);this._iResizeHandlerId=null}};f.prototype.setGroupType=function(t){this.getItems().forEach(function(e){e._setGroupType(t)});return this.setProperty("groupType",t)};f.prototype.addItem=function(t){t._setDisplaySize(this.getAvatarDisplaySize());t._setAvatarColor(l["Accent"+this._iCurrentAvatarColorNumber]);t._setGroupType(this.getGroupType());this._iAvatarsToShow=this.getItems().length;this._iCurrentAvatarColorNumber++;if(this._iCurrentAvatarColorNumber>10){this._iCurrentAvatarColorNumber=1}return this.addAggregation("items",t)};f.prototype.setAvatarDisplaySize=function(t){var e=this.getAvatarDisplaySize();this._oShowMoreButton.removeStyleClass("sapFAvatarGroupMoreButton"+e);this._oShowMoreButton.addStyleClass("sapFAvatarGroupMoreButton"+t);if(e===t){return this}this.getItems().forEach(function(e){e._setDisplaySize(t)});return this.setProperty("avatarDisplaySize",t)};f.prototype.ontap=function(t){var e=t.srcControl;this.firePress({groupType:this.getGroupType(),eventSource:e,overflowButtonPressed:e===this._oShowMoreButton,avatarsDisplayed:this._iAvatarsToShow})};f.prototype.onsapspace=function(t){this.ontap(t)};f.prototype.onsapenter=function(t){this.ontap(t)};f.prototype.onkeyup=function(t){if(t.shiftKey&&t.keyCode==h.ENTER||t.shiftKey&&t.keyCode==h.SPACE){t.preventDefault()}};f.prototype._getAvatarMargin=function(t){var e=this.getGroupType(),o;if(e===u.Group){o=g[t]}else{o=d[t]}return o};f.prototype._getAvatarNetWidth=function(t,e){var o=this.getGroupType();if(o===u.Group){return t-e}else{return t+e}};f.prototype._getAvatarsToShow=function(t,e,o){var r=i.toPx(1),a=t-e*r,s=Math.floor(a/(o*r));return s+1};f.prototype._adjustAvatarsToShow=function(t){if(t-this._iAvatarsToShow>99){this._iAvatarsToShow-=2}else{this._iAvatarsToShow--}};f.prototype._getWidth=function(){return Math.ceil(this.$().width())};f.prototype._onResize=function(){var t=this._getWidth(),e=this.getItems(),o=e.length,i=this.getAvatarDisplaySize(),r=v[i],a=this._getAvatarMargin(i),s=this._getAvatarNetWidth(r,a),n=this.$().children(".sapFAvatarGroupItem").length;this._iAvatarsToShow=this._getAvatarsToShow(t,r,s);if(o>this._iAvatarsToShow&&o>0){this._bShowMoreButton=true;this._bAutoWidth=false;this._adjustAvatarsToShow(o);if(n!=this._iAvatarsToShow){this._oShowMoreButton.setText("+"+(o-this._iAvatarsToShow));this.invalidate()}}else{this._bAutoWidth=true;this.getDomRef().style.width="auto";if(this._bShowMoreButton){this._bShowMoreButton=false;this.invalidate()}}};f.prototype._shouldShowMoreButton=function(){return this._bShowMoreButton};return f});