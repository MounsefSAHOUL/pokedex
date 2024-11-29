import React, { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { icons } from '~/constents/icons';
import { useThemeColors } from '~/hooks/useThemeColors';
import ThemedText from './ThemedText';
import Card from './Card';
import Row from './Row';
import Radio from './Radio';

type Props = {
  value: 'id' | 'name';
  onChange: (v: 'id' | 'name') => void;
};

const options = [
  { label: 'Number', value: 'id' },
  { label: 'Name', value: 'name' },
] as const;

const SortButton = ({ value, onChange }: Props) => {
  const colors = useThemeColors();
  const [isModalVisible, setModalVisibility] = useState(false);

  const onButtonPress = () => {
    setModalVisibility(true);
  };
  const onClose = () => {
    setModalVisibility(false);
  };

  return (
    <>
      <Pressable onPress={onButtonPress}>
        <View style={[styles.button, { backgroundColor: colors.grayWhite }]}>
          <Image
            source={value === 'id' ? icons.filterNumber : icons.filterAlpha}
            width={16}
            height={16}
          />
        </View>
      </Pressable>
      <Modal animationType="fade" transparent visible={isModalVisible} onRequestClose={onClose}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={[styles.popup, { backgroundColor: colors.tint }]}>
          <ThemedText style={styles.title} variant="subtitle2" color="grayWhite">
            Sort by :
          </ThemedText>
          <Card style={{ backgroundColor: colors.grayLight, borderColor: colors.grayLight }}>
            {options.map((o) => (
              <Pressable key={o.value} onPress={() => onChange(o.value)}>
                <Row style={styles.rowNumberName} gap={8}>
                  <Radio checked={o.value === value} />
                  <ThemedText variant="body3">{o.label}</ThemedText>
                </Row>
              </Pressable>
            ))}
          </Card>
        </View>
      </Modal>
    </>
  );
};

export default SortButton;

const styles = StyleSheet.create({
  button: {
    height: 32,
    width: 32,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -12,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '100%',
    zIndex: 21,
    position: 'absolute',
  },
  popup: {
    position: 'absolute',
    width: 113,
    // height: 132,
    zIndex: 30,
    padding: 4,
    borderRadius: 12,
    top: 70,
    right: 15,
  },
  rowNumberName: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flex: 0,
    alignContent: 'space-between',
    justifyContent: 'flex-start',
  },
  title: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
  },
});
