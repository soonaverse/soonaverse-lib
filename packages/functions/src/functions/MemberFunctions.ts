import { Member } from '@soonaverse/model';
import { AbstractFunctions, WEN_FUNC } from './AbstractFunctions';

export class SoonMemberFunctions extends AbstractFunctions<Member> {
  public create = this.request(WEN_FUNC.cMemberNotExists);

  public update = this.request(WEN_FUNC.uMember);
}
