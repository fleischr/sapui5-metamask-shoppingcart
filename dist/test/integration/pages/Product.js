sap.ui.define(["sap/ui/test/Opa5","./Common","sap/ui/test/matchers/PropertyStrictEquals","sap/ui/test/actions/Press","sap/ui/test/matchers/Properties"],function(e,t,s,r,o){"use strict";e.createPageObjects({onTheProduct:{baseClass:t,viewName:"Product",actions:{iPressTheBackButtonInProduct:function(){return this.waitFor({controlType:"sap.m.Button",matchers:new s({name:"type",value:"Back"}),actions:new r,errorMessage:"The nav back button was not displayed"})},iAddTheDisplayedProductToTheCart:function(){return this.waitFor({controlType:"sap.m.Button",matchers:function(e){return this.I18NTextExtended(e,"addToCartShort","text")}.bind(this),actions:new r,errorMessage:"The press action could not be executed"})},iPressOnTheProductPicture:function(){return this.waitFor({id:"productImage",actions:new r})},iPressTheCloseButtonOfTheLightBox:function(){return this.waitFor({controlType:"sap.m.Button",matchers:[new s({name:"text",value:"Close"}),new s({name:"enabled",value:true})],actions:new r,errorMessage:"Did not find the Close button"})},iToggleTheCart:function(){return this.waitFor({controlType:"sap.m.Button",matchers:new s({name:"icon",value:"sap-icon://cart"}),actions:new r,errorMessage:"The cart button was not found and could not be pressed"})}},assertions:{iShouldSeeALightBox:function(){return this.waitFor({id:"lightBox",success:function(){e.assert.ok(true,"Light Box is visible")}})},iShouldSeeAnAvatarButton:function(){return this.waitFor({controlType:"sap.m.Button",matchers:new o({icon:"sap-icon://customer"}),success:function(){e.assert.ok(true,"Avatar button is visible")},errorMessage:"There is no avatar button"})},iShouldSeeTheProductPage:function(){return this.waitFor({success:function(){e.assert.ok(true,"The product page was successfully displayed")},errorMessage:"The product page was not displayed"})},iShouldSeeTheBlasterExtremeDetailPage:function(){return this.waitFor({success:function(){e.assert.ok(true,"The Blaster Extreme page was successfully displayed")},errorMessage:"The Blaster Extreme page was not displayed"})},iShouldSeeTheSmartphoneAlphaDetailPage:function(){return this.waitFor({success:function(){e.assert.ok(true,"The Smartphone Alpha page was successfully displayed")},errorMessage:"The Smartphone Alpha page was not displayed"})},iShouldSeeTheRightProduct:function(){return this.waitFor({controlType:"sap.m.ObjectHeader",matchers:new s({name:"title",value:"Bending Screen 21HD"}),success:function(){e.assert.ok(true,"The 'Bending Screen 21HD' product is bookmarakbel")},errorMessage:"The'Bending Screen 21HD' product was not found"})}}}})});