import {useNavigation} from '@react-navigation/core';
import {Icon} from '@rneui/base';
import JSON5 from 'json5'
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  useColorScheme,
  ScrollView,
  StyleSheet,
  TouchableOpacity,

} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import {colors, fonts, sizes} from '../../../constant';


import {HomeHeader, HomeTab, HomeContent} from '../components/index';
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import { useIsFocused } from "@react-navigation/native";



let notes=[]
function Home() {

  const theme = useColorScheme();
  const navigation = useNavigation();
  const isFocused=useIsFocused();
  const [loading,setLoading]=useState(true)
  const style = styles;
  const [notearray,setNoteArray]=useState([])
  useEffect(()=>{
    async function mainEffect(){
        if(loading==true){
          notes=[]
          let noteKeys=await AsyncStorage.getAllKeys();
          console.log(await AsyncStorage.getAllKeys())
          for(var i=0;i<noteKeys.length;i++){

             await AsyncStorage.getItem(noteKeys[i]).then((token)=>{
               notes.push(JSON5.parse(token.toString()))
             })

          }
          console.log(await notes)
        }

        await setLoading(false)

    }
    mainEffect()
  },[loading])



  return (
    <View>
      <StatusBar
        backgroundColor={theme == 'dark' ? colors.tertiary : colors.mega}
        barStyle={theme == 'dark' ? 'light-content' : 'dark-content'}
      />
      <View
        style={[
          {backgroundColor: theme == 'dark' ? colors.tertiary : colors.mega},
          style.container,
        ]}>
        <HomeHeader />
        <View style={{marginTop: 50}}>
          <HomeTab />
        </View>
        <View style={{marginTop: 10, height: '100%'}}>
          {loading==false?( <HomeContent notes={notes}  />):(<View></View>)}
        </View>
      </View>
      <View style={{position: 'absolute', right: 20, bottom: 90}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NewNote');
          }}
          style={[
            style.new_note_button,
            {
              backgroundColor:
                theme == 'dark' ? colors.primary : colors.tertiary,
            },
          ]}
          activeOpacity={0.8}>
          <Icon
            size={50}
            color={theme == 'dark' ? colors.secondary : colors.primary}
            name="add"
            type="ionicons"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    padding: 25,
    paddingBottom: 105,
  },
  new_note_button: {
    borderRadius: 50,
    height: 60,
    width: 60,
    backgroundColor: colors.tertiary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
