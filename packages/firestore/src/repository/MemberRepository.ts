import { COL, Member } from "@soonaverse/model";
import { CrudRepository } from "./CrudRepository";

export class SoonMemberRepository extends CrudRepository<Member> {
  constructor() {
    super(COL.MEMBER);
  }
}
