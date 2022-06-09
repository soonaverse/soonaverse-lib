import { COL, Token } from "@soonaverse/model";
import { FirestoreCrudRepository } from "../firestore/FirestoreCrudRepository";
import { callFirebaseFunction, WEN_FUNC } from "../functions/FirebaseFunctions";

export class SoonToken extends FirestoreCrudRepository<Token> {
  constructor() {
    super(COL.SPACE);
  }
  
  public create = callFirebaseFunction(WEN_FUNC.cToken);

  public update = callFirebaseFunction(WEN_FUNC.uToken);

  public setTokenAvailableForSale = callFirebaseFunction(
    WEN_FUNC.setTokenAvailableForSale
  );

  public cancelPublicSale = callFirebaseFunction(WEN_FUNC.cancelPublicSale);

  public order = callFirebaseFunction(WEN_FUNC.orderToken);

  public credit = callFirebaseFunction(WEN_FUNC.creditToken);

  public airdrop = callFirebaseFunction(WEN_FUNC.airdropToken);

  public claimAirdropped = callFirebaseFunction(WEN_FUNC.claimAirdroppedToken);

  public sell = callFirebaseFunction(WEN_FUNC.sellToken);

  public buy = callFirebaseFunction(WEN_FUNC.buyToken);

  public cancelBuyOrSell = callFirebaseFunction(WEN_FUNC.cancelBuyOrSell);
}
