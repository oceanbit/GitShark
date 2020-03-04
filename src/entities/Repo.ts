/**
 * @format
 */
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm';
@Entity()
export class Repo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // The display name of the repo
  @Column('text', {nullable: false})
  name: string;

  // The display name of the repo
  @Column('text', {default: 'master'})
  currentBranchName: string;

  // This should be updated and stored when doing a repo `fetch`
  @Column('int', {nullable: true})
  commitsToPull: number;

  // This should be updated and stored when doing a repo `fetch`
  @Column('int', {nullable: true})
  commitsToPush: number;

  // The device FS path of where the repo is located
  @Column('text', {nullable: false})
  path: string;

  // The dateTime of the last updated value for the repo
  @Column('datetime', {nullable: false, default: Date.now()})
  lastUpdated: Date;
}
