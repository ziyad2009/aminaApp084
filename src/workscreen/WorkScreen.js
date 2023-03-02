import React, { useState,useEffect ,useCallback,useContext,useRef} from 'react';
import {TouchableOpacity, View,Image,Platform,KeyboardAvoidingView,AppState,ActivityIndicator, Alert} from 'react-native'
import {Box,Avatar,HStack,VStack,Spacer,Center,Text,Button, Radio,Modal,Stack, Input, Badge} from 'native-base'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import{Metrics,Colors,Fonts,Images,fontPixel,widthPixel,heightPixel,pixelSizeHorizontal,pixelSizeVertical} from '../assets/Themes/'
 import AntDesign from'react-native-vector-icons/AntDesign'
import Feather from'react-native-vector-icons/Feather'
import moment from 'moment'
import{URL,URL_ws, URL_ws_chat} from '../services/links'
import  {UserContext} from '../services/UserContext';
import setItem from '../services/storage/'
import api from '../services/api'
import { sendNotifcation } from '../services/fucttions';
import CountdownTimer from './CountdownTimer';
   
import OutlaintButton from '../services/buttons/buttonsOutlain';
import CustomButton from '../services/buttons/buttton';
import PubNubChat from '../chat/pupnup';
import TimeSlots from './timeslotscreen';
import Counterscreen from './counterscreeen';
import ResultScreen from './resultsscreen';
 

