import 'react-native-gesture-handler';
import React from 'react';
import { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, ImageBackground, Text, View, Image, Button, Pressable, TouchableOpacity, SafeAreaView } from 'react-native';
import Logo from './assets/qrush_logo.svg';
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from './src/views/HomeScreen';
import QRScannerScreen from './src/views/QRScannerScreen';
import CameraScreen from './src/views/CameraScreen';
import TakePicScreen from './src/views/TakePicScreen';
import Step1Screen from './src/views/Step1Screen';
import Step2Screen from './src/views/Step2Screen';
import {
  DefaultTheme,
  // NavigationContainer,
} from '@react-navigation/native';
import MatchScreen from './src/views/MatchScreen';
import UserList from './src/views/UserList';
import FlatListScreen from './src/views/FlatListScreen';
import Try from './src/views/Try';


SplashScreen.preventAutoHideAsync();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'black',
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    'GothamRounded-Bold': require('./assets/fonts/GothamRounded-Bold.otf'),
    'GothamRounded-BoldItalic': require('./assets/fonts/GothamRounded-BoldItalic.otf'),
    'GothamRounded-Book': require('./assets/fonts/GothamRounded-Book.otf'),
    'GothamRounded-BookItalic': require('./assets/fonts/GothamRounded-BookItalic.otf'),
    'GothamRounded-Light': require('./assets/fonts/GothamRounded-Light.otf'),
    'GothamRounded-LightItalic': require('./assets/fonts/GothamRounded-LightItalic.otf'),
    'GothamRounded-Medium': require('./assets/fonts/GothamRounded-Medium.otf'),
    'GothamRounded-MediumItalic': require('./assets/fonts/GothamRounded-MediumItalic.otf'),

  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1}} onLayout={onLayoutRootView}>
      
      {/* <ImageBackground source={require('./assets/background-green.png')} resizeMode="cover" style={{flex: 1}}> */}
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator screenOptions={{ headerShown: false, }}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: 'Welcome',
                headerStyle: {
                  backgroundColor: '#fff',
                  height: 0
                },
                headerTintColor: '#FF677E',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen name="Scan QR code" component={QRScannerScreen}
              options={{
                title: 'Scan QR Code',
                headerStyle: {
                  backgroundColor: '#fff',
                },
                headerTintColor: '#FF677E',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen name="Camera" component={TakePicScreen} />
            <Stack.Screen name="Step1" component={Step1Screen} />
            <Stack.Screen name="Step2" component={Step2Screen} />
            <Stack.Screen name="Match" component={MatchScreen} />
            <Stack.Screen name="UserList" component={UserList} />
            <Stack.Screen name="FlatListScreen" component={FlatListScreen} />
            <Stack.Screen name="MagneticSnapScroll" component={FlatListScreen} />
            <Stack.Screen name="Try" component={Try} />







          </Stack.Navigator>
        </NavigationContainer>
      {/* </ImageBackground> */}


    </View>
  );
}


// function HomeScreen({ navigation }) {

//   return (
//     <View style={homeStyles.container}>
//       <ImageBackground source={require('./assets/background1.png')} resizeMode="cover" style={homeStyles.image}>
//         <View>

