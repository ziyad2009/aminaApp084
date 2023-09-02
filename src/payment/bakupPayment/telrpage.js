
import React, { useState, useRef, useEffect ,useContext} from 'react';
import { Image, View, TouchableOpacity, TextInput, Platform, Alert, Modal, StyleSheet, SafeAreaView, Pressable, ActivityIndicator } from 'react-native';

import TelrSdk from 'rn-telr-sdk';
import { Metrics, Colors, Fonts,fontPixel,Images, widthPixel, heightPixel } from '../../assets/Themes/';
import { Stack, Box, Text, HStack, VStack, Spinner, Button } from 'native-base';
import setItem from '../services/storage/index'
import api from '../services/api';
import { sendNotifcation } from '../services/fucttions';
import DeviceInfo from 'react-native-device-info';
import { UserContext } from '../../services/UserContext';
 

const TelerPage = (props) => {
  const newdatta = props.route.params.newData
  const extrahoursScreen = props.route.params.extrastatuse ? true : false
  const [telrModalVisible, setTelrModalVisible] = useState(false);

  const [paymentRequest, setPaymentRequest] = useState(null);

  const [billing_name_first, setBilling_name_first] = React.useState("");

  const [billing_name_last, setBilling_name_last] = React.useState("");

  const [loading, setloding] = useState(false)
  const [email, setemail] = useState('')
  const [phone, setphone] = useState(0)
  const [DEVICEID, setDEVICEID] = useState(0)
  const [pass, setpass] = useState('processed')
  const [tran_amount, setTran_amount] = React.useState("");
  const [extrapayment, seteextrapayment] = useState(false)
  const {DeviceID} = useContext(UserContext);
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

  const telrModalClose = () => {
    setTelrModalVisible(false)
    setpass("canceled")
    console.log("fuction telrModalClose event=canceled","الغيت من قبل المستخدمr")
   // Alert.alert("الغيت من قبل المستخدمr");
    handelScreenoption("canceled")

  }
  const didFailWithError = (message) => {
    setTelrModalVisible(false)
    setpass("canceled")
   // Alert.alert("الغاء الدفع**", (message));
   console.log("fuction didFailWithError event=canceled==",message)
    handelScreenoption("canceled")

  }

  const didPaymentSuccess = (response) => {
    console.log("Response fo Success payment+++")
    setTelrModalVisible(false)
    setpass("success")
    //update order paymeet after aproved by gate
    handlepayment(tran_amount)
    // Alert.alert("تنبيه-الدفع",response.message);
    console.log("fuction didPaymentSuccess event=success=>",response.message)
    handelScreenoption("success")
  }



  const showTelrPaymentPage = () => {

    if (billing_name_first == null || billing_name_first == "") {
      Alert.alert("أمينة","الرجاء تحديث الاسم الاول");
      return
    } else if (billing_name_last == null || billing_name_last == "") {
      Alert.alert("أمينة","الرجاء تحديث الاسم الاخيدد");
      return
    } else if (tran_amount == null || tran_amount == "") {
      Alert.alert("أمينة","المبلغ غير مسجل");
      return
    }
    var paymentRequest = {
      sdk_env: "prod",//prod//dev
      something_went_wrong_message: "Something went wrong",//  this message for suppose someitng is happen wrong with payment then you can config this one.
      store_id: "27456-ameena app",
      key: "rPBH5-wLBp#g4fkq",
      device_type: Platform.OS === 'android' ? "iOS" : "Android",
      device_id: "36C0EC49-AA2F-47DC-A4D7-D9927A739F99",
      app_name: "Aminaapp",//enter app name
      app_version: "33.0",//app version
      app_user: "123456",//app user
      app_id: "102863o777",//app user id
      tran_test: "0", // 1=test, 0=production
      tran_type: "sale",//sale
      tran_class: "paypage",
      tran_cartid: `${Math.floor(Math.random() * 1000) + 3}`,//enter cart id it shoud be unique for every transaction //1234567890
      tran_description: "paymetn from aminah app ",// enter tran description
      tran_currency: "SAR",
      tran_amount: tran_amount,
      tran_language: "en",
      tran_firstref: "",
      billing_name_title: "Ms",
      billing_name_first: billing_name_first,
      billing_name_last: billing_name_last,
      billing_address_line1: "omer bin otba",
      billing_address_city: "Riyad",
      billing_address_region: "Saudi Arabia",
      billing_address_country: "SA",
      billing_custref: "001",
      billing_email: email,
      billing_phone: phone,
    }

    setPaymentRequest(paymentRequest)
    setTelrModalVisible(true)
  }


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
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <TelrSdk backButtonText={"X"} buttonBackStyle={styles.buttonBackStyle} buttonBackColor={styles.buttonBackColor} backButtonTextStyle={styles.backButtonTextStyle} paymentRequest={paymentRequest} telrModalVisible={telrModalVisible} telrModalClose={telrModalClose} didFailWithError={didFailWithError} didPaymentSuccess={didPaymentSuccess} />
      {!loading ? <View style={styles.centeredView}>
      {pass === "processed" && <Box w={"100%"} mt='24' backgroundColor={Colors.transparent}>
          <Stack alignItems={'center'} justifyContent='center' height={"30%"} backgroundColor={Colors.transparent} >
            <Image source={Images.samilogo} style={{width:widthPixel(200),height:heightPixel(200), borderRadius:16}} resizeMode='contain' />
          </Stack>

           

          <Box borderColor={Colors.greys} borderBottomWidth={1} h={"5%"} w={"100%"} />
          
          <Box alignItems={'center'}>
            <Stack flexDirection={'row'} mt={2} w="80%" justifyContent={'space-between'} >
              <Text style={styles.billRighttext}>المبلغ</Text>
              <Text style={styles.billLifttext}> SR {newdatta.totalprice}</Text>
            </Stack>

            <Stack flexDirection={'row'} mt={2} w="80%" justifyContent={'space-between'}>
              <Text style={styles.billRighttext} >قيمة الضريبة المضافة</Text>
              <Text style={styles.billLifttext}>SR{parseFloat(Number(0.15) * Number(newdatta.totalprice)).toPrecision(3)}</Text>
            </Stack>
            <Stack flexDirection={'row'} mt={2} w="80%" justifyContent={'space-between'}>
              <Text style={styles.billRighttext}>طريقة الدفع</Text>
              <Text style={styles.billLifttext}>بطاقة مدى</Text>
            </Stack>
            <Stack borderColor={Colors.greys} borderBottomWidth={1} h={"5%"} w={"100%"} />
            <Stack flexDirection={'row'} mt={2} w="80%" justifyContent={'space-between'}>
              <Text style={styles.billRighttext}>المبلغ الاجمالي</Text>
              <Text style={styles.billLifttext} > SR {(Number(0.15) * Number(newdatta.totalprice)) + newdatta.totalprice}</Text>
            </Stack>
          </Box>

          <Box width={"100%"} alignItems='center' justifyContent={'center'}>
            <Pressable
            style={[styles.buttonPay, styles.buttonPayment]}
            onPress={() => showTelrPaymentPage()}>
            <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16)} textAlign='center' color={Colors.newTextClr}  >اكمل عملية الدفع</Text>
            </Pressable>
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
                <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(36)}  > تم الدفع بنجاح</Text> 
            </Stack></Box>
            <Pressable
              style={[styles.buttonPay, styles.buttonPayment]}
              onPress={() => props.navigation.navigate('Request')}>
              <Text style={styles.payButtonTextStyle}>طلباتي</Text>
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
                <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(36)}  >عملية الدفع  ملغية</Text> 
            </Stack></Box>
            <Pressable
              style={[styles.buttonPay, styles.buttonPayment]}
              onPress={() => props.navigation.navigate('Request') }>
              <Text style={styles.payButtonTextStyle}> طلباتي</Text>
            </Pressable>
            

          </Box>}
        {pass === "erorr" &&
          <Box flexDirection={'column'} alignItems='center' marginTop={6}>
            <Pressable
              style={[styles.buttonPay, styles.buttonPayment]}
              onPress={() => props.navigation.navigate('Request')}>
              <Text style={styles.payButtonTextStyle}> طلباتي</Text>
            </Pressable>
            <Text style={styles.payButtonTextStyle}color={Colors.newTextClr} fontSize={fontPixel(18)} > خطاد في عملية الدفع</Text>

          </Box>}
         

      </View> : <Box marginTop={100}>
        <Spinner size={'lg'} color={Colors.AminaButtonNew} /></Box>}



    </SafeAreaView>

  )

}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor:Colors.AminabackgroundColor,
    flex: 1
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
    margin: 22,

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
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width:widthPixel(250)
  },
  buttonPayment: {
    backgroundColor: Colors.AminaPinkButton,
    marginTop: 20,
  },
  payButtonTextStyle: {
    color: Colors.white,
    fontWeight: 'normal',
    textAlign: "center"
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
    fontFamily: Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular,
    fontWeight: '400',
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


