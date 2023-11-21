import React,{useEffect,useState,useRef} from 'react';
import {View,Image, TouchableOpacity, Alert, Platform} from 'react-native'
import {FlatList,Box,Heading,Avatar,Text,VStack,HStack,Spacer, Button,Spinner,Modal,Center, Stack, CloseIcon} from 'native-base';
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
import sendbyWhats from '../services/utils/whatsup';
import CountdownTimer from '../workscreen/CountdownTimer';
  import CountDownTimer from  './counttim'
  import appsFlyer from 'react-native-appsflyer';
  
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
    const[timeWating,setTimeWating]=useState(5000)
    const socket = io(URL_ws,{
    transports: ["websocket"],
    jsonp: false
   })
    
 
   const[timeservicce,settimservice]=useState(0)
   const[orderExp,setorderExp]=useState(false)
   // Timer References
  const refTimer = useRef();

  // For keeping a track on the Timer
  const [timerEnd, setTimerEnd] = useState(false);

  const sendEvent=(orderID,babysettername)=>{
    const eventName = 'af_add_payment_info';
      const eventValues = {
        af_order_id: orderID,
        af_num_adults:babysettername
      };

      appsFlyer.logEvent(
        eventName,
        eventValues,
        (res) => {
          console.log("Send to cart evvvent",res);
        },
        (err) => {
          console.error("Errorr=>cart evvvent",err);
        }
      );

  }

  
  const timerCallbackFunc = async(timerFlag) => {
    // Setting timer flag to finished
    console.log("tesst remain time,time" ,timerFlag)
    setTimerEnd(timerFlag);
    
    Alert.alert("time was  end ")
    console.warn(
      'You can alert the user by letting him know that Timer is out.',
    );
    await setItem.removeItem('@SERVICETIME')
  };

    useEffect(async()=>{
      //  await setItem.removeItem('@SERVICETIME')
        timeAccsspetOrder()
        //get Mother Profile
        setbabyseters(JSON.parse(props.route.params.data1))
        setChld(JSON.parse(props.route.params.data1))
        
        const token = await setItem.getItem('BS:Token');
        api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
        const response= await api.get("/mothers/me").then((res)=>{
            console.log("MaMMMMM", res.data)
            return res.data
        }).catch((err)=>{
            console.log("Erorr",err)
            Alert.alert("تنبيه","غير قادر على جلب  بينات البروفايل")
        })
       
        setMother(response)
        
    },[])


    useEffect(()=>{
        const data= JSON.parse(props.route.params.data1)
        const chikeRequestStuse=props.route.params.val
        console.log("cheak is run ",data)
        if(chikeRequestStuse==='chike'){
            console.log("cheak is run ")
            setTimeWating(2000)
            setNewData(data)
            SETOK(true)
            setchangeScreen(true)
        }
        //if not came from request screeen wating time is 5000
       
      },[])
  

    useEffect(()=>{
       
      //  console.log("===-=",chld.childe)
       setLoding(true)
    },[babseters,chld])



    useEffect(()=>{
        console.log("start  lissting ",timeWating);
         if(OK){
            handelREQ(newData._id)
            setmessageExpirationTimeMS(timeWating)
         }
         return () => clearInterval(interval);
    },[OK])

