import { Observable } from 'rxjs';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, doc, 
         DocumentData, CollectionReference, query, where, onSnapshot, 
         Firestore, limit } from 'firebase/firestore';

import { getFirestore as getFirestoreLite, collection as collectionLite, getDocs as getDocsLite, getDoc as getDocLite, doc as docLite, 
         query as queryLite, where as whereLite,
         limit as limitLite} from 'firebase/firestore/lite';

import { Collection, Transaction, TransactionType } from './interfaces/models';
import { COL } from './interfaces/models/base';
import { Nft } from './interfaces/models/nft';
import { Member } from './interfaces/models/member';

/**
 * Public class to interact with Soonaverse.
 */
export class Soon {
  public static app: FirebaseApp;
  public static restMode: boolean = false;

  // Firebase functions changed on the mode.
  private _getFirestore = getFirestore;
  private _collection = collection;
  private _getDocs: any = getDocs;
  private _getDoc: any = getDoc;
  private _doc = doc;
  private _query = query;
  private _where = where;
  private _onSnapshot: any = onSnapshot;
  private _limit = limit;

  /**
   * We connect to soonaverse as part of the contract. We only create one connection.
   */
  constructor(enableRest: boolean = false) {
    if (enableRest === false && Soon.restMode === true) {
      console.error('You have to refresh your browser to change into the rest mode.')
    } else if (enableRest) {
      Soon.restMode = true;
    }

    if (Soon.restMode) {
      this._getFirestore = getFirestoreLite;
      this._collection = collectionLite;
      this._getDocs = getDocsLite;
      this._getDoc = getDocLite;
      this._doc = docLite;
      this._query = queryLite;
      this._where = whereLite;
      this._onSnapshot = undefined;
      this._limit = limitLite;
    }

    if (!Soon.app) {
      Soon.app = initializeApp({
        apiKey: "AIzaSyB4fcG8rtNWAiAtSmxmK3q3JLfMvtNCGP4",
        projectId: "soonaverse"
      });
    }
  }

  private collectionRef(): CollectionReference<DocumentData> {
    return this._collection(this.db(), COL.COLLECTION);
  }

  private memberRef(): CollectionReference<DocumentData> {
    return this._collection(this.db(), COL.MEMBER);
  }

  private nftRef(): CollectionReference<DocumentData> {
    return this._collection(this.db(), COL.NFT);
  }

  private transactionRef(): CollectionReference<DocumentData> {
    return this._collection(this.db(), COL.TRANSACTION);
  }

  /**
   * Get current NFT record.
   * 
   * @returns Nft
   */
  public async getNft(nftId: string): Promise<Nft> {
    const nftDoc = this._doc(this.nftRef(), nftId.toLowerCase());
    const nftSnapshot = await this._getDoc(nftDoc);
    return <Nft>nftSnapshot.data();
  }

  /**
   * Get all NFTs for the given collection ids.
   * 
   * @returns Collection
   */
   public async getNftsByCollections(collectionIds: string[]): Promise<Nft[]> {
    if (collectionIds.length > 10) {
      throw new Error('Max 10 collections can be queried at once.');
    }

    const nftDoc = this._query(this.nftRef(), this._where("hidden", "==", false), this._where('collection', 'in', collectionIds));
    const nftSnapshot = await this._getDocs(nftDoc);
    const nftList = <Nft[]>nftSnapshot.docs.map((doc: any) => {
      return doc.data();
    });
    return nftList;
  }

  /**
   * Get ranking for the given collection ids.
   * 
   * @returns Collection
   */
   public async getRankingByCollections(collectionIds: string[], top: number): Promise<any> {
    if (collectionIds.length > 10) {
      throw new Error('Max 10 collections can be queried at once.');
    }

    const nftDoc = this._query(this.nftRef(), this._where("hidden", "==", false), this._where('collection', 'in', collectionIds));
    const nftSnapshot = await this._getDocs(nftDoc);
    const nftList = <Nft[]>nftSnapshot.docs.map((doc: any) => {
      return doc.data();
    });

    let ranking = nftList.reduce((accumulator, { owner }) => {
      const uid = owner || '';

      if (accumulator.find(record => record.uid === owner) === undefined) {
        accumulator.push({ uid, count: 0, rank: undefined });
      }

      let record = accumulator.find(record => record.uid === owner);

      if (record !== undefined) {
        record.count++;
      }

      return accumulator;
    }, Array<{ count: number; uid: string; rank?: number; }> ());

    ranking = ranking.sort((a, b) => b.count - a.count).slice(0, top);

    const memberUidChunks = ranking.reduce((accumulator, { uid }, currentIndex) => {
      const index = Math.floor(currentIndex / 10);

      accumulator[index] = accumulator[index] || [];
      accumulator[index].push(uid);

      return accumulator;
    }, Array<Array<string>> ());
    
    let members:any[] = new Array();

    await Promise.all(memberUidChunks.map(async (uid) => {
      const memberDoc = this._query(this.memberRef(), this._where('uid', 'in', uid));
      const memberSnapshot = await this._getDocs(memberDoc);
      const memberList = <Member[]>memberSnapshot.docs.map((doc: any) => {
        return doc.data();
      });

      memberList.forEach(member => {
        members.push({ uid: member.uid, member: member.name });
      });
    }));

    members.forEach(member => {
      Object.assign(ranking.find((ranking) => ranking.uid === member.uid), member);
    });

    ranking.forEach((record, index) =>  {
      record.rank = index + 1;
    });

    return ranking;
  }

