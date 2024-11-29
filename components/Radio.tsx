import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useThemeColors } from '~/hooks/useThemeColors';

type Props = {
  checked: boolean;
};

const Radio = ({ checked }: Props) => {
  const colors = useThemeColors();
  return (
    <View style={[styles.radio, { borderColor: colors.tint }]}>
      {checked && <View style={[styles.radioInner, { backgroundColor: colors.tint }]} />}
    </View>
  );
};

export default Radio;

const styles = StyleSheet.create({
  radio: {
    width: 14,
    height: 14,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 8,
  },
});
