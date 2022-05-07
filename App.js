/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect} from 'react';

import { View, Text,useColorScheme } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen'
// Screens

import Home from './screens/Home/HomeScreen/HomeScreen';

import {Provider } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/base';
import { colors } from './constant';
import { NewNote } from './screens/Note';
import { Store } from "./dataStore/redux/store";



const Tab = createBottomTabNavigator();

function MyTabs() {
  const themes=useColorScheme()
  return (
    <Tab.Navigator  screenOptions={{headerShown:false,tabBarStyle:{height:80,borderTopRightRadius:30,borderTopLeftRadius:30,backgroundColor:colors.tertiary,position:'absolute',borderTopColor:"transparent"},tabBarShowLabel:false,tabBarHideOnKeyboard:true}}>
      <Tab.Screen name="Home" options={{tabBarIcon:({focused,color,size})=>{
          return <Icon name="home-roof" size={30} type="material-community" color={focused?"white":colors.secondary} />
      }}} component={Home} />

<Tab.Screen name="pg2" options={{tabBarIcon:({focused,color,size})=>{
          return <Icon name="bookshelf" size={30} type="material-community" color={focused?"white":colors.secondary} />
      }}} component={Home} />
      <Tab.Screen name="pg3" options={{tabBarIcon:({focused,color,size})=>{
          return <Icon name="view-grid-outline" size={30} type="material-community" color={focused?"white":colors.secondary} />
      }}} component={Home} />
     <Tab.Screen name="pg4" options={{tabBarIcon:({focused,color,size})=>{
          return <Icon name="settings" size={30} type="feather" color={focused?"white":colors.secondary} />
      }}} component={Home} />
    </Tab.Navigator>
  );
}




const Stack = createNativeStackNavigator();

function App() {
  useEffect(()=>{
    setTimeout(()=>{
      SplashScreen.hide()
    },2000)
  })
  return (
  <Provider store={Store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="HomeScreen" component={MyTabs} />
        <Stack.Screen name="NewNote" component={NewNote} />

      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
  );
}

export default App;
