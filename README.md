Read IMPORTANT DISCLAIMER mentioned at the the bottom of this page before you proceed further.

# Metamask Integration to SAPUI5 - Sample App

This app demonstrates how Metamask can be integrated into Fiori apps using the SAPUI5 framework. 

## App fork details

This app is forked from the shopping cart example provided on the SAPUI5 documentation website.
https://sapui5.hana.ondemand.com/#/demoapps

Converted the standard unit of account from Euros to USD for sake of standardization and clarity.

# FAQ

## What is Fiori and SAPUI5?

Fiori is the user experience design standard used for web, mobile, and cloud applications for SAP's suite of S/4 HANA, C/4 HANA, Ariba, TM, and other cutting edge SAP projects. An extensive index of standard SAP Fiori applications can be found at https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/. At last count - over 14851 standard SAP Fiori apps are available! And this does not include the many other custom SAP Fiori apps used in various other SAP implementations. 

SAPUI5 is a technical framework frequently used to extend and develop Fiori application. It's similar to frameworks such as Angular or React

## What is Metamask?
Metamask is a lightweight digital wallet commonly used for interacting with decentralized web apps ("dapps") on Ethereum and other Ethereum compatible networks. It's a popular choice for crypto users to interact with NFT marketplaces, Decentralized Finance ("DeFi"), and other services built on public blockchain networks. It can also be used for other private or permissioned EVM compatible networks such as Quorum

Many other competing alternatives to Metamask do exist - I've used Metamask for demonstration purposes here as its the most commonly used crypto wallet today.

## Why use Metamask with Fiori and SAPUI5?
My aim with this project is to equip SAP Fiori UI5 developers (as well as dApp integrators) with the basic approach to integrate decentralized apps and services into their SAP environments through Fiori. I was very curious of this myself and couldn't find it documented anywhere - so I made this! :D

SAP Fiori apps cover vast set of use cases ranging from corporate finance (Accounts Payable + Receivable, Treasury, Tax, General Ledger), order fullfillment, supply chain, procurement, manufacturing, HR, CRM and many other business processes. Out of those many business processes - there are many opportunities to consider decentralized crypto/blockchain networks as a way to improve those business processes. 

Most business processes on SAP - and thusly SAP Fiori - are inherently multi-party. Business partners such customers, vendors, government entities, auditors are all impacted by SAP system transactions. Very generally, the aim in integrating blockchain networks with SAP isn't to replace or displace the ERP core system. Rather, it is to improve some aspects of the integration and shared business practices of the involved parties.

Some real world examples to explore:
-On-chain settlements. A big advantage crytocurrencies have to their analog banking counterparts is speed to finality. Payments are sent, received, and settled in the matter of minutes or seconds whereas a bank transfer may take several business days to complete. In the big picture, this can help your company run a more efficient balance sheet.  High gas fees could be a deterrant from using the Ethereum mainnet, but other EVM-compatible networks (Avalanche, Celo, Binance chain etc) or Ethereum layer 2 (Polygon Matic) tend to offer much cheaper gas fees. And depending on the transaction - crypto networks are cheaper to use than a credit card or bank transfer
-Supply Chain Finance, Invoice factoring of AP/AR balances. Using the power of DeFi, Invoice factoring allows you to take/give out advances on invoices that are not yet fully settled to free up cash position
-Consumer product tracing. Food traceability is a classic blockchain use case. How can you provide a trusted system in which farmers, food distributors/warehouser, grocers, and retail consumber can understand where their food comes from? And also very importantly - if a recall may have been issued? Blockchains can provide a public ledger
-Zero knowledge proofing. Other data is not always suitable for the whole world to see - however the resiliency and non-repudiation of public blockchain networks may be still be desirable. A zero-knowledge proof can ensure business sensitive data like an invoice date or material availability date can be verified by the involved parties through a public mainnet. But *without* leaking this data in clear text for the whole world to see.
-Enhanced security and privacy. SAP systems often centralize, retain, and transmit banking and other sensitive personal information that is highly vulnerable to fraud if leaked, stolen, or altered. By contrast - digital wallets like Metamask can't as easily stolen or manipulated in that same way; more advanced phishing methods to trick the user to giving away a seed phrase/private key are needed instead of simply commandeering a bank account number and personal information to commit fraud and theft. Moreover - you can offer more convenient shopping experiences in crypto currencies that don't necessarily require you to repeatedly give away your personal data like your address, birthdate, etc.
-NFTs as digital twins to real world assets. Not just jpegs - but heavy machinery, real-estate, carbon credits or even an unpaid invoices can be tokenized and brought into unique, highly efficient market structures only made possible in web3/DeFi.

