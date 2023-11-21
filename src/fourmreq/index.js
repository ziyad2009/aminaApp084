import React, { useState, useEffect } from 'react';
import {View,TouchableOpacity,Platform,ScrollView,Image, Alert,StatusBar} from 'react-native';
import {Spinner,Text,VStack,HStack,Spacer,FlatList,Button,Checkbox, Input,Box,Icon,Modal,Center,Radio,Stack, KeyboardAvoidingView, Heading} from 'native-base'
import styles from './styles'
import api from '../services/api';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/Feather'
import DateTimePicker from '@react-native-community/datetimepicker';
import timeslots from './timeslots';
import { Colors ,Metrics, Fonts,Images,fontPixel,pixelSizeHorizontal,pixelSizeVertical,widthPixel,heightPixel} from '../assets/Themes/';
import moment from 'moment';
import {URL_ws,URL} from '../services/links';
import setItem from '../services/storage/'
import 'moment/locale/ar-sa';
import { Rating,AirbnbRating } from 'react-native-ratings';
import images from '../assets/Themes/Images';
import CustomButton from '../services/buttons/buttton';
 
import DatePicker from 'react-native-date-picker';
import OutlaintButton from '../services/buttons/buttonsOutlain';
import AnimatedLoader from 'react-native-animated-loader';

let MOTHERARRAY=[]
let HOURSWORK=0
let slctslots=0
let childrensArray=[]

