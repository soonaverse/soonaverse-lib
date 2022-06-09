import { COL, Transaction, TransactionType } from "@soonaverse/model";
import { Observable } from "rxjs";
import { FirestoreCrudRepository } from "../firestore/FirestoreCrudRepository";

export class SoonTransaction extends FirestoreCrudRepository<Transaction> {
  constructor() {
    super(COL.TRANSACTION);
  }

  /**
   * Listen to all new payments
   *
   * @return - Latest payment transaction
   */
  public onValidPayment(): Observable<Transaction[]> {
    this.assertNotLite();

    return new Observable((observe) => {
      const query = this._query(
        this.colRef(),
        this._where("type", "==", TransactionType.PAYMENT),
        this._where("payload.invalidPayment", "==", false),
        this._orderBy("createdOn", "desc"),
        this._limit(1)
      );

      return this._onSnapshot(
        query,
        { includeMetadataChanges: true },
        (snapshot) =>
          observe.next(snapshot.docs.map((d) => <Transaction>d.data()))
      );
    });
  }

  /**
   * Get all transactions for the given space
   *
   * @param space - Space id
   * @returns - List of transactions for the given space id
   */
  public async getPaymentTransactionsBySpace(
    space: string
  ): Promise<Transaction[]> {
    const types = [
      TransactionType.CREDIT,
      TransactionType.PAYMENT,
      TransactionType.BILL_PAYMENT,
    ];
    const query = this._query(
      this.colRef(),
      this._where("type", "in", types),
      this._where("space", "==", space)
    );
    const snapshot = await this._getDocs(query);
    return snapshot.docs.map((d) => <Transaction>d.data());
  }
}
