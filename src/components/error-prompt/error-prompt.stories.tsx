import React from 'react';
import {storiesOf} from '@storybook/react';
import {ErrorPromptTablet} from './error-prompt-tablet';
import {StorybookProvider} from '@components/storybook-provider';

const callStack = `
_callee2$@http://localhost:8081/index.bundle?platform=android&dev=true&minify=false:217085:24
tryCatch@http://localhost:8081/index.bundle?platform=android&dev=true&minify=false:24939:23
invoke@http://localhost:8081/index.bundle?platform=android&dev=true&minify=false:25115:32
tryCatch@http://localhost:8081/index.bundle?platform=android&dev=true&minify=false:24939:23
invoke@http://localhost:8081/index.bundle?platform=android&dev=true&minify=false:25015:30
http://localhost:8081/index.bundle?platform=android&dev=true&minify=false:25025:21
tryCallOne@http://localhost:8081/index.bundle?platform=android&dev=true&minify=false:26955:16
http://localhost:8081/index.bundle?platform=android&dev=true&minify=false:27056:27
_callTimer@http://localhost:8081/index.bundle?platform=android&dev=true&minify=false:30495:17
_callImmediatesPass@http://localhost:8081/index.bundle?platform=android&dev=true&minify=false:30534:17
callImmediates@http://localhost:8081/index.bundle?platform=android&dev=true&minify=false:30751:33
__callImmediates@http://localhost:8081/index.bundle?platform=android&dev=true&minify=false:2755:35
http://localhost:8081/index.bundle?platform=android&dev=true&minify=false:2541:34
__guard@http://localhost:8081/index.bundle?platform=android&dev=true&minify=false:2738:15
flushedQueue@http://localhost:8081/index.bundle?platform=android&dev=true&minify=false:2540:21
flushedQueue@[native code]
invokeCallbackAndReturnFlushedQueue@[native code]
`.trim();

storiesOf('Shark Components/Error Prompt', module).add('tablet styling', () => (
  <StorybookProvider>
    <ErrorPromptTablet
      errorMessage={`Undefined is not a function`}
      explainMessage={`An error occured while loading staged files.`}
      callStack={callStack}
    />
  </StorybookProvider>
));
