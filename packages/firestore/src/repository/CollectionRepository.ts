import { COL, Collection } from '@soonaverse/model';
import { FirebaseApp } from 'firebase/app';
import { CrudRepository } from './CrudRepository';

export class SoonCollectionRepository extends CrudRepository<Collection> {
  constructor(app: FirebaseApp, lite = false) {
    super(app, COL.COLLECTION, lite);
  }
}
