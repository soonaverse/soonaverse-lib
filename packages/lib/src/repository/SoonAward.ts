import { Award, COL } from "@soonaverse/model";
import { FirestoreCrudRepository } from "../firestore/FirestoreCrudRepository";
import { callFirebaseFunction, WEN_FUNC } from "../functions/FirebaseFunctions";

export class SoonAward extends FirestoreCrudRepository<Award> {
  constructor() {
    super(COL.AWARD);
  }

  public create = callFirebaseFunction(WEN_FUNC.cAward);

  public participate = callFirebaseFunction(WEN_FUNC.participateAward);

  public approveParticipant = callFirebaseFunction(WEN_FUNC.aParticipantAward);

  public approve = callFirebaseFunction(WEN_FUNC.aAward);

  public reject = callFirebaseFunction(WEN_FUNC.rAward);

  public addOwnerAward = callFirebaseFunction(WEN_FUNC.addOwnerAward);
}
