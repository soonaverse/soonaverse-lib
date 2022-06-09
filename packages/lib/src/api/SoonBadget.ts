import { Badge, COL } from "@soonaverse/model";
import { FirestoreCrudRepository } from "../firestore/FirestoreCrudRepository";

export class SoonBadge extends FirestoreCrudRepository<Badge> {
  constructor() {
    super(COL.BADGES);
  }
}
