import { COL, Collection } from "@soonaverse/model";
import { FirestoreCrudRepository } from "../firestore/FirestoreCrudRepository";
import { callFirebaseFunction, WEN_FUNC } from "../functions/FirebaseFunctions";

export class SoonCollection extends FirestoreCrudRepository<Collection> {
  constructor() {
    super(COL.COLLECTION);
  }

  public create = callFirebaseFunction<Collection | undefined>(
    WEN_FUNC.cCollection
  );

  public update = callFirebaseFunction<Collection | undefined>(
    WEN_FUNC.uCollection
  );

  public approve = callFirebaseFunction<Collection | undefined>(
    WEN_FUNC.approveCollection
  );

  public reject = callFirebaseFunction<Collection | undefined>(
    WEN_FUNC.rejectCollection
  );
}
