import React from 'react';
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

const CardDetails: React.FC<{ closeModal: any }> = ({
  closeModal = () => null,
}) => {
  const mechanic = useSelector((state: any) => state.mechanic);
  return (
    <Modal style={styles.container} animationType={'slide'}>
      <SafeAreaView />
      <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <FlatList
        data={mechanic.mechanicsCards}
        renderItem={({ item }) => (
          <View style={styles.cardItem}>
            {item.img ? (
              <Image
                source={{ uri: item.img }}
                style={styles.cardImage}
                resizeMode={'contain'}
              />
            ) : (
              <></>
            )}
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemName}>
              Mechanics: {item.mechanics.map((item: any) => `${item.name}, `)}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.cardId}
      />
      <SafeAreaView />
    </Modal>
  );
};

export default CardDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardItem: {
    flex: 1,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  cardImage: {
    height: 200,
  },
  closeButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 10,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
  },
});
