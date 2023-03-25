import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, Dimensions, ActivityIndicator, Image } from 'react-native';

const { height, width } = Dimensions.get('window');
const baseUrl = 'http://192.168.178.154:8080/event/';

export default function MagneticSnapScroll({ route }) {
  const [userIds, setUserIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageData, setImageData] = useState([]);
  const requestRef = useRef(null);

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
          setImageData((prevState) => {
            if (!prevState.some((item) => item.id === id)) {
              return [...prevState, { id, dataUrl }];
            } else {
              return prevState.map((item) => {
                if (item.id === id) {
                  return { ...item, dataUrl };
                } else {
                  return item;
                }
              });
            }
          });
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

  let ref = false;

  async function refreshData() {
    if (ref) {
      return;
    }
    ref= true;
    // requestRef.current = true;
    setIsLoading(true);
    setImageData([]);
    try {
      const response = await fetch(`${baseUrl}match-cards/${route.params.user.uuid}`);
      const users = await response.json();
      const ids = users.map((user) => user.uuid);
      setUserIds(ids);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    //   requestRef.current = false;
      ref = false;
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
      />
    </View>
  );
}
