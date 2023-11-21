/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React,{useState,useEffect,useContext} from 'react';
import { Platform, NativeModules, Alert, LogBox ,AppState} from 'react-native'
import RNRestart from "react-native-restart";
import SplashScreen from 'react-native-splash-screen';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,Image,
  Text,TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {NativeBaseProvider} from 'native-base'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'
import {
  Colors,Fonts,Metrics
} from './src/assets/Themes/';
 import UserProvider  from './src/services/UserContext'
import Mapscreen  from './src/map';
import Navigation from './src/routes/AuthRouter';
import {I18nManager} from 'react-native'
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { UserContext } from './src/services/UserContext';
import OneSignal from 'react-native-onesignal';
import {checkNotifications,openSettings,requestNotifications,check, PERMISSIONS, RESULTS,request} from 'react-native-permissions';
import notifee, { EventType ,AuthorizationStatus} from '@notifee/react-native';
import  {requestUserPermission,notifacttionlistener, notifeeConfige} from  './src/services/utils/notifactionservices'
import messaging from '@react-native-firebase/messaging'
//import CodePush from "react-native-code-push"; 

const appVersion='33'
// // OneSignal Initialization
// OneSignal.setAppId("e7f7d499-20ad-4a19-b702-414d65b3e158");

// // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
// // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
// OneSignal.promptForPushNotificationsWithUserResponse();

// //Method for handling notifications received while app in foreground
// OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
//   console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
//   let notification = notificationReceivedEvent.getNotification();
//   console.log("notification: ", notification);
//   const data = notification.additionalData
//   console.log("additionalData: ", data);
//   // Complete with null means don't show a notification.
//   notificationReceivedEvent.complete(notification);
// });

// //Method for handling notifications opened
// OneSignal.setNotificationOpenedHandler(notification => {
//   console.log("OneSignal: notification opened:", notification);
// });

// OneSignal.addTrigger("current_app_version", appVersion);


const App =(props) => {
  
  const [showRealApp,setshowRealApp]=useState(false)
  const [publishableKey, setPublishableKey] = useState('');
   
  const config = {
    dependencies: {
    // For Expo projects (Bare or managed workflow)
    //'linear-gradient': require('expo-linear-gradient').LinearGradient,
    // For non expo projects
    'linear-gradient': require("react-native-linear-gradient").default,
    },};

    // const fetchPublishableKey = async () => {
    //   //const key = await fetchKey(); // fetch key from your server here
    //   const key="pk_test_51NRjCPGwvmyvUe6o5AgiOgHL3ILqWU622BBFUoFYauj3vi1JBVvZPGdLh4mduITS1CDhWIXDuRpnh3kRRkCzlB8400tYXqjSEH"
    //   setPublishableKey(key);
    // };
    
    LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
   
    // useEffect(() => {
    //   let subscription = AppState.addEventListener('change', handleAppStateChange);
    //   return () => {
    //      subscription.remove();
    //   };
    // }, []);
     
    useEffect(async() => {
          requestUserPermission()
          notifacttionlistener()
          SplashScreen.hide();
          requestUserPermissionNotfee()
          askAdspermisionIOs()
        
           
        //   notifee.onForegroundEvent(({ type, detail }) => {
        //     //console.log("starr 00000000000000",type,"aand =",detail)
        //     if (type === EventType.APP_BLOCKED) {
        //       console.log('User toggled app blocked????', detail.blocked);
        //     }
          
        //     if (type === EventType.CHANNEL_BLOCKED) {
        //       console.log('User toggled channel block???', detail.channel.id, detail.blocked);
        //     }
          
        //     if (type === EventType.CHANNEL_GROUP_BLOCKED) {
        //       console.log('User toggled channel group block???', detail.channelGroup.id, detail.blocked);
        //     }
        //  });

         
          
     }, []);

     useEffect(() => {
      messaging()
          .getDidOpenSettingsForNotification()
          .then(async didOpenSettingsForNotification => {
              if (didOpenSettingsForNotification) {
                console.log("start go tonotifcation ")
                props.navigation.navigate('Notifactionscreen')
              }
          })
}, [])


 


    async function requestUserPermissionNotfee() {
          const settings = await notifee.requestPermission();
         if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
            console.log('notifee ==> Permission settings:  is alow', settings);
           // getnotfctionstatuse(true)
            await notifee.requestPermission({
              sound: true,
              announcement: true,
              inAppNotificationSettings: true,
              criticalAlert:true,
              criticalVolume: 0.9,
             
              // ... other permission settings
            });
            
          } else {
            console.log('notifee ===> User declined permissions');
            
            askPermsionNotfaction()
            await notifee.requestPermission({
              sound: true,
              announcement: true,
              inAppNotificationSettings: true,
              criticalAlert:true,
             criticalVolume: 0.9,
             
              // ... other permission settings
            });
          }
          console.log('iOS settings: ', settings.ios);
          
        }

     
        async function getExistingSettings() {
          const settings = await notifee.getNotificationSettings();
        
          if (settings) {
            console.log('Current permission settings: ', settings);
          }
        }

        const askAdspermisionIOs=( )=>{
          
            check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
              .then(async (result) => {
                if (result == RESULTS.GRANTED) {
                  console.log('Tracking! suu');
                  // do something related to tracking
      
                } else {
                  console.log('Not Tracking! fial');
                }
              })
              .catch((error) => {
                console.log('error in request tracking permissions: ', error);
              });
            
        }

      
      const askPermsionNotfaction=()=>{
         
          if(Platform.OS==='android'){
            check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
            .then((result) => {
              switch (result) {
                case RESULTS.UNAVAILABLE:
                  console.log('This feature is not available (on this device / in this context)');
                  break;
                case RESULTS.DENIED:
                  console.log('The permission has not been requested / is denied but requestable');
                  Alert.alert("تم رفض تفعيل التنبيهات في المستقبل")
                  break;
                case RESULTS.LIMITED:
                  console.log('The permission is limited: some actions are possible');
                  break;
                case RESULTS.GRANTED:
                  console.log('The permission is granted');
                  break;
                case RESULTS.BLOCKED:
                  openSettings()
                  break;
              }
            })
            .catch((error) => {
              console.log('Erorr in notifscttions',error);
            });
          }
          
          checkNotifications().then(({status, settings})=>{
            if(status==='blocked'){
              requestNotifications(['alert', 'sound']).then(({status, settings})=>{
               
               Alert.alert(
                "امينة",
                "يود تطبيق اميينةارسال الاشعارات اليك يمكن ان تتضمن الاشعارات تنبيهات ،اصوات وشارات على الايقونة يمكن تكوين ذلك في الاعدادات",
                [
                  {
                    text: "سماح",
                    onPress: () => openSettings()
                  },
                  {
                    text: "عدم السماح",
                    onPress: () => console.log("status",status),
                    style: "cancel"
                  },
                  
                ],
                { cancelable: false }
              );
            
              })
            }
            // console.log("status",status)
            // console.log("settings",settings)
          })
        }

      
  if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
      RNRestart.Restart();
  }
  const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;

      //console.log("Divice languge",deviceLanguage); //en_US
  
  return(
    <AutocompleteDropdownContextProvider>
      <NativeBaseProvider config={config} >
        <UserProvider>
          <SafeAreaProvider>
        
            <Navigation  />
          
          </SafeAreaProvider>
         
      </UserProvider>
         
        
       </NativeBaseProvider>
    </AutocompleteDropdownContextProvider>
    
   )
};
  
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    fontFamily:Fonts.type.sembold
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
   width: Metrics.WIDTH*0.92,
    height: Metrics.HEIGHT*0.292,
  },
  introTextStyle: {
    fontSize: 15,
    color: '#214F5E',
    textAlign: 'center',
    //paddingVertical: 30,
    fontFamily:Fonts.type.base,
    fontWeight:'400',
    
  },
  introTitleStyle: {
    fontSize: 30,
    fontFamily:Fonts.type.bold,
    color: '#2E2E2E',

    textAlign: 'center',
    marginTop:20,
    marginBottom: 1,
    fontWeight:'700',
   // backgroundColor:"red"
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  paginationDots: {
    height: 16,
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 30,
    height: 7,
    borderRadius: 5,
    marginHorizontal: 4,
  },

});

export default App;
