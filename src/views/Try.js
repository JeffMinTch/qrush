import React, { useEffect, useState } from 'react';
import { View, FlatList, Dimensions, ActivityIndicator, Image, RefreshControl } from 'react-native';

const { height, width } = Dimensions.get('window');
const baseUrl = 'http://192.168.178.154:8080/event/';

export default function FlatListScreen({ route }) {
  const [userIds, setUserIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageData, setImageData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${baseUrl}match-cards/${route.params.user.uuid}`);
        const users = await response.json();
        const ids = users.map((user) => user.uuid);
        setUserIds(ids);
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

  async function refreshData() {
    setRefreshing(true);
    setIsLoading(true);
    // setImageData([]);
    // setUserIds([]);
    try {
      const response = await fetch(`${baseUrl}match-cards/${route.params.user.uuid}`);
      const users = await response.json();
      const ids = users.map((user) => user.uuid);
      setUserIds(ids);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }

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

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={imageData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshData}
            colors={['#000000']}
            tintColor={'#000000'}
          />
        }
      />
    </View>
  );
}
