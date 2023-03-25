import { FlatList, View, StyleSheet, Dimensions, Image } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';

const { width, height } = Dimensions.get('window');

const DATA = [
  { id: '1', color: 'red' },
  { id: '2', color: 'blue' },
  { id: '3', color: 'green' },
  { id: '4', color: 'yellow' },
  { id: '5', color: 'purple' },
];

const Item = ({item}) => (
  
  <View style={[styles.item]}>
      <Image source={{ uri: loadImage(item.uuid) }} resizeMode="cover" style={styles.cardImage} />
  </View>
);

const loadImage = (userID) => {
    const url = 'http://192.168.178.154:8080/event/image/' + userID;
    fetch(url)
      .then((response) => response.blob())       
      .then((imageData) => URL.createObjectURL(imageData))
      .catch((error) => console.error(error));
  };

const SnapScroll = ({route}) => {

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    // try {
    const datafetch = async () => {
      // console.log('Match' + route.params.user.uuid)r
      const response = await fetch('http://192.168.178.154:8080/event/match-cards/' + route.params.user.uuid, {
        method: 'GET',
      })
      const data = await response.json();
      setData(data);

      // console.log(data);
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





  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.uuid}
      pagingEnabled={true}
      horizontal={false}
      snapToInterval={height}
      snapToAlignment="start"
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    height: height,
    width: width,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    // borderRadius: 32
  },
});

export default SnapScroll;