import { Icon } from "@rneui/base";
import React from "react";

import { View,Text,StyleSheet,useColorScheme, TouchableOpacity } from "react-native";
import { colors, fonts } from "../../../../constant";


function HomeTab(){
    const theme=useColorScheme();
    const [tab,setTab]=React.useState(0)
    const style=styles
    return (
        <View>
            <View style={[style.container,{backgroundColor:theme=="dark"?colors.primary:colors.sur}]}>
                {/* Main screen */}
                <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                    setTab(0)
                }} style={[styles.tab_button,{backgroundColor:tab==0?colors.tertiary:"transparent"}]}>
                    <Text style={[styles.tab_button_text,{color:tab==0?colors.primary:colors.mis}]}>Notes</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                    setTab(1)
                }} style={[styles.tab_button,{backgroundColor:tab==1?colors.tertiary:"transparent"}]}>
                    <Text style={[styles.tab_button_text,{color:tab==1?colors.primary:colors.mis}]}>Highlights</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                    setTab(2)
                }} style={[styles.tab_button,{backgroundColor:tab==2?colors.tertiary:"transparent"}]}>
                    <Text style={[styles.tab_button_text,{color:tab==2?colors.primary:colors.mis}]}>Fav. Notes</Text>
                </TouchableOpacity>
               
            </View>


            <View style={styles.detail_section}>
                {/* Detail section */}
                <Text style={[styles.tab_button_text,{color:theme=="dark"?colors.primary:colors.tertiary}]}>List Notes</Text>
               <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
               <Text style={[styles.tab_button_text,{color:theme=="dark"?colors.primary:colors.tertiary}]}>All Notes</Text>
               <TouchableOpacity activeOpacity={0.6}>
               <Icon name="select-arrows" size={15} type="entypo"  />
               </TouchableOpacity>
               </View>

            </View>
        </View>
    )
}
export default HomeTab;
const styles=StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"row",
        height:50,
        borderRadius:15,
        justifyContent:'space-between'
    },
    tab_button:{
        width:'100%',
        flex:1,
        margin:5,
        borderRadius:15,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    tab_button_text:{
        fontFamily:fonts.DmSans_Bold
    },
    detail_section:{
        display:'flex',
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:15
    }
})