import React,{useState,useRef} from 'react';
 import { Image ,View,TouchableOpacity,Text} from 'react-native';
import {Input,Box,Spacer, Stack,VStack,Icon, HStack,WarningOutlineIcon,FormControl,Button} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
 
import{Metrics,Colors,Images} from '../assets/Themes/'
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
      <Box alignItems={'center'} backgroundColor='white' flex={1} > 
       <Stack w={"88%"}   justifyContent={'space-around'} backgroundColor={Colors.ricePaper}>
       
        <VStack alignItems={'center'} padding={1}>
          <Text>فاتورة</Text>
        </VStack>
        <HStack borderColor={Colors.greys} borderBottomWidth={1} h={"5%"} w={"100%"} />
            <HStack flexDirection={'row'} justifyContent='space-around' mt={2}    >
              <Text>المبلغ</Text>
              <Text> SR {props.route.params.data1.totalprice}</Text>
            </HStack>
            <HStack flexDirection={'row'} justifyContent='space-around' mt={2}    >
            <Text>قيمة الضريبة المضافة</Text>
            <Text>SR{ (Number(0.15)* Number(props.route.params.data1.totalprice))}</Text>
            </HStack>
            <HStack flexDirection={'row'} justifyContent='space-around' mt={2}    >
            <Text>طريقة الدفع</Text>
            <Text>بطاقة مدى</Text>
            </HStack>
            <HStack borderColor={Colors.greys} borderBottomWidth={1} h={"5%"} w={"100%"} />
            <HStack flexDirection={'row'} justifyContent='space-around' mt={2}    >
            <Text>المبلغ الاجمالي</Text>
            <Text> SR { (Number(0.15)* Number(props.route.params.data1.totalprice)) + props.route.params.data1.totalprice}</Text>
             </HStack>
            
            
            
          </Stack>

      <Stack   w="95%" alignItems="center" borderWidth={.5} borderColor={Colors.greys} marginTop={'10'}   backgroundColor='gray.200' borderRadius={20} >

        <Box ml={5} mt={2}  w='88%' justifyContent={'space-between'} flexDirection={'row'}   >
          <Image  source={images.aminamainlogo} resizeMode='contain' style={{width:Metrics.WIDTH*0.182 ,height:Metrics.HEIGHT*0.0401,alignItems:'flex-start'}} />
          <AntDesign name='creditcard'  size={35} color={Colors.black}/>
        </Box>
        
        <Input   w={'97%'} type='text' color={Colors.blacktxt} fontSize='lg' onChangeText={(e)=>handelNameholdercard(e)}
              InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />}
              placeholder="name"
        />
        <Stack alignItems='flex-end' mt={2} p="1">
           <MaskInput
              mask={Masks.CREDIT_CARD}
              keyboardType="numeric"
                value={number}
                placeholder='Card number'
                 
              //showObfuscatedValue
            style={styles.inputBasic}
            onChangeText={(formatted) => {
              handelCardnumber(formatted);
             
              console.log(formatted); // "1234 1234 1234 1234"
            
            }}
        />
        </Stack>
        
        
        <HStack   w='97%' justifyContent={'space-between'} mb={5}  >
           <Stack alignItems='flex-end' mt={2} p="1" ml={5}>
            <MaskInput
            value={expiry}
            mask={DATEMASK}
            maxLength={6}
            onChangeText={(masked, unmasked) => {
            // setDValue(unmasked); // you can use the masked value as well
              handelEXPnumber(unmasked,"Y")
              // assuming you typed "123456":
              console.log("state=",expiry); // "R$ 1.234,56"
              console.log("value=",unmasked); // "123456"
            }}
          />
          </Stack>
          <Stack alignItems='flex-end' mt={2} p="1" mr={4}>
          <MaskInput
            value={CVCvalue}
            mask={CVCMASK}
            maxLength={6}
            onChangeText={(masked, unmasked) => {
              setCVCValue(unmasked); // you can use the masked value as well
              handelCVCnumber(unmasked)
              // assuming you typed "123456":
              console.log(masked); // "R$ 1.234,56"
              console.log(unmasked); // "123456"
            }}
          />
          </Stack>
          </HStack>
          
          <Box bgColor ={'red'} w='full'  ml={2} mb='4'>
                <Image  source={images.madacard} resizeMode='contain' style={{width:Metrics.WIDTH*0.2 ,height:Metrics.HEIGHT*0.0601,alignItems:'flex-start'}} />
          </Box>
          
      </Stack>
      
      <View style={{flexDirection:'row',width:Metrics.WIDTH*0.87216,height:Metrics.HEIGHT*0.087,justifyContent:'space-around',marginLeft:10,marginTop:50}}>
          
          <TouchableOpacity onPress={()=> handlepayment( (Number(0.15)* Number(props.route.params.data1.totalprice)) + props.route.params.data1.totalprice)}   
              style={styles.endButton}>
            <Text style={styles.endButtonTxt}> ادفع { (Number(0.15)* Number(props.route.params.data1.totalprice)) + props.route.params.data1.totalprice} </Text>
          </TouchableOpacity>
      </View>
      
      {/* <View style={{flexDirection:'row',width:Metrics.WIDTH*0.87216,height:Metrics.HEIGHT*0.087,justifyContent:'space-around',marginLeft:10,marginTop:5}}>
      < TouchableOpacity onPress={()=> console.log(props.route.params.data1.orderid)}   
                   style={styles.endButton}>
           <Text style={styles.endButtonTxt}>Blance </Text>
           </TouchableOpacity>
            
      </View> */}

         
      </Box>
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