import { COL, Notification } from "@soonaverse/model";
import { FirestoreCrudRepository } from "../firestore/FirestoreCrudRepository";

export class SoonNotificationRepository extends FirestoreCrudRepository<Notification> {
  constructor() {
    super(COL.NOTIFICATION);
  }
}
