/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

//Provides class sap.ui.model.odata.v2._CreatedContextsCache
sap.ui.define([
], function () {
	"use strict";

	/**
	 * Maps a binding path and a list ID, as given as <code>createdEntitiesKey</code> parameter to
	 * {@link sap.ui.model.odata.v2.ODataModel#bindList}, to a list of contexts for created
	 * entities, if the entities are created via
	 * {@link sap.ui.model.odata.v2.ODataListBinding#create}.
	 *
	 * @alias sap.ui.model.odata.v2._CreatedContextsCache
	 * @constructor
	 * @private
	 */
	function _CreatedContextsCache() {
		// binding path => { list ID => array of created OData V2 contexts }
		this.mCache = {};
	}

	/**
	 * Adds a context to the list of contexts for created entities for the given path and list ID.
	 *
	 * @param {sap.ui.model.odata.v2.Context} oCreatedContext
	 *   The context for a created entity
	 * @param {string} sPath
	 *   The resolved binding path
	 * @param {string} sListID
	 *   The identifier for the list showing the data
	 *
	 * @private
	 */
	_CreatedContextsCache.prototype.addContext = function (oCreatedContext, sPath, sListID) {
		var aContexts, mListIDToContexts;

		mListIDToContexts = this.mCache[sPath];
		if (!mListIDToContexts) {
			mListIDToContexts = this.mCache[sPath] = {};
		}
		aContexts = mListIDToContexts[sListID];
		if (!aContexts) {
			aContexts = mListIDToContexts[sListID] = [];
		}
		// currently we support only bAtEnd === false in ODataListBinding#create
		aContexts.unshift(oCreatedContext);
	};

	/**
	 * Finds and removes a context from the list of contexts for created entities.
	 *
	 * @param {sap.ui.model.odata.v2.Context} oCreatedContext
	 *   The context for a created entity to be removed
	 *
	 * @private
	 */
	_CreatedContextsCache.prototype.findAndRemoveContext = function (oCreatedContext) {
		var oResult = this.getCacheInfo(oCreatedContext);

		if (oResult) {
			this.removeContext(oCreatedContext, oResult.cachePath, oResult.listID);
		}
	};

	/**
	 * Checks whether a given context is contained in the the list of contexts for created entities
	 * and returns the path and list ID.
	 *
	 * @param {sap.ui.model.odata.v2.Context} oCreatedContext
	 *   The context to be searched in the cache
	 * @returns {{cachePath : string, listID : string}|undefined}
	 *   An object containing the cache path and the list ID if the given context is contained in
	 *   the cache, <code>undefined</code> otherwise
	 *
	 * @private
	 */
	 _CreatedContextsCache.prototype.getCacheInfo = function (oCreatedContext) {
		var oResult, that = this;

		Object.keys(this.mCache).some(function (sCachePath) {
			var mListIDToContexts = that.mCache[sCachePath];

			return Object.keys(mListIDToContexts).some(function (sListID) {
				var aContexts = that.mCache[sCachePath][sListID];

				if (aContexts.includes(oCreatedContext)) {
					oResult = {cachePath : sCachePath, listID : sListID};

					return true;
				}

				return false;
			});
		});

		return oResult;
	};

	/**
	 * Gets the contexts for created entities for the given path and list ID.
	 *
	 * @param {string} [sPath]
	 *   The resolved binding path
	 * @param {string} sListID
	 *   The identifier for the list showing the data
	 * @returns {sap.ui.model.odata.v2.Context[]}
	 *   An array containing all contexts for created entities for the given path and list ID;
	 *   returns an empty array if no path is given
	 *
	 * @private
	 */
	_CreatedContextsCache.prototype.getContexts = function (sPath, sListID) {
		var mListIDToContexts = this.mCache[sPath],
			aContexts = mListIDToContexts && mListIDToContexts[sListID];

		return aContexts ? aContexts.slice() : [];
	};

	/**
	 * Removes a context from the list of contexts for created entities for the given path and list
	 * ID.
	 *
	 * @param {sap.ui.model.odata.v2.Context} oCreatedContext
	 *   The context for a created entity to be removed
	 * @param {sPath} sPath
	 *   The resolved binding path
	 * @param {string} sListID
	 *   The identifier for the list showing the data
	 *
	 * @private
	 */
	_CreatedContextsCache.prototype.removeContext = function (oCreatedContext, sPath, sListID) {
		var mListIDToContexts = this.mCache[sPath],
			aContexts = mListIDToContexts[sListID];

		aContexts.splice(aContexts.indexOf(oCreatedContext), 1);
		if (!aContexts.length) {
			delete mListIDToContexts[sListID];
			if (!Object.keys(mListIDToContexts).length) {
				delete this.mCache[sPath];
			}
		}
	};

	/**
	 * Removes all persisted contexts from the list of contexts for created entities for the given
	 * path and list ID.
	 *
	 * @param {sPath} sPath
	 *   The resolved binding path
	 * @param {string} sListID
	 *   The identifier for the list showing the data
	 * @returns {sap.ui.model.odata.v2.Context[]}
	 *   An array of persisted contexts that have been removed from the cache
	 *
	 * @private
	 */
	_CreatedContextsCache.prototype.removePersistedContexts = function (sPath, sListID) {
		var aCreatedPersistedContexts = this.getContexts(sPath, sListID)
				.filter(function (oContext) {
					return oContext.isTransient() === false;
				}),
			that = this;

		aCreatedPersistedContexts.forEach(function (oContext) {
			oContext.resetCreatedPromise();
			that.removeContext(oContext, sPath, sListID);
		});

		return aCreatedPersistedContexts;
	};

	return _CreatedContextsCache;
}, /* bExport= */ false);