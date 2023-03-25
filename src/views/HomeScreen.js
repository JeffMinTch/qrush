import { StyleSheet, ImageBackground, Text, View, Image, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';




export default function HomeScreen({ navigation }) {
    return (
        <View style={homeStyles.container}>
            {/* <ImageBackground source={require('../../assets/background1.png')} resizeMode="cover" style={{ flex: 1 }}> */}

                <View style={homeStyles.image}>


                    {/* Source: https://storyset.com/illustration/online-dating/bro/animate */}
                    <View>

                        <Image source={require('../../assets/silence.png')} resizeMode="contain" style={homeStyles.logo} />
                    </View>
                    <Text style={{ color: '#fff', fontSize: 80, marginTop: 60, alignSelf: 'center', fontFamily: 'GothamRounded-Light' }}>qrush</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[homeStyles.title, { fontFamily: "GothamRounded-Light" }]}>ARE</Text>
                        <Text style={[homeStyles.title, { fontFamily: "GothamRounded-Light" }]}> YOU</Text>
                        <Text style={[homeStyles.title, { fontFamily: "GothamRounded-Light" }]}> IN?</Text>

                    </View>
                    {/* <Text style={[homeStyles.headline, { fontFamily: "GothamRounded-Medium" }]}>ice breaker</Text> */}
                    {/* <Image source={require('../../assets/dating.png')} style={homeStyles.animatedImage} /> */}
                    {/* <StatusBar style="auto" /> */}


                    <TouchableOpacity
                        style={[homeStyles.button, homeStyles.firstButton]}
                        title="Go to Jane's profile"
                        onPress={() =>
                            navigation.navigate('Step1', { name: 'Jane' })
                        }
                    >
                        <Text style={[homeStyles.firstButtonText, homeStyles.text, { fontFamily: "GothamRounded-Bold" }]}>JOIN PARTY</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                    style={[homeStyles.button, homeStyles.secondButton]}
                    onPress={() => {
                        alert('You tapped the button!');
                    }}
                >
                    <Text style={[homeStyles.text, homeStyles.secondButtonText, { fontFamily: "GothamRounded-Medium" }]}>New Party</Text>
                </TouchableOpacity> */}
                    {/* <Text style={[homeStyles.title,  { fontFamily: "GothamRounded-Medium", fontSize: 28 }]}>Scan QR Code</Text>
                <Text style={[homeStyles.title,  { fontFamily: "GothamRounded-Medium", fontSize: 28 }]}>Take A Real Time Picture</Text>
                <Text style={[homeStyles.title,  { fontFamily: "GothamRounded-Medium", fontSize: 28 }]}>Meet directly.</Text> */}

                </View>
            {/* </ImageBackground> */}
        </View>
    );
}

const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        // backgroundColor: 'green'
    },
    image: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: "center",
backgroundColor: 'black',

        padding: 16,
        // paddingTop: 200
        paddingVertical: 180
        // alignContent: "center"
        // backgroundColor: 'green'
    },
    headline: {
        fontSize: 80,
        // padding: 50,
        // marginTop: 50,
        // marginBottom: 'auto',
        color: 'transparent',
        // marginRight: 'auto'

    },
    animatedImage: {
        width: 300,
        height: 300,
        alignSelf: 'center'
    },
    logo: {
        width: 100,
        height: 100,
        // marginBottom: 30,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 350,
        paddingVertical: 12,
        paddingHorizontal: 32,
        margin: 16,
        // borderRadius: 32,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
    },

    firstButton: {
        marginTop: 50,
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderWidth: 5,
        color: '#FF677E',
        borderRadius: 12,
        // marginBottom: 'auto'
        // elevation: 1
    },

    firstButtonText: {
        fontSize: 22,
        color: '#000',
        fontWeight: 'bold'
    },

    secondButtonText: {
        color: '#fff',

    },

    secondButton: {
        backgroundColor: '#386C5F',
        marginBottom: 'auto',
        borderColor: '#fff',
        elevation: 1

    },
    text: {
        // fontSize: 20,
        fontWeight: '600',
    },
    title: {
        fontSize: 24,
        marginRight: 'auto',
        color: '#fff'

        // color: '#386C5F'

    }

});