import React from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import Logo from '../../assets/qrush_logo.svg';


const HomeScreen = ({ navigation }) => {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            
            {/* <Text className="text-white">"2." challenge is done - check</Text> */}
            {/* <Image source={{ uri: 'assets\logo_crushed.PNG' }} style={{ width: 40, height: 40 }} /> */}
            {/* <Image source={require('./assets/qrush_logo.svg')} style={homeStyles.logo} /> */}
            <View>
                <Logo style={homeStyles.logo}
                    width="360" height="120"
                />
            </View>
            <StatusBar style="auto" />
            <Pressable
                style={[homeStyles.button, homeStyles.joinButton]}
                title="Go to Jane's profile"
                onPress={() =>
                    navigation.navigate('Scan QR code', { name: 'Jane' })
                }
            >
                <Text style={homeStyles.text}>Join Party</Text>
            </Pressable>
            <Pressable
                style={[homeStyles.button, homeStyles.createPartyButton]}
                onPress={() => {
                    alert('You tapped the button!');
                }}
            >
                <Text style={homeStyles.text}>New Party</Text>
            </Pressable>
        </View>
    );
}

export default HomeScreen;

const homeStyles = StyleSheet.create({
    logo: {
        width: 200,
        height: 100,
        marginTop: 200,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        // height: 50,
        paddingVertical: 12,
        paddingHorizontal: 32,
        margin: 16,
        borderRadius: 32,
        fontFamily: 'Gotham'
        // elevation: 3,
    },

    joinButton: {
        marginTop: 'auto',
        backgroundColor: '#FF677E',
    },

    createPartyButton: {
        backgroundColor: '#2F4858',
        marginBottom: 'auto'
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },

});