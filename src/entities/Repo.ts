import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {Remote} from './Remote';
import {Branch} from './Branch';
import {Commit} from './Commit';

@Entity({name: 'repo'})
export class Repo extends BaseEntity {
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  // The display name of the repo
  @Column('text', {nullable: false, name: 'name'})
  name: string;

  // The display name of the repo
  @Column('text', {default: 'master', name: 'currentbranchname'})
  currentBranchName: string;

  // This should be updated and stored when doing a repo `fetch`
  @Column('int', {nullable: true, name: 'commitstopull'})
  commitsToPull: number;

  // This should be updated and stored when doing a repo `fetch`
  @Column('int', {nullable: true, name: 'commitstopush'})
  commitsToPush: number;

  // The device FS path of where the repo is located
  @Column('text', {nullable: false, name: 'path'})
  path: string;

  // The dateTime of the last updated value for the repo
  @Column('datetime', {
    nullable: false,
    default: Date.now(),
    name: 'lastupdated',
  })
  lastUpdated: Date;

  /**
   * This is a cache of the first 5 commits we want to show in the commit list
   */
  @ManyToMany(() => Commit, {cascade: ['insert', 'remove']})
  @JoinTable({name: 'repo__commits'})
  commits: Commit[];

  @ManyToMany(() => Remote, {cascade: ['insert', 'remove']})
  @JoinTable({name: 'repo__remotes'})
  remotes: Remote[];

  @ManyToMany(() => Branch, {cascade: ['insert', 'remove']})
  @JoinTable({name: 'repo__branches'})
  branches: Branch[];
}

export const getReduxRepo = (repo: Repo) => {
  const {
    id,
    name,
    currentBranchName,
    commitsToPull,
    commitsToPush,
    path,
    commits,
    remotes,
    branches,
  } = repo;
  return {
    id,
    name,
    currentBranchName,
    commitsToPull,
    commitsToPush,
    path,
    // lastUpdated,
    commits,
    remotes,
    branches,
  };
};

export type ReduxRepo = Pick<
  Repo,
  | 'id'
  | 'name'
  | 'currentBranchName'
  | 'commitsToPull'
  | 'commitsToPush'
  | 'path'
  | 'lastUpdated'
  | 'commits'
  | 'remotes'
  | 'branches'
>;

export interface RepoMock {
  id: number;
  name: string;
  currentBranchName: string;
  commitsToPull: number;
  commitsToPush: number;
  path: string;
  lastUpdated: Date;
}