... and so much more. There's really a lot of exciting possibilities in digital assets! :D

To be clear: Not necessarily all Fiori apps are fit for integration into blockchains - but SAP systems offer a wealth of data and business opportunity to be considered.

## What are the risks I should be aware of?

First: Read the disclaimer. Overall, this is a proof of concept application and no warranty is expressed or implied. By using this application, you are accepting full responsibility of any risks or challenges you may personally face in using it. 

To better equip you, here are some risks I recommend you look out for.

Risk #1. Your private key/seed phrase. It's a 12 world phrase generated by metamask that secures your digital wallet. This password is completely non-custiodial - If you lose it, there's no reset to get it back. Anyone with the private key can take full control of the assets in the wallet. Digital wallet users routinely have to fend off phishing attacks. Write your seed phrase and keep it in a safe place and be very very careful when re-entering it to restore the wallet. For enterprise-level integration of digital wallets, a multi-sig wallet (which requires digital signatures of multiple users to complete a transaction) or a hardware wallet (which emits the digital signatures to move wallet funds, but keeps private keey offline) may be helpful - Metamask themselves offer an institutional version of the Metamask wallet that offers these and other security features. There's also grant available via baseline protocol to link X.509 certs to wallets. My overall recommendation is to use separate wallets for your real life mainnet funds and testing/proof of concept apps like this one.

Risk #2. Smart contract risk/wallet address. Smart contracts may always have bugs in them that result in funds being lost or stolen. Generally, issues such as this are avoided when contracts are properly audited by an external 3rd party such as Quantstamp or Certik. It can be difficult to recover transactions sent to a wrong address. Before signing transactions, check the contract or wallet address to ensure it matches your intended destination. ENS addresses (such as ryfleisch.eth) do provide a more human readable form of certain Ethereum addresses (0x....). A whitelisting API may provide further protecting against sending funds to an incorrect or the ETH burn address.

Risk #3. General legal. Use of decentralized finance or cryptocurrencies in general may be restricted depending on your region. The regulatory status can be unclear. Generally governments request users to report taxable transactions and implement AML, anti-terrorist financing, or KYC practices. While this may sound intimidating - many enterprises even without cryptocurrencies today have to follow similar laws in their business practices. In general, I would advise consulting legal experts / attorneys before launching any large scale crypto-based line of business. However, you generally are OK to try out test applications like this one.

## How to deploy for testing purposes
Clone the repository. Run npm start.

## How to obtain testnet ether and related testnet assets

You'll need to load your Metamask wallet with some assets you can use in this sample Fiori/Metamask dApp.

Various testnet faucets of EVM based chains are available courtesy of Chainlink and other foundations supporting the networks at
https://faucets.chain.link/. You can paste your wallet address and receive the test assets shortly.

You can google around for other faucets. Many others are available.

Once you have some testnet assets - you can swap those on the DEX like Bancor or Uniswap.

## Deploying to private blockchain / Ganache Truffle Dev environment

You would simply configure the host and RPC port of your private network in the Metamask settings. More details can be found here:

## What about non-EVM chains? (ex: Solana, Terra, Elrond, Cardano etc.)

Feel free to fork this project to demonstrate use of wallets of non-EVM chains!

# IMPORTANT DISCLAIMER
This app is only intended for demonstration purposes only. It is only meant for integration to testnets on Ethereum and other testnest of similar networks.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

This source code is just an example, it can not be used in production environments and it does not represent any software or product or service or opinion from my employer Accenture Federal Services. It is not endorsed in any way by Accenture Federal Services. You should exercise your own judgement and prudence before using it. There is no one who is actively maintaining or supporting this project.

This example open source software is provided for informational and entertainment purposes only.  It is for general informational purposes only and are not intended to provide specific advice or recommendations for any individual or on any specific security or investment product.  It is only intended to provide education for various software programming topics.

Nothing on this software example constitutes investment advice, performance data or any recommendation that any security, portfolio of securities, investment product, transaction or investment strategy is suitable for any specific person. You must not use information provided here to make financial decisions and you need to seek professional advice from someone who is authorised to provide investment advice.
