import { TextInput, Image } from 'react-native';
import React from 'react';
import Row from './Row';

import { icons } from '~/constents/icons';
import { useThemeColors } from '~/hooks/useThemeColors';

type Props = {
  value: string;
  onChange: (v: string) => void;
};

const SearchBar = ({ value, onChange }: Props) => {
  const colors = useThemeColors();
  return (
    <Row
      gap={8}
      style={{
        flex: 1,
        height: 32,
        paddingHorizontal: 12,
        backgroundColor: colors.grayWhite,
        marginBottom: 12,
        borderRadius: 16,
      }}>
      <Image source={icons.searchBar} width={16} height={16} style={{ width: 16, height: 16 }} />
      <TextInput
        onChangeText={onChange}
        placeholderTextColor="gray"
        //underlineColorAndroid="green"
        value={value}
        className="h-full flex-1 text-xs leading-4 text-gray-700 focus:text-black"
        //style={styles.textInput}
      />
    </Row>
  );
};

export default SearchBar;
