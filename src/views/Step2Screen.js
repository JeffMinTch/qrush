import { StyleSheet, View, ImageBackground, Text, Image, Dimensions, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 


export default function Step2Screen({ navigation, route }) {
    return (
    //   <ImageBackground source={require('../../assets/background1.png')} resizeMode="cover" style={{flex: 1}}>

        <View style={step2Styles.container}>
            {/* <Image source={require('../../assets/qrush_header.png')} resizeMode="contain" style={step2Styles.header} /> */}
            {/* <Image source={require('../../assets/progress2.png')} resizeMode="contain" style={step2Styles.progressImage} /> */}
            {/* <ScrollView style={{width: '100%'}}>
                <Text style={[step2Styles.headline, { fontFamily: "GothamRounded-Medium" }]}>Step Two</Text>
                <Image source={require('../../assets/selfie.gif')} resizeMode="cover" style={step2Styles.image} />
                <Text style={[step2Styles.text, { fontFamily: "GothamRounded-Medium", marginTop: 20 }]}>1. Take a picture of yourself.</Text>
                <Text style={[step2Styles.text, { fontFamily: "GothamRounded-Medium" }]}>2. You have 30 minutes to do that, otherwise you must scan the qr code again.</Text>
            </ScrollView> */}
            <View>

                {/* <Text style={[step1Styles.title,  { fontFamily: "GothamRounded-Bold", marginTop: 50}]}>SCAN</Text> */}
                <Text style={[step2Styles.title,  { fontFamily: "GothamRounded-Light" }]}>now take a picture of yourself</Text>
            </View>
            <TouchableOpacity
                style={[step2Styles.firstButton]}
                title="Go to Jane's profile"
                onPress={() =>
                    // console.log("Step 2: User" + this.props.route.params.user)
                    
                    navigation.navigate('Camera', { user: route.params.user })

                }
            >
            <Ionicons name="camera" size={100} color="white" />
                {/* <Text style={[step2Styles.firstButtonText, { fontFamily: "GothamRounded-Medium" }]}>Take A Selfie</Text> */}
            </TouchableOpacity>
        </View >
        // </ImageBackground>

    );
}

const step2Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
        // padding: 5
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
        // alignSelf: 'center',
        textAlign: 'center',
        // marginLeft: 'auto',
        // marginRight: 'auto'
    },
    text: {
        fontSize: 22,
        color: '#686868',
        padding: 10,
        // textAlign: 'center',
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
        fontSize: 22,
        marginRight: 'auto',
        color: '#fff',
        textAlign: 'center'
    }
});