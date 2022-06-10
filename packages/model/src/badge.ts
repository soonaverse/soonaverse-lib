import { BaseRecord } from './base';

export interface Badge extends BaseRecord {
  name: string;
  owners: {
    // Owner / from date
    [propName: string]: Date;
  };
}
