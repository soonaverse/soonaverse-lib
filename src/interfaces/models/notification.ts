import { BaseRecord, EthAddress } from './base';
export enum NotificationType {
  NEW_BID = 'NEW_BID',
  LOST_BID = 'LOST_BID',
  WIN_BID = 'WIN_BID'
}

export interface NotificationBidParams {
  member: {
    name: string
  },
  amount: number;
  nft: {
    uid: string,
    name: string
  },
}

export interface NotificationWinBidParams {
  member: {
    name: string
  },
  amount: number;
  nft: {
    uid: string,
    name: string
  },
}

export interface NotificationLostBidParams {
  member: {
    name: string
  },
  amount: number;
  nft: {
    uid: string,
    name: string
  },
}

export interface Notification extends BaseRecord {
  uid: EthAddress;
  space?: EthAddress;
  member?: EthAddress;
  type: NotificationType;
  params: NotificationBidParams|NotificationWinBidParams|NotificationLostBidParams;
}
