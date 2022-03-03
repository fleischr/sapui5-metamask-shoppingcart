/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/m/library","sap/ui/core/Element","sap/ui/core/util/File","sap/ui/Device","sap/ui/core/Item","sap/m/upload/UploadSetItem","sap/m/upload/UploaderHttpRequestMethod"],function(e,t,a,o,r,s,d,n){"use strict";var p=a.extend("sap.m.upload.Uploader",{metadata:{library:"sap.m",publicMethods:["uploadItem","terminateItem","downloadItem"],properties:{uploadUrl:{type:"string",defaultValue:null},downloadUrl:{type:"string",defaultValue:null},httpRequestMethod:{type:"sap.m.upload.UploaderHttpRequestMethod",defaultValue:n.Post},useMultipart:{type:"boolean",defaultValue:false}},events:{uploadStarted:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},uploadProgressed:{parameters:{item:{type:"sap.m.upload.UploadSetItem"},loaded:{type:"int"},total:{type:"int"}}},uploadCompleted:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},uploadAborted:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}}}}});p.prototype.init=function(){this._mRequestHandlers={}};p.uploadFile=function(e,t,a){var o=new window.XMLHttpRequest;var s=this.getHttpRequestMethod();return new Promise(function(d,n){o.open(s,t,true);if((r.browser.edge||r.browser.internet_explorer)&&e.type&&o.readyState===1){o.setRequestHeader("Content-Type",e.type)}if(a){a.forEach(function(e){o.setRequestHeader(e.getKey(),e.getText())})}o.onreadystatechange=function(){if(this.readyState===window.XMLHttpRequest.DONE){if(this.status===200){d(this)}else{n(this)}}};o.send(e)})};p.prototype.uploadItem=function(e,t){var a=new window.XMLHttpRequest,o=e.getFileObject(),s=this,d={xhr:a,item:e},n=this.getHttpRequestMethod(),p=e.getUploadUrl()||this.getUploadUrl();a.open(n,p,true);if((r.browser.edge||r.browser.internet_explorer)&&o.type&&a.readyState===1){a.setRequestHeader("Content-Type",o.type)}if(t){t.forEach(function(e){a.setRequestHeader(e.getKey(),e.getText())})}if(this.getUseMultipart()){var i=new window.FormData;var l=o?o.name:null;if(o instanceof window.Blob&&l){i.append(l,o,o.name)}else{i.append(l,o)}i.append("_charset_","UTF-8");o=i}a.upload.addEventListener("progress",function(t){s.fireUploadProgressed({item:e,loaded:t.loaded,total:t.total,aborted:false})});a.onreadystatechange=function(){var t=s._mRequestHandlers[e.getId()];if(this.readyState===window.XMLHttpRequest.DONE&&!t.aborted){s.fireUploadCompleted({item:e})}};this._mRequestHandlers[e.getId()]=d;a.send(o);this.fireUploadStarted({item:e})};p.prototype.terminateItem=function(e){var t=this._mRequestHandlers[e.getId()],a=this;t.xhr.onabort=function(){t.aborted=false;a.fireUploadAborted({item:e})};t.aborted=true;t.xhr.abort()};p.prototype.downloadItem=function(a,s,n){var p=this.getDownloadUrl()||a.getUrl();if(r.browser.name==="sf"){n=false}if(!a.getUrl()){e.warning("Items to download do not have a URL.");return false}else if(n){var i=null,l=new window.XMLHttpRequest;l.open("GET",p);s.forEach(function(e){l.setRequestHeader(e.getKey(),e.getText())});l.responseType="blob";l.onload=function(){var e=a.getFileName(),t=d._splitFileName(e,false);i=l.response;o.save(i,t.name,t.extension,a.getMediaType(),"utf-8")};l.send();return true}else{t.URLHelper.redirect(p,true);return true}};return p});