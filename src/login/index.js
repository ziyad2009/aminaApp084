import React, { useState ,useEffect,useRef,useContext} from 'react';
import PhoneInput from "react-native-phone-number-input";
import styles from "./styles";
import { Images,Colors ,ApplicationStyles, Metrics, Fonts} from "../assets/Themes/";
import { View ,Image,Text,TouchableOpacity,Platform} from 'react-native';
import images from '../assets/Themes/Images';
import  api from '../services/api'
import  {UserContext} from '../services/UserContext';
import CustomButton from '../services/buttons/buttton';
  

const Singin=(props)=>{
    
    const [auth,setauth]=useState(true)
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const phoneInput = useRef (phoneInput);
    const[confirm,setConfirm]=useState(null);
    const[code,setcode]=useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const[phoneNo,setphoneNo]=useState("")
    const[erorrmesage,seterorrmesage]=useState(false)
    
  const {loading,loginbyphone,user,statuscode,regUser,home} = useContext(UserContext);
    //navigation.navigate('AuthScreen', {'role' : role});
      //console.log("test childe byphone",props.navigation)
    
    useEffect(async()=>{
      
      if(!valid){
        console.log("number is not valid")

        } else{
         console.log("number is valid")  
        }
    })
     
     useEffect(async()=>{
      GoScreen()
      
     },[home,regUser])
      

     const isValidNo = async()=>{
      const checkValid = phoneInput.current?.isValidNumber(value);
              setShowMessage(true);
              setValid(checkValid ? checkValid : false);
              checkValid ? loginByPhone(`966${phoneInput.current.state.number}`):null;
              setphoneNo(`966${phoneInput.current.state.number}`)
          

     }
     const loginByPhone=( )=>{
      //console.log("from login Start login by phone",phoneInput.current.state.number )
      loginbyphone(`966${phoneInput.current.state.number}`).then((res)=>{
        console.log("test RES",res)
      })
      //test statuse code 
      console.log("ST code" ,statuscode)
      setphoneNo(`966${phoneInput.current.state.number}`)
      GoScreen()
     }

     const GoScreen= async()=>{
       //navigation.navigate('AuthScreen', {'role' : role});
       console.log("Start Go screen")
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
         

         <View style={styles.inputFieldSec} >
        <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="SA"
            keyboardType="phone-pad"
            layout='second'
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            placeholder="ادخل رقم الجوال" 
             textContainerStyle={{backgroundColor:Colors.white,marginTop:2}}
             textInputStyle={{}}
           // textInputStyle={Platform.OS==='ios'?{ fontWeight:"200",fontFamily:Fonts.type.base,color:Colors.blacktxt}:
             //               {fontSize:20, height:Metrics.HEIGHT*0.0626,backgroundColor:Colors.white,fontWeight:"200",}}
            // containerStyle={{marginTop:20}}
            containerStyle={{ backgroundColor:Colors.white ,alignContent:'flex-end'}} 
            withDarkTheme
            withShadow
            autoFocus
          />
         
           
        </View>
        <CustomButton
        
        titleColor={Colors.white}
        title="تسجيل الدخول"
        buttonStyle={{width: '80%', alignSelf: 'center'}}
        textStyle={{fontSize: 20}}
        onPress={()=> isValidNo()}
      />
         
            
              <View style={{marginTop:14}}>
                  <Text style={{fontFamily:Fonts.type.sembold,fontSize:15,color:Colors.textZahry,fontWeight:"400"}}>بالتسجيل انتي توافقين على </Text>
                  <Text style={{fontFamily:Fonts.type.sembold,fontSize:15,color:Colors.textZahry,fontWeight:"400"}}> شروط واحكام تطبيق امينة</Text>
              </View>

              {erorrmesage && <View style={{marginTop:40}}>
                  <Text style={{fontFamily:Fonts.type.sembold,fontSize:15,fontWeight:"400",color:"red"}}>الرجاء التاكد من رقم الجوال</Text>
              </View>
              }

              <View>
                {loading&&<View style={{marginTop:40}}>
                  <Text style={{fontFamily:Fonts.type.sembold,fontSize:15,fontWeight:"400",color:"red"}}>لحظات..</Text>
                </View>}
                
              </View>
              
          
    </View>
    )
    
    

}
export default Singin;