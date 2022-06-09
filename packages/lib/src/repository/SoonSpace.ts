import { COL, Member, Space, SUB_COL } from "@soonaverse/model";
import { FirestoreCrudRepository } from "../firestore/FirestoreCrudRepository";
import { callFirebaseFunction, WEN_FUNC } from "../functions/FirebaseFunctions";

export class SoonSpace extends FirestoreCrudRepository<Space> {
  constructor() {
    super(COL.SPACE);
  }

  /**
   * Gets all the members for the given space
   * @param spaceId
   * @returns
   */
  public getMembers = async (spaceId: string) => {
    const path = `${this.col}/${spaceId}/${SUB_COL.MEMBERS}`;
    const query = this._collection(this.db, path);
    return (await this._getDocs(query)).docs.map((d) => <Member>d.data());
  };

  /**
   * Gets all the guardians for the given space
   * @param spaceId
   * @returns
   */
  public getGuardians = async (spaceId: string) => {
    const path = `${this.col}/${spaceId}/${SUB_COL.GUARDIANS}`;
    const query = this._collection(this.db, path);
    return (await this._getDocs(query)).docs.map((d) => <Member>d.data());
  };

  public create = callFirebaseFunction(WEN_FUNC.cSpace);

  public update = callFirebaseFunction(WEN_FUNC.uSpace);

  public join = callFirebaseFunction(WEN_FUNC.joinSpace);

  public leave = callFirebaseFunction(WEN_FUNC.leaveSpace);

  public blockMember = callFirebaseFunction(WEN_FUNC.blockMemberSpace);

  public unblockMember = callFirebaseFunction(WEN_FUNC.unblockMemberSpace);

  public acceptMember = callFirebaseFunction(WEN_FUNC.acceptMemberSpace);

  public declineMember = callFirebaseFunction(WEN_FUNC.declineMemberSpace);

  public addGuardian = callFirebaseFunction(WEN_FUNC.addGuardianSpace);

  public removeGuardian = callFirebaseFunction(WEN_FUNC.removeGuardianSpace);

  public setAlliance = callFirebaseFunction(WEN_FUNC.setAlliance);
}
