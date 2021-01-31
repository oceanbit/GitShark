import newGithubIssueUrl from 'new-github-issue-url';
import {Linking} from 'react-native';
import {RepoConfig} from '@constants/repo-config';
import {getFileContents} from './get-file-contents';

export interface ErrorPromptProps {
  // EG: "An error occured while loading staged files."
  explainMessage: string;
  // EG: undefined is not a function
  errorMessage: string;
  // EG: "_callee2$@http://localhost:8081/ind..."
  callStack: string;
}

export async function openGitHubIssue(err: ErrorPromptProps) {
  const bugReport = await getFileContents(
    '.github/ISSUE_TEMPLATE/bug_report.md',
  );

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

  return await Linking.openURL(url);
}
