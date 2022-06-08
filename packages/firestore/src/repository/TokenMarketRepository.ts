import { COL, TokenBuySellOrder } from "@soonaverse/model";
import { CrudRepository } from "./CrudRepository";

export class SoonTokenMarketRepositoryRepository extends CrudRepository<TokenBuySellOrder> {
  constructor() {
    super(COL.TOKEN_MARKET);
  }
}