const Fourm1=(props)=>{

    const [loading, setloding] = useState(false);
    const [subservice, setsubservice] = useState([]);
    const [select, setselect] = useState(1)
    const [serviestype, setserviestype] = React.useState("حاضنة");
    const [mainservice, setmainservice] = React.useState("");
    const [location, setlocation] = useState('')
    const [babsetersData, setbabysetterData] = useState([])
    const [like, setlike] = useState(false)

    const [timePicker, setTimePicker] = useState(false);
    const [timePicker2, setTimePicker2] = useState(false);
    // const [time, setTime] = useState(new Date(Date.now()));
    const [time, setTime] = useState(new Date())
    const [time2, setTime2] = useState(new Date(Date.now()));
    const [datePicker, setDatePicker] = useState(false);
    const [date, setDate] = useState(null);
    const [date2, setDate2] =useState(null);
    const [workday, setworkday] = useState(0);
    const [totalTimework, settotalTimework] = useState(0);
    const [endPriceOnday, setendPriceOnday] = useState(0);
    const [endFullprrice, setendFullprrice] = useState(0);
    const [selectType, setselectType] = useState(false);
    const [selectname, setselectname] = useState('');
    

    const [totalInminuts, settotalInminuts] = useState(0)
    const [reservion, setReservion] = useState("")

    const [ResWay, setResWay] = useState(1)


    const [showModal, setShowModal] = useState(false);
    const [childeArray, settChiledArray] = useState([])

    const [motherch, setmothersh] = useState([])

    const [date4, setDate4] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)

    const [resevButton, setresevButton] = useState(false)
    const [hourswork, sethourswork] = useState(false)
    const[visible,setvisible]=useState(false)
 
  


    //Clender

    const onDateSelected = ((event, value) => {
        //     const inputDate = selectedDate.toISOString();
        //     const outputDate = inputDate.split('T')[0];
        //    //setSelectedDate(outputDate);
        //     setDate(selectedDate);
        //     console.log("outputDate",outputDate)

        if (Platform.OS === 'ios') {
            return setDate(value), setDatePicker(!datePicker);
        }
        setDatePicker(!datePicker);
        setDate(value);
        // if (event?.type === 'dismissed') {
        //     console.log("ddessmes DATE")
        //     //setDatePicker(false);
        //     }else if 
        //     (event?.type === 'set'){
        //         console.log("SET DATE",value)
        //         setDate(value);
        //         //setDatePicker(false);
        // }

    })



    const modelShow = () => {
        setShowModal(false)
        //console.log("time1",moment(time1).format('HH:MM a'))
    }
    const showClenderrIcon=()=>{
        setTimeout(()=>{
            setvisible(true)
        },1000)
    }
    const hideClenderrIcon=()=>{
        setTimeout(()=>{
            setvisible(false)
        },2000)
    }

    useEffect(() => {
        setDatePicker(false);
    }, [date]);

    //   useEffect(() => {
    //     setTimePicker(false);
    //   }, [time]);

    //   useEffect(() => {
    //     setTimePicker2(false);
    //   }, [time2]);
    //clender

    useEffect(() => props.navigation.addListener('beforeRemove', (e) => {
        console.log("not hony back")
    }),
        [props.navigation]
    );


    const handleSelection = (id, title) => {
        setselect(id)
        console.log("test title ", title.services)
        setserviestype(title.services)
    }

     
    const Item = ({title,i}) => { 
        //console.log("test section item ",title)
       return( 
            <TouchableOpacity style={{flexDirection:'column' , marginLeft:1,justifyContent:'space-around',width:Metrics.WIDTH*0.313,  }} 
             key={title._d} onPress={()=>handleSelection(i,title)}>
                
                <View style={{alignItems:'center',paddingTop:15,paddingBottom:5}} > 
                    <Text color={ i===select?Colors.Milky:Colors.white}   fontSize={12}
                          fontFamily={ i===select? Fonts.type.bold:Fonts.type.light} >
                            {title.services}
                    </Text>
                </View>
                <View style={{alignItems:'center',paddingBottom:5,borderBottomColor:i===select?"#000000":null,borderBottomWidth:i===select?1:null}}>
                    <Text  color={i===select?Colors.Milky:Colors.white} fontWeight='600' fontSize={10}
                        fontFamily={ i===select? Fonts.type.bold:Fonts.type.light}>
                            {title.descripton}
                        </Text>
                
                </View> 
            </TouchableOpacity>
        
      );
    }

    const BabyseterProfile=()=>{
        return(
            <Box flex={1} backgroundColor={Colors.white} width={Platform.OS === 'android' ? widthPixel(300) : widthPixel(360)} marginLeft={'5'} marginTop={2}      >
                <Box borderColor={Colors.white} borderWidth={1} borderRadius={15}
                    paddingBottom={2} flexDirection={'row'}
                    width={Platform.OS === 'android' ? widthPixel(300) : widthPixel(371)} backgroundColor={Colors.white} >
                    <Box>
                        <Image source={{ uri: `${URL}/users/${babsetersData.owner}/avatar` }} resizeMode='contain' style={{
                            height: heightPixel(109), width: widthPixel(109),
                            marginTop: pixelSizeVertical(6), marginRight: pixelSizeHorizontal(10), borderRadius: 10
                        }} />
                    </Box>

                    <Box flexDirection={'column'} width={widthPixel(228)} ml={'1'} marginTop={'1'} >
                        <Box flexDirection={'row'} justifyContent='space-between' alignItems={'baseline'} >
                            <Stack flexDirection={'row'} mt={1} ml={2} alignItems='baseline' width={widthPixel(220)} justifyContent='space-between' >
                                <Text fontFamily={Platform.OS === 'android' ? Fonts.type.aminafonts : Fonts.type.bold} fontSize={fontPixel(22)} color={Colors.newTextClr} >{babsetersData.displayname}</Text>
                                <Image source={Images.save} style={{ width: widthPixel(20), height: heightPixel(20) }} resizeMode='contain' />
                            </Stack>
                        </Box>

                        <Box flexDirection={'row'} justifyContent="space-between">
                            <Stack flexDirection={'row'} >
                                <Text fontFamil={Platform.OS === 'android' ? Fonts.type.light : Fonts.type.light} fontSize={fontPixel(12)} color={Colors.smolegrayColors} marginLeft={pixelSizeHorizontal(4)} >{babsetersData.mainservice ? babsetersData.mainservice : "-"}</Text>
                            </Stack>

                            <Stack position={'relative'} bottom={1} left={Platform.OS == 'android' ? 1 : 0} mt={2} >
                                <Text fontFamil={Platform.OS === 'android' ? Fonts.type.medium : Fonts.type.medium} fontSize={fontPixel(10)} color={Colors.rmadytext} marginLeft={pixelSizeHorizontal(2)}  >حفظ  </Text>
                            </Stack>
                        </Box>

                        <Box flexDirection={'row'} justifyContent="space-between" mt={1} >
                            <Stack width={60} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={Colors.pinkystack}>
                                <Text fontFamil={Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular} fontSize={fontPixel(10)} color={Colors.newTextClr}  >{babsetersData.price} ر.س/ساعة</Text>
                            </Stack>
                            <Stack width={60} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={Colors.yellowstack} flexDirection='row'>
                                <Text fontFamil={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontSize={fontPixel(10)} color={Colors.newTextClr} >{babsetersData.rate}</Text>
                                <Image source={Images.starticon} style={{ width: widthPixel(20), height: heightPixel(20) }} resizeMode='contain' />

                            </Stack>
                            <Stack width={60} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={Colors.pinkystack}>
                                {hourswork &&
                                    <Text fontFamil={Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular} fontSize={fontPixel(10)} color={Colors.newTextClr}>{HOURSWORK} ساعه عمل</Text>}

                            </Stack>
                        </Box>

                    </Box>


                </Box>
            </Box>

        )
        
    }


useEffect(async()=>{
   loadDate()
   getMotherChiled()
   getOrder()
   const location= await setItem.getItem('BS:Location') 
  if (!location){
    setlocation('...')
  }else{
    const  existLocation=JSON.parse(location)
    setlocation(existLocation.formatted)
  }
  
 
},[] )

useEffect(()=>{
    console.log("test chiled",childeArray.length)
},[childeArray])

    
useEffect(  () => {
    //try to refersh location if it change from user
    const unsubscribe = props.navigation.addListener('focus',async () => {
        console.log("test event")
        const location= await setItem.getItem('BS:Location') 
        if (!location){
            setlocation('عنوان المنزل')
            console.log("no location")

        }else{
          const  existLocation=JSON.parse(location)
          setlocation(existLocation.formatted)
         
        }
    });

    return unsubscribe;
  }, []);

    const loadDate = async () => {
        setloding(true)
        const {arrayHolder}=props.route.params
        setmainservice(arrayHolder.serviceNmae)
        console.log("result data from first load Date", arrayHolder)
        setbabysetterData(arrayHolder)
        //readWorkhours(props.route.params.data1.owner)
        setloding(false)
    }
    
    const getOrder=()=>{
        const {DataHolder}=props.route.params
       
        setTime(moment(DataHolder.timeStart))
        setTime2(moment(DataHolder.timeToEnd))
        setDate(moment(DataHolder.startService))
        setDate2(moment(DataHolder.endServvice))
        setselectType(DataHolder.selectType)
        setselectname(DataHolder.selectname)
        setworkday(DataHolder.workday)
        settotalTimework(DataHolder.totalTimework)
        setendPriceOnday(DataHolder.endPriceOnday)
        setendFullprrice(DataHolder.endFullprrice)
        
    }

    const readWorkhours = async (id) => {
        console.log("tttt",id)
        const response = await api.get(`allorderbysetterworkhours/${id}`).then((res) => {
        console.log(res.data[0].totalhours)
          HOURSWORK = res.data[0].totalhours

        }).finally(() => sethourswork(true)).catch((err) => {
        HOURSWORK = 0
        
        })
        return response
    }

  
    const confirmReservisionTime = () => {

        const startShiftTime = moment(time, 'DD-MM-YYYY hh:mm:ss');
        const endShiftTime = moment(time2, 'DD-MM-YYYY hh:mm:ss');
        if (startShiftTime.isAfter(endShiftTime)) {
            endShiftTime.add(1, 'days');
        }

        const duration = moment.duration(endShiftTime.diff(startShiftTime));

        // console.log('as hours: ' + duration.asHours(), 'as minutes: ' + duration.asMinutes());
        // console.log('hours: ' + duration.hours(), 'minutes: ' + duration.minutes());
        setReservion(`${duration.asHours()} and ${duration.asMinutes()}`)
        settotalInminuts(duration.asMinutes())

        const extraMinuts = Math.floor((duration % 3600) / 60)

        if (extraMinuts >= 1) {
            return Alert.alert("تنبيه", "يجب ان تكون الفتره فقط ساعات كامله من دون دقائق اضافية ")

        } else {
            modelShow()
        }

    }

    
    const getMotherChiled= async()=>{ 
        //get mother children data from backend
        const user = await setItem.getItem('BS:User');
        const token = await setItem.getItem('BS:Token');
        api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        const response =await api.get(`/mother/childe`).then((res)=>{
        return res.data
        })     
        setmothersh(response)
    }
 
    const addOrRemove = (item) => {
        
        const { _id, name } = item
        const exists = childeArray.includes(item)
        if (exists) {
            childrensArray = childeArray.filter(item => item.name !== name)
            console.log("test Item lenght",childeArray.length)
            return settChiledArray(childeArray.filter(item => item.name !== name))
        }
        else if (!exists) {
            childrensArray.push(item)
            const result = childeArray
            console.log("test Item lenght",childeArray.length)
            return result.push(item)
        }
       
    }

const ConfirmScreen=async()=>{
    const location= await setItem.getItem('BS:Location') 
    const coordinates=JSON.parse(location)
    if(coordinates===null){
        return Alert.alert("تنبيه","الرجاء تحديث عنوان موقع المنزل")
    }
    
        QiuqRREQUEST()

   }
  

    const Request = async () => {

        const token = await setItem.getItem('BS:Token');
        const location = await setItem.getItem('BS:Location')
        const playeridUUid = await setItem.getItem('@FCMTOKEN');

        const playerid =   playeridUUid
        const coordinates = JSON.parse(location)
        
        const timeresult = `${time} الى ${time}`
        if (totalTimework < 1 || childeArray.length < 1) {
            return Alert.alert("تنبيه", "الرجاء تحديد الاطفال او تحديد موعد الخدمة")
        }
       
        const requestData = {
            serviestype: mainservice==="حضانة منزلية"?"":serviestype,
            mainservice: mainservice,
            childe: childeArray,
            childeaccount: childeArray.length,
            time: timeresult,
            motherplayerid: playerid,
            statuse: "processing",
            reson: "",
            read: false,
            start: date,
            end: date2,
            StartTime:time,
            EndTime:time2,
            potementdate: date,
            hours: (totalTimework)*60,
            reservioninfo: reservion,
            workday:workday,
            totalTimework:totalTimework,
            endPriceOnday:endPriceOnday,
            endFullprrice:endFullprrice,
            selectType:selectType,
            selectname:selectname
              
             
              
            
        }
        //move to babyseters list screens
        //props.navigation.navigate('Babysetesrs', { setterdata: JSON.stringify(requestData) });


    }

    //quiq reservition
    const QiuqRREQUEST = async () => {
        const {DataHolder}=props.route.params
        console.log("Test DataHolder=>>",DataHolder)
        const token = await setItem.getItem('BS:Token');
        const location = await setItem.getItem('BS:Location')
        const playeridUUid = await setItem.getItem('@FCMTOKEN');
        const playerid = playeridUUid
        const coordinates = JSON.parse(location)
         
        const timeresult = `${time} to ${time}`

        const num = DataHolder.totalTimework;
        const hours = (num / 60);
       
        const minutes = (hours) * 60;
        console.log("test minutes=",minutes) 
        
        const totPrice = DataHolder.endFullprrice
        const securenumber = Math.floor(1000 + Math.random() * 9000);
        //create Randoom Id for new recorde
        const orderid = Math.floor(1000 + Math.random() * 90000);

        if (DataHolder.totalTimework < 1 || childeArray.length < 1) {
            return Alert.alert("تنبيه", "الرجاء تحديد موعد  الخدمه و عدد الاطفال")
        }
        console.log("test player id",playerid)
        
        const babseters = {
            scurtycode: securenumber,
            childe: childeArray,
            serviestype: babsetersData.mainservice,
            orderid: orderid,
            childeaccount: childeArray.length,
            settterowner: babsetersData.owner,
            displayname: babsetersData.displayname,
            time: timeresult,
            motherplayerid: playerid,
            setterplayerid: babsetersData.playerid,
            setterphone:babsetersData.phone,
            settername: babsetersData.name,
            statuse: "processing",
            reson: "",
            read: false,
            start: date,
            end: date2,
            starttime:DataHolder.timeStart,
            endtime:DataHolder.timeToEnd,
            potementdate: date,
            settterfaileid: babsetersData._id,
            address:babsetersData.address,
            price: DataHolder.mainePrice,
            hours: minutes,
            totalprice: totPrice,
            totalhours: DataHolder.totalTimework,
            reservioninfo: reservion,
            selectType:DataHolder.selectType,
            selectname:selectname,
            workday:DataHolder.workday,
            endPriceOnday:DataHolder.endPriceOnday,
            accompany:babsetersData.accompany
        }
        console.log("test arry",babseters)
       props.navigation.navigate('ConfirmRes', { data1: JSON.stringify(babseters) })
    }


    const extraTime = (time, num, index) => {
        const poitmenttime = moment(time)
        const endpoitmentime = moment(poitmenttime).add(num, 'hour')
        setTime2(endpoitmentime)
        slctslots = index
        setresevButton(true)
    }
  

const openModelWithshowTime=()=>{
     showClenderrIcon()
     hideClenderrIcon()
    setShowModal(true)
    setTimeout(() => {
        
        setOpen(true)
       
    }, 3000);
  
}

return(
    <ScrollView contentContainerStyle={{backgroundColor:Colors.veryLightGray,height:Metrics.HEIGHT} }>
        <Box flex={1} mt={Platform.OS==='android'?'10':'20'} alignItems={'center'} width={"100%"} >
         
        
        <Box alignItems={'center'} justifyContent="center" backgroundColor={'#FFFFFF'} w={'72'}mt={'10'} borderRadius={34} p={'3'} shadow={'9'}>
            <Box  alignItems={'center'} flexDirection='row' mt={2}>
                <Stack  flexDirection='row' justifyContent='center' alignItems={'center'}  p={'1'}>
                    <Image source={Images.babyface} style={{width:widthPixel(17) ,height:heightPixel(18)}} resizeMode='contain'/>
                    <Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.medium}  fontWeight={'700'} letterSpacing={1.4} color={Colors.titleColor}
                    fontSize={fontPixel(Platform.OS==='android'?20:18)} ml="1"  textAlign='right'>اختيار الطفل</Text>
                </Stack>
                {/* <Stack  alignItems='baseline' flexDirection={'row'}     >
                    <Image source={Images.chiled} style={{width:widthPixel(17) ,height:heightPixel(17)}} resizeMode='contain'/>
                    <Text style={{marginLeft:5}}> {childeArray.length}</Text>
                    <Text  fontFamily={Platform.OS==='android'?Fonts.type.medium: Fonts.type.medium} fontSize={fontPixel(12)} mr={1}
                    >طفل</Text>
                </Stack> */}
            </Box>
            <Box backgroundColor={Colors.transparent} flexDirection={'row'} alignContent={'center'}  >
                    {motherch.map((nme,index)=>{
                    return(
                        <Box flexDirection='column'ml={Platform.OS==='android'?'3':'1.5'}  key={nme._id}>
                            <Stack alignItems={'center'} justifyContent='center' mt={2} >
                                <Text  fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontWeight={Platform.OS==='android'?'600':'700'} fontSize={fontPixel(14)} 
                                    color={Colors.blacktxt}   textAlign='center'>{nme.name}</Text>
                            </Stack>
                            <Stack alignItems={'center'} justifyContent='center'   >
                                    {/* <Text style={styles.leftText}>{nme.diseasses}</Text> */}
                                <Checkbox value="test"   size={'sm'} borderRadius={50} onChange={()=> addOrRemove(motherch[index]) } accessibilityLabel="This is a dummy checkbox" colorScheme='lightBlue' />
                            </Stack>
                            
                        </Box>
                    )
                    })}

            </Box>
        
                
        </Box>
        
        <Box  alignItems={'center'} justifyContent="center"  backgroundColor={'white'} w={'72'} mt={'10'} borderRadius={34} p={'3'} shadow={'9'}>
        <Box justifyContent={'center'} alignItems={'center'}flexDirection={'column'}>
            <Box justifyContent={'space-between'} flexDirection='row' >
                <Stack alignItems={'baseline'} flexDirection='row' justifyContent={'space-around'} ml={2}  mb={'2'}>
                    <Image source={images.grreenCalendrnew} style={{width:widthPixel(18),height:heightPixel(18)}} resizeMode='contain'  />
                    <Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontWeight={'700'} letterSpacing={1.2} color={Colors.greentext} 
                        fontSize={fontPixel(18)} ml={2} textAlign='left'> وقت الحضانة</Text>
                </Stack>
            </Box>
            <Box flexDirection={'row'} alignItems={'center'} justifyContent='center' >
                    <Stack justifyContent={'center'} alignItems='center'  flexDirection={"row"}    >
                        <Image source={images.clenderblack} style={{width:widthPixel(18),height:heightPixel(18)}} resizeMode='contain'  />
                        <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold}    fontSize={fontPixel(14)} fontWeight={Platform.OS==='android'?"600":"700"} ml={'2'}>{moment(date).format('D MMM')}</Text>
                        {selectname!="يومي"&& <Text fontFamily={Platform.OS==='android'? Fonts.type.bold:Fonts.type.bold} fontWeight={Platform.OS==='android'?"600":"700"} letterSpacing={1.2} fontSize={fontPixel(16)}  ml="1" >الى</Text>}
                        {selectname!="يومي" &&<Text fontFamily={Fonts.type.bold}    fontSize={fontPixel(14)} fontWeight={Platform.OS==='android'?"600":"700"} ml={'2'}>{moment(date2).format('D MMM')}</Text>}
                    </Stack> 
                </Box>
                <Box flexDirection={'row'} alignItems={'center'} justifyContent='center'>
                    <Stack   justifyContent={'center'} alignItems='center' p={'1.5'} >
                        <Image source={images.clock} style={{width:widthPixel(18),height:heightPixel(18),marginRight:Platform.OS==='android?'?2:2}}resizeMode='contain'  />
                    </Stack >
                    <Stack  flexDirection={"row"} width={widthPixel(100)} ml={'1'} alignItems='baseline' justifyContent={'center'}   >
                        <Text fontFamily={Platform.OS==='android'? Fonts.type.bold:Fonts.type.bold} fontWeight={Platform.OS==='android'?"600":"700"} letterSpacing={1.2} fontSize={fontPixel(16)}  ml="1" >{moment(time).format("hh:mm a")}</Text>
                        <Text fontFamily={Platform.OS==='android'? Fonts.type.bold:Fonts.type.bold} fontWeight={Platform.OS==='android'?"600":"700"} letterSpacing={1.2} fontSize={fontPixel(16)}  ml="1" >الى</Text>
                        <Text fontFamily={Platform.OS==='android'? Fonts.type.bold:Fonts.type.bold} fontWeight={Platform.OS==='android'?"600":"700"} letterSpacing={1.2} fontSize={fontPixel(16)}  ml="1" >{moment(time2).format("hh:mm a")}</Text>
                    </Stack> 
                </Box>
                <Box>
                <Stack alignItems={'center'} justifyContent={'center'} mt={'2'} >
               
                    <TouchableOpacity onPress={()=> props.navigation.goBack() }    style={{height:Metrics.HEIGHT*0.0421 ,width:Metrics.WIDTH*0.6191,backgroundColor:Colors.textZahry,alignItems:'center',justifyContent:'center', padding:2,borderRadius:22,}}  >
                        <Text fontFamily={Platform.OS==='android'? Fonts.type.bold:Fonts.type.bold} fontWeight={"700"} letterSpacing={1.2} fontSize={fontPixel(16)} color={Colors.white} ml="1" >تعديل</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={()=>openModelWithshowTime() }    style={{height:Metrics.HEIGHT*0.0321 ,width:Metrics.WIDTH*0.5891,backgroundColor:Colors.textZahry,alignItems:'center',justifyContent:'center', padding:2,borderRadius:22,borderWidth:.4,borderColor:Colors.black}}  >
                        <Text fontFamily={Platform.OS==='android'? Fonts.type.bold:Fonts.type.bold} fontWeight={"700"} letterSpacing={1.2} fontSize={fontPixel(16)} color={Colors.white} ml="1" >تعديل</Text>
                    </TouchableOpacity> */}
                </Stack>
                </Box>
                
            
        </Box>
                    
                    

        </Box>
                {/* 00000000 */}
        <Box  alignItems={'center'} justifyContent="center"  backgroundColor={'white'} w={'72'} mt={'10'} borderRadius={34} p={'3'} shadow={'9'}>
        <Stack flexDirection={'row'} mt={'1'} p={'1'} justifyContent={'space-around'}>
            <Image source={images.locationgreen}resizeMode='contain' style={{width:widthPixel(14),height:heightPixel(14),marginRight:3}} />
            <Text fontFamily={Platform.OS === 'android' ? Fonts.type.bold:Fonts.type.bold}  color={Colors.titleColor}
                fontSize={fontPixel(15)} fontWeight={Platform.OS==='android'?"600":'700'} letterSpacing={1.2} >الموقع</Text>
        </Stack>
        <Stack mt={'1'} flexDirection={'row'}>
            <Image source={images.locationblack} resizeMode='contain' style={{width:widthPixel(14),height:heightPixel(14),marginRight:3}}/>
            <Text fontFamily={Platform.OS === 'android' ? Fonts.type.bold:Fonts.type.bold} fontSize={fontPixel(18)} color={Colors.black} textAlign={'left'} >{location}</Text>
        </Stack>
        <TouchableOpacity  onPress={() => props.navigation.push("Mapscreen")} style={{height:Metrics.HEIGHT*0.0421 ,width:Metrics.WIDTH*0.6191,backgroundColor:Colors.textZahry,alignItems:'center',justifyContent:'center', padding:2,borderRadius:22,}}   >
            <Text fontFamily={Platform.OS==='android'? Fonts.type.bold:Fonts.type.bold} fontWeight={"700"} letterSpacing={1.2} fontSize={fontPixel(16)} color={Colors.white} ml="1" >تغيير العنوان</Text>
        </TouchableOpacity>
        
         
        </Box>
       
        <Box flexDirection='column' width={widthPixel(388)} height={heightPixel(100)} justifyContent='space-around' alignItems={'center'} ml={'3'} mt={4}
            position='absolute' bottom={10} >
        <OutlaintButton
            buttonColor={Colors.grayButton}
            title="السابق"
            titleColor={Colors.textZahry}
            buttonStyle={{width: '88%', alignSelf: 'center',borderRadius:15,borderColor:Colors.transparent,marginTop:2}}  
            textStyle={{fontSize:fontPixel(16) }}  
            onPress={()=> props.navigation.goBack()}
        />
        <CustomButton
            buttonColor={Colors.textZahry}
            title="التالي"
            buttonStyle={{width: '88%', alignSelf: 'center',borderRadius:15,marginTop:2}}                       
            textStyle={{fontSize:fontPixel(16) }}
            onPress={() =>ConfirmScreen()}
        />
        
        </Box>
    
        </Box>
                 
    </ScrollView>
)
}
export default Fourm1;










