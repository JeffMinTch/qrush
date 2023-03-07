import { StyleSheet, ImageBackground, Text, View, Image, Button, Pressable, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StatusBar } from 'expo-status-bar';
import { Camera } from 'expo-camera';



export default function QRScannerScreen({ navigation, route }) {

    const [hasPermission, setHasPermission] = React.useState(false);
    const [scanData, setScanData] = React.useState();
    const [isScanned, setIsScanned] = React.useState(false);


    console.log("QR Scaner:" + hasPermission);
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (!hasPermission) {
        console.log("QR Scaner:" + hasPermission);

        return (
            <View style={styles.container}>
                <Text>Please grant camera permissions to app.</Text>
            </View>
        );
    }

    const handleBarCodeScanned = ({ type, data }) => {

        console.log("Handling STarted:" + hasPermission);
        if(!isScanned) {
            registerUser(data);
        }
        // navigation.navigate('Step2', { name: 'Jane' })

        setScanData(data);
        console.log(`Data: ${data}`);
        console.log(`Type: ${type}`);
    };

    const registerUser = async (eventLink) => {
        try {
         const response = await fetch(eventLink, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
        });
         const user = await response.json();
         setIsScanned(true);
         console.log(user);
         navigation.navigate('Step2', { name: 'Jane' })

        //  setData(json.movies);
       } catch (error) {
        console.log('INVALID QR CODE');
         console.error(error);
       } 
    //    finally {
    //      setLoading(false);
    //    }
     }


    return (


        <View style={styles.container}>
        {/* <ImageBackground source={require('../../assets/background1.png')} resizeMode="cover" style={styles.image}> */}
            {/* <View> */}
            {/* </View> */}
            {/* <Image source={require('../../assets/qrush_header.png')} resizeMode="contain" style={styles.header} /> */}
            <Image source={require('../../assets/progress1.png')} resizeMode="contain" style={styles.progressImage} />

            <Text style={[styles.headline, { fontFamily: "GothamRounded-Medium" }]}>Step One</Text>
            <Text style={[styles.description, { fontFamily: "GothamRounded-Medium", marginTop: 0 }]}>Scan the qrush qr-code on your event.</Text>
                {/* <Text style={styles.text1}>Scan QR Code at your event.</Text> */}

            <View style={[styles.wrapper]}>

                {/* <BarCodeScanner
                    style={[styles.barcodeScanner]}
                    onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
                /> */}
                <Camera
                    onBarCodeScanned={handleBarCodeScanned}
                    ratio='16:9'
                    style={[StyleSheet.absoluteFillObject, {marginBottom: 30}]}
                />
                <View style={styles.content}>
                    <Image source={require('../../assets/sight.png')} style={styles.sight} />
                    <Pressable
                        style={[styles.button, styles.firstButton]}
                        title="Go to Jane's profile"
                        onPress={() =>
                            navigation.navigate('Home', { name: 'Jane' })
                        }
                    >
                        <Text style={[styles.firstButtonText, { fontFamily: "GothamRounded-Bold" }]}>Back</Text>
                    </Pressable>

                </View>
            </View>
            {scanData && <Button title='Scan Again?' onPress={() => setScanData(undefined)} />}
            <StatusBar style="auto" />

        {/* </ImageBackground> */}
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20

        // margin: 16
    },
    header: {
        width: 200,
        height: 100,
        alignSelf: 'center',
        marginHorizontal: 10,
        margin: 10
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
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
    
    wrapper: {
        position: 'relative',
        flex: 1,
        // margin: 16,
        // backgroundColor: 'green',
        justifyContent: 'flex-start',
        alignItems: "center",
        width: '95%',
        borderRadius: 8,
        // marginBottom: 30,
        // paddingTop: 10
        // height: '95%',
        alignSelf: 'center',
        marginBottom: 30
    },
    barcodeScanner: {
        alignSelf: 'center',

        position: 'absolute',
        // bottom: -5,
        // width: '90%',
        height: '100%',
        width: '100%',
        // left: 0,
        // right: 0,
        // top: 0,
        // bottom: 0,
        // margin: 'auto'
    },
    sight: {
        width: 250,
        height: 250,
        marginTop: 20
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        paddingVertical: 12,
        paddingHorizontal: 32,
        margin: 16,
        borderRadius: 32
    },

    firstButton: {
        marginTop: 50,
        backgroundColor: '#fff',
        borderColor: '#FF677E',
        color: '#FF677E',
        elevation: 1
    },
    firstButtonText: {
        color: '#FF677E',
        fontSize: 20,
        fontWeight: '600',
    },
    headline: {
        fontSize: 50,
        color: '#FF677E',
        // marginBottom: 30,
        marginTop: 0,
        alignSelf: 'flex-start',
        marginLeft: 10
    },
    progressImage: {
        //   width: 350,
        maxWidth: 300,
        height: 30,
        margin: 10
        
    },
    description: {
        fontSize: 22,
        color: '#686868',
        padding: 10,
        textAlign: 'left',
        // lineHeight: 30
    }

});