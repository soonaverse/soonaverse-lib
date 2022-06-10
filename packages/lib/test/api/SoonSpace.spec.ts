import { COL, SUB_COL } from "@soonaverse/model";
import { SoonSpace } from "../../src";
import admin, { connectSoon } from "../setup";
import { uuid } from "../utils/common.utils";

describe("Space test", () => {
  let repo: SoonSpace;
  const space = { name: "space1", uid: uuid() };
  const member = { name: "member", uid: uuid() };
  const guardian = { name: "guardian", uid: uuid() };

  beforeAll(async () => {
    connectSoon();
    repo = new SoonSpace();
    await admin.firestore().doc(`${COL.SPACE}/${space.uid}`).create(space);
    await admin
      .firestore()
      .doc(`${COL.SPACE}/${space.uid}/${SUB_COL.MEMBERS}/${member.uid}`)
      .create(member);
    await admin
      .firestore()
      .doc(`${COL.SPACE}/${space.uid}/${SUB_COL.GUARDIANS}/${guardian.uid}`)
      .create(guardian);
  });

  it("Should get members", async () => {
    const members = await repo.getMembers(space.uid);
    expect(members).toEqual([member]);
  });

  it("Should get guardians", async () => {
    const guardians = await repo.getGuardians(space.uid);
    expect(guardians).toEqual([guardian]);
  });
});
