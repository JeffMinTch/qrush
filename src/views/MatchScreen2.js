import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import Constants from 'expo-constants';

export default function MatchScreen2({ navigation, route }) {
  const apiBaseUrl = Constants.expoConfig.extra.API_BASE_URL;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(false); // State für den Reload-Status

  const fetchData = async () => {
    try {
      const response = await fetch(apiBaseUrl + '/event/match-cards/' + route.params.user.uuid, {
        method: 'GET',
      });
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Trigger den API-Aufruf, wenn reloadFlag true ist
    if (reloadFlag) {
      setIsLoading(true);
      fetchData();
      setReloadFlag(false); // Setze den Reload-Status zurück
    }
  }, [reloadFlag]);

  const handleReload = () => {
    setReloadFlag(true); // Setze den Reload-Status auf true, um den Effekt auszulösen
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : data && data.length > 0 ? (
        <Swiper
          containerStyle={styles.swiperContainer}
          cards={data}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedRight={openModal}
          overlayLabels={{
            left: {
              element: <Text style={styles.overlayLabel}>NOPE</Text>,
              title: 'NOPE',
            },
            right: {
              element: <Text style={styles.overlayLabel}>LIKE</Text>,
              title: 'LIKE',
            },
          }}
          renderCard={(card) => (
            <View key={card.uuid} style={styles.card}>
              <Image source={{ uri: apiBaseUrl + '/event/image/' + card.uuid }} resizeMode="cover" style={styles.cardImage} />
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No cards available</Text>
          <Button title="Reload" onPress={handleReload} />
        </View>
      )}
      {/* ModalComponent und andere UI-Elemente */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
    fontSize: 24,
    marginTop: 60,
    alignSelf: 'center',
    fontFamily: 'GothamRounded-Light',
  },
  swiperContainer: {
    backgroundColor: 'transparent',
    marginBottom: 50,
    alignSelf: 'flex-start',
  },
  overlayLabel: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#f66773',
  },
  card: {
    backgroundColor: 'white',
    height: '80%',
    width: '100%',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'GothamRounded-Light',
  },
  // Fügen Sie hier Styles für ModalComponent und andere UI-Elemente hinzu
});
