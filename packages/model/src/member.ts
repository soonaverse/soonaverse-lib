import { BaseRecord, EthAddress, FileMetedata, ValidatedAddress } from './base';

export interface Member extends BaseRecord {
  uid: EthAddress;
  nonce?: string;
  name?: string;
  about?: string;
  currentProfileImage?: FileMetedata;
  discord?: string;
  twitter?: string;
  github?: string;
  spaces?: {
    [propName: string]: {
      uid: string;
      badges: string[],
      awardsCompleted?: number;
      totalReputation?: number;
    }
  }
  alliances?: string[];
  awardsCompleted?: number;
  totalReputation?: number;
  validatedAddress?: ValidatedAddress;
}
