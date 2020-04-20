import {GHBase} from './constants';

type ResponseType<T> = Promise<
  Omit<Response, 'json'> & {json: () => Promise<T>}
>;
export interface baseRequestProps {
  path: string;
  method: 'GET' | 'POST';
  gh_token: string;
}
export const baseRequest = <T = any>({
  path,
  method,
  gh_token,
}: baseRequestProps) => {
  return (fetch(`${GHBase}${path}`, {
    method,
    headers: {
      Authorization: `token ${gh_token}`,
    },
  }) as any) as ResponseType<T>;
};
