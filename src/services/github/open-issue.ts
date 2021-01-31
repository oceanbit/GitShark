import {Linking} from 'react-native';
import {getFileContents} from './get-file-contents';
import {createIssueWithAPI} from '@services/github/create-issue-with-api';

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

  const issueEditURL = await createIssueWithAPI(body);

  return await Linking.openURL(issueEditURL);
}
