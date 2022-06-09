import { callFirebaseFunction, WEN_FUNC } from "../functions/FirebaseFunctions";

export class SoonAddress {
  public validateAddress = callFirebaseFunction(WEN_FUNC.validateAddress);
}
