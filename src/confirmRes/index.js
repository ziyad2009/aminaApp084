import React,{useEffect,useState,useRef} from 'react';
import {View,Image, TouchableOpacity, Alert, Platform} from 'react-native'
import {FlatList,Box,Heading,Avatar,Text,VStack,HStack,Spacer, Button,Spinner,Modal,Center, Stack} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors,Fonts ,Metrics,Images,fontPixel,widthPixel,heightPixel,pixelSizeHorizontal,pixelSizeVertical} from '../assets/Themes';
import styles from './styles';
 import moment from 'moment'
 import {CountdownCircleTimer} from 'react-native-countdown-circle-timer'
import CircularProgress from 'react-native-circular-progress-indicator'
import setItem from '../services/storage';
import api from '../services/api';
import {URL_ws,URL} from '../services/links';
import {SocketIOClient,io} from "socket.io-client";
import { sendNotifcation } from '../services/fucttions';
import CustomButton from '../services/buttons/buttton';
import TelerPage from '../payment/telerpage';
 import Compleatfourm from './completForm'
import ReturnFourm from './returnForm';
  
  
let interval = null;

const ConfirmRes=(props)=>{
    const[babseters,setbabyseters]=useState([])
    const [motherprofile,setMother]=useState([])
    const[chld,setChld]=useState([])
    const[loading,setLoding]=useState(false)
    const[showModal,setShowModal]=useState(false)
    const[OK,SETOK]=useState(false)
    const[changeScreen,setchangeScreen]=useState(null)
    const [newData,setNewData]=useState([])
    const[messageExpirationTimeMS,setmessageExpirationTimeMS]=useState(0)
    
    const socket = io(URL_ws,{
    transports: ["websocket"],
    jsonp: false
   })

    useEffect(async()=>{
       
        setbabyseters(JSON.parse(props.route.params.data1))
        setChld(JSON.parse(props.route.params.data1))

        //get Mother Profile
        const token = await setItem.getItem('BS:Token');
        api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
        const response= await api.get("/mothers/me").then((res)=>{
            return res.data
        }).catch((err)=>{
            onsole.log("Erorr",err)
            Alert.alert("تنبيه","غير قادر على جلب  بينات البروفايل")
        })
        console.log("Mother Profile",response.mother)
        setMother(response)
        
    },[])


    useEffect(()=>{
        const data= JSON.parse(props.route.params.data1)
        const chikeRequestStuse=props.route.params.val
        if(chikeRequestStuse==='chike'){
            setNewData(data)
            SETOK(true)
            setchangeScreen(true)
        }
         
      },[])
  

    useEffect(()=>{
       
      //  console.log("===-=",chld.childe)
       setLoding(true)
    },[babseters,chld])



    useEffect(()=>{
        console.log("start  lissting ");
         if(OK){
            handelREQ(newData._id)
            setmessageExpirationTimeMS(5000)
         }
         return () => clearInterval(interval);
    },[OK])

const handelREQ= async(id)=>{ 
    const user = await setItem.getItem('BS:User');
    const token = await setItem.getItem('BS:Token');

    interval = setInterval(async() => {
        console.log("setInterval==",id)
        api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
        const response= await  api.post(`${URL}/serchorders`,{
         orderID:id
       }).then((res)=>{
         console.log("DATA, POST OK")
        if(!res.data.accepted&&res.data.statuse==='canceled'){
            //Alert.alert("تنبيه","تم الاعتذار عن قبول الطلب من قبل الحاض   نه")
            clearInterval(interval)
            setchangeScreen(false)
            setShowModal(true)
        }
        if(res.data.accepted&&res.data.statuse==='pending'){
           // Alert.alert("تنبيه","تم الموافقه على الطلب")
            clearInterval(interval)
            setShowModal(true)
        }

       }).catch((err)=>console.log("ERORR",err))

      }, 6000);

    // setTimeout(
    //     () => {
    //       console.log("setTimeout==",id)
    //     },
    //     messageExpirationTimeMS,
    //   );
    }
    

    const disconnect=()=> {
     canselRequest()
    }


    const GetAccsept=()=>{
        console.log("start  lissting ");
        socket.emit('connection')
        socket.on("orders", (data) => {
         console.log("setter ddata",data);
         })
        //  socket.on("acceptedorder", (data) => {
        //     console.log("setter ddata",data);
        //     })
}
    
   const confirmRequest=async()=>{
   
    const location= await setItem.getItem('BS:Location')
    const token = await setItem.getItem('BS:Token');
    const motherData = await setItem.getItem('BS:User');
    
    const coordinates=JSON.parse(location)
    const motherdata2=JSON.parse(motherData)
    //check if mother exisit 
    const motherisplayname=motherprofile.mother.displayname
    const motherName=motherprofile.mother.name
    const motherDisplayName=motherprofile.mother.displayname
    const mothernames=`${motherName} ${motherDisplayName}`
    const motherPhone=motherprofile.mother.phone
   // const motherPhone=motherdata2.phone
    
    //   console.log("test price",babseters.totalprice ,"hours",babseters.hours )
    //   console.log("test phon",motherPhone,"mothe n",mothernames)
    api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    await api.post("/mother/order"   ,{
        scurtycode:babseters.scurtycode,
        childe:babseters.childe,
        serviestype:babseters.serviestype, 
        orderid:babseters.orderid,
        childeaccount:babseters.childeaccount,
        settterowner:babseters.settterowner,
        displayname:babseters.displayname,
        time:babseters.time,
        location:{coordinates:[coordinates.lat,coordinates.lon],"type":"Point"},
        settername:babseters.settername,
        mothername:mothernames,
        motherphone:motherPhone,
        address:coordinates.formatted,
        statuse:"processing",
        reson:"",
        read:false,
        start:babseters.start,
        end:babseters.end,
        potementdate:babseters.potementdate,
        settterfaileid:babseters.settterfaileid,
        price:babseters.price,
        hours:babseters.hours,
        totalprice: babseters.totalprice ,
        totalhours:babseters.totalhours,
        rreservioninfo:babseters.rreservioninfo,
        motherplayerid:babseters.motherplayerid,
        setterplayerid:babseters.setterplayerid,
    }).then((res)=>{
       
        setNewData(res.data)
        SETOK(true)
        setchangeScreen(true)
        sendNotif()
    }).catch(err=> console.log("Erorr:",err ))
     
   }    

    const canselRequest = async () => {
        const orderId = (newData._id).toString()
        console.log("canssel", orderId)
        await api.delete(`/mother/order/${orderId}`).then((res) => {
            SETOK(false)
        }).finally(() => sendNotifCansel())
            .catch((err) => { console.log("ERORR", err) })
        setShowModal(false)
        clearInterval(interval); 
    }


   const paymentScreen=()=>{
    SETOK(false)
    setShowModal(false) 

    //props.navigation.navigate('PaymentForm',{data1:newData})
    props.navigation.navigate('PaymentForm',{data1:newData})
   // props.navigation.navigate('TelerPage',paymentdata={newData})
   }

 //notifaction fuctions
   const sendNotif= ()=>{

    console.log("TTEST setter player id",babseters.setterplayerid)
    const data={
        receiver:babseters.settterowner,
        content:"لقد تم اضافة طلب جديد",
        title:"طلب جديد",
        orderid:babseters.orderid,
        playerid:babseters.setterplayerid
    }
    console.log("Test Nortif beffrr++++",data)
    sendNotifcation(data)
   }

   const sendNotifCansel= ()=>{
    console.log("TTEST setter player id",babseters.setterplayerid)
    const data={
        receiver:babseters.settterowner,
        content:"لقد تم الغاد الطلب من الام",
        title:"طلب ملغا",
        orderid:babseters.orderid,
        playerid:babseters.setterplayerid
    }
    console.log("Test Nortif beffrr++++",data)
    sendNotifcation(data)
   }

   const  children = ({ remainingTime }) => {
    // console.log("remain---",remainingTime)
     const hours = Math.floor(remainingTime / 3600)
     const minutes = Math.floor((remainingTime ) / 60)
    // const minutes = Math.floor((remainingTime ))
    // const seconds = remainingTime % 60
   
     return <Text fontSize={15} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} >{minutes}دقيقه</Text>
   }

   
   const ReturnToHomescreen=()=>{
    canselRequest().then(()=>{
        props.navigation.popToTop()
    }).finally(()=> setShowModal(false) ).catch((err)=>{
        console.log("Erorr cant cansel this order from ReturnToHomescreen")
        props.navigation.popToTop()
    })
   
   }
  const replacer=()=>{
    const address=babseters.address
    const finalAddress=address.replace("saudi Arabia","")
  }
    return(

    < Box mt={Platform.OS==='android'?60:100} backgroundColor={Colors.AminabackgroundColor} flex={1}> 
    <Box borderColor={'gray.100'} backgroundColor='white' borderWidth='1' flexDirection={'column'}  justifyContent='space-around' mt='10' ml='3' p={3} w={Metrics.WIDTH*0.928} >
         
        <Box alignItems={'center'} justifyContent={'center'}   flexDirection={'row'}>
            <Stack flexDirection={'row'} justifyContent='flex-start'  flex={1} >
                <Image source={Images.girl} style={{width:widthPixel(16),height:heightPixel(20)}} resizeMode='contain'/>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.medium: Fonts.type.medium} fontSize={fontPixel(16)}  ml={3}  > {babseters.settername}</Text>
            </Stack>   
            <Stack   flex={2} justifyContent='flex-end' flexDirection={'row'}>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16)} color={Colors.newTextClr}>رقم الطلب</Text>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16)} color={Colors.newTextClr} ml={2} >{babseters.orderid}</Text>
            </Stack>
        </Box>
        
        <Box flexDirection={'row'} alignItems='flex-start' mt={2}  >
            <Stack flexDirection={'row'} justifyContent='flex-start'  flex={1} >
                <Image source={Images.calender} style={{width:widthPixel(16),height:heightPixel(20)}} resizeMode='contain'/>
            <Stack>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16)} color={Colors.newTextClr}  ml={3}> {moment(babseters.potementdate).format('LL')}</Text>
            </Stack>
            </Stack> 
        </Box>
        <Box flexDirection={'row'} alignItems='flex-start' mt={2}  >
            <Stack flexDirection={'row'} justifyContent='flex-start'  flex={1} >
                <Image source={Images.clock} style={{width:widthPixel(16),height:heightPixel(20)}} resizeMode='contain'/>
            <Stack>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16)} color={Colors.newTextClr}  ml={3}>{moment(babseters.start).format('hh:mm a')} "الى "{moment(babseters.end).format('hh:mm a')}</Text>
            </Stack>
            </Stack>
        
        </Box>

        
        <Box flexDirection={'row'} alignItems='flex-start' mt={2}>
            <Stack flexDirection={'row'} justifyContent='flex-start'  flex={1} >
                <Image source={Images.chiled} style={{width:widthPixel(16),height:heightPixel(20)}} resizeMode='contain'/>
            <Stack>
            <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16)} color={Colors.newTextClr}  ml={3}>{babseters.childeaccount}طفل</Text>
            </Stack>
                
            </Stack> 
        </Box>
        <Box flexDirection={'row'} alignItems='flex-start' mt={2}>
            <Stack flexDirection={'row'} justifyContent='flex-start'  flex={1} >
                <Image source={Images.chiled} style={{width:widthPixel(16),height:heightPixel(20)}} resizeMode='contain'/>
            <Stack>
                {loading ?<Box flexDirection={'row'} >
                {chld.childe.map((item,index)=>{
                    return(
                    <Box key={item._id} flexDirection='row' justifyContent={'space-around'}>
                         {index >=1 && <Text> - </Text>}
                            <Text  fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16)} color={Colors.newTextClr}  ml={3}> {item.name} </Text>
                            </Box>
                    )
                })  }
                
                </Box>:null }
            </Stack>
            </Stack> 
        </Box>
        <Box flexDirection={'row'} alignItems='flex-start' mt={2}>
            <Stack flexDirection={'row'} justifyContent='flex-start'  flex={1} >
                <Image source={Images.location} style={{width:widthPixel(16),height:heightPixel(20)}} resizeMode='contain'/>
            <Stack>
            <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16)} color={ Colors.newTextClr}  ml={3}>{babseters.address}</Text>
            </Stack>
                
            </Stack> 
        </Box>

        <Box alignItems={'center'} mt={'15'} mb={4}>
            <Stack borderTopColor={'light.100'} borderWidth={1} width={widthPixel(314)} mt={2} />
        </Box>
        <Box flexDirection={'row'} alignItems='flex-start' mt={2}>
            <Stack flexDirection={'row'} justifyContent='flex-start'  flex={1} >
                <Image source={Images.price} style={{width:widthPixel(16),height:heightPixel(20)}} resizeMode='contain'/>
            <Stack>
            <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16)} color={Colors.newTextClr}  ml={3}>{babseters.price} ريال</Text>
            </Stack>
                
            </Stack> 
        </Box>
        </Box>
        <VStack alignItems={'center'}>
            {OK?<Center>
                <Box flexDirection={'row'} alignItems='flex-start' mt={2}>
                    <Stack flexDirection={'row'} justifyContent='center' alignItems={'center'} width={widthPixel(382)} height={heightPixel(40)} backgroundColor={Colors.infotextbackground} >
                            <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16)} textAlign='center' color={Colors.newTextClr}  ml={3}>تم ارسال الطلب وفي انتظار قبول الحاضنة</Text>
                    </Stack> 
                </Box>
                <Box flexDirection={'row'} alignItems='flex-start' mt={2}>
                    <Stack flexDirection={'row'} justifyContent='center' alignItems={'center'} width={widthPixel(382)} height={heightPixel(40)}  >
                            <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16)} textAlign='center' color={Colors.newTextClr}  ml={3}>في حالم يتم الموافقة سيتم الغاءالطلب خلال ١٥ دقيقه</Text>
                    </Stack> 
                </Box>
                    
                <Box mt={1}>
                    <CountdownCircleTimer
                        isPlaying
                        duration={900}
                        colors={[Colors.AminaButtonNew, '#F7B801', '#A30000', '#A30000']}
                        colorsTime={[500, 300, 100, 50]}
                        size={80}
                        rotation='clockwise'
                        style={{fontFamily:Fonts.type.aminafonts}}
                        strokeWidth={8} >
                            {children}
                        {/* {({ remainingTime }) => <Text>{remainingTime}</Text>} */}
                    </CountdownCircleTimer>
                </Box> 
            </Center>:
            <Box alignItems={'center'} w={Metrics.WIDTH*0.934} ml='3' mr='4' mt={5} rounded='lg'>
                     {/* <Button bgColor={Colors.AminaButtonNew} size={'lg'} mb='1.5' w='full'
                        onPress={() => {confirmRequest() }}> احجز</Button> */}
                <CustomButton
                    buttonColor={Colors.textZahry}
                    title="احجز"
                    buttonStyle={{width: '100%', alignSelf: 'center',borderRadius:10}}
                    textStyle={{ fontFamily:Fonts.type.bold,fontSize: 22 }}
                    onPress={() => confirmRequest()} 
                />
            </Box>}
            
            {OK&&<Center>
                <Box alignItems={'center'} w={Metrics.WIDTH*0.934} ml='3' mr='4' mt={5} rounded='lg'>
                        {/* <Button bgColor={Colors.AminaButtonNew} size={'lg'} mb='1.5' w='full'
                            onPress={() => {canselRequest() }}> الغاء الطلب</Button> */}
                            <CustomButton
                            buttonColor={Colors.textZahry}
                            title="طلباتي"
                            buttonStyle={{width: '100%', alignSelf: 'center',borderRadius:10}}
                            textStyle={{fontSize: 20}}
                            onPress={() =>props.navigation.navigate('Request') }
                        />
                </Box>
                
            </Center>}
        </VStack>

        <Center>
            <Modal isOpen={showModal}  onClose={() => setShowModal(true)}
                backgroundColor={Colors.transparent}  borderColor={"#a3a2a2"} opacity={1} borderRadius={'md'}
                avoidKeyboard justifyContent="flex-end" bottom="2"
                 >
                <Modal.Content backgroundColor={'white'}  width="100%"  padding={5} justifyContent='center' alignItems='center'   >
                   {changeScreen===true?<Compleatfourm cancel={()=> ReturnToHomescreen() } pay={()=> paymentScreen()} />
                    :
                    <ReturnFourm back={()=>ReturnToHomescreen()}/>} 
                </Modal.Content>
            </Modal>
        </Center>
    </Box>
        
    )

}
export default  ConfirmRes;

