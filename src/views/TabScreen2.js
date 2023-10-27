import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Icon-Bibliothek hinzugefügt
import MatchScreen from './MatchScreen2';
import { MaterialIcons } from '@expo/vector-icons';

//test
const Tab = createBottomTabNavigator();

export default function TabScreen2({ route }) {
    const MatchScreenView = () => (
        <MatchScreen route={route} />
    );
    return (
        <SafeAreaView style={styles.container}>
            {/* <NavigationContainer> */}
            <Tab.Navigator
                initialRouteName="Swipe"
                // defaultNavigationOptions={{
                //     headerTitleAlign: 'center'
                // }}
                screenOptions={{
                    headerShown: true,
                    // headerTitleAlign: 'center',
                    // headerLayoutPreset: 'center',
                    tabBarActiveTintColor: '#FF677E', // Aktive Tab-Farbe
                    tabBarInactiveTintColor: '#fff', // Inaktive Tab-Farbe
                    tabBarStyle: {
                        backgroundColor: '#000',
                        
                    },
                    showLabel: true,
                    // headerStyle: { 
                    //     backgroundColor: '#000',
                    //     height: 100,
                        
                    // },
                    
                    headerTintColor: '#000',
                    // headerTitleStyle: { 
                    //     // flex: 1,
                    //     // textAlign: 'center',
                    //     // fontWeight: 'light', 
                    //     backgroundColor: '#fff' 
                    // },
                    headerTitleAlign: 'center',
                     title: 'Center Title',

                        // headerMode: 'screen',
                    }}
                tabBarLabelStyle={{
                    color: '#000'
                }}
                // tabBarStyle={{
                //     backgroundColor: '#000'
                // }}

                tabBarStyle ={ [
                    {
                    //   display: "flex",
                    //   background: '#000',
                    //   align: 'center'
                    }
                  ]

                }
                tabBarOptions={{
                    // style: {
                    //     height: '20%', // 20% Höhe des Bildschirms
                    //     backgroundColor: '#000', // Schwarzer Hintergrund für die Tabs
                    //     borderTopWidth: 0, // Keine obere Trennlinie
                    // },
                    // labelStyle: {
                        // fontSize: 15, // Schriftgröße auf 20 setzen
                        // fontWeight: 'bold',
                    //     textAlign: 'center', // Schrift horizontal zentrieren
                    //     paddingBottom: 5, // Schrift vertikal zentrieren
                    // },

                }}

            >
                <Tab.Screen
                    name="Swipe"
                    component={MatchScreenView}
                    // component={() => <MatchScreen route={route} />}
                    options={{
                        tabBarLabel: 'Swipe',
                        tabBarLabelPosition: 'beside-icon',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons
                                name="swipe"
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Meine Matches"
                    component={MatchScreenView}
                    options={{
                        tabBarLabel: 'Meine Matches',
                        tabBarLabelPosition: 'beside-icon',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="ios-heart"
                                size={size}
                                color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
            {/* </NavigationContainer> */}
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
