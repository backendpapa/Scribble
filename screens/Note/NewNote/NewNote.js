import { Icon } from "@rneui/base";
import React, { useRef } from "react";

import { View,Text ,StyleSheet, ScrollView, TextInput, TouchableOpacity,useColorScheme} from "react-native";
import { RichEditor,RichToolbar,actions,getContentCSS } from "react-native-pell-rich-editor";
import { colors, fonts, sizes } from "../../../constant";


function NewNote(){
    const [richtext,setRichtext]=React.useState("")
    const editorRef=useRef(null)
  
    const theme=useColorScheme()
    
    
    const style=styles
    return (
        <View style={{position:'relative'}} >
           
           <View style={[style.mainContainer,{backgroundColor:theme=='dark'?colors.tertiary:colors.mega}]}>

               <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity activeOpacity={0.8}>
                        <Icon color={theme=='dark'?colors.mega:colors.tertiary} name="close-circle-outline" type="ionicon" />
                    </TouchableOpacity>
                    <Text style={{fontFamily:fonts.DmSans_Bold,fontSize:sizes.h15,color:theme=='dark'?colors.mega:colors.tertiary}}>Edit Note</Text>
                    <TouchableOpacity activeOpacity={0.8}>
                        <Icon color={theme=='dark'?colors.mega:colors.tertiary} name="md-checkmark-circle-outline" type="ionicon" />
                    </TouchableOpacity>
               </View>
           <TextInput style={{height:60,backgroundColor:'transparent',fontFamily:fonts.DmSans_Bold,fontSize:sizes.h20,color:theme=='dark'?colors.mega:colors.tertiary}} placeholderTextColor={theme=='dark'?colors.secondary:colors.mis} placeholder={"Title..."} ></TextInput>
           <ScrollView showsHorizontalScrollIndicator={false} style={{height:'100%'}}>
        
         
         <View style={style.container}>
        
         <RichEditor
          ref={editorRef}
          typ
          editorStyle={{backgroundColor:'transparent',caretColor:colors.tertiary,color:theme=='dark'?colors.mega:colors.tertiary}}
            disabled={false}
            
          useContainer={false}
           initialContentHTML={'Hello <b>World</b> <p>this is a new paragraph i created by myself. Let test this</p><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, corporis ullam sequi dicta itaque facere nihil, nulla voluptatem assumenda ipsam, maiores in esse eligendi minus cumque nemo tempora? Reiciendis repellendus neque, perspiciatis provident, nulla illo nisi magni praesentium rem placeat facilis asperiores exercitationem. Labore similique quod, quas vero nobis laborum!</p>'}
           

/>
         </View>
        
         
             </ScrollView>

             </View>
           <View style={{position:'absolute',bottom:10,width:'100%'}}>
              
               <RichToolbar actions={[
                   actions.keyboard,
		actions.setBold,
		actions.setItalic,
        actions.setStrikethrough,
        actions.setUnderline,
		actions.insertBulletsList,
		actions.insertOrderedList,
        actions.checkboxList,
		actions.insertImage,
        actions.redo,
        actions.undo,
        actions.insertVideo,
        actions.insertLink,
		'customAction',
	]} style={{height:70,margin:25,borderRadius:20,backgroundColor:theme=='dark'?colors.mega:colors.tertiary}}  editor={editorRef}></RichToolbar>
               </View>
        </View>
    )
}

export default NewNote;

const styles=StyleSheet.create({
    container:{
        flex:1,
        height:900,
        
        
        
    },
    mainContainer:{
        padding:25,
        
        height:'100%'
    }
})