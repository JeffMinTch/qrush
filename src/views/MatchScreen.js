import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import React, { useEffect, useState, useRef } from 'react';
import ModalComponent from './ModalComponent';

const { height, width } = Dimensions.get('window');


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

export default function MatchScreen({ navigation, route }) {

  // matchCards();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {

    // try {
    const datafetch = async () => {
      console.log('Match' + route.params.user.uuid)
      const response = await fetch('http://192.168.178.154:8080/event/match-cards/' + route.params.user.uuid, {
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

  const openModal = () => {
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  return (
    // <ImageBackground source={require('../../assets/background.png')} resizeMode="cover" style={{ width: width, height: height }}>
    <View style={{ flex: 1, backgroundColor: '#000' }}>

      <Text style={{ color: '#fff', fontSize: 24, marginTop: 60, alignSelf: 'center', fontFamily: 'GothamRounded-Light' }}>now find your</Text>
      <Text style={{ color: '#fff', fontSize: 80, marginTop: 10, alignSelf: 'center', fontFamily: 'GothamRounded-Medium' }}>qrush</Text>
      <View>
      {/* <TouchableOpacity onPress={openModal}>
        <Text>Open Modal</Text>
      </TouchableOpacity> */}
      <ModalComponent visible={modalVisible} onClose={closeModal} />
    </View>
        {/* <Image source={require('../../assets/logo_red.png')} style={styles.logo} /> */}
      
      {/* <Image source={require('./assets/qrush_header.png')} resizeMode="contain" style={styles.header} /> */}
      <View style={styles.container}>
        {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> */}
        <Swiper containerStyle={{ backgroundColor: 'transparent', marginBottom: 50, alignSelf: 'flex-start' }}
          cards={data}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedRight={openModal}
          overlayLabels={{
            left: {
              element: <Text style={{ fontSize: 60, fontWeight: 'bold', color: '#f66773' }}>NOPE</Text>, /* Optional */
              title: 'NOPE',
              style: {
                label: {
                  textAlign: 'right',
                  backgroundColor: 'red',
                  borderColor: 'red',
                  color: 'red',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: -30
                }
              }
            },
            right: {
              element: <Text style={{ fontSize: 60, fontWeight: 'bold', color: '#7EF667' }}>LIKE</Text>,
              title: 'LIKE',
              style: {
                label: {
                  // backgroundColor: 'green',
                  // borderColor: 'black',
                  color: 'green',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30
                }
              }
            },
          }}
          renderCard={
            (card) => (
              <View key={card.uuid} style={[{ backgroundColor: 'white', height: '80%', width: '100%', borderRadius: 8 }, styles.cardShadow]}>

                {/* <Text>{card.firstName}</Text> */}
                <Image source={{ uri: 'http://192.168.178.154:8080/event/image/' + card.uuid }} resizeMode="cover" style={styles.cardImage} />
              </View>


            )

          }
        />

        {/* </View> */}
        {/* <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" /> */}
      </View>

    </View >
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    width: 300,
    height: 180,
    marginTop: 180,
},
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8
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