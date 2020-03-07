/**
 * @format
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import {Remote} from './Remote';
import {Branch} from './Branch';

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

  @ManyToMany(type => Remote, {cascade: ['insert']})
  @JoinTable()
  remotes: Remote[];

  @ManyToMany(type => Branch, {cascade: ['insert']})
  @JoinTable()
  branches: Branch[];
}

export interface RepoMock {
  id: number;
  name: string;
  currentBranchName: string;
  commitsToPull: number;
  commitsToPush: number;
  path: string;
  lastUpdated: Date;
}
