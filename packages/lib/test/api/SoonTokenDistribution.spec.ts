import { COL, SUB_COL } from "@soonaverse/model";
import { SoonTokenDistribution } from "../../src/api/SoonTokenDistribution";
import admin, { connectSoon } from "../setup";
import { uuid } from "../utils/common.utils";

describe("Token distribution test", () => {
  let repo: SoonTokenDistribution;
  const token = { name: "asd", uid: uuid() };
  const distributions = [
    { uid: uuid(), totalDeposit: 1234 },
    { uid: uuid(), totalDeposit: 567 },
    { uid: uuid(), totalDeposit: 891 },
  ];

  beforeAll(async () => {
    connectSoon();
    repo = new SoonTokenDistribution();
    await admin.firestore().doc(`${COL.TOKEN}/${token.uid}`).create(token);
    const promises = distributions.map((d) =>
      admin
        .firestore()
        .doc(`${COL.TOKEN}/${token.uid}/${SUB_COL.DISTRIBUTION}/${d.uid}`)
        .create(d)
    );
    await Promise.all(promises);
  });

  it("Should get by id", async () => {
    const dist = await repo.getById(token.uid, distributions[0].uid);
    expect(dist).toBeDefined();
  });

  it("Should get many by id", async () => {
    const result = await repo.getManyById(token.uid, [
      distributions[0].uid,
      distributions[1].uid,
    ]);
    expect(result.length).toBe(2);
  });
});
