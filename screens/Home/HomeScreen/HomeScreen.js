import { Icon } from "@rneui/base";
import React from "react";
import {View,Text, StatusBar,useColorScheme, ScrollView,StyleSheet, TouchableOpacity} from 'react-native'
import { colors, fonts, sizes } from "../../../constant";

import {HomeHeader,HomeTab,HomeContent} from '../components/index'


function Home({navigation}){
    const theme=useColorScheme();
    const style=styles
  
    return(
        <View>
            <StatusBar backgroundColor={theme=="dark"?colors.tertiary:colors.mega} barStyle={theme=="dark"?"light-content":"dark-content"} />
                <View style={[{backgroundColor:theme=="dark"?colors.tertiary:colors.mega},style.container]}>
                   <HomeHeader />
                   <View style={{marginTop:50}}>
                   <HomeTab />
                   </View>
                   <View style={{marginTop:10,height:"100%"}}>
                       <HomeContent  />
                   </View>
                </View>
                <View style={{position:'absolute',right:20,bottom:90}}>
                   <TouchableOpacity style={[style.new_note_button,{backgroundColor:theme=="dark"?colors.primary:colors.tertiary}]} activeOpacity={0.8}>
                   <Icon size={50} color={theme=="dark"?colors.secondary:colors.primary}  name="add"  type="ionicons"  />
                   </TouchableOpacity>
                </View>
        </View>
    )
}

export default Home;

const styles=StyleSheet.create({
    container:{
        display:'flex',
        height:'100%',
        padding:25,
        paddingBottom:105
    },
    new_note_button:{
        borderRadius:50,
        height:60,
        width:60,
        backgroundColor:colors.tertiary,
        display:'flex',
        justifyContent:'center',
        alignItems:"center",
        elevation:5
    }
})


