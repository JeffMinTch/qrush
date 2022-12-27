import { StyleSheet, ImageBackground, Text, View, Image, Button, Pressable, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { Asset } from 'expo-asset';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
// import { Ionicons } from '@expo/vector-icons'; 



export default function CameraScreen({ navigation, route }) {



    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState();
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);

    if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>
    }

    let takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false,
            skipProcessing: true
        };

        // let newPhoto = await cameraRef.current.takePictureAsync(options);
        let newPhoto = await cameraRef.current.takePictureAsync(options);

        console.log('1');
        setPhoto(newPhoto);
        console.log(photo);
    };

    if (photo) {
        console.log(photo);
        let sharePic = () => {
            shareAsync(photo.uri).then(() => {
                console.log('2');
                setPhoto(undefined);
            });
        };

        let savePhoto = () => {
            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto(undefined);
                console.log('3')
            });
        };
        console.log('3');
        return (
            <SafeAreaView style={styles.cameraContainer}>
                <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                {/* <Button title="Share" onPress={sharePic} />
                {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
                <Button title="Discard" onPress={() => setPhoto(undefined)} /> */}
            </SafeAreaView>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    return (
        <View style={styles.image}>

            {/* <ImageBackground source={require('../../assets/background1.png')} resizeMode="cover" style={styles.image}> */}
            {/* <Text>Take a real picture of yourself</Text> */}
            {/* <View> */}
            <Image source={require('../../assets/qrush_header.png')} resizeMode="contain" style={styles.header} />

            <View style={styles.container}>
                <Camera style={[styles.cameraContainer, StyleSheet.absoluteFillObject]} ref={cameraRef} type={type}
                    ratio="16:9" focusDepth={1}>
                    <StatusBar style="auto" />
                </Camera>
                <View style={styles.layer}>
                    <Image source={require('../../assets/tl-edge.png')} style={styles.tlEdge} />
                    <Image source={require('../../assets/tr-edge.png')} style={styles.trEdge} />
                    <Image source={require('../../assets/bl-edge.png')} style={styles.blEdge} />
                    <Image source={require('../../assets/br-edge.png')} style={styles.brEdge} />
                    <Text style={styles.text1}>Take a picture of yourself</Text>
                    <View style={styles.subLayer}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                            <Ionicons name="ios-camera-reverse-sharp" size={32} color="white" />
                        </TouchableOpacity>
                        <Pressable style={styles.cameraButtonContainer} onPress={takePic}>
                            {/* <Button title="" onPress={takePic} />
                        <TouchableOpacity
                            onPress={takePic}
                            style={styles.cameraButton}>
                        </TouchableOpacity> */}
                            {/* <View style={styles.cameraButton}> */}
                            <Feather name="camera" size={60} color="white" />
                            {/* <Text style={[styles.text1, { fontFamily: "GothamRounded-Medium" }]}>Take Pic</Text> */}
                            {/* </View> */}
                        </Pressable>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                            <Ionicons name="md-flash-off" size={32} color="white" />
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={styles.content}>
                    {/* <Image source={require('../../assets/sight.png')} style={styles.sight} /> */}
                </View>
            </View>
            {/* </View> */}
            {/* </ImageBackground> */}
        </View>

    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        width: 200,
        height: 100,
        alignSelf: 'center',
        marginHorizontal: 10,
        margin: 10
    },
    navContainer: {
        backgroundColor: '#FF677E'
    },
    content: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',

        backgroundColor: 'red',
        width: '100%',
        height: '100%',
        marginBottom: 30

    },

    text1: {
        color: 'white',
        fontSize: 20,
        marginBottom: 10,
        fontFamily: 'GothamRounded-Bold'
    },

    sight: {
        width: 250,
        height: 250,
        // marginTop: 20
    },



    text: {
        fontSize: 12,
        lineHeight: 21,
        fontWeight: 'light',
        letterSpacing: 0.25,
        color: 'white',
    },

    container: {
        flex: 1,
        width: "95%",
        height: "95%",
        marginBottom: 30
        //   backgroundColor: '#fff',
        //   alignItems: 'center',
        //   justifyContent: 'center',
        // margin: 16,
        // marginBottom: 80
    },
    layer: {
        // backgroundColor: 'green',
        width: '100%',
        height: '100%',
        position: 'relative',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 0,
        paddingTop: 40
    },
    subLayer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    tlEdge: {
        position: 'absolute',
        left: 10,
        top: 10,
        width: 80,
        height: 80
    },
    trEdge: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 80,
        height: 80
    },
    blEdge: {
        position: 'absolute',
        left: 10,
        bottom: 100,
        width: 80,
        height: 80
    },
    brEdge: {
        position: 'absolute',
        right: 10,
        bottom: 100,
        width: 80,
        height: 80
    },
    // cameraContainer: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   // backgroundColor: '#FF677E'
    // },
    // camera: {
    //   margin: 8,
    //   flex: 1,
    // },
    // cameraText: {
    //   color: 'black',
    //   fontSize: 24,
    //   fontWeight: 'bold',
    // },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },


    cameraContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'green'
    },
    cameraButtonContainer: {
        backgroundColor: '#FF677E',
        // alignSelf: 'flex-start',
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        // marginTop: 'auto',
        // marginBottom: 20,
        borderWidth: 5,
        borderColor: '#FF677E',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        // border: ''
    },
    cameraButton: {
        width: 44,
        height: 44,
        borderRadius: 100,
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1
    }

});