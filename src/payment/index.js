import React,{useState,useRef} from 'react';
 import { Image ,View,TouchableOpacity,Text, Platform} from 'react-native';
import {Input,Box,Spacer, Stack,VStack,Icon, HStack,WarningOutlineIcon,FormControl,Button, ScrollView} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
 
import{Metrics,Colors,Images, Fonts} from '../assets/Themes/'
import styles from './styles';
import images from '../assets/Themes/Images';
import setItem from '../services/storage'
import api from '../services/api';
import { sendNotifcation } from '../services/fucttions';
 import MaskInput,{Masks,createNumberMask} from "react-native-mask-input"
 import AntDesign from 'react-native-vector-icons/AntDesign';


const  PaymentForm =(props)=>{ 

const[loading,setLoding]=useState(false)
const [cvc,setcvc]=useState('')
const[expiry,setexpiry]=useState('')
const [name,setname]=useState('')
const [number,setnumber]=useState('')

const [focus,setfocus]=useState('')
const [show,setshow]=useState(false)

const[valed,setValed]=useState(false)
const inputCard=useRef()
 
 const [creditCard, setCreditCard] =useState('');
 const [Dvalue, setDValue] = useState(''); 
 const [CVCvalue, setCVCValue] = useState(''); 
   
 
  const handelCardnumber = (inputtxt) => {
   console.log("TEST Card",inputtxt.length)
   setnumber(inputtxt)
  }

  const handelCVCnumber = (inputtxt) => {
    console.log("TEST Card",inputtxt.length)
    setcvc(inputtxt)
   }
   const handelEXPnumber = (inputtxt) => {
    console.log("TEST Card",inputtxt.length)
    setexpiry(inputtxt)
   }
   const handelNameholdercard = (inputtxt) => {
    console.log("TEST Card",inputtxt.length)
    setname(inputtxt)
   }
    
   
  
  const handlepayment=async(price)=>{
   console.log("test props ConfitmScreen", price )
    const user = await setItem.getItem('BS:User');
    const token = await setItem.getItem('BS:Token');
    const transctionID=Number(Math.floor(Math.random() * 1000))
     const userData=JSON.parse(user)
    const newdata=props.route.params.data1

    const CArdinfo=[
      {status:"successful",
      currency:"SAR",
      id:transctionID,
      user:{
        id:userData._id
    },
      amount:price,
      customer:{
        name:name,
        phone:userData.phone,
        email:"demo@amina.com"
    }}]
     
    console.log("TEST card Info",CArdinfo)
    
    //start mother Payment with thise field  {status, currency, id, amount, customer} 
    //1-Transaction.findOne 2-User.findOne by phone 3-create Wallet Transaction 3-createTransaction 4-updateWallet
    api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    const response = await api.post('/mother/response/',{
      status:"completed",
      currency:"SAR",
      id:transctionID,
      amount:price,
      customer:{
        name:name,
        phone:userData.phone,
        email:"demo@demo.com"}}
      ).then((item)=>{
          return item.data
      }).catch((err)=> {return err})

      updateOrderStatuse()
      props.navigation.popToTop()
  }
 
  const updateOrderStatuse =async()=>{
     //updatee  order statuse 
     await api.patch('/orderpayment',{
      statuse:"completed",
      orderId:props.route.params.data1._id})
      .then((res)=>{
      console.log("ttEst blance", (res.data))
      return res.data
    
    }).finally(()=>sendNotif()).catch((err)=>{
        console.log("EROR",err)
        return []
      })
  }
 
  const getBlance=async()=>{
    const user = await setItem.getItem('BS:User');
    const token = await setItem.getItem('BS:Token');
    const userData=JSON.parse(user)
    api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    await api.get(`/mother/wallet/${userData._id}`).then((res)=>{
      console.log("ttEst blance", (res.data.balance.$numberDecimal))
    }).catch((err)=>{console.log("EROR",err)})

    console.log("TEst seter id",props.route.params.data1._id)
   
  }
 
  const sendNotif= ()=>{
    
    const data={
        receiver:props.route.params.data1.settterowner,
        content:"لقد تم الدفع من قبل الام ",
        title:"تم الدفع",
        orderid:props.route.params.data1.orderid
    }
    sendNotifcation(data)
   }

   const DATEMASK = createNumberMask({
    prefix: ['M'],
   // delimiter: '.',
    separator: '/',
    precision: 2,
    
  })
  const CVCMASK = createNumberMask({
    prefix: ['CVC'],
   // delimiter: '.',
    separator: '',
    precision: 2,
    
  })
  
  var cardno = /^(?:5[1-5][0-9]{14})$/;
  const creditCardMask = [/\d/, /\d/, /\d/, /\d/, " " [/\d/], [/\d/], [/\d/], [/\d/], " ", [/\d/], [/\d/], [/\d/], [/\d/], " ", /\d/, /\d/, /\d/, /\d/];
    return (
      <View  style={styles.wrapper }>
 
     
      <Box alignItems={'center'} backgroundColor='white' > 
       
        
        <Stack   w="88%" alignItems="center" borderWidth={.5} borderColor={Colors.greys} marginTop={'4'}   backgroundColor="trueGray.100" borderRadius={20} >

        <Box mt={2} mb={2} w='88%' justifyContent={'space-between'} flexDirection={'row'}   >
          <Image  source={images.aminamainlogo} resizeMode='contain' style={{width:Metrics.WIDTH*0.182 ,height:Metrics.HEIGHT*0.0401,alignItems:'flex-start'}} />
          <AntDesign name='creditcard'  size={35} color={Colors.black}/>
        </Box>
        
        <Input   w={'97%'} type='text' color={Colors.blacktxt} fontSize='lg' onChangeText={(e)=>handelNameholdercard(e)}
              InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />}
              placeholder="name" bgColor={'blue.100'}
        />
        
        <MaskInput
              mask={Masks.CREDIT_CARD}
              keyboardType="numeric"
              value={number}
              placeholder='Card number'
                //showObfuscatedValue
              style={styles.inputBasic}
              onChangeText={(formatted) => {
              handelCardnumber(formatted);
              //console.log(formatted); // "1234 1234 1234 1234"
             }}
        />
        <HStack   w='88%' justifyContent={'space-between'} mb={5}  >
            
            <MaskInput
            value={expiry}
            mask={DATEMASK}
            maxLength={6}
            placeholder='Expir ----'
           
            onChangeText={(masked, unmasked) => {
            // setDValue(unmasked); // you can use the masked value as well
              handelEXPnumber(unmasked,"Y")
              // assuming you typed "123456":
              console.log("state=",expiry); // "R$ 1.234,56"
              console.log("value=",unmasked); // "123456"
            }}
          />
          
          <MaskInput
            value={CVCvalue}
            mask={CVCMASK}
            maxLength={6}
            placeholder='CVC---'
            
            onChangeText={(masked, unmasked) => {
              setCVCValue(unmasked); // you can use the masked value as well
              handelCVCnumber(unmasked)
              // assuming you typed "123456":
              console.log(masked); // "R$ 1.234,56"
              console.log(unmasked); // "123456"
            }}
          />
          
          </HStack>
          
          <Box bgColor ={'red'} w='full'  ml={2} mb='1'>
                <Image  source={images.madacard} resizeMode='contain' style={{width:Metrics.WIDTH*0.2 ,height:Metrics.HEIGHT*0.0601}} />
          </Box>
          
      </Stack>
      
      <View style={{flexDirection:'row',width:Metrics.WIDTH*0.87216,height:Metrics.HEIGHT*0.068,justifyContent:'center',marginTop:17} }>
          
          <TouchableOpacity onPress={()=> handlepayment( (Number(0.15)* Number(props.route.params.datainfo.totallprice)) + props.route.params.datainfo.totallprice)}   
              style={styles.endButton}>
            <Text style={styles.endButtonTxt}> ادفع { (Number(0.15)* Number(props.route.params.datainfo.totallprice)) + props.route.params.datainfo.totallprice} </Text>
          </TouchableOpacity>
      </View>
      
      {/* <View style={{flexDirection:'row',width:Metrics.WIDTH*0.87216,height:Metrics.HEIGHT*0.087,justifyContent:'space-around',marginLeft:10,marginTop:5}}>
      < TouchableOpacity onPress={()=> console.log(props.route.params.data1.orderid)}   
                   style={styles.endButton}>
           <Text style={styles.endButtonTxt}>Blance </Text>
           </TouchableOpacity>
            
      </View> */}

<Stack w={"88%"}  mt='24' backgroundColor={Colors.white}>
       
       <Stack alignItems={'center'}>
         <Text  style={styles.billMaintext}> تفاصيل الفاتورة</Text>
       </Stack>
         <HStack borderColor={Colors.greys} borderBottomWidth={1} h={"5%"} w={"100%"}/>
         <VStack alignItems={'center'}>
           <HStack flexDirection={'row'}  mt={2} w="80%" justifyContent={'space-between'} >
               <Text style={styles.billRighttext}>المبلغ</Text>
               <Text style={styles.billLifttext}> SR {props.route.params.datainfo.totallprice}</Text>
           </HStack>
            
           <HStack flexDirection={'row'}  mt={2} w="80%" justifyContent={'space-between'}>
             <Text style={styles.billRighttext} >قيمة الضريبة المضافة</Text>
             <Text style={styles.billLifttext}>SR{ (Number(0.15)* Number(props.route.params.datainfo.totallprice))}</Text>
           </HStack>
           <HStack flexDirection={'row'}  mt={2} w="80%" justifyContent={'space-between'}>
             <Text style={styles.billRighttext}>طريقة الدفع</Text>
             <Text style={styles.billLifttext}>بطاقة مدى</Text>
           </HStack>
           <HStack borderColor={Colors.greys} borderBottomWidth={1} h={"5%"} w={"100%"} />
           <HStack flexDirection={'row'}  mt={2} w="80%" justifyContent={'space-between'}>
             <Text style={styles.billRighttext}>المبلغ الاجمالي</Text>
             <Text style={styles.billLifttext} > SR { (Number(0.15)* Number(props.route.params.datainfo.totallprice)) + props.route.params.datainfo.totallprice}</Text>
           </HStack>
         </VStack>
       </Stack>
      </Box>
      </View>
    );
}
  
