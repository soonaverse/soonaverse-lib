import { COL, TokenPurchase } from "@soonaverse/model";
import { CrudRepository } from "./CrudRepository";

export class SoonTokenPurchaseRepositoryRepository extends CrudRepository<TokenPurchase> {
  constructor() {
    super(COL.TOKEN_PURCHASE);
  }
}
