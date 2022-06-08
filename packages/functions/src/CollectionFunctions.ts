import { Proposal } from '@soonaverse/model';
import { AbstractFunctions, WEN_FUNC } from './AbstractFunctions';

export class SoonCollectionFunctions extends AbstractFunctions<Proposal> {
  public create = this.request(WEN_FUNC.cCollection);

  public update = this.request(WEN_FUNC.uCollection);

  public approve = this.request(WEN_FUNC.approveCollection);

  public reject = this.request(WEN_FUNC.rejectCollection);
}
