import { COL } from "@soonaverse/model";
import { SoonMemberRepository } from "../../src/repository/MemberRepository";
import admin from "../setup";

describe("Member repository test", () => {
  let repo: SoonMemberRepository;
  let members: string[];

  beforeAll(async () => {
    repo = new SoonMemberRepository();
    const promises = [
      await admin.firestore().collection(COL.MEMBER).add({ name: "user1" }),
      await admin.firestore().collection(COL.MEMBER).add({ name: "user2" }),
    ];
    members = (await Promise.all(promises)).map((d) => d!.id);
  });

  it("Should get by id", async () => {
    const member = await repo.getById(members[0]);
    expect(member?.name).toBe("user1");
  });

  it("Should get many by id", async () => {
    const docs = await repo.getManyById(members);
    expect(docs.map((d) => d.name)).toEqual(["user1", "user2"]);
  });
});
