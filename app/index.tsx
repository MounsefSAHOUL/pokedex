import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Card from '~/components/Card';
import RootView from '~/components/RootView';
import Row from '~/components/Row';
import SearchBar from '~/components/SearchBar';
import SortButton from '~/components/SortButton';
import ThemedText from '~/components/ThemedText';
import PokemonCard from '~/components/pokemon/PokemonCard';
import { images } from '~/constents/Images';
import { getPokemonId } from '~/functions/pokemon';
import { useInfiniteFetchQuery } from '~/hooks/useFetchQuery';
import { useThemeColors } from '~/hooks/useThemeColors';

const Home = () => {
  const colors = useThemeColors();
  const { data, isFetching, fetchNextPage } = useInfiniteFetchQuery('/pokemon?limit=21');
  const pokemons =
    data?.pages.flatMap((page) =>
      page.results.map((r) => ({ name: r.name, id: getPokemonId(r.url) }))
    ) ?? [];
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'id' | 'name'>('id');
  const fitlerPokemons = [
    ...(search
      ? pokemons.filter((p) => p.name.includes(search.toLowerCase()) || p.id.toString() === search)
      : pokemons),
  ].sort((a, b) => (a[sortKey] < b[sortKey] ? -1 : 1));

  //console.log(data);

  return (
    <RootView>
      <Row gap={16} style={{ paddingHorizontal: 8, paddingTop: 12, marginBottom: 8 }}>
        <Image resizeMode="contain" source={images.PokeBall} width={24} height={24} />
        <ThemedText variant="headLine" color="grayLight">
          Pokédex
        </ThemedText>
      </Row>
      <Row
        style={{
          paddingHorizontal: 8,
          paddingBottom: 24,
        }}
        gap={16}>
        <SearchBar value={search} onChange={setSearch} />
        <SortButton value={sortKey} onChange={setSortKey} />
      </Row>
      <Card className="flex-1 bg-white">
        <FlatList
          data={fitlerPokemons}
          numColumns={3}
          contentContainerClassName="gap-2 m-1"
          columnWrapperClassName="gap-2"
          onEndReached={search ? undefined : () => fetchNextPage()}
          renderItem={({ item }) => (
            <PokemonCard id={item.id} name={item.name} style={{ flex: 1 / 3 }} />
          )}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={isFetching ? <ActivityIndicator color={colors.tint} /> : null}
        />
      </Card>
    </RootView>
  );
};

export default Home;

// const styles = StyleSheet.create({
//   gridGap: {
//     gap: 8,
//   },
// });
