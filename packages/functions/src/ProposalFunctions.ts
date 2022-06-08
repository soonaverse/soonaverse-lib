import { Proposal } from '@soonaverse/model';
import { AbstractFunctions, WEN_FUNC } from './AbstractFunctions';

export class SoonProposalFunctions extends AbstractFunctions<Proposal> {
  public create = this.request(WEN_FUNC.cProposal);

  public approve = this.request(WEN_FUNC.aProposal);

  public reject = this.request(WEN_FUNC.rProposal);

  public vote = this.request(WEN_FUNC.voteOnProposal);
}