let realtime
let realtime2
let onColoc=null
let EXTENDTIMEvLUE=0
let selectedSlot=0
var chektimer;
const WorkScreen=(props)=>{
  
    const[babysetter,setbabyseters]=useState([])
    const[loading,setloding]=useState(false)
    const [totalmin,setTottalmint]=useState(0)
    const [intialTime,setintialTime]=useState(0)
    const startTime = useRef(new Date());
    const endTime = useRef(new Date());
    const crrunTime=moment(new Date().getTime())
    const [elapsedTime, setElapsedTime] = useState(2);

    
    const[StartAcount,setStartAcount]=useState(false)
    const[durationTime,setdurationTime ]=useState(0)
    
    const[loadmsg,setLoadmessag]=useState(false)
    
    const [loadChat,setloadChat]=useState(false)
    const[livechat,setlivechat]=useState(false)
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const[hasUnsavedChanges,sethasUnsavedChanges]=useState(false)

    const [hoursopt,setHoursopt]=useState(null)
    const[showModal,setShowModal]=useState(false)
    const [totallprice,settotallprice ]=useState("0")
    const [totallhours,settotallhours ]=useState(0)

    const[extrTime,setextraTime]=useState(false)
    const[extrTimeValue,setExtraTimeValue]=useState(0)
    
    const [screencasses,setscreencasess]=useState(0)
    const ServiceTime=useRef(1)
 
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

    useEffect(
      () => props.navigation.addListener('beforeRemove', (e) => {
          if (!hasUnsavedChanges) {
            // If we don't have unsaved changes, then we don't need to do anything
            console.log("not hony back")
            clearInterval(chektimer)
            clearInterval(realtime);
          }
  
          // Prevent default behavior of leaving the screen
         // e.preventDefault();
  
          // Prompt the user before leaving the screen
         // setloadmsgChat(true)
          // Alert.alert(
          //   'Discard changes?',
          //   'You have unsaved changes. Are you sure to discard them and leave the screen?',
          //   [
          //     { text: "Don't leave", style: 'cancel', onPress: () => {} },
          //     {
          //       text: 'Discard',
          //       style: 'destructive',
          //       // If the user confirmed, then we dispatch the action we blocked earlier
          //       // This will continue the action that had triggered the removal of the screen
          //       onPress: () => console.log("not hony"),
          //     },
          //   ]
          // );
        }),
      [props.navigation, hasUnsavedChanges]
    );

useEffect( async()=>{
  
 
    //chick extra time Request
  const requestExtratime=await setItem.getItem('BS:ReqExtratime')
  const ReqTime=await JSON.parse(requestExtratime)

  const user = await setItem.getItem('BS:User');
  const motherData=await JSON.parse(user)
  const motherID=motherData._id
  
  setuserID(motherID)
  setbabyseters(props.route.params.data1)
    
  setroom(`babayAmina${props.route.params.data1._id}`)
    //send roam name to great rrom chat
  Getchatoom(`babayAmina${props.route.params.data1._id}`)
    
    // var then = moment(babysetter.end).format("HH:mm:ss");
    // var ss= moment(babysetter.end).diff( moment(), 'minute')
  setTottalmint(0)
      
    // if(validextraTime !=null){
    //   console.log("  time +1",validextraTime)
    //   setextraTime(true)
    //   setExtraTimeValue(validextraTime.plusehours)
    // }else{
    //   console.log("  time +1+1")
    // }
  //make auto chek for expand request
    if(ReqTime === null ){
      console.log("ueser Not Ask expand time",) 
    }else{
      console.log("user ask Request time" ,ReqTime)
       cheackAccspete(props.route.params.data1._id)
    }

   // chikchatRoomMsg(`babayAmina${props.route.params.data1._id}`)
    const dataroom={val:'online',room:`babayAmina${props.route.params.data1._id}`.trim().toLowerCase() }
    socket.current.emit("usersStatus",dataroom)
   setTimeout(()=>{
      setloadChat(true)
    },2000)

},[])

 
useEffect(()=>{
   
    // console.log("MOMENT", moment(babysetter.start) )
    onColoc= setInterval(()=>{
      //console.log("babay ++++ ",props.route.params.data1)
    ENDDEXP()
  },2000)
return () => clearInterval(onColoc);
}, )


useEffect(async ()=>{
  const timeData=props.route.params.data1
 
  let caclutconstantime=null
  let endservice= moment(timeData.end)
  let startservice=moment(timeData.start)
  const elapsedtime=endservice.diff(moment() , 'minute')
  setdurationTime(elapsedtime)
  if(endservice){
     realtime= setInterval(()=>{
  
      if (moment().isAfter(endservice)) {

        //console.log("after service time++", moment().isAfter(moment(endservice)))
        setdurationTime(1)
        setStartAcount(false)
      } else if (
        moment().isBefore(startservice)
      ) {
       // console.log("before service time++", moment().isBefore(moment(startservice)))
        //console.log("start ** time  ",startservice)
        setdurationTime(1)
        setStartAcount(false)
        
      } else if (
        moment().isBetween(startservice,endservice)
      ) {
        setStartAcount(true)
        //console.log("time is between servicce time",  elapsedtime )
      }
    }, 2000)
    return () => {
      clearInterval(realtime);
    };
    
  }
 
},[])

 
useEffect(()=>{
  settotallprice(babysetter.price)
 // calcluateTotalprice(hoursopt)
},[hoursopt])



useEffect(async () => {
  // await setItem.removeItem('BS:ReqExtratime')
  // await setItem.removeItem('BS:Extratime')
  console.log("startr check Payment staayus",props.route.params.paymentstatuse)

  //chick extrapaymentt pay if tru or false
  const EXTRAPAYMENT=await setItem.getItem('BS:EXTRAPAYMENT')
  const EXTRAPAYMENTDATA=await JSON.parse(EXTRAPAYMENT)
  const statusePayment=EXTRAPAYMENTDATA

  const validExtratime=await setItem.getItem('BS:Extratime')
  const validextraTime=await JSON.parse(validExtratime)

  const requestExtratime=await setItem.getItem('BS:ReqExtratime')
  const user = await setItem.getItem('BS:User');
  
  

  switch (statusePayment){
    case null :
        console.log("statuse is undefined or null")
        if(validextraTime===null){
          console.log("****Can't add extra time  data is null ")
        }else{
          console.log("data of extra time valed but statusePayment is not null ",validextraTime)
          console.log("data of extra time valed but statusePayment is not null ",validextraTime.plusehours)
          setExtraTimeValue(validextraTime.plusehours)
            EXTENDTIMEvLUE=validextraTime.plusehours
          setextraTime(true)
           
        }
      break;
    case  true:
      console.log(" ****add extra time data  is valied",validextraTime)
      setExtraTimeValue(validextraTime.plusehours)
      let EXTENDTIMEvLUE=validextraTime.plusehours
      setextraTime(true)
      increasHoursbyorder(props.route.params.data1,validextraTime.plusehours,validextraTime.price)
      await setItem.removeItem('BS:ReqExtratime')
      await setItem.removeItem('BS:EXTRAPAYMENT')
      sendNotif4()
      break;
    case  false:
      console.log(" ****add extra tag  is NOT cancel start remove asynstorag")
      await setItem.removeItem('BS:ReqExtratime')
      await setItem.removeItem('BS:Extratime')
      await setItem.removeItem('BS:EXTRAPAYMENT')
      Alert.alert("تنبيه","عملية الدفع ملغية")
      sendNotif5()
     break;
      
  }

  // const data={
  //       plusehours:totallhours,
  //       valid:true,
  //       start:new Date(),
  //       hours:totallhours
  
  //     }
      
  //     setExtraTimeValue(totallhours)
  //     console.log("price without fate 15%",totallprice)
  //     if(props.route.params.paymentstatuse===undefined){
  //       await setItem.removeItem('BS:ReqExtratime')
  //       console.log("statuse is undefined")
  //     }else if(props.route.params.paymentstatuse===true){
        

  //     }else{

  //     }
  //handeel with extra time after Pay
  //await setItem.removeItem('BS:ReqExtratime')
  // if (props.route.params.paymentstatuse) {
  //   // paymentstatuse updated, do somthing with `route.params.paymentstatuse`
  //   // For example, send the paymentstatuse to the server
  //   setextraTime(true)
  //   const data={
  //     plusehours:totallhours,
  //     valid:true,
  //     start:new Date(),
  //     hours:totallhours

  //   }
  //   console.log("test stat Payment",props.route.params.paymentstatuse)
  //   await setItem.setItem('BS:Extratime', JSON.stringify(data));
  //   Alert.alert("note","extra time add")
  //   increasHoursbyorder(babysetter,totallprice)
  //   setExtraTimeValue(totallhours)
  //   console.log("price without fate 15%",props.route.params.paymentstatuse)
  //   console.log("price without fate 15%",totallprice)
  // }else if(!props.route.params.paymentstatuse){
  //   console.log("  paymentstatuse +++ ccansel",totallprice)
  // } 

}, [props.route.params?.paymentstatuse]);



useEffect(()=>{

  realtime2 =  setInterval(()=>{
  var then = moment(babysetter.end).format("HH:mm:ss");
  var ss= moment(babysetter.end).diff( moment(), 'minute')

  // console.log("new deffrent timer == ",ss)
  // console.log("new deffrent timer == ",then)
  setTottalmint(ss)
 },2000)
 return () => {
  clearInterval(realtime2);
};
},[totalmin,elapsedTime])


const ENDDEXP=()=>{ 
      let endservice=moment(babysetter.end)
      if(moment().isAfter( moment(babysetter.end) )){
       // console.log("new day")
        endservice.add(1,'day')
        var elapsedTime= endservice.diff(moment() , 'minute')
        //console.log("reminig time to order DAY",(endTo-calc2))
        //console.log("reminig time to order expire",elapsedTime )
        setElapsedTime(elapsedTime)
      }else{
        var elapsedTime=  moment().diff(endservice , 'minute')
        //console.log("reminig time to order DAY",(endTo-calc2))
       // console.log("reminig time to order expire without neew day",elapsedTime )
        setElapsedTime(elapsedTime)
      }
     

      
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
          //increasHours(res.data.order)
           sendNotif()
          setItem.removeItem('BS:Extratime')
        })
          .finally(()=>setTimeout(() => {
            props.navigation.navigate('FinleScreeen',{data1:babysetter})}
            ,1000)
          ).catch((err)=>console.log('erorr: Service complet',err))
 
          
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
      ).catch((err)=>console.log('erorr: increase hours',err))

    }
   
      const paymentScreen=async()=>{
       
        setShowModal(false)
        //add extra time data befor payment
        
        
        // props.navigation.navigate('PaymentForm',{data1:babysetter,datainfo:{totallhours:totallhours,totallprice:totallprice}})
         const newData={
         ...babysetter,
          totalprice:totallprice ,
        }
        const paymentMethode='mada'
        //props.navigation.navigate('PaymentForm',{data1:newData})
        console.log("test total price to payment ",newData)
       // props.navigation.navigate('TelerPage',{data1:newData,extrastatuse:true}, )
      // props.navigation.navigate('PaymentForm',{data1:newData})  
       props.navigation.navigate('PaymentForm',paymentdata={data1:newData,extrastatuse:true})      
      }



  const increasHoursbyorder = async (babysetter,plusehours,price) => {
    //add extra hours to order
    
     const tootalgaine =  (Number(0.15)* Number(price) +Number(price) )
    // const totalhours = babysetter.totalhours + totallhours
    console.log("test h and p   extra Data total hors", plusehours, "--totl gaine:", tootalgaine)
    const token = await setItem.getItem('BS:Token');

    const newExtratime = {
      id: babysetter._id,
      setterID: babysetter.settterowner,
      gaine: tootalgaine,
      hours: plusehours
    } 
    console.log("test data change++++", newExtratime)
      api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`); 
      await api.patch(`${URL}/incrementsetterextrahoursr`,
     {
       id:babysetter._id,
       setterID:babysetter.settterowner,
       gaine:tootalgaine,
       hours:plusehours
     }).then((res)=>{
        console.log("order extra Data",res.data)
     }).finally(()=> console.log('increment did')
     ).catch((err)=>console.log('erorr:Incrementsetterextrahoursr',err))

  }

    
  const sendNotif= ()=>{
    
    const data={
        receiver:babysetter.settterowner,
        content:"لقد تم  انهاد فترة الحضانه من قبل الام",
        title:"تنبيه طلب ",
        orderid:babysetter.orderid,
        playerid:babysetter.setterplayerid
    }
    sendNotifcation(data)
    props.navigation.navigate('FinleScreeen',{data1:babysetter})
   }

     const sendNotif2= ()=>{
    
      const data={
          receiver:babysetter.settterowner,
          content:`لديك طلب تمديد ${totallhours} ساعه`,
          title:"تمديد طلب ",
          orderid:babysetter.orderid,
          playerid:babysetter.setterplayerid
      }
      sendNotifcation(data)
      console.log("test noti",data)
     }
     
     const sendNotif3= ()=>{
    
      const data={
          receiver:babysetter.settterowner,
          content:`لقد تم  الغاء تمديد فترة الحضانه من قبل الام`,
          title:"الغاء تمديد طلب ",
          orderid:babysetter.orderid,
          playerid:babysetter.setterplayerid
      }
      sendNotifcation(data)
      console.log("test noti",data)
     }
     
     const sendNotif4= ()=>{
    
      const data={
          receiver:props.route.params.data1.settterowner,
          content:`لقد تم  الدفع من قبل الام`,
          title:" تمديد طلب ",
          orderid:props.route.params.data1.orderid,
          playerid:props.route.params.data1.setterplayerid
      }
      sendNotifcation(data)
       
     }
     const sendNotif5= ()=>{
    
      const data={
          receiver:props.route.params.data1.settterowner,
          content:`لم يتم الدفع من قبل الام`,
          title:"الغاء تمديد طلب ",
          orderid:props.route.params.data1.orderid,
          playerid:props.route.params.data1.setterplayerid
      }
      sendNotifcation(data)
      
     }
     
     
 
     const calcluateTotalprice=(value,index)=>{
      const price =babysetter.price
      console.log("start+++++++++++",value,"and",price)
        //setHoursopt(value)
        switch (value){
          case  1 :
           if( price===''){
            return;
           }
               
              settotallprice(price*1)
              extendprice=price*1
              settotallhours(1)
              selectedSlot=index
               
  
              break;
          case 2:
           
              settotallprice(price * 2)
              extendprice=price * 2
              settotallhours(2)
              selectedSlot=index
              
           break;
          case 3:
              settotallprice(price * 3)
              extendprice=price * 3
              selectedSlot=index
              settotallhours(3)
  
           break;
           case 4:
              
              settotallprice(price * 4)
              extendprice=price * 4
              settotallhours(4)
              selectedSlot=index
             break;
        }
      }
         
     
    

   const  children = ({ remainingTime }) => {
   // console.log("remain---",durationTime)
    const hours = Math.floor(remainingTime / 3600)
    const minutes = Math.floor((durationTime /60))
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

const sendRequestExtraWork=async()=>{
  const ddd={
    orderId:babysetter._id,
    extraworkhours:totallhours
  }
  console.log("tets REQ MOther",ddd)
  const token = await setItem.getItem('BS:Token');
  api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
  const response=await api.patch(`${URL}/acceptedextraworkmother`,{
    orderId:babysetter._id,
    extraworkhours:totallhours
  }).then((res)=>{
    console.log("test extrawork Request",res.data)
  }).finally(()=>{
    setloding(false)
    setscreencasess(1) 
    sendNotif2()

  }).catch((err)=>{
    setloding(false)
    console.log("Erorr extraWork",err)
  })
}

const cheackAccspete=async()=>{
  const  orderId= babysetter._id===undefined? props.route.params.data1._id:babysetter._id
  chektimer=setInterval(async()=>{
  const token = await setItem.getItem('BS:Token');
    api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
    console.log("tets Token" ,token)
    const response=await api.get(`acceptedextraworkmother/${orderId}`).then((res)=>{
      console.log("tets response of acceptted",res.data)
      if(res.data.status===true){
        //start show witing screen for accspeted babayseteer
        console.log("setter is Accsepted ++++++",res.data.status)
        setscreencasess(4)
        setShowModal(true)
        clearInterval(chektimer)
      }
    }).catch((err)=>{
      console.log("Erorr from cheackAccspete ",err)
    })

  },15000)
 
}
const handelExpandScreen=async(val)=>{
if (val===1){
  setloding(true)
  sendRequestExtraWork().then(async( )=>{
    cheackAccspete()
    const data2={status:true,totprice:totallprice,tothours:totallhours}
    const data={
      plusehours:totallhours,
      valid:true,
      start:new Date(),
      hours:totallhours,
      price:totallprice
    }
    await setItem.setItem('BS:ReqExtratime',JSON.stringify(data2))
    await setItem.setItem('BS:Extratime',JSON.stringify(data))
   
  })}

  if (val===3){
    setShowModal(false)
   }

   if (val===4){
    setShowModal(false)
   }

}
const canselexpandExtraTime=async()=>{
  //cansel witting 
  await setItem.removeItem('BS:ReqExtratime')
  console.log("test ID-- after reQ",babysetter._id)
  const token = await setItem.getItem('BS:Token');
  api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);

  const response=await api.patch(`${URL}/canselextraworkmother`,{
    orderId:babysetter._id,
    extraworkhours:0
  }).then((res)=>{
    console.log("test cansel extrawork Request",res.data)
  }).finally(()=>{
    setloding(false)
    setscreencasess(0)
    setShowModal(false)
    sendNotif3()

  }).catch((err)=>{
    setloding(false)
    console.log("Erorr extraWork",err)
  })
}


return(
    <View style={{backgroundColor:Colors.AminabackgroundColor ,alignItems:'center',flex:1 }}>
       
         
    <Box backgroundColor={Colors.white}  w={Metrics.WIDTH*0.900}  height={heightPixel(166)} flexDirection={'column'}
         mt={ Platform.OS==='android'?66:100} mb={3} mr="1" ml="1"    >
            
        <VStack justifyContent='space-around' flexDirection={'row'} mt={2} backgroundColor={'white'} w={Metrics.WIDTH*0.8990}    >
            <HStack flexDirection={'row'} alignItems='center'  ml={5}  >
                <Image  source={{ uri: `${URL}/users/${babysetter.settterowner}/avatar`}} resizeMode='stretch' 
                  style={{width: widthPixel(70), height:heightPixel(70),marginLeft:5,marginRight:7,borderRadius:10}} />
                 
                <Box mr={10} width={widthPixel(150)} justifyContent='space-around'  alignItems='flex-start'>
                  <Stack>
                    <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16)}    mt="3">{babysetter.settername}</Text>
                    {/* <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} fontSize={14} fontWeight='300'>{babysetter.serviestype}</Text> */}
                  </Stack>
                  <Stack flexDirection={'row'}  width={widthPixel(150)}   alignItems='baseline'   justifyContent='space-around' mt={3}>
                    <Stack flexDirection={'row'} justifyContent='space-around'>
                      <Image source={Images.clock} resizeMode='contain' style={{height:heightPixel(18),width:widthPixel(18)}} />
                      <Text fontSize={fontPixel(14)} fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} color={Colors.newTextClr} >{moment(babysetter.start).format("hh:mm a")}</Text>
                    </Stack>
                    <Stack flexDirection={'row'} justifyContent='space-around'>
                      <Image source={Images.clockred} resizeMode='contain' style={{height:heightPixel(18),width:widthPixel(18) }} />
                      <Text  fontSize={fontPixel(14)}fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular}>{moment(babysetter.end).format("hh:mm a")}</Text>
                    </Stack>
                  </Stack>
                </Box>
            </HStack>
            {extrTime&&
                  <Stack alignSelf="center" position={'absolute'} left={10} top={10}   backgroundColor={'error.500'} rounded='xl' padding={1}> 
                              <Text fontSize={18} color={Colors.white} > + {extrTimeValue}</Text>
                  </Stack>
            }
            <Spacer />
             
            <Box   flexDirection='row'  justifyContent={'center'} alignItems='center' w="33%" backgroundColor={Colors.white} > 
                <VStack mt={2}>
                 
              
                {/* <View style={{width:Metrics.WIDTH*0.3211,backgroundColor:Colors.transparent }}>
                  <CountdownTimer targetDate={moment(babysetter.end).valueOf()}   />
                </View> */}
                   
                </VStack>
                
                <Box mt={2}  >
                  {StartAcount?
                    <CountdownCircleTimer
                    isPlaying={true}
                    //initialRemainingTime={intialTime}
                    duration={durationTime*60}
                    colors={['#00Abb9', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[500, 100, 50, 10]}
                    size={50}
                    strokeWidth={4}
                      >
                      {/* {children} */}
                      {({ remainingTime }) =><Text color={Colors.AminaButtonNew} >{Math.floor(remainingTime/60) }</Text> }
                </CountdownCircleTimer>:
                  
                  <AntDesign name="smileo" size={33} color={Colors.TexTPink} onPress={()=> console.log(extrTimeValue) } />}
                  
                
                </Box> 
                 
            </Box> 
        </VStack>
                
        {/* <HStack flexDirection={'row'} alignItems="center" background={"#ddf1f4"} justifyContent='space-around'
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
                
                  
                
        </HStack> */}
        
      <Center flexDirection={'row'} h={"16"}>
        <Box alignItems={'center'}  w={Metrics.WIDTH * 0.461} ml='3' mr='4'   >
          {/* <Button bgColor={Colors.AminaButtonNew} size={'lg'} mb='1.5' w='full'
                        onPress={() =>   setShowModal(true) }> تمديد</Button> */}
          <CustomButton
            buttonColor={"#FCEBD2"}
            title="تمديد"
            titleColor={Colors.newTextClr}
            buttonStyle={{  disabled:true,width: '77%', alignSelf: 'center' ,borderRadius:10}}
            textStyle={{ fontSize: 15,}}
            disabled={extrTime}
            onPress={() => goToaddextraTime(babysetter.hours)}
          />
         
        </Box>
        <Box alignItems={'center'} w={Metrics.WIDTH * 0.401} ml='3' mr='4' mt={1}  >

          <CustomButton
            buttonColor={Colors.AminaPinkButton}
            title="انهاء وتقييم"
            buttonStyle={{ width: '77%', alignSelf: 'center' ,borderRadius:10}}
            titleColor={Colors.blacktxt}
            textStyle={{ fontSize: 15 }}
            onPress={() => serviceCompleate(babysetter._id)}
          />

        </Box>

      </Center>
    </Box>

   
    
    <Box h={ Platform.OS==="android"?"70%" : "68%" } backgroundColor={Colors.transparent} borderTopRadius={20} >
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
  backgroundColor={Colors.transparent}  borderColor={"#a3a2a2"} opacity={1} borderRadius={'md'}
  avoidKeyboard justifyContent="flex-end" bottom="2">
    <Modal.Content width={Metrics.WIDTH } h={ screencasses===4? Metrics.HEIGHT * 0.471: Metrics.HEIGHT * 0.422} backgroundColor='white' >
        {screencasses===0&&
          <TimeSlots clcprice={calcluateTotalprice} slctslots={selectedSlot} total={totallprice} handelscreens={(val)=>handelExpandScreen(val)} /> }
        {screencasses===1&&
           <Counterscreen handelscreens={(val)=>handelExpandScreen(val)} />}
        {screencasses===4&&
          <ResultScreen goPayemnet={(val)=>paymentScreen(val)} canselextratime={()=>canselexpandExtraTime()} />

        }
      
    
    </Modal.Content>
    

</Modal>


</Center>
    </View>
)
}
export default WorkScreen;


