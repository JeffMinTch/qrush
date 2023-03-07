import { StyleSheet, View, Text, Image, Dimensions, Platform, TouchableOpacity, ScrollView } from 'react-native';


export default function Step2Screen({ navigation }) {
    return (
        <View style={step2Styles.container}>
            {/* <Image source={require('../../assets/qrush_header.png')} resizeMode="contain" style={step2Styles.header} /> */}
            <Image source={require('../../assets/progress2.png')} resizeMode="contain" style={step2Styles.progressImage} />
            <ScrollView style={{width: '100%'}}>
                <Text style={[step2Styles.headline, { fontFamily: "GothamRounded-Medium" }]}>Step Two</Text>
                <Image source={require('../../assets/selfie.gif')} resizeMode="cover" style={step2Styles.image} />
                <Text style={[step2Styles.text, { fontFamily: "GothamRounded-Medium", marginTop: 20 }]}>1. Take a picture of yourself.</Text>
                <Text style={[step2Styles.text, { fontFamily: "GothamRounded-Medium" }]}>2. You have 30 minutes to do that, otherwise you must scan the qr code again.</Text>
            </ScrollView>
            <TouchableOpacity
                style={[step2Styles.proceedButton]}
                title="Go to Jane's profile"
                onPress={() =>
                    navigation.navigate('Camera', { name: 'Jane' })
                }
            >
                <Text style={[step2Styles.firstButtonText, { fontFamily: "GothamRounded-Medium" }]}>Take A Selfie</Text>
            </TouchableOpacity>
        </View >
    );
}

const step2Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // padding: 20
    },
    progressImage: {
        //   width: 350,
        maxWidth: 300,
        height: 30,
        margin: 10,
        marginTop: 30

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