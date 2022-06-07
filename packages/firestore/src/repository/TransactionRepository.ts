import { COL, Transaction, TransactionType } from '@soonaverse/model';
import { FirebaseApp } from 'firebase/app';
import { Observable } from 'rxjs';
import { CrudRepository } from './CrudRepository';

export class SoonTransactionRepository extends CrudRepository<Transaction> {
  constructor(app: FirebaseApp, lite = false) {
    super(app, COL.TRANSACTION, lite);
  }

  /**
   * Listen to all new payments
   *
   * @return - Latest payment transaction
   */
  public onValidPayment(): Observable<Transaction[]> {
    this.assertNotLite();

    return new Observable(observe => {
      const query = this._query(
        this.colRef(),
        this._where('type', '==', TransactionType.PAYMENT),
        this._where('payload.invalidPayment', '==', false),
        this._limit(1)
      );

      return this._onSnapshot(
        query,
        { includeMetadataChanges: true },
        snapshot => observe.next(snapshot.docs.map(d => <Transaction>d.data()))
      );
    });
  }

  /**
   * Get all transactions for the given space
   *
   * @param spaceId - Space id
   * @returns - List of transactions for the given space id
   */
  public async getBySpaceId(spaceId: string): Promise<Transaction[]> {
    const types = [
      TransactionType.CREDIT,
      TransactionType.PAYMENT,
      TransactionType.BILL_PAYMENT,
    ];
    const query = this._query(
      this.colRef(),
      this._where('type', 'in', types),
      this._where('space', '==', spaceId)
    );
    const snapshot = await this._getDocs(query);
    return snapshot.docs.map(d => <Transaction>d.data());
  }
}
