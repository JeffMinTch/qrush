import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import ImageList from '../components/ImageList';




const ScrollView = ({ route }) => {
    const API_URL = 'http://192.168.178.154:8080/event/match-cards/' + route.params.user.uuid;
  const [ids, setIds] = useState([]);

  const fetchImages = async (setIds) => {
    try { 
        const response = await fetch(API_URL, {
          method: 'GET',
        });
        // const data = await response.json();
      const json = await response.json();
      const imageIds = json.map(item => item.uuid);
      setIds(imageIds);
  } catch (error) {
      console.error(error);
  }
  };

  useEffect(() => {
    fetchImages(setIds) 
  }, []);

  const baseUri = `${API_URL}`;

  return (
    <View style={{ flex: 1 }}>
      {ids.length > 0 && (
        <ImageList ids={ids} baseUri={baseUri} />
      )}
    </View>
  );
};

export default ScrollView;