
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
  Modal,
  Pressable,
  View,
  Platform
} from 'react-native';
import WebView from 'react-native-webview';
import XMLParser from 'react-xml-parser';

const WebPagePayment =({ route, navigation })=>{
    const[IsLoading,setIsLoading]=useState(false)
    console.log("test response web ",JSON.stringify(route) )
const {uri}= route.params;
return( 
    <View style={{flex:1}}>
        <WebView
            
                style={{ flex: 1 }} 
                source={{
                    uri:"https://secure.telr.com/gateway/process_framed.html?o=84ABC3F392D6436D7C3058C332BE54A4100DE92D6F3CC9794565C0005D33459A"
            }} /> 
    </View>
   
)

}
export default WebPagePayment