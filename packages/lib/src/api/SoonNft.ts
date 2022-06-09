import { COL, Nft, Transaction, TransactionType } from "@soonaverse/model";
import { assertMaxLength } from "../firestore/FirestoreConnection";
import { FirestoreCrudRepository } from "../firestore/FirestoreCrudRepository";
import { callFirebaseFunction, WEN_FUNC } from "../functions/FirebaseFunctions";

export interface Record {
  count: number;
  uid: string;
  rank?: number;
}

export class SoonNft extends FirestoreCrudRepository<Nft> {
  constructor() {
    super(COL.NFT);
  }

  /**
   * Get all NFTs for the given collection ids.
   * @param collectionIds
   * @returns
   */
  public async getByCollections(collectionIds: string[]): Promise<Nft[]> {
    assertMaxLength(collectionIds);
    const query = this._query(
      this.colRef(),
      this._where("hidden", "==", false),
      this._where("collection", "in", collectionIds)
    );
    const snapshot = await this._getDocs(query);
    return snapshot.docs.map((d) => <Nft>d.data());
  }

  /**
   * Gets an nft for the given ETH address
   * @param ethAddress
   * @returns
   */
  public async getByOwner(ethAddress: string): Promise<Nft[]> {
    const query = this._query(
      this.colRef(),
      this._where("hidden", "==", false),
      this._where("owner", "==", ethAddress.toLowerCase())
    );
    const snapshot = await this._getDocs(query);
    return snapshot.docs.map((d) => <Nft>d.data());
  }

  /**
   * Get all NFTs owned by IOTA address
   *
   * @param iotaAddresses - Iota Addresses to search. Max 10 addresses.
   * @returns - Array of all nfts.
   */
  public async getByIotaAddress(iotaAddresses: string[]): Promise<Nft[]> {
    assertMaxLength(iotaAddresses);
    const lowerCaseAddresses = iotaAddresses.map((i) => i.toLowerCase());
    const query = this._query(
      this._collection(this.db, COL.TRANSACTION),
      this._where("payload.sourceAddress", "in", lowerCaseAddresses),
      this._where("type", "==", TransactionType.PAYMENT),
      this._where("payload.invalidPayment", "==", false)
    );
    const snapshot = await this._getDocs(query);
    const promises = snapshot.docs.map(async (doc) => {
      const payment = <Transaction>doc.data();
      if (payment.payload.nft && payment.member) {
        const docRef = this._doc(this.colRef(), payment.payload.nft);
        const nft = <Nft | undefined>(await this._getDoc(docRef)).data();
        if (nft?.owner === payment.member) {
          return nft;
        }
      }
      return undefined;
    });
    const result = await Promise.all(promises);
    return <Nft[]>result.filter((nft) => nft !== undefined);
  }

  public create = callFirebaseFunction<Nft | undefined>(WEN_FUNC.cNft);

  public createBatch = callFirebaseFunction<string[] | undefined>(
    WEN_FUNC.cBatchNft
  );

  public setForSale = callFirebaseFunction<Nft | undefined>(
    WEN_FUNC.setForSaleNft
  );

  public order = callFirebaseFunction<Transaction | undefined>(
    WEN_FUNC.orderNft
  );

  public openBid = callFirebaseFunction<Transaction | undefined>(
    WEN_FUNC.openBid
  );
}
