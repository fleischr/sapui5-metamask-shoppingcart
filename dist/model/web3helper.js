sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(n,e){"use strict";const t=ethers.providers.InfuraProvider;var r={};var a={genericERC20int:null,getTokenBalance:async function(n){const e=(await n.balanceOf((await t.getSigners())[0].address)).toString();return e},getContract:function(n){var e=new ethers.Contract(n,genericErc20Abi,t);r[n]=e;return e},getGasBalance:async function(){const n=await t.getBalance("address");return n.toString()},getGasToken:function(){return"ETH"},getBlockExplorerLink:function(n,e,t){return"https://etherscan.io"}};return a});