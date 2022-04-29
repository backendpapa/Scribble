import React from "react";
import {View,Text, StatusBar} from 'react-native'
import { colors, fonts, sizes } from "../../../constant";




function Home({navigation}){
  
    React.useEffect(()=>{
        
    }
   ,[navigation]
    )
    return(
        <View>
            <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
                <Text>Hello scribble</Text>
        </View>
    )
}

export default Home;


