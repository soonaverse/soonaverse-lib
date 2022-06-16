import { COL, SUB_COL, TokenDistribution } from "@soonaverse/model";
import { FirestoreSubColCrudRepository } from "../firestore/FirestoreSubColCrudRepository";

export class SoonTokenDistribution extends FirestoreSubColCrudRepository<TokenDistribution> {
  constructor() {
    super(COL.TOKEN, SUB_COL.DISTRIBUTION);
  }
}
