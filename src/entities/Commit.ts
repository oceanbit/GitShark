import {BaseEntity, Column, PrimaryColumn} from 'typeorm';

export class Commit extends BaseEntity {
  @PrimaryColumn()
  oid: string; // SHA-1 object id of this commit

  @Column()
  payload: string; // PGP signing payload

  @Column()
  message: string; // Commit message

  @Column()
  tree: string; // SHA-1 object id of corresponding file tree

  @Column('simple-array')
  parent: Array<string>; // an array of zero or more SHA-1 object ids

  @Column()
  authorName: string;
  /**
   * In order to keep speed up, we'll be storing a string map of encoded `data:` strings for profile pics
   * and then simply query by loading that into memory for every repo page. That way, we can keep our DB simpler and faster
   */
  @Column()
  authorEmail: string;
  @Column()
  authorTimestamp: Date;

  @Column()
  committerName: string;
  @Column()
  committerEmail: string;
  @Column()
  committerTimestamp: Date;

  @Column()
  gpgsig?: string; // PGP signature (if present)
}
