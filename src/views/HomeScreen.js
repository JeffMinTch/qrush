import { StyleSheet, ImageBackground, Text, View, Image, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';




export default function HomeScreen({ navigation }) {
    return (
        <View style={homeStyles.container}>
            <View style={homeStyles.image}>
                <View>
                    <Image source={require('../../assets/logo-text.png')} style={homeStyles.logo} />
                    {/* <Text style={{fontSize: 32, fontFamily: 'GothamRounded-Bold', color: '#FF677E', alignSelf: 'center'}}>Swipe @ Parties</Text> */}
                    {/* Source: https://storyset.com/illustration/online-dating/bro/animate */}
                  
                </View>
                    <Image source={require('../../assets/online_dating.gif')} style={homeStyles.animatedImage} />
                <StatusBar style="auto" />
                <TouchableOpacity
                    style={[homeStyles.button, homeStyles.firstButton]}
                    title="Go to Jane's profile"
                    onPress={() =>
                        navigation.navigate('Step1', { name: 'Jane' })
                    }
                >
                    <Text style={[homeStyles.firstButtonText, homeStyles.text, { fontFamily: "GothamRounded-Medium" }]}>Join Party</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[homeStyles.button, homeStyles.secondButton]}
                    onPress={() => {
                        alert('You tapped the button!');
                    }}
                >
                    <Text style={[homeStyles.text, homeStyles.secondButtonText, { fontFamily: "GothamRounded-Medium" }]}>New Party</Text>
                </TouchableOpacity>
            </View>
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
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: 'green'
    },
    animatedImage:  {
        width: 250,
        height: 250,
        alignSelf: 'center'
    },
    logo: {
        width: 360,
        height: 170,
        marginTop: 80,
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
        marginTop: 0,
        backgroundColor: '#FF677E',
        borderColor: '#FF677E',
        color: '#fff',
        elevation: 1
    },

    firstButtonText: {
        color: '#fff',
    },

    secondButtonText: {
        color: '#fff',

    },

    secondButton: {
        backgroundColor: '#817BFD',
        marginBottom: 'auto',
        borderColor: '#fff',
        elevation: 1

    },
    text: {
        fontSize: 20,
        fontWeight: '600',
    },

});