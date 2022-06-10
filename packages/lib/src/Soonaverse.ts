import { API_KEY, PROJECT_ID } from "@soonaverse/credentials";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { getFirestore as getFirestoreLite } from "firebase/firestore/lite";
import { Functions, getFunctions } from "firebase/functions";

class Soonaverse {
  private db: Firestore | undefined;
  private functions: Functions | undefined;
  private lite = false;
  private app: FirebaseApp | undefined;

  public connect = (lite = false, apiKey = API_KEY, projectId = PROJECT_ID) => {
    this.app = initializeApp({
      apiKey,
      databaseURL: `https://${projectId}.firebaseio.com`,
      projectId,
      storageBucket: `${projectId}.appspot.com`,
    });
    this.db = lite ? getFirestoreLite(this.app!) : getFirestore(this.app!);
    this.functions = getFunctions(this.app!);
    this.lite = lite;
  };

  public getFirestoreConnection = () => this.db;

  public getFunctionsConnection = () => this.functions;

  public isLiteMode = () => this.lite;
}

export default new Soonaverse();
