import { Base, COL, SUB_COL } from "@soonaverse/model";
import { Observable } from "rxjs";
import Soonaverse from "../Soonaverse";
import { assertNotLite, FirestoreConnection } from "./FirestoreConnection";

export abstract class FirestoreSubColCrudRepository<T> extends FirestoreConnection {
  constructor(protected readonly col: COL, protected readonly subCol: SUB_COL) {
    super();
  }

  protected colRef = (parentId: string) =>
    this._collection(this.db, `${this.col}/${parentId}/${this.subCol}`);

  /**
   * Gets document for the given id
   * @param parentId - Parent id
   * @param id - Id of the document
   * @returns - Document or undefined if nothing exists for the given id.
   */
  public getById = async (
    parentId: string,
    id: string
  ): Promise<T | undefined> => {
    const docRef = this._doc(
      this.db,
      `${this.col}/${parentId}/${this.subCol}/${id}`
    );
    return <T>(await this._getDoc(docRef)).data();
  };

  /**
   * Gets all documents for the given ids
   * @param parentId - Parent id
   * @param ids - Documents ids
   * @returns List of document data
   */
  public getManyById = async (
    parentId: string,
    ids: string[]
  ): Promise<T[]> => {
    const promises = ids.map((id) => this.getById(parentId, id));
    const result = await Promise.all(promises);
    return <T[]>result.filter((d) => d !== undefined);
  };

  /**
   * Listen to changes on a particular document
   * @param parentId - Parent id
   * @param id - Document id
   * @returns
   */
  public onChange = (
    parentId: string,
    id: string
  ): Observable<T | undefined> => {
    assertNotLite();
    return new Observable((observe) =>
      this._onSnapshot(
        this._doc(this.colRef(parentId), id),
        { includeMetadataChanges: true },
        (doc) => observe.next(<T | undefined>doc.data())
      )
    );
  };

  /**
   * Gets all the documents from the collection
   * @param parentId - Parent id
   * @param startAfter - Query will start after the given document
   * @param limit - Limit the number of documents return, default is 50, max is 100
   * @returns
   */
  public getAll = async <D extends Base>(
    parentId: string,
    startAfter?: D,
    limit = 50
  ) => {
    if (limit > 100) {
      throw new Error(`Max 100 documents can be queried at once.`);
    }
    let query = this._query(
      this.colRef(parentId),
      this._limit(limit),
      this._orderBy("createdOn")
    );
    if (startAfter) {
      const doc = this._doc(this.db, `${this.col}/${startAfter.uid}`);
      query = this._query(query, this._startAfter(await this._getDoc(doc)));
    }
    const snap = await this._getDocs(query);
    return snap.docs.map((d) => <T>d.data());
  };

  /**
   * Returns all documents where the given field name equals the given value
   * @param parentId - Parent id
   * @param fieldName - A valid field name
   * @param fieldValue - Any value for the given field
   * @returns
   */
  public getByField = async (parentId: string, fieldName: string, fieldValue: any) => {
    const query = this._query(
      this.colRef(parentId),
      this._where(fieldName, "==", fieldValue)
    );
    const snapshot = await this._getDocs(query);
    return snapshot.docs.map((d) => <T>d.data());
  };
}
