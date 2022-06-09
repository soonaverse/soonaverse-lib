import { COL, Member } from "@soonaverse/model";
import { FirestoreCrudRepository } from "../firestore/FirestoreCrudRepository";
import { callFirebaseFunction, WEN_FUNC } from "../functions/FirebaseFunctions";

export class SoonMember extends FirestoreCrudRepository<Member> {
  constructor() {
    super(COL.MEMBER);
  }

  public create = callFirebaseFunction<Member | undefined, string>(
    WEN_FUNC.cMemberNotExists
  );

  public update = callFirebaseFunction<Member | undefined>(WEN_FUNC.uMember);
}
