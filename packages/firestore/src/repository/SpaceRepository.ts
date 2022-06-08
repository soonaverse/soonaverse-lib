import { COL, Member, Space, SUB_COL } from "@soonaverse/model";
import { CrudRepository } from "./CrudRepository";

export class SoonSpaceRepository extends CrudRepository<Space> {
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
}
