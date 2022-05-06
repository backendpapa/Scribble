import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import { colors, fonts, sizes } from "../../../../constant";
import { useIsFocused } from "@react-navigation/native";
import RenderHTML from 'react-native-render-html'
import { useNavigation } from "@react-navigation/core";



function CardNote(props){
  const isFocused=useIsFocused()
  const [item,setitem]=useState({})
    const style=styles
  const navigation=useNavigation()
  const { width } = useWindowDimensions();


  useEffect(()=>{
    if(isFocused){
  loadItem()
    }
  })
  const loadItem=()=>{
    setitem(props)

  }
    return (
        <View>
           <TouchableOpacity onPress={()=>{
             navigation.navigate('NewNote',{
               existing: true,
               Mnote: item
             })
           }}  activeOpacity={0.8}>
           <View style={[style.containerM,{backgroundColor:item.bg,borderRadius:15}]}>
                    <Text style={[style.title_text,{color:colors.tertiary}]}>{item.title}</Text>
                    {props.note==""?(<View></View>):(
                      <RenderHTML baseStyle={style.content_text} contentWidth={width} source={{ html: `${item.note}` }}  />)}
                    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:15,alignItems:'center'}}>
                        <View>
                            {/* Label section */}
                            <Text style={[style.label_text,{}]}>Design | Wireframe</Text>
                        </View>
                        <View>
                            <Text style={[style.label_text,{}]}>{item.date}</Text>
                        </View>
                    </View>
            </View>
           </TouchableOpacity>
        </View>
    )
}

export default CardNote;
const styles=StyleSheet.create({
    containerM:{
        minHeight:110,
        maxHeight:220,
        padding:15,
        marginBottom:20
    },
    title_text:{
        fontFamily:fonts.DmSans_Bold,
        fontSize:sizes.h15,
        marginRight:10
    },
    content_text:{
        fontFamily:fonts.DmSans_Regular,
        fontSize:sizes.h15,
        marginTop:10,

    },
    label_text:{
        fontFamily:fonts.DmSans_Bold,
        fontSize:sizes.h10,
        marginTop:10,
        color:colors.secondary
    }
})
