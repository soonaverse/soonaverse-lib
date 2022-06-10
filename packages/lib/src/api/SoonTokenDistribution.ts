import { COL, SUB_COL, TokenBuySellOrder } from "@soonaverse/model";
import { FirestoreSubColCrudRepository } from "../firestore/FirestoreSubColCrudRepository";

export class SoonTokenDistribution extends FirestoreSubColCrudRepository<TokenBuySellOrder> {
  constructor() {
    super(COL.TOKEN, SUB_COL.DISTRIBUTION);
  }
}
