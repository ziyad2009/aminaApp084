import React ,{useState,useContext}from 'react';
import {View,Platform, Alert,I18nManager} from 'react-native';
import{Button,Modal,Center,Text,Box, HStack, Stack,Switch} from 'native-base';
 
import { Colors ,Metrics, Fonts, fontPixel} from '../assets/Themes/';
import api from '../services/api';
 import setItem from '../services/storage'
 import { UserContext } from '../services/UserContext';
 import RNRestart from "react-native-restart";

const SettingScreen=(props)=>{
    const{sethome,setRegUser}=useContext(UserContext)
    
    const logOut= async()=>{
       
        const token = await setItem.getItem('BS:Token');
        api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
        api.post('/user/logout').then((res)=> {
          console.log("logout res",res)
        }).finally(async()=>{
          await setItem.removeItem('BS:User');
          await setItem.removeItem('BS:Token');
          //await setItem.removeItem('BS:Location')
  
          sethome(false)
            RNRestart.Restart()
        })}
    const alretMSG=()=>{
        const Emsg="Deleting your account will delete your access and all your information on this App.\n  Are you sure you want to continue?"
        const Armsg="حذفك لحسابك سوف يزيل جميع سجلا التسجيل والطلبات لديك بشكل نهائي"
    
        Alert.alert('amina', I18nManager.isRTL?Armsg:Emsg, [
            {
            text: 'Cancel',
            onPress: () =>  props.navigation.goBack(),
            style: 'cancel',
            },
            {text: 'OK', onPress: () => logOut()},
        ]);

    }

    return(
        <Box mt={Platform.OS==='android'?60:88} background='white' flex={1}>
            <HStack alignItems="center" w={"100%"} padding={5} justifyContent='space-between' backgroundColor='white' borderColor={Colors.text} borderWidth={1} mt="1" mb="1">
                <Text textAlign={'right'} color= {Colors.blacktxt} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}
                  fontSize={fontPixel(18)}  fontWeight='400' >الاشعارات</Text>
                <Switch size="sm" />
            </HStack>
            <HStack alignItems="center" w={"100%"} padding={5} justifyContent='space-between' backgroundColor='white' borderColor={Colors.text} borderWidth={1} mt="1" mb="1">
                <Text textAlign={'right'} color= {Colors.blacktxt} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.light} 
                  fontSize={fontPixel(18)}  fontWeight='400'>اللغه</Text>
                <Text  fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.light} 
                  fontSize={fontPixel(18)}  fontWeight='400'>العربيه</Text>
            </HStack>
            <HStack alignItems="center" w={"100%"} padding={5} justifyContent='space-between' backgroundColor='white' borderColor={Colors.text} borderWidth={1} mt="1" mb="1">
                <Text textAlign={'right'} color= {Colors.blacktxt} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}
                     fontSize={18}  fontWeight='400'  onPress={()=>console.log("test")} >حول التطبيق</Text>
                
            </HStack>
            <HStack alignItems='baseline' w={"100%"} padding={5} justifyContent='space-between'  backgroundColor='white' borderColor={Colors.text} borderWidth={1} mt="1" mb="1">
            <Text textAlign={'left'} color= {Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}
                     fontSize={fontPixel(18)}  fontWeight='400'   >ازالة الحساب</Text>
            <Button bgColor={Colors.AminaPinkButton} size={'sm'} variant='ghost' alignSelf={'center'} onPress={()=> alretMSG()}>
                  <Text textAlign={'right'} color= {Colors.white} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}
                     fontSize={fontPixel(14)}  fontWeight='400'  >delete Acount</Text>
                </Button>
                
            </HStack>;
        </Box>
    )
}
export default SettingScreen;