import { Proposal } from '@soonaverse/model';
import { AbstractFunctions, WEN_FUNC } from './AbstractFunctions';

export class SoonNftFunctions extends AbstractFunctions<Proposal> {
  public create = this.request(WEN_FUNC.cNft);

  public createBatch = this.request(WEN_FUNC.cBatchNft);

  public reject = this.request(WEN_FUNC.rProposal);

  public setForSale = this.request(WEN_FUNC.setForSaleNft);
}
