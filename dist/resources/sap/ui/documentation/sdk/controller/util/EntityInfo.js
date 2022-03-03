/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./APIInfo","sap/base/util/ObjectPath"],function(e,i){"use strict";function n(e){var i=sap.ui.getVersionInfo(),n,r,t;if(i&&Array.isArray(i.libraries)){r=i.libraries.length;for(t=0;t<r;t++){n=i.libraries[t];if(e===n.name||e.indexOf(n.name+".")===0){return n.name}}}return"sap.ui.core"}function r(r,t){var a;if(!t){var u=i.get(r||"");if(u&&u.getMetadata){var s=u.getMetadata();if(s.getLibraryName){t=s.getLibraryName()}else{t="sap.ui.core"}}else{t=n(r)}}return e.getLibraryElementsJSONPromise(t).then(function(e){var i;for(var n=0,t=e.length;n<t;n++){if(e[n].name===r){i=e[n];break}}if(i){a={baseType:i.extends,deprecation:i.deprecatedText?i.deprecatedText:null,doc:i.description,module:i.module,name:i.name,since:i.since,values:i.properties,uxGuidelinesLink:i.uxGuidelinesLink,uxGuidelinesLinkText:i.uxGuidelinesLinkText,docuLink:i.docuLink,docuLinkText:i.docuLinkText}}return a})}return{getEntityDocuAsync:function(e,i){return r(e,i)}}},true);