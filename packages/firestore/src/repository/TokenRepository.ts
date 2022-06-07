import { COL, Token } from '@soonaverse/model';
import { FirebaseApp } from 'firebase/app';
import { CrudRepository } from './CrudRepository';

export class SoonTokenRepositoryRepository extends CrudRepository<Token> {
  constructor(app: FirebaseApp, lite = false) {
    super(app, COL.SPACE, lite);
  }
}
