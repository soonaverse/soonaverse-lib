import { COL } from "@soonaverse/model";
import { SoonMemberRepository } from "../../src/repository/MemberRepository";
import Soonaverse from "../../src/Soonaverse";
import admin, { projectId } from "../setup";
import { expectThrow, uuid } from "../utils/common.utils";

describe("Crud repository test", () => {
  const repo = new SoonMemberRepository();
  let members: string[];
  const users = [
    { name: "user1", space: uuid(), member: uuid() },
    { name: "user2", space: uuid(), member: uuid() },
  ];

  beforeAll(async () => {
    expect(Soonaverse.isLiteMode()).toBe(false);
    const promises = users.map((user) =>
      admin.firestore().collection(COL.MEMBER).add(user)
    );
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

  it("Should get by space", async () => {
    const docs = await repo.getBySpace(users[0].space);
    expect(docs.length).toBe(1);
    expect(docs[0]?.name).toBe("user1");
  });

  it("Should get by member", async () => {
    const docs = await repo.getByMember(users[1].member);
    expect(docs.length).toBe(1);
    expect(docs[0]?.name).toBe("user2");
  });

  it("Should get all", async () => {
    const batch1 = await repo.getAll();
    const batch2 = await repo.getAll(batch1[batch1.length - 1]);
    // Will fail if dev db is cleared
    expect(batch1.length).toBe(50);
    expect(batch2.length).toBe(50);

    const all = await repo.getAll(undefined, 100);
    expect([...batch1, ...batch2]).toEqual(all);
  });

  it("Should throw, max 100 limit", async () => {
    await expectThrow(
      repo.getAll(undefined, 200),
      "Max 100 documents can be queried at once."
    );
  });

  it("Should get by member", async () => {
    let updateName = "user1update";
    let name = "";
    repo.onChange(members[0]).subscribe((member) => {
      name = member?.name || "";
    });
    await admin
      .firestore()
      .doc(`${COL.MEMBER}/${members[0]}`)
      .update({ name: updateName });
    while (name !== updateName) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    expect(name).toBe(updateName);
  });

  it("Should throw, lite mode", async () => {
    Soonaverse.connect(true, "", projectId);
    expect(Soonaverse.isLiteMode()).toBe(true);
    const liteRepo = new SoonMemberRepository();
    const call = async () => {
      liteRepo.onChange(members[0]);
    };
    await expectThrow(call(), "Realtime is not supported in lite mode.");
    Soonaverse.connect(false, "", projectId);
  });
});
