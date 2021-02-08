import * as React from 'react';
import {ViewProps} from 'react-native';

interface DialogsContextType {
  openDialogs: number;
  setOpenDialogs: (val: (v: number) => number | number) => void;
}

export const DialogsContext = React.createContext<DialogsContextType>({
  openDialogs: 0,
  setOpenDialogs: () => {},
});

export const DialogContextProvider: React.FC = ({children}) => {
  const [openDialogs, setOpenDialogs] = React.useState(0);

  return (
    <DialogsContext.Provider value={{openDialogs, setOpenDialogs}}>
      {children}
    </DialogsContext.Provider>
  );
};

export const useInDialogProps = (): ViewProps => {
  const {openDialogs} = React.useContext(DialogsContext);

  const isInDialog = openDialogs > 0;

  return isInDialog
    ? {
        importantForAccessibility: 'no-hide-descendants',
        accessibilityElementsHidden: true,
      }
    : {};
};
