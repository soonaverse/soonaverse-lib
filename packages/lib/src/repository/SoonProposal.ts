import { COL, Proposal } from "@soonaverse/model";
import { FirestoreCrudRepository } from "../firestore/FirestoreCrudRepository";
import { callFirebaseFunction, WEN_FUNC } from "../functions/FirebaseFunctions";

export class SoonProposal extends FirestoreCrudRepository<Proposal> {
  constructor() {
    super(COL.PROPOSAL);
  }

  public create = callFirebaseFunction(WEN_FUNC.cProposal);

  public approve = callFirebaseFunction(WEN_FUNC.aProposal);

  public reject = callFirebaseFunction(WEN_FUNC.rProposal);

  public vote = callFirebaseFunction(WEN_FUNC.voteOnProposal);
}
