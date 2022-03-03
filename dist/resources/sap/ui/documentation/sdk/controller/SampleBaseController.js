/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/documentation/sdk/controller/BaseController","sap/ui/thirdparty/URI","sap/base/Log","sap/ui/documentation/sdk/controller/util/ResourceDownloadUtil","sap/ui/documentation/sdk/util/Resources"],function(e,i,a,t,s){"use strict";var n=sap.ui.require.toUrl("sap/ui/documentation/sdk/tmpl"),r=sap.ui.require.toUrl("sap/ui/demo/mock");var o=["sap.ui.core","sap.ui.dt","sap.m","sap.ui.fl","sap.ui.layout","sap.ui.mdc","sap.ui.unified","sap.f","sap.ui.rta","sap.ui.commons","sap.ui.codeeditor","sap.ui.table","sap.uxap","sap.ui.integration","sap.tnt","sap.ui.ux3","sap.ui.suite"];var u=["sap.ushell","sap.fe","sap.viz","sap.suite.ui.microchart","sap.chart","sap.ui.comp","sap.ui.generic.app","sap.fe.navigation","sap.suite.ui.generic.template","sap.ui.richtexteditor","sap.suite.ui.commons","sap.ui.export","sap.ndc","sap.me","sap.fe.core","sap.fe.macros","sap.collaboration","sap.fe.templates","sap.ui.generic.template","sap.zen.dsh","sap.ovp","sap.zen.crosstab","sap.zen.commons","sap.gantt","sap.ui.mdc","sap.fe.plugins","sap.ui.vbm","sap.apf","sap.rules.ui","sap.ui.vk","sap.ui.vtm","sap.ushell_abap","sap.fe.placeholder","sap.feedback.ui","sap.fileviewer","sap.ca.ui","sap.landvisz"];return e.extend("sap.ui.documentation.sdk.controller.SampleBaseController",{_aMockFiles:["products.json","supplier.json","img.json"],fetchSourceFile:function(e,i){return t.fetch(e,i).catch(function(e){a.warning(e);return"File not loaded"})},onDownload:function(){sap.ui.require(["sap/ui/thirdparty/jszip","sap/ui/core/util/File"],function(e,i){var a=new e,t=s.getResourceOriginPath(sap.ui.require.toUrl(this._sId.replace(/\./g,"/"))),o=this.oModel.getData(),u=o.includeInDownload||[],p,l,c=[],m=function(e){var i=[];for(var t=0;t<this._aMockFiles.length;t++){var s=this._aMockFiles[t];if(typeof e==="string"&&e.indexOf(s)>-1){i.push(this._addFileToZip({name:"mockdata/"+s,url:r+"/"+s,formatter:this._formatMockFile},a))}}return Promise.all(i)};for(var d=0;d<o.files.length;d++){var f=o.files[d],h=t+"/"+f.name,g=f.name&&(f.name===o.iframe||f.name.split(".").pop()==="html");if(f.name==="manifest.json"){p=f;c.push(this._addFileToZip({name:f.name,url:h,formatter:this._formatManifestJsFile},a));continue}c.push(this._addFileToZip({name:f.name.replace(new RegExp(/(\.\.\/)+/g),"./"),url:h,formatter:g?this._changeIframeBootstrapToCloud:undefined},a));c.push(this.fetchSourceFile(h).then(m.bind(this)))}if(!o.iframe||s.getHasProxy()){l=o.files.some(function(e){return e.name==="manifest.json"});c.push(this._addFileToZip({name:"Component.js",url:t+"/"+"Component.js"},a));c.push(this._addFileToZip({name:"index.html",url:n+"/"+(l?"indexevo.html.tmpl":"index.html.tmpl"),formatter:function(e){return this._changeIframeBootstrapToCloud(this._formatIndexHtmlFile(e,o))}.bind(this)},a,true));if(!l){c.push(this._addFileToZip({name:"index.js",url:n+"/"+"index.js.tmpl",formatter:function(e){return this._changeIframeBootstrapToCloud(this._formatIndexJsFile(e,o))}.bind(this)},a,true))}}u.forEach(function(e){c.push(this._addFileToZip({name:e,url:t+"/"+e},a))});
// add generic license file
c.push(this._addFileToZip({name:"LICENSE.txt",url:"LICENSE.txt"},a));c.push(this._addFileToZip({name:"ui5.yaml",url:n+"/ui5.yaml.tmpl",formatter:function(e){return this._formatYamlFile(e,o)}.bind(this)},a,true));c.push(this._addFileToZip({name:"package.json",url:n+"/package.json.tmpl",formatter:function(e){return this._formatPackageJson(e,p,o)}.bind(this)},a,true));Promise.all(c).then(function(){var e=a.generate({type:"blob"});this._openGeneratedFile(e,this._sId)}.bind(this))}.bind(this))},_openGeneratedFile:function(e,i){sap.ui.require(["sap/ui/core/util/File"],function(a){a.save(e,i,"zip","application/zip")})},_addFileToZip:function(e,i,a){var t=e.name,s=e.url,n=e.formatter;return this.fetchSourceFile(s,a).then(function(e){if(e==="File not loaded"){return;// ignore 404 responses, e.g. for Apache license text file in SAPUI5 environment
}if(n){e=n(e)}i.file(t,e)})},_formatPackageJson:function(e,i,a){var t=e.replace(/{{TITLE}}/g,a.title).replace(/{{SAMPLE_ID}}/g,a.id),s=JSON.parse(t),n=s.dependencies,r,p,l;if(i){r=JSON.parse(i.raw);p=r["sap.ui5"];l=p&&p.dependencies;if(l&&l.libs){Object.keys(l.libs).forEach(function(e){if(o.indexOf(e)>-1){n["@openui5/"+e]="^1"}if(u.indexOf(e)>-1){n["@sapui5/"+e]="^1"}})}}return JSON.stringify(s,null,2)},_formatYamlFile:function(e,i){return e.replace(/{{SAMPLE_ID}}/g,i.id)},_formatManifestJsFile:function(e){return e.replace(new RegExp(/(\.\.\/)+/g),"./")},_formatIndexHtmlFile:function(e,i){return e.replace(/{{TITLE}}/g,i.name).replace(/{{SAMPLE_ID}}/g,i.id)},_formatIndexJsFile:function(e,i){return e.replace(/{{TITLE}}/g,i.name).replace(/{{SAMPLE_ID}}/g,i.id).replace(/{{HEIGHT}}/g,i.stretch?'height : "100%", ':"").replace(/{{SCROLLING}}/g,!i.stretch)},_formatMockFile:function(e){var i="test-resources/sap/ui/documentation/sdk/images/",a="https://openui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/",t=new RegExp(i,"g");return e.replace(t,a)},_changeIframeBootstrapToCloud:function(e){var a=/src=(?:"[^"]*\/sap-ui-core\.js"|'[^']*\/sap-ui-core\.js')/,t=new i(sap.ui.require.toUrl("")+"/sap-ui-core.js"),s=t.toString();return e.replace(a,'src="./'+s+'"')}})});