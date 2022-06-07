import { Award, COL } from '@soonaverse/model';
import { FirebaseApp } from 'firebase/app';
import { CrudRepository } from './CrudRepository';

export class SoonAwardRepository extends CrudRepository<Award> {
  constructor(app: FirebaseApp, lite = false) {
    super(app, COL.AWARD, lite);
  }
}
