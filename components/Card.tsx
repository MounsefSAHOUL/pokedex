import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import { Shadows } from '~/constents/Shadows';
import { useThemeColors } from '~/hooks/useThemeColors';

type Props = ViewProps;

const Card = ({ style, ...rest }: Props) => {
  const colors = useThemeColors();
  return (
    <View
      className={`overflow-hidden rounded-lg border-2 bg-[${colors.grayWhite}]`}
      style={[style, { ...Shadows.dp2 }]}
      {...rest}
    />
  );
};

export default Card;
