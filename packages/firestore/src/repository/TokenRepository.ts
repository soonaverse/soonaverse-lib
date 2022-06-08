import { COL, Token } from "@soonaverse/model";
import { CrudRepository } from "./CrudRepository";

export class SoonTokenRepositoryRepository extends CrudRepository<Token> {
  constructor() {
    super(COL.SPACE);
  }
}
