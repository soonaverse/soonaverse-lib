import { BaseRecord } from './base';
export interface Badge extends BaseRecord {
    name: string;
    owners: {
        [propName: string]: Date;
    };
}
