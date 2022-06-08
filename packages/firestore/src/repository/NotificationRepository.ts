import { COL, Notification } from "@soonaverse/model";
import { CrudRepository } from "./CrudRepository";

export class SoonNotificationRepository extends CrudRepository<Notification> {
  constructor() {
    super(COL.NOTIFICATION);
  }
}
