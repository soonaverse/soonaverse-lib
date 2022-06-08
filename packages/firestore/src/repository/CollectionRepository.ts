import { COL, Collection } from "@soonaverse/model";
import { CrudRepository } from "./CrudRepository";

export class SoonCollectionRepository extends CrudRepository<Collection> {
  constructor() {
    super(COL.COLLECTION);
  }
}
