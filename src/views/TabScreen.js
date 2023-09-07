import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-deck-swiper';
import MatchScreen from './MatchScreen';

const Tab = createBottomTabNavigator();

// function SwipeScreen() {
//   return (
//     <View style={styles.screenContainer}>
//       <Swiper /* swiper settings */ />
//     </View>
//   );
// }


function DummyScreen({ title }) {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>{title}</Text>
    </View>
  );
}


export default function TabScreen({ navigation, route }) {
    const MatchComponent = props => (
        <MatchScreen user={route.params.user} {...props} />
      );
  return (
    <SafeAreaView style={styles.container}>
      {/* <NavigationContainer> */}
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { height: 100, width: '100%', flex: 0 },
            tabBarLabelStyle: { fontSize: 24 },
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#aaa',
          }}>
          <Tab.Screen
            name="Swipe"
            component={MatchComponent}
            // options={{ title: 'Swipe' }}
          />
          {/* MatchScreen({user :route.params.user}) */}
          <Tab.Screen
            name="Matches"
            component={() => <DummyScreen title="Matches" />}
            options={{ title: 'Matches' }}
          />
          <Tab.Screen
            name="Settings"
            component={() => <DummyScreen title="Settings" />}
            options={{ title: 'Settings' }}
          />
        </Tab.Navigator>
        <StatusBar style="auto" />
      {/* </NavigationContainer> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
