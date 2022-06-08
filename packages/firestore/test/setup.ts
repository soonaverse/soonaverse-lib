import * as admin from "firebase-admin";
import test from "firebase-functions-test";
import { connectFirestoreEmulator } from "firebase/firestore";
import Config from "../src/Config";

export const projectId = "soonaverse-dev";
process.env.GCLOUD_PROJECT = projectId;
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";

export const testEnv = test({ projectId });

admin.initializeApp({ projectId });

Config.connect(false, "", projectId);
connectFirestoreEmulator(Config.getFirestoreConnection(), "localhost", 8080);

export default admin;
