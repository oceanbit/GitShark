import {CurrentUser} from '@services';

export type CachedGithubUser = Pick<
  CurrentUser,
  'name' | 'avatar_url' | 'email'
>;
