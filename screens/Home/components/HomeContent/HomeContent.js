import React,{useEffect} from "react";

import { View, Text, ScrollView } from "react-native";
import {CardNote} from '../index'


import { colors } from "../../../../constant";


const notes=[
    {title:"How To Draw A Proffessional Wireframe?",content:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic, quod. Inventore omnis voluptatem eaque error repudiandae voluptate odit est veritatis, sequi quo, facilis natus fugit blanditiis.",label:"Design | Wireframe",data_modified:"2022/04/30",bg_color:"#eff5fb"},
    {title:"Ways To Succeed Early",content:"",label:"Succeed | Goals",data_modified:"2022/04/30",bg_color:"#fff6e7"},
    {title:"Scientific Fact Of Space",content:"",label:"Scientific | Space",data_modified:"2022/04/30",bg_color:"#e4ffe6"},
    {title:"How To Draw A Proffessional Wireframe?",content:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic, quod. Inventore omnis voluptatem eaque error repudiandae voluptate odit est veritatis, sequi quo, facilis natus fugit blanditiis.",label:"Design | Wireframe",data_modified:"2022/04/30",bg_color:"#eff5fb"},
    {title:"Ways To Succeed Early",content:"",label:"Succeed | Goals",data_modified:"2022/04/30",bg_color:"#fff6e7"},
    {title:"Scientific Fact Of Space",content:"",label:"Scientific | Space",data_modified:"2022/04/30",bg_color:"#e4ffe6"},
    {title:"How To Draw A Proffessional Wireframe?",content:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic, quod. Inventore omnis voluptatem eaque error repudiandae voluptate odit est veritatis, sequi quo, facilis natus fugit blanditiis.",label:"Design | Wireframe",data_modified:"2022/04/30",bg_color:"#eff5fb"},
    {title:"Ways To Succeed Early",content:"",label:"Succeed | Goals",data_modified:"2022/04/30",bg_color:"#fff6e7"},
    {title:"Scientific Fact Of Space",content:"",label:"Scientific | Space",data_modified:"2022/04/30",bg_color:"#e4ffe6"},
]



function HomeContent(props){

console.log(props.notes,"notes")

    return (
        <View>
            <View style={{height:'88%',display:'flex',justifyContent:'center'}}>
           <ScrollView showsVerticalScrollIndicator={false}>
                { props.notes.map((item,i)=>{
                    return  <CardNote key={i} label={item.label}  title={item.title} content={item.note} bg={item.bg_color} date={item.data_modified}  />
                })}
           </ScrollView>
            </View>
        </View>
    )
}

export default HomeContent;
