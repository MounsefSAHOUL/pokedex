import React from 'react';
import { View, Text, ViewProps } from 'react-native';

type Props = ViewProps & {
  gap?: number;
};
const Row = ({ style, gap, ...rest }: Props) => {
  return (
    <View
      className="flex flex-row items-center"
      style={[style, gap ? { gap: gap } : undefined]}
      {...rest}
    />
  );
};

export default Row;
