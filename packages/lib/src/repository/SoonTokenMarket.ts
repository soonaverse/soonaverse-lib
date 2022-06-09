import { COL, TokenBuySellOrder } from "@soonaverse/model";
import { FirestoreCrudRepository } from "../firestore/FirestoreCrudRepository";

export class SoonTokenMarket extends FirestoreCrudRepository<TokenBuySellOrder> {
  constructor() {
    super(COL.TOKEN_MARKET);
  }
}
