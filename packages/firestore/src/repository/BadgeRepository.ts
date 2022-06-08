import { Badge, COL } from "@soonaverse/model";
import { CrudRepository } from "./CrudRepository";

export class SoonBadgeRepository extends CrudRepository<Badge> {
  constructor() {
    super(COL.BADGES);
  }
}
