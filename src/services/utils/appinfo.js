
import React, { useState ,useEffect,useRef,useContext} from 'react';
import api2 from '../api'; 
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

export async function Appinformation(props){
   // const [result,setresult]=useState([])
    let result=[]
    let buildNumber = DeviceInfo.getBuildNumber();
    const appName=DeviceInfo.getApplicationName();
    const app_version=DeviceInfo.getVersion()
    const app_type=Platform.OS==='android'?"android":"ios"
    const APPVERSION=Platform.OS==='android'?56:53
    // console.log("Start === builed no is", buildNumber)
    // console.log("Start === Version is", app_version)
    // console.log("Start === app name is", appName)
    // console.log("Start === appp type", app_type)
    // console.log("start app platform",Platform.Version)
    // NetInfo.fetch().then(state => {
    //     console.log("Connection type", state.type);
    //     console.log("Is connected?", state.isConnected);
    //   })

    await api2.get(`/codepush/${app_type}`).then((res) => {
       // console.log("tetst app info", res.data)
        //setresult(res.data)
        result=res.data
      }).finally(()=> updaterVersioApp() )
      .catch((err) => {
        console.log("Errorr from get app info", err)
      })

     function updaterVersioApp( ){
    //console.log("Start Test Array",result.appid)
    // console.log("Start Test Array",buildNumber)
    if(result.appid != APPVERSION){
        //console.log("Version is NOt updated=====OK")
        props.navigation.navigate('MyModal')
      
   
    }else{
        console.log("Version is updated=====OK")
        
        
    }
} 

}

 