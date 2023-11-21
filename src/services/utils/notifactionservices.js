import React,{useState,useEffect,useContext} from 'react';
import messaging from '@react-native-firebase/messaging';
import setItem from '../storage'
import { Alert, Platform } from 'react-native';
import notifee ,{AndroidImportance}from '@notifee/react-native';
import {Colors,Images} from '../../assets/Themes/'
 

export async function requestUserPermission() {
 
  const authStatus = await messaging().requestPermission(
    {
      sound:true,
      announcement:true
    }
  );
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getfromToken()
    
  }

  if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    console.log('User has notification permissions enabled.',authStatus);
  } else if (authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
    console.log('User has provisional notification permissions.',authStatus);
  } else {
    console.log('User has notification permissions disabled',authStatus);
  }
  // -1 = messaging.AuthorizationStatus.NOT_DETERMINED: Permission has not yet been requested for your application.
  // 0 = messaging.AuthorizationStatus.DENIED: The user has denied notification permissions.
  // 1 = messaging.AuthorizationStatus.AUTHORIZED: The user has accept the permission & it is enabled.
  // 2 = messaging.AuthorizationStatus.PROVISIONAL: Provisional authorization has been granted.
  // 3 = messaging.AuthorizationStatus.EPHEMERAL: The app is authorized to create notifications for a limited amount of time. Used for app clips.

} 

const getfromToken=async()=>{
  try {
    const fcmToken = await messaging().getToken()
    await setItem.setItem("@FCMTOKEN",fcmToken)
    console.log("fcm token:", fcmToken)
      
  } catch (error) {
    console.log("error in creating token")
}

// let fcmToken= await setItem.getItem("@FCMTOKEN")
// console.log("start get token ++++++",fcmToken)
// if(!fcmToken){
//    try{
//     const fcmToken=await messaging().getToken()
//     if(fcmToken){
//         console.log("your token was genrate =",fcmToken)
//         await setItem.setItem("@FCMTOKEN",fcmToken)
//     }

//    }catch(err){
//     console.log("Erorr from messages firbse ",err)
//    }
// }
}
// const showToast = (notifaction) => {
//   Toast.show({
//     type: DATA.notification.title,
//     text1: DATA.notification.title,
//     text2: ' 👋'
    
//   })
// }
export const notifeeConfige=async()=>{
  await notifee.requestPermission()
  
}

function onMessageReceived(message) {
  notifee.displayNotification(JSON.parse(message.data.notifee));
}


const onMessagerecevetest=async(messag)=>{
  const  channelId = await notifee.createChannel({
    id:"amina8530",
    name:"aminaNotifacions",
    vibration:true,
    sound:"default",
    importance:AndroidImportance.HIGH
    
   });
  await notifee.displayNotification(
    {
      title:messag.notification.title,
      body:messag.notification.body,
      android: {
        channelId:"amina8530",
        // Reference the name created (Optional, defaults to 'ic_launcher')
        smallIcon: 'ic_launcher_foreground',
        largeIcon:"https://res.cloudinary.com/djzx0zqms/image/upload/v1681608336/imageapp/Aminahchar_qarzxx.png",
        sound:"default",
        // Set color of icon (Optional, defaults to white)
        color: Colors.TexTPink,
        
      },
      ios:{
        sound:"default",
        badgeCount:"1",
        
      }
      
    },
  );
  // return(
  //   <Button title="Display Notification" onPress={() => console.log("test")} />
  // )
}

async function onDisplayNotification(DATA) {
  // Request permissions (required for iOS)
  console.log("test NOTIFACTION",DATA)
  await notifee.requestPermission()

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'amina85306',
    name: 'aminachanel6',
    sound:"notification",
    importance:AndroidImportance.HIGH
  });

  // Display a notification
  await notifee.displayNotification({
    title: DATA.notification.title,
    //subtitle: '&#129395;',
    body:DATA.notification.body,
    
    android: {
       channelId,
      color: '#f38193',
      badgeCount:1,
      actions: [
        {
          title: '<b>Read</b> &#128111;',
          pressAction: { id: 'dance' },
        },
        {
          title: '<p style="color: #f44336;"><b>later</b> &#128557;</p>',
          pressAction: { id: 'cry' },
        },
      ],
    },
    ios:{
      sound:"default"
    }
  });
}


export const notifacttionlistener=async()=>{
  
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', remoteMessage);
    onDisplayNotification(remoteMessage)
    // Alert.alert(remoteMessage.notification.title,remoteMessage.notification.body)
  });
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
    );

      // if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to == "ProductDetail") {
      //     setTimeout(() => {
      //         NavigationService.navigate("ProductDetail", { data: remoteMessage?.data })
      //     }, 1200);
      // }

      // if (!!remoteMessage?.data && remoteMessage?.data?.redirect_to == "Profile") {
      //     setTimeout(() => {
      //         NavigationService.navigate("Profile", { data: remoteMessage?.data })
      //     }, 1200);
      // }
  });
   
  messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage) {
      console.log(
        'Notification caused app to open from quit state:',
        remoteMessage.notification,
      );
      
    }
   
   // setLoading(false);
  });
  return unsubscribe;
}  