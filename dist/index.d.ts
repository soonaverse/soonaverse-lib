import { Observable } from 'rxjs';
import { FirebaseApp } from 'firebase/app';
import { Collection, Transaction } from './interfaces/models';
import { Nft } from './interfaces/models/nft';
import { Member } from './interfaces/models/member';
/**
 * Public class to interact with Soonaverse.
 */
export declare class Soon {
    static app: FirebaseApp;
    /**
     * We connect to soonaverse as part of the contract. We only create one connection.
     */
    constructor();
    private collectionRef;
    private memberRef;
    private nftRef;
    private transactionRef;
    /**
     * Get current NFT record.
     *
     * @returns Nft
     */
    getNft(nftId: string): Promise<Nft>;
    /**
     * Get all NFTs for the given collection ids.
     *
     * @returns Collection
     */
    getNftsByCollections(collectionIds: string[]): Promise<Nft[]>;
    /**
     * Get Discord Usernames for the given list of ethaddresses.
     *
     * @param ethAddresses string[] eth Addresses to search.
     *
     * @returns string[]
     */
    getDiscordbyEthAddr(ethAddresses: string[]): Promise<Member[]>;
    /**
     * Get ranking for the given collection ids.
     *
     * @returns Collection
     */
    getRankingByCollections(collectionIds: string[], top: number): Promise<any>;
    /**
     * Get current Collection record.
     *
     * @returns Collection
     */
    getCollection(collection: string): Promise<Collection>;
    /**
     * Get all NFTs owned by ETH address
     *
     * @returns Nft[] Array of all nfts.
     */
    getNftsByEthAddress(ethAddress: string): Promise<Nft[]>;
    /**
     * Listen to changes on a particular NFT
     *
     * @return Nft Latest NFT record.
     */
    onNft(nftId: string): Observable<Nft | undefined>;
    /**
     * Listen to changes on a particular Collection
     *
     * @return Collection Latest Collection record.
     */
    onCollection(collectionId: string): Observable<Collection | undefined>;
    /**
     * Listen to all new payments on Soonaverse
     *
     * @return Nft Latest NFT record.
     */
    onValidPayment(): Observable<Transaction[]>;
    /**
     * Get all NFTs owned by IOTA address
     *
     * @param iotaAddresses string[] Iota Addresses to search. Max 10 addresses.
     *
     * @returns Nft[] Array of all nfts.
     */
    getNftsByIotaAddress(iotaAddresses: string[]): Promise<Nft[]>;
    private db;
}
