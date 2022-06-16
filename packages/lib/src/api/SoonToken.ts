import { COL, Token, TokenBuySellOrder, TokenDistribution, Transaction } from "@soonaverse/model";
import { FirestoreCrudRepository } from "../firestore/FirestoreCrudRepository";
import { callFirebaseFunction, WEN_FUNC } from "../functions/FirebaseFunctions";

export class SoonToken extends FirestoreCrudRepository<Token> {
  constructor() {
    super(COL.TOKEN);
  }

  public create = callFirebaseFunction<Token | undefined>(WEN_FUNC.cToken);

  public update = callFirebaseFunction<Token | undefined>(WEN_FUNC.uToken);

  public setTokenAvailableForSale = callFirebaseFunction<Token | undefined>(
    WEN_FUNC.setTokenAvailableForSale
  );

  public cancelPublicSale = callFirebaseFunction<Token | undefined>(
    WEN_FUNC.cancelPublicSale
  );

  public order = callFirebaseFunction<Transaction | undefined>(
    WEN_FUNC.orderToken
  );

  public credit = callFirebaseFunction<Transaction | undefined>(
    WEN_FUNC.creditToken
  );

  public airdrop = callFirebaseFunction<TokenDistribution[] | undefined>(
    WEN_FUNC.airdropToken
  );

  public claimAirdropped = callFirebaseFunction<Transaction | undefined>(
    WEN_FUNC.claimAirdroppedToken
  );
}
