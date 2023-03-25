
import React, { useEffect, useState, useRef } from 'react';
import {ActivityIndicator, StyleSheet, View, Text, Dimensions, Platform } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { Image, ScrollView, ImageBackground ,Pressable, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';


export default function TakePicScreen({ navigation, route }) {
    //  camera permissions
    const [photo, setPhoto] = useState();
    const [isLoading, setIsLoading] = useState(false);


    const [type, setType] = useState(CameraType.front);
    const [flash, setFlash] = useState(FlashMode.off);
    const [isFlash, setIsFlash] = useState(false);

    let cameraRef = useRef();



    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);

    // Screen Ratio and image padding
    const [imagePadding, setImagePadding] = useState(0);
    const [ratio, setRatio] = useState('4:3');  // default is 4:3
    const { height, width } = Dimensions.get('window');
    //   const screenHeight = Dimensions.get('window').height - 20;
    //   const screenWidth = Dimensions.get('window').width - 20;
    //   const { height, width } = Dimensions.get('window');


    const screenRatio = height / width;
    const [isRatioSet, setIsRatioSet] = useState(false);

    // on screen  load, ask for permission to use the camera
    useEffect(() => {
        async function getCameraStatus() {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status == 'granted');
        }
        getCameraStatus();
    }, []);

    let takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false,
            skipProcessing: true
        };

        // let newPhoto = await cameraRef.current.takePictureAsync(options);
        let newPhoto = await camera.takePictureAsync(options);

        console.log('1');
        const manipResult = await manipulateAsync(
            newPhoto.localUri || newPhoto.uri,
            [{ flip: FlipType.Horizontal }],
            { compress: 0.1, format: SaveFormat.JPEG }
            // 
          );
          console.log('Manip Uri: ' + manipResult.base64);
        setPhoto(manipResult);
    };

    if (photo) {
        // console.log(photo);
        // let sharePic = () => {
        //     shareAsync(photo.uri).then(() => {
        //         console.log('2');
        //         setPhoto(undefined);
        //     });
        // };

        // let savePhoto = () => {
        //     MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        //         setPhoto(undefined);
        //         console.log('3')
        //     });
        // };
        console.log('3');
        if(isLoading) {
            return(
                <ActivityIndicator size="large" color="#FF677E" />
            )
        } else {
            return (
                
      <ImageBackground source={{ uri: photo.localUri || photo.uri }} resizeMode="cover" style={{flex: 1}}>
                <View style={takePicStyles.cameraContainer}>

                    {/* <Image source={require('../../assets/qrush_header.png')} resizeMode="contain" style={takePicStyles.header} /> */}
                    {/* <Image source={require('../../assets/progress3.png')} resizeMode="contain" style={takePicStyles.progressImage} /> */}
                    {/* <ScrollView style={takePicStyles.previewContainer}> */}
                    {/* <Text style={[takePicStyles.headline, { fontFamily: "GothamRounded-Medium" }]}>Final Step</Text> */}
    
                    {/* <View style={takePicStyles.imageWrapper}>
                        <Image resizeMode='cover' style={takePicStyles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                    </View> */}
                        <TouchableOpacity
                        style={[takePicStyles.proceedButton]}
                        title="Go to Jane's profile"
                        onPress={proceed}
                        >
                        <Text style={[takePicStyles.firstButtonText, { fontFamily: "GothamRounded-Medium" }]}>Start Swiping</Text>
                    </TouchableOpacity>

                    {/* </ScrollView> */}
                    {/* <Button title="Share" onPress={sharePic} />
                {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto}  /> : undefined} */}
                    {/* <Button title="Discard" onPress={() => setPhoto(undefined)} />  */}
                    {/* <Pressable
                        style={[takePicStyles.proceedButton]}
                        title="Go to Jane's profile"
                        onPress={() =>
                            navigation.navigate('Scan QR code', { name: 'Jane' })
                        }
                        >
                        <Text style={[takePicStyles.firstButtonText, takePicStyles.text, { fontFamily: "GothamRounded-Medium" }]}>Join Party</Text>
                    </Pressable> */}




                  
                </View>
    </ImageBackground>
            );

        }
    } 
    // else {
        //     return(
    //         <ActivityIndicator size="large" color="#FF677E" />
    //     )
    // }

    function proceed() {
        console.log('Start Swiping')
        startSwiping();

    }

    

    async function startSwiping() {
        try {

            const form = new FormData();
            form.append('picture', {
                uri: "data:image/jpg;base64," + photo.base64,
                type: 'image/jpg',
                name: 'image.jpg',
            });
            setIsLoading(true);
            console.log(route.params.user);
            console.log("Navigation User:" + route.params.user);
            console.log("Navigation ID:" + route.params.user.uuid);

            // console.log("NAvigation User:" + navigation.user);
            // console.log("User ID:" + navigation.user.uuid);

            const response = await fetch('http://192.168.178.154:8080/event/pictures/' + route.params.user.uuid, {
                method: 'POST',
                body: form
            });
            setIsLoading(false);
            navigation.navigate('Reels', { user: route.params.user })
        } catch(error) {
            // console.error(error);
        }


    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    function toggleFlashMode() {
        setFlash(current => (current === FlashMode.off ? FlashMode.on : FlashMode.off));
        setIsFlash(!isFlash);
    }

    // set the camera ratio and padding.
    // this code assumes a portrait mode screen
    const prepareRatio = async () => {
        let desiredRatio = '4:3';  // Start with the system default
        // This issue only affects Android
        if (Platform.OS === 'android') {
            const ratios = await camera.getSupportedRatiosAsync();

            // Calculate the width/height of each of the supported camera ratios
            // These width/height are measured in landscape mode
            // find the ratio that is closest to the screen ratio without going over
            let distances = {};
            let realRatios = {};
            let minDistance = null;
            for (const ratio of ratios) {
                const parts = ratio.split(':');
                const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
                realRatios[ratio] = realRatio;
                // ratio can't be taller than screen, so we don't want an abs()
                const distance = screenRatio - realRatio;
                distances[ratio] = realRatio;
                if (minDistance == null) {
                    minDistance = ratio;
                } else {
                    if (distance >= 0 && distance < distances[minDistance]) {
                        minDistance = ratio;
                    }
                }
            }
            // set the best match
            desiredRatio = minDistance;
            //  calculate the difference between the camera width and the screen height
            const remainder = Math.floor(
                (height - realRatios[desiredRatio] * width) / 2
            );
            // set the preview padding and preview ratio
            setImagePadding(remainder);
            setRatio(desiredRatio);
            // Set a flag so we don't do this 
            // calculation each time the screen refreshes
            setIsRatioSet(true);
        }
    };

    // the camera must be loaded in order to access the supported ratios
    const setCameraReady = async () => {
        if (!isRatioSet) {
            await prepareRatio();
        }
    };

    if (hasCameraPermission === null) {
        return (
            <View style={takePicStyles.information}>
                <Text>Waiting for camera permissions</Text>
            </View>
        );
    } else if (hasCameraPermission === false) {
        return (
            <View style={takePicStyles.information}>
                <Text>No access to camera</Text>
            </View>
        );
    } else {
        return (

            <View style={takePicStyles.container}>
                {/* 
        We created a Camera height by adding margins to the top and bottom, 
        but we could set the width/height instead 
        since we know the screen dimensions
        */}
                <Camera
                    style={[StyleSheet.absoluteFillObject, takePicStyles.cameraPreview, { marginTop: imagePadding, marginBottom: imagePadding }]}
                    onCameraReady={setCameraReady}
                    ratio={ratio}
                    type={type}
                    flashMode={flash}
                    ref={(ref) => {
                        setCamera(ref);
                    }}>
                    <View style={takePicStyles.layer}>
                        {/* <Image source={require('../../assets/tl-edge.png')} style={takePicStyles.tlEdge} />
                        <Image source={require('../../assets/tr-edge.png')} style={takePicStyles.trEdge} />
                        <Image source={require('../../assets/bl-edge.png')} style={takePicStyles.blEdge} />
                        <Image source={require('../../assets/br-edge.png')} style={takePicStyles.brEdge} /> */}
                        <View style={{ flex: 1, flexDirection: 'column', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={takePicStyles.text1}>take a picture of yourself</Text>
                            <View style={takePicStyles.subLayer}>
                                <TouchableOpacity style={takePicStyles.button} onPress={toggleCameraType}>
                                    <Ionicons name="ios-camera-reverse-sharp" size={32} color="white" />
                                </TouchableOpacity>
                                <Pressable style={takePicStyles.cameraButtonContainer} onPress={takePic}>

                                    <Feather name="camera" size={60} color="white" />

                                </Pressable>
                                <TouchableOpacity style={takePicStyles.button} onPress={toggleFlashMode}>
                                    <Ionicons name={flash === FlashMode.off ? 'md-flash-off' : 'md-flash'} size={32} color="white" />
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </Camera>

            </View>

        );
    }
}



const takePicStyles = StyleSheet.create({
    information: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        margin: 0,

    },
    cameraPreview: {
        flex: 1,
        // borderRadius: hp('20%')
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
    text1: {
        color: 'white',
        fontSize: 22,
        marginTop: 30,
        fontFamily: 'GothamRounded-Bold'
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
    cameraContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end'
        // width: '100%',
        // height: '100%',
        
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: 'green'
    },
    previewContainer: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    preview: {
        // alignSelf: 'stretch',
        flex: 1,
        width: '100%',
        height: '100%',
        // margin: 30,
        borderRadius: 8,
        // borderColor: '#FF677E',
        // borderWidth: 8,
        // shadowColor: '#171717',
        // shadowOffset: {width: -2, height: 4},
        // shadowOpacity: 0.2,
        // shadowRadius: 3,
        elevation: 300,
        // borderColor: '#624DB4',
        // borderWidth: 8
    },
    imageWrapper: {
        elevation: 20,
        flex: 1,
        width: '100%',
        height: '100%',
        // width: 300,
        // height: 120,
    },
    proceedButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        paddingVertical: 12,
        paddingHorizontal: 32,
        // margin: 16,
        marginTop: 'auto',
        marginBottom: 50,
        borderRadius: 32,
        marginTop: 10,
        backgroundColor: '#fff',
        borderColor: '#FF677E',
        color: '#FF677E',
        elevation: 3
    },

    firstButton: {
    },

    firstButtonText: {
        color: '#FF677E',
        fontSize: 24
    },
    header: {
        width: 200,
        height: 100,
        alignSelf: 'center',
        marginHorizontal: 10,
        margin: 10
    },
    progressImage: {
        //   width: 350,
        maxWidth: 300,
        height: 30,
        margin: 10,
        marginTop: 30

    },
    headline: {
        fontSize: 50,
        color: '#FF677E',
        marginBottom: 30,
        marginTop: 0,
        alignSelf: 'flex-start',
        marginLeft: 30
    },

});