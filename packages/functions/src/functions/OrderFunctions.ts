import { Proposal } from '@soonaverse/model';
import { AbstractFunctions, WEN_FUNC } from './AbstractFunctions';

export class SoonOrderFunctions extends AbstractFunctions<Proposal> {
  public order = this.request(WEN_FUNC.orderNft);

  public openBid = this.request(WEN_FUNC.openBid);

  public validateAddress = this.request(WEN_FUNC.validateAddress);
}
