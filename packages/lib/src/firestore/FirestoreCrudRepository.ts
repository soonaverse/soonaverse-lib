import { Base, COL } from "@soonaverse/model";
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import {
  collection as collectionLite,
  doc as docLite,
  getDoc as getDocLite,
  getDocs as getDocsLite,
  limit as limitLite,
  orderBy as orderByLite,
  query as queryLite,
  startAfter as startAfterLite,
  where as whereLite,
} from "firebase/firestore/lite";
import { Observable } from "rxjs";
import Soonaverse from "../Soonaverse";

export abstract class FirestoreCrudRepository<T> {
  protected db: Firestore;

  protected _collection = collection;
  protected _getDocs = getDocs;
  protected _getDoc = getDoc;
  protected _doc = doc;
  protected _query = query;
  protected _where = where;
  protected _onSnapshot = onSnapshot;
  protected _limit = limit;
  protected _startAfter = startAfter;
  protected _orderBy = orderBy;

  constructor(protected readonly col: COL) {
    if (Soonaverse.isLiteMode()) {
      this._collection = collectionLite;
      this._getDocs = getDocsLite as any;
      this._getDoc = getDocLite as any;
      this._doc = docLite;
      this._query = queryLite;
      this._where = whereLite;
      this._onSnapshot = undefined as any;
      this._limit = limitLite;
      this._startAfter = startAfterLite;
      this._orderBy = orderByLite;
    }
    const connection = Soonaverse.getFirestoreConnection();
    if (!connection) {
      throw new Error(
        "Soonaverse is not connected. Please call Soonaverse.connect."
      );
    }
    this.db = connection;
  }

  protected colRef = () => this._collection(this.db, this.col);

  /**
   * Gets document for the given id
   * @param id - Id of the document
   * @returns - Document or undefined if nothing exists for the given id.
   */
  public getById = async (id: string): Promise<T | undefined> => {
    const docRef = this._doc(this.db, `${this.col}/${id}`);
    return <T>(await this._getDoc(docRef)).data();
  };

  /**
   * Gets all documents for the given ids
   * @param ids - Documents ids
   * @returns List of document data
   */
  public getManyById = async (ids: string[]): Promise<T[]> => {
    const promises = ids.map(this.getById);
    const result = await Promise.all(promises);
    return <T[]>result.filter((d) => d !== undefined);
  };

  /**
   * Listen to changes on a particular document
   * @param id - Document id
   * @returns
   */
  public onChange = (id: string): Observable<T | undefined> => {
    this.assertNotLite();
    return new Observable((observe) =>
      this._onSnapshot(
        this._doc(this.colRef(), id),
        { includeMetadataChanges: true },
        (doc) => observe.next(<T | undefined>doc.data())
      )
    );
  };

  /**
   * Gets all the documents for the given space
   * @param space - The id of the space
   * @returns
   */
  public getBySpace = async (space: string) => this.getByField("space", space);

  /**
   * Gets all the documents for the given member
   * @param member - The id of the member
   * @returns
   */
  public getByMember = async (member: string) =>
    this.getByField("member", member);

  /**
   * Gets all the documents from the collection
   * @param startAfter - Query will start after the given document
   * @param limit - Limit the number of documents return, default is 50, max is 100
   * @returns
   */
  public getAll = async <D extends Base>(startAfter?: D, limit = 50) => {
    if (limit > 100) {
      throw new Error(`Max 100 documents can be queried at once.`);
    }
    let query = this._query(
      this.colRef(),
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
   * @param fieldName - A valid field name
   * @param fieldValue - Any value for the given field
   * @returns
   */
  public getByField = async (fieldName: string, fieldValue: any) => {
    const query = this._query(
      this.colRef(),
      this._where(fieldName, "==", fieldValue)
    );
    const snapshot = await this._getDocs(query);
    return snapshot.docs.map((d) => <T>d.data());
  };

  protected assertNotLite = () => {
    if (Soonaverse.isLiteMode()) {
      throw new Error("Realtime is not supported in lite mode.");
    }
  };

  protected assertMaxLength = <A>(array: A[], maxLength = 10) => {
    if (array.length > maxLength) {
      throw new Error(`Max ${maxLength} documents can be queried at once.`);
    }
  };
}
