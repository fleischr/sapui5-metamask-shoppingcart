/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/m/library"],function(e,t){"use strict";var a=t.SwitchType;var i={apiVersion:2};i.CSS_CLASS="sapMSwt";i.render=function(t,a){var n=a.getState(),s=n?a._sOn:a._sOff,l=a.getTooltip_AsString(),d=a.getEnabled(),r=a.getName(),c=sap.ui.getCore().getConfiguration().getAccessibility(),o=sap.ui.getCore().getConfiguration().getAnimation(),p=i.CSS_CLASS;t.openStart("div",a);t.class(p+"Cont");if(!d){t.class(p+"ContDisabled")}if(d){t.attr("tabindex","0")}if(l){t.attr("title",l)}if(c){this.writeAccessibilityState(t,a)}t.openEnd();t.openStart("div",a.getId()+"-switch");t.attr("aria-hidden","true");t.class(p);if(o){t.class(p+"Trans")}t.class(n?p+"On":p+"Off");t.class(p+a.getType());if(e.system.desktop&&d){t.class(p+"Hoverable")}if(!d){t.class(p+"Disabled")}if(a._sOn===" "&&a._sOff===" "){t.class(p+"NoLabel")}t.openEnd();t.openStart("div",a.getId()+"-inner");t.class(p+"Inner");t.openEnd();this.renderText(t,a);this.renderHandle(t,a,s);t.close("div");t.close("div");if(r){this.renderCheckbox(t,a,s)}if(c){this.renderInvisibleElement(t,a,{id:a.getInvisibleElementId(),text:a.getInvisibleElementText(n)})}t.close("div")};i.renderText=function(e,t){var n=i.CSS_CLASS,s=t.getType()===a.Default;e.openStart("div",t.getId()+"-texton");e.class(n+"Text");e.class(n+"TextOn");e.openEnd();e.openStart("span");e.class(n+"Label");e.class(n+"LabelOn");e.openEnd();if(s){e.text(t._sOn)}e.close("span");e.close("div");e.openStart("div",t.getId()+"-textoff");e.class(n+"Text");e.class(n+"TextOff");e.openEnd();e.openStart("span");e.class(n+"Label");e.class(n+"LabelOff");e.openEnd();if(s){e.text(t._sOff)}e.close("span");e.close("div")};i.renderHandle=function(e,t,a){var n=i.CSS_CLASS;e.openStart("div",t.getId()+"-handle");e.attr("data-sap-ui-swt",a);e.class(n+"Handle");e.openEnd();e.close("div")};i.renderCheckbox=function(e,t,a){e.voidStart("input",t.getId()+"-input");e.attr("type","checkbox");e.attr("name",t.getName());e.attr("value",a);if(t.getState()){e.attr("checked","checked")}if(!t.getEnabled()){e.attr("disabled","disabled")}e.voidEnd()};i.writeAccessibilityState=function(e,t){var a=t.getAriaLabelledBy(),i;if(a){a={value:t.getInvisibleElementId(),append:true}}i={role:"switch",checked:t.getState(),labelledby:a};e.accessibilityState(t,i)};i.renderInvisibleElement=function(e,t,a){e.openStart("span",a.id);e.attr("aria-hidden","true");e.class("sapUiInvisibleText");e.openEnd();e.text(a.text);e.close("span")};return i},true);