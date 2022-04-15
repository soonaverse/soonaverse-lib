import { Timestamp } from './base';

export interface MilestoneTransactionEntry {
  address: string;
  amount: number;
}

export interface MilestoneTransaction {
  createdOn: Timestamp;
  messageId: string;
  milestone: number;
  inputs: MilestoneTransactionEntry[],
  outputs: MilestoneTransactionEntry[],
}
export interface Milestone {
  transactions: {
    [propName: string]: MilestoneTransaction;
  };
  createdOn: Timestamp;
  cmi: number;
  complete: boolean;
  processed: boolean;
}
