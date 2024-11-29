import React, { useEffect } from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { View } from 'react-native-reanimated/lib/typescript/Animated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeColors } from '~/hooks/useThemeColors';

type Props = ViewProps & {
  backgroundColor: string;
};

const RootView = ({ style, backgroundColor, ...rest }: Props) => {
  const colors = useThemeColors();
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [colors.tint, backgroundColor ?? colors.tint]
      ),
    };
  }, [backgroundColor]);

  useEffect(() => {
    if (backgroundColor) {
      progress.value = 0;
      progress.value = withTiming(1, {
        duration: 700,
        easing: Easing.out(Easing.quad),
        reduceMotion: ReduceMotion.System,
      });
    }
  }, [backgroundColor]);

  if (!backgroundColor) {
    return (
      <SafeAreaView
        className="w-screen flex-1 p-2"
        style={[{ backgroundColor: colors.tint }, style]}
        {...rest}
      />
    );
  }

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle, style]}>
      <SafeAreaView style={{ flex: 1, padding: 4 }} {...rest} />
    </Animated.View>
  );
};

export default RootView;

const styles = StyleSheet.create({});
