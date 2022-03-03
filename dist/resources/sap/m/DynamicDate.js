/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/DynamicDateUtil","sap/ui/model/SimpleType","sap/ui/model/FormatException","sap/ui/model/ParseException","sap/ui/model/ValidateException","sap/base/util/each"],function(e,t,a,r,i,n){"use strict";var o=t.extend("sap.m.DynamicDate",{constructor:function(){this.sName="DynamicDate";t.apply(this,arguments)}});o.prototype.formatValue=function(t){var a={};if(!t){return}a.operator=t.operator;a.values=t.values.slice(0);var r=e.getOption(t.operator).getValueTypes();a.values=a.values.map(function(e,t){if(r[t]==="date"){return u.parse(e)}return e},this);return a};o.prototype.parseValue=function(t){var a={},i;if(!t){return}if(t.operator==="PARSEERROR"){throw new r(t.values[0])}a.operator=t.operator;a.values=t.values.slice(0);i=e.getOption(t.operator).getValueTypes();a.values=a.values.map(function(e,t){if(i[t]==="date"){return u.format(e)}return e},this);return a};o.prototype.validateValue=function(t){if(this.oConstraints){var a=sap.ui.getCore().getLibraryResourceBundle(),r=sap.ui.getCore().getLibraryResourceBundle("sap.m"),o=[],u=[],s=e.getOption(t.operator),p=s.toDates(this.formatValue(t)).map(function(e){return e.getTime()});if(p[0]===p[1]){p.length=1}p.forEach(function(e,t){var i="DynamicDate.Invalid"+(t===0?"Start":"End");n(this.oConstraints,function(t,n){switch(t){case"minimum":if(e<n){o.push("minimum");u.push(r.getText(i,[new Date(e).toDateString()]));u.push(a.getText("Date.Minimum",[new Date(n).toDateString()]))}break;case"maximum":if(e>n){o.push("maximum");u.push(r.getText(i,[new Date(e).toDateString()]));u.push(a.getText("Date.Maximum",[new Date(n).toDateString()]))}break}})},this);if(o.length>0){throw new i(this.combineMessages(u),o)}}};var u={format:function(e){if(e instanceof Date){return e.getTime()}return null},parse:function(e){if(isNaN(e)){throw new a("Cannot format date: "+e+" is not a valid Timestamp")}else if(typeof e!=="number"){e=parseInt(e)}e=new Date(e);return e}};return o});