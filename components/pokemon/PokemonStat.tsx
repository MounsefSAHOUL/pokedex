import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import Row from '../Row';
import ThemedText from '../ThemedText';

import { useThemeColors } from '~/hooks/useThemeColors';

type Props = ViewProps & {
  name: string;
  color: string;
  value: number;
};

const PokemonStat = ({ style, name, value, color, ...rest }: Props) => {
  const colors = useThemeColors();
  const sharedValue = useSharedValue(value);

  const barInnerStyle = useAnimatedStyle(() => {
    return {
      flex: sharedValue.value,
    };
  });

  const barBackgroundStyle = useAnimatedStyle(() => {
    return {
      flex: 255 - sharedValue.value,
    };
  });

  useEffect(() => {
    sharedValue.value = withSpring(value);
  }, [value]);

  return (
    <Row style={[style, styles.root]} {...rest}>
      <View style={[styles.name, { borderColor: colors.grayLight }]}>
        <ThemedText variant="subtitle3" style={{ color: color }}>
          {name}
        </ThemedText>
      </View>
      <View style={styles.number}>
        <ThemedText variant="subtitle3" style={{ color: colors.grayDark }}>
          {value.toString().padStart(3, '0')}
        </ThemedText>
      </View>
      <Row style={styles.bar}>
        <Animated.View
          style={[styles.barInner, { flex: value, backgroundColor: color }, barInnerStyle]}
        />
        <Animated.View
          style={[styles.barBackground, { backgroundColor: color }, barBackgroundStyle]}
        />
      </Row>
    </Row>
  );
};

export default PokemonStat;

const styles = StyleSheet.create({
  root: {},
  name: {
    width: 90,
    paddingRight: 8,
    borderRightWidth: 1,
    borderStyle: 'solid',
  },
  number: {
    width: 24,
    marginLeft: 8,
  },
  bar: {
    borderRadius: 20,
    flex: 1,
    height: 4,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  barInner: {
    height: 4,
  },
  barBackground: {
    height: 4,
    opacity: 0.24,
  },
});
