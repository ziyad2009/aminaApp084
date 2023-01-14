import React, { useState,useEffect ,useCallback,useContext,useRef} from 'react';
import {TouchableOpacity, View,Image,Platform,KeyboardAvoidingView,AppState,ActivityIndicator, Alert} from 'react-native'
import {Box,Avatar,HStack,VStack,Spacer,Center,Text,Button, Radio,Modal,Stack, Input, Badge} from 'native-base'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import{Metrics,Colors,Fonts,Images} from '../assets/Themes/'
 import AntDesign from'react-native-vector-icons/AntDesign'
import Feather from'react-native-vector-icons/Feather'
import moment from 'moment'
import{URL,URL_ws, URL_ws_chat} from '../services/links'
import  {UserContext} from '../services/UserContext';
import setItem from '../services/storage/'
import api from '../services/api'
import { sendNotifcation } from '../services/fucttions';
import OutlaintButton from '../services/buttons/buttonsOutlain';
import CustomButton from '../services/buttons/buttton';
import PubNubChat from '../chat/pupnup';
 

const WorkScreen=(props)=>{
  
    const[babysetter,setbabyseters]=useState([])

    const [totalmin,setTottalmint]=useState(0)
    const [intialTime,setintialTime]=useState(0)
    const startTime = useRef(new Date());
    const endTime = useRef(new Date());
    const crrunTime=moment(new Date().getTime())
    const [elapsedTime, setElapsedTime] = useState(2);

    
    const[loadmsg,setLoadmessag]=useState(false)
    
    const [loadChat,setloadChat]=useState(false)
    const[livechat,setlivechat]=useState(false)
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const[hasUnsavedChanges,sethasUnsavedChanges]=useState(false)

    const [hoursopt,setHoursopt]=useState("one")
    const[showModal,setShowModal]=useState(false)
    const [totallprice,settotallprice ]=useState(0)
    const [totallhours,settotallhours ]=useState(1)

    const[extrTime,setextraTime]=useState(false)
    const[extrTimeValue,setExtraTimeValue]=useState(0)



    const {SOKITIO,Getchatoom} = useContext(UserContext);
    const[cardExpiry,setcardExpiry]=useState('')
    const[room,setroom]=useState('')
    const [userrId,setuserID]=useState('1')
    const socket = useRef(null);
    let  realtime 
    // SOKITIO from contextt   to connection
    socket.current =SOKITIO;
    
    // useEffect( ()=>{
    //   const subscription = AppState.addEventListener("change", nextAppState => {
    //     if (
    //       appState.current.match(/inactive|background/) &&
    //       nextAppState === "active"
    //     ) {
        
    //       console.log("App has come to the foreground!");
    //     }
  
    //     appState.current = nextAppState;
    //     setAppStateVisible(appState.current);
    //     // clearInterval(realtime)
    //     // console.log("vale",loadtime)
    //     // updatemessageschat()
    //     console.log("leeeeeee")
    
    //     console.log("AppState", appState.current);
    //   });
  
    //   return () => {
    //     subscription.remove();
    //   };
    // },[])

    // useEffect(
    //   () => props.navigation.addListener('beforeRemove', (e) => {
    //       if (!hasUnsavedChanges) {
    //         // If we don't have unsaved changes, then we don't need to do anything
    //         console.log("not hony back")
             
    //         setloadmsgChat(true)
    //         return;
    //       }
  
    //       // Prevent default behavior of leaving the screen
    //       e.preventDefault();
  
    //       // Prompt the user before leaving the screen
    //       setloadmsgChat(true)
    //       // Alert.alert(
    //       //   'Discard changes?',
    //       //   'You have unsaved changes. Are you sure to discard them and leave the screen?',
    //       //   [
    //       //     { text: "Don't leave", style: 'cancel', onPress: () => {} },
    //       //     {
    //       //       text: 'Discard',
    //       //       style: 'destructive',
    //       //       // If the user confirmed, then we dispatch the action we blocked earlier
    //       //       // This will continue the action that had triggered the removal of the screen
    //       //       onPress: () => console.log("not hony"),
    //       //     },
    //       //   ]
    //       // );
    //     }),
    //   [props.navigation, hasUnsavedChanges]
    // );

useEffect( async()=>{
    const validExtratime=await setItem.getItem('BS:Extratime')
    const user = await setItem.getItem('BS:User');
    const motherData=await JSON.parse(user)
    const motherID=motherData._id
    const validextraTime=await JSON.parse(validExtratime)
    setuserID(motherID)
    
    setbabyseters(props.route.params.data1)
    
    setroom(`babayAmina${props.route.params.data1._id}`)
    //send roam name to great rrom chat
    Getchatoom(`babayAmina${props.route.params.data1._id}`)
    
    // var then = moment(babysetter.end).format("HH:mm:ss");
    // var ss= moment(babysetter.end).diff( moment(), 'minute')
    setTottalmint(0)
      
    if(validextraTime !=null){
      console.log("  time +1",validextraTime)
      setextraTime(true)
      setExtraTimeValue(validextraTime.plusehours)
    }
   // chikchatRoomMsg(`babayAmina${props.route.params.data1._id}`)
    const dataroom={val:'online',room:`babayAmina${props.route.params.data1._id}`.trim().toLowerCase() }
    
    
    socket.current.emit("usersStatus",dataroom)
   
    setTimeout(()=>{
      setloadChat(true)
    },2000)

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

useEffect(async () => {
  
  if (props.route.params.paymentstatuse) {
    // paymentstatuse updated, do somthing with `route.params.paymentstatuse`
    // For example, send the paymentstatuse to the server
    setextraTime(true)
    const data={
      plusehours:totallhours,
      valid:true,
      start:new Date()

    }
    await setItem.setItem('BS:Extratime', JSON.stringify(data));
    Alert.alert("note","extra time add")
    increasHoursbyorder(babysetter,totallprice)
    setExtraTimeValue(totallhours)
    console.log("price without fate 15%",props.route.params.paymentstatuse)
    console.log("price without fate 15%",totallprice)
  }else if(!props.route.params.paymentstatuse){
    console.log("  paymentstatuse +++ ccansel",totallprice)
  } 

}, [props.route.params?.paymentstatuse]);



useEffect(()=>{

  realtime =  setInterval(()=>{
  var then = moment(babysetter.end).format("HH:mm:ss");
  var ss= moment(babysetter.end).diff( moment(), 'minute')

  // console.log("new deffrent timer == ",ss)
  // console.log("new deffrent timer == ",then)
  setTottalmint(ss)
 },2000)
 return () => {
  clearInterval(realtime);
};
},[totalmin,elapsedTime])


const ENDDEXP=()=>{
      var ss= moment(babysetter.end).diff( moment(), 'minute')
      //console.log("  time",ss )
      setElapsedTime(ss)
   }


   

   const serviceCompleate= async(id)=>{ 
            
    console.log("order id",id)
    const user = await setItem.getItem('BS:User');
    const token = await setItem.getItem('BS:Token');
    const motherData=JSON.parse(user)
    const motherID=motherData._id
    api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
        await api.post(`${URL}/ordercomplete/${id}`)
        .then((res)=>{
          console.log("finesh order change to complete")
          increasHours(res.data.order)
          setItem.removeItem('BS:Extratime')
        }).finally(()=>{ sendNotif()}).catch((err)=>console.log('erorr:',err))
 

    }

    const increasHours= async(order)=>{
     //add extra hours to babysetter  to profile
      const token = await setItem.getItem('BS:Token');
      api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
       await api.patch(`${URL}/incrementsetterhoursr`,
      {
        id:order._id,
        setterID:order.settterowner
      }).then((res)=>{
       
       console.log("order Data",res.data)
      }).finally(()=> setTimeout(() => {
        props.navigation.navigate('FinleScreeen',{data1:babysetter})}
        ,1000)
      ).catch((err)=>console.log('erorr:',err))

    }
   
      const paymentScreen=()=>{
        setShowModal(false)
        sendNotif2()
        // props.navigation.navigate('PaymentForm',{data1:babysetter,datainfo:{totallhours:totallhours,totallprice:totallprice}})
        const newData={
          _id:babysetter._id,
          totalprice: totallprice ,
        }
        
        console.log("test total price to payment ",newData)
        props.navigation.navigate('TelerPage',paymentdata={newData,extrastatuse:true}, )        
      }



  const increasHoursbyorder = async (babysetter) => {
    //add extra hours to order
    
     const tootalgaine =  (Number(0.15)* Number(totallprice) +Number(totallprice) )
    // const totalhours = babysetter.totalhours + totallhours
    console.log("test h and p   extra Data total hors", totallhours, "--totl gaine:", tootalgaine)
    const token = await setItem.getItem('BS:Token');

    const newExtratime = {
      id: babysetter._id,
      setterID: babysetter.settterowner,
      gaine: tootalgaine,
      hours: totallhours
    } 
    console.log("test data change++++", newExtratime)
      api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`); 
      await api.patch(`${URL}/incrementsetterextrahoursr`,
     {
       id:babysetter._id,
       setterID:babysetter.settterowner,
       gaine:tootalgaine,
       hours:totallhours
     }).then((res)=>{
        console.log("order extra Data",res.data)
     }).finally(()=> console.log('increment did')
     ).catch((err)=>console.log('erorr:',err))

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
              console.log("test price",price * 2)
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
    props.navigation.navigate('FinleScreeen',{data1:babysetter})
   }

   const  children = ({ remainingTime }) => {
   // console.log("remain---",remainingTime)
    const hours = Math.floor(remainingTime / 3600)
    const minutes = Math.floor((remainingTime ) / 60)
   // const minutes = Math.floor((remainingTime ))
   // const seconds = remainingTime % 60
    
    return <Text>{minutes}</Text>
  }
   
  const goToaddextraTime=(hours)=>{
   
    var timeinhours= moment(babysetter.end).diff( moment(), 'hours')
    var diffrenttime= moment(babysetter.end).diff( moment(), 'minutes')
    const alowedtime=(diffrenttime/timeinhours)
    const nagitaveTime=Math.sign(diffrenttime)
    setShowModal(true)
    // if(nagitaveTime<1){
    //   return  Alert.alert("تنبيه","عفوا تم تجاوز وقت و يوم الخدمه")
    // }
    if(diffrenttime <= alowedtime  ){
      setShowModal(true)
     } else{
      Alert.alert("تنبيه","يمكنك التمديد في اخر ساعه متبقية")
     }
     
  }
  
 
const handeluserstatuse=(val)=>{
  
  switch(val){
    case "foreground":
      console.log("test user statuse1" ,val)
     
    break;
    case  "background":
      console.log("test user statuse2" ,val)
    break;
    case  "join":
      console.log("test user statuse3" ,val)
    break;
    case  "leave":
      console.log("test user statuse4" ,val)
    break;
  }
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
            {extrTime&&
                  <Stack alignSelf="center" position={'absolute'} left={10} top={10}   backgroundColor={'error.500'} rounded='xl' padding={1}> 
                              <Text fontSize={18} color={Colors.white} > + {extrTimeValue.toString()}</Text>
                  </Stack>}
            <Spacer />
             
            <Box   flexDirection='row'  justifyContent={'space-around'} w="50%" backgroundColor={Colors.transparent} > 
                <VStack mt={2}>
                {elapsedTime <=  1 ? 
                <Box  alignItems={'center'} mr='3' mt={2} p='1'>
                  <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} fontSize={12} color='red.400' >{"تم تجاوز موعد الخدمه"}</Text> 
                </Box>:
              
                <View>
                  <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} fontSize={12} >{`متبقي من نهاية  `}</Text>
                  <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} fontSize={12}>{`الحضانه ${elapsedTime} دقيقه`}</Text>
                  </View>
                }
                
                 
                </VStack>
                
                <Box mt={2}  >
                  
                <CountdownCircleTimer
                    isPlaying={true}
                    //initialRemainingTime={intialTime}
                    duration={babysetter.hours*60}
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
        
      <Center flexDirection={'row'} h={"16"}>
        <Box alignItems={'center'}  w={Metrics.WIDTH * 0.461} ml='3' mr='4'   >
          {/* <Button bgColor={Colors.AminaButtonNew} size={'lg'} mb='1.5' w='full'
                        onPress={() =>   setShowModal(true) }> تمديد</Button> */}
          <CustomButton
            buttonColor={Colors.AminaButtonNew}
            title="تمديد"
            buttonStyle={{  disabled:true,width: '77%', alignSelf: 'center', marginBottom: 10 }}
            textStyle={{ fontSize: 15 }}
            disabled={extrTime}
            onPress={() => goToaddextraTime(babysetter.hours)}
          />
          {/* <CustomButton
            buttonColor={Colors.AminaButtonNew}
            title="11تمديد"
            
            buttonStyle={{ width: '77%', alignSelf: 'center', marginBottom: 10} }
            textStyle={{ fontSize: 15 }}
            onPress={() =>  setItem.removeItem('BS:Extratime') }
           //onPress={() =>  console.log(babysetter) }
         /> */}


        </Box>
        {/* <Feather name= {livechat?'user':"activity"} color={Colors.bloodOrange} size={33} onPress={()=> console.log(recvMessages.length)} /> */}

        <Box alignItems={'center'} w={Metrics.WIDTH * 0.401} ml='3' mr='4' mt={1}  >

          <OutlaintButton
            buttonColor={Colors.white}
            title="انهاء وتقييم"
            buttonStyle={{ width: '77%', alignSelf: 'center', marginBottom: 12 }}
            titleColor={Colors.blacktxt}
            textStyle={{ fontSize: 15 }}
            onPress={() => serviceCompleate(babysetter._id)}
          />

        </Box>

      </Center>
    </Box>
    
    <Box h={ Platform.OS==="android"?"62%" : "62%" } backgroundColor={Colors.transparent} borderTopRadius={20} padding={1} >
            {loadChat?
            <PubNubChat data={loadmsg} room={room} username={babysetter.mothername} userstatuse={(e)=>handeluserstatuse(e)} />:
            <View style={{marginTop:22, alignItems:'center' ,justifyContent:"space-around",flexDirection:"column"} }>
              <ActivityIndicator size={20} color={Colors.banner} />
              <Text fontSize={22} fontFamily={Fonts.type.aminafonts} >..جاري تحميل المحاداثات السابقة</Text>
            </View>
            }
    </Box>
        

<Center >

<Modal isOpen={showModal} onClose={() => setShowModal(false)}
borderColor={Colors.white}
avoidKeyboard justifyContent="flex-end" bottom="2">
<Modal.Content width={Metrics.WIDTH } h={Metrics.HEIGHT*0.522}>
<Modal.CloseButton />
<Modal.Header alignItems={'center'}>
<AntDesign name='checkcircleo' size={33} color={Colors.loginGreen} style={{ marginBottom:10}} />
     <Text fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.base} fontSize='lg'  textAlign={'center'} >  تم طلب وقت اضافي للحاضنه</Text>
     <Text fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.base} fontSize='lg'  textAlign={'center'} > سعر الساعه الواحد بـ{babysetter.price}</Text>
</Modal.Header>
<Modal.Body alignItems={'center'} borderColor={Colors.AminaButtonNew} >
          <Stack Stack direction={{ base: "column",md: "row"}} space='4'   >
                            <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={hoursopt} 
                              onChange={nextValue => {setHoursopt(nextValue)  }} >
                                <Radio value="one" my={1} >
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
 
<Modal.Footer alignItems={'center'} justifyContent='center'>
  <Box alignItems={'center'}   w={"90%"} p='2'> 
    <Text fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.base} fontSize='lg' textAlign={'center'} mb={2}>السعر الاجمالي لـ{totallhours} = {totallprice} </Text>
  </Box>
   
    <Box alignItems={'center'}  w={Metrics.WIDTH*0.461} ml='3' mr='4'   >
                     {/* <Button bgColor={Colors.AminaButtonNew} size={'lg'} mb='1.5' w='full'
                        onPress={() =>   setShowModal(true) }> تمديد</Button> */}
                         <CustomButton
                          buttonColor={Colors.AminaButtonNew}
                          title="ادفع"
                          buttonStyle={{width: '88%', alignSelf: 'center'}}
                          textStyle={{fontSize: 15}}
                          onPress={() =>  paymentScreen(true)  }
                            />


      </Box>
   
   
</Modal.Footer>
</Modal.Content>
</Modal>
</Center>
    </View>
)
}
export default WorkScreen;




// const [messages, setMessages] = useState([]);
//     const[greating,setGreating]=useState('')
//     const [recvMessages, setRecvMessages] = useState([]);
//     const[loadmsgChat,setloadmsgChat]=useState(false)
//chat message
 

// useEffect(async() => {
//   props.navigation.addListener('blur', (e) => {
//    // const dataroom={val:'offline',room:`babayAmina${props.route.params.data1._id}`.trim().toLowerCase() }
//     console.log("start emit to")
//     //socket.current.emit("usersStatus",dataroom)
   
//     console.log("leeeeeee",e.data)

//   })


     
//   // useEffect(  () => {
//   //   const unsubscribe = props.navigation.addListener('focus',async () => {
//   //       console.log("add event to extand ")
        
//   //   });

//   //   return unsubscribe;
//   // }, []);

//   const user = await setItem.getItem('BS:User');
//   const motherData=JSON.parse(user)
//   const motherID=motherData._id
  
//   const usernameTest =props.route.params.motherinfo
//   const username=usernameTest
 
    

//     if(loadmsg){
//       // console.log('start android ',username)
//       // console.log('start chating wethe ',extruser._id)
//       const id=motherID
//       const  room=`babayAmina${props.route.params.data1._id}`
//       const avatar= 'https://placeimg.com/140/140/any'
//       console.log('CHAT ROOM DATa++',room,"user==",id)
     
//       socket.current.emit('join', { id,username, room }, (error) => {
//       if (socket.current.lastRoom) {
//           console.log('++++userr in same room +++')
//       }
        
//         if (error) {
//            console.log('err soket ',error)
//            setlivechat(false)
//         }
//     } )

//       socket.current.on("roomData", data => {
//         //sktId= socket.current.id
//         console.log("ROom On",data)
//         if(data.users.length > 1){
//           setlivechat(true)
//           console.log("userr exist ROom On",data.users.length)
//         }else{
//            console.log('ROom data not load ',)
//           setlivechat(false)
//           console.log("ROom On",data.users.length)

//         }
       
//         })

  
    
  
//     socket.current.on("welcome", txtmsg => {
//       console.log("WELCOMe On",txtmsg)
//       setGreating(txtmsg)
//     });  
  
//     socket.current.on("message", message => {
//      console.log("message On",message)
    
//      setRecvMessages(prevState => GiftedChat.append(prevState,  message));
//      // updatemessageschat2(recvMessages)
     
//     })
    
//     socket.current.on("statuseuser", data => {
//       console.log("online users  On ",data)
//       if(data.statuse){
//         setlivechat(true)
//       }else{
//         setlivechat(false)
//       }
     
//     }); 

//     socket.current.on('disconnect', (data) =>{
//       console.log(socket.current.id + ' disconnected!');
       
//     });
//     }
    
//     if(!loadmsg){
//       console.log('start  load messages chating ')
//       //loaddPrevmssage()
//       setLoadmessag(true)
//     }
//      return () => { loadmsg = false };
  
// }, [loadmsg,room,userrId]);



//////////////

// const inputToValue=(inputText)=>{
  
//   //if the input has more than 5 characters don't set the state
//   if(inputText.length < 6){
//        const tokens = inputText.split("/");
//        // don't set the state if there is more than one "/" character in the given input
//        if(tokens.length < 3){
//           const month = Number(tokens[1]);
//           const year = Number(tokens[2]);
//           //don't set the state if the first two letter is not a valid month
//           if(month >= 1 && month <= 12){
//              let cardExpiry = month + "";
//              //I used lodash for padding the month and year with  zero               
//              if(month > 1 || tokens.length === 2){
//                   // user entered 2 for the month so pad it automatically or entered "1/" convert it to 01 automatically
//                   cardExpiry = _.padStart(month, 2, "0");   
//              }
//              //disregard changes for invalid years
//              if(year > 1 && year <= 99){
//                  cardExpiry += year;
//              }
//             setcardExpiry({cardExpiry});
//           }
//        }
//   }
// }

// const handelEXPnumber = (inputtxt) => {
//   console.log("TEST Card",inputtxt.length)
//   setcardExpiry(inputtxt)
//  }

//  const DATEMASK = createNumberMask({
//   prefix: ['M'],
//  // delimiter: '.',
//   separator: '/',
//   precision: 2,
  
// })