import React, { useState ,useEffect,useRef,useContext} from 'react';
import PhoneInput from "react-native-phone-number-input";
import styles from "./styles";
 
import { Images,Colors ,ApplicationStyles, Metrics, Fonts, fontPixel, pixelSizeVertical} from "../assets/Themes/";
import { View ,Image,TouchableOpacity,Platform,Linking,Alert} from 'react-native';
import images from '../assets/Themes/Images';
import  api from '../services/api'
import  {UserContext} from '../services/UserContext';
import CustomButton from '../services/buttons/buttton';
import { Spinner, Stack ,Button,Text,Modal,FormControl,Input,Box} from 'native-base';
import api2 from '../services/api'; 
import DeviceInfo from 'react-native-device-info';
import notifee, { AndroidImportance } from '@notifee/react-native';
import Toast from 'react-native-toast-message';
import setItem from '../services/storage'
const Singin=(props)=>{
    
    const [auth,setauth]=useState(true)
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const phoneInput = useRef (phoneInput);
    const[confirm,setConfirm]=useState(null);
    const[code,setcode]=useState("");
    const [valid, setValid] = useState(false);
    const [loadform,setloadform]=useState(false) 
    const [showMessage, setShowMessage] = useState(false);
    const[phoneNo,setphoneNo]=useState("")
    const[erorrmesage,seterorrmesage]=useState(false)
    const {loading,loginbyphone,user,statuscode,regUser,home} = useContext(UserContext);
    
    const [placement, setPlacement] = useState(undefined);
    const [open, setOpen] = useState(false);
    const [result,setresult]=useState([])
    let buildNumber = DeviceInfo.getBuildNumber();
  const appName=DeviceInfo.getApplicationName();
  const app_version=DeviceInfo.getVersion()
  const app_type=Platform.OS==='android'?"android":"ios"
    
  useEffect(async () => {

    if (!valid) {
      console.log("number is not valid")

    } else {
      console.log("number is valid")
      seterorrmesage(false)
    }

    console.log("builed no is", buildNumber)
    console.log("Version is", app_version)
    console.log("app name is", appName)
    console.log("appp type", app_type)

    await api2.get(`/codepush/${app_type}`).then((res) => {
      console.log("tetst app info", res.data)
      setresult(res.data)

    }).catch((err) => {
      console.log("Errorr from get app info", err)
    })

  }, [])


     
     useEffect(async()=>{
     // GoScreen()
     console.log("Start Go screen frromLOGINScreen",regUser)
     if(regUser){
      setloadform(false)
      GoScreen()
     }
      
     },[home,regUser])
      
 useEffect( ()=>{
      updaterVersioApp()
},[result])
       
const updaterVersioApp=( )=>{
  console.log("Start Test Array",result.appid)
  console.log("Start Test Array",buildNumber)
  if(result.appid <= buildNumber){
    handeAppUpddate(result  )
 }
}

const handeAppUpddate=(data)=>{
  console.log("taaa",data.appid)
  if(data.appid!=buildNumber){
     console.log('update app please')
   Alert.alert(
    "تطبيق أمينة",
    "الرجاء تحديث التطبيق من  المتجر للاسففادة من المزايا الجديده",
    [
       
      { text: "الاستمرار", onPress: ()=> directoStor() }
    ],
    { cancelable: false }
  );
 
  }
}

  useEffect(  () => {
    const unsubscribe = props.navigation.addListener('focus',async () => {
      console.log("test foucs mode")
      updaterVersioApp()
    }); 

    return unsubscribe;
  }, []);


const openModal = placement => {
  setOpen(true);
  setPlacement(placement);
};

const directoStor=()=>{
  if(Platform.OS==='android')
    Linking.openURL("market://details?id=com.amenid084")
    else{
      const link='itms-apps://apps.apple.com/us/app/تطبيق-أمينة/id1642193505'
      Linking.canOpenURL(link).then(
        (supported) => {
          supported && Linking.openURL(link);
        },
        (err) => console.log("Erorr open link",err)
      );
      
    }
    
}

     const isValidNo = async()=>{
      const number = phoneInput.current.state.number.replace( /^0/gi, '');
      const checkValid = phoneInput.current?.isValidNumber(value);
              setShowMessage(true);
              setValid(checkValid ? checkValid : false);
              
              checkValid ? loginByPhone(`966${number}`):seterorrmesage(true);
              setphoneNo(`966${number}`)
          

     }
     const loginByPhone=async ( )=>{
      //console.log("from login Start login by phone",phoneInput.current.state.number )
      const number = phoneInput.current.state.number.replace( /^0/gi, '');
      setloadform(true)
      await loginbyphone(`966${number}`).then((res)=>{
        console.log("Respon DATA froo Function",res)
        if(!valid){
          seterorrmesage(true)
        }

        setloadform(false)
      
        
      })
      
      // setphoneNo(`966${phoneInput.current.state.number}`)
      // GoScreen()
     }

     const GoScreen= async()=>{
       //navigation.navigate('AuthScreen', {'role' : role});
       
       try{
        const userdata= await user
        console.log("User Data not store ",regUser)

       if(regUser){
           console.log("User Data was store ",regUser)
          props.navigation.push('Authbycode',{phone:userdata.phone,id:userdata._id});
        }

        if(home){
        console.log("HOME Screen Statuse  ",home)
        }
        if(statuscode===404){
        console.log("From login code 404")
        }}catch(erorr){

       }
       
     }
     
    const Testtnot=(async()=>{
      const settings = await notifee.requestPermission();
      const {alarm,authorizationStatus}=settings.android
      const {alert,badge,sound,lockScreen}=settings.ios
      const text2 =`IOS alret=${alert} badge ${badge} sound ${sound} lock-${lockScreen}  `
      const text =`android alarm=${alarm} \n 
      ${text2}`
      console.log( text )
      Alert.alert("note",text, text2)
    })
    const testnnotif2=async()=>{
    const token=  await setItem.getItem("@FCMTOKEN")
    Alert.alert("toke",token)
    }
  
     
    
    return(
    <View style={{ alignItems:'center',backgroundColor:Colors.white ,flex:1}}>
       
        <Image source={images.aminamainlogo} resizeMode='contain'
            style={ styles.mainlogo} />
         
        <Stack mt={'12'} alignItems={'center'} justifyContent={'center'}>
          <Text fontFamily={Fonts.type.medium} fontSize={fontPixel(24)} color={"#214F5E"}>تطبيق أمينة</Text>
        </Stack>
        
        <View style={styles.inputFieldSec} >
          <Stack alignItems={'flex-start'}   width={"80%"} height={'7'}>
            <Text fontFamily={Fonts.type.regular} fontSize={fontPixel(16)} color={"#2E2E2E"}>رقم الجوال</Text>
          </Stack>
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="SA"
            keyboardType="phone-pad"
            layout='second'
            onChangeText={(text) => {
              const value = text.replace( /^0/gi, '');
              console.log('zeroo',value)
              setValue(value);
             
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            placeholder="5xxxxxxxx" 
             textContainerStyle={{backgroundColor:Colors.white,marginTop:2}}
             textInputStyle={{fontSize:Platform.OS==='android'?18: 20,color:"rgb(40, 40, 43)    "}}
            containerStyle={{ backgroundColor:Colors.white ,alignContent:'flex-end'}} 
            withDarkTheme
            withShadow
            autoFocus
            
          />
         
           
        </View>
          <CustomButton
            buttonColor={Colors.textZahry}
            titleColor={Colors.white}
            title="تسجيل الدخول"
            buttonStyle={{width: '80%', alignSelf: 'center',borderRadius:10}}
            textStyle={{fontFamily:Fonts.type.medium,fontSize:fontPixel(16)}}
            onPress={()=> isValidNo()}
          />
            
          <View style={{marginTop:14}}>
              <Text  fontFamily={Fonts.type.regular} fontSize={fontPixel(14)} color={Colors.newTextClr} >بالتسجيل انتي توافقين على شروط واحكام تطبيق امينة </Text>
          </View>

             

          {erorrmesage && <View style={{marginTop:40}}>
                  <Text fontFamily={Fonts.type.regularstyle}  fontSize={fontPixel(15)} color={'error.500'} >الرجاء التاكد من رقم الجوال</Text>
                 </View>
          }

        <View>
          
          <View style={{justifyContent:'center'}}>
                  {loadform&&<Spinner size={'lg'} color={Colors.loginGreen}   />}
          </View>
                
        </View>

        
              
      <Toast
        position='top'
        topOffset={20}
        visibilityTime={10000}
      />

    </View>
    )
    
    

}
export default Singin;