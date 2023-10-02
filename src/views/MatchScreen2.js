import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import Constants from 'expo-constants';
import ModalComponent from './ModalComponent';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs'; // hinzugefügt

var stompClient = null;
export default function MatchScreen2({ navigation, route }) {
  
  const apiBaseUrl = Constants.expoConfig.extra.API_BASE_URL;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(true); // State für den Reload-Status
  const [privateChats, setPrivateChats] = useState(new Map());
  const [receiverName, setReceiverName] = useState(null);
  const [senderName, setSenderName] = useState(null);


  const [userData, setUserData] = useState({
    username: route.params.user.uuid,
    receivername: '',
    connected: false,
    message: ''
  });

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

  useEffect(() => {
    console.log("Web Socket Init")
    const connectToWebSocketServer = () => {
      const sock = new SockJS(apiBaseUrl + '/ws');
      stompClient = Stomp.over(sock);
      stompClient.connect({}, onConnected, onError);
    };

    connectToWebSocketServer();
  }, []);

  
  const onConnected = () => {
    console.log("Web Socket Connected")
    setUserData({ ...userData, "connected": true });
    stompClient.subscribe('/chatroom/public', onMessageReceived);
    stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
    userJoin();
  }

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN"
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  }

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        // if(!privateChats.get(payloadData.senderName)){
        //     privateChats.set(payloadData.senderName,[]);
        //     setPrivateChats(new Map(privateChats));
        // }
        if (payloadData.senderName !== userData.username) {
          console.log("New User Joins");
          // swipeRef.ser
          // swipeRef.data = [...data, payloadData.senderName]
          // setData([...reloadData, payloadData.senderName]);
          // setData(prevData => [...prevData, payloadData.senderName]);
          console.log(data);

        }
        break;
      case "LEAVE":
        const newData = data.filter(obj => obj !== payloadData.senderName);
        setData(newData);
        console.log('User Leaves');
        // publicChats.push(payloadData);
        // setPublicChats([...publicChats]);
        break;
    }
  }


  const handleReload = () => {
    setReloadFlag(true); // Setze den Reload-Status auf true, um den Effekt auszulösen
  };

  const openModal = (receiverName, senderName) => {
    setReceiverName(receiverName); // Assuming you have state for receiverName in your component
    setSenderName(senderName); 
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const onPrivateMessage = (payload) => {
    // console.log(payload);
    var payloadData = JSON.parse(payload.body);
    console.log('Open Modal');
    console.log('Receiver Name' + payloadData.receiverName);
    console.log('Receiver Name' + payloadData.senderName);

    openModal(payloadData.receiverName, payloadData.senderName);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  }

  const onError = (err) => {
    console.log(err);

  }



  const sendPrivateValue = (receiverName, message) => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: receiverName,
        message: message,
        status: "MESSAGE"
      };


      console.log(stompClient.status);
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, "message": "" });
    }
  }

  const onSwipeLeft = (cardIndex) => {
    // openModal()
  }


  const onSwipeRight = (cardIndex) => {
    const matcherId = route.params.user.uuid;
    const matchStatus = 'INTERESTED';
    const matcheeId = data[cardIndex].uuid;

    const form = new FormData();
    form.append('matchStatus', matchStatus);

    sendPrivateValue(matcheeId, matchStatus);
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <Text style={{ color: '#fff', fontSize: 24, marginTop: 60, alignSelf: 'center', fontFamily: 'GothamRounded-Light' }}>now find your</Text>
      <Text style={{ color: '#fff', fontSize: 80, marginTop: 10, alignSelf: 'center', fontFamily: 'GothamRounded-Medium' }}>qrush</Text>
      <View>
        <ModalComponent visible={modalVisible} onClose={closeModal} receiverName={receiverName} senderName={senderName}/>
      </View>
      <View style={styles.container}>
        {isLoading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : data && data.length > 0 ? (
          <View style={[styles.container, {}]}>
            <Swiper
              containerStyle={styles.swiperContainer}
              cards={data}
              stackSize={5}
              cardIndex={0}
              animateCardOpacity
              verticalSwipe={false}
              onSwipedRight={onSwipeRight}
              // onSwipedLeft={onSwipeLeft}
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
              renderCard={(card) => (
                <View key={card.uuid} style={styles.card}>
                  <Image source={{ uri: apiBaseUrl + '/event/image/' + card.uuid }} resizeMode="cover" style={styles.cardImage} />
                </View>
              )}
            />
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No cards available</Text>
            <Button title="Reload" onPress={handleReload} />
          </View>
        )}
      </View>
      {/* ModalComponent und andere UI-Elemente */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
