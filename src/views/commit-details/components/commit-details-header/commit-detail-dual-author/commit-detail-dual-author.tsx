import * as React from 'react';
import {Animated, StyleProp, Text, View, ViewStyle} from 'react-native';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';
import {DropdownContent} from '@components/dropdown-content';
import {theme} from '@constants';
import {SharkProfilePic} from '@components/shark-profile-pic';
import {GitLogCommit} from '@services';
import dayjs from 'dayjs';

const authorImageSize = 40;

const imageContainerWidth = 56;

const expandedLeft = (imageContainerWidth - authorImageSize) / 2;

const topImageCollapsed = {
  top: 4,
  left: 0,
};

const animDuration = 150;

interface CommitDetailsDualAuthorProps {
  expanded: boolean;
  style?: StyleProp<ViewStyle>;
  committer: GitLogCommit['committer'];
  author?: GitLogCommit['author'];
}

export const CommitDetailsDualAuthor = ({
  expanded,
  style,
  author,
  committer,
}: CommitDetailsDualAuthorProps) => {
  const styles = useDynamicValue(dynamicStyles);

  const [bottomImageLeft] = React.useState(new Animated.Value(0));
  const [bottomImageTop] = React.useState(new Animated.Value(0));
  const [topImageLeft] = React.useState(new Animated.Value(0));
  const [topImageTop] = React.useState(new Animated.Value(0));

  const emailRef = React.useRef<any>({});

  const [nameHeight, setNameHeight] = React.useState(0);

  const emailHeight = emailRef?.current?.height || 0;

  const bottomImageCollapsed = React.useMemo(
    () => ({
      top: nameHeight * 2 - 4 - authorImageSize,
      left: imageContainerWidth - authorImageSize,
    }),
    [nameHeight],
  );

  const extendedTop = React.useMemo(() => {
    const top = (nameHeight + emailHeight - authorImageSize) / 2;
    return {
      // Just "half of" nameHeight and emailHeight in order
      // to center with the top container
      top,
      // 16 margin from the top image by baseline
      // Plus the name and email height of bottom container
      bottom:
        top +
        authorImageSize +
        (16 + nameHeight + emailHeight - authorImageSize) / 2,
    };
  }, [nameHeight, emailHeight]);

  React.useEffect(() => {
    if (expanded) {
      Animated.parallel([
        Animated.timing(bottomImageLeft, {
          toValue: expandedLeft,
          duration: animDuration,
          useNativeDriver: false,
        }),
        Animated.timing(bottomImageTop, {
          toValue: extendedTop.bottom,
          duration: animDuration,
          useNativeDriver: false,
        }),
        Animated.timing(topImageLeft, {
          toValue: expandedLeft,
          duration: animDuration,
          useNativeDriver: false,
        }),
        Animated.timing(topImageTop, {
          toValue: extendedTop.top,
          duration: animDuration,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(bottomImageLeft, {
          toValue: bottomImageCollapsed.left,
          duration: animDuration,
          useNativeDriver: false,
        }),
        Animated.timing(bottomImageTop, {
          toValue: bottomImageCollapsed.top,
          duration: animDuration,
          useNativeDriver: false,
        }),
        Animated.timing(topImageLeft, {
          toValue: topImageCollapsed.left,
          duration: animDuration,
          useNativeDriver: false,
        }),
        Animated.timing(topImageTop, {
          toValue: topImageCollapsed.top,
          duration: animDuration,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [
    expanded,
    bottomImageCollapsed,
    bottomImageLeft,
    bottomImageTop,
    topImageLeft,
    topImageTop,
    extendedTop,
  ]);

  const topImage = {
    top: topImageTop,
    left: topImageLeft,
  };

  const bottomImage = {
    left: bottomImageLeft,
    top: bottomImageTop,
  };

  const commitedTimestamp = dayjs.unix(committer?.timestamp || 0);
  const commitTimeStr = commitedTimestamp.format('D MMM YYYY H:mm');

  const authoredTimestamp = dayjs.unix(author?.timestamp || 0);
  const authorTimeStr = authoredTimestamp.format('D MMM YYYY H:mm');

  return (
    <View style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        <Animated.View style={[styles.imageView, topImage]}>
          <SharkProfilePic size={authorImageSize} />
        </Animated.View>
        <Animated.View style={[styles.imageView, bottomImage]}>
          <SharkProfilePic size={authorImageSize} />
        </Animated.View>
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
          <Text style={styles.personName}>{author?.name}</Text>
          <DropdownContent expanded={expanded} ref={emailRef}>
            <Text style={styles.personEmail}>{author?.email}</Text>
          </DropdownContent>
          <Text style={styles.personDate}>Authored on {authorTimeStr}</Text>
        </View>
        {/*
        We want margins to disappear when not expanded. This is a quick-n-dirty solution to that
        without exploding the logic further
      */}
        <DropdownContent expanded={expanded}>
          <View style={styles.peopleMargin} />
        </DropdownContent>
        <View style={styles.personContainer}>
          <Text style={styles.personName}>{committer?.name}</Text>
          <DropdownContent expanded={expanded}>
            <Text style={styles.personEmail}>{committer?.email}</Text>
          </DropdownContent>
          <Text style={styles.personDate}>Commited on {commitTimeStr}</Text>
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
    marginRight: theme.spacing.xs,
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
    ...theme.textStyles.caption_01,
  },
  personDate: {
    color: theme.colors.on_surface,
    opacity: theme.opacity.secondary,
    ...theme.textStyles.caption_02,
  },
  peopleMargin: {
    marginBottom: theme.spacing.xs,
  },
  personEmail: {
    color: theme.colors.on_surface,
    ...theme.textStyles.caption_02,
  },
});
