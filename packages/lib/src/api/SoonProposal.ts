import { COL, Proposal } from "@soonaverse/model";
import { FirestoreCrudRepository } from "../firestore/FirestoreCrudRepository";
import { callFirebaseFunction, WEN_FUNC } from "../functions/FirebaseFunctions";

export class SoonProposal extends FirestoreCrudRepository<Proposal> {
  constructor() {
    super(COL.PROPOSAL);
  }

  public create = callFirebaseFunction<Proposal | undefined>(
    WEN_FUNC.cProposal
  );

  public approve = callFirebaseFunction<Proposal | undefined>(
    WEN_FUNC.aProposal
  );

  public reject = callFirebaseFunction<Proposal | undefined>(
    WEN_FUNC.rProposal
  );

  public vote = callFirebaseFunction<Proposal | undefined>(
    WEN_FUNC.voteOnProposal
  );
}
