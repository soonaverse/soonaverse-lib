[![npm](https://img.shields.io/npm/v/soonaverse?logo=npm)](https://www.npmjs.com/package/soonaverse)

# Soonaverse - Soonaverse JavaScript/Typescript API

Soonaverse library to interact with Soonaverse platform. 

Primarely to read data from Soonaverase. Eventually we will provide web component integrated into web3 that can be embeeded on another sites.

## Getting Started

### NPM Package
Install NPM package
```
npm install soonaverse --save
```

Initial class and call required functions. See API below for full list of commands:
```
import { Soon } from '../dist/index';

const soon = new Soon();
soon.getNftsByIotaAddress('0x551FD2C7c7bF356baC194587dAb2fcd46420054b').then((obj) => {
    console.log(obj);
});
```

### Use JS script to your app directly
Add script within your html
```
<script src="https://cdn.jsdelivr.net/npm/soonaverse@latest/dist/soon.js"></script>

// We initiate Soon class to window.soon
```

Get NFT owner by IOTA Address
```
window.soon.getIotaAddressNfts([
    'iota1qryv5aqy0p7lcr7djn8fea9cl4rqqv3xxcqah0erc2gdee3czm6wcmln3fp'
]).then((obj) => {
  console.log('NFTs owned by IOTA Address')
  console.log(obj);
});
```

## Architecture
- Google Firestore (highly performant database layer)
- Centralized Contracts (interm) / Smart Contracts
 
Centralized contracts are slowly being replaced by Solidity Smart Contract as technology is mature enough and business processes are locked down. 

Google Firestore stays in place to provide highly performant and scalable layer to read data. 

Two different tools exists:
- Tangle Listener -> custom plugin connected with Hornet that streams near real-time information about Tangle into Google Firestore
- Wasp Listener -> custom plugin connected to Wasp that streams near real-time information from the L2 chain
- Google Cloud Functions (serverless) -> Centralised contracts (functions/typescript) that executes business process and write results to Google Firestore

Google Firestore is used in a similar way GraphQL would be used in other DeFi projects. Google Firestore is used instead of GraphQL due it's highly performant and scalable attributes.

![Soonaverse High-level architecture](/assets/architecture_stages.webp)

## API

### GET: getNftsByIotaAddress
Find all NFT IOTA Address owns. You can pass an array with up to 10 IOTA Addresses.
```
getIotaAddressNfts([
    'iota1qryv5aqy0p7lcr7djn8fea9cl4rqqv3xxcqah0erc2gdee3czm6wcmln3fp'
]).then((obj) => {
  console.log('NFTs owned by IOTA Address')
  console.log(obj);
});
```

### GET: getNftsByEthAddress
Get all NFTs owned by an ETH address.
```
getNftsByEthAddress('0x551FD2C7c7bF356baC194587dAb2fcd46420054b').then((obj) => {
  console.log(obj);
});
```

### LISTEN: onNft
Listen to updates on a particular NFT. RXJS Observable stream is returned.

```
(<any>window).soon.onNft('0xa16722921cf0aa33ccc0d36bdff057dece5dc7ae').subscribe((obj) => {
    console.log('NFT Updated')
    console.log(obj);
});

```

## Contributing

### Contributing Guidelines

Read through our [contributing guidelines](CONTRIBUTING.md) to learn about our submission process, coding rules and more.