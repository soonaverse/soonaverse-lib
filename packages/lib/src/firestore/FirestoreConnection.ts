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
import Soonaverse from "../Soonaverse";

export abstract class FirestoreConnection {
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

  constructor() {
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
}

export const assertNotLite = () => {
  if (Soonaverse.isLiteMode()) {
    throw new Error("Realtime is not supported in lite mode.");
  }
};

export const assertMaxLength = <A>(array: A[], maxLength = 10) => {
  if (array.length > maxLength) {
    throw new Error(`Max ${maxLength} documents can be queried at once.`);
  }
};
