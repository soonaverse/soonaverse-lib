import { COL, Notification } from "@soonaverse/model";
import { FirestoreCrudRepository } from "../firestore/FirestoreCrudRepository";

export class SoonNotification extends FirestoreCrudRepository<Notification> {
  constructor() {
    super(COL.NOTIFICATION);
  }
}
