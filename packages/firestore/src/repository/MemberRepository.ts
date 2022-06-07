import { COL, Member } from '@soonaverse/model';
import { FirebaseApp } from 'firebase/app';
import { CrudRepository } from './CrudRepository';

export class SoonMemberRepository extends CrudRepository<Member> {
  constructor(app: FirebaseApp, lite = false) {
    super(app, COL.MEMBER, lite);
  }
}
