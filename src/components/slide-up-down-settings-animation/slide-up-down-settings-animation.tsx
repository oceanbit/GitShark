import * as React from 'react';
import {View} from 'react-native';
import Video from 'react-native-video';
import SheetUpVideoLight from '../../../assets/videos/sheet_up.mp4';
import SheetUpVideoDark from '../../../assets/videos/sheet_up_dark.mp4';
import SheetDownVideoLight from '../../../assets/videos/sheet_down.mp4';
import SheetDownVideoDark from '../../../assets/videos/sheet_down_dark.mp4';
import {DynamicValue, useDynamicValue} from 'react-native-dark-mode';

interface SlideUpDownSettingsAnimationProps {
  direction: 'up' | 'down';
  vidHeight: number;
  vidWidth: number;
}
export const SlideUpDownSettingsAnimation = ({
  direction,
  vidHeight,
  vidWidth,
}: SlideUpDownSettingsAnimationProps) => {
  const SheetUpVideo = useDynamicValue(
    new DynamicValue(SheetUpVideoLight, SheetUpVideoDark),
  );
  const SheetDownVideo = useDynamicValue(
    new DynamicValue(SheetDownVideoLight, SheetDownVideoDark),
  );

  const slideUpVideo = React.useRef<Video>();
  const slideDownVideo = React.useRef<Video>();
  const [playUpVideo, setPlayUpVideo] = React.useState(
    () => direction === 'up',
  );
  const [pausedDownVid, setPausedDownVid] = React.useState(true);
  const [pausedUpVid, setPausedUpVid] = React.useState(true);

  React.useEffect(() => {
    const playUpVideo = direction === 'up';
    if (playUpVideo) {
      setPausedDownVid(false);
    } else {
      setPausedUpVid(false);
    }
    setPlayUpVideo(playUpVideo);
  }, [direction]);

  return (
    <View>
      <Video
        source={SheetUpVideo}
        ref={slideUpVideo as any}
        style={{height: vidHeight, width: vidWidth}}
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
        ref={slideDownVideo as any}
        style={{
          position: 'absolute',
          opacity: playUpVideo ? 1 : 0,
          height: vidHeight,
          width: vidWidth,
        }}
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
