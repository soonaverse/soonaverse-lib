import { API_KEY, PROJECT_ID } from "@soonaverse/credentials";
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { getFirestore as getFirestoreLite } from "firebase/firestore/lite";

class Config {
  private db: Firestore | undefined;
  private lite = false;

  public connect = (lite = false, apiKey = API_KEY, projectId = PROJECT_ID) => {
    if (this.db) {
      return;
    }
    const app = initializeApp({ apiKey, projectId });
    this.db = lite ? getFirestoreLite(app) : getFirestore(app);
    this.lite = lite;
  };

  public getFirestoreConnection = () => this.db!;

  public isLiteMode = () => this.lite;
}

export default new Config();
