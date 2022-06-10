import { COL, TokenBuySellOrder } from "@soonaverse/model";
import { FirestoreCrudRepository } from "../firestore/FirestoreCrudRepository";
import { callFirebaseFunction, WEN_FUNC } from "../functions/FirebaseFunctions";

export class SoonTokenMarket extends FirestoreCrudRepository<TokenBuySellOrder> {
  constructor() {
    super(COL.TOKEN_MARKET);
  }

  public sell = callFirebaseFunction<TokenBuySellOrder | undefined>(
    WEN_FUNC.sellToken
  );

  public buy = callFirebaseFunction<TokenBuySellOrder | undefined>(
    WEN_FUNC.buyToken
  );

  public cancelBuyOrSell = callFirebaseFunction<TokenBuySellOrder | undefined>(
    WEN_FUNC.cancelBuyOrSell
  );
}