export default PaymentForm;





{/* <Stack space={4} w="90%" alignItems="center" borderWidth={1} borderColor={Colors.black} marginTop={'10'} backgroundColor='muted.200' borderRadius={20} >
         
<FormControl isInvalid={valed} w='full' p={'3'}>
 <Input   type='number' color={Colors.blacktxt} fontSize='lg' onChangeText={(e)=>handelCardnumber(e)} maxLength={14} 
  InputLeftElement={<Icon as={<MaterialIcons name="credit-card" />} size={5} ml="2" color="muted.400" />} placeholder="Card Number" />
  
  {!valed&&<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
  Try different from previous passwords.
  </FormControl.ErrorMessage>}
 </FormControl>

  <Input   w={'90%'} type='text' color={Colors.blacktxt} fontSize='lg' onChangeText={(e)=>handelNameholdercard(e)}
  InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />} placeholder="name" />
  

  <HStack   w='90%'   >

   <Box   w={{ base: "70%", md: "50%"}}   flexDirection='row'>
     <Input w={{ base: "44%", md: "50%"}}   type='number' color={Colors.blacktxt} fontSize='lg' onChangeText={(e)=>handelEXPnumber(e,"Y")}
       InputLeftElement={<Icon as={<MaterialIcons name="calendar-today" />} size={5} ml="2" color="muted.400" />} placeholder="Year" />
     <Input w={{ base: "48%", md: "50%"}}   type='number' color={Colors.blacktxt} fontSize='lg' onChangeText={(e)=>handelEXPnumber(e,"M")}
       InputLeftElement={<Icon as={<MaterialIcons name="calendar-today" />} size={5} ml="2" color="muted.400" />} placeholder="Month" />
       <Input w={ "44%"}   type='number' color={Colors.blacktxt} fontSize='lg' maxLength={3} ml='5' onChangeText={(e)=>handelCVCnumber(e)}
         InputLeftElement={<Icon as={<MaterialIcons name="domain-disabled" />} size={5} ml="2" color="muted.400" />} placeholder="CVC" />

   </Box>
   </HStack>
    <Box bgColor ={'red'} w='full'>
      <Image  source={images.madacard} resizeMode='contain' style={{width:Metrics.WIDTH*0.2 ,height:Metrics.HEIGHT*0.0601,alignItems:'flex-start'}} />
    </Box>
  
   </Stack>
   <View style={{flexDirection:'row',width:Metrics.WIDTH*0.87216,height:Metrics.HEIGHT*0.087,justifyContent:'space-around',marginLeft:10,marginTop:50}}>
      < TouchableOpacity onPress={()=> handlepayment(props.route.params.data1.totalprice)}   
                   style={styles.endButton}>
           <Text style={styles.endButtonTxt}> ادفع {props.route.params.data1.totalprice}</Text>
           </TouchableOpacity>
            
           </View>
           <View style={{flexDirection:'row',width:Metrics.WIDTH*0.87216,height:Metrics.HEIGHT*0.087,justifyContent:'space-around',marginLeft:10,marginTop:5}}>
      {/* < TouchableOpacity onPress={()=> console.log(props.route.params.data1.orderid)}   
                   style={styles.endButton}>
           <Text style={styles.endButtonTxt}>Blance </Text>
           </TouchableOpacity> */}
            
          // </View>
   // */}