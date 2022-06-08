import { COL, Proposal } from "@soonaverse/model";
import { CrudRepository } from "./CrudRepository";

export class SoonProposalRepository extends CrudRepository<Proposal> {
  constructor() {
    super(COL.PROPOSAL);
  }
}
