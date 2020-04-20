import {baseRequest} from './base-request';

interface CurrentUserEmails {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: null | 'public';
}

export const getCurrentUserEmails = (gh_token: string) => {
  return baseRequest<CurrentUserEmails[]>({
    path: '/user/emails',
    method: 'GET',
    gh_token,
  });
};
