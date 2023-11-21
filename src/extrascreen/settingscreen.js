import React ,{useState,useEffect,useContext}from 'react';
import {View,Platform, Alert,I18nManager} from 'react-native';
import{Button,Modal,Center,Text,Box, HStack, Stack,Switch} from 'native-base';
 
import { Colors ,Metrics, Fonts, fontPixel} from '../assets/Themes/';
import api from '../services/api';
 import setItem from '../services/storage'
 import { UserContext } from '../services/UserContext';
 import RNRestart from "react-native-restart";
 import messaging from '@react-native-firebase/messaging';
 import notifee, { AuthorizationStatus } from '@notifee/react-native';
 import {checkNotifications,openSettings,requestNotifications,check, PERMISSIONS, RESULTS,request} from 'react-native-permissions';

const SettingScreen=(props)=>{
    const{sethome,setRegUser}=useContext(UserContext)
    const {notifactionStatuse,notifactionstring,notifeeStatuse} = useContext(UserContext);
    const[firbaseNotifcationST,setfirbaseNotifcationST]=useState(false)
    const[firbaseNotifcation,setfirbaseNotifcation]=useState(null)
    const[notfeeService,setnotfeeService]=useState('')
    const[isVisuable,setisVisuabl]=useState(false)
    useEffect(()=>{
      checkApplicationPermission().then(()=>{
        checkNotfeeService()
      })
    },[])
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
   
const checkApplicationPermission=async()=> {
  const authorizationStatus = await messaging().requestPermission();

  if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    setfirbaseNotifcation(authorizationStatus)
    setfirbaseNotifcationST(true)
    console.log('User has notification permissions enabled.');
  } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
    setfirbaseNotifcation(authorizationStatus)
    setfirbaseNotifcationST(false)
     console.log('User has provisional notification permissions.');
  } else {
    setfirbaseNotifcation(authorizationStatus)
    setfirbaseNotifcationST(false)
    console.log('User has notification permissions disabled');
  }
}
const checkNotfeeService=async()=>{
  const settings = await notifee.requestPermission()
 if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
  setnotfeeService('User denied permissions request');
} else if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
   setnotfeeService('User granted permissions request');
} else if (settings.authorizationStatus === AuthorizationStatus.PROVISIONAL) {
   setnotfeeService('User provisionally granted permissions request');
}

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
    console.log("status",status)
    console.log("settings",settings)
  })
}

    return(
        <Box mt={Platform.OS==='android'?60:88} background='white' flex={1}>
            <HStack alignItems="center" w={"100%"} padding={5} justifyContent='space-between' backgroundColor='white' borderColor={Colors.text} borderWidth={1} mt="1" mb="1">
                <Text textAlign={'right'} color= {Colors.blacktxt} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}
                  fontSize={fontPixel(18)}  fontWeight='400' >الاشعارات</Text>
                <Switch onToggle={()=>askPermsionNotfaction()} onChange={()=>console.log("cjha")} isChecked={firbaseNotifcationST} size="sm" />
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
                <Button variant={'ghost'} colorScheme={'amber'} onPress={()=>setisVisuabl(!isVisuable)}><Text>O</Text></Button>
                
            </HStack>;
           {isVisuable&&<Box alignItems={'center'} mr={'3'}>
              <Stack flexDirection={'column'} alignItems={'center'}>
                <Text>Notifaction from firbase== {firbaseNotifcation}</Text>
                <Text>Notifaction string={notifactionstring}</Text>
                <Text>notfee st={notfeeService}</Text>
              </Stack>
            </Box>}
        </Box>
    )
}
export default SettingScreen;