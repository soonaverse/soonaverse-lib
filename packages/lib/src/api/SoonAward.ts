import { Award, COL } from "@soonaverse/model";
import { FirestoreCrudRepository } from "../firestore/FirestoreCrudRepository";
import { callFirebaseFunction, WEN_FUNC } from "../functions/FirebaseFunctions";

export class SoonAward extends FirestoreCrudRepository<Award> {
  constructor() {
    super(COL.AWARD);
  }

  public create = callFirebaseFunction<Award | undefined>(WEN_FUNC.cAward);

  public participate = callFirebaseFunction<Award | undefined>(
    WEN_FUNC.participateAward
  );

  public approveParticipant = callFirebaseFunction<Award | undefined>(
    WEN_FUNC.aParticipantAward
  );

  public approve = callFirebaseFunction<Award | undefined>(WEN_FUNC.aAward);

  public reject = callFirebaseFunction<Award | undefined>(WEN_FUNC.rAward);

  public addOwnerAward = callFirebaseFunction<Award | undefined>(
    WEN_FUNC.addOwnerAward
  );
}
