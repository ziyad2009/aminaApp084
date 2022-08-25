import React,{useEffect,useState} from 'react';
import {View,Image, TouchableOpacity,Platform,Modal} from 'react-native'
import {Box}from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ImageViewer from 'react-native-image-zoom-viewer';
import { Colors } from '../assets/Themes/';
import { URL_ws,URL } from '../services/links';

const Zoomphoto=(props )=>{
    const[visible,setvisble]=useState(true)
    console.log("ALL LLL",props.route.params.setterdata)
    const images = [{
        // Simplest usage.
        url: `${URL}/${props.route.params.setterdata}`,
     
        // width: number
        // height: number
        // Optional, if you know the image size, you can set the optimization performance
     
        // You can pass props to <Image />.
        props: {
            // headers: ...
        }
    }, {
        url: '',
        props: {
            // Or you can set source directory.
            source: require('../assets/images/MainLogo.png')
        }
    }]
    const showModel=()=>{
       
        setvisble(false)
        props.navigation.goBack()
    }
return(
    <View style={{flex:1,backgroundColor:"black",alignItems:'center',marginTop:58 }}>
        
        
            <Modal visible={visible} transparent={true}>
            
                <ImageViewer
                 
                renderHeader={()=><AntDesign name='close' size={30} color={Colors.white} style={{marginTop:20,marginRight:12}} onPress={()=>showModel() } />}
                imageUrls={images}/>
            </Modal>
        
    </View>
)

}
export default  Zoomphoto;