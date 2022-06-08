import { Member } from '@soonaverse/model';
import { AbstractFunctions, WEN_FUNC } from './AbstractFunctions';

export class SoonSpaceFunctions extends AbstractFunctions<Member> {
  public create = this.request(WEN_FUNC.cSpace);

  public update = this.request(WEN_FUNC.uSpace);

  public join = this.request(WEN_FUNC.joinSpace);

  public leave = this.request(WEN_FUNC.leaveSpace);

  public blockMember = this.request(WEN_FUNC.blockMemberSpace);

  public unblockMember = this.request(WEN_FUNC.unblockMemberSpace);

  public acceptMember = this.request(WEN_FUNC.acceptMemberSpace);

  public declineMember = this.request(WEN_FUNC.declineMemberSpace);

  public addGuardian = this.request(WEN_FUNC.addGuardianSpace);

  public removeGuardian = this.request(WEN_FUNC.removeGuardianSpace);

  public setAlliance = this.request(WEN_FUNC.setAlliance);
}
