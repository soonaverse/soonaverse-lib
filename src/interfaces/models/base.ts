
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

export const enum COL {
  MEMBER = 'member',
  AWARD = 'award',
  COLLECTION = 'collection',
  NFT = 'nft',
  SPACE = 'space',
  PROPOSAL = 'proposal',
  NOTIFICATION = 'notification',
  MILESTONE = 'milestone',
  TRANSACTION = 'transaction',
  BADGES = 'badges',
  AVATARS = 'avatars',
}

export const enum SUB_COL {
  OWNERS = 'owners',
  PARTICIPANTS = 'participants',
  MEMBERS = 'members',
  GUARDIANS = 'guardians',
  BLOCKED_MEMBERS = 'blockedMembers',
  KNOCKING_MEMBERS = 'knockingMembers',
  TRANSACTIONS = 'transactions'
}

export const enum AWARD_COL {
  OWNERS = 'owners'
}

export type EthAddress = string;
export type IotaAddress = string;
export type IpfsCid = string;

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

  // Sharabble url
  wenUrl?: string;
  wenUrlShort?: string;

  // Doc cursor used internally.
  _doc?: any;
  // Sometimes we want data from parent collecton because we search through it.
  _subColObj?: any;
}

export interface FileMetedata {
  metadata: IpfsCid;
  original: IpfsCid;
  avatar: IpfsCid;
  fileName: string;
}

export enum FILE_SIZES {
  small = 'small',
  medium = 'medium',
  large = 'large'
}
