import React, { useEffect, useState } from 'react';
import { View, FlatList, Dimensions, ActivityIndicator, Image } from 'react-native';

const { height, width } = Dimensions.get('window');
const baseUrl = 'http://192.168.178.154:8080/event/';

export default function FlatListScreen({ route }) {
  const [userIds, setUserIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageData, setImageData] = useState([]);

  // let userIDArray = [];

  // function userIDs() {
  //   // Getter-Funktion
  //   return userIDArray;
  // }

  // userIDs.set = function (newArray) {
  //   // Setter-Funktion
  //   userIDArray = newArray;
  // }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${baseUrl}match-cards/${route.params.user.uuid}`);
        const users = await response.json();
        const ids = users.map((user) => user.uuid);
        const uniqueIds = [...new Set(ids)]; // Entfernen von Duplikaten
        setUserIds(uniqueIds);
        // userIDs.set(ids);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchImages() {
      const promises = userIds.map(async (id) => {
        try {
          const response = await fetch(`${baseUrl}image/${id}`);
          const image = await response.blob();
          const dataUrl = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(image);
          });
          setImageData((prevState) => [...prevState, { id, dataUrl }]);
        } catch (error) {
          console.error(error);
        }
      });
      await Promise.all(promises);
    }
    if (userIds.length > 0) {
      fetchImages();
    }
  }, [userIds]);

  function renderItem({ item }) {
    const { id, dataUrl } = item;
    return (
      <View style={{ width: width, height: height }}>
        {dataUrl ? (
          <Image source={{ uri: dataUrl }} style={{ height, width }} />
        ) : (
          <ActivityIndicator size="large" color="#000000" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />
        )}
      </View>
    );
  }

  async function refreshData() {
    setIsLoading(true);
    setImageData([]);
    setUserIds([]);
    try {
      const response = await fetch(`${baseUrl}match-cards/${route.params.user.uuid}`);
      const users = await response.json();
      const ids = users.map((user) => user.uuid);
      const uniqueIds = [...new Set(ids)]; // Entfernen von Duplikaten
      setUserIds(uniqueIds);
      // userIDs.set(ids);

      
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={imageData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshing={isLoading}
        onRefresh={refreshData}
        numColumns={1}
        pagingEnabled={true}
        scrollIndicatorInsets={{ right: 1 }}
        // indicatorStyle="rgba(255, 103, 126, 0.6)'"
        // style={{ backgroundColor: 'rgba(255, 103, 126, 1)' }}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="slow"
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
}