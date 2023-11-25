
import React, { useState, useRef, useEffect ,useContext} from 'react';
import { Image, View, TouchableOpacity, TextInput,Text, Platform, Alert, StyleSheet, SafeAreaView, Pressable, ActivityIndicator } from 'react-native';

import TelrSdk from 'rn-telr-sdk';
import { Metrics, Colors, Fonts,fontPixel,Images, widthPixel, heightPixel } from '../assets/Themes/';
import { Stack, Box, HStack, VStack, Spinner, Button ,Modal,Center,Actionsheet,useDisclose} from 'native-base';
import setItem from '../services/storage/index'
import api from '../services/api';
import { sendNotifcation } from '../services/fucttions';
import DeviceInfo from 'react-native-device-info';
import { UserContext } from '../services/UserContext';
import WebView from 'react-native-webview';
import uuid from 'react-native-uuid'
import { timeConversion } from 'geolib';
import { color } from 'react-native-reanimated';
let strURL='www.google.com'
let REFUSER=''
let TIMERCOUNT
const TelerPage = (props) => {
  const newdatta = props.route.params.newData
  const extrahoursScreen = props.route.params.extrastatuse ? true : false
  
  const [telrModalVisible, setTelrModalVisible] = useState(false);

  const [paymentRequest, setPaymentRequest] = useState(null);

  const [billing_name_first, setBilling_name_first] = React.useState("");

  const [billing_name_last, setBilling_name_last] = React.useState("");
  const [tran_amount, setTran_amount] = React.useState("");

  const [loading, setloding] = useState(false)
  const [email, setemail] = useState('')
  const [phone, setphone] = useState(0)
  const [DEVICEID, setDEVICEID] = useState(0)
  const [pass, setpass] = useState('processed')
  const[showModal,setshowModal]=useState(false)
  const[  loadpage,setloadpage]=useState(false)
  //const[strUrl,setstrURl]=useState('')
  const [extrapayment, seteextrapayment] = useState(false)
  const {DeviceID} = useContext(UserContext);
  const tik=useRef()
  const {
      isOpen,
      onOpen,
      onClose
    } = useDisclose();

const telrModalClose = () => {
    setTelrModalVisible(false)
    setshowModal(false)
    setpass("canceled")
    console.log("fuction telrModalClose event=canceled","الغيت من قبل المستخدمr")
   // Alert.alert("الغيت من قبل المستخدمr");
    handelScreenoption("canceled")

  }

  const didFailWithError = (message) => {
    setTelrModalVisible(false)
    setshowModal(false)
    if(message==="Declined"){
      setpass("canceled")
    }else if(message===""){

    }
    setpass("canceled")
   // Alert.alert("الغاء الدفع**", (message));
   console.log("Teler fuction didFailWithError event=canceled==",message)
    handelScreenoption("canceled")

  }

  const didPaymentSuccess = (response) => {
    console.log("Response fo Success payment+++")
    setTelrModalVisible(false)
    setshowModal(false)
    setpass("success")
    //update order paymeet after aproved by gate
    handlepayment(tran_amount)
    // Alert.alert("تنبيه-الدفع",response.message);
    console.log("Telr fuction didPaymentSuccess event=success=>",response.message)
    handelScreenoption("success")
  }

  const PaymentDeclined = (response) => {
    console.log("Response fo Declined payment+++")
    setTelrModalVisible(false)
    setshowModal(false)
    setpass("Declined")
    //update order paymeet after aproved by gate
    handlepayment(tran_amount)
    // Alert.alert("تنبيه-الدفع",response.message);
    console.log("Telr fuction didPaymentDeclined event=Declined=>",response.message)
    handelScreenoption("canceled")
  }
  const PaymentExpire = (response) => {
    console.log("Response fo Expire payment+++")
    setTelrModalVisible(false)
    setshowModal(false)
    setpass("Declined")
    //update order paymeet after aproved by gate
    handlepayment(tran_amount)
    // Alert.alert("تنبيه-الدفع",response.message);
    console.log("Telr fuction didPaymentDeclined event=Declined=>",response.message)
    handelScreenoption("canceled")
  }



  // const showTelrPaymentPage = () => {

  //   if (billing_name_first == null || billing_name_first == "") {
  //     Alert.alert("أمينة","الرجاء تحديث الاسم الاول");
  //     return
  //   } else if (billing_name_last == null || billing_name_last == "") {
  //     Alert.alert("أمينة","الرجاء تحديث الاسم الاخيدد");
  //     return
  //   } else if (tran_amount == null || tran_amount == "") {
  //     Alert.alert("أمينة","المبلغ غير مسجل");
  //     return
  //   }

  //   var paymentRequest = {
  //     framed:"1",//open card frame pass 1, and for webview pass 0
  //     sdk_env: "prod",//prod//dev
  //     something_went_wrong_message: "Something went wrong",//  this message for suppose someitng is happen wrong with payment then you can config this one.
  //     store_id: "27456-ameena app",
  //     key: "rPBH5-wLBp#g4fkq",
  //     device_type: Platform.OS === 'android' ?  "Android":"iOS",
  //     device_id: "36C0EC49-AA2F-47DC-A4D7-D9927A739F99",
  //     app_name: "Aminaapp",//enter app name
  //     app_version: "46.0",//app version
  //     app_user: "123456",//app user
  //     app_id: "102863o777",//app user id
  //     tran_test: "0", // 1=test, 0=production
  //     tran_type: "sale",//sale
  //     tran_class: "paypage",
  //     tran_cartid: `${Math.floor(Math.random() * 100) + 2}`,//enter cart id it shoud be unique for every transaction //1234567890
  //     tran_description: "paymetn from aminah app ",// enter tran description
  //     tran_currency: "SAR",
  //     tran_amount: tran_amount,
  //     tran_language: "en",
  //     tran_firstref: "",
  //     billing_name_title: "Ms",
  //     billing_name_first: billing_name_first,
  //     billing_name_last: billing_name_last,
  //     billing_address_line1: "omer bin otba",
  //     billing_address_city: "Riyad",
  //     billing_address_region: "Saudi Arabia",
  //     billing_address_country: "SA",
  //     billing_custref: "001",
  //     billing_email: email,
  //     billing_phone: phone,
  //     repeat_amount: "",
  //     repeat_interval: "1",
  //     repeat_period: "",
  //     repeat_term: "",
  //     repeat_final: "",
  //     repeat_start: "",
  //     card_number:"5241972971957301",
  //     expiry_date_m :Number("04") ,
  //     expiry_date_y :2025,
  //     cvv:248
  //   }

  //   setPaymentRequest(paymentRequest)
  //   setTelrModalVisible(true)
  // }

  const timerPayment=()=>{
    TIMERCOUNT = setInterval(() => { // <-- set tick ref current value
     checkPaymment()
    }, 5000);
  }
  

  const makePaymment=async()=>{
      const motherData = await setItem.getItem('BS:User');
      const mother = await JSON.parse(motherData)
      const motherId = mother._id
       const token = await setItem.getItem('BS:Token');
        api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
        const response= await api.post("/sendpayment",{
          language:"ar",
          cartID:uuid.v4(),
          tran_amount:tran_amount,
          userId:motherId,
          email:email,
          forenames:billing_name_first,
          surname:billing_name_last,
          phone:phone
        }).then((res)=>{
            return res.data
        }).finally(()=> onOpen() ).catch((err)=>{
            console.log("Erorr",err)
            
        })
        console.log("REWS PAYMENT",response)
        if(response.order){
          const{url,ref}=response.order
            strURL=url
            REFUSER=ref
            timerPayment()
          //setstrURl(uri)
           setshowModal(true)
          

          //props.navigation.navigate('WebPagePayment',response.order)
        }
        
  }

    const checkPaymment = async (val) => {
      const token = await setItem.getItem('BS:Token');
      api.defaults.headers.Authorization = (`Bearer ${JSON.parse(token)}`);
      const response = await api.post("/checkpayment", {
        ref: REFUSER
      }).then((res) => {

        return res.data
      }).catch((err) => {
        console.log("Erorr", err)
        Alert.alert("تنبيه", "غير قادر على جلب  بينات البروفايل")
        clearInterval(TIMERCOUNT)
      })

      console.log("TEST Ref PAYMENT response", response)
      if (response) {
        const { code, text } = response
        console.log("test code", code)
        if (code === "1") {
          console.log("now Pinding ", text)
        } else if (code ===2) {
          console.log("Authorised (Transaction not captured, such as an AUTH transaction or a SALE transaction which has been placed on hold");
          //Alert.alert("notifaction onhould", text)
          clearInterval(TIMERCOUNT)
        } else if (code ===3) {
            didPaymentSuccess(text)
            clearInterval(TIMERCOUNT)
        } else if (code ===-1) {
          PaymentExpire(text)
          console.log('The pricccsess is expire');
          //Alert.alert("notifaction onhould", text)
          clearInterval(TIMERCOUNT)
        } else if (code ===-2) {
        didFailWithError(text)
        console.log('The pricccsess is Cancelled');
        //Alert.alert("notifaction Cancelled", text)
        clearInterval(TIMERCOUNT)
        } else if (code ===-3) {
        didFailWithError(text)
        console.log('The pricccsess is Cancelled');
        //Alert.alert("notifaction Cancelled", text)
        clearInterval(TIMERCOUNT)     
      } 
    }

    }
 



  useEffect(async () => {
    console.log("PRICE++++ props",props.route.params)
    setloding(true)

    const token = await setItem.getItem('BS:Token');
    const user = await setItem.getItem('BS:User');
    const userData = JSON.parse(user)
    const totalprice = (Number(0.15) * Number(newdatta.totalprice)) + newdatta.totalprice
   // const vvat= Number(0.15)* Number(newdatta.totalprice)
    //const totalprice =   Number(newdatta.totalprice) - vvat  
    console.log("PRICE++++",totalprice)
    if (totalprice <= 0) {
      telrModalClose()
      Alert.alert("امينه", "لايمكن اتمام عملية الدفع المبلغ اقل من 1")
    }
    api.defaults.headers.Authorization = (`Bearer ${JSON.parse(token)}`);
    const response = await api.get("/mothers/me").then((res) => {
      //  console.log("start get mother data", res.data)
      const { mother } = res.data
      setBilling_name_first(mother.name)
      setBilling_name_last(mother.displayname)
      setemail(mother.email)
      setphone(mother.phone)
      setTran_amount( totalprice.toString() )
      setDEVICEID(DeviceID)
      console.log("start get mother data", totalprice)
    }).finally(() => setloding(false)
    ).catch((err) => console.log("Erorr cant get mother profile",err))

  }, [])


  const handlepayment = async (price) => {
    const user = await setItem.getItem('BS:User');
    const token = await setItem.getItem('BS:Token');
    const transctionID = Number(Math.floor(Math.random() * 1000)+(new Date).valueOf())
    const userData = JSON.parse(user)

    //start mother Payment with thise field  {status, currency, id, amount, customer} 
    //1-Transaction.findOne 2-User.findOne by phone 3-create Wallet Transaction 3-createTransaction 4-updateWallet
    api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    const response = await api.post('/mother/response/', {
      status: "completed",
      currency: "SAR",
      id: transctionID,
      amount: price,
      customer: {
        name: billing_name_first,
        phone: userData.phone,
        email: email
      }
    }
    ).then((item) => {
      console.log("Result",item.data)
      return item.data
    }).finally(() => {
      //updateOrderStatuse()
    }).catch((err) => { return err })

    console.log("payment updated ===compleate ")
  }



  const updateOrderStatuse = async () => {
    //updatee  order statuse 
    await api.patch('/orderpayment', {
      statuse: "completed",
      orderId: newdatta._id
    })
      .then((res) => {
        return res.data
      }).finally(() => sendNotif())
      .catch((err) => {
        console.log("EROR", err)

      })
  }
  const sendNotif = () => {

    const data = {
      receiver: props.route.params.newData.settterowner,
      content: "لقد تم الدفع من قبل الام ",
      title: "تم الدفع",
      orderid: props.route.params.newData.orderid,
      playerid:props.route.params.newData.setterplayerid
    }
    sendNotifcation(data)
  }

  const handelScreenoption = async(value) => {
    switch (value) {
      case "success":
        console.log("start chose screen", value)
        if (!extrahoursScreen) {
          updateOrderStatuse()
        } else {
          //send success for extra paymment
          // props.navigation.navigate({
          //   name: 'WorkScreen',
          //   params: { paymentstatuse: true },
          //   merge: true,
          // });
          const statuse=true
          await setItem.setItem('BS:EXTRAPAYMENT', JSON.stringify(statuse));
          await setItem.removeItem('BS:ReqExtratime')
        }
        break;
      case "canceled":
        console.log("start chose screen", value)
        if (!extrahoursScreen) {
        console.log('opration  was  canceld by user')
        } else {
          //send success for extra paymment
          // props.navigation.navigate({
          //   name: 'WorkScreen',
          //   params: { paymentstatuse:false },
          //   merge: true,
          // });
          const statuse=false
          await setItem.setItem('BS:EXTRAPAYMENT', JSON.stringify(statuse));
        }
        break;
    }

  }

const wetingloadPage=()=>{
  console.log("start wetingloadPage  ====?")
  setloadpage(true)
  setTimeout(() => {
    setloadpage(false)
    console.log("End wetingloadPage  ?====?")
  }, 4000);
}

const displaySpinner=()=> {
  return (
    <Box>
      {/* Your spinner code goes here. 
        This one commes from react-native-material-kit library */}
     <Box alignItems={'center'} alignContent={'center'} flex={1} backgroundColor={Colors.AminabackgroundColor} h={Metrics.HEIGHT} w={Metrics.WIDTH}>
       <ActivityIndicator size={'large'} color={Colors.red}  />
     </Box>
    </Box>
  );
}
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      {/* <TelrSdk backButtonText={"Back"} buttonBackStyle={styles.buttonBackStyle} buttonBackColor={styles.buttonBackColor} backButtonTextStyle={styles.backButtonTextStyle} paymentRequest={paymentRequest} telrModalVisible={telrModalVisible} telrModalClose={telrModalClose} didFailWithError={didFailWithError} didPaymentSuccess={didPaymentSuccess} /> */}
      {!loading ? <View style={styles.centeredView}>
      {pass === "processed" && 
        <Box width={'96'} height={Metrics.HEIGHT*0.512}  backgroundColor={Colors.AminabackgroundColor} borderRadius={'3xl'} borderColor={'black'} borderWidth={.2} mt={'16'} shadow={Platform.OS==="android"?"0":'8'}   >
          <Stack alignItems={'center'} justifyContent='center'  backgroundColor={Colors.transparent} >
            <Image source={Images.MainLogo1} style={{width:widthPixel(200),height:heightPixel(100), borderRadius:16}} resizeMode='contain' />
          </Stack>
            
          <Box alignItems={'center'} mt={'4'} justifyContent={'space-around'}>
            <Stack flexDirection={'row'} mt={2} w="80%" justifyContent={'space-between'} >
              <Text style={styles.billRighttext}>المبلغ</Text>
              <Text style={styles.billLifttext}> SR {newdatta.totalprice}</Text>
            </Stack>

            <Stack flexDirection={'row'} mt={2} w="80%" justifyContent={'space-between'}>
              <Text style={styles.billRighttext} >قيمة الضريبة المضافة</Text>
              <Text style={styles.billLifttext}>SR{parseFloat(Number(0.15) * Number(newdatta.totalprice)).toPrecision(3)}</Text>
            </Stack>
            {/* <Stack flexDirection={'row'} mt={2} w="80%" justifyContent={'space-between'}>
              <Text style={styles.billRighttext}>طريقة الدفع</Text>
              <Text style={styles.billLifttext}>بطاقة مدى</Text>
            </Stack> */}
            <Stack borderColor={Colors.newTextClr} borderBottomWidth={1} mt={'3'} h={"5%"} w={"60%"} />

            <Stack flexDirection={'row'} mt={2} w="80%" justifyContent={'space-between'}>
              <Text style={styles.billRighttext}>المبلغ الاجمالي</Text>
              <Text style={styles.billLifttext} > SR {(Number(0.15) * Number(newdatta.totalprice)) + newdatta.totalprice}</Text>
            </Stack>
          </Box>

          <Box width={"100%"} alignItems='center' justifyContent={'center'} mt={'24'}>
            {/* <Pressable
            style={[styles.buttonPay, styles.buttonPayment]}
            onPress={() => makePaymment()}>
            <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold,fontSize:fontPixel(16),fontWeight:'700',padding:2,textAlign:'center',marginTop:2,color:Colors.white }} >اكمل عملية الدفع</Text>
            </Pressable> */}
            <TouchableOpacity onPress={()=> makePaymment()} style={{width:Metrics.WIDTH*0.8717,height:Metrics.HEIGHT*0.068412,borderRadius:33,borderColor:Colors.gray,backgroundColor:Colors.textZahry,alignItems:'center',justifyContent:'center'}} >
            <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold,fontSize:fontPixel(16),fontWeight:'700',padding:2,textAlign:'center',marginTop:2,color:Colors.white }} >اكمل عملية الدفع</Text>
            </TouchableOpacity>
            
          </Box>

        </Box>

       
        
        }
        
        {pass === "success" &&
          <Box flexDirection={'column'} alignItems='center' marginTop={6} w={"100%"}>
            <Box width={"100%"} alignItems='center' justifyContent={'center'} mb={8}>
            <Stack backgroundColor={Colors.backgroundimage} borderRadius={22} mt={10} p={10}>
                <Image source={Images.wowimage} style={{width:200,height:200}} resizeMode='contain' />
            </Stack>
            <Stack  mt={2}>
                <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold,fontSize:fontPixel(22),fontWeight:'700',padding:2,textAlign:'center',marginTop:2,color:Colors.greentext }}  > تم الدفع بنجاح</Text> 
            </Stack></Box>
            <Pressable
              style={[styles.buttonPay, styles.buttonPayment]}
              onPress={() => props.navigation.navigate('Request')}>
              <Text  style={{fontFamily:Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold,fontSize:fontPixel(16),fontWeight:'700',padding:2,textAlign:'center',marginTop:2,color:Colors.white }}>طلباتي</Text>
            </Pressable>
             

          </Box>
        }
        {pass === "canceled" &&
          <Box flexDirection={'column'} alignItems='center' marginTop={6}>
            <Box alignItems={'center'}>
            <Stack backgroundColor={Colors.backgroundimage} borderRadius={22} mt={10} p={10}>
                <Image source={Images.canselorder} style={{width:widthPixel(200),height:heightPixel(200)}} />
            </Stack>
            <Stack  mt={2}>
                <Text  style={{fontFamily:Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold,fontSize:fontPixel(22),fontWeight:'700',padding:2,textAlign:'center',marginTop:2,color:Colors.black }}  >عملية الدفع  ملغية</Text> 
            </Stack></Box>
            <Pressable
              style={[styles.buttonPay, styles.buttonPayment]}
              onPress={() => props.navigation.navigate('Request') }>
              <Text  style={{fontFamily:Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold,fontSize:fontPixel(16),fontWeight:'700',padding:2,textAlign:'center',marginTop:2,color:Colors.white }}> طلباتي</Text>
            </Pressable>
            

          </Box>}
          {pass === "Declined" &&
          <Box flexDirection={'column'} alignItems='center' marginTop={6}>
            <Box alignItems={'center'}>
            <Stack backgroundColor={Colors.backgroundimage} borderRadius={22} mt={10} p={10}>
                <Image source={Images.canselorder} style={{width:widthPixel(200),height:heightPixel(200)}} />
            </Stack>
            <Stack  mt={2}>
                <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold,fontSize:fontPixel(22),fontWeight:'700',padding:2,textAlign:'center',marginTop:2,color:Colors.bloodOrange }} >عملية الدفع  مرفوضه الرجاء التاكد من بيانات البطاقة</Text> 
            </Stack></Box>
            <Pressable
              style={[styles.buttonPay, styles.buttonPayment]}
              onPress={() => props.navigation.navigate('Request') }>
              <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold,fontSize:fontPixel(16),fontWeight:'700',padding:2,textAlign:'center',marginTop:2,color:Colors.white }}> طلباتي</Text>
            </Pressable>
            

          </Box>}
        {pass === "erorr" &&
          <Box flexDirection={'column'} alignItems='center' marginTop={6}>
            <Pressable
              style={[styles.buttonPay, styles.buttonPayment]}
              onPress={() => props.navigation.navigate('Request')}>
              <Text style={styles.payButtonTextStyle}> طلباتي</Text>
            </Pressable>
            <Text  fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.bold} fontSize={fontPixel(16)} textAlign='center' mt={'2'} color={Colors.black} > خطاد في عملية الدفع</Text>

          </Box>}

        
            
            <Modal isOpen={showModal}   alignItems={undefined} justifyContent={undefined} onClose={() => setshowModal(!showModal) }  
                backgroundColor={Colors.AminabackgroundColor}  borderColor={"#a3a2a2"} opacity={1} 
                   width={Metrics.WIDTH} marginBottom={'0'} marginTop={"auto"} height={'72'}
                
                >
                  <Modal.CloseButton />
                  
                   {loadpage && (
                     <Modal.Header>
                        <Box alignItems={'center'} alignContent={'center'} flex={1} backgroundColor={Colors.transparent} h={Metrics.HEIGHT} w={Metrics.WIDTH}>
                          <ActivityIndicator size={'large'} color={Colors.textZahry} style={{marginTop:3}}  />
                        </Box>
                        </Modal.Header>
                       
                       )}
                   
                <Modal.Body width={Metrics.WIDTH}   marginTop={"auto"} marginBottom={'0'}  >
                    <WebView
                    onLoad={()=>wetingloadPage()}
                    //onLoadEnd={() => { setloadpage(false) }}
                    onShouldStartLoadWithRequest={event => {
                        return true;
                    }}
                    style={{height: Metrics.HEIGHT,width:Metrics.WIDTH,backgroundColor:Colors.transparent}}
                     onNavigationStateChange={(navState) => {
                      //your code goes here     
                      console.log("tets event",navState)  
                      if (navState.url.includes("cancelled/?Txnorder=TESTing_153677468")) {
                        console.log("check before call cansel")
                       
                      } else if (navState.url.includes("https://www.merchantdomain.com/successful/?Txnorder=TESTing_153677468")) {
                        console.log("check before call succss")
                        setloadpage(false)
                      } else if (navState.url.includes("https://secure.telr.com/gateway/details.html")) {
                        wetingloadPage()
                    
                       } else if (navState.url.includes("https://secure.telr.com/gateway/process_framed.html?o=DE2A01B9830458AFEE36A7863B8A3BC1E09BC76FC18033B055E37DE50BA9A818")) {
                        console.log("check before call Loadding to auths")
                        wetingloadPage()
                       }
                   }} 
                      
                      source={{
                        uri:strURL
                      }} />
                      
                      
                </Modal.Body>
            </Modal>
       
         

         {/* <Actionsheet isOpen={isOpen} onClose={onClose} height={'64'}>
         <View style={{  flex:1, lignItems: 'flex-end' }}>
            <WebView
              style={{
                width: Metrics.WIDTH,
                height: 100,
              }}
              startInLoadingState={true}
              scalesPageToFit={true}
                    onLoad={()=>wetingloadPage()}
                    onLoadEnd={() => { setloadpage(false) }}
                    onShouldStartLoadWithRequest={event => {
                        return true;
                    }}
                    
                     onNavigationStateChange={(navState) => {
                      //your code goes here     
                      console.log("tets event",navState)  
                      if (navState.url.includes("cancelled/?Txnorder=TESTing_153677468")) {
                        console.log("check before call cansel")
                       
                      } else if (navState.url.includes("https://www.merchantdomain.com/successful/?Txnorder=TESTing_153677468")) {
                        console.log("check before call succss")
                        setloadpage(false)
                      } else if (navState.url.includes("https://secure.telr.com/gateway/details.html")) {
                        wetingloadPage()
                    
                       } else if (navState.url.includes("https://secure.telr.com/gateway/process_framed.html?o=DE2A01B9830458AFEE36A7863B8A3BC1E09BC76FC18033B055E37DE50BA9A818")) {
                        console.log("check before call Loadding to auths")
                        wetingloadPage()
                       }
                   }} 
                      
                      source={{
                        uri:strURL
                      }} />
                     

                       {loadpage && (
                        <Box alignItems={'center'} alignContent={'center'} flex={1} backgroundColor={Colors.AminabackgroundColor} h={Metrics.HEIGHT} w={Metrics.WIDTH}>
                          <ActivityIndicator size={'large'} color={Colors.red}  />
                        </Box>
                       
                       )}
               </View>
            
            </Actionsheet>  */}


         

      </View> : <Box marginTop={100}>
        <Spinner size={'lg'} color={Colors.AminaButtonNew} /></Box>}



 
    </SafeAreaView>

  )

}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor:Colors.AminabackgroundColor,
    flex: 1,
    alignItems:'center'
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
    margin: 22,
   // backgroundColor:Colors.AminabackgroundColor

  },
  telrTextStyle: {
    color: "#2196F3",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 40,
    paddingTop: 20,
    marginBottom: 30,
  },
  buttonPay: {
    borderRadius: 33,
    padding: 4,
    elevation: 1,
    width:widthPixel(330),
    height:heightPixel(60),
    alignItems:"center",
    justifyContent:'center'
     
   
  },
  buttonPayment: {
    backgroundColor: Colors.AminaPinkButton,
    marginTop: 20,
    alignContent:'center',
    alignItems:'center',
    fontWeight: '700',
  },
  payButtonTextStyle: {
    color: Colors.white,
    fontWeight: '700',
    textAlign: "center",
    
  },
  buttonBackStyle: {
    borderRadius: 10,
    padding: 5,
    margin: 5,
    elevation: 2,
    width: 80,
  },
  buttonBackColor: {
    backgroundColor: "#2196F3",
  },
  backButtonTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  inputTextStyle: {
    marginTop: 10,
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 14,
  },
  input: {
    marginTop: 10,
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  billMaintext: {
    fontFamily: Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold,
    color: Colors.AminaButtonNew,
    fontSize: 22,
    marginTop: 10,
    backgroundColor: 'red'
  },
  billRighttext: {
    fontFamily: Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold,
    fontWeight: '700',
    color: Colors.black,
    fontSize: 16,
    marginStart: 10,
    marginTop: 2,


  },
  billLifttext: {
    fontFamily: Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular,
    fontWeight: '800',
    color: Colors.black,
    fontSize: 16,
    marginStart: 10,
    marginTop: 2,


  },
  infoText: {
    fontFamily: Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular,
    fontWeight: '800',
    color: Colors.black,
    fontSize: 16,
    marginStart: 1,
    marginTop: 10,
  }
});

export default TelerPage;


