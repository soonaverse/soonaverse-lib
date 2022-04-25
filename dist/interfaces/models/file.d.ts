import { BaseRecord } from './base';
export interface File extends BaseRecord {
    uid: string;
    ipfsCid: string;
}
