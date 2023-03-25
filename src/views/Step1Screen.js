
import { StyleSheet, View, Text, Image, Dimensions, Platform, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default function Step1Screen({ navigation }) {
    return (
    //   <ImageBackground source={require('../../assets/background1.png')} resizeMode="cover" style={{flex: 1}}>
        <View style={step1Styles.container}>
            {/* <Image source={require('../../assets/qrush_header.png')} resizeMode="contain" style={step1Styles.header} /> */}

            {/* <Image source={require('../../assets/progress1.png')} resizeMode="contain" style={step1Styles.progressImage} />

            <Text style={[step1Styles.headline, { fontFamily: "GothamRounded-Medium" }]}>Step One</Text> */}
            {/* <Image source={require('../../assets/scan_qr_code_animate.gif')} resizeMode="contain" style={step1Styles.image} /> */}

            {/* <Text style={[step1Styles.text, { fontFamily: "GothamRounded-Medium", marginTop: 20 }]}>1. Find the qrush-QR code on the party.</Text>
            <Text style={[step1Styles.text, { fontFamily: "GothamRounded-Medium" }]}>2. Scan the QR code.</Text>
            <Text style={[step1Styles.title,  { fontFamily: "GothamRounded-Bold", marginTop: 50 }]}>GET</Text> */}
            <View>

                {/* <Text style={[step1Styles.title,  { fontFamily: "GothamRounded-Bold", marginTop: 50}]}>SCAN</Text> */}
                <Text style={[step1Styles.title,  { fontFamily: "GothamRounded-Light" }]}>scan the qr code</Text>
            </View>
            <TouchableOpacity
                style={[step1Styles.firstButton]}
                title="Go to Jane's profile"
                onPress={() =>
                    navigation.navigate('Scan QR code', { name: 'Jane' })
                }
            >
<Ionicons name="ios-qr-code-sharp" size={100} color="#fff" />
                {/* <Text style={[step1Styles.firstButtonText, step1Styles.firstButton, { fontFamily: "GothamRounded-Medium" }]}>Scan QR Code</Text> */}
            </TouchableOpacity>

        </View >
            // </ImageBackground>
    );
}

const step1Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        // marginTop: 40,
        backgroundColor: '#000'
    },
    progressImage: {
        //   width: 350,
        maxWidth: 300,
        height: 30,
        margin: 10
        
    },
    header: {
        width: 200,
        height: 100,
        alignSelf: 'center',
        marginHorizontal: 10,
        margin: 10
    },
    headline: {
        fontSize: 50,
        color: '#41622B',
        marginBottom: 30,
        marginTop: 0,
        alignSelf: 'flex-start',
        marginLeft: 20
    },
    text: {
        fontSize: 22,
        color: '#686868',
        padding: 10,
        textAlign: 'center',
        lineHeight: 30
    },
    // proceedButton: {
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     width: 250,
    //     paddingVertical: 12,
    //     paddingHorizontal: 32,
    //     margin: 16,
    //     borderRadius: 32,
    //     marginTop: 'auto',
    //     backgroundColor: '#fff',
    //     borderColor: '#FF677E',
    //     color: '#FF677E',
    //     elevation: 3
    // },
    // firstButton: {
    // },

    // firstButtonText: {
    //     color: '#FF677E',
    //     fontSize: 24
    // },
    image: {
        width: 400,
        height: 250
    },
     firstButton: {
        
        // marginTop: 50,
        backgroundColor: '#000',
        borderColor: '#000',
        color: '#fff',
        // marginBottom: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        // width: 350,
        paddingVertical: 12,
        paddingHorizontal: 32,
        margin: 16,
        borderRadius: 8,
        elevation: 2,
        // shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,  
    marginTop: 50
        // elevation: 1
    },
    
    firstButtonText: {
        fontSize: 22,
        color: '#fff',
        margin: 'auto'
    },
    title: {
        fontSize: 40,
        marginRight: 'auto',
        color: '#fff'
        
    }
});