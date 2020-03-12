import {BaseEntity, Column, Entity, PrimaryColumn} from 'typeorm';

@Entity()
export class Commit extends BaseEntity {
  @PrimaryColumn({type: 'text'})
  oid: string; // SHA-1 object id of this commit

  @Column({type: 'text', nullable: true})
  payload: string; // PGP signing payload

  @Column({type: 'text'})
  message: string; // Commit message

  @Column({type: 'text', nullable: true})
  tree: string; // SHA-1 object id of corresponding file tree

  @Column('simple-array', {nullable: true})
  parent: Array<string>; // an array of zero or more SHA-1 object ids

  @Column({type: 'text'})
  authorName: string;
  /**
   * In order to keep speed up, we'll be storing a string map of encoded `data:` strings for profile pics
   * and then simply query by loading that into memory for every repo page. That way, we can keep our DB simpler and faster
   */
  @Column({type: 'text'})
  authorEmail: string;
  @Column({type: 'datetime'})
  authorTimestamp: Date;

  @Column({type: 'text', nullable: true})
  committerName: string;
  @Column({type: 'text', nullable: true})
  committerEmail: string;
  @Column({type: 'datetime', nullable: true})
  committerTimestamp: Date;

  @Column({type: 'text', nullable: true})
  gpgsig?: string; // PGP signature (if present)
}
