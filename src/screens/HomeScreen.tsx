import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setMechanics, setMechanicsCards } from '../actions/mechanic-actions';
import CardDetails from '../components/CardDetails';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const mechanics = useSelector((state: any) => state.mechanic);

  const [loader, setLoader] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [cards, setCards] = useState<any>([]);
  const [showCardsModal, setShowCardsModal] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const request = await fetch(
      'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards',
      {
        headers: {
          'x-rapidapi-key':
            'ab931ea8c8msh10de1500c2e59a4p158158jsn45bff3d69bbf',
          'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
        },
      }
    );
    const results = await request.json();
    _getUniqeMechanics(results);
    setLoader(false);
  };

  const _getUniqeMechanics = (allData: any) => {
    let clearData: any[] = [];
    let dataThatHasMechanics: any[] = [];
    Object.keys(allData).map((item) => {
      let currentItem = allData[item].filter((x: any) => x.mechanics);
      if (currentItem.length) {
        currentItem.map((x: any) => {
          dataThatHasMechanics.push(x);
          x.mechanics.map((mech: any) => {
            if (!_itIsExist(clearData, mech, 'name')) {
              clearData.push(mech);
            }
          });
        });
      }
    });
    setCards(dataThatHasMechanics);
    dispatch(setMechanics(clearData));
  };

  const _itIsExist = (data: any[], item: any, key: string): boolean =>
    data.filter((x: any) => x[key] === item[key]).length ? true : false;

  const _getCardsOfMechanics = (mechanic: object) => {
    let clearCards: any[] = [];
    cards.map((item: any) => {
      if (_itIsExist(item.mechanics, mechanic, 'name')) {
        clearCards.push(item);
      }
    });
    dispatch(setMechanicsCards(clearCards));
    setShowCardsModal(true);
  };

  if (loader) {
    return (
      <View style={styles.loaderCont}>
        <ActivityIndicator size="large" color={'blue'} />
        <Text>Veriler yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showCardsModal && (
        <CardDetails
          closeModal={() => {
            dispatch(setMechanicsCards([]));
            setShowCardsModal(false);
          }}
        />
      )}
      <SafeAreaView />
      <TextInput
        style={styles.input}
        placeholder={'Ara...'}
        placeholderTextColor={'gray'}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <FlatList
        data={mechanics.mechanics.filter((x: any) =>
          x.name.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.mechanicItem}
            activeOpacity={0.7}
            onPress={() => _getCardsOfMechanics(item)}
          >
            <Text style={styles.mechanicItemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
      <SafeAreaView />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 50,
    margin: 10,
    borderRadius: 20,
    padding: 10,
    textAlign: 'left',
    color: 'black',
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  loaderCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mechanicItem: {
    height: 50,
    padding: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: 'lightgray',
    justifyContent: 'center',
  },
  mechanicItemText: {
    fontSize: 16,
  },
});
