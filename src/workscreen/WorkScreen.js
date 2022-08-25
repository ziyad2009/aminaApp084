import React, { useState,useEffect ,useCallback,useContext,useRef} from 'react';
import {Alert, View,Image,Platform,KeyboardAvoidingView} from 'react-native'
import {Box,Avatar,HStack,VStack,Spacer,Center,Text,Button, Radio,Modal,Stack} from 'native-base'
import CircularProgress from 'react-native-circular-progress-indicator';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import{Metrics,Colors,Fonts} from '../assets/Themes/'
 import AntDesign from'react-native-vector-icons/AntDesign'
import Feather from'react-native-vector-icons/Feather'
import moment from 'moment'
import{URL,URL_ws, URL_ws_chat} from '../services/links'
import { GiftedChat } from 'react-native-gifted-chat'
//import io from "socket.io-client";
import  {UserContext} from '../services/UserContext';

 import setItem from '../services/storage/'
 import api from '../services/api'
import { sendNotifcation } from '../services/fucttions';
import OutlaintButton from '../services/buttons/buttonsOutlain';
import CustomButton from '../services/buttons/buttton';
  


const WorkScreen=(props)=>{
  
    const[Star,setStart]=useState(null)
    const[End,setEnd]=useState(null)
     const [loadtime,setloadtime]=useState(false)
    const[time1,setTime1]=useState(null)
    const [time2,settime2]=useState(null)
    const[babysetter,setbabyseters]=useState([])
    const [totalmin,setTottalmint]=useState(0)
    const [intialTime,setintialTime]=useState(0)
    const startTime = useRef(new Date());
    const endTime = useRef(new Date());
    const [elapsedTime, setElapsedTime] = useState(0);
    const [messages, setMessages] = useState([]);

    const[greating,setGreating]=useState('')
    const [messageToSend, setMessageToSend] = useState("");
    const [recvMessages, setRecvMessages] = useState([]);
    const[loadmsg,setLoadmessag]=useState(false)
    
    const [hoursopt,setHoursopt]=useState("one")
    const[showModal,setShowModal]=useState(false)
    const [totallprice,settotallprice ]=useState(0)
    const [totallhours,settotallhours ]=useState(1)
    const {SOKITIO} = useContext(UserContext);
     
    const[room,setroom]=useState('')
    const [userrId,setuserID]=useState('1')
    const socket = useRef(null);
    let  realtime 
    // SOKITIO from contextt   to connection
    socket.current =SOKITIO;
    
    // const [joined, setJoined] = useState(false);
    // const handleInviteAccepted = useCallback(() => {
    // setJoined(true);
    // }, []);

    // const handleJoinChat = useCallback(() => {
    // socket.emit("SEND_JOIN_REQUEST");
    // }, []);
   
    


useEffect( async()=>{
  const user = await setItem.getItem('BS:User');
  const motherData=await JSON.parse(user)
  const motherID=motherData._id
  setuserID(motherID)
  setroom(`babayAmina${props.route.params.data1._id}`)
 
    
    setbabyseters(props.route.params.data1)

    setroom(`babayAmina${props.route.params.data1._id}`)
   

    var then = moment(babysetter.end).format("HH:mm:ss");
    var ss= moment(babysetter.end).diff( moment(), 'minute')
    console.log("new deffrent time ",ss)
    console.log("new deffrent time ",then)
    setTottalmint(0)
    
   

},[])

useEffect(()=>{
    let onColoc=null
    // console.log("MOMENT", moment(babysetter.start) )
    onColoc= setInterval(()=>{
      //console.log("babay ++++ ",props.route.params.data1)
    ENDDEXP()
  },2000)
return () => clearInterval(onColoc);
}, )


useEffect(()=>{
  calcluateTotalprice(hoursopt)
},[hoursopt])



useEffect(()=>{

  realtime =  setInterval(()=>{
  var then = moment(babysetter.end).format("HH:mm:ss");
  var ss= moment(babysetter.end).diff( moment(), 'minute')

  console.log("new deffrent timer == ",ss)
  console.log("new deffrent timer == ",then)
  setTottalmint(ss)
 },2000)
 return () => {
  clearInterval(realtime);
};
},[totalmin,elapsedTime])


//chat message
 

useEffect(async() => {
  props.navigation.addListener('beforeRemove', (e) => {
    console.log("leeeeeee")})
     clearInterval(realtime)
     console.log("vale",loadtime)
    uploadmessage()
  // useEffect(  () => {
  //   const unsubscribe = props.navigation.addListener('focus',async () => {
  //       console.log("add event to extand ")
        
  //   });

  //   return unsubscribe;
  // }, []);

  const user = await setItem.getItem('BS:User');
  const motherData=JSON.parse(user)
  const motherID=motherData._id
  
  const extruser=babysetter
  const usernameTest =props.route.params.motherinfo
    const username=usernameTest

    if(loadmsg){
      console.log('start android ',username)
      console.log('start chating wethe ',extruser._id)
     
  
      const id=motherID
      const  room=`babayAmina${props.route.params.data1._id}`
      const avatar= 'https://placeimg.com/140/140/any'
      
   
      console.log('start  Live chating ')
      
      socket.current.emit('join', { id,username, room }, (error) => {
      
    
        if (socket.current.lastRoom) {
          console.log('++++userr in same room +++')
          // socket.leave(socket.lastRoom);
          // socket.lastRoom = null;
      }
        
        if (error) {
           console.log('err soket ',error)
        }
    } )
      socket.current.on("roomData", data => {
       //sktId= socket.current.id
      console.log("ROom On",data)
     // console.log('suser id  ',sktId)
          setloadtime(true)
        })
  
    socket.current.on("welcome", txtmsg => {
      console.log("WELCOMe On",txtmsg)
      setGreating(txtmsg)
    });  
  
    socket.current.on("message", message => {
     console.log("message On",message)
    setRecvMessages(prevState => GiftedChat.append(prevState,  message));
    })
  
    socket.current.on('disconnect', () =>{
      console.log(socket.current.id + ' disconnected!');
      console.log("out from chat ");
      //Alert.alert('تم تسجيل خروجك  من الشات')
    });
    }
   
    
  
  if(!loadmsg){
    console.log('start  load messages chating ')
    loaddPrevmssage()
    setLoadmessag(true)
  }
  return () => { loadmsg = false };
  
}, [loadmsg,room,userrId]);



   const loaddPrevmssage=async()=>{ 
    const user = await setItem.getItem('BS:User');
    const token = await setItem.getItem('BS:Token');
    const motherData=JSON.parse(user)
    const motherID=motherData._id
    api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
    await api.post(`${URL}/chatmessagessload`,{
       userid:motherID,
       room:room
      }).then((res)=>{
     
    // alll condtion expete filte
     console.log("start load chat message ",res.data)
     setLoadmessag(true)
     setRecvMessages(res.data.messages)
     
    }).catch((err)=>console.log('erorr:',err))
    
   }


   const uploadmessage=async()=>{
    const user = await setItem.getItem('BS:User');
    const token = await setItem.getItem('BS:Token');
    const motherData=JSON.parse(user)
    const motherID=motherData._id
    api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
    await api.post(`${URL}/chatmessage`,{
      messages:recvMessages,
      userid:motherID,
      chatname:room
    
    }).then((res)=>{
     
    // alll condtion expete filte
     console.log("all meeage from chat ",res.data)
    //  setLoadmessag(true)
    //  setRecvMessages(res.data.messages)
     
    }).catch((err)=>console.log('erorr:',err))
    
   }


  const onSend = messages => {
    console.log("message send by app",messages);
    socket.current.emit("sendMessage",  messages[0].text );
    setRecvMessages(prevState => GiftedChat.append(prevState, messages));

  };
 

   const ENDDEXP=()=>{
      var then = moment(babysetter.end).format("HH:mm:ss");
      var ss= moment(babysetter.end).diff( moment(), 'minute')
      console.log("Totla time",ss)
      // console.log("data info",babysetter.end ,"- ",babysetter.start)
      // console.log("endd",then)
    setElapsedTime(ss)
   }


   

   const serviceCompleate= async(id)=>{ 
            
    console.log("order id",id)
    const user = await setItem.getItem('BS:User');
    const token = await setItem.getItem('BS:Token');
    const motherData=JSON.parse(user)
    const motherID=motherData._id
    // console.log("motherID==",motherID)
    // console.log("usestat filter",filterData)
    //interval = setInterval(async() => {
    
     api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
        await api.post(`${URL}/ordercomplete/${id}`)
        .then((res)=>{
          console.log("finesh order change to complete",res.data)
          increasHours(res.data.order)
          
        }).finally(()=>{}).catch((err)=>console.log('erorr:',err))

        // if(response.length >= 1){
        //     console.log("DATA Orders with condtions,",response)
        //     setmotherReq(response)
        //     setloading(!loading)
        //     console.log("response gooof -Active")
        // }
        // else{
        //     setmotherReq(response)
        //     setloading(!loading)
        //     console.log("response baad -Active")
        // }
        sendNotif()
       
    }
    const increasHours= async(order)=>{
     
      const token = await setItem.getItem('BS:Token');
      const data={
            id:order._id,
            setterID:order.settterowner
      }
      console.log("update hours to setter in order",data)
      api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
       await api.patch(`${URL}/incrementsetterhoursr`,
      {
        id:order._id,
        setterID:order.settterowner
      }).then((res)=>{
      // alll condtion expete filte
       console.log("order Data",res.data)
      }).finally(()=> setTimeout(() => {
        props.navigation.navigate('FinleScreeen',{data1:babysetter})
         
      },1000)).catch((err)=>console.log('erorr:',err))

    }
   
    const paymentScreen=()=>{
      setShowModal(false)
      sendNotif2()
      props.navigation.navigate('PaymentForm',{data1:babysetter,datainfo:{totallhours:totallhours,totallprice:totallprice}})
      //
      
     }

     const sendNotif2= ()=>{
    
      const data={
          receiver:babysetter.settterowner,
          content:`لقد تم  طلب تمديد فترة الحضانه لمدة${totallhours}  من قبل الام`,
          title:"تمديد طلب ",
          orderid:babysetter.orderid
      }
      sendNotifcation(data)
      console.log("test noti",data)
     }
     

     const calcluateTotalprice=(value)=>{
      const price =babysetter.price
        console.log("tets value ",value)
        setHoursopt(value)
        switch (value){
          case  "one":
              console.log("start filter active expeted canceled" )
              settotallprice(price*1)
              settotallhours(1)
               
  
              break;
          case "tow":
              console.log("start filter pendeng")
              settotallprice(price * 2)
              settotallhours(2)
           break;
          case "three":
              console.log("start filter cansel")
              settotallprice(price * 3)
              settotallhours(3)
  
           break;
           case  "foure":
              console.log("start filter cansel")
              settotallprice(price * 4)
              settotallhours(4)
             break;
        }
      }
         
     
      
   const sendNotif= ()=>{
    
    const data={
        receiver:babysetter.settterowner,
        content:"لقد تم  انهاد فترة الحضانه من قبل الام",
        title:"انها طلب ",
        orderid:babysetter.orderid
    }
    sendNotifcation(data)
    console.log("test noti",data)
   }

   const  children = ({ remainingTime }) => {
   // console.log("remain---",remainingTime)
    const hours = Math.floor(remainingTime / 3600)
    const minutes = Math.floor((remainingTime ) / 60)
   // const minutes = Math.floor((remainingTime ))
   // const seconds = remainingTime % 60
  
    return <Text>{minutes}</Text>
  }
   
     
return(
    <View style={{backgroundColor:"#00ABB9" ,flex:1 }}>
       
         
    <Box backgroundColor={Colors.white}  w={Metrics.WIDTH*0.980}  h={ Platform.OS==="android"?"28%" : "25%"} flexDirection={'column'}
        borderRadius={15} borderWidth={1} borderColor='blue.400'  mt={ Platform.OS==='android'?66:100} mb={3} mr="1" ml="1"    >
            
        <VStack justifyContent='space-around' flexDirection={'row'} mt={2} backgroundColor={Colors.transparent} w={Metrics.WIDTH*0.960}    >
            <HStack flexDirection={'row'} alignItems='flex-start'    >
            <Image  source={{ uri: `${URL}/users/${babysetter.settterowner}/avatar`}} resizeMode='stretch' 
                style={{width: 60, height:60,marginLeft:5,marginRight:7,borderRadius:60}} />
                 
                <Box ml={2} alignItems='flex-start'>
                    <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} fontSize={16} fontWeight='bold'  mt="3">{babysetter.settername}</Text>
                    <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} fontSize={14} fontWeight='300'>{babysetter.serviestype}</Text>
                </Box>
            </HStack>
            <Spacer />
             
            <Box   flexDirection='row'  justifyContent={'space-around'} w="50%" backgroundColor={Colors.transparent} > 
                <VStack mt={2}>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} fontSize={12} >{`متبيقي من نهاية  `}</Text>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} fontSize={12}>{`الحضانه ${elapsedTime} دقيقه`}</Text> 
                </VStack>
                <Box mt={2}>
                <CountdownCircleTimer
                    isPlaying={true}
                    //initialRemainingTime={intialTime}
                    duration={totalmin*60}
                    colors={['#00Abb9', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[500, 100, 50, 10]}
                    size={50}
                    strokeWidth={4}
                      >
                      {children}
                      {/* {({ remainingTime }) =><Text>{remainingTime}</Text> } */}
                </CountdownCircleTimer>
                </Box> 
                 
            </Box> 
        </VStack>
                
        <HStack flexDirection={'row'} alignItems="center" background={"#ddf1f4"} justifyContent='space-around'
         w={Metrics.WIDTH*0.940} borderRadius={10} ml={2} mt={3}    >
                <Stack flexDirection={'row'} alignItems='baseline'>
                <Feather name="calendar" size={24}  color={Colors.blacktxt}  style={ {marginLeft:Metrics.HEIGHT*0.0121,marginVertical:10}} />
                <Text fontSize={13} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} color='black' ml="2">{moment(babysetter.potementdate).format("'dddd,MMM,YY'")}</Text>
                </Stack>
                <Stack flexDirection={'row'} alignItems='baseline'>
                <Feather name="clock" size={24}  color={Colors.blacktxt} style={ {marginLeft:Metrics.HEIGHT*0.0121,marginVertical:10}}  />
                <Text fontSize={13} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} color='black' ml="2">{moment(babysetter.start).format("hh:mm a")}</Text>
                  <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base}>{moment(babysetter.end).format("hh:mm a")}</Text>

                </Stack>
                
                  
                
        </HStack>
        
        <Center flexDirection={'row'}  alignItems='baseline'   h={"22%"} >
            <Box alignItems={'center'}  w={Metrics.WIDTH*0.461} ml='3' mr='4'   >
                     {/* <Button bgColor={Colors.AminaButtonNew} size={'lg'} mb='1.5' w='full'
                        onPress={() =>   setShowModal(true) }> تمديد</Button> */}
                         <CustomButton
                          buttonColor={Colors.AminaButtonNew}
                          title="تمديد"
                          buttonStyle={{width: '90%', alignSelf: 'center'}}
                          textStyle={{fontSize: 15}}
                          onPress={() =>  setShowModal(true)  }
                            />


            </Box>
                 {/* <Feather name='user' color={Colors.bloodOrange} size={33} onPress={()=> uploadmessage()} /> */}
            <Box alignItems={'center'} w={Metrics.WIDTH*0.401} ml='3' mr='4' mt={1}  >
                         
                            <OutlaintButton
                          buttonColor={Colors.white}
                          title="انهاء وتقييم"
                          buttonStyle={{width: '90%', alignSelf: 'center'}}
                          titleColor={Colors.blacktxt}
                          textStyle={{fontSize: 15}}
                          onPress={() => serviceCompleate(babysetter._id)  }
                            />
            </Box>
        </Center>
        
    {/* <Text fontSize={20}>weelcome;{greating}</Text> */}
    </Box>
    
    <Box h={ Platform.OS==="android"?"57%" : "62%" } backgroundColor={Colors.white} borderTopRadius={20} padding={1} >
      <GiftedChat
       messages={recvMessages}
       onSend={messages => onSend(messages)}
       user={{
         _id:userrId,
         //avatar: "https://placeimg.com/140/140/any"
          
       }}
        />
    
    </Box>
        { Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />} 

<Center >

<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
<Modal.Content width={Metrics.WIDTH } h={Metrics.HEIGHT*0.622}>
<Modal.CloseButton />
<Modal.Header alignItems={'center'}>
<AntDesign name='checkcircleo' size={50} color={Colors.loginGreen} style={{ marginBottom:10}} />
     <Text fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.base} fontSize='2xl'  textAlign={'center'} >  تم طلب وقت اضافي للحاضنه</Text>
     <Text fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.base} fontSize='2xl'  textAlign={'center'} > سعر الساعه الواحد ب{babysetter.price}</Text>
</Modal.Header>
<Modal.Body alignItems={'center'} >
          <Stack Stack direction={{ base: "column",md: "row"}} space='4'   >
                            <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={hoursopt} 
                              onChange={nextValue => {setHoursopt(nextValue)  }}>
                                <Radio value="one" my={1}>
                                  ساعه
                                </Radio>
                                <Radio value="tow" my={1}>
                                  ساعتين
                                </Radio>
                                <Radio value="three" my={1}>
                                  ثلاث ساعات
                                </Radio>
                                <Radio value="foure" my={1  }>
                                  اربع ساعات
                                </Radio>
                                
                            
                            </Radio.Group>
                </Stack>
     
</Modal.Body>
 
<Modal.Footer alignItems={'center'}>
  <Box alignItems={'center'}   w={"90%"} p='2'> 
    <Text fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.base} fontSize='xl' textAlign={'center'} mb={2}>السعر الاجمالي ل{totallhours} = {totallprice} </Text>
  </Box>
<Box alignItems={'center'} w={Metrics.WIDTH*0.834} ml='3' mr='4' mt={5} rounded='lg'>
    <Text fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.base} fontSize='2xl' textAlign={'center'} mb={2}>اكمل الدفع عن طريق</Text>
    <Button bgColor={Colors.AminaButtonNew} size={'lg'} mb='1.5' w='full'
             onPress={() => paymentScreen()}> مدى</Button>
    </Box> 
   
</Modal.Footer>
</Modal.Content>
</Modal>
</Center>
    </View>
)
}
export default WorkScreen;