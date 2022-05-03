import React, { useEffect, useState } from "react";

import { View,Text ,StyleSheet, TouchableOpacity} from "react-native";
import { colors, fonts, sizes } from "../../../../constant";
import { useIsFocused } from "@react-navigation/native";


function CardNote(props){
  const isFocused=useIsFocused()
  const [item,setitem]=useState({})
    const style=styles

  useEffect(()=>{
    if(isFocused){
  loadItem()
    }
  },[props,isFocused])
  const loadItem=()=>{
    setitem(props)
  }
    return (
        <View>
           <TouchableOpacity  activeOpacity={0.8}>
           <View style={[style.containerM,{backgroundColor:item.bg}]}>
                    <Text style={[style.title_text,{color:colors.tertiary}]}>{item.title}</Text>
                    {props.content==""?(<View></View>):(<Text style={[style.content_text,{color:colors.tertiary}]}>{item.note}</Text>)}
                    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:15,alignItems:'center'}}>
                        <View>
                            {/* Label section */}
                            <Text style={[style.label_text,{}]}>Design | Wireframe</Text>
                        </View>
                        <View>
                            <Text style={[style.label_text,{}]}>2022/04/30</Text>
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
        borderRadius:15,
        marginBottom:20
    },
    title_text:{
        fontFamily:fonts.DmSans_Bold,
        fontSize:sizes.h15,
        marginRight:10
    },
    content_text:{
        fontFamily:fonts.DmSans_Regular,
        fontSize:sizes.h13,
        marginTop:10,

    },
    label_text:{
        fontFamily:fonts.DmSans_Bold,
        fontSize:sizes.h10,
        marginTop:10,
        color:colors.secondary
    }
})
