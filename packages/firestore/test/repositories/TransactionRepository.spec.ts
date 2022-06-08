import { COL, TransactionType } from "@soonaverse/model";
import { SoonTransactionRepository } from "../../src";
import Soonaverse from "../../src/Soonaverse";
import admin, { projectId } from "../setup";
import { expectThrow, uuid } from "../utils/common.utils";

describe("Crud repository test", () => {
  const repo = new SoonTransactionRepository();
  let spaceId = uuid();

  const transactions = [
    { type: TransactionType.BILL_PAYMENT, space: spaceId },
    { type: TransactionType.CREDIT, space: spaceId },
    { type: TransactionType.PAYMENT, space: spaceId },
    { type: TransactionType.ORDER, space: spaceId },
    { type: TransactionType.BILL_PAYMENT, space: uuid() },
  ];

  beforeAll(async () => {
    const promises = transactions.map((t) =>
      admin.firestore().collection(COL.TRANSACTION).add(t)
    );
    await Promise.all(promises);
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

  it("Should throw, lite mode", async () => {
    Soonaverse.connect(true, "", projectId);
    expect(Soonaverse.isLiteMode()).toBe(true);
    const liteRepo = new SoonTransactionRepository();
    const call = async () => {
      liteRepo.onValidPayment();
    };
    await expectThrow(call(), "Realtime is not supported in lite mode.");
    Soonaverse.connect(false, "", projectId);
  });
});
