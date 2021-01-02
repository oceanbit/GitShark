import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  // The array of OIDs
  @Column('simple-array', {nullable: true, name: 'commitstopull'})
  commitsToPull: string[];

  // This should be updated and stored when doing a repo `fetch`
  @Column('simple-array', {nullable: true, name: 'commitstopush'})
  commitsToPush: string[];

  /**
   * The device FS path of where the repo is located
   *
   * For iOS, we simply keep the folder name where the FS path is.
   * This is because, if we keep the full path, we cannot access the files using `readFile` in the future
   * as such, we need to use a `getRepoPath` function every time we read from `repo.path`
   */
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
>;

export interface PushPull {
  toPush: string[];
  toPull: string[];
}
