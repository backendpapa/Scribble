import React from "react";
import {View,Text, StatusBar,useColorScheme} from 'react-native'
import { colors, fonts, sizes } from "../../../constant";




function Home({navigation}){
    const theme=useColorScheme();
    
  
    return(
        <View>
            <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
                <Text style={{color:theme=='dark'?colors.dark.primary:colors.light.primary}}>Hello scribble</Text>
        </View>
    )
}

export default Home;


