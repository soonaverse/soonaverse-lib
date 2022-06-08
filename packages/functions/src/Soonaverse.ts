import { API_KEY, PROJECT_ID } from "@soonaverse/credentials";
import { initializeApp } from "firebase/app";
import { Functions, getFunctions } from "firebase/functions";

class Soonaverse {
  private functions: Functions | undefined;

  public connect = (apiKey = API_KEY, projectId = PROJECT_ID) => {
    if (this.functions) {
      return;
    }
    const app = initializeApp({ apiKey, projectId });
    this.functions = getFunctions(app);
  };

  public getFunctionsConnection = () => this.functions!;
}

export default new Soonaverse();