  /**
   * Get current Collection record.
   * 
   * @returns Collection
   */
  public async getCollection(collection: string): Promise<Collection> {
    const collectionDoc = this._doc(this.collectionRef(), collection.toLowerCase());
    const collectionSnapshot = await this._getDoc(collectionDoc);
    return <Collection>collectionSnapshot.data();
  }
         
  /**
   * Get Users for the given list of ethaddresses.
   * 
   * @param ethAddresses string[] eth Addresses to search.
   *
   * @returns string[]
   */
  public async getMemberByIds(ethAddresses: string[]): Promise<Member[]> {
    if (ethAddresses.length > 10) {
      throw new Error('Max 10 addresses can be queried at once.');
    }

    const memberDoc = this._query(this.memberRef(), this._where('uid', 'in', ethAddresses));
    const memberSnapshot = await this._getDocs(memberDoc);
    const memberList = <Member[]>memberSnapshot.docs.map((doc: any) => {
      return doc.data();
    });
    return memberList;
  }

  /**
   * Get all NFTs owned by ETH address
   * 
   * @returns Nft[] Array of all nfts.
   */
  public async getNftsByEthAddress(ethAddress: string): Promise<Nft[]> {
    const q = this._query(this.nftRef(), this._where('hidden', '==', false), this._where('owner', '==', ethAddress.toLowerCase()));
    const nftSnapshot = await this._getDocs(q);
    const nftList = <Nft[]>nftSnapshot.docs.map((doc: any) => {
      return doc.data();
    });
    return nftList;
  }

  /**
   * Listen to changes on a particular NFT
   * 
   * @return Nft Latest NFT record.
   */
  public onNft(nftId: string): Observable<Nft|undefined> {
    if (!this._onSnapshot) {
      throw new Error('Real-time is not supported in restlet mode.')
    }

    return new Observable((observe) => {
      const unsub = this._onSnapshot(this._doc(this.nftRef(), nftId.toLowerCase()), { includeMetadataChanges: true }, (o: any) => {
        observe.next(<Nft|undefined>o.data());
      });

      // Provide a way of canceling and disposing the interval resource
      return function unsubscribe() {
        unsub();
      };
    });
  }

  /**
   * Listen to changes on a particular Collection
   * 
   * @return Collection Latest Collection record.
   */
  public onCollection(collectionId: string): Observable<Collection|undefined> {
    if (!this._onSnapshot) {
      throw new Error('Realtime is not supported in restlet mode.')
    }

    return new Observable((observe) => {
      const unsub = this._onSnapshot(this._doc(this.nftRef(), collectionId.toLowerCase()), { includeMetadataChanges: true }, (o: any) => {
        observe.next(<Collection|undefined>o.data());
      });

      // Provide a way of canceling and disposing the interval resource
      return function unsubscribe() {
        unsub();
      };
    });
  }

  /**
   * Listen to all new payments on Soonaverse
   * 
   * @return Nft Latest NFT record.
   */
  public onValidPayment(): Observable<Transaction[]> {
    if (!this._onSnapshot) {
      throw new Error('Realtime is not supported in restlet mode.')
    }

    return new Observable((observe) => {
      const q = this._query(
        this.transactionRef(),
        this._where('type', '==', TransactionType.PAYMENT),
        this._where('payload.invalidPayment', '==', false),
        this._limit(1)
      );

      const unsub = this._onSnapshot(q, { includeMetadataChanges: true }, (nftSnapshot: any) => {
        observe.next(<Transaction[]>nftSnapshot.docs.map((doc: any) => {
          return doc.data();
        }));
      });

      // Provide a way of canceling and disposing the interval resource
      return function unsubscribe() {
        unsub();
      };
    });
  }


  /**
   * Get all NFTs owned by IOTA address
   * 
   * @param iotaAddresses string[] Iota Addresses to search. Max 10 addresses.
   * 
   * @returns Nft[] Array of all nfts.
   */
  public async getNftsByIotaAddress(iotaAddresses: string[]): Promise<Nft[]> {
    if (iotaAddresses.length > 10) {
      throw new Error('Max 10 addresses can be queried at once.');
    }

    // Make them all lower case.
    iotaAddresses = iotaAddresses.map((i) => {
      return i.toLowerCase();
    });

    const nftList: Nft[] = [];
    const q = this._query(
      this.transactionRef(), 
      this._where('payload.sourceAddress', 'in', iotaAddresses),
      this._where('type', '==', TransactionType.PAYMENT),
      this._where('payload.invalidPayment', '==', false)
    );
    const paymentSnapshot = await this._getDocs(q);
    for (const pay of paymentSnapshot.docs) {
        if (pay.data().payload.nft && pay.data().member) {
        const nftDoc = this._doc(this.nftRef(), pay.data().payload.nft);
        const nftSnapshot = await this._getDoc(nftDoc);
        // Still owner.
        if (nftSnapshot.data()?.owner === pay.data().member) {
          nftList.push(<Nft>nftSnapshot.data());
        }
      }
    }

    return nftList;
  }

  /**
   * Get all transactions for the given space
   * 
   * @returns space
   */
  public async getSpaceTransactions(spaceId: string): Promise<Transaction[]> {
    const tranDoc = this._query(this.transactionRef(), this._where("type", "in", [
      TransactionType.CREDIT,
      TransactionType.PAYMENT,
      TransactionType.BILL_PAYMENT
    ]), this._where('space', '==', spaceId));
    const tranSnapshot = await this._getDocs(tranDoc);
    const tranList = <Transaction[]>tranSnapshot.docs.map((doc: any) => {
      return doc.data();
    });

    return tranList;
  }

  private db(): Firestore {
    return this._getFirestore(Soon.app);
  }
}
