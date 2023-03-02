import React, { useState ,useEffect,useRef,useContext} from 'react';
import PhoneInput from "react-native-phone-number-input";
import styles from "./styles";
import { Images,Colors ,ApplicationStyles, Metrics, Fonts, fontPixel, pixelSizeVertical} from "../assets/Themes/";
import { View ,Image,TouchableOpacity,Platform} from 'react-native';
import images from '../assets/Themes/Images';
import  api from '../services/api'
import  {UserContext} from '../services/UserContext';
import CustomButton from '../services/buttons/buttton';
import { Spinner, Stack ,Text} from 'native-base';
  

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
    
    
    useEffect(async()=>{
      
      if(!valid){
        console.log("number is not valid")

        } else{
         console.log("number is valid")  
        }
    })
     
     useEffect(async()=>{
     // GoScreen()
     console.log("Start Go screen",regUser)
     if(regUser){
      setloadform(false)
      GoScreen()
     }
      
     },[home,regUser])
      

     const isValidNo = async()=>{
      const number = phoneInput.current.state.number.replace( /^0/gi, '');
      const checkValid = phoneInput.current?.isValidNumber(value);
              setShowMessage(true);
              setValid(checkValid ? checkValid : false);
              
              checkValid ? loginByPhone(`966${number}`):null;
              setphoneNo(`966${number}`)
          

     }
     const loginByPhone=async ( )=>{
      //console.log("from login Start login by phone",phoneInput.current.state.number )
      const number = phoneInput.current.state.number.replace( /^0/gi, '');
      setloadform(true)
      await loginbyphone(`966${number}`).then((res)=>{
        console.log("Respon DATA froo Function",res)
        
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
     
    
     
    
    return(
    <View style={{ alignItems:'center',backgroundColor:Colors.white ,flex:1}}>
        <Image source={images.aminamainlogo} resizeMode='contain'
            style={ styles.mainlogo} />
         
        <Stack mt={pixelSizeVertical(53)}>
        <Text fontFamily={Fonts.type.medium} fontSize={fontPixel(24)} color={"#214F5E"}>تطبيق أمينة</Text>
        </Stack>
         <View style={styles.inputFieldSec} >

        <Stack alignItems={'flex-start'}   width={"80%"}>
          <Text fontFamily={Fonts.type.regular} fontSize={fontPixel(14)} color={"#2E2E2E"}>رقم الجوال</Text>
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
             textInputStyle={{fontSize:Platform.OS==='android'?18: 20}}
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
                  <Text style={{fontFamily:Fonts.type.sembold,fontSize:15,fontWeight:"400",color:"red"}}>الرجاء التاكد من رقم الجوال</Text>
              </View>
              }

              <View>
                {loading&&<View style={{marginTop:40}}>
                  <Text style={{fontFamily:Fonts.type.sembold,fontSize:15,fontWeight:"400",color:"red"}}>لحظات..</Text>
                </View>}

                <View style={{justifyContent:'center'}}>
                  {loadform&&<Spinner size={'lg'} color={Colors.AminaButtonNew}   />}
                </View>
                
              </View>
              
          
    </View>
    )
    
    

}
export default Singin;