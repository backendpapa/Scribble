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


import { HomeHeader, HomeTab, HomeContent, CardNote } from "../components/index";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import { useIsFocused, useRoute } from "@react-navigation/native";
import {useSelector,useDispatch} from "react-redux";
import { getAllNotes, SET_NEW_NOTE } from "../../../dataStore/redux/action/actions";
import { db } from "../../../dataStore/Config";



function Home() {

  const theme = useColorScheme();
  const navigation = useNavigation();
  const routes=useRoute()
  const isFocused=useIsFocused();
  const [loading,setLoading]=useState(true)
  const style = styles;

  const { note }  = useSelector((state) => state)
  const dispatch=useDispatch()
  // console.log(note,"note")
  const [notearray,setNoteArray]=useState(note.notes)
  console.log(notearray,"arr")


useEffect(()=>{
  if(loading==true && notearray.length==0){
    console.log("array emty")
    db.find({},function(err,res){
      console.log(res)

      dispatch((getAllNotes(res)))

      setNoteArray(oldn=>[...res])
      console.log(notearray,"notearr")
      setLoading(false)
    })
  }else{
    console.log("array not emty")
    setNoteArray(note.notes)
    setLoading(false)

  }
})





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
          {loading==false?(  <View style={{height:'70%',display:'flex',justifyContent:'center'}}>
            <ScrollView showsVerticalScrollIndicator={false} >
              { notearray.map((item,i)=>{
                return  <CardNote key={i}   title={item.title} bg={item.bg_color}  note={item.note}  />
              })}
            </ScrollView>
          </View>):(<View></View>)}
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
