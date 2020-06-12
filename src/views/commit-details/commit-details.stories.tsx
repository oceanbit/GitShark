import React from 'react';
import {storiesOf} from '@storybook/react';
import {withKnobs, boolean} from '@storybook/addon-knobs';
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

const CommitDetailsDemo = ({...props}: any) => {
  const twoAuthors = boolean('Should show two authors', true);

  const longText = boolean('Long message', true);

  const authorLocal = twoAuthors ? author : undefined;

  const message = longText ? longMessage : shortMessage;

  return (
    <StorybookProvider>
      <CommitDetailsUI
        author={authorLocal}
        committer={committer}
        message={message}
      />
    </StorybookProvider>
  );
};

storiesOf('Screens/Commit Details', module)
  .addDecorator(withKnobs)
  .add('default styling', () => <CommitDetailsDemo />);
