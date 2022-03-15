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

    //TODO fix how we load this ABI
    //const genericErc20Abi = require("../localService/contract/genericERC20.json");
    //const supportedNetworks = require("../localService/mockdata/Networks.json");


sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
    //"shoppingcartdemo/node_modules/ethers",
    //"shoppingcartdemo/node_modules/require"
], function (JSONModel, Device) {
	"use strict";

    //idk yet if const will reference npm modules in SAP GW, but for demo purposes - why not?
    //const ethers = require('ethers'); 
    
    //const provider = ethers.providers.InfuraProvider;
    const provider = new ethers.providers.Web3Provider(window.ethereum); //inherits the provider from metamask

    var existingContracts = {};

    var UI5web3Helper = {
        genericERC20int : null,
        getTokenBalance : async function(contract) {
            //TODO get the contract balance and convert to string 
            const balance = (await contract.balanceOf((await provider.getSigners())[0].address)).toString();
            //const balance = "1069";
            return balance;
        },
        getContract: function(tokenContractAddress) {
           var requestedContract = new ethers.Contract(tokenContractAddress, genericErc20Abi, provider);
            existingContracts[tokenContractAddress] = requestedContract;
            return requestedContract;
        },
        //reminder anytime you use await anywhere, you gotta have the function be async
        getGasBalance : async function() {
            const balance = await provider.getBalance("address");
            return balance.toString();
        },
        getGasToken : function() {
            return "ETH";
        },
        getBlockExplorerLink: function(chainId, address, txnHash) {
            return "https://etherscan.io";
        } 
        /*loadGenericERC20ABI : function() {
            //const jsonModel = new JSONModel();
            //await jsonModel.loadData(".../localService/contract/genericERC20.json");
            $.ajax({
                dataType: "json",
                url: ".../localService/contract/genericERC20.json",
                success: function(erc20interface) {
                    this.genericERC20int = erc20interface;
                }
            });
        },
        getGenericERC20ABI : function () {
            if (this.genericERC20int === null) {
                 this.loadGenericERC20ABI();
            }
            return this.genericERC20int;
        }*/
    };

    return UI5web3Helper;

});
