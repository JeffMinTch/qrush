import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';


export default function ImagePickerScreen({ navigation, route }) {

  const apiBaseUrl = Constants.expoConfig.extra.API_BASE_URL;


  const [image, setImage] = useState(null);
  const [showUploadButton, setShowUploadButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Image: " + result.assets[0].uri.base64);
      setImage(result.assets[0].uri);
      setShowUploadButton(false);
    }
  };

  const startSwiping = async () => {
    // Hier sollte Ihre bestehende startSwiping-Logik eingefügt werden
    // Stellen Sie sicher, dass Sie 'image' verwenden, um das ausgewählte Bild zu senden
    try {

      const form = new FormData();
      form.append('picture', {
        // uri: "data:image/jpg;base64," + image,
        uri: image,
        type: 'image/jpg',
        name: 'image.jpg',
      });
      setIsLoading(true);
      console.log(route.params.user);
      console.log("Navigation User:" + route.params.user);
      console.log("Navigation ID:" + route.params.user.uuid);

      // console.log("NAvigation User:" + navigation.user);
      // console.log("User ID:" + navigation.user.uuid);

      const response = await fetch(apiBaseUrl + '/event/pictures/' + route.params.user.uuid, {
        method: 'POST',
        body: form
      });
      setIsLoading(false);
      navigation.navigate('Tab', { user: route.params.user })
    } catch (error) {
      console.error(error);
    }


  };
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF677E" />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        {image && <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />}
        {showUploadButton && (
          <View style={styles.buttonContainer}>
            <Button title="Bild hochladen" onPress={pickImage} />
          </View>
        )}
        {!showUploadButton && (
          <View style={styles.buttonContainer}>
            <Button title="Neues Bild Hochladen" onPress={pickImage} />
            <Button title="Start Swiping" onPress={startSwiping} />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20, // Anpassen Sie die Position nach Bedarf
  },
});
