/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens

import Home from './screens/Home/HomeScreen/HomeScreen';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/base';
import { colors } from './constant';


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false,tabBarStyle:{height:80,borderTopRightRadius:30,borderTopLeftRadius:30,backgroundColor:'#010101'},tabBarShowLabel:false}}>
      <Tab.Screen name="Home" options={{tabBarIcon:({focused,color,size})=>{
          return <Icon name="home-roof" size={30} type="material-community" color={focused?"white":colors.light.secondary} />
      }}} component={Home} />

<Tab.Screen name="pg2" options={{tabBarIcon:({focused,color,size})=>{
          return <Icon name="bookshelf" size={30} type="material-community" color={focused?"white":colors.light.secondary} />
      }}} component={Home} />
      <Tab.Screen name="pg3" options={{tabBarIcon:({focused,color,size})=>{
          return <Icon name="view-grid-outline" size={30} type="material-community" color={focused?"white":colors.light.secondary} />
      }}} component={Home} />
     <Tab.Screen name="pg4" options={{tabBarIcon:({focused,color,size})=>{
          return <Icon name="settings" size={30} type="feather" color={focused?"white":colors.light.secondary} />
      }}} component={Home} />
    </Tab.Navigator>
  );
}




const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="HomeScreen" component={MyTabs} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;