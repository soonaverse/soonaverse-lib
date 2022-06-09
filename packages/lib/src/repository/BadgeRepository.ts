import { Badge, COL } from "@soonaverse/model";
import { FirestoreCrudRepository } from "../firestore/FirestoreCrudRepository";

export class SoonBadgeRepository extends FirestoreCrudRepository<Badge> {
  constructor() {
    super(COL.BADGES);
  }
}
