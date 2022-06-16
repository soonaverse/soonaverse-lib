import detectEthereumProvider from "@metamask/detect-provider";
import { API_KEY, PROJECT_ID } from "@soonaverse/credentials";
import { Member, WenRequest } from "@soonaverse/model";
import { initializeApp } from "firebase/app";
import { Functions, getFunctions, httpsCallable } from "firebase/functions";

export const METAMASK_CHAIN_ID = "0x432";
export const RPC_CHAIN = {
  chainId: METAMASK_CHAIN_ID,
  chainName: "IOTA EVM",
  nativeCurrency: {
    name: "IOTA",
    symbol: "IOTA",
    decimals: 18,
  },
  rpcUrls: ["https://evm.wasp.sc.iota.org/"],
  // blockExplorerUrls?: string[];
  // iconUrls?: string[]; // Currently ignored.
};

export class SoonAuth {
  private readonly functions: Functions;

  constructor(apiKey = API_KEY, projectId = PROJECT_ID) {
    const app = initializeApp({
      apiKey,
      databaseURL: `https://${projectId}.firebaseio.com`,
      projectId,
      storageBucket: `${projectId}.appspot.com`,
    });
    this.functions = getFunctions(app);
  }

  public async signWithMetamask(params: any = {}): Promise<WenRequest> {
    const provider: any = await detectEthereumProvider();
    if (!provider) {
      throw new Error("Could not detect ethereum provider");
    }
    try {
      const isUnlocked = await provider._metamask.isUnlocked();
      if (!isUnlocked) {
        throw new Error("You must unlock your MetaMask first!");
      }
      try {
        await provider.request({
          method: "eth_requestAccounts",
          params: [{ eth_accounts: {} }],
        });
      } catch {
        throw new Error("You must enable access to read your account address.");
      }

      if (provider.chainId !== METAMASK_CHAIN_ID) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [RPC_CHAIN],
          });
        } catch (e) {
          throw new Error("Wrong chain");
        }
      }

      if (!provider.selectedAddress) {
        throw new Error(`Please make sure you select address in MetaMask!`);
      }

      const member = await this.createMemberIfNotExists(
        provider.selectedAddress
      );
      if (!member) {
        throw new Error("Unable to get nonce to authenticate!");
      }

      const signature: string = await provider.request({
        method: "personal_sign",
        params: [`0x${this.toHex(member.nonce!)}`, provider.selectedAddress],
      });

      return {
        address: provider.selectedAddress,
        signature: signature,
        body: params,
      };
    } catch {
      throw new Error("Hidden wallet");
    }
  }

  public async stopMetamaskListeners(
    callback: (accounts: string[]) => void
  ): Promise<void> {
    const provider: any = await detectEthereumProvider();
    if (provider) {
      provider.removeListener("accountsChanged", callback.bind(this));
    }
  }

  public async listenToAccountChange(
    callback: (accounts: string[]) => void
  ): Promise<void> {
    const provider: any = await detectEthereumProvider();
    if (provider) {
      this.stopMetamaskListeners(callback);
      provider.on("accountsChanged", callback.bind(this));
    }
  }

  private createMemberIfNotExists = async (
    address: string
  ): Promise<Member | undefined> =>
    <Member | undefined>(
      (await httpsCallable(this.functions, "cMemberNotExists")(address)).data
    );

  private toHex = (stringToConvert: string) =>
    stringToConvert
      .split("")
      .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("");
}