const handelREQ= async(id)=>{ 
    const user = await setItem.getItem('BS:User');
    const token = await setItem.getItem('BS:Token');

    interval = setInterval(async() => {
        
        api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
        const response= await  api.post(`${URL}/serchorders`,{
         orderID:id
       }).then((res)=>{
         console.log("check babysetter order",id)
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

      }, timeWating);

    // setTimeout(
    //     () => {
    //       console.log("setTimeout==",id)
    //     },
    //     messageExpirationTimeMS,
    //   );
    }
    

    const disconnect=()=> {
        canselorderbymother()
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
    const appname="تطبيق أمينة"
    const  orderId=babseters.orderid
    const location= await setItem.getItem('BS:Location')
    const token = await setItem.getItem('BS:Token');
    const motherData = await setItem.getItem('BS:User');
    const coordinates=JSON.parse(location)
    const motherdata2=JSON.parse(motherData)
    const motherName=motherprofile.mother.name
    const motherDisplayName=motherprofile.mother.displayname
    const mothernames=`${motherName} ${motherDisplayName}`
    const motherPhone=motherprofile.mother.phone
   // const motherPhone=motherdata2.phone
   //stor time of END reservition 
   const timeRes=moment(new Date)
   const extratime1= moment(timeRes)
   await setItem.setItem('@SERVICETIME',extratime1).then(()=>{
    console.log("start store Reserviton Time",extratime1)
    setorderExp(false)
   })
   

    //   console.log("test price",babseters.totalprice ,"hours",babseters.hours )
    //   console.log("test phon",motherPhone,"mothe n",mothernames)
    api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    await api.post("/mother/order",{
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
        opetion3:babseters.setterphone,
        address:coordinates.formatted,
        statuse:"processing",
        reson:"",
        read:false,
        start:babseters.start,
        end:babseters.end,
        starttime:babseters.starttime,
        endtime:babseters.endtime,
        potementdate:babseters.potementdate,
        settterfaileid:babseters.settterfaileid,
        price:babseters.price,
        hours:babseters.hours,
        totalprice: babseters.totalprice ,
        totalhours:babseters.totalhours,
        selectType:babseters.selectType,
        selectname:babseters.selectname,
        workday:babseters.workday,
        endPriceOnday:babseters.endPriceOnday,
        rreservioninfo:babseters.rreservioninfo,
        accompany:babseters.accompany,
        motherplayerid:babseters.motherplayerid,
        setterplayerid:babseters.setterplayerid,
    }).then((res)=>{
       
        setNewData(res.data)
        SETOK(true)
        
        setchangeScreen(true)
        sendNotif(babseters.orderid)
        sendEvent(babseters.orderid,babseters.displayname)
        //send to babysetter whatsup
        const Bodytext=`عزيزتي مستخدم {{1}} لديك تحديثات على طلبك {{2}}`
        const Tomobaile=`+${babseters.setterphone}`
        const FromMobaile = "whatsapp:+15076390092"
        sendbyWhats(Bodytext,Tomobaile,FromMobaile,appname,orderId)
        
    }).catch(err=> console.log("Erorr:",err ))
    
   }    
   
// const sendbyWhats = async () => {
    
//     console.log("tewts whats",Tomobaile,"and phon to",FromMobaile)

//     await whatapi.post(`/whatsapptemplate`,{
//         Body:Bodytext,
//         From:Tomobaile,
//         To:FromMobaile
//     }).then((res) => {
//       console.log("test response from whats",res.data)
//     })
//     .catch((err) => { console.log("ERORR", err) })
    
// }
   
   
   const canselRequest = async () => {
        const orderId = (newData._id).toString()
       
        await api.delete(`/mother/order/${orderId}`).then((res) => {
            SETOK(false)
        }).finally(() => sendNotifCansel())
            .catch((err) => { console.log("ERORR", err) })
        setShowModal(false)
        clearInterval(interval); 
    }

    const addResonAutomatic = async ( ) => {
       
       const value="تم الالغاء من قبل الام لعدم الدفع"
       const user = await setItem.getItem('BS:User');
       const token = await setItem.getItem('BS:Token');
       const orderId = (newData._id).toString()
       api.defaults.headers.Authorization = (`Bearer ${JSON.parse(token)}`);
        await api.post("setterorderresone", {
           reson: value, orderID: orderId
       }).then((res) => {
           console.log("add reson for cansel ", res.data)
           
       }).finally(() => canselorderbymother()).catch((err) => console.log("ERORR from reson post", err))
   }
    const canselorderbymother = async () => {
        const token = await setItem.getItem('BS:Token');
        const orderId =  (newData._id).toString()
        api.defaults.headers.Authorization = (`Bearer ${JSON.parse(token)}`);
         await api.post("setterordercansel", {
            orderID: orderId
        }).then((res) => {
            console.log('  order canceled response', res.data)
            SETOK(false)
        }).finally(() =>  sendNotifCansel() ).
        catch((err) => console.log("ERORR from reson post", err))
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
    const data={
        receiver:babseters.settterowner,
        content:"لقد تم اضافة طلب جديد",
        title:"طلب جديد",
        orderid:babseters.orderid,
        playerid:babseters.setterplayerid
    }
     
    sendNotifcation(data)
   }

   const sendNotifCansel= ()=>{
    
    const data={
        receiver:babseters.settterowner,
        content:"لقد تم الغاء الطلب من الام",
        title:"طلب ملغا",
        orderid:babseters.orderid,
        playerid:babseters.setterplayerid
    }
    
    sendNotifcation(data)
   }

   const  children = ({ remainingTime }) => {
    // console.log("remain---",remainingTime)
     const hours = Math.floor(remainingTime / 3600)
     const minutes = Math.floor((remainingTime ) / 60)
    // const minutes = Math.floor((remainingTime ))
    // const seconds = remainingTime % 60
   
     return <Text fontSize={12} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} >{hours}ساعات</Text>
   }

   
   const ReturnToHomescreen=()=>{
   
    addResonAutomatic().then(()=>{
        props.navigation.popToTop()
    }).finally(()=> setShowModal(false) ).catch((err)=>{
        console.log("Erorr cant cansel this order from ReturnToHomescreen",err)
        setTimeout(()=>{
            props.navigation.popToTop()
        },1500)
       
       
    })
   
   }
  const replacer=()=>{
    const address=babseters.address
    const finalAddress=address.replace("saudi Arabia","")
  }
  const timeAccsspetOrder= async()=>{
    const EndServ= await setItem.getItem("@SERVICETIME")
    const extratime1=   moment(EndServ).add(6,'hours')
    
    if (EndServ ===null){
        console.log("value of endServ null")
        setorderExp(true)
        return ;
    }else if(moment(extratime1).isBefore(moment(new Date))){
        var testtime=moment(extratime1  ).isBefore(moment(new Date),'seconds')
        console.log("value of endServ less 1  sec",testtime)
       setorderExp(true)
       await setItem.removeItem('@SERVICETIME')
       return ;
    }
    
    const timenow=moment(new Date) 
    const resultH=moment(extratime1).diff(timenow,'hours')
    const resultM=moment(timenow).diff(extratime1,'minutes')
    const resultS=moment(timenow).diff(extratime1,'seconds') 
     //const val2=moment(result).format("hh:mm:ss")
     //const valToform=moment(val).format('hh:mm:ss')
     let diff = extratime1.diff(timenow);
        const diiff2=moment.duration(diff).as('seconds')
    
     

    //  const timeRes=moment(new Date)
    //  const extratime1=   moment(timeRes).add(3,'hours')
     
     //console.log("222--old", EndServ)
     settimservice( parseInt(diiff2))
    
  }
  
    return(

    < Box mt={Platform.OS==='android'?60:100} backgroundColor={Colors.AminabackgroundColor} flex={1}> 
   <Box borderColor={'gray.100'} backgroundColor='white' borderWidth='1' flexDirection={'column'} 
         borderRadius={50} shadow={'8'} justifyContent='space-around' mt='8' mb={'6'} ml='3' p={'4'} w={Metrics.WIDTH*0.928} height={Metrics.HEIGHT*0.414} >
            
        {/* <Box alignItems={'center'} justifyContent={'center'}   flexDirection={'row'}>
            <Stack flexDirection={'row'} justifyContent='flex-start'   >
                <Image source={Images.girl} style={{width:widthPixel(18),height:heightPixel(22)}} resizeMode='contain'/>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={Platform.OS==="android"?"600":"700"} fontSize={fontPixel(18)}  ml={3}  > {babseters.settername}</Text>
            </Stack>   
            <Stack   flex={2} justifyContent='flex-end' flexDirection={'row'}>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontWeight={Platform.OS==="android"?"600":"700"} fontSize={fontPixel(16)} color={Colors.newTextClr}>رقم الطلب</Text>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontWeight={Platform.OS==="android"?"600":"700"} fontSize={fontPixel(16)} color={Colors.newTextClr} ml={2} >{babseters.orderid}</Text>
            </Stack>
        </Box> */}
        <Box flexDirection={'row'} alignItems='flex-start' mt={'2'}>
            <Stack flexDirection={'row'} justifyContent='flex-start'  flex={1} >
                <Image source={Images.greenbabyface} style={{width:widthPixel(22),height:heightPixel(22)}} resizeMode='contain'/>
            <Stack>
            <Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontWeight={Platform.OS==="android"?"600":"700"} fontSize={fontPixel(18)} color={Colors.newTextClr}  ml={3}>{babseters.childeaccount}طفل</Text>
            </Stack>
                
            </Stack> 
        </Box>
        <Box flexDirection={'row'} alignItems='flex-start' mt={'2'}>
            <Stack flexDirection={'row'} justifyContent='flex-start'  flex={1} >
                <Image source={Images.cardname} style={{width:widthPixel(22),height:heightPixel(22)}} resizeMode='contain'/>
            <Stack>
                {loading ?<Box flexDirection={'row'} >
                {chld.childe.map((item,index)=>{
                    return(
                    <Box key={item._id} flexDirection='row' justifyContent={'space-around'}>
                         {index >=1 && <Text> - </Text>}
                            <Text  fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontWeight={Platform.OS==="android"?"600":"700"} fontSize={fontPixel(18)} color={Colors.newTextClr}  ml={3}> {item.name} </Text>
                            </Box>
                    )
                })  }
                
                </Box>:null }
            </Stack>
             
            </Stack> 
        </Box>
        
        <Box flexDirection={'row'} alignItems='flex-start' mt={'2'}  >
            <Stack flexDirection={'row'} justifyContent='flex-start'  flex={1} >
                <Image source={Images.greenclander} style={{width:widthPixel(22),height:heightPixel(22)}} resizeMode='contain'/>
            <Stack flexDirection={'row'}>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontWeight={Platform.OS==="android"?"600":"700"} fontSize={fontPixel(18)} color={Colors.newTextClr}  ml={"3"}> {moment(babseters.start).format('LL')}</Text>
                {babseters.selectname!="يومي"&&<Box flexDirection={'row'} alignItems={'baseline'}><Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontWeight={Platform.OS==="android"?"600":"700"} fontSize={fontPixel(18)} color={Colors.newTextClr} ml={"3"} > الى </Text>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontWeight={Platform.OS==="android"?"600":"700"} fontSize={fontPixel(18)} color={Colors.newTextClr} ml={'3'} > {moment(babseters.end).format('LL')}</Text>
                    </Box>}
            </Stack>
            </Stack> 
        </Box>
        <Box flexDirection={'row'} alignItems='flex-start' mt={'2'}  >
            <Stack flexDirection={'row'} justifyContent='flex-start'  flex={1} >
                <Image source={Images.greenclock} style={{width:widthPixel(22),height:heightPixel(22)}} resizeMode='contain'/>
            <Stack>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontWeight={Platform.OS==="android"?"600":"700"} fontSize={fontPixel(18)} color={Colors.newTextClr}  ml={3}>{moment(babseters.starttime).format('hh:mm a')} الى{moment(babseters.endtime).format('hh:mm a')}</Text>
            </Stack>
            </Stack>
        
        </Box>

        
        
        <Box flexDirection={'row'} alignItems='flex-start' mt={'2'}>
            <Stack flexDirection={'row'} justifyContent='flex-start'  flex={1} >
                <Image source={Images.calender} style={{width:widthPixel(22),height:heightPixel(22)}} resizeMode='contain'/>
            <Stack>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontWeight={Platform.OS==="android"?"600":"700"} fontSize={fontPixel(16)} color={ Colors.newTextClr}  ml={3}t> عدد ايام الحجز {babseters.workday} ايام</Text>
                {/* <Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontWeight={Platform.OS==="android"?"600":"700"} fontSize={fontPixel(16)} color={ Colors.newTextClr}  ml={3}>{babseters.address}</Text> */}
            </Stack>
             
            </Stack> 
        </Box>
        {/* <Box alignItems={'flex-start'} mt={'2'}>
             {babseters.selectType&&<Stack>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontWeight={Platform.OS==="android"?"600":"700"} fontSize={fontPixel(12)} color={ Colors.red}  ml={3}>الحجز شامل ايام العطل</Text>
            </Stack>  } 
        </Box> */}
        <Box>
            <Stack alignItems={'center'} flexDirection={'row'} >
                    <Image source={Images.greenmoney} style={{width:widthPixel(22),height:heightPixel(22)}} resizeMode='contain'/>
                <Stack>
                    <Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontWeight={Platform.OS==="android"?"600":"700"} fontSize={fontPixel(16)} color={Colors.newTextClr}  ml={3}>{babseters.price} ريال</Text>
                </Stack>
            </Stack>   
        </Box>

        <Box alignItems={'center'} mt={'2'} mb={1}>
            <Stack borderTopColor={'light.100'} borderWidth={1} width={widthPixel(314)} mt={2} />
        </Box>
        
        <Box flexDirection={'column'} alignItems='flex-start'    mt={2}>
            <Stack flexDirection={'column'} justifyContent='flex-start'    >
                <Stack alignItems={'center'} flexDirection={'row'} >
                    <Image source={Images.greenmonies} style={{width:widthPixel(22),height:heightPixel(22)}} resizeMode='contain'/>
                    <Stack justifyContent={'space-between'} flexDirection={'row'}>
                        <Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontWeight={Platform.OS==="android"?"600":"700"} fontSize={fontPixel(16)} color={Colors.newTextClr}  ml={3}>المبلغ</Text>
                        <Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontWeight={Platform.OS==="android"?"600":"700"} fontSize={fontPixel(16)} color={Colors.newTextClr}  ml={3}>{babseters.totalprice} ريال</Text>
                    </Stack>
                </Stack>   
            </Stack> 
            <Stack flexDirection={'row'} justifyContent={'space-around'} mt={"3"} >
                <Stack>
                    <Image source={Images.moneylistgreen} style={{width:widthPixel(22),height:heightPixel(22)}} resizeMode='contain'/>
                </Stack>
                <Stack flexDirection={'row'}>
                    <Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontWeight={Platform.OS==="android"?"600":"700"} fontSize={fontPixel(16)} color={Colors.newTextClr}  ml={3}>اجمالي قيمة الحجز</Text>
                    <Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontWeight={Platform.OS==="android"?"600":"700"} fontSize={fontPixel(16)} color={Colors.newTextClr}  ml={3}>{Number(babseters.totalprice/100)*(15) +Number(babseters.totalprice)} ريال </Text>
                </Stack>
            </Stack>
        </Box>
        </Box>

        <VStack alignItems={'center'}>
            {OK?
            <Center>
                <Box flexDirection={'row'} alignItems='flex-start' mt={'4'}>
                    <Stack flexDirection={'row'} justifyContent='center' alignItems={'center'} width={'80'} height={'8'} backgroundColor={Colors.infotextbackground} borderRadius={'lg'} >
                          {!orderExp?
                          <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={Platform.OS==="android"?"600":"700"} fontSize={fontPixel(16)} textAlign='center' color={Colors.newTextClr}  ml={3}>تم ارسال الطلب وفي انتظار قبول الحاضنة</Text>:
                          <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={Platform.OS==="android"?"600":"700"} fontSize={fontPixel(16)} textAlign='center' color={Colors.newTextClr}  ml={3}>عذرا  تم تجاوز وقت قبول الطلب من الحاضنه</Text>
                          }  
                    </Stack> 
                </Box>
                <Box flexDirection={'row'} alignItems='flex-start' mt={'4'}>
                    <Stack   flexDirection={'row'} justifyContent='center' alignItems={'center'} width={'80'}  >
                    {!orderExp? <Text flexWrap={'wrap'} fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontSize={fontPixel(16)} textAlign='center' color={Colors.newTextClr} fontWeight={'700'}  ml={3}> في حال لم يتم الموافقة  خلال ٦ ساعات  سيتم الغاءالطلب </Text>:
                        <Box>
                            <Button variant={'subtle'}  backgroundColor={"#6BB05A"}shadow={'2'} size={'xs'} borderRadius={'lg'} onPress={() =>props.navigation.navigate('Home') }>
                            <Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontSize={fontPixel(16)} textAlign='center' color={Colors.white} fontWeight={'700'} >الرجاء التوجة الى الصفحة  الرئيسية والبحث عن حاضنة</Text></Button>
                    </Box>}
                    </Stack> 
                </Box>
                    
                <Box mt={4}>
                    {timeservicce >= 1&&
                    <CountDownTimer
                    ref={refTimer}
                    timestamp={timeservicce}
                    //timestamp={timeservicce}
                    //timestamp={timeservicce}
                    timerCallback={timerCallbackFunc}
                    
                    containerStyle={{
                        height: Metrics.HEIGHT*0.054191,
                        width: Metrics.WIDTH*0.7211,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 35,
                        backgroundColor: Colors.gray,
                    }}
                    textStyle={{
                        fontSize: 28    ,
                        color: Colors.newTextClr,
                        fontWeight: "bold",
                        fontFamily:Fonts.type.bold,
                        letterSpacing: 2,
                    }}
                    />}
                     </Box>
            </Center>
            :
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
                
                </Center>
            }
        </VStack>

        <Center>
            <Modal isOpen={showModal}   onClose={() => setShowModal(!showModal)}  
                backgroundColor={Colors.transparent}  borderColor={"#a3a2a2"} opacity={1} 
                  justifyContent="flex-end" bottom="2" >
                   
                <Modal.Content backgroundColor={'white'}  width={Metrics.WIDTH}  height={Metrics.HEIGHT*0.4833}  justifyContent='center' alignItems='center'>
                
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

