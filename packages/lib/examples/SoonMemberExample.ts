import { SoonMember } from "../src";
import Soonaverse from "../src/Soonaverse";

export class SoonMemberExample {
  public main = () => {
    // Do this once
    Soonaverse.connect();

    const memberRepo = new SoonMember();

    // Get a member by id
    const member = memberRepo.getById("myMemberId");
    console.log(member);

    // Get all members
    const members = memberRepo.getAll();
    console.log(members);

    // Get a member by name or any field
    const jack = memberRepo.getByField("name", "Jack Black");
    console.log(jack);

    // Get multiple members by id
    const membersByIds = memberRepo.getManyById(["member1Id", "member2Id"]);
    console.log(membersByIds);

    // Listen to changes on a member
    memberRepo
      .onChange("memberId")
      .subscribe((member) => console.log("Member changed", member));
  };
}
