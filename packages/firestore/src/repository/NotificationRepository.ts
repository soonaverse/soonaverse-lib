import { COL, Notification } from '@soonaverse/model';
import { FirebaseApp } from 'firebase/app';
import { CrudRepository } from './CrudRepository';

export class SoonNotificationRepository extends CrudRepository<Notification> {
  constructor(app: FirebaseApp, lite = false) {
    super(app, COL.NOTIFICATION, lite);
  }
}
