import {GHBase} from './constants';

type ResponseType<T> = Promise<
  Omit<Response, 'json'> & {json: () => Promise<T>}
>;
export interface baseRequestProps {
  path: string;
  method: 'GET' | 'POST';
  gh_token: string;
  body?: RequestInit['body'];
}
export const baseRequest = <T = any>({
  path,
  method,
  gh_token,
  body,
}: baseRequestProps) => {
  return fetch(`${GHBase}${path}`, {
    method,
    headers: {
      ...(gh_token ? {Authorization: `token ${gh_token}`} : {}),
      Accept: 'application/vnd.github.v3+json',
    },
    body,
  }) as ResponseType<T>;
};
