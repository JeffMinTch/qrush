import React, { useState, useEffect } from 'react';
import { Image, ImageBackground, Text, View, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';



const { width, height } = Dimensions.get('window');


const Reels = ({ route }) => {
  const [images, setImages] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch('http://192.168.178.154:8080/event/match-cards/' + route.params.user.uuid, {
          method: 'GET',
        })
        const myData = await response.json()

        // .then((data) => {
        //   setData(data);
        //   fetchImages(data);
        // });
        setData(myData);

        const fetchedImages = [];
        console.log('Data' + data);
        for (const item of myData) {
          const response = await fetch('http://192.168.178.154:8080/event/image/' + item.uuid, {
            method: 'GET',
          });

          //Response ist schon ein Blob, funktion evtl unnötig
          const imageBlob = await response.blob();
          const imageUrl = URL.createObjectURL(imageBlob);
          fetchedImages.push(imageUrl);
          // setTimeout(() => 
          //   console.log('timeout')
          // , 3000);
          console.log('ImageURL: ' + imageUrl);
        }
        console.log('fetchedImages.length = ' + fetchedImages.length)
        console.log('1');
        setImages(fetchedImages);
        setIsLoading(false);




      } catch (error) {
        console.error(error);
      }
    };

    // const fetchImages = async (data) => {
    //   try {

    //     const fetchedImages = [];
    //     console.log('Data' + data);
    //     for (const item of data) {
    //       const response = await fetch('http://192.168.178.154:8080/event/image/' + item.uuid, {
    //         method: 'GET',
    //       });

    //       const imageBlob = await response.blob();
    //       const imageUrl = URL.createObjectURL(imageBlob);
    //       fetchedImages.push(imageUrl);
    //       console.log('ImageURL: ' + imageUrl);
    //     }
    //     console.log('fetchedImages.length = ' + fetchedImages.length)
    //     console.log('1');
    //     setImages(fetchedImages);
    //     setIsLoading(false);


    //   } catch (error) {
    //     console.log(error)
    //   }
    // }


    fetchData();
  }, []);

  // if (isLoading) return
  // 'loading';

  if (data.length === 0) {
    console.log('Loading');

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: '#000' }}>Loading...</Text>
      </View>
  )
  } 

  // 'loading';

  const renderImage = ({ item }) => {
    console.log('Item: ' + item);
    
    return (
      // <View style={styles.container}>
      //   <View style={styles.listItem}>

      //     <View style={styles.header}>

      //     </View>
      //     <View style={styles.imageContainer}>
      //       <Image source={{ uri: item }} style={styles.image} />
      //     </View>
      //   </View>
      // </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item }} style={styles.image} />
        <View style={{ flexDirection: 'column', width: 120, height: 300, position: 'absolute', right: 0, bottom: 200, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{
            width: 108, height: 108, justifyContent: 'center', alignItems: 'center',
            borderRadius: 50, borderWidth: 8,
            // borderStyle: 'dotted',
            borderColor: '#EAFF00',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 4,
          }}>
            <Image source={require('../../assets/mintchi.jpg')} resizeMode="cover" style={{
              width: 100, height: 100, borderRadius: 100,
            }}></Image>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <TouchableOpacity style={styles.button}>
              {/* <Ionicons name="" size={32} color="#EAFF00" /> */}
              <AntDesign name="like1" size={48} color="white" />
            </TouchableOpacity>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>10+ Likes</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <TouchableOpacity style={styles.button}>
              {/* <Ionicons name="" size={32} color="#EAFF00" /> */}
              <Foundation name="comment" size={48} color="white" />
            </TouchableOpacity>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Comments</Text>
          </View>
        </View>
      </View>
    );

  }

  return (
    // <View style={styles.container}>
    //   <FlatList
    //     data={images}
    //     renderItem={renderImage}
    //     keyExtractor={(item) => item}
    //     numColumns={3}
    //     contentContainerStyle={styles.listContainer}
    //   />
    // </View>
    // <ImageBackground source={require('../../assets/background-transparent.png')} resizeMode="cover" style={{ flex: 1, zIndex: 2, pointerEvents: 'none', position: 'absolute', top: 0,
    // left: 0, width: width, height: height }}>
    <View style={{ flex: 1, position: 'relative' }}>

      <View style={styles.container}>
        <FlatList
          data={images}
          renderItem={renderImage}
          keyExtractor={(item) => item}
          pagingEnabled={true}
          horizontal={false}
          snapToInterval={height}
          snapToAlignment="start"
          decelerationRate="fast"
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.listContainer}
        />
        <View style={styles.footer}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={styles.button}>
              {/* <Ionicons name="" size={32} color="#EAFF00" /> */}
              <Ionicons name="add-circle" size={80} color="#EAFF00" />
            </TouchableOpacity>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add Photo</Text>
          </View>
        </View>
      </View>
      {/* <View style={{
        flex: 1, zIndex: 2, pointerEvents: 'none', position: 'absolute', top: 0,
        left: 0, width: width, height: height
        }} pointerEvents="none">
        <Image source={require('../../assets/background-transparent.png')} resizeMode="cover" style={{
          flex: 1, width: width, height: height,
        }}></Image>

      </View> */}
      <View style={{
        flex: 1, zIndex: 2, pointerEvents: 'none', position: 'absolute', top: 30,
        left: 0, width: width, height: height
      }} pointerEvents="none">
        <Image source={require('../../assets/logo-white.png')} resizeMode="cover" style={{
          width: 300, height: 150,
        }}></Image>

      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    // borderWidth: 16,
    // borderColor: '#EAFF00',
    // borderRadius: 32
    //   borderTopLeftRadius: 64,
    // borderTopRightRadius: 64,
    // opacity: 0.6
  },

  footer: {
    width: '100%',
    height: 120,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },


  // container: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   paddingHorizontal: 20,
  //   height: height,
  //   width: width,
  //   paddingTop: 100,
  //   paddingBottom: 50,
  //   elevation: 2,

  // },
  // listItem: {
  //   width: '100%',
  //   height: '100%',
  //   borderWidth: 2,
  //   borderColor: '#001220',
  //   elevation: 1
  // },
  // header: {
  //   backgroundColor: '#fff',
  //   width: '100%',
  //   height: 120,
  //   borderTopLeftRadius: 8,
  //   borderTopRightRadius: 8,

  // },
  // listContainer: {
  //   backgroundColor: '#fff'
  // },
  imageContainer: {
    flex: 1,
    width: width,
    height: height,
    position: 'relative'


  },
  image: {
    flex: 1,
    // borderRadius: 8,
    width: '100%',
    height: '100%',
    elevation: 1,
    // borderRadius: 100

  },

});

export default Reels;