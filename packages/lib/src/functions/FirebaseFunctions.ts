import { WenRequest } from "@soonaverse/model";
import { httpsCallable } from "firebase/functions";
import Soonaverse from "../Soonaverse";

export const enum WEN_FUNC {
  // Member functions.
  cMemberNotExists = "cMemberNotExists",
  uMember = "uMember",

  // Space functions.
  cSpace = "cSpace",
  uSpace = "uSpace",
  joinSpace = "joinSpace",
  leaveSpace = "leaveSpace",
  blockMemberSpace = "blockMemberSpace",
  unblockMemberSpace = "unblockMemberSpace",
  acceptMemberSpace = "acceptMemberSpace",
  declineMemberSpace = "declineMemberSpace",
  addGuardianSpace = "addGuardianSpace",
  removeGuardianSpace = "removeGuardianSpace",
  setAlliance = "setAlliance",

  // Award functions
  cAward = "cAward",
  aAward = "aAward",
  rAward = "rAward",
  addOwnerAward = "addOwnerAward",
  participateAward = "participateAward",
  aParticipantAward = "aParticipantAward", // Approve.

  //Proposal
  cProposal = "cProposal",
  aProposal = "aProposal", // Approve
  rProposal = "rProposal", // Reject
  voteOnProposal = "voteOnProposal",

  // Collection functions.
  cCollection = "cCollection",
  uCollection = "uCollection",
  approveCollection = "approveCollection",
  rejectCollection = "rejectCollection",
  collectionWrite = "collectionWrite",

  // NFT functions.
  cNft = "cNft",
  cBatchNft = "cBatchNft",
  setForSaleNft = "setForSaleNft",

  // ORDER functions.
  orderNft = "orderNft",
  openBid = "openBid",
  validateAddress = "validateAddress",

  // TOKEN functions
  cToken = "cToken",
  uToken = "uToken",
  setTokenAvailableForSale = "setTokenAvailableForSale",
  cancelPublicSale = "cancelPublicSale",
  orderToken = "orderToken",
  creditToken = "creditToken",
  airdropToken = "airdropToken",
  claimAirdroppedToken = "claimAirdroppedToken",
  sellToken = "sellToken",
  buyToken = "buyToken",
  cancelBuyOrSell = "cancelBuyOrSell",
  onTokenStatusUpdate = "onTokenStatusUpdate",
  onTokenBuySellCreated = "onTokenBuySellCreated",
  onTokenPurchaseCreated = "onTokenPurchaseCreated",

  milestoneTransactionWrite = "milestoneTransactionWrite",
  nftWrite = "nftWrite",
  transactionWrite = "transactionWrite",
}

export const callFirebaseFunction =
  (func: WEN_FUNC) =>
  async <Res>(req: WenRequest) => {
    const connection = Soonaverse.getFunctionsConnection();
    if (!connection) {
      throw new Error(
        "Soonaverse is not connected. Please call Soonaverse.connect."
      );
    }
    const callable = httpsCallable<WenRequest, Res>(connection, func);
    const response = await callable(req);
    return response.data;
  };
