import { Link } from 'expo-router';
import React from 'react';
import { View, Text, ViewStyle, Image, Pressable } from 'react-native';

import Card from '../Card';
import ThemedText from '../ThemedText';

import { getPokemonArtwork } from '~/functions/pokemon';
import { useThemeColors } from '~/hooks/useThemeColors';

type Props = {
  style?: ViewStyle;
  id: number;
  name: string;
};

const PokemonCard = ({ style, id, name }: Props) => {
  const colors = useThemeColors();
  return (
    <Link href={{ pathname: '/pokemon/[id]', params: { id: id } }} asChild>
      <Pressable style={style} android_ripple={{ color: colors.tint, foreground: true }}>
        <Card className="border-1 relative items-center overflow-hidden border-gray-50">
          <View
            className="absolute left-0 
                    right-0 h-[44px] 
                    rounded-lg
                    
                    "
            style={{ backgroundColor: colors.grayBackground, bottom: -4, zIndex: -1 }}
          />
          <ThemedText className="mr-1 mt-1 self-end" variant="caption" color="grayMedium">
            #{id.toString().padStart(3, '0')}
          </ThemedText>
          <Image
            source={{
              uri: getPokemonArtwork(id.toString()),
            }}
            resizeMode="contain"
            width={72}
            height={72}
            style={{
              height: 72,
              width: 72,
            }}
          />
          <ThemedText>{name}</ThemedText>
        </Card>
      </Pressable>
    </Link>
  );
};

export default PokemonCard;