//           <Image source={require('./assets/start_logo.png')} style={homeStyles.logo} />
//           {/* <Svg width="360" height="120" viewBox="0 0 4666 2216" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <Rect x="202" y="192" width="1232" height="140" fill="#3F4B5B" />
//             <Rect x="202" y="1896" width="1232" height="140" fill="#3F4B5B" />
//             <Rect x="3278" y="1896" width="1232" height="140" fill="#3F4B5B" />
//             <Rect x="3278" y="192" width="1232" height="140" fill="#3F4B5B" />
//             <Rect x="202" y="192" width="140" height="656" fill="#2F4858" />
//             <Rect x="4370" y="192" width="140" height="656" fill="#2F4858" />
//             <Rect x="202" y="1380" width="140" height="656" fill="#2F4858" />
//             <Rect x="4370" y="1380" width="140" height="656" fill="#2F4858" />
//             <Path d="M1448.1 889C1448.1 868 1431.1 850 1409.1 850C1387.1 850 1371.1 868 1371.1 889V954C1331.1 896 1269.1 844 1173.1 844C1049.1 844 926.098 944 926.098 1113V1115C926.098 1285 1049.1 1383 1173.1 1383C1268.1 1383 1329.1 1330 1371.1 1268V1498C1371.1 1520 1388.1 1537 1410.1 1537C1431.1 1537 1448.1 1520 1448.1 1498V889ZM1187.1 913C1283.1 913 1374.1 993 1374.1 1112V1114C1374.1 1233 1283.1 1314 1187.1 1314C1090.1 1314 1005.1 1236 1005.1 1114V1112C1005.1 987 1087.1 913 1187.1 913ZM1620.16 1338C1620.16 1360 1637.16 1377 1659.16 1377C1681.16 1377 1697.16 1359 1697.16 1338V1162C1697.16 1013 1779.16 938 1879.16 926C1899.16 923 1913.16 908 1913.16 887C1913.16 865 1898.16 848 1875.16 848C1810.16 848 1735.16 900 1697.16 986V889C1697.16 867 1680.16 850 1658.16 850C1637.16 850 1620.16 868 1620.16 889V1338ZM2468.43 889C2468.43 867 2451.43 850 2430.43 850C2408.43 850 2392.43 867 2392.43 889V1151C2392.43 1248 2325.43 1313 2237.43 1313C2146.43 1313 2094.43 1253 2094.43 1157V889C2094.43 867 2076.43 850 2055.43 850C2033.43 850 2017.43 867 2017.43 889V1176C2017.43 1299 2090.43 1383 2215.43 1383C2304.43 1383 2357.43 1338 2392.43 1282V1338C2392.43 1360 2409.43 1377 2430.43 1377C2452.43 1377 2468.43 1359 2468.43 1338V889ZM2812.64 1382C2915.64 1382 2996.64 1325 2996.64 1227V1225C2996.64 1132 2910.64 1101 2830.64 1077C2761.64 1056 2697.64 1037 2697.64 988V986C2697.64 943 2736.64 911 2797.64 911C2841.64 911 2888.64 926 2932.64 951C2936.64 953 2942.64 955 2949.64 955C2968.64 955 2983.64 940 2983.64 922C2983.64 907 2974.64 896 2964.64 890C2914.64 863 2854.64 846 2799.64 846C2697.64 846 2623.64 905 2623.64 994V996C2623.64 1091 2713.64 1119 2794.64 1142C2862.64 1161 2923.64 1181 2923.64 1233V1235C2923.64 1285 2878.64 1317 2816.64 1317C2760.64 1317 2705.64 1298 2652.64 1262C2647.64 1258 2640.64 1256 2633.64 1256C2614.64 1256 2599.64 1271 2599.64 1289C2599.64 1302 2606.64 1312 2613.64 1317C2669.64 1357 2744.64 1382 2812.64 1382ZM3139.69 1338C3139.69 1360 3156.69 1377 3178.69 1377C3200.69 1377 3216.69 1360 3216.69 1338V1076C3216.69 979 3282.69 914 3371.69 914C3462.69 914 3514.69 974 3514.69 1070V1338C3514.69 1360 3531.69 1377 3553.69 1377C3574.69 1377 3591.69 1360 3591.69 1338V1051C3591.69 928 3518.69 844 3393.69 844C3304.69 844 3250.69 889 3216.69 945V676C3216.69 655 3199.69 637 3177.69 637C3156.69 637 3139.69 655 3139.69 676V1338Z" fill="#FF677E" />
//           </Svg> */}
//         </View>
//         <StatusBar style="auto" />
//         <Pressable
//           style={[homeStyles.button, homeStyles.firstButton]}
//           title="Go to Jane's profile"
//           onPress={() =>
//             navigation.navigate('Scan QR code', { name: 'Jane' })
//           }
//         >
//           <Text style={[homeStyles.firstButtonText, homeStyles.text, { fontFamily: "GothamRounded-Medium" }]}>Join Party</Text>
//         </Pressable>
//         <Pressable
//           style={[homeStyles.button, homeStyles.secondButton]}
//           onPress={() => {
//             alert('You tapped the button!');
//           }}
//         >
//           <Text style={[homeStyles.text, homeStyles.secondButtonText, { fontFamily: "GothamRounded-Medium" }]}>New Party</Text>
//         </Pressable>
//       </ImageBackground>
//     </View>
//   );
// }

// const homeStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   image: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   logo: {
//     width: 360,
//     height: 170,
//     marginTop: 200,
//   },
//   button: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 250,
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     margin: 16,
//     borderRadius: 32
//   },

//   firstButton: {
//     marginTop: 50,
//     backgroundColor: '#fff',
//     borderColor: '#FF677E',
//     color: '#FF677E',
//     elevation: 1
//   },

//   firstButtonText: {
//     color: '#FF677E',
//   },

//   secondButtonText: {
//     color: '#fff',

//   },

//   secondButton: {
//     backgroundColor: '#001220',
//     marginBottom: 'auto',
//     borderColor: '#fff',
//     elevation: 1

//   },
//   text: {
//     fontSize: 20,
//     fontWeight: '600',
//   },

// });


const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
