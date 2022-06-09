import { COL, Collection } from "@soonaverse/model";
import { FirestoreCrudRepository } from "../firestore/FirestoreCrudRepository";
import { callFirebaseFunction, WEN_FUNC } from "../functions/FirebaseFunctions";

export class SoonCollection extends FirestoreCrudRepository<Collection> {
  constructor() {
    super(COL.COLLECTION);
  }

  public create = callFirebaseFunction(WEN_FUNC.cCollection);

  public update = callFirebaseFunction(WEN_FUNC.uCollection);

  public approve = callFirebaseFunction(WEN_FUNC.approveCollection);

  public reject = callFirebaseFunction(WEN_FUNC.rejectCollection);
}
