import { Timestamp } from '../../interfaces/models/base';
import { BaseRecord, EthAddress } from "./base";
import { CollectionType } from './collection';
export declare const MAX_PROPERTIES_COUNT = 25;
export declare const MAX_STATS_COUNT = 25;
export declare const PRICE_UNITS: ('Mi' | 'Gi')[];
export interface PropStats {
    [propName: string]: {
        label: string;
        value: string;
    };
}
export declare enum NftAccess {
    OPEN = 0,
    MEMBERS = 1
}
export declare enum NftAvailable {
    UNAVAILABLE = 0,
    SALE = 1,
    AUCTION = 2,
    AUCTION_AND_SALE = 3
}
export interface Nft extends BaseRecord {
    name: string;
    description: string;
    collection: EthAddress;
    owner?: EthAddress;
    isOwned?: boolean;
    media: string;
    ipfsMedia: string;
    ipfsMetadata: string;
    saleAccess?: NftAccess;
    saleAccessMembers?: string[];
    available: NftAvailable;
    availableFrom: Timestamp;
    auctionFrom?: Timestamp;
    auctionTo?: Timestamp;
    auctionHighestBid?: number;
    auctionHighestBidder?: string;
    auctionHighestTransaction?: string;
    price: number;
    availablePrice?: number;
    auctionFloorPrice?: number;
    auctionLength?: number;
    type: CollectionType;
    space: string;
    url: string;
    approved: boolean;
    rejected: boolean;
    properties: PropStats;
    stats: PropStats;
    placeholderNft: boolean;
}
