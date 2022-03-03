/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
/**
 * See {@link https://lodash.com/docs/4.17.21#debounce}
 *
 * @function
 * @alias module:sap/base/util/restricted/_debounce
 * @author SAP SE
 * @since 1.71
 * @version 1.97.1
 * @private
 * @ui5-restricted
*/
sap.ui.define([
	"sap/base/util/restricted/_/lodash.custom"
], function(lodash) {
	"use strict";
	return lodash.debounce;
});