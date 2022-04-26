import { Soon } from '../dist/index';

const soon = new Soon();
(<any>window).soon = soon;

// // Get all spaces
// soon.getAllSpaces().then((obj) => {
//     console.log(obj);
// });

// // NFT 0xa30a1d1a61df81cea9873386678c7c05c12bc350 as test.
// soon.getNft('0xa30a1d1a61df81cea9873386678c7c05c12bc350').then((obj) => {
//     console.log(obj);
// });

// Adam_unchained wallet as test 0x551FD2C7c7bF356baC194587dAb2fcd46420054b
// soon.getNftsByEthAddress('0x551FD2C7c7bF356baC194587dAb2fcd46420054b').then((obj) => {
//     console.log(obj);
// });

// // Adam_unchained wallet as test 0x551FD2C7c7bF356baC194587dAb2fcd46420054b
// (<any>window).soon.getIotaAddressNfts(['iota1qryv5aqy0p7lcr7djn8fea9cl4rqqv3xxcqah0erc2gdee3czm6wcmln3fp']).then((obj) => {
//     console.log(obj);
// });

// // Adam_unchained wallet as test 0x551FD2C7c7bF356baC194587dAb2fcd46420054b
// (<any>window).soon.onNft('0xa16722921cf0aa33ccc0d36bdff057dece5dc7ae').subscribe((obj) => {
//     console.log(obj);
// });

// // Listen to payments
// (<any>window).soon.onValidPayment().subscribe((obj) => {
//     console.log(obj);
// });

// Get NFTs by collection
// soon.getNftsByCollections(['0xc9813fa99b4b5a7f0e18e912bf726730bc633c17']).then((obj) => {
//     console.log(obj);
// });

// Get space transactions
// soon.getSpaceTransactions('0x9e983f054e294d41beacbb28f769bcbc044b0766').then((obj) => {
//     console.log(obj);
// });
