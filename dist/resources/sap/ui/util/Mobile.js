/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/base/Log","sap/ui/thirdparty/jquery"],function(e,n,o){"use strict";var t={};var i=false;t.init=function(n){var a=o("head");if(!i){i=true;n=o.extend({},{viewport:true,statusBar:"default",hideBrowser:true,preventScroll:true,preventPhoneNumberDetection:true,useFullScreenHeight:true,homeIconPrecomposed:false,mobileWebAppCapable:"default"},n);if(n.preventPhoneNumberDetection){a.append(o('<meta name="format-detection" content="telephone=no">'))}if(n.viewport){var r;var p=e.resize.height;var c=e.resize.width;r="width=device-width, initial-scale=1.0";a.append(o('<meta name="viewport" content="'+r+'">'));if((p!==window.innerHeight||c!==window.innerWidth)&&e.resize._update){e.resize._update()}}if(n.useFullScreenHeight){o(function(){document.documentElement.style.height="100%"})}if(n.preventScroll&&(e.os.ios||e.os.mac&&e.browser.mobile)){o(function(){document.documentElement.style.position="fixed";document.documentElement.style.overflow="hidden";document.documentElement.style.height="100%";document.documentElement.style.width="100%"})}}if(n){if(n.homeIcon){var l;if(typeof n.homeIcon==="string"){l={phone:n.homeIcon,favicon:n.homeIcon}}else{l=o.extend({},n.homeIcon);l.phone=n.homeIcon.phone||n.homeIcon.icon||l.favicon;l.favicon=l.favicon||n.homeIcon.icon||n.homeIcon.phone;l.icon=undefined}l.precomposed=n.homeIconPrecomposed||l.precomposed;t.setIcons(l)}if(n.hasOwnProperty("mobileWebAppCapable")){t.setWebAppCapable(n.mobileWebAppCapable,n.statusBar)}}};t.setIcons=function(e){if(!e||typeof e!=="object"){n.warning("Call to sap/ui/util/Mobile.setIcons() has been ignored because there were no icons given or the argument was not an object.");return}var t=o("head"),i=e.precomposed?"-precomposed":"",a=function(n){return e[n]||e["tablet@2"]||e["phone@2"]||e["phone"]||e["tablet"]},r={phone:"",tablet:"76x76","phone@2":"120x120","tablet@2":"152x152"};if(e["favicon"]){var p=t.find("[rel=icon]");p.each(function(){if(this.rel==="icon"){o(this).remove()}});t.append(o('<link rel="icon" href="'+e["favicon"]+'">'))}if(a("phone")){t.find("[rel=apple-touch-icon]").remove();t.find("[rel=apple-touch-icon-precomposed]").remove()}for(var c in r){e[c]=e[c]||a(c);if(e[c]){var l=r[c];t.append(o('<link rel="apple-touch-icon'+i+'" '+(l?'sizes="'+l+'"':"")+' href="'+e[c]+'">'))}}};t.setWebAppCapable=function(n,t){if(!e.system.tablet&&!e.system.phone){return}var i=o("head"),a=["","apple"],r="mobile-web-app-capable",p=n?"yes":"no",c,l,s;for(c=0;c<a.length;c++){l=a[c]?a[c]+"-"+r:r;s=i.children('meta[name="'+l+'"]');if(s.length){s.attr("content",p)}else{i.append(o('<meta name="'+l+'" content="'+p+'">'));if(a[c]==="apple"){i.append(o('<meta name="apple-mobile-web-app-status-bar-style" content="'+(t?t:"default")+'">'))}}}};return t});