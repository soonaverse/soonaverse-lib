import { Badge, COL } from '@soonaverse/model';
import { FirebaseApp } from 'firebase/app';
import { CrudRepository } from './CrudRepository';

export class SoonBadgeRepository extends CrudRepository<Badge> {
  constructor(app: FirebaseApp, lite = false) {
    super(app, COL.BADGES, lite);
  }
}
