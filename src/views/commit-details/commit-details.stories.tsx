import React from 'react';
import {CommitDetailsUI} from './commit-details.ui';
import {StorybookProvider} from '@components/storybook-provider';
import {GitLogCommit} from '@services';

const author: GitLogCommit['author'] = {
  name: 'Corbin Crutchley',
  email: 'crutchcorn@gmail.com',
  timestamp: 0,
  timezoneOffset: 0,
};

const committer: GitLogCommit['committer'] = {
  name: 'Joe Shmit',
  email: 'shmjoe@example.com',
  timestamp: 0,
  timezoneOffset: 0,
};

const longMessage = `
The \`FormStyle\` enum offers two options, and the explanation of the difference between the two can be found on the CLDR official website. Sadly, the link changed and the one currently referenced is a dead-end. This commit fixes the link.

PR Close #37069
`.trim();

const shortMessage = 'Closes #37069';

const header =
  'fix(dev-infra): exit non-zero if commit message validation failed';

const sha = '2d1c7df6cf06b54d982b1b5ffd0551f06b54d982b1b5ffd0551';

const par = '8a26e06';

const CommitDetailsDemo = (args: DefaultArgs) => {
  const authorLocal = args.twoAuthors
    ? author
    : args.differentTimestamps
    ? {...committer, timestamp: 3}
    : committer;

  const message = args.noMessage
    ? ''
    : args.longText
    ? longMessage
    : shortMessage;

  return (
    <StorybookProvider>
      <CommitDetailsUI
        author={authorLocal}
        committer={committer}
        message={message}
        sha={sha}
        parents={[par]}
        title={header}
        onNavToPar={() => {}}
        onBack={() => {}}
        files={[
          {
            fileStatus: 'modified',
            fileName: 'CHANGELOG.md',
            unstagedChanges: false,
            staged: false,
          },
          {
            fileStatus: 'deleted',
            fileName: 'README.md',
            unstagedChanges: false,
            staged: false,
          },
          {
            fileStatus: 'added',
            fileName: 'TEST.md',
            unstagedChanges: false,
            staged: false,
          },
        ]}
      />
    </StorybookProvider>
  );
};

export default {title: 'Screens/Commit Details'};

interface DefaultArgs {
  twoAuthors: boolean;
  differentTimestamps: boolean;
  longText: boolean;
  noMessage: boolean;
}

export const DefaultStyling = (args: DefaultArgs) => (
  <CommitDetailsDemo {...args} />
);

DefaultStyling.args = {
  twoAuthors: true,
  differentTimestamps: false,
  longText: true,
  noMessage: false,
} as DefaultArgs;
