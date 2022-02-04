/* refer to https://ethereum.stackexchange.com/questions/101858/how-to-get-the-erc-20-token-balance-of-an-account-using-etherjs
/*const ethers = require('ethers');
const genericErc20Abi = require(..../.../Erc20.json);
const tokenContractAddress = '0x...';
const provider = ...; (use ethers.providers.InfuraProvider for a Node app or ethers.providers.Web3Provider(window.ethereum/window.web3) for a React app)
const contract = new ethers.Contract(tokenContractAddress, genericErc20Abi, provider);
const balance = (await contract.balanceOf((await provider.getSigners())[0].address)).toString();*