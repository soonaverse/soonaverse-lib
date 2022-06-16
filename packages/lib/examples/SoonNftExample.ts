import { SoonNft } from "../src";
import Soonaverse from "../src/Soonaverse";

export class SoonSpaceExample {
  public main = () => {
    // Do this once
    Soonaverse.connect();

    const repo = new SoonNft();

    // Get nfts for the given collection ids
    const nftsByCollection = repo.getByCollections([
      "collectionId1",
      "collectionId2",
    ]);
    console.log(nftsByCollection);

    // Get nfts by owner
    const nftsByOwner = repo.getByOwner("ownerId");
    console.log(nftsByOwner);

    // Get nfts by iota addresses
    const nftByIota = repo.getByIotaAddress(["iota1", "iota2"]);
    console.log(nftByIota);
  };
}
