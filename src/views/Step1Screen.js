
import { StyleSheet, View, Text, Image, Dimensions, Platform, TouchableOpacity } from 'react-native';


export default function Step1Screen({ navigation }) {
    return (
        <View style={step1Styles.container}>
            {/* <Image source={require('../../assets/qrush_header.png')} resizeMode="contain" style={step1Styles.header} /> */}
            <Image source={require('../../assets/progress1.png')} resizeMode="contain" style={step1Styles.progressImage} />

            <Text style={[step1Styles.headline, { fontFamily: "GothamRounded-Medium" }]}>Step One</Text>
            <Image source={require('../../assets/scan_qr_code_animate.gif')} resizeMode="cover" style={step1Styles.image} />

            <Text style={[step1Styles.text, { fontFamily: "GothamRounded-Medium", marginTop: 20 }]}>1. Find the qrush-QR code on the party.</Text>
            <Text style={[step1Styles.text, { fontFamily: "GothamRounded-Medium" }]}>2. Scan the QR code.</Text>
            <TouchableOpacity
                style={[step1Styles.proceedButton]}
                title="Go to Jane's profile"
                onPress={() =>
                    navigation.navigate('Scan QR code', { name: 'Jane' })
                }
            >
                <Text style={[step1Styles.firstButtonText, { fontFamily: "GothamRounded-Medium" }]}>Scan QR Code</Text>
            </TouchableOpacity>
        </View >
    );
}

const step1Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20
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
        color: '#FF677E',
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
    proceedButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        paddingVertical: 12,
        paddingHorizontal: 32,
        margin: 16,
        borderRadius: 32,
        marginTop: 'auto',
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
    image: {
        width: 400,
        height: 250
    }
});