import React,{useEffect,useState,useRef} from 'react';
import {View,Image, TouchableOpacity, Alert} from 'react-native'
import {FlatList,Box,Heading,Avatar,Text,VStack,HStack,Spacer, Button,Spinner,Modal,Center} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors,Fonts ,Metrics,Images} from '../assets/Themes';
import styles from './styles';
 import moment from 'moment'
 import {CountdownCircleTimer} from 'react-native-countdown-circle-timer'
import CircularProgress from 'react-native-circular-progress-indicator'
import setItem from '../services/storage';
import api from '../services/api';
import {URL_ws,URL} from '../services/links';
import {SocketIOClient,io} from "socket.io-client";
import { sendNotifcation } from '../services/fucttions';
import { random } from 'lodash';

  
let interval = null;

const ConfirmRes=(props)=>{
    const[babseters,setbabyseters]=useState([])
    const [motherprofile,setMother]=useState([])
    const[chld,setChld]=useState([])
    const[loading,setLoding]=useState(false)
    const[showModal,setShowModal]=useState(false)
    const[OK,SETOK]=useState(false)
    const [newData,setNewData]=useState([])
    const[messageExpirationTimeMS,setmessageExpirationTimeMS]=useState(0)

   const socket = io(URL_ws,{
    transports: ["websocket"],
    jsonp: false
   })

    useEffect(async()=>{
        console.log("test props ConfitmScreen",JSON.parse(props.route.params.data1) )
        setbabyseters(JSON.parse(props.route.params.data1))
        setChld(JSON.parse(props.route.params.data1))

        const token = await setItem.getItem('BS:Token');

        //get Mother Profile
        api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
        const response= await api.get("/mothers/me").then((res)=>{
            return res.data
        }).catch((err)=>{
            onsole.log("Erorr",err)
            Alert.alert("تنبيه","غير قادر على جلب  بينات البروفايل")
        })
        console.log("tets response",response)
        setMother(response)
        
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
         //socket.emit("orders",res)
       // console.log("DATA,",res.data)
        if(!res.data.accepted&&res.data.statuse==='canceled'){
            Alert.alert("تنبيه","تم الاعتذار عن قبول الطلب من قبل الحاضنه")
            clearInterval(interval)
            setShowModal(false)
        }
        if(res.data.accepted&&res.data.statuse==='pending'){
            Alert.alert("تنبيه","تم الموافقه على الطلب")
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
    console.log("start")
    const location= await setItem.getItem('BS:Location')
    const token = await setItem.getItem('BS:Token');
    const motherData = await setItem.getItem('BS:User');
    
    const coordinates=JSON.parse(location)
    const motherdata2=JSON.parse(motherData)
    //check if mother exisit 
    const mothernames=motherprofile.mother.displayname
    const motherPhone=motherdata2.phone
    console.log("TEST LOC",motherPhone   )
      
    api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    console.log("TOKEN1",token)
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
        totalprice:babseters.totalprice,
        totalhours:babseters.totalhours,
        rreservioninfo:babseters.rreservioninfo
    }).then((res)=>{
        console.log("Order",res.data)
        setNewData(res.data)
        SETOK(true)
        const contentddata={titletxt:"اضافة طلب",contetntxt:"لقد تم اضافة الطلب"}
        sendNotif()
    }).catch(err=> console.log("Erorr:",err ))
    
//     const data={scurtycode:babseters.scurtycode,
//         childe:babseters.childe,
//         serviestype:babseters.serviestype,
//         orderid:babseters.orderid,
//         childeaccount:babseters.childeaccount,
//         settterowner:babseters.settterowner,
//         displayname:babseters.displayname,
//         time:babseters.time,
//         location:{coordinates:[coordinates.lat,coordinates.lon],"type":"Point"},
//         settername:babseters.settername,
//         mothername:mothernames,
//         motherphone:motherPhone,
//         address:coordinates.formatted,
//         statuse:"processing",
//         reson:"",
//         read:false,
//         start:babseters.start,
//         end:babseters.end,
//         potementdate:babseters.potementdate,
//         settterfaileid:babseters.settterfaileid,
//         price:babseters.price,
//         hours:babseters.hours,
//         totalprice:babseters.totalprice,
//         totalhours:babseters.totalhours,
//         rreservioninfo:babseters.rreservioninfo}
//         console.log("test order",data)
   }    

   const canselRequest=async()=>{
   
     const orderId= (newData._id).toString()
    console.log("canssel",orderId)
    await api.delete(`/mother/order/${orderId}`).then((res)=>{
        console.log("DATA DELETE",res.data)
        
        SETOK(false)
    }).catch((err)=>{console.log("ERORR",err)})
        clearInterval(interval);
   }


   const paymentScreen=()=>{
    setShowModal(false)
    props.navigation.navigate('PaymentForm',{data1:newData})
   }

   const sendNotif= ()=>{
    
    const data={
        receiver:babseters.settterowner,
        content:"لقد تم اضافة طلب جديد",
        title:"طلب جديد",
        orderid:babseters.orderid
    }
    sendNotifcation(data)
   }
   
    return(

    < VStack mt={Platform.OS==='android'?66:100}> 
    <HStack borderColor={"#00ABB9"} borderWidth='1' flexDirection={'column'}  justifyContent='space-around' mt='10' ml='3' p={3} w={Metrics.WIDTH*0.928} >
        <VStack  flexDirection={'row'} justifyContent='space-between' alignItems={'baseline'} mt={2} mb={1}>
        <HStack>
              <Text style={styles.mainTex}  >ملخص الطلب</Text>
        </HStack>
      
        <HStack>
            <Text style={styles.mainTex}>رقم الطلب</Text>
             <Text style={styles.mainTex}>{babseters.orderid}</Text>
            <Text style={styles.mainTex}>:</Text>
        </HStack>
        
        </VStack>
        <Box borderColor={'#00ABB9'} borderWidth='1' h={'1%'} />
        
        
        <HStack flexDirection={'column'} alignItems='flex-start' mt={2}  >
            <VStack flexDirection={'row'} w={"full" } justifyContent='space-between'  mt='1' p={1}  >
                <Text style={styles.leftText}>اسم الجليسه</Text>
                 <Text  textAlign={'left'} style={styles.rightTex}  > {babseters.settername}</Text>
            </VStack>
            <VStack flexDirection={'row'} w={"full" } justifyContent='space-between'  mt='1' p={1} >
                <Text  style={styles.leftText}>اليوم</Text>
                <Text  style={styles.rightTex}> {moment(babseters.potementdate).format('LL')}</Text>
                 
            </VStack>
            <VStack flexDirection={'row'} w={"full" } justifyContent='space-between'  mt='1' p={1}>
            <Text style={styles.leftText}>الوقت</Text>
                <Text style={styles.rightTex}>{moment(babseters.start).format('hh:mm a')} "الى "{moment(babseters.end).format('hh:mm a')}</Text>
            </VStack>
        
        
        </HStack>

        <VStack flexDirection={'row'} w={"full" } justifyContent='space-between'  mt='1' p={1}>
        <Text style={styles.leftText}>اجمالي التكلفه</Text>
        <Text style={styles.rightTex}> {babseters.totalprice}</Text>
        </VStack>

        <VStack flexDirection={'row'} w={"full" } justifyContent='space-between'  mt='1' p={1}>
        <Text style={styles.leftText}>عدد االاطفال</Text>
        <Text style={styles.rightTex}> {babseters.childeaccount}</Text>
        </VStack>

        <VStack flexDirection={'row'} w={"full" } justifyContent='space-between'  mt='1' p={1}>
        <Text style={styles.leftText}>اسماء الاطفال</Text>
            {loading ?<Box>
            {chld.childe.map((item)=>{
                return(
                <Box key={item._id} flexDirection='row' justifyContent={'space-around'}>
                        <Text style={[styles.rightTex,{ width:Metrics.WIDTH*0.242,fontSize:14}]}> {item.name}</Text>
                        <Text style={[styles.rightTex,{ width:Metrics.WIDTH*0.242,fontSize:14}]}> * {item.diseasses}</Text>
                        </Box>
                )
            })  }
            </Box>:null }
        
        </VStack>
        </HStack>
        <VStack alignItems={'center'}>
            {OK?<Center><Text fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.base} fontSize='14' textAlign={'left'} fontWeight='medium'  p={3} mt='10' w={Metrics.WIDTH}>في حال لم يتم الموافقه على الطلب سيتم الالغاءخلال ١٥ دقيقه </Text>
                <Box mt={1}>
                <CountdownCircleTimer
                    isPlaying
                    duration={180}
                    colors={[Colors.AminaButtonNew, '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[159, 100, 50, 10 ]}
                    size={80}
                    strokeWidth={8} >
                    {({ remainingTime }) => <Text>{remainingTime}</Text>}
                </CountdownCircleTimer>
                </Box> 
                </Center>:
                <Box alignItems={'center'} w={Metrics.WIDTH*0.934} ml='3' mr='4' mt={5} rounded='lg'>
                     <Button bgColor={Colors.AminaButtonNew} size={'lg'} mb='1.5' w='full'
                        onPress={() => {confirmRequest() }}> احجز</Button>
                    </Box>
                    
                    
            }
            {/* <Box alignItems={'center'} w={Metrics.WIDTH*0.934} ml='3' mr='4' mt={5} rounded='lg'>
                     <Button bgColor={Colors.AminaButtonNew} size={'lg'} mb='1.5' w='full'
                        onPress={() => {sendNotif() }}> test</Button>
                    </Box> */}
            {OK&&<Center>
                <Box alignItems={'center'} w={Metrics.WIDTH*0.934} ml='3' mr='4' mt={5} rounded='lg'>
                        <Button bgColor={Colors.AminaButtonNew} size={'lg'} mb='1.5' w='full'
                            onPress={() => {canselRequest() }}> الغاء الطلب</Button>
                </Box>
            </Center>}
            
            
                     
            
        </VStack>

<Center >

<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
<Modal.Content width={Metrics.WIDTH } h={Metrics.HEIGHT*0.422}>
<Modal.CloseButton />
<Modal.Header>
    
</Modal.Header>
<Modal.Body alignItems={'center'} >
<AntDesign name='checkcircleo' size={50} color={Colors.loginGreen} style={{ marginBottom:10}} />
     <Text fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.base} fontSize='2xl'  textAlign={'center'} >اكمل الدفع</Text>
     
</Modal.Body>
 
<Modal.Footer alignItems={'center'}>
<Box alignItems={'center'} w={Metrics.WIDTH*0.834} ml='3' mr='4' mt={5} rounded='lg'>
    <Text fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.base} fontSize='2xl' textAlign={'center'} mb={2}>اكمل الدفع من خلال</Text>
                
            <Button bgColor={Colors.AminaButtonNew} size={'lg'} mb='1.5' w='full'
             onPress={() => paymentScreen()}> مدى</Button>
    </Box> 
   
</Modal.Footer>
</Modal.Content>
</Modal>
</Center>
        </VStack>
        
    )

}
export default  ConfirmRes;

