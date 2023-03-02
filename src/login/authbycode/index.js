import React, { useState ,useEffect,useRef,useContext} from 'react';
 
import styles from "./styles";
import { Images,Colors , Metrics, Fonts, fontPixel} from "../../assets/Themes/";
import { View ,Image,Text,TouchableOpacity, Platform, Alert} from 'react-native';
import  {UserContext} from '../../services/UserContext';
 import {Box,Button} from 'native-base'
import SMSVerifyCode from 'react-native-sms-verifycode'
import api from '../../services/api';
import setItem from '../../services/storage'


const initialTime = 130 * 1000; // initial time in milliseconds, defaults to 60000
const interval = 1000; // interval to change remaining time amount, defaults to 1000

const Authbycode=({ route ,navigation})=>{
    
  //const [timeLeft, { start, pause, resume, reset }] = useCountDown(initialTime, interval);
    const [onInputCompleted,setonInputCompleted]=useState('')
    const verifycode = useRef (verifycode);
    const [showMessage, setShowMessage] = useState(false);
     
    const[erorrmesage,seterorrmesage]=useState(false)
    
    const[ minutes_Counter,setminutes_Counter]=useState(1)
    

    const [seconds, setSeconds] = useState(10);
    const [isActive, setIsActive] = useState(true);


 
  const {loginbycoded,statuscode,errmsg} = useContext(UserContext);
    const [msg,setmsg]=useState( `قمنا بارسال رسالة نصيه تحتوي على رمز ./n التفعيل لزقمك${route.params.phone}`)
   
     
  // useEffect(() => {
  //     start();
  //   }, []);

  // const restart = React.useCallback(() => {
  //     // you can start existing timer with an arbitrary value
  //     // if new value is not passed timer will start with initial value
  //     const newTime = 42 * 10000;
  //     start(newTime);
  //   }, []);
     

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(59);
    setIsActive(false);
  }

    
  useEffect(() => {
    // if (statuscode!=null){
    //   console.log("code is",statuscode)
    //   seterorrmesage(true)
    // }else{
    //   seterorrmesage(false)
    // }
    console.log("code is",statuscode)
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds -1);
      }, 1000);
    }
    if ( seconds == 0 && minutes_Counter==0) {
      // console.log("Start zeroo")
      clearInterval(interval);
      setIsActive(false)
    }
    if( seconds == 0 ){
      // console.log("Start reset")
      setSeconds(10)
      setminutes_Counter(0)
    } 
    console.log("Seconds :",seconds+"meiuts ",minutes_Counter)
    return () => clearInterval(interval);
  }, );


 
const onCodechange=(val)=>{
        
        seterorrmesage(false)
        setonInputCompleted(val)
      }



      
     async function confirmCode (code) {
      const usrId=route.params.id
       console.log("user id",code,"  ",usrId)
       
      loginbycoded(code,usrId).then((res)=>{
            console.log("test code RESPONSE from AUTH code 3++",res)
          if(res.status===false){
            console.log("code status false",res.status)
             return seterorrmesage(true)
          }
          //get response from server  response res.status===true  
          if(res.status===true){
            console.log("code status true",res.status)
            seterorrmesage(false)
            navigation.navigate('Profile')
         }
        }).catch((error) => {
          Alert.alert("تنبيه","الرجاء التاكدمن وصول الانترنت")
          console.log(error)
        })

     }


    //  async function confirmCode (code) {
    //   const token= await setItem.getItem('BS:Token');
    //   api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    //         const verify = await api.post('/servicecodde/', {
    //           scurtycode: 6772,
    //           orderID: "62d2cc99a15222e5d0f9aef3"
    //         })
    //         console.log("Vv",verify.data)
            
  
    //    }
 
     const renewCode=async()=>{
      const motherData = await setItem.getItem('BS:User');
      const mother=JSON.parse(motherData)
      const token= await setItem.getItem('BS:Token');

          api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
           await api.post('/user/newcode', {
                  id:  mother._id
                  
                }).then((res)=>{
                  console.log("new code send ",res.data)
                }).finally(()=>Alert.alert("msg","code was send to your mobail"))
                

     }

     

   
     
    
        return(
    <View style={styles.contaner}>
      <Box  alignItems='center' paddingTop={30}>
        <View style={{marginTop:Metrics.HEIGHT*0.091}}>
        <Text  style={styles.labetText}>ادخل الرمز</Text>
        </View>
        <View style={{marginTop:Metrics.HEIGHT*0.011,alignItems:'center'}} >
          <Text  style={{fontFamily:Fonts.type.regular,fontSize:fontPixel(16),color:"#616171",textAlign:'center'}}>
            { `قمنا بارسال رسالة نصيه تحتوي على رمز `}
            {` التفعيل لرقمك  ${route.params.phone}`}
          </Text>
        </View>

         <View style={{ alignContent:'flex-start'}} >
            <SMSVerifyCode
                ref={ verifycode}
                onInputCompleted={(e)=>onCodechange(e)}
                verifyCodeLength={4}
                containerPaddingVertical={10}
                containerPaddingHorizontal={50}
                containerBackgroundColor={Colors.transparent}
                codeViewBorderColor={"#214F5E"}
                containerStyle={styles.codecontiner}
                //codeViewStyle={{alignContent:'flex-start',textAlign:'right'}}
                 focusedCodeViewBorderColor="#0000FF"
                 warningTitle="الرجاء ادخال ارقام فقط"
                codeViewBorderWidth={.4}
                codeViewBorderRadius={5}
                
            />
         
           
        </View>
        
        < TouchableOpacity onPress={()=> confirmCode(onInputCompleted)  }   
              style={styles.loginButton}>
            <Text style={styles.endButtonTxt}>تحقق</Text>
          </TouchableOpacity>
 

          <View style={{paddingBottom:2,paddingTop:10,alignItems:'flex-end',flexDirection:'row',}}>
            {isActive ? 
            <Box flexDirection={'row'} mt={'10'} >
            <Text style={styles.timerText}> {minutes_Counter}:{seconds}</Text>
            <Text style={styles.timerText}  > اعادة الارسال </Text>
            </Box>:
            <Button variant={'link'} fontWeight='400' mt={'10'}  fontSize={18} color={'amber.700'} fontFamily={Fonts.type.base}
            onPress={()=>{renewCode()}} >اعادة الارسال </Button>}
          </View>
          {erorrmesage && <View style={{marginTop:4}}>
            <Text style={{fontFamily:Fonts.type.sembold,fontSize:18,fontWeight:"400",color:"red"}}>{errmsg}</Text>
          </View> }
 
           
               
      </Box>
        
              
          
    </View>
    )
    
    

}
export default Authbycode;