import { Audio } from 'expo-av';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import PagerView from 'react-native-pager-view';

import Card from '~/components/Card';
import RootView from '~/components/RootView';
import Row from '~/components/Row';
import ThemedText from '~/components/ThemedText';
import PokemonSpec from '~/components/pokemon/PokemonSpec';
import PokemonStat from '~/components/pokemon/PokemonStat';
import PokemonType from '~/components/pokemon/PokemonType';
import { Colors } from '~/constents/Colors';
import { images } from '~/constents/Images';
import { icons } from '~/constents/icons';
import { formatSize, formatWeight, getPokemonArtwork } from '~/functions/pokemon';
import { useFetchQuery } from '~/hooks/useFetchQuery';
import { useThemeColors } from '~/hooks/useThemeColors';

const Pokemon = () => {
  const params = useLocalSearchParams() as { id: string };
  const [id, setId] = useState(parseInt(params.id, 10));
  const offset = useRef(1);
  const pager = useRef<PagerView>(null);

  const onPageSelected = (e: { nativeEvent: { position: number } }) => {
    offset.current = e.nativeEvent.position - 1;
  };

  const onPageScrollStateChanged = (e: { nativeEvent: { pageScrollState: string } }) => {
    if (e.nativeEvent.pageScrollState === 'idle' && offset.current === 0) {
      return;
    }

    if (offset.current === -1 && id === 2) {
      return;
    }

    if (e.nativeEvent.pageScrollState === 'idle' && offset.current === 1) {
      setId(id + offset.current);
      offset.current = 0;
      pager.current?.setPageWithoutAnimation(1);
    }
  };

  return (
    <PagerView
      ref={pager}
      onPageSelected={onPageSelected}
      onPageScrollStateChanged={onPageScrollStateChanged}
      initialPage={1}
      style={{ flex: 1 }}>
      <PokemonView key={id - 1} id={id - 1} />
      <PokemonView key={id} id={id} />
      <PokemonView key={id + 1} id={id + 1} />
    </PagerView>
  );
};

const PokemonView = ({ id }: { id: number }) => {
  const colors = useThemeColors();
  const { data: pokemon } = useFetchQuery('/pokemon/[id]', { id: id });
  const { data: spacies } = useFetchQuery('/pokemon-species/[id]', { id: id });
  const idParsed = parseInt(id.toString(), 10);
  const mainType = pokemon?.types?.[0].type.name;
  const colorType = mainType ? Colors.type[mainType] : colors.tint;
  const types = pokemon?.types ?? [];
  const bio = spacies?.flavor_text_entries
    ?.find(({ language }) => language.name === 'en')
    ?.flavor_text.replaceAll('\n', '.');

  //console.log(pokemon?.stats);

  const onImagePress = async () => {
    const cry = pokemon?.cries.latest;
    if (!cry) {
      return;
    }
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: cry,
      },
      { shouldPlay: true }
    );
    sound.playAsync();
  };

  const onPrevious = async () => {
    router.replace({ pathname: '/pokemon/[id]', params: { id: Math.max(idParsed - 1, 1) } });
  };
  const onNext = async () => {
    router.replace({ pathname: '/pokemon/[id]', params: { id: Math.min(idParsed + 1, 151) } });
  };
  return (
    <RootView backgroundColor={colorType}>
      <View>
        <Image style={styles.pokeball} width={208} height={208} source={images.poketballArtWork} />
        <Row style={styles.header}>
          <Pressable onPress={router.back}>
            <Row gap={8}>
              <Image source={icons.Back} width={32} height={32} />
              <ThemedText
                color="grayWhite"
                variant="headLine"
                style={{ textTransform: 'capitalize' }}>
                {pokemon?.name}
              </ThemedText>
            </Row>
          </Pressable>
          <ThemedText color="grayWhite" variant="subtitle2">
            #{id.toString().padStart(3, '0')}
          </ThemedText>
        </Row>
        <View style={styles.body}>
          <Row style={{ alignSelf: 'center', width: '100%', justifyContent: 'space-between' }}>
            {id === 1 ? (
              <View style={{ width: 24, height: 24 }} />
            ) : (
              <Pressable onPress={onPrevious}>
                <Image width={24} height={24} source={icons.backPokemon} />
              </Pressable>
            )}

            <Pressable onPress={onImagePress}>
              <Image
                source={{
                  uri: getPokemonArtwork(id.toString()),
                }}
                resizeMode="contain"
                width={200}
                height={200}
                style={{
                  height: 200,
                  width: 200,
                }}
              />
            </Pressable>

            {id === 151 ? (
              <View style={{ width: 24, height: 24 }} />
            ) : (
              <Pressable onPress={onNext}>
                <Image width={24} height={24} source={icons.nextPokemon} />
              </Pressable>
            )}
          </Row>

          <Card
            style={{
              backgroundColor: '#FFF',
              borderColor: '#FFF',
              marginTop: -60,
              zIndex: -1,
              paddingHorizontal: 20,
              paddingTop: 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Row className="flex-row" gap={16}>
              {types.map((type) => (
                <PokemonType key={type.type.name} name={type.type.name} />
              ))}
            </Row>
            <ThemedText variant="subtitle1" style={{ color: colorType, marginVertical: 16 }}>
              About
            </ThemedText>
            <Row>
              <PokemonSpec
                title={formatWeight(pokemon?.weight!)}
                description="Weight"
                image={icons.iconWeight}
                style={{ borderStyle: 'solid', borderRightWidth: 1, borderColor: colors.grayLight }}
              />
              <PokemonSpec
                title={formatSize(pokemon?.height!)}
                description="Size"
                image={icons.iconHeight}
                style={{ borderStyle: 'solid', borderRightWidth: 1, borderColor: colors.grayLight }}
              />
              <PokemonSpec
                title={pokemon?.moves
                  .slice(0, 2)
                  .map((m) => m.move.name)
                  .join('\n')}
                description="Moves"
              />
            </Row>
            <ThemedText variant="body3" style={{ marginBottom: 20, marginTop: 20 }}>
              {bio}
            </ThemedText>
            <ThemedText variant="subtitle1" style={{ color: colorType }}>
              Base Stats
            </ThemedText>
            <View style={{ marginTop: 21, marginBottom: 21, alignSelf: 'stretch' }}>
              {pokemon?.stats.map((stat) => (
                <PokemonStat
                  key={stat.stat.name}
                  name={stat.stat.name}
                  value={stat.base_stat}
                  color={colorType}
                />
              ))}
            </View>
          </Card>
        </View>
      </View>
    </RootView>
  );
};

export default Pokemon;

const styles = StyleSheet.create({
  header: {
    margin: 20,
    justifyContent: 'space-between',
  },
  imageRow: {},
  pokeball: {
    opacity: 0.1,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: -1,
  },
  body: {
    margin: 9,
  },
});
