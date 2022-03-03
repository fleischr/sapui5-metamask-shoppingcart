/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/documentation/sdk/util/Resources"],function(e,n){"use strict";var r;function u(u){if(r){return Promise.resolve(r)}return new Promise(function(t,i){e.ajax({async:true,url:n.getResourceOriginPath(u.docuPath+"index.json"),dataType:"json",success:function(e){r=e;t(e)},error:function(e){i(e)}})})}return{getDocuIndexPromise:u}});