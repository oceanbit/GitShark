import * as React from 'react';

export type StagingTypes = 'split' | 'sheet';

interface StyleOfStagingContextType {
  styleOfStaging: StagingTypes | null;
  setStyleOfStaging: (val: StagingTypes) => void;
}

export const StyleOfStagingContext =
  React.createContext<StyleOfStagingContextType>({
    styleOfStaging: null,
    setStyleOfStaging: () => {},
  });
