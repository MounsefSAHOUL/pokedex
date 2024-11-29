import React from 'react';
import { TextProps, View, Text, StyleSheet } from 'react-native';

import { Colors } from '~/constents/Colors';
import { useThemeColors } from '~/hooks/useThemeColors';

const styles = StyleSheet.create({
  body1: {
    fontSize: 14,
    lineHeight: 16,
  },
  body2: {
    fontSize: 12,
    lineHeight: 16,
  },
  body3: {
    fontSize: 10,
    lineHeight: 16,
  },
  caption: {
    fontSize: 8,
    lineHeight: 12,
  },
  headLine: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  subtitle1: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: 'bold',
  },
  subtitle2: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 'bold',
  },

  subtitle3: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: 'bold',
  },
});

type Props = TextProps & {
  variant?: keyof typeof styles;
  color?: keyof (typeof Colors)['light'];
};

const ThemedText = ({ variant, color, style, ...rest }: Props) => {
  const colors = useThemeColors();
  return (
    <Text
      style={[styles[variant ?? 'body3'], { color: colors[color ?? 'grayDark'] }, style]}
      {...rest}
    />
  );
};

export default ThemedText;
