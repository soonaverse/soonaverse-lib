import { Award, COL } from "@soonaverse/model";
import { CrudRepository } from "./CrudRepository";

export class SoonAwardRepository extends CrudRepository<Award> {
  constructor() {
    super(COL.AWARD);
  }
}
