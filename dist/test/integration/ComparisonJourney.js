sap.ui.define(["sap/ui/test/opaQunit","./pages/Home","./pages/Category","./pages/Product","./pages/Comparison","./pages/Cart","./pages/Welcome"],function(o){"use strict";var e="HT-1254",n="HT-1255",i="HT-1137";QUnit.module("Comparison Journey");o("Should see the product list with Compare link",function(o,e,n){o.iStartMyApp();e.onHome.iPressOnTheFlatScreensCategory();n.onTheCategory.iShouldSeeCompareLinkOnListEntry()});o("Should see comparison view with one product",function(o,n,i){n.onTheCategory.iPressOnCompareLink(e);i.onTheComparison.iShouldSeeAProductAndAPlaceholder(e)});o("Should add a product to the cart",function(o,e,n){e.onTheComparison.iAddTheDisplayedProductToTheCart();e.onTheComparison.iToggleTheCart();n.onTheCart.iShouldSeeTheProductInMyCart().and.iShouldSeeTheTotalPriceUpdated()});o("Should see comparison view with two products",function(o,i,r){i.onTheComparison.iToggleTheCart();i.onTheCategory.iPressOnCompareLink(n);r.onTheComparison.iShouldSeeTwoProducts(e,n)});o("Should see comparison view with a different second product",function(o,n,r){n.onTheCategory.iPressOnCompareLink(i);r.onTheComparison.iShouldSeeTwoProducts(e,i)});o("Should see comparison view with one product",function(o,n,r){n.onTheComparison.iDeleteAProduct(e);r.onTheComparison.iShouldSeeAProductAndAPlaceholder(i);r.iTeardownMyApp()})});