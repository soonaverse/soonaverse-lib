import { SoonMember, SoonSpace } from "../src";
import Soonaverse from "../src/Soonaverse";

export class SoonSpaceExample {
  public main = () => {
    // Do this once
    Soonaverse.connect();

    const repo = new SoonSpace();

    // Get all guardians within a space
    const guardians = repo.getGuardians('myspace')
    console.log(guardians);

    // Get all members within a space
    const members = repo.getMembers('myspace');
    console.log(members);

  };
}
