import newGithubIssueUrl from 'new-github-issue-url';
import {Linking} from 'react-native';
import {RepoConfig} from '@constants/repo-config';
const bugReport = require('githubIssues/bug_report.md');

export interface ErrorPromptProps {
  // EG: "An error occured while loading staged files."
  explainMessage: string;
  // EG: undefined is not a function
  errorMessage: string;
  // EG: "_callee2$@http://localhost:8081/ind..."
  callStack: string;
}

export function openGitHubIssue(err: ErrorPromptProps) {
  const body = bugReport
    .replace(
      '{{Put the simple error code here}}',
      `**${err.explainMessage}**: ${err.errorMessage}`,
    )
    .replace('{{Put the stack trace here}}', err.callStack);

  const url = newGithubIssueUrl({
    user: RepoConfig.owner,
    repo: RepoConfig.name,
    body,
  });

  return Linking.openURL(url);
}
