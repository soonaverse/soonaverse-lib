import { COL, TransactionType } from "@soonaverse/model";
import { SoonNft } from "../../src";
import admin, { connect } from "../setup";
import { expectThrow, uuid } from "../utils/common.utils";

const dummyNfts = () => [
  {
    name: "nft1",
    collection: uuid(),
    hidden: false,
    owner: uuid(),
    uid: uuid(),
  },
  {
    name: "nft2",
    collection: uuid(),
    hidden: false,
    owner: uuid(),
    uid: uuid(),
  },
  {
    name: "nft3",
    collection: uuid(),
    hidden: false,
    owner: uuid(),
    uid: uuid(),
  },
];

const dummyPayment = (nft: any) => ({
  type: TransactionType.PAYMENT,
  member: nft.owner,
  payload: {
    sourceAddress: uuid(),
    invalidPayment: false,
    nft: nft.uid,
  },
});

describe("Nft test", () => {
  let repo: SoonNft;
  const nfts = dummyNfts();
  const payment = dummyPayment(nfts[0]);

  beforeAll(async () => {
    connect();
    repo = new SoonNft();
    const promises = nfts.map((nft) =>
      admin.firestore().doc(`${COL.NFT}/${nft.uid}`).create(nft)
    );
    await Promise.all(promises);

    await admin.firestore().collection(COL.TRANSACTION).add(payment);
  });

  it("Should get by collections", async () => {
    const result = await repo.getByCollections([
      nfts[0].collection,
      nfts[1].collection,
    ]);
    expect(result.length).toBe(2);
  });

  it("Should throw, array too long", async () => {
    await expectThrow(
      repo.getByCollections(Array.from(Array(100)).map(() => "id")),
      "Max 10 documents can be queried at once."
    );
  });

  it("Should get by owner", async () => {
    const result = await repo.getByOwner(nfts[0].owner);
    expect(result.length).toBe(1);
    expect(result[0].uid).toBe(nfts[0].uid);
  });

  it("Should get by iota address", async () => {
    const result = await repo.getByIotaAddress([payment.payload.sourceAddress]);
    expect(result.length).toBe(1);
  });

  it("Should throw, array too long", async () => {
    await expectThrow(
      repo.getByIotaAddress(Array.from(Array(100)).map(() => "id")),
      "Max 10 documents can be queried at once."
    );
  });
});
