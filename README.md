[![npm](https://img.shields.io/npm/v/soonaverse?logo=npm)](https://www.npmjs.com/package/soonaverse)

# Soonaverse - Soonaverse JavaScript/Typescript API - APLHA

Please note this is APLHA and we might introduce breaking changes.

Library to interact with Soonaverse platform. 

At this stage it only supports reading or streaming data from Soonaverase. Eventually we will provide web components that can be embeded on another sites.

## Getting Started

### NPM Package
Install NPM package
```
npm install soonaverse --save
```

Initiate class and get NFTs owned by IOTA Address. 
See API for full list of commands below:
```
import { Soon } from 'soonaverse';

const soon = new Soon();
soon.getNftsByIotaAddress('iota1qryv5aqy0p7lcr7djn8fea9cl4rqqv3xxcqah0erc2gdee3czm6wcmln3fp').then((obj) => {
    console.log(obj);
});
```

### Use JS script directly in your app
Add script within your html
```
<script src="https://cdn.jsdelivr.net/npm/soonaverse@latest/dist/soon.js"></script>

// We initiate Soon class to window.soon
```
Get NFT owner by IOTA Address
```
window.soon.getNftsByIotaAddress([
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
- Tangle Listener -> custom component connected with Hornet that streams near real-time information about Tangle into Google Firestore
- Wasp Listener -> custom component connected to Wasp that streams near real-time information from the L2 chain into Google Firestore.
- Google Cloud Functions (serverless) -> Centralised contracts (typescript) that executes business processes and write results into Google Firestore

Google Firestore is used in a similar way GraphQL would be used in other DeFi projects. Google Firestore is used instead of GraphQL due it's highly performant and scalable attributes.

![Soonaverse High-level architecture](/assets/architecture_stages.webp)

## API

### GET: getNftsByIotaAddress
Get all NFTs owned by an IOTA Address. You can pass an array with up to 10 IOTA Addresses.
```
getNftsByIotaAddress([
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

### GET: getNft
Get NFT
```
getNft('0xa16722921cf0aa33ccc0d36bdff057dece5dc7ae').then((obj) => {
  console.log(obj);
});
```

### GET: getCollection
Get Collection
```
getCollection('0xcbe28532602d67eec7c937c0037509d426f38223').then((obj) => {
  console.log(obj);
});
```

### GET: getNftsByCollections
Get NFTs within Collection
```
getNftsByCollections(['0xc9813fa99b4b5a7f0e18e912bf726730bc633c17']).then((obj) => {
  console.log(obj);
});
```

### LISTEN: onNft
Listen to updates for a particular NFT. RXJS Observable stream is returned.

```
onNft('0xa16722921cf0aa33ccc0d36bdff057dece5dc7ae').subscribe((obj) => {
    console.log('NFT Updated')
    console.log(obj);
});

```

### LISTEN: onCollection
Listen to updates for a particular Collection. RXJS Observable stream is returned.

```
onCollection('0xcbe28532602d67eec7c937c0037509d426f38223').subscribe((obj) => {
    console.log('Collection Updated')
    console.log(obj);
});

```

### LISTEN: onValidPayment
Listen to ALL valid payments on Soonaverse.

```
onValidPayment().subscribe((obj) => {
    console.log('Payment')
    console.log(obj);
});

```

## Contributing

### Contributing Guidelines

Read through our [contributing guidelines](CONTRIBUTING.md) to learn about our submission process, coding rules and more.
