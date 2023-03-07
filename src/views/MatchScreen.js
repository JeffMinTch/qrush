import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import React, { useEffect, useState, useRef } from 'react';


const DUMMY_DATA = [
  {
    id: 123,
    firstName: "Elon",
    lastName: "Musk",
    photoUrl: "https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 234,
    firstName: "Mark",
    lastName: "Zuckerberg",
    photoUrl: 'https://media.istockphoto.com/id/1329031407/de/foto/junger-mann-mit-rucksack-macht-selfie-portr%C3%A4t-auf-einem-berg-l%C3%A4chelnder-gl%C3%BCcklicher-kerl-der.jpg?b=1&s=612x612&w=0&k=20&c=IneX1zWKPiWTgx_U9R-92PAYLWZqQrMLdWd4mxlNNe0=',
  },
  {
    id: 435,
    firstName: "Elon",
    lastName: "Musk",
    photoUrl: "https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 985,
    firstName: "Mark",
    lastName: "Zuckerberg",
    photoUrl: 'https://images.pexels.com/photos/1085517/pexels-photo-1085517.jpeg?auto=compress&cs=tinysrgb&w=800',
  }
];

export default function MatchScreen({ navigation }) {

  // matchCards();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    // try {
    const datafetch = async () => {
      const response = await fetch('http://192.168.178.129:8081/event/match-cards/ac4270b0-8725-4281-bcb7-f842868f68ef', {
        method: 'GET',
      })
      const data = await response.json();
      setData(data);

      console.log(data);
      setIsLoading(false);
      // }
    }
    // navigation.navigate('Match', { name: 'Jane' })
    // } catch(error) {
    //     console.error(error);
    // }

    datafetch();

  }, []);

  if (isLoading) return
  'loading';



  return (
    <View style={{ flex: 1 }}>
      <Text style={{ color: '#FF677E', fontSize: 80, marginTop: 48, alignSelf: 'center', fontFamily: 'GothamRounded-Bold' }}>qrush</Text>
      {/* <Image source={require('./assets/qrush_header.png')} resizeMode="contain" style={styles.header} /> */}
      <View style={styles.container}>
        {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> */}
        <Swiper containerStyle={{ backgroundColor: 'transparent', marginBottom: 'auto', alignSelf: 'flex-start' }}
          cards={data}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          renderCard={
            (card) => (
              <View key={card.uuid} style={[{ backgroundColor: 'white', height: '80%', width: '100%', borderRadius: 32 }, styles.cardShadow]}>

                {/* <Text>{card.firstName}</Text> */}
                <Image source={{ uri: 'http://192.168.178.129:8081/event/image/' + card.uuid }} resizeMode="cover" style={styles.cardImage} />
              </View>


            )

          }
        />

        {/* </View> */}
        {/* <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 32
  },
  header: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    marginHorizontal: 10,
    margin: 10
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  }
});