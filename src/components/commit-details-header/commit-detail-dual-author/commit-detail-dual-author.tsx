import * as React from 'react';
import {Text, View} from 'react-native';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';
import {DropdownContent} from '../../dropdown-content';
import {textStyles, theme} from '../../../constants';
import {SharkProfilePic} from '../../shark-profile-pic';

const authorImageSize = 40;

const imageContainerWidth = 56;

interface CommitDetailsDualAuthorProps {
  expanded: boolean;
}
export const CommitDetailsDualAuthor = ({
  expanded,
}: CommitDetailsDualAuthorProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  const emailRef = React.useRef<any>({});

  const [nameHeight, setNameHeight] = React.useState(0);

  const emailHeight = emailRef?.current?.height || 0;

  const topImage = {
    top: 4,
    left: 0,
  };

  const bottomImage = {
    top: nameHeight * 2 - 4 - authorImageSize,
    left: imageContainerWidth - authorImageSize,
  };

  React.useEffect(() => {});

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={[styles.imageView, topImage]}>
          <SharkProfilePic size={authorImageSize} />
        </View>
        <View style={[styles.imageView, bottomImage]}>
          <SharkProfilePic size={authorImageSize} />
        </View>
      </View>
      <View style={styles.peoplesContainer}>
        <View
          style={styles.personContainer}
          onLayout={event => {
            const {height: eventHeight} = event.nativeEvent.layout;
            // We only want the height _ignoring_ the email. As such, because the email is hidden on
            // initial render, we can ignore susequent updates that `onLayout` runs
            if (!nameHeight) setNameHeight(eventHeight);
          }}>
          <Text style={styles.personName}>Corbin Crutchley</Text>
          <DropdownContent expanded={expanded} ref={emailRef}>
            <Text style={styles.personEmail}>crutchcorn@gmail.com</Text>
          </DropdownContent>
          <Text style={styles.personDate}>Authored on 12 Feb 2020 12:00</Text>
        </View>
        {/* 
        We want margins to disappear when not expanded. This is a quick-n-dirty solution to that
        without exploding the logic further
      */}
        <DropdownContent expanded={expanded}>
          <View style={styles.peopleMargin} />
        </DropdownContent>
        <View style={styles.personContainer}>
          <Text style={styles.personName}>Eduardo Pratti</Text>
          <DropdownContent expanded={expanded}>
            <Text style={styles.personEmail}>edismeme@gmail.com</Text>
          </DropdownContent>
          <Text style={styles.personDate}>Commited on 14 Feb 2020 12:00</Text>
        </View>
      </View>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  imageContainer: {
    width: imageContainerWidth,
    backgroundColor: 'red',
  },
  imageView: {
    position: 'absolute',
    height: authorImageSize,
    width: authorImageSize,
  },
  peoplesContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  personContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  personName: {
    color: theme.colors.on_surface,
    ...textStyles.caption_01,
  },
  personDate: {
    color: theme.colors.on_surface_secondary,
    ...textStyles.caption_02,
  },
  peopleMargin: {
    marginBottom: 8,
  },
  personEmail: {
    color: theme.colors.on_surface,
    ...textStyles.caption_02,
  },
});
