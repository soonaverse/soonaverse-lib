import { COL, Member } from "@soonaverse/model";
import { FirestoreCrudRepository } from "../firestore/FirestoreCrudRepository";
import { callFirebaseFunction, WEN_FUNC } from "../functions/FirebaseFunctions";

export class SoonMember extends FirestoreCrudRepository<Member> {
  constructor() {
    super(COL.MEMBER);
  }

  public create = callFirebaseFunction(WEN_FUNC.cMemberNotExists);

  public update = callFirebaseFunction(WEN_FUNC.uMember);
}
