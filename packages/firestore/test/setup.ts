import * as admin from "firebase-admin";
import Soonaverse from "../src/Soonaverse";
import serviceAccount from "../test-service-account-key.json";

export const projectId = "soonaverse-dev";
process.env.GCLOUD_PROJECT = projectId;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

Soonaverse.connect(false, "", projectId);

export default admin;
