import { Award } from '@soonaverse/model';
import { AbstractFunctions, WEN_FUNC } from './AbstractFunctions';

export class SoonAwardFunctions extends AbstractFunctions<Award | undefined> {
  public create = this.request(WEN_FUNC.cAward);

  public participate = this.request(WEN_FUNC.participateAward);

  public approveParticipant = this.request(WEN_FUNC.aParticipantAward);

  public approve = this.request(WEN_FUNC.aAward);

  public reject = this.request(WEN_FUNC.rAward);

  public addOwnerAward = this.request(WEN_FUNC.addOwnerAward);
}
