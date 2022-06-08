import { COL, Nft, Transaction, TransactionType } from "@soonaverse/model";
import { CrudRepository } from "./CrudRepository";

export interface Record {
  count: number;
  uid: string;
  rank?: number;
}

export class SoonNftRepository extends CrudRepository<Nft> {
  constructor() {
    super(COL.NFT);
  }

  /**
   * Get all NFTs for the given collection ids.
   * @param collectionIds
   * @returns
   */
  public async getByCollections(collectionIds: string[]): Promise<Nft[]> {
    this.assertMaxLength(collectionIds);
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
  public async getByEthAddress(ethAddress: string): Promise<Nft[]> {
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
  public async getNftsByIotaAddress(iotaAddresses: string[]): Promise<Nft[]> {
    if (iotaAddresses.length > 10) {
      throw new Error("Max 10 addresses can be queried at once.");
    }
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
}
