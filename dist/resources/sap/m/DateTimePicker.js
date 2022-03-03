/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./InputBase","./DatePicker","sap/ui/model/type/Date","sap/ui/unified/DateRange","./library","sap/ui/core/Control","sap/ui/Device","sap/ui/core/format/DateFormat","sap/ui/core/LocaleData","./DateTimePickerRenderer","./SegmentedButton","./SegmentedButtonItem","./ResponsivePopover","./Button","sap/ui/events/KeyCodes","sap/ui/core/IconPool"],function(e,t,i,s,o,a,n,r,p,l,u,g,c,h,d,f,_){"use strict";var y=a.PlacementType,m=a.ButtonType,C="Phone";var S=i.extend("sap.m.DateTimePicker",{metadata:{library:"sap.m",properties:{minutesStep:{type:"int",group:"Misc",defaultValue:1},secondsStep:{type:"int",group:"Misc",defaultValue:1}},designtime:"sap/m/designtime/DateTimePicker.designtime",dnd:{draggable:false,droppable:true}}});var D={Short:"short",Medium:"medium",Long:"long",Full:"full"};var P=n.extend("sap.m.internal.DateTimePickerPopup",{metadata:{library:"sap.m",aggregations:{_switcher:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},calendar:{type:"sap.ui.core.Control",multiple:false},clocks:{type:"sap.ui.core.Control",multiple:false}}},renderer:{apiVersion:2,render:function(e,t){e.openStart("div",t);e.class("sapMDateTimePopupCont").class("sapMTimePickerDropDown");e.openEnd();var i=t.getAggregation("_switcher");if(i){e.openStart("div");e.class("sapMTimePickerSwitch");e.openEnd();e.renderControl(i);e.close("div")}var s=t.getCalendar();if(s){e.renderControl(s)}e.openStart("div");e.class("sapMTimePickerSep");e.openEnd();e.close("div");var o=t.getClocks();if(o){e.renderControl(o)}e.close("div")}},init:function(){},onBeforeRendering:function(){var t=this.getAggregation("_switcher");if(!t){var i=sap.ui.getCore().getLibraryResourceBundle("sap.m");var s=i.getText("DATETIMEPICKER_DATE");var o=i.getText("DATETIMEPICKER_TIME");t=new g(this.getId()+"-Switch",{selectedKey:"Cal",items:[new c(this.getId()+"-Switch-Cal",{key:"Cal",text:s}),new c(this.getId()+"-Switch-Sli",{key:"Sli",text:o})]});t.attachSelect(this._handleSelect,this);this.setAggregation("_switcher",t,true)}if(r.system.phone||e("html").hasClass("sapUiMedia-Std-Phone")){t.setVisible(true);t.setSelectedKey("Cal")}else{t.setVisible(false)}},onAfterRendering:function(){if(r.system.phone||e("html").hasClass("sapUiMedia-Std-Phone")){var t=this.getAggregation("_switcher");var i=t.getSelectedKey();this._switchVisibility(i)}},_handleSelect:function(e){this._switchVisibility(e.getParameter("key"))},_switchVisibility:function(e){var t=this.getCalendar();var i=this.getClocks();if(!t||!i){return}if(e=="Cal"){t.$().css("display","");i.$().css("display","none")}else{t.$().css("display","none");i.$().css("display","")}},switchToTime:function(){var e=this.getAggregation("_switcher");if(e&&e.getVisible()){e.setSelectedKey("Sli");this._switchVisibility("Sli")}},getSpecialDates:function(){return this._oDateTimePicker.getSpecialDates()},onkeydown:function(e){var t=e.keyCode===f.TAB&&!e.shiftKey;var i=e.keyCode===f.TAB&&e.shiftKey;if(t){if(e.target.classList.contains("sapUiCalHeadToday")||e.target.classList.contains("sapUiCalHeadBLast")&&!this._oDateTimePicker._oCalendar.getShowCurrentDateButton()){this.getAggregation("clocks").getDomRef().children[0].children[0].focus()}}if(i&&e.target.classList.contains("sapUiCalItem")){var s=this.oParent.getAggregation("footer").getAggregation("content").length-1;this.oParent.getAggregation("footer").getAggregation("content")[s].focus()}}});S.prototype.init=function(){i.prototype.init.apply(this,arguments);this._bOnlyCalendar=false};S.prototype.getIconSrc=function(){return _.getIconURI("date-time")};S.prototype.exit=function(){i.prototype.exit.apply(this,arguments);if(this._oClocks){this._oClocks.destroy();delete this._oClocks}this._oPopupContent=undefined;r.media.detachHandler(this._handleWindowResize,this)};S.prototype.setDisplayFormat=function(e){i.prototype.setDisplayFormat.apply(this,arguments);if(this._oClocks){this._oClocks.setDisplayFormat(M.call(this))}return this};S.prototype.setMinutesStep=function(e){this.setProperty("minutesStep",e,true);if(this._oClocks){this._oClocks.setMinutesStep(e)}return this};S.prototype._getDefaultValueStyle=function(){return D.Medium};S.prototype.setMinDate=function(e){i.prototype.setMinDate.call(this,e);if(e){this._oMinDate.setHours(e.getHours(),e.getMinutes(),e.getSeconds())}return this};S.prototype.setMaxDate=function(e){i.prototype.setMaxDate.call(this,e);if(e){this._oMaxDate.setHours(e.getHours(),e.getMinutes(),e.getSeconds())}return this};S.prototype.setSecondsStep=function(e){this.setProperty("secondsStep",e,true);if(this._oClocks){this._oClocks.setSecondsStep(e)}return this};S.prototype._getFormatInstance=function(t,i){var s=e.extend({},t);var o=-1;if(s.style){o=s.style.indexOf("/")}if(i){var a=e.extend({},s);if(o>0){a.style=a.style.substr(0,o)}this._oDisplayFormatDate=p.getInstance(a)}return p.getDateTimeInstance(s)};S.prototype._checkStyle=function(e){if(i.prototype._checkStyle.apply(this,arguments)){return true}else if(e.indexOf("/")>0){var t=[D.Short,D.Medium,D.Long,D.Long];var s=false;for(var o=0;o<t.length;o++){var a=t[o];for(var n=0;n<t.length;n++){var r=t[n];if(e==a+"/"+r){s=true;break}}if(s){break}}return s}return false};S.prototype._parseValue=function(e,t){var s=i.prototype._parseValue.apply(this,arguments);if(t&&!s){s=this._oDisplayFormatDate.parse(e);if(s){var o=this.getDateValue();if(!o){o=new Date}s.setHours(o.getHours());s.setMinutes(o.getMinutes());s.setSeconds(o.getSeconds());s.setMilliseconds(o.getMilliseconds())}}return s};S.prototype._getLocaleBasedPattern=function(e){var t=l.getInstance(sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()),i=e.indexOf("/");if(i>0){return t.getCombinedDateTimePattern(e.substr(0,i),e.substr(i+1))}else{return t.getCombinedDateTimePattern(e,e)}};S.prototype._createPopup=function(){var e,t,i,s,o,a;if(!this._oPopup){i=sap.ui.getCore().getLibraryResourceBundle("sap.m");s=i.getText("TIMEPICKER_SET");o=i.getText("TIMEPICKER_CANCEL");this._oPopupContent=new P(this.getId()+"-PC");this._oPopupContent._oDateTimePicker=this;this._oOKButton=new d(this.getId()+"-OK",{text:s,type:m.Emphasized,press:T.bind(this)});var n=this._getValueStateHeader();this._oPopup=new h(this.getId()+"-RP",{showCloseButton:false,showHeader:false,placement:y.VerticalPreferedBottom,beginButton:this._oOKButton,content:[n,this._oPopupContent],afterOpen:k.bind(this),afterClose:w.bind(this)});n.setPopup(this._oPopup._oControl);if(r.system.phone){e=this.$("inner").attr("aria-labelledby");t=e?document.getElementById(e).getAttribute("aria-label"):"";this._oPopup.setTitle(t);this._oPopup.setShowHeader(true);this._oPopup.setShowCloseButton(true)}else{this._oPopup._getPopup().setDurations(0,0);this._oPopup.setEndButton(new d(this.getId()+"-Cancel",{text:o,press:v.bind(this)}))}this._oPopup.addStyleClass("sapMDateTimePopup");a=this._oPopup.getAggregation("_popup");if(a.setShowArrow){a.setShowArrow(false)}this.setAggregation("_popup",this._oPopup,true)}};S.prototype._openPopup=function(e){if(!this._oPopup){return}if(!e){e=this.getDomRef()}this.addStyleClass(t.ICON_PRESSED_CSS_CLASS);var i=this._oPopup.getAggregation("_popup");i.oPopup.setAutoCloseAreas([e]);this._oPopup.openBy(e||this)};S.prototype._createPopupContent=function(){var e=!this._oCalendar;i.prototype._createPopupContent.apply(this,arguments);if(e){this._oPopupContent.setCalendar(this._oCalendar);this._oCalendar.attachSelect(b,this)}if(!this._oClocks){this._oClocks=new sap.m.TimePickerClocks(this.getId()+"-Clocks",{minutesStep:this.getMinutesStep(),secondsStep:this.getSecondsStep(),displayFormat:M.call(this),localeId:this.getLocaleId()});this._oPopupContent.setClocks(this._oClocks)}};S.prototype._selectFocusedDateValue=function(e){var t=this._oCalendar;t.removeAllSelectedDates();t.addSelectedDate(e);return this};S.prototype._fillDateRange=function(){var e=this.getDateValue(),t=true;if(e){e=new Date(e.getTime());this._oOKButton.setEnabled(true)}else{t=false;e=this.getInitialFocusedDateValue();if(!e){e=new Date;this._oCalendar.removeAllSelectedDates()}var i=this._oMaxDate.getTime();if(e.getTime()<this._oMinDate.getTime()||e.getTime()>i){e=this._oMinDate}this._oOKButton.setEnabled(false)}this._oCalendar.focusDate(e);if(t){if(!this._oDateRange.getStartDate()||this._oDateRange.getStartDate().getTime()!=e.getTime()){this._oDateRange.setStartDate(e)}}this._oClocks._setTimeValues(e)};S.prototype._getSelectedDate=function(){var e=i.prototype._getSelectedDate.apply(this,arguments);if(e){var t=this._oClocks.getTimeValues();var s=this._oClocks._getDisplayFormatPattern();if(s.search("h")>=0||s.search("H")>=0){e.setHours(t.getHours())}if(s.search("m")>=0){e.setMinutes(t.getMinutes())}if(s.search("s")>=0){e.setSeconds(t.getSeconds())}if(e.getTime()<this._oMinDate.getTime()){e=new Date(this._oMinDate.getTime())}else if(e.getTime()>this._oMaxDate.getTime()){e=new Date(this._oMaxDate.getTime())}}return e};S.prototype.getLocaleId=function(){return sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString()};S.prototype.getAccessibilityInfo=function(){var e=i.prototype.getAccessibilityInfo.apply(this,arguments);e.type=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_DATETIMEINPUT");return e};function T(e){this._handleCalendarSelect()}function v(e){this.onsaphide(e);if(!this.getDateValue()){this._oCalendar.removeAllSelectedDates()}}S.prototype._handleWindowResize=function(e){var t=this.getAggregation("_popup").getContent()[1].getAggregation("_switcher"),i=this.getAggregation("_popup").getContent()[1].getCalendar(),s=this.getAggregation("_popup").getContent()[1].getClocks();if(e.name===C){t.setVisible(true);this.getAggregation("_popup").getContent()[1]._switchVisibility(t.getSelectedKey())}else{t.setVisible(false);s.$().css("display","");i.$().css("display","")}};function k(e){this.$("inner").attr("aria-expanded",true);this._oCalendar.focus();r.media.attachHandler(this._handleWindowResize,this)}function w(){this.removeStyleClass(t.ICON_PRESSED_CSS_CLASS);this.$("inner").attr("aria-expanded",false);this._oCalendar._closePickers();r.media.detachHandler(this._handleWindowResize,this)}function M(){var e=this.getDisplayFormat();var t;var i=this.getBinding("value");if(i&&i.oType&&i.oType instanceof s){e=i.oType.getOutputPattern()}else if(i&&i.oType&&i.oType.oFormat){e=i.oType.oFormat.oFormatOptions.pattern}else{e=this.getDisplayFormat()}if(!e){e=D.Medium}var o=e.indexOf("/");if(o>0&&this._checkStyle(e)){e=e.substr(o+1)}if(e==D.Short||e==D.Medium||e==D.Long||e==D.Full){var a=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();var n=l.getInstance(a);t=n.getTimePattern(e)}else{t=e}return t}function b(e){this._oPopupContent.getCalendar().getAggregation("month")[0].addEventDelegate({onAfterRendering:function(){this._oOKButton.setEnabled(true);this._oPopupContent.switchToTime()}},this)}return S});