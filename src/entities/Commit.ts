import {BaseEntity, Column, Entity, PrimaryColumn} from 'typeorm';

@Entity({name: 'commit'})
export class Commit extends BaseEntity {
  /**
   * Something to note:
   * If this is the primary column, deleting a repo will have untentended concequences if two of the same repos have the same
   * commits. As such, (and because we're likely moving away from using the DB for local commits) this should be changed
   * to an auto-generated primary key
   */
  @PrimaryColumn({type: 'text', name: 'oid'})
  oid: string; // SHA-1 object id of this commit

  @Column({type: 'text', nullable: true, name: 'payload'})
  payload: string; // PGP signing payload

  @Column({type: 'text', name: 'message'})
  message: string; // Commit message

  @Column({type: 'text', nullable: true, name: 'tree'})
  tree: string; // SHA-1 object id of corresponding file tree

  @Column('simple-array', {nullable: true, name: 'parent'})
  parent: Array<string>; // an array of zero or more SHA-1 object ids

  @Column({type: 'text', name: 'authorname'})
  authorName: string;
  /**
   * In order to keep speed up, we'll be storing a string map of encoded `data:` strings for profile pics
   * and then simply query by loading that into memory for every repo page. That way, we can keep our DB simpler and faster
   */
  @Column({type: 'text', name: 'authoremail'})
  authorEmail: string;
  @Column({type: 'datetime', name: 'authortimestampe'})
  authorTimestamp: Date;

  @Column({type: 'text', nullable: true, name: 'committername'})
  committerName: string;
  @Column({type: 'text', nullable: true, name: 'committeremail'})
  committerEmail: string;
  @Column({type: 'datetime', nullable: true, name: 'committertimestamp'})
  committerTimestamp: Date;

  @Column({type: 'text', nullable: true, name: 'pgpsig'})
  gpgsig?: string; // PGP signature (if present)
}
