export const REDIRECT_URI = 'gitshark://ghcallback';

export const gitHub = {
  clientId: '51fdee6d7e72c5b4a4df',
};

const ghScope = 'user,repo';

export const githubOauthLink = `https://github.com/login/oauth/authorize?client_id=${gitHub.clientId}&redirect_uri=${REDIRECT_URI}&scope=${ghScope}`;
