import { Image, ImageSourcePropType, StyleSheet, Text, View, ViewProps } from 'react-native';
import React from 'react';
import Row from '../Row';
import ThemedText from '../ThemedText';

type Props = ViewProps & {
  title?: string;
  description?: string;
  image?: ImageSourcePropType;
};

const PokemonSpec = ({ style, image, title, description, ...rest }: Props) => {
  return (
    <View style={[style, styles.root]} {...rest}>
      <Row style={styles.row}>
        {image && <Image source={image} width={16} height={16} />}
        <ThemedText style={{ marginLeft: 4 }}>{title}</ThemedText>
      </Row>
      <ThemedText variant="caption" color="grayMedium">
        {description}
      </ThemedText>
    </View>
  );
};

export default PokemonSpec;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 4,
    alignItems: 'center',
    width: '100%',
  },
  row: {
    height: 32,
    alignItems: 'center',
  },
});
