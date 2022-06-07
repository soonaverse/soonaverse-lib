import { COL, Proposal } from '@soonaverse/model';
import { FirebaseApp } from 'firebase/app';
import { CrudRepository } from './CrudRepository';

export class SoonProposalRepository extends CrudRepository<Proposal> {
  constructor(app: FirebaseApp, lite = false) {
    super(app, COL.PROPOSAL, lite);
  }
}
