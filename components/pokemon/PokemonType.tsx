import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '~/constents/Colors';
import ThemedText from '../ThemedText';

type Props = {
  name: keyof (typeof Colors)['type'];
};

const PokemonType = ({ name }: Props) => {
  return (
    <View style={[rootStyle, { backgroundColor: Colors.type[name] }]}>
      <ThemedText color="grayWhite" variant="subtitle3" style={{ textTransform: 'capitalize' }}>
        {name}
      </ThemedText>
    </View>
  );
};

export default PokemonType;

const rootStyle = {
  flex: 0,
  height: 20,
  paddingHorizontal: 8,
  borderRadius: 8,
};
