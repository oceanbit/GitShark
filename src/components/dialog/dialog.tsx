import * as React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Dialog, TouchableRipple, Button, Portal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../constants/theme';
import {textStyles} from '../../constants/text-styles';

interface AppDialogProps {
  title: string;
  text: string;
  main?: React.ReactNode;
  actions?: React.ReactNode;
}
export const AppDialog = ({title, text, actions, main}: AppDialogProps) => {
  return (
    <Portal>
      <Dialog
        visible={true}
        onDismiss={() => {}}
        style={styles.dialogContainer}>
        <Text style={styles.dialogTitle}>{title}</Text>
        <Text style={styles.mainText}>{text}</Text>
        {main}
        <View style={styles.dialogActions}>{actions}</View>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialogContainer: {
    margin: 0,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  dialogTitle: {
    marginBottom: 4,
    ...textStyles.headline_03,
  },
  mainText: {
    color: '#142952',
    opacity: 0.6,
    marginBottom: 20,
    ...textStyles.body_02,
  },
  dialogActions: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
