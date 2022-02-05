/* refer to https://ethereum.stackexchange.com/questions/101858/how-to-get-the-erc-20-token-balance-of-an-account-using-etherjs
/*
added this dependency
const ethers = require('ethers');

located in localservice/contract
const genericErc20Abi = require(..../.../Erc20.json);

refer to SupportedAssets.json
const tokenContractAddress = '0x...';

TODO figure this out for UI5
const provider = ...; (use ethers.providers.InfuraProvider for a Node app or ethers.providers.Web3Provider(window.ethereum/window.web3) for a React app)

TODO create helper methods for these
const contract = new ethers.Contract(tokenContractAddress, genericErc20Abi, provider);
const balance = (await contract.balanceOf((await provider.getSigners())[0].address)).toString();*/

//SAPUI5's convention isn't to define dependencies through const = require, but rather through sap.ui.define and a promise 
// see https://sapui5.hana.ondemand.com/sdk/#/api/sap.ui%23methods

sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

    //idk yet if const will reference npm modules in SAP GW, but for demo purposes - why not?
    const ethers = require('ethers');
    const provider = ethers.providers.InfuraProvider;

    const genericErc20Abi = require(.../localService/contract/genericERC20.json);

    var UI5web3Helper = {
        getTokenBalance: function(contract) {
            const balance = (await contract.balanceOf((await provider.getSigners())[0].address)).toString();
        },
        getContract: function(tokenContractAddress) {
            return new ethers.Contract(tokenContractAddress, genericErc20Abi, provider);
        }        
    };

    return UI5web3Helper;

});
