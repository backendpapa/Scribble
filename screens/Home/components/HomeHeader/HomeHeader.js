import {  Icon } from "@rneui/base";
import React from "react";

import { View,Text,StyleSheet,useColorScheme, TouchableOpacity, TextInput } from "react-native";
import { colors,fonts, sizes } from "../../../../constant";


function HomeHeader(){
    const theme=useColorScheme();
    const style=styles;
    const [showSearch,setShowSearch]=React.useState(false);
    return (
        <View>
           {showSearch==false?(
                <View style={style.container}>
                {/* Main Container for the Home Header */}

                <View  style={style.leftHeader} >
                    {/* This view contains the Static title of the app with its icon */}
                    <Icon name="notebook-edit" color={theme=="dark"?colors.mega:colors.tertiary} type="material-community" size={35} />
                    <Text style={[style.left_text,{color:theme=='dark'?colors.mega:colors.tertiary}]}>Scribble</Text>
                </View>

                <View style={style.leftHeader}  >
                    {/* This view contains the Static title of the app with its icon */}
                   <TouchableOpacity onPress={()=>{
                       setShowSearch(true)
                   }} activeOpacity={0.8}>
                   <Icon name="folder-search" color={theme=="dark"?colors.mega:colors.tertiary} type="material-community" />
                   </TouchableOpacity>
                   <TouchableOpacity style={{marginLeft:10}} activeOpacity={0.3}>
                   <Icon name="inbox" color={theme=="dark"?colors.mega:colors.tertiary} type="ant-design" />
                   </TouchableOpacity>
                </View>

            </View>
           ):(
            <View style={{position:"relative"}}>
                {/* search section */}
                <TextInput autoFocus={true} clearButtonMode placeholder={'Search...'} style={[{backgroundColor:theme=="dark"?colors.primary:colors.sur},style.search]}>

                </TextInput>
                <View  style={style.closeSearchButton}>
                <TouchableOpacity onPress={()=>{
                    setShowSearch(false)
                }}>
                <Icon size={25} color={theme=="dark"?colors.tertiary:colors.tertiary}  name="close-circle" type="ionicon" />
                </TouchableOpacity>
                </View>
            </View>
           )}

            
        </View>
    )
}

export default HomeHeader;

const styles=StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:50
    },
    leftHeader:{
        display:"flex",
        flexDirection:"row",
        alignItems:'center'
    },
    left_text:{
        fontFamily:fonts.DmSans_Bold,
        marginLeft:10,
        fontSize:sizes.h20
    },
    search:{
        height:50,borderRadius:15,padding:5,paddingLeft:20,paddingRight:20,fontFamily:fonts.DmSans_Bold,fontSize:sizes.h12,color:colors.tertiary
    },
    closeSearchButton:{
        position:'absolute',right:15,justifyContent:'center',display:'flex',flexDirection:'row',alignItems:'center',height:50
    }
})
