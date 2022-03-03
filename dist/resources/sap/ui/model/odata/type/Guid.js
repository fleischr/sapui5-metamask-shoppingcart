/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/model/FormatException","sap/ui/model/ParseException","sap/ui/model/ValidateException","sap/ui/model/odata/type/ODataType"],function(e,t,n,i,a){"use strict";var o=/[-\s]/g,r=/^[A-F0-9]{8}-([A-F0-9]{4}-){3}[A-F0-9]{12}$/i;function l(){return sap.ui.getCore().getLibraryResourceBundle().getText("EnterGuid")}function s(t,n){var i;t.oConstraints=undefined;if(n){i=n.nullable;if(i===false||i==="false"){t.oConstraints={nullable:false}}else if(i!==undefined&&i!==true&&i!=="true"){e.warning("Illegal nullable: "+i,null,t.getName())}}}var u=a.extend("sap.ui.model.odata.type.Guid",{constructor:function(e,t){a.apply(this,arguments);s(this,t)}});u.prototype.formatValue=function(e,n){if(e===undefined||e===null){return null}switch(this.getPrimitiveType(n)){case"any":case"string":return e;default:throw new t("Don't know how to format "+this.getName()+" to "+n)}};u.prototype.getName=function(){return"sap.ui.model.odata.type.Guid"};u.prototype.parseValue=function(e,t){var i;if(e===""||e===null){return null}if(this.getPrimitiveType(t)!=="string"){throw new n("Don't know how to parse "+this.getName()+" from "+t)}i=e.replace(o,"");if(i.length!==32){return e}return i.slice(0,8)+"-"+i.slice(8,12)+"-"+i.slice(12,16)+"-"+i.slice(16,20)+"-"+i.slice(20)};u.prototype.validateValue=function(e){if(e===null){if(this.oConstraints&&this.oConstraints.nullable===false){throw new i(l())}return}if(typeof e!=="string"){throw new i("Illegal "+this.getName()+" value: "+e)}if(!r.test(e)){throw new i(l())}};return u});