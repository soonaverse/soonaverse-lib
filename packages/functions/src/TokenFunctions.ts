import { Proposal } from '@soonaverse/model';
import { AbstractFunctions, WEN_FUNC } from './AbstractFunctions';

export class SoonTokenFunctions extends AbstractFunctions<Proposal> {
  public create = this.request(WEN_FUNC.cToken);

  public update = this.request(WEN_FUNC.uToken);

  public setTokenAvailableForSale = this.request(
    WEN_FUNC.setTokenAvailableForSale
  );

  public cancelPublicSale = this.request(WEN_FUNC.cancelPublicSale);

  public order = this.request(WEN_FUNC.orderToken);

  public credit = this.request(WEN_FUNC.creditToken);

  public airdrop = this.request(WEN_FUNC.airdropToken);

  public claimAirdropped = this.request(WEN_FUNC.claimAirdroppedToken);

  public sell = this.request(WEN_FUNC.sellToken);

  public buy = this.request(WEN_FUNC.buyToken);

  public cancelBuyOrSell = this.request(WEN_FUNC.cancelBuyOrSell);
}
