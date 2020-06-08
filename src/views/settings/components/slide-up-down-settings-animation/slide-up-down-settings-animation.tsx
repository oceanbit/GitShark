import * as React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import Video from 'react-native-video';
import SheetUpVideoLight from '@assets/videos/sheet_up.mp4';
import SheetUpVideoDark from '@assets/videos/sheet_up_dark.mp4';
import SheetDownVideoLight from '@assets/videos/sheet_down.mp4';
import SheetDownVideoDark from '@assets/videos/sheet_down_dark.mp4';

interface SlideUpDownSettingsAnimationProps {
  direction: 'up' | 'down';
  vidHeight: number;
  vidWidth: number;
  darkMode: boolean;
  style?: StyleProp<ViewStyle>;
}

export const SlideUpDownSettingsAnimation = ({
  direction,
  vidHeight,
  vidWidth,
  darkMode,
  style = {},
}: SlideUpDownSettingsAnimationProps) => {
  const SheetUpVideo = !darkMode ? SheetUpVideoLight : SheetUpVideoDark;

  const SheetDownVideo = !darkMode ? SheetDownVideoLight : SheetDownVideoDark;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const slideUpVideo = React.useRef<Video>() as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const slideDownVideo = React.useRef<Video>() as any;
  const [playUpVideo, setPlayUpVideo] = React.useState(
    () => direction === 'up',
  );
  const [pausedDownVid, setPausedDownVid] = React.useState(true);
  const [pausedUpVid, setPausedUpVid] = React.useState(true);

  React.useEffect(() => {
    const shouldPlayUpVideo = direction === 'up';
    if (shouldPlayUpVideo) {
      setPausedDownVid(false);
    } else {
      setPausedUpVid(false);
    }
    setPlayUpVideo(shouldPlayUpVideo);
  }, [direction]);

  return (
    <View style={style}>
      <Video
        source={SheetUpVideo}
        ref={slideUpVideo}
        style={{height: vidHeight, width: vidWidth}}
        disableFocus={true}
        muted={true}
        controls={false}
        resizeMode={'contain'}
        paused={pausedUpVid}
        repeat={false}
        onEnd={() => {
          setPausedUpVid(true);
          slideDownVideo.current!.seek(0);
        }}
      />
      <Video
        source={SheetDownVideo}
        ref={slideDownVideo}
        style={{
          position: 'absolute',
          opacity: playUpVideo ? 1 : 0,
          height: vidHeight,
          width: vidWidth,
        }}
        disableFocus={true}
        muted={true}
        controls={false}
        resizeMode={'contain'}
        paused={pausedDownVid}
        repeat={false}
        onEnd={() => {
          setPausedDownVid(true);
          slideUpVideo.current!.seek(0);
        }}
      />
    </View>
  );
};
