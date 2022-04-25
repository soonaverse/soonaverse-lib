export interface Timestamp {
    now(): Timestamp;
    fromDate(date: Date): Timestamp;
    fromMillis(milliseconds: number): Timestamp;
    readonly seconds: number;
    readonly nanoseconds: number;
    toDate(): Date;
    toMillis(): number;
    isEqual(other: Timestamp): boolean;
    valueOf(): string;
}
export interface WenRequest {
    address: string;
    signature: string;
    body: any;
}
export declare const enum COL {
    MEMBER = "member",
    AWARD = "award",
    COLLECTION = "collection",
    NFT = "nft",
    SPACE = "space",
    PROPOSAL = "proposal",
    NOTIFICATION = "notification",
    MILESTONE = "milestone",
    TRANSACTION = "transaction",
    BADGES = "badges",
    AVATARS = "avatars"
}
export declare const enum SUB_COL {
    OWNERS = "owners",
    PARTICIPANTS = "participants",
    MEMBERS = "members",
    GUARDIANS = "guardians",
    BLOCKED_MEMBERS = "blockedMembers",
    KNOCKING_MEMBERS = "knockingMembers",
    TRANSACTIONS = "transactions"
}
export declare const enum AWARD_COL {
    OWNERS = "owners"
}
export declare type EthAddress = string;
export declare type IotaAddress = string;
export declare type IpfsCid = string;
export interface Base {
    uid: string;
}
export interface BaseSubCollection {
    parentId: string;
    parentCol: string;
}
export interface BaseRecord extends Base {
    createdOn?: Timestamp;
    updatedOn?: Timestamp;
    createdBy?: string;
    wenUrl?: string;
    wenUrlShort?: string;
    _doc?: any;
    _subColObj?: any;
}
export interface FileMetedata {
    metadata: IpfsCid;
    original: IpfsCid;
    avatar: IpfsCid;
    fileName: string;
}
export declare enum FILE_SIZES {
    small = "small",
    medium = "medium",
    large = "large"
}
