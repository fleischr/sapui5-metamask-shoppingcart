/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides reuse functionality for reading documentation topics from index.json files.
sap.ui.define(["sap/ui/thirdparty/jquery", "sap/ui/documentation/sdk/util/Resources"],
	function (jQuery, ResourcesUtil) {
		"use strict";

		var oCachedData;

		function _getDocuIndexPromise(oConfig) {
			if (oCachedData) {
				return Promise.resolve(oCachedData);
			}

			return new Promise(function (resolve, reject) {
				jQuery.ajax({
					async: true,
					url: ResourcesUtil.getResourceOriginPath(oConfig.docuPath + "index.json"),
					dataType: 'json',
					success: function (oData) {
						oCachedData = oData;
						resolve(oData);
					},
					error: function (oError) {
						reject(oError);
					}
				});
			});

		}

		return {
			getDocuIndexPromise: _getDocuIndexPromise
		};
	});