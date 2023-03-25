import React, { useEffect, useState } from 'react';
import { View, FlatList, Dimensions, ActivityIndicator, Image } from 'react-native';

const { height, width } = Dimensions.get('window');
const baseUrl = 'http://192.168.178.154:8080/event/';

export default function UserList({ route }) {
  const [userIds, setUserIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageData, setImageData] = useState([]);

  // const state = {
  //   refreshing: false,
  // };

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
      // setTimeout(() => console.log('Timeout'), 1000);
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

  

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000000" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />
      ) : (
        <FlatList
          data={imageData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal={false}
          numColumns={1}
          pagingEnabled={true}
          scrollIndicatorInsets={{ right: 1 }}
          // indicatorStyle="rgba(255, 103, 126, 0.6)'"
          // style={{ backgroundColor: 'rgba(255, 103, 126, 1)' }}
          snapToInterval={height}
          snapToAlignment="start"
          decelerationRate="slow"
          showsVerticalScrollIndicator={true}
          refreshControl={<RefreshControl
            colors={["#9Bd35A", "#689F38"]}
            refreshing={this.props.refreshing}
            onRefresh={this._onRefresh.bind(this)} />}
          // onRefresh={onRefresh}
          // refreshing={state.refreshing}
          // ListHeaderComponent={() => (
          //   <View style={{ alignItems: 'center', marginTop: 16 }}>
          //     {state.refreshing && (
          //       <ActivityIndicator size="large" color="#ff677e" />
          //     )}
          //   </View>
          // )}
        // contentContainerStyle={{backgroundColor: '#000'}}
        />
      )}
    </View>
  );
}