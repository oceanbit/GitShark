import {useManualUserData} from './use-manual-user-data';
import {useGitHubUserData} from './use-github-user-data';

export const useUserData = () => {
  const {manualUser} = useManualUserData();
  const {gitHubUser, useGitHub} = useGitHubUserData();
  const {email: ghEmail, name: ghName} = gitHubUser || {};
  const {email: uEmail, name: uName} = manualUser || {};
  return useGitHub
    ? {name: ghName, email: ghEmail}
    : {name: uName, email: uEmail};
};
