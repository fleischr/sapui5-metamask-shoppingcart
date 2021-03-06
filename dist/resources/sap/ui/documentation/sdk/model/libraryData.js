/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/documentation/library","sap/base/Log"],function(e,r,t){"use strict";function n(r,t,n){var o=[];if(e.isPlainObject(r.links)){o=Object.keys(r.links).map(function(e){return{name:e,ref:r.links[e]}})}var i={lib:r.namespace||n,name:r.text,icon:r.icon,desc:r.desc,config:r.config,teaser:r.teaser,category:r.category,ref:(r.resolve==="lib"?t:"")+r.ref+"?sap-ui-theme=sap_fiori_3",links:o};return i}function o(e,r){var o=["Showcase","Tutorial","Template","RTA","Misc"];var i={};o.forEach(function(e){i[e]=[]});var a={demoApps:[],demoAppsByCategory:[]};for(var s=0;s<e.length;s++){var c=r[e[s]].demo;if(!c){continue}if(c.links&&c.links.length>0){for(var f=0;f<c.links.length;f++){var u=n(c.links[f],r[e[s]].libraryUrl,c.text);a.demoApps.push(u);if(o.indexOf(u.category)<0){t.warning('Demo app category "'+u.category+'" not found, correcting demo app "'+u.name+'" to "Misc"');u.category="Misc"}if(c.links[f].category!=="Tool"){i[u.category].push(u)}}}}Object.keys(i).forEach(function(e){if(i[e].length===0){return}var r=[];var t=r.push([]);var n=0;for(var o=0;o<i[e].length;o++){n++;if(i[e][o].teaser){n++}if(n>4){t=r.push([]);n=0}r[t-1].push(i[e][o])}a.demoAppsByCategory.push({categoryId:e,rows:r})});return a}return{fillJSONModel:function(t){function n(r,n){t.setProperty("/bFooterVisible",true);if(!r){return}var i=t.getData();t.setData(e.extend(i,o(r,n)))}t.setProperty("/bFooterVisible",false);r._loadAllLibInfo("","_getDocuIndex",n)},getDemoAppsData:function(){return new Promise(function(e){r._loadAllLibInfo("","_getDocuIndex",function(r,t){if(!r){return}e(o(r,t))})})}}});