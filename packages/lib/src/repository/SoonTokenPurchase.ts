import { COL, TokenPurchase } from "@soonaverse/model";
import { FirestoreCrudRepository } from "../firestore/FirestoreCrudRepository";

export class SoonTokenPurchase extends FirestoreCrudRepository<TokenPurchase> {
  constructor() {
    super(COL.TOKEN_PURCHASE);
  }
}
