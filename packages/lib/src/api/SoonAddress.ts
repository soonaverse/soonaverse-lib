import { Transaction } from "@soonaverse/model";
import { callFirebaseFunction, WEN_FUNC } from "../functions/FirebaseFunctions";

export class SoonAddress {
  public validateAddress = callFirebaseFunction<Transaction | undefined>(
    WEN_FUNC.validateAddress
  );
}
