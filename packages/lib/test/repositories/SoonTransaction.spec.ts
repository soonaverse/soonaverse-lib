import { COL, TransactionType } from "@soonaverse/model";
import { SoonTransaction } from "../../src";
import Soonaverse from "../../src/Soonaverse";
import admin, { connect, projectId } from "../setup";
import { expectThrow, uuid } from "../utils/common.utils";

const dummyTransactions = (spaceId: string) => [
  { type: TransactionType.BILL_PAYMENT, space: spaceId },
  { type: TransactionType.CREDIT, space: spaceId },
  { type: TransactionType.PAYMENT, space: spaceId },
  { type: TransactionType.ORDER, space: spaceId },
  { type: TransactionType.BILL_PAYMENT, space: uuid() },
];

const saveTransactions = async (trans: any[]) => {
  const promises = trans.map((t) =>
    admin.firestore().collection(COL.TRANSACTION).add(t)
  );
  await Promise.all(promises);
};

describe("Transaction test", () => {
  const spaceId = uuid();
  const trans = dummyTransactions(spaceId);
  let repo: SoonTransaction;

  beforeAll(async () => {
    connect();
    await saveTransactions(trans);
    repo = new SoonTransaction();
  });

  it("Should get transactions", async () => {
    const result = await repo.getPaymentTransactionsBySpace(spaceId);
    expect(result.length).toBe(3);
  });

  it("Should get valid payment", async () => {
    let validPayment = false;
    repo.onValidPayment().subscribe((payment) => {
      validPayment = payment.length > 0;
    });
    await admin
      .firestore()
      .collection(COL.TRANSACTION)
      .add({
        type: TransactionType.PAYMENT,
        space: spaceId,
        payload: { invalidPayment: false },
      });
    while (!validPayment) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    expect(validPayment).toBe(true);
  });
});

describe("Transaction lite test", () => {
  const spaceId = uuid();
  const trans = dummyTransactions(spaceId);
  let repo: SoonTransaction;

  beforeAll(async () => {
    connect(true);
    await saveTransactions(trans);
    repo = new SoonTransaction();
  });

  it("Should get transactions", async () => {
    const result = await repo.getPaymentTransactionsBySpace(spaceId);
    expect(result.length).toBe(3);
  });

  it("Should throw, lite mode", async () => {
    const call = async () => {
      repo.onValidPayment();
    };
    await expectThrow(call(), "Realtime is not supported in lite mode.");
    Soonaverse.connect(false, "", projectId);
  });
});
