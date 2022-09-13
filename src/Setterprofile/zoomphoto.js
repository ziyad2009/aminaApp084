import React,{useEffect,useState} from 'react';
import {View,Image, TouchableOpacity,Text,Platform,Modal,Pressable,StyleSheet} from 'react-native'
import {Box}from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ImageViewer from 'react-native-image-zoom-viewer';
import { Colors } from '../assets/Themes/';
import { URL_ws,URL } from '../services/links';

const Zoomphoto=(props )=>{
    const[visible,setvisble]=useState(true)
    const [typeDevice,setTypeDevice]=useState(false)
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
       if(Platform.OS==='ios'){
        console.log("ios")
       }
       console.log("ios")
        setvisble(false)
        props.navigation.goBack()
    }
return(
    <View style={{flex:1,backgroundColor:"black",alignItems:'center',marginTop:58 }}>
        
        
            <Modal 
            visible={visible} 
            transparent={true}
            animationType="slide"
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setvisble(false)
                props.navigation.goBack()
              }}
              >
             
                <ImageViewer
                 enableImageZoom={true}
                renderHeader={()=><AntDesign name='close' size={30} color={Colors.white} style={{marginTop:Platform.OS==='android'? 20:88,marginRight:12}} onPress={()=>showModel() } />}
                imageUrls={images}/>
            </Modal>
            
        
    </View>
)

}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
        marginTop:100,
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
  export default  Zoomphoto;
