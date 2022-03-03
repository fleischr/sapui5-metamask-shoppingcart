/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/Device","sap/ui/core/LocaleData","sap/ui/unified/calendar/CalendarUtils","sap/ui/core/date/UniversalDate","./library","sap/ui/core/InvisibleText","sap/ui/core/format/DateFormat","sap/ui/core/ResizeHandler","sap/ui/core/Locale","./CalendarRowRenderer","sap/ui/dom/containsOrEquals","sap/ui/events/checkMouseEnterOrLeave","sap/ui/thirdparty/jquery","sap/ui/unified/CalendarAppointment"],function(e,t,i,a,n,s,r,o,p,l,u,g,h,d,c){"use strict";var f=s.CalendarDayType;var m=s.CalendarAppointmentVisualization;var v=s.GroupAppointmentsMode;var T=s.CalendarIntervalType;var C=s.CalendarAppointmentHeight;var A=s.CalendarAppointmentRoundWidth;var U=e.extend("sap.ui.unified.CalendarRow",{metadata:{library:"sap.ui.unified",properties:{startDate:{type:"object",group:"Data"},intervals:{type:"int",group:"Appearance",defaultValue:12},intervalSize:{type:"int",group:"Appearance",defaultValue:1},intervalType:{type:"sap.ui.unified.CalendarIntervalType",group:"Appearance",defaultValue:T.Hour},showSubIntervals:{type:"boolean",group:"Appearance",defaultValue:false},showIntervalHeaders:{type:"boolean",group:"Appearance",defaultValue:true},showEmptyIntervalHeaders:{type:"boolean",group:"Appearance",defaultValue:true},nonWorkingDays:{type:"int[]",group:"Misc",defaultValue:null},nonWorkingHours:{type:"int[]",group:"Misc",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},checkResize:{type:"boolean",group:"Behavior",defaultValue:true},updateCurrentTime:{type:"boolean",group:"Behavior",defaultValue:true},groupAppointmentsMode:{type:"sap.ui.unified.GroupAppointmentsMode",group:"Appearance",defaultValue:v.Collapsed},appointmentsReducedHeight:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},appointmentsVisualization:{type:"sap.ui.unified.CalendarAppointmentVisualization",group:"Appearance",defaultValue:m.Standard},appointmentHeight:{type:"sap.ui.unified.CalendarAppointmentHeight",group:"Appearance",defaultValue:C.Regular},appointmentRoundWidth:{type:"sap.ui.unified.CalendarAppointmentRoundWidth",group:"Appearance",defaultValue:A.None},multipleAppointmentsSelection:{type:"boolean",group:"Data",defaultValue:false}},aggregations:{appointments:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"appointment"},intervalHeaders:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"intervalHeader"},groupAppointments:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"groupAppointment",visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},legend:{type:"sap.ui.unified.CalendarLegend",multiple:false}},events:{select:{parameters:{appointment:{type:"sap.ui.unified.CalendarAppointment"},appointments:{type:"sap.ui.unified.CalendarAppointment[]"},multiSelect:{type:"boolean"},domRefId:{type:"string"}}},startDateChange:{},leaveRow:{parameters:{type:{type:"string"}}},intervalSelect:{parameters:{startDate:{type:"object"},endDate:{type:"object"},subInterval:{type:"boolean"}}}}}});U.prototype.init=function(){this._bRTL=sap.ui.getCore().getConfiguration().getRTL();this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");this._oFormatAria=o.getDateTimeInstance({pattern:"EEEE dd/MM/YYYY 'at' "+D.call(this).getTimePattern("medium")});this._aVisibleAppointments=[];this._aVisibleIntervalHeaders=[];this.setStartDate(new Date);this._resizeProxy=d.proxy(this.handleResize,this);this.aSelectedAppointments=[];this._fnCustomSortedAppointments=undefined};U.prototype.exit=function(){if(this._sResizeListener){p.deregister(this._sResizeListener);this._sResizeListener=undefined}if(this._sUpdateCurrentTime){clearTimeout(this._sUpdateCurrentTime);this._sUpdateCurrentTime=undefined}this._fnCustomSortedAppointments=undefined};U.prototype.onBeforeRendering=function(){this._aVisibleAppointments=[];b.call(this);w.call(this);R.call(this);if(this._sUpdateCurrentTime){clearTimeout(this._sUpdateCurrentTime);this._sUpdateCurrentTime=undefined}if(!this.getAppointments().length){this.aSelectedAppointments=[]}else{this.getAppointments().forEach(function(e){this._updateSelectedAppointmentsArray(e)}.bind(this))}};U.prototype.onAfterRendering=function(){V.call(this);this.updateCurrentTimeVisualization();if(this.getCheckResize()&&!this._sResizeListener){this._sResizeListener=p.register(this,this._resizeProxy)}};U.prototype.onThemeChanged=function(e){if(this.getDomRef()){for(var t=0;t<this._aVisibleAppointments.length;t++){var i=this._aVisibleAppointments[t];i.level=-1}this.handleResize(e)}};U.prototype.invalidate=function(t){if(t&&t instanceof c){var i=false;for(var a=0;a<this._aVisibleAppointments.length;a++){if(this._aVisibleAppointments[a].appointment==t){i=true;break}}if(i){this._aVisibleAppointments=[]}this._updateSelectedAppointmentsArray(t)}e.prototype.invalidate.apply(this,arguments)};U.prototype.setStartDate=function(e){if(!e){e=new Date}a._checkJSDateObject(e);var t=e.getFullYear();a._checkYearInValidRange(t);this._oUTCStartDate=a._createUniversalUTCDate(e,undefined,true);this.setProperty("startDate",e);return this};U.prototype._getStartDate=function(){if(!this._oUTCStartDate){this._oUTCStartDate=a._createUniversalUTCDate(this.getStartDate(),undefined,true)}return this._oUTCStartDate};U.prototype.setIntervalType=function(e){this.setProperty("intervalType",e);this._aVisibleAppointments=[];return this};U.prototype._getAppointmentReducedHeight=function(e){var i=!t.system.phone&&this.getAppointmentsReducedHeight()&&e.size===C.Regular;return i};U.prototype.onfocusin=function(e){if(d(e.target).hasClass("sapUiCalendarApp")){P.call(this,e.target.id)}else{var t=this._getVisibleAppointments();var i=false;var a;for(var n=0;n<t.length;n++){a=t[n].appointment;if(g(a.getDomRef(),e.target)){i=true;a.focus();break}}if(!i){a=this.getFocusedAppointment();if(a){a.focus()}}}};U.prototype.applyFocusInfo=function(e){if(this._sFocusedAppointmentId){this.getFocusedAppointment().focus()}return this};U.prototype.onsapleft=function(e){if(d(e.target).hasClass("sapUiCalendarApp")){O.call(this,this._bRTL,1)}e.preventDefault();e.stopPropagation()};U.prototype.onsapright=function(e){if(d(e.target).hasClass("sapUiCalendarApp")){O.call(this,!this._bRTL,1)}e.preventDefault();e.stopPropagation()};U.prototype.onsapup=function(e){this.fireLeaveRow({type:e.type})};U.prototype.onsapdown=function(e){this.fireLeaveRow({type:e.type})};U.prototype.onsaphome=function(e){W.call(this,e);e.preventDefault();e.stopPropagation()};U.prototype.onsapend=function(e){W.call(this,e);e.preventDefault();e.stopPropagation()};U.prototype.onsapselect=function(e){var t=this._getVisibleAppointments();for(var i=0;i<t.length;i++){var a=t[i].appointment;if(g(a.getDomRef(),e.target)){var n=!(this.getMultipleAppointmentsSelection()||e.ctrlKey||e.metaKey);E.call(this,a,n);break}}e.stopPropagation();e.preventDefault()};U.prototype.ontap=function(e){var t=this.$("Apps").children(".sapUiCalendarRowAppsInt");var i=0;var a=false;for(i=0;i<t.length;i++){var n=t[i];if(!this._isOneMonthsRowOnSmallSizes()&&g(n,e.target)){a=true;break}}if(a){$.call(this,i,e.target)}else{this.onsapselect(e)}};U.prototype.onsapselectmodifiers=function(e){this.onsapselect(e)};U.prototype.handleResize=function(e){if(e&&e.size&&e.size.width<=0){return this}var t=this.$("DummyApp");t.css("display","");V.call(this);return this};U.prototype.updateCurrentTimeVisualization=function(){var e=this.$("Now");var t=a._createUniversalUTCDate(new Date,undefined,true);var i=this.getIntervals();var n=this.getIntervalType();var s=this._getStartDate();var r=s.getTime();var o=this._oUTCEndDate;var p=o.getTime();this._sUpdateCurrentTime=undefined;if(t.getTime()<=p&&t.getTime()>=r){var l=H.call(this,n,i,s,o,r,t);var u=0;if(this._bRTL){e.css("right",l+"%")}else{e.css("left",l+"%")}e.css("display","");if(this.getUpdateCurrentTime()){switch(n){case T.Hour:u=6e4;break;case T.Day:case T.Week:case T.OneMonth:case"OneMonth":u=18e5;break;default:u=-1;break}if(u>0){this._sUpdateCurrentTime=setTimeout(this.updateCurrentTimeVisualization.bind(this),u)}}}else{e.css("display","none")}return this};U.prototype.getFocusedAppointment=function(){var e=this._getAppointmentsSorted();var t=this.getAggregation("groupAppointments",[]);var i;var a=0;for(a=0;a<t.length;a++){if(t[a].getId()==this._sFocusedAppointmentId){i=t[a];break}}if(!i){for(a=0;a<e.length;a++){if(e[a].getId()==this._sFocusedAppointmentId){i=e[a];break}}}return i};U.prototype.focusAppointment=function(e){if(!e||!(e instanceof c)){throw new Error("Appointment must be a CalendarAppointment; "+this)}var t=e.getId();if(this._sFocusedAppointmentId!=t){P.call(this,t)}else{e.focus()}return this};U.prototype.focusNearestAppointment=function(e){a._checkJSDateObject(e);var t=this._getAppointmentsSorted();var i;var n;var s;for(var r=0;r<t.length;r++){i=t[r];if(i.getStartDate()>e){if(r>0){n=t[r-1]}else{n=i}break}}if(i){if(n&&Math.abs(i.getStartDate()-e)>=Math.abs(n.getStartDate()-e)){s=n}else{s=i}this.focusAppointment(s)}return this};U.prototype._getVisibleAppointments=function(){return this._aVisibleAppointments};U.prototype._getVisibleIntervalHeaders=function(){return this._aVisibleIntervalHeaders};U.prototype._getNonWorkingDays=function(){if(this.getIntervalSize()!==1){return[]}var e=this.getNonWorkingDays();if(!e){var t=D.call(this);var i=t.getWeekendStart();var a=t.getWeekendEnd();e=[];for(var n=0;n<=6;n++){if(i<=a&&n>=i&&n<=a||i>a&&(n>=i||n<=a)){e.push(n)}}}else if(!Array.isArray(e)){e=[]}return e};U.prototype._isOneMonthsRowOnSmallSizes=function(){return(this.getIntervalType()===T.OneMonth||this.getIntervalType()==="OneMonth")&&this.getIntervals()===1};U.prototype._getAppointmentsSorted=function(){var e=this.getAppointments(),t=Y;e.sort(this._fnCustomSortedAppointments?this._fnCustomSortedAppointments:t);return e};U.prototype._setCustomAppointmentsSorterCallback=function(e){this._fnCustomSortedAppointments=e;this.invalidate()};U.prototype._calculateAppoitnmentVisualCue=function(e){if(_(this,e)){return{appTimeUnitsDifRowStart:0,appTimeUnitsDifRowEnd:0}}var t=e.getStartDate(),i=e.getEndDate(),a=new n(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes()),s=new n(i.getFullYear(),i.getMonth(),i.getDate(),i.getHours(),i.getMinutes()),r=this.getIntervalType(),o=this.getStartDate(),p=r==="Hour"?new n(o.getFullYear(),o.getMonth(),o.getDate(),o.getHours()):new n(o.getFullYear(),o.getMonth(),o.getDate()),l=this.getIntervals(),u;switch(r){case"Hour":u=new n(o.getFullYear(),o.getMonth(),o.getDate(),o.getHours()+l);break;case"Day":case"Week":case"One Month":u=new n(o.getFullYear(),o.getMonth(),o.getDate()+l);break;case"Month":u=new n(o.getFullYear(),o.getMonth()+l,o.getDate());break;default:break}return{appTimeUnitsDifRowStart:p.getTime()-a.getTime(),appTimeUnitsDifRowEnd:s.getTime()-u.getTime()}};U.prototype._updateSelectedAppointmentsArray=function(e){if(e.getSelected()){if(this.aSelectedAppointments.indexOf(e.getId())===-1){this.aSelectedAppointments.push(e.getId())}}else{this.aSelectedAppointments=this.aSelectedAppointments.filter(function(t){return t!==e.getId()})}};function _(e,t){var i=e.getAggregation("groupAppointments",[]);var a;for(a=0;a<i.length;++a){if(t===i[a]){return true}}return false}function y(){if(!this._sLocale){this._sLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString()}return this._sLocale}function D(){if(!this._oLocaleData){var e=y.call(this);var t=new l(e);this._oLocaleData=i.getInstance(t)}return this._oLocaleData}function b(){var e=this.getStartDate();var t;var i=this.getIntervals();var a=this.getIntervalType();this._oUTCStartDate=S.call(this,e);switch(a){case T.Hour:t=new n(this._oUTCStartDate.getTime());t.setUTCHours(t.getUTCHours()+i);break;case T.Day:case T.Week:case T.OneMonth:case"OneMonth":t=new n(this._oUTCStartDate.getTime());t.setUTCDate(t.getUTCDate()+i*this.getIntervalSize());break;case T.Month:t=new n(this._oUTCStartDate.getTime());t.setUTCMonth(t.getUTCMonth()+i);break;default:throw new Error("Unknown IntervalType: "+a+"; "+this)}t.setUTCMilliseconds(-1);this._iRowSize=t.getTime()-this._oUTCStartDate.getTime();this._iIntervalSize=Math.floor(this._iRowSize/i);this._oUTCEndDate=t}function S(e){var t=this.getIntervalType();var i=a._createUniversalUTCDate(e,undefined,true);switch(t){case T.Hour:i.setUTCMinutes(0);i.setUTCSeconds(0);i.setUTCMilliseconds(0);break;case T.Day:case T.Week:case T.OneMonth:case"OneMonth":i.setUTCHours(0);i.setUTCMinutes(0);i.setUTCSeconds(0);i.setUTCMilliseconds(0);break;case T.Month:i.setUTCDate(1);i.setUTCHours(0);i.setUTCMinutes(0);i.setUTCSeconds(0);i.setUTCMilliseconds(0);break;default:throw new Error("Unknown IntervalType: "+t+"; "+this)}return i}function M(){return t.system.phone||this.getGroupAppointmentsMode()===v.Collapsed}function w(){var e=this._getAppointmentsSorted();var t;var i;var s;var r=this.getIntervals();var o=this.getIntervalType();var p=this._getStartDate();var l=p.getTime();var u=this._oUTCEndDate;var g=u.getTime();var h=[];var d=false;var c=0;var f=0;var m=M.call(this);var v=this._needAppointmentHorizontalFit();this.destroyAggregation("groupAppointments",true);for(c=0;c<e.length;c++){t=e[c];var C=a._createUniversalUTCDate(t.getStartDate(),undefined,true);var A=C.getTime();C.setUTCSeconds(0);C.setUTCMilliseconds(0);var U=t.getEndDate()?a._createUniversalUTCDate(t.getEndDate(),undefined,true):a._createUniversalUTCDate(new Date(864e12),undefined,true);var _=U.getTime();U.setUTCSeconds(0);U.setUTCMilliseconds(0);var y=false;if(C.getTime()<l&&U.getTime()>=l){C=new n(l);y=true}if(U.getTime()>g&&C.getTime()<=g){U=new n(g);y=true}var D=(U.getTime()-C.getTime())/6e4;if(y&&D==0){continue}var b=0;var S=0;var w=-1;i=undefined;s=undefined;if(C&&C.getTime()<=g&&U&&U.getTime()>=l&&A<=_){if(m&&o==T.Month&&U.getTime()-C.getTime()<6048e5){i=I.call(this,C,t,o,r,p,u,l,h);var R=a._createUniversalUTCDate(i.getEndDate(),undefined,true);if(U.getTime()>R.getTime()){s=I.call(this,U,t,o,r,p,u,l,h)}}if(v){this._setHorizontalRoundingWidth(t,C,U)}b=H.call(this,o,r,p,u,l,C);S=k.call(this,o,r,p,u,l,U);if(i){i._iBegin=b;i._iEnd=S;i._iLevel=w;if(s){s._iBegin=b;s._iEnd=S;s._iLevel=w}continue}h.push({appointment:t,begin:b,end:S,calculatedEnd:S,level:w,size:this.getProperty("appointmentHeight")});if(this._sFocusedAppointmentId&&this._sFocusedAppointmentId==t.getId()){d=true}}}var V=this.getAggregation("groupAppointments",[]);if(V.length>0){for(c=0;c<h.length;c++){t=h[c];if(t.appointment._aAppointments&&t.appointment._aAppointments.length<=1){i=t.appointment;var E=false;if(i._aAppointments.length==0){E=true}else{for(f=0;f<h.length;f++){if(h[f].appointment==i._aAppointments[0]){E=true;break}}}if(!E){for(f=0;f<V.length;f++){s=V[f];if(i!=s){for(var z=0;z<s._aAppointments.length;z++){if(i._aAppointments[0]==s._aAppointments[z]){s._aAppointments.splice(z,1);if(s._aAppointments.length==1){this.removeAggregation("groupAppointments",s);s.destroy();V=this.getAggregation("groupAppointments",[])}else{s.setProperty("title",s._aAppointments.length,true)}break}}}}t.begin=i._iBegin;t.end=i._iEnd;t.calculatedEnd=i._iEnd;t.level=i._iLevel;t.appointment=i._aAppointments[0]}else{h.splice(c,1);c--}this.removeAggregation("groupAppointments",i);i.destroy();V=this.getAggregation("groupAppointments",[])}}}if(!d){if(h.length>0){this._sFocusedAppointmentId=h[0].appointment.getId()}else{this._sFocusedAppointmentId=undefined}}this._aVisibleAppointments=h;return this._aVisibleAppointments}function I(e,t,i,s,r,o,p,l){var u=this.getAggregation("groupAppointments",[]);var g;var h=D.call(this);var d=h.getFirstDayOfWeek();var m=e.getUTCDay();var v=new n(e.getTime());v.setUTCHours(0);v.setUTCMinutes(0);v.setUTCSeconds(0);v.setUTCMilliseconds(0);if(d<=m){v.setDate(v.getDate()-(m-d))}else{v.setDate(v.getDate()-(7-m-d))}for(var T=0;T<u.length;T++){g=u[T];var C=a._createUniversalUTCDate(g.getStartDate(),undefined,true);if(C.getTime()==v.getTime()){break}g=undefined}if(!g){var A=new n(v.getTime());A.setDate(A.getDate()+7);A.setMilliseconds(-1);g=new c(this.getId()+"-Group"+u.length,{type:t.getType(),startDate:a._createLocalDate(new Date(v.getTime()),true),endDate:a._createLocalDate(new Date(A.getTime()),true)});g._aAppointments=[];this.addAggregation("groupAppointments",g,true);var U=H.call(this,i,s,r,o,p,v);var _=k.call(this,i,s,r,o,p,A);l.push({appointment:g,begin:U,end:_,calculatedEnd:_,level:-1,size:this.getProperty("appointmentHeight")})}g._aAppointments.push(t);if(g.getType()!=f.None&&g.getType()!=t.getType()){g.setType(f.None)}g.setProperty("title",g._aAppointments.length,true);return g}function H(e,t,i,a,s,r){var o=0;if(e!=T.Month){o=100*(r.getTime()-s)/this._iRowSize}else{var p=new n(r.getTime());p.setUTCDate(1);p.setUTCHours(0);p.setUTCMinutes(0);p.setUTCSeconds(0);p.setUTCMilliseconds(0);var l=new n(p.getTime());l.setUTCMonth(l.getUTCMonth()+1);l.setMilliseconds(-1);var u=l.getTime()-p.getTime();var g=(p.getUTCFullYear()-i.getUTCFullYear())*12+p.getUTCMonth()-i.getUTCMonth();o=100*g/t+100*(r.getTime()-p.getTime())/u/t}if(o<0){o=0}o=Math.round(o*1e5)/1e5;return o}function k(e,t,i,a,s,r){var o=0;if(e!=T.Month){o=100-100*(r.getTime()-s)/this._iRowSize}else{var p=new n(r.getTime());p.setUTCDate(1);p.setUTCHours(0);p.setUTCMinutes(0);p.setUTCSeconds(0);p.setUTCMilliseconds(0);var l=new n(p.getTime());l.setUTCMonth(l.getUTCMonth()+1);l.setMilliseconds(-1);var u=l.getTime()-p.getTime();var g=(p.getUTCFullYear()-i.getUTCFullYear())*12+p.getUTCMonth()-i.getUTCMonth();o=100-(100*g/t+100*(r.getTime()-p.getTime())/u/t)}if(o<0){o=0}o=Math.round(o*1e5)/1e5;return o}function R(){var e=[];if(this.getShowIntervalHeaders()){var t=this.getIntervalHeaders();var i;var s=this.getIntervals();var r=this.getIntervalType();var o=this._getStartDate();var p=o.getTime();var l=this._oUTCEndDate;var u=l.getTime();var g=0;var h=0;for(g=0;g<t.length;g++){i=t[g];var d=a._createUniversalUTCDate(i.getStartDate(),undefined,true);d.setUTCSeconds(0);d.setUTCMilliseconds(0);var c=i.getEndDate()?a._createUniversalUTCDate(i.getEndDate(),undefined,true):a._createUniversalUTCDate(new Date(864e12),undefined,true);c.setUTCSeconds(0);c.setUTCMilliseconds(0);if(d&&d.getTime()<=u&&c&&c.getTime()>=p){var f=new n(o.getTime());var m=new n(o.getTime());m.setUTCMinutes(m.getUTCMinutes()-1);var v=-1;var C=-1;for(h=0;h<s;h++){switch(r){case T.Hour:m.setUTCHours(m.getUTCHours()+1);if(h>0){f.setUTCHours(f.getUTCHours()+1)}break;case T.Day:case T.Week:case T.OneMonth:case"OneMonth":m.setUTCDate(m.getUTCDate()+1);if(h>0){f.setUTCDate(f.getUTCDate()+1)}break;case T.Month:m.setUTCDate(1);m.setUTCMonth(m.getUTCMonth()+2);m.setUTCDate(0);if(h>0){f.setUTCMonth(f.getUTCMonth()+1)}break;default:throw new Error("Unknown IntervalType: "+r+"; "+this)}if(d&&d.getTime()<=f.getTime()&&c&&c.getTime()>=m.getTime()){if(v<0){v=h}C=h}}if(v>=0){e.push({interval:v,appointment:i,last:C})}}}}this._aVisibleIntervalHeaders=e;return this._aVisibleIntervalHeaders}function V(){if(this._isOneMonthsRowOnSmallSizes()){return}var e=this.$("Apps");var t=e.innerWidth();if(t<=0){return}var i=this.$("DummyApp");var a=i.outerHeight(true);if(a<=0){return}var n=4;var s=i.outerWidth();var r=s/t*100;var o=Math.ceil(1e3*r)/1e3;var p;var l;var u=0;var g=0;var h=0;var c=false;var f;var m=this._needAppointmentHorizontalFit();if(this.getShowIntervalHeaders()&&(this.getShowEmptyIntervalHeaders()||this._getVisibleIntervalHeaders().length>0)){u=d(this.$("AppsInt0").children(".sapUiCalendarRowAppsIntHead")[0]).outerHeight(true);c=true}for(h=0;h<this._aVisibleAppointments.length;h++){p=this._aVisibleAppointments[h];l=p.appointment.$();var v=Math.floor(1e3*(100-p.calculatedEnd-p.begin))/1e3;var T=false;if(v<o){p.end=100-p.begin-r;if(p.end<0){p.end=0}T=true;l.addClass("sapUiCalendarAppSmall")}else if(l.hasClass("sapUiCalendarAppSmall")){p.end=p.calculatedEnd;T=true;l.removeClass("sapUiCalendarAppSmall")}if(T){p.level=-1}if(T&&!m){if(this._bRTL){l.css("left",p.end+"%")}else{l.css("right",p.end+"%")}}if(m){p.end=p.calculatedEnd}}for(h=0;h<this._aVisibleAppointments.length;h++){p=this._aVisibleAppointments[h];l=p.appointment.$();var C={};if(p.level<0){for(var A=0;A<this._aVisibleAppointments.length;A++){var U=this._aVisibleAppointments[A];if(p!=U&&p.begin<Math.floor(1e3*(100-U.end))/1e3&&Math.floor(1e3*(100-p.end))/1e3>U.begin&&U.level>=0){this._setBlockedLevelsForAppointment(U,C)}}p.level=this._getAppointmetLevel(C,p);l.attr("data-sap-level",p.level)}f=a*p.level+u;if(!c){f+=n}l.css("top",f+"px");var _=p.level;_+=this._getAppointmentRowCount(p)-1;if(g<_){g=_}}g++;a=a*g+u;if(!c){a+=n}if(!this.getHeight()){e.outerHeight(a)}else{var y=this.$("Apps").children(".sapUiCalendarRowAppsInt");for(h=0;h<y.length;h++){var D=d(y[h]);D.outerHeight(a)}}i.css("display","none")}function E(e,t){var i=0;var a;var n;var s;var o;var p=r.getStaticId("sap.ui.unified","APPOINTMENT_SELECTED");var l=!e.getSelected();if(t){var u=this.getAppointments();var g=this.getAggregation("groupAppointments",[]);d.merge(u,g);for(i=0;i<u.length;i++){a=u[i];if(a.getId()!==e.getId()&&a.getSelected()){a.setProperty("selected",false,true);a.$().removeClass("sapUiCalendarAppSel");for(var i=0;i<this.aSelectedAppointments.length;i++){if(this.aSelectedAppointments[i]!==a.getId()){this.aSelectedAppointments.splice(i)}}n=a.$().attr("aria-labelledby");s=n?n.replace(p,""):"";a.$().attr("aria-labelledby",s)}}}o=e.$().attr("aria-labelledby")+" "+p;s=e.$().attr("aria-labelledby").replace(p,"").trim();if(e.getSelected()){e.setProperty("selected",false,true);e.$().removeClass("sapUiCalendarAppSel");e.$().attr("aria-labelledby",s);L(this,t)}else{e.setProperty("selected",true,true);e.$().addClass("sapUiCalendarAppSel");e.$().attr("aria-labelledby",o);L(this,t)}this._updateSelectedAppointmentsArray(e);if(e._aAppointments){for(i=0;i<e._aAppointments.length;i++){a=e._aAppointments[i];a.setProperty("selected",l,true);o=a.$().attr("aria-labelledby")+" "+p;a.$().attr("aria-labelledby",o)}this.fireSelect({appointments:e._aAppointments,multiSelect:!t,domRefId:e.getId()})}else{this.fireSelect({appointment:e,multiSelect:!t,domRefId:e.getId()})}}function z(e){var t=this._getPlanningCalendar();if(t){t["_onRow"+e]()}}U.prototype._needAppointmentHorizontalFit=function(){var e=this._getPlanningCalendar(),t,i,a;if(!e||this.getAppointmentRoundWidth()===A.None){return false}t=e.getViewKey();i=e._getView(t);a=e._getIntervals(i);return a>=20};U.prototype._setHorizontalRoundingWidth=function(e,t,i){var a;switch(this.getAppointmentRoundWidth()){case A.HalfColumn:a=12;break}this._roundAppointment(e,t,i,a)};U.prototype._roundAppointment=function(e,t,i,a){var n,s;n=e.getStartDate().getHours()-e.getStartDate().getHours()%a;t.setUTCHours(n);t.setUTCMinutes(0);t.setUTCSeconds(0);t.setUTCMilliseconds(0);s=e.getEndDate().getHours()-e.getEndDate().getHours()%a+a;i.setUTCHours(s);i.setUTCMinutes(0);i.setUTCSeconds(0);i.setUTCMilliseconds(0)};U.prototype._setBlockedLevelsForAppointment=function(e,t){var i=this._getAppointmentRowCount(e);for(var a=0;a<i;a++){t[e.level+a]=true}return t};U.prototype._getAppointmentRowCount=function(e){var t,i=this._getAppointmentReducedHeight(e);switch(e.size){case C.HalfSize:t=1;break;case C.Regular:t=2;if(i&&!e.appointment.getText()&&!e.appointment.getDescription()){t=1}break;case C.Large:t=3;break;case C.Automatic:t=1;if(e.appointment.getText()){t+=1}if(e.appointment.getDescription()){t+=1}break}return t};U.prototype._getAppointmetLevel=function(e,t){var i=0;var a=this._getAppointmentRowCount(t);var n=true;while(n){n=this._isPosibleToPositionAppointment(i,e,a);if(!n){n=true;i+=1}else{n=false}}return i};U.prototype._isPosibleToPositionAppointment=function(e,t,i){for(var a=e;a<i+e;a++){if(t[a]){return false}}return true};U.prototype._getPlanningCalendar=function(){var e=this;while(e.getParent()!==null){if(e.isA("sap.m.PlanningCalendar")){return e}e=e.getParent()}};function L(e,t){if(t){z.call(e,"DeselectAppointment")}}function F(e){var t=this.getAggregation("groupAppointments",[]);var i;var a=false;for(var n=0;n<t.length;n++){var s=t[n]._aAppointments;for(var r=0;r<s.length;r++){if(s[r].getId()==e){i=t[n];a=true;break}}if(a){break}}return i}function P(e){if(this._sFocusedAppointmentId!=e){var t=this._getAppointmentsSorted();var i=this._aVisibleAppointments;var n;var s=0;n=F.call(this,e);if(n){e=n.getId();n=undefined}for(s=0;s<i.length;s++){if(i[s].appointment.getId()==e){n=i[s].appointment;break}}if(n){var r=this.getFocusedAppointment().$();var o=n.$();this._sFocusedAppointmentId=n.getId();r.attr("tabindex","-1");o.attr("tabindex","0");o.trigger("focus")}else{for(s=0;s<t.length;s++){if(t[s].getId()==e){n=t[s];break}}if(n){this._sFocusedAppointmentId=n.getId();var p=S.call(this,n.getStartDate());this.setStartDate(a._createLocalDate(p,true));if(!g(this.getDomRef(),document.activeElement)){setTimeout(function(){this.getFocusedAppointment().focus()}.bind(this),0)}this.fireStartDateChange()}}}}function O(e,t){var i=this._sFocusedAppointmentId;var a=this._getAppointmentsSorted();var n=this.getAggregation("groupAppointments",[]);var s;var r=0;var o=0;for(o=0;o<n.length;o++){if(n[o].getId()==i){var p=n[o]._aAppointments;if(e){i=p[p.length-1].getId()}else{i=p[0].getId()}break}}for(o=0;o<a.length;o++){if(a[o].getId()==i){r=o;break}}if(e){r=r+t}else{r=r-t}if(r<0){r=0}else if(r>=a.length){r=a.length-1}s=a[r];P.call(this,s.getId())}function W(e){var t=this._getAppointmentsSorted();var i;var s=new n(this._getStartDate());var r=new n(this._oUTCEndDate);var o=this.getIntervalType();var p;var l;s.setUTCHours(0);r.setUTCHours(0);r.setUTCMinutes(0);r.setUTCSeconds(0);switch(o){case T.Hour:r.setUTCDate(r.getUTCDate()+1);r.setUTCMilliseconds(-1);break;case T.Day:case T.Week:case T.OneMonth:case"OneMonth":s.setUTCDate(1);r.setUTCMonth(r.getUTCMonth()+1);r.setUTCDate(1);r.setUTCMilliseconds(-1);break;case T.Month:s.setUTCMonth(0);s.setUTCDate(1);r.setUTCFullYear(r.getUTCFullYear()+1);r.setUTCMonth(1);r.setUTCDate(1);r.setUTCMilliseconds(-1);break;default:throw new Error("Unknown IntervalType: "+o+"; "+this)}var u=a._createLocalDate(s,true);var g=a._createLocalDate(r,true);for(var h=0;h<t.length;h++){if(t[h].getStartDate()>=u&&t[h].getStartDate()<=g){i=t[h];p=i.getId();if(e.type=="saphome"){break}}else if(t[h].getStartDate()>g){break}}l=F.call(this,p);if(l){i=l;p=i.getId()}if(p&&p!=this._sFocusedAppointmentId){P.call(this,p)}else if(e._bPlanningCalendar&&i){i.focus()}else{this.fireLeaveRow({type:e.type})}}function $(e,t){var i=this.getIntervalType();var s=this._getStartDate();var r=new n(s.getTime());var o;var p=false;var l=0;var u=0;if(d(t).hasClass("sapUiCalendarRowAppsSubInt")){p=true;var g=d(d(t).parent()).children(".sapUiCalendarRowAppsSubInt");u=g.length;for(l=0;l<u;l++){var h=g[l];if(h==t){break}}}switch(i){case T.Hour:r.setUTCHours(r.getUTCHours()+e);if(p){r.setUTCMinutes(r.getUTCMinutes()+l*60/u);o=new n(r.getTime());o.setUTCMinutes(o.getUTCMinutes()+60/u)}else{o=new n(r.getTime());o.setUTCHours(o.getUTCHours()+1)}break;case T.Day:case T.Week:case T.OneMonth:case"OneMonth":r.setUTCDate(r.getUTCDate()+e);if(p){r.setUTCHours(r.getUTCHours()+l*24/u);o=new n(r.getTime());o.setUTCHours(o.getUTCHours()+24/u)}else{o=new n(r.getTime());o.setUTCDate(o.getUTCDate()+1)}break;case T.Month:r.setUTCMonth(r.getUTCMonth()+e);if(p){r.setUTCDate(r.getUTCDate()+l);o=new n(r.getTime());o.setUTCDate(o.getUTCDate()+1)}else{o=new n(r.getTime());o.setUTCMonth(o.getUTCMonth()+1)}break;default:throw new Error("Unknown IntervalType: "+i+"; "+this)}o.setUTCMilliseconds(o.getUTCMilliseconds()-1);r=a._createLocalDate(r,true);o=a._createLocalDate(o,true);this.fireIntervalSelect({startDate:r,endDate:o,subInterval:p})}function Y(e,t){var i=e.getStartDate()-t.getStartDate();if(i==0){i=t.getEndDate()-e.getEndDate()}return i}return U});