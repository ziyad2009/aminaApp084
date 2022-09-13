/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React,{useState,useEffect} from 'react';
import { Platform, NativeModules } from 'react-native'
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
  Colors,Fonts,Metrics
} from './src/assets/Themes/';
import {WithSplashScreen} from './src/Home/splashScreen' 
import IntroScreen from './src/introscreen';
import Singin from './src/login';
 import UserProvider  from './src/services/UserContext'
import Mapscreen  from './src/map';
import Navigation from './src/routes/AuthRouter';
import {I18nManager} from 'react-native'
 


const App =() => {
  
  const [showRealApp,setshowRealApp]=useState(false)
  const config = {
    dependencies: {
    // For Expo projects (Bare or managed workflow)
    //'linear-gradient': require('expo-linear-gradient').LinearGradient,
    // For non expo projects
    'linear-gradient': require("react-native-linear-gradient").default,
    },};

    useEffect(() => {
          SplashScreen.hide();
     }, []);
  //     const changeAppLang= async(lang)=>   {

  //     if(lang == 'Ar') {
  //         if (!I18nManager.isRTL) {
  //             await I18nManager.forceRTL(true);
  //           }
  //     } else {
  //         if (I18nManager.isRTL) {
  //             await I18nManager.forceRTL(false);
  //           }
  //     }
  //     RNRestart.Restart()
  // }
 
  if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
      RNRestart.Restart();
  }
  const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;

console.log("Divice languge",deviceLanguage); //en_US
  
  return(
    <NativeBaseProvider config={config} >
      <UserProvider>
         <Navigation  />
      </UserProvider>
         
        
       </NativeBaseProvider>
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
