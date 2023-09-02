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
    const [date, setDate] = useState(new Date(Date.now()));
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
   getasubservice()
   getMotherChiled()
   
   const location= await setItem.getItem('BS:Location') 
  if (!location){
    setlocation('...')
  }else{
    const  existLocation=JSON.parse(location)
    setlocation(existLocation.formatted)
  }
    
// return()=>{
   
// }
},[] )

useEffect(()=>{
    console.log("test chiled",childeArray.length)
},[childeArray])


useEffect(  () => {
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

    const getasubservice = async () => {
        setloding(true)
        const id = props.route.params.serviceid
        setmainservice(props.route.params.serviceNmae)
        const orderid = props.route.params.orderId

        switch (orderid) {

            case 1:
                //get sub service from id o f maine service for babtsetter
                const response = await api.get(`/subcategories/${id}`).then((res) => {

                    setsubservice(res.data)
                    setloding(false)
                    setResWay(1)
                    console.log("case1",)
                    return res;

                }).catch((error) => {
                    if (error) {
                        console.log("Eror from  get sub servic".error)
                    }
                })
                break;

            case 2:
                //clear sub service from id o f maine service for Home babtsetter
                console.log("case2",)
                setsubservice([])
                setloding(false)
                setResWay(2)
                break;

            case 3:
                //profile setter=> Fourm1 
                console.log("result data", props.route.params.data1)
                console.log("case3",)
                setbabysetterData(props.route.params.data1)
                readWorkhours(props.route.params.data1.owner)
                setloding(false)
                setResWay(3)
                break

            default:
                break;
        }
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
//direct to next screen
  const ConfirmScreen=async()=>{
    const location= await setItem.getItem('BS:Location') 
    const coordinates=JSON.parse(location)
    if(coordinates===null){
        return Alert.alert("تنبيه","الرجاء تحديث عنوان موقع المنزل")
    }
   switch (ResWay){
    case 1:
        console.log("move to screen",1)
        Request()

    break;
    case 2:
        console.log("move to screen",2)
        Request()
    break;
    case 3:
        console.log("move to screen",3)
        QiuqRREQUEST()
    break;
   }
  }

    const Request = async () => {

        const token = await setItem.getItem('BS:Token');
        const location = await setItem.getItem('BS:Location')
        const playeridUUid = await setItem.getItem('@FCMTOKEN');

        const playerid =   playeridUUid
        const coordinates = JSON.parse(location)
        
        const timeresult = `${time} الى ${time}`
        if (totalInminuts < 1 || childeArray.length < 1) {
            console.log("account", totalInminuts, "=", childeArray.length < 1)
            return Alert.alert("تنبيه", "الرجاء تحديد الاطفال او تحديد موعد الخدمة")
        }
       console.log("test player id",playerid)
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
            start: time,
            end: time2,
            potementdate: date,
            hours: totalInminuts,
            reservioninfo: reservion
        }
        //move to babyseters list screens
        props.navigation.navigate('Babysetesrs', { setterdata: JSON.stringify(requestData) });


    }

    //quiq reservition
    const QiuqRREQUEST = async () => {
        const token = await setItem.getItem('BS:Token');
        const location = await setItem.getItem('BS:Location')
        const playeridUUid = await setItem.getItem('@FCMTOKEN');
        const playerid = playeridUUid
        const coordinates = JSON.parse(location)
        //configer player id 
        const timeresult = `${time} الى ${time}`

        const num = totalInminuts;
        const hours = (num / 60);
        const rhours = Math.floor(hours);
        const minutes = (hours - rhours) * 60;
        const rminutes = Math.round(minutes);
        // console.log( num + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).")
        const totPrice = Number(rhours * babsetersData.price)
        const securenumber = Math.floor(1000 + Math.random() * 9000);
        //create Randoom Id for new recorde
        const orderid = Math.floor(1000 + Math.random() * 90000);

        if (totalInminuts < 1 || childeArray.length < 1) {
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
            start: time,
            end: time2,
            potementdate: date,
            settterfaileid: babsetersData._id,
            address:babsetersData.address,
            price: babsetersData.price,
            hours: totalInminuts,
            totalprice: totPrice,
            totalhours: rhours,
            rreservioninfo: reservion
        }
        //console.log("test arry",babseters)
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
    <ScrollView contentContainerStyle={{backgroundColor:Colors.AminabackgroundColor,flex:1} }>
        <Box style={{marginTop: Platform.OS==='android'? Metrics.HEIGHT*0.0941: Metrics.HEIGHT*0.1301,backgroundColor:Colors.white}}>
            {/* {!loading?
        <FlatList
            data={subservice}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item ,index}) => <Item title={item} i={index} />}
            style={{marginLeft:11,marginRight:11,backgroundColor:Colors.AminaButtonNew}}
            horizontal={true}
        />:
        <View><Spinner accessibilityLabel="جاري تحميل البيانات" size="lg"  color={Colors.loginBlue}/></View>} */}
        </Box>
        
        <Box flexDirection={'row'} alignItems={'center'} height={'141'} width="90%" marginLeft={'5'} marginRight={'5'} backgroundColor={Colors.bannerColor} marginTop={pixelSizeVertical(4)} borderRadius={20}>
            {/* <Text style={{ paddingTop: 20, fontWeight: Platform.OS === 'android' ? "300" : "700", fontFamily: Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.base, fontSize: 22, marginLeft: 5, marginBottom: 2 }} >اختر الخدمة</Text>
            <Text style={{ fontFamily: Platform.OS === 'android' ? Fonts.type.light : Fonts.type.light, fontSize: 18, marginBottom: 10 }}>الرجاء اختيار نوع الخدمه والبدء بانشاء طلبك</Text> */}
            <Box   flex={2}>
            <Text style={{ fontFamily: Platform.OS === 'android' ? Fonts.type.medium : Fonts.type.medium, fontSize: fontPixel(24),textAlign:'left',color:"#F5F5F5",marginLeft:pixelSizeHorizontal(23),padding:7} }>أمينة على أطفالك</Text> 
            </Box>
            <Image source={Images.motherbanner} style={{height:141,flex:1.2,backgroundColor:Colors.transparent,marginRight:pixelSizeHorizontal(22) }} resizeMode='cover'  />
        </Box>
    
        {/* <Box backgroundColor={'red.100'}>
            {babsetersData._id && ResWay && <BabyseterProfile/>}
        </Box> */}
    
        {babsetersData._id && ResWay &&
            <Box size={'lg'}   w={"100%"} h={"14%"}>
            <BabyseterProfile/>  </Box>}
  
    <View style={styles.framView}>
        <Box justifyContent={'space-between'} flexDirection='row'  width={widthPixel(375)}  mt={2} >
            <Stack  flexDirection='row' justifyContent='center' alignItems={'center'}>
                <Image source={Images.babyface} style={{width:widthPixel(17) ,height:heightPixel(17)}} resizeMode='contain'/>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.medium: Fonts.type.medium}   color={Colors.greentext}
                fontSize={fontPixel(12)} ml="1"  textAlign='right'>اختر طفلك</Text>
            </Stack>
            <Stack  alignItems='baseline' flexDirection={'row'}     >
                <Image source={Images.chiled} style={{width:widthPixel(17) ,height:heightPixel(17)}} resizeMode='contain'/>
                <Text style={{marginLeft:5}}> {childeArray.length}</Text>
                <Text  fontFamily={Platform.OS==='android'?Fonts.type.medium: Fonts.type.medium} fontSize={fontPixel(12)} mr={1}
                >طفل</Text>
            </Stack>
        </Box>
        <Box flexDirection={'row'}  >
                {motherch.map((nme,index)=>{
                   return(
                   <Box   flexDirection='column' ml={pixelSizeHorizontal(5)} key={nme._id}>
                        <Stack alignItems={'center'} justifyContent='center'   >
                                {/* <Text style={styles.leftText}>{nme.diseasses}</Text> */}
                            <Checkbox value="test"   size={'sm'} borderRadius={50} onChange={()=> addOrRemove(motherch[index]) } accessibilityLabel="This is a dummy checkbox" colorScheme='lightBlue' />
                        </Stack>
                        <Stack alignItems={'center'} justifyContent='center' mt={2} >
                            <Text  fontFamily={Platform.OS==='android'?Fonts.type.medium: Fonts.type.medium} fontSize={fontPixel(14)} 
                                color={Colors.blacktxt}   textAlign='center'>{nme.name}</Text>
                        </Stack>
                    </Box>
                   )
                })}

        </Box>
        
                
    </View> 
    <View style={styles.framView}>
        <Box justifyContent={'space-between'} flexDirection='column'  width={widthPixel(375)}  mt={3}  >
            <Box justifyContent={'space-between'} flexDirection='row' h={'5'}  >
                <Stack alignItems={'baseline'} flexDirection='row' justifyContent={'space-around'} ml={2} >
                    <Image source={images.calender} style={{width:widthPixel(13),height:heightPixel(14)}}  />
                                    {/* <EvilIcons name="pencil" size={33} color={Colors.textZahry} }   /> */}
                    <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular}  color={Colors.greentext} 
                                fontSize={fontPixel(12)} ml={2} textAlign='left'>اختر موعد الخدمة</Text>
                </Stack>
                <Stack mr={3}  >
                    <TouchableOpacity onPress={()=>openModelWithshowTime() }    style={{height:Metrics.HEIGHT*0.0221 ,width:Metrics.WIDTH*0.0891,alignItems:'flex-end'}}  >
                        <Image source={images.pin} style={{width:widthPixel(16),height:heightPixel(16)}}  />
                            {/* <EvilIcons name="pencil" size={33} color={Colors.textZahry} }   /> */}
                    </TouchableOpacity>
                </Stack>
            </Box>
            <Box flexDirection={'row'}   alignItems={'baseline'} mt={'2'}  >
                
                <Box flexDirection={'row'} alignItems={'center'} justifyContent='center'>
                    <Stack   justifyContent={'center'} alignItems='center' ml={'5'}>
                    <Image source={images.clock} style={{width:widthPixel(13),height:heightPixel(20),marginRight:Platform.OS==='android?'?2:2}}resizeMode='contain'  />
                    </Stack >
                    <Stack  flexDirection={"row"} width={widthPixel(100)} ml={'4'}     alignItems='baseline' justifyContent={'center'}   >
                        <Text fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.base} fontSize={fontPixel(14)}  ml="1" >{moment(time).format("hh:mm a")}</Text>
                        <Text fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.base} fontSize={fontPixel(14)}  ml="1" >/</Text>
                        <Text fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.base} fontSize={fontPixel(14)}  ml="1" >{moment(time2).format("hh:mm a")}</Text>
                    </Stack> 
                </Box>
                <Box alignItems={'center'} justifyContent='center'>
                    <Stack justifyContent={'center'} alignItems='center'  flexDirection={"row"}    >
                        <Image source={images.clenderblack} style={{width:widthPixel(13),height:heightPixel(20),marginLeft:55}} resizeMode='contain'  />
                        <Text fontFamily={Fonts.type.medium}   fontSize={fontPixel(14)} fontWeight="400" ml={17}>{moment(date).format('LL')}</Text>
                    </Stack> 
                </Box>
                
            </Box>
        </Box>
                    
                    

    </View>
                {/* 00000000 */}
    <View style={styles.framView}>
            <Box justifyContent={'space-between'} flexDirection='column'  width={widthPixel(375)}   >
            <Box justifyContent={'space-between'} flexDirection='row'>
                <Stack flexDirection={'row'} ml={2} alignItems='baseline'>
                    <Image source={images.location} style={{width:widthPixel(13),height:heightPixel(14)}}  />
                   
                    <Text fontFamily={Platform.OS === 'android' ? Fonts.type.medium : Fonts.type.medium}  color={Colors.greentext}
                        fontSize={fontPixel(12)} ml="1" mt="2" textAlign='left'>الموقع</Text>
                </Stack>
                <Stack flexDirection={'row'} mr={2} alignItems='baseline' justifyContent={'space-between'}>
                    
                    <TouchableOpacity  onPress={() => props.navigation.push("Mapscreen")} style={{alignItems:'flex-end',flexDirection:'row'}}>
                        <Text fontFamily={Platform.OS === 'android'? Fonts.type.medium : Fonts.type.medium}  color={Colors.textZahry}
                        fontSize={fontPixel(12)} ml="1" mr={2} mt="2" textAlign='left'>اضف عنوان جديد</Text>
                        <Image source={images.pin} style={{width:widthPixel(13),height:heightPixel(14)}}  />
                    </TouchableOpacity>
                </Stack>
            </Box>
            <Box flexDirection={'row'} justifyContent='space-around' ml={1}  mt={pixelSizeVertical(5)}  alignItems={'baseline'}>
                <Stack  >
                    <Text fontFamily={Fonts.type.aminafonts} textAlign='left' fontSize={12} color={Colors.newTextClr} >{location}</Text>
                </Stack>
            </Box>
            </Box>
        </View>
       
    <Box flexDirection='row' width={widthPixel(388)} height={heightPixel(100)} justifyContent='space-around' alignItems={'center'} ml={'3'} mt={4}
            position='absolute' bottom={10} >
        <OutlaintButton
            buttonColor={Colors.transparent}
            title="السابق"
            titleColor={Colors.greentext}
            buttonStyle={{width: '44%', alignSelf: 'center',borderRadius:15}}  
            textStyle={{fontSize:fontPixel(16) }}  
            onPress={()=> props.navigation.goBack()}
        />
        <CustomButton
            buttonColor={Colors.textZahry}
            title="التالي"
            buttonStyle={{width: '44%', alignSelf: 'center',borderRadius:15}}                       
            textStyle={{fontSize:fontPixel(16) }}
            onPress={() =>ConfirmScreen()}
        />
        
    </Box>
    
     <Center>
         
        <Modal  isOpen={showModal} onClose={() => setShowModal(false)}
           
                borderColor={Colors.white} backgroundColor={Colors.transparent}
                avoidKeyboard justifyContent="flex-end" bottom="4">
            <Modal.Content width={Metrics.WIDTH }  height={heightPixel(540)} backgroundColor={Colors.AminabackgroundColor} >
            <Modal.CloseButton />
            <Modal.Body flexDirection={'column'}  height={heightPixel(400)} >
                <View style={{justifyContent:'space-around',marginLeft:1 ,marginTop:10 }}>
                    <Box flexDirection={'row'}  mt={'4'}  >
                        <Stack  backgroundColor={Colors.textZahry}  w={Platform.OS==='android'? widthPixel(190):widthPixel(190)}
                            borderRadius={'md'}    h={heightPixel(65)} alignItems='center'   mr={19} flexDirection='row'  justifyContent={'center'} >
                            <Image source={images.yellowpin} resizeMode='contain' style={{width:widthPixel(16),height:heightPixel(16),marginRight:7}}  />
                            {datePicker ? (
                            <DateTimePicker
                                value={date}
                                mode={'date'}
                                display={Platform.OS === 'ios' ? 'compact' : 'default'}
                                is24Hour={false}
                                dateFormat={"day month year"}
                                onChange={onDateSelected}
                                style={styles.datePicker}
                            />):(
                                <TouchableOpacity onPress={ ()=>setDatePicker(!datePicker)}>
                                    <Text fontFamily={Platform.OS==='android'?Fonts.type.medium: Fonts.type.medium} color={Colors.goldText} >
                                        {moment(date).format("dddd")}  {moment(date).format(" LL")}</Text>
                                </TouchableOpacity>
                            )}
                        </Stack>
                        
                        <Stack backgroundColor={Colors.textZahry} flexDirection={'row'} ml={Platform.OS==='android'?1:1}  w={Platform.OS==='android'? widthPixel(130):widthPixel(150)}
                            borderRadius={15}     h={heightPixel(65)} alignItems='center'  justifyContent={'center'}   >
                            <TouchableOpacity  onPress={()=>setOpen(true)} style={{width:Platform.OS==='android'? widthPixel(130):widthPixel(89) ,height:heightPixel(30),justifyContent:Platform.OS==='android'?'center':'center',alignItems:'center', flexDirection:'row'  }}   >
                                <Image source={images.yellowpin} style={{width:widthPixel(16),height:heightPixel(16),marginRight:7}}  />
                                <Text fontFamily={Platform.OS==='android'?Fonts.type.medium: Fonts.type.medium} color={Colors.goldText}
                                        textAlign={'center'} fontSize={fontPixel(16)} backgroundColor='warning.700' >
                                        {moment(time).format("LT A")} </Text>
                                <DatePicker
                                mode='datetime'
                                modal
                                
                                theme='light'
                                minuteInterval={30}
                                open={open}
                                date={time}
                                
                                onConfirm={(date) => {setTime(date) 
                                            setDate(date)
                                            setOpen(false) 
                                            setresevButton(false)}}
                                onCancel={() => {setOpen(false)}}
                                />
                                </TouchableOpacity>
                        </Stack>
                         
                    </Box>
                </View>

                <View style={{marginTop:Platform.OS==='android'?16:pixelSizeVertical(30) ,width:widthPixel(370),height:heightPixel(113),backgroundColor:Colors.AminabackgroundColor}}>
                    <Box flexDirection={'column'}  >
                        <Stack   alignItems={'flex-start'} width={widthPixel(370)}>
                            <Text fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(16)}
                                textAlign='right' >
                                عدد ساعات الخدمة
                            </Text>
                        </Stack>
                        <Stack  flexDirection={'row'}   alignItems='center'  justifyContent={'space-around'} mr={Platform.OS==='android'?'2':'1'} >
                                {timeslots.map((slot,index)=>{
                                return(
                                    <TouchableOpacity  key={slot.id} style={{width:widthPixel(55),height:heightPixel(55),justifyContent:'center',alignItems:'center',marginTop:10,backgroundColor:Colors.transparent,
                                                            borderRadius:100,borderColor:slctslots===index? "#F38193":Colors.greys ,borderWidth:1 }}   
                                            onPress={()=>extraTime(time,slot.time,index) } >
                                            <Box  key={slot.id}   borderRadius='lg'  alignItems={'center'} justifyContent='center' borderColor={'black'}
                                                w={widthPixel(10)} height={heightPixel(40)}
                                            ml={Platform.OS==='android'?'1': pixelSizeVertical(2)} mr={'2'}   >
                                                <Text alignSelf={'center'} fontSize={ slctslots===index?  fontPixel(22): fontPixel(15)} 
                                                    fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}
                                                    color={"#000000"}>{slot.time}
                                                </Text>
                                            </Box>
                                        
                                    </TouchableOpacity>
                                    
                                        // <TouchableOpacity  key={slot.id} style={{width:widthPixel(33),height:heightPixel(36),justifyContent:'center',alignItems:'center',marginTop:10,backgroundColor:Colors.transparent }}   
                                        //         onPress={()=>extraTime(time,slot.time,index) } >
                                        //     <Box  key={slot.id} backgroundColor={slctslots===index? "#F38193":Colors.white} borderRadius='md'  alignItems={'center'} justifyContent='center'
                                        //     w={widthPixel(10)} height={heightPixel(40)} ml={Platform.OS==='android'?'1': pixelSizeVertical(2)} mr={'2'}   >
                                        //     <Text alignSelf={'center'} fontSize={fontPixel(15)} 
                                        //         fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium}
                                        //         color={"#000000"}>{slot.time}
                                        //     </Text>
                                        //     </Box>
                                            
                                        // </TouchableOpacity>
                                        
                                  
                               
                                )
                            })}
                                {/* {timeslots.map((slot,index)=>{
                                    return(
                                <TouchableOpacity onPress={()=>extraTime(time,slot.time,index) }
                                        style={{flexDirection:"column", backgroundColor:Colors.amin1Button1,alignItems:'center',padding:2,
                                        borderTopEndRadius:10,borderBottomStartRadius:20,width:Metrics.WIDTH*0.1192,height:Metrics.HEIGHT*0.0732,marginLeft:10}}    key={slot.id}>
                                    <Text fontFamily={Fonts.type.aminafonts} fontSize={18} color={numcolor===index? Colors.bloodOrange:Colors.white} fontWeight='400' textAlign={'center'}  backgroundColor={Colors.banner} >{slot.time} </Text>
                                    <Text fontFamily={Fonts.type.aminafonts} fontSize={14} color={numcolor===index? Colors.bloodOrange:Colors.white} fontWeight='400' textAlign={'center'}>
                                    {slot.time.toString() === "2" ? "ساعة ":"ساعات"}</Text>
                                </TouchableOpacity>
                                )
                    })} */}
                   </Stack>
                </Box>
                </View>
                {visible?<Stack > 
                            <TouchableOpacity>
                                <AnimatedLoader
                                    visible={visible}
                                    overlayColor="rgba(255,255,255,0.75)"
                                    source={require("./calender.json")}
                                    animationStyle={styles.lottie}
                                    speed={1}
                                /> 
                            </TouchableOpacity>
                        
                        </Stack>:<Stack/>}
            </Modal.Body>
            
            <Modal.Footer alignItems={'center'} justifyContent='space-around'  backgroundColor={Colors.AminabackgroundColor} height={Metrics.HEIGHT*0.281}>
                <Box  flexDirection={'column'} marginBottom={3} alignItems={'center'}>
                    <Stack alignItems={'center'}>
                        <Text fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium} alignItems={'center'} color={Colors.newTextClr}
                            textAlign='center'>
                            تفاصيل  الخدمة </Text>
                    </Stack> 
                    <Box flexDirection={'row'} justifyContent='space-around' width={widthPixel(388)} mt={7}>
                        <Stack flexDirection={"row"} >
                            <Image source={images.clenderblack} resizeMode='contain' style={{width:widthPixel(16),height:heightPixel(16),marginRight:8}}  />
                            <Text fontFamily={Platform.OS==='android'? Fonts.type.aminafonts:Fonts.type.base} color={Colors.newTextClr} alignItems={'flex-end'}>
                                {moment(date).format('dddd')}</Text>
                            <Text fontFamily={Platform.OS==='android'? Fonts.type.aminafonts:Fonts.type.base} color={Colors.newTextClr} alignItems={'flex-end'}>
                                {moment(date).format('LL')}</Text>
                        </Stack>
                        <Stack flexDirection={'row'} >
                            <Stack flexDirection={'row'}>
                                <Image source={images.clock} resizeMode='contain' style={{width:widthPixel(16),height:heightPixel(16),marginRight:8}}  />
                                <Text fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium} color={Colors.newTextClr} alignItems={'flex-end'}>
                                    {moment(time).format('hh:mm a')}</Text>
                            </Stack>
                            <Stack flexDirection={'row'}   >
                                <Image source={images.clockred} resizeMode='contain' style={{width:widthPixel(16),height:heightPixel(16),marginLeft:8}}  />
                                <Text fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium} color={Colors.newTextClr} marginLeft={2}> 
                                {moment(time2).format('hh:mm a')}</Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
            
                <Box width={widthPixel(388)} alignItems={'center'} mt={20}>
                   
                     {resevButton?<CustomButton
                        buttonColor={Colors.textZahry}
                        title="تاكيد الطلب"
                        buttonStyle={{width: '90%', alignSelf: 'center',borderRadius:15 }}
                        textStyle={{fontSize: 20}}
                        onPress={() =>confirmReservisionTime()}
                    />:
                    <Box width={"80%"} height={'24%'} alignItems='center' mt={3} flexDirection={'row'} backgroundColor={Colors.transparent}>
                        <EvilIcons name='exclamation' color={Colors.blacktxt} size={26} style={{marginRight:10,marginLeft:10}}/>
                        <Text  color={Colors.textZahry}  >لاكمال الحجز حددي ساعات الخدمة</Text>
                    </Box>}
                     
                </Box>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
         
      </Center>
                 
    </ScrollView>
)
}
export default Fourm1;













{/* <Center>
           
           <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
       <Modal.Content maxWidth="400px">
       <Modal.CloseButton />
       <Modal.Header>
           <View style={{justifyContent:'space-between',flexDirection:'row',marginLeft:10}}>
               <Text style={styles.rightTex}>اختر موعد الخدمة*</Text>
           </View>
       </Modal.Header>
       <Modal.Body>
           
       <View style={{flexDirection:'column',marginTop:10}}>

                   <View style={{ marginLeft:3}}>
                       
                       <View style={{flexDirection:'column',justifyContent:'space-around'}}>
                       <View style={{flexDirection:'row'}}>
                       <Feather name="calendar" size={22}  color={'#BA5B4F'} onPress={()=>displayDatepicker()}  style={styles.icon} />
                           <View style={styles.datapicker2}>
                               <DateTimePicker
                               testID="dateTimePicker"
                               value={mydate}
                               mode={displaymode}
                               is24Hour={true}
                               
                               display='default'   
                               onChange={changeSelectedDate}
                               />
                           </View> 
                       </View>
                       <View style={{flexDirection:'column',height:Metrics.HEIGHT*0.081,alignItems:'flex-start'}}>
                           <Text style={{marginBottom:3,color:Colors.bloodOrange,marginLeft:10}}>*</Text>
                           <Text style={{marginBottom:3,color:Colors.bloodOrange,marginLeft:10}}>*</Text>
                           <Text style={{marginBottom:3,color:Colors.bloodOrange,marginLeft:10}}>*</Text>
                           <Text style={{marginBottom:3,color:Colors.bloodOrange,marginLeft:10}}>*</Text>
                       </View>
                       <View style={{flexDirection:'row',marginBottom:1,marginTop:10}}>
                         <Feather name="clock" size={22}  color={'#BA5B4F'} onPress={()=>displayTime1icker()} style={styles.icon}  />   
                               {/* <Text> {moment(time1).format('LT')}</Text>  */}
//                            <View style={[styles.datapicker2,{height:Metrics.HEIGHT*0.0353,width:Metrics.WIDTH*0.2119}]}>
//                                    <DateTimePicker
//                                testID="dateTimePicker"
//                                value={time1}
//                                mode={'time'}
//                                is24Hour={true}
//                                display='default'
//                                onChange={changeSelectedTime1}/>
//                            </View> 
//                        </View> 
                        
//                         <View style={{flexDirection:'column',height:Metrics.HEIGHT*0.091,alignItems:'flex-start'}}>
//                         <Text style={{marginBottom:3,color:Colors.bloodOrange,marginLeft:10}}>*</Text>
//                            <Text style={{marginBottom:3,color:Colors.bloodOrange,marginLeft:10}}>*</Text>
//                            <Text style={{marginBottom:3,color:Colors.bloodOrange,marginLeft:10}}>*</Text>
//                            <Text style={{marginBottom:3,color:Colors.bloodOrange,marginLeft:10}}>*</Text>
//                        </View>
                       

//                         <View style={{flexDirection:'row', marginBottom:1,marginTop:10}}>
//                        <Feather name="clock" size={22} color={'#BA5B4F'}  onPress={()=>displayDatepicker()} style={styles.icon}  />
//                        <View style={[styles.datapicker2,{height:Metrics.HEIGHT*0.0353,width:Metrics.WIDTH*0.2119}]}>
//                        <DateTimePicker
//                            testID="dateTimePicker"
//                            value={time2}
//                            mode={'time'}
//                            is24Hour={true}
//                            display='default'
//                            onChange={changeSelectedTime2}
//                        />
//                        </View> 
//                        </View>

//                        </View>

                       

//                    </View>


//                    </View>
//        </Modal.Body>
//        <Modal.Footer>
//            <Button.Group space={2}>
//            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
//                modelShow()}}>خروج</Button>
//            <Button bgColor={Colors.amin1Button1} onPress={() => {
//            modelShow()
//          }}>
//              احجز
//            </Button>
//          </Button.Group>
//        </Modal.Footer>
//      </Modal.Content>
//    </Modal>
 //</Center> */}


 /////

 //<View style={{flexDirection:'column',marginTop:3,height:Metrics.HEIGHT*0.511}}>
                 
                
 {/* <View style={styles.servidatVie}>

     <View style={{width:Metrics.WIDTH*0.864, height:Metrics.HEIGHT*0.0433,backgroundColor:Colors.backgrey,
         marginLeft:1,marginRight:1,marginBottom:3,flexDirection:'row',justifyContent:'space-between'}}>
         <Text style={{marginStart:10,fontFamily:Fonts.type.base,fontWeight:'400',color:'#000000'}}>تاريخ الخدمة</Text>
         <View style={{width:Metrics.WIDTH*0.232,backgroundColor:Colors.transparent,justifyContent:'center'}}>
             <Select selectedValue={sMonth} borderColor={"#000000"} accessibilityLabel="Choose Service" placeholder="Choose Service" 
             _selectedItem={{
                 bg: "gray.200", endIcon: <CheckIcon size="5" />}}
              mt={0} onValueChange={itemValue => setsMont(itemValue)}
             >   
                 <Select.Item label={"يناير"} value="01" />
                 <Select.Item label="فبراير" value="02" />
                 <Select.Item label="مارس" value="03" />
                 <Select.Item label="أبريل" value="04" />
                 <Select.Item label="مايو" value="0054" />
                 <Select.Item label="يونيو" value="06" />
                 <Select.Item label="يوليو" value="07" />
                 <Select.Item label="أغسطس" value="08" />
                 <Select.Item label="سبتمبر" value="09" />
                 <Select.Item label="أكتوبر" value="10" />
                 <Select.Item label="نوفمبر" value="11" />
                 <Select.Item label="ديسمبر" value="12" />
             </Select>
         </View>
     </View>
     
     <View style={{flexDirection:'row',width:Metrics.WIDTH*0.864,backgroundColor:Colors.transparent}}>
         {dayofWeack.map((day)=>{
             return(
             <View  key={day.id}  style={{justifyContent:'space-around',marginLeft:1,marginTop:2}}>
                 <View style={styles.serrvdayView}>
                     <Text style={styles.serrvdayText}>{day.namee}</Text>
                 </View> 
                 <TouchableOpacity style={styles.serrvnumberView} onPress={()=> setsDay(day.id)} >
                     <Text style={styles.serrvnumberText}>{day.id}</Text>
                 </TouchableOpacity>
                  
             </View>
              )
              })}
     </View>
 </View>
 
 <View style={styles.servidatVie}>
     <View style={{width:Metrics.WIDTH*0.864, height:Metrics.HEIGHT*0.0433,backgroundColor:Colors.backgrey,
         marginLeft:1,marginRight:1,marginBottom:3,flexDirection:'row',justifyContent:'space-between'}}>
         <Text style={{marginStart:10,fontFamily:Fonts.type.base,fontWeight:'400',color:'#000000'}}>وقت الخدمة</Text>
     </View>
     <View style={{width:Metrics.WIDTH*0.864, height:Metrics.HEIGHT*0.0433,backgroundColor:Colors.backgrey,
         marginLeft:1,marginRight:1,marginBottom:3,flexDirection:'row',}}>
         <Text style={{marginStart:10,fontFamily:Fonts.type.base,fontWeight:'400',color:'#000000'}}>بداء الخدمة</Text>
         <View style={{flexDirection:'row',marginLeft:10}}>
             <Radio.Group defaultValue="2" name="myRadioGroup" accessibilityLabel="Pick your favorite number" onChange={(val)=>setsPreoid(val)}  >
             <Stack direction={{
                 base: "row",
                 md: "row"
                 }} alignItems={{
                 base: "flex-start",
                 md: "center"
                 }} space={3} w="75%" maxW="300px">
                 <Radio value="2" size={'sm'} my={"1"}     >
                  PM
                 </Radio>
                 <Radio value="1" size={'sm'} my={"2"}>
                 AM
                 </Radio>
             </Stack>
         </Radio.Group>
         </View>
         </View>

         
         <View style={{flexDirection:'row',width:Metrics.WIDTH*0.864,backgroundColor:Colors.transparent}}>
         {times.map((tim)=>{
             return(
             <View  key={tim.id}  style={{justifyContent:'space-around',marginLeft:1,marginTop:2}}>
                 <TouchableOpacity style={styles.serrvtimesView} onPress={()=>startTime(tim.timen,tim.time)}>
                     <Text style={styles.serrvtimesText}>{tim.time}</Text>
                 </TouchableOpacity> 
             </View>
              )
              })}
             </View>
         
             <View style={{width:Metrics.WIDTH*0.864, height:Metrics.HEIGHT*0.0433,backgroundColor:Colors.backgrey,
         marginLeft:1,marginRight:1,marginBottom:3,flexDirection:'row',}}>
         <Text style={{marginStart:10,fontFamily:Fonts.type.base,fontWeight:'400',color:'#000000'}}>انهاء الخدمة</Text>
         <View style={{flexDirection:'row',marginLeft:10}}>
             <Radio.Group defaultValue="2" name="myRadioGroup2" accessibilityLabel="Pick your favorite number" onChange={(val)=>setsPreoid2(val)}  >
             <Stack direction={{
                 base: "row",
                 md: "row"
                 }} alignItems={{
                 base: "flex-start",
                 md: "center"
                 }} space={3} w="75%" maxW="300px">
                 <Radio value="2" size={'sm'} my={1}   >
                  PM
                 </Radio>
                 <Radio value="1" size={'sm'} my={1}>
                 AM
                 </Radio>
             </Stack>
         </Radio.Group>
         </View>
         
         </View>
         <View style={{flexDirection:'row',width:Metrics.WIDTH*0.864,backgroundColor:Colors.transparent}}>
         {times.map((tim)=>{
             return(
             <TouchableOpacity  key={tim.id}  style={{justifyContent:'space-around',marginLeft:1,marginTop:2}} onPress={()=>endTime(tim.timen,tim.time)}>
                 <View style={styles.serrvtimesView}>
                     <Text style={styles.serrvtimesText}>{tim.time}</Text>
                 </View> 
             </TouchableOpacity>
              )
              })}
         </View>

 </View>
</View> */}






//////profile seettet 


            // <Box borderWidth=".3"  bgColor={Colors.white} borderColor="#00ABB9" borderRadius="sm"  pr="5" py="2" ml="3" mr="5"  width={Metrics.WIDTH*0.953}  h={Metrics.HEIGHT*0.185}>
            //   <HStack space={3} justifyContent='space-around' key={babsetersData._id}>
            //     <Image  source={{ uri: `${URL}/users/${babsetersData.owner}/avatar`}} resizeMode='stretch' 
            //     style={{width: Metrics.WIDTH*0.261, height: Metrics.HEIGHT*0.140,marginLeft:5,marginRight:20,borderBottomLeftRadius:10}} />
            //     <Spacer />
                
            //     <VStack flexDirection={'column'}   alignItems={'flex-start'} >
            //       <Text  color= "#000000"
            //        fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.base} fontSize={15} fontWeight="400" >
            //         {babsetersData.displayname}
            //       </Text>
            //       <Text color= "#000000"fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.base} fontSize={15} fontWeight="400"  mr={6}>
            //         {babsetersData.mainservice}
            //       </Text>
            //       <VStack flexDirection={'row'} alignItems='baseline'  bgColor='coolGray.50' >
            //        <AirbnbRating
            //              selectedColor={Colors.TexTPink}
            //             //onFinishRating={(e)=>ratingCompleted(e)}
            //             style={{ paddingVertical: 10 ,backgroundColor:Colors.transparent,padding:10}}
            //             ratingCount={5}
            //             imageSize={20}
            //             size={15}
                        
            //             ratingBackgroundColor={"#BFD1D6"}
            //             ratingColor={"#F38193"}
            //             tintColor={"#FFFFFF"}
            //             showRating ={false}
            //             starContainerStyle={styles.ratingContainerStyle}
            //             isDisabled 
            //     />
            //     <Box>
            //        <Text color= "#000000" fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.base} fontSize={15} >التقييم {babsetersData.rate ? Math.floor(babsetersData.rate):0}</Text>
            //     </Box>
               
                
            //     </VStack>
                  
            //     <Box>
            //       {hourswork&& <Text color= "#000000" >{HOURSWORK} ساعة عمل</Text>}
            //     </Box>
            //     <Box>
            //     <Text   color= "#000000" fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.base} fontSize={15} >
            //       تكلفة الخدمه بالساعه {babsetersData.price} ريال
            //     </Text>
            //     <HStack backgroundColor={'amber.200'}>
                
            //     </HStack>
               
            //     </Box>

            //     </VStack>
                
            //     <Spacer />
            //     <TouchableOpacity onPress={()=>setlike(!like)}>
            //       <Image source={like? images.like1:images.like} resizeMode ={'cover'} style={{width:Metrics.WIDTH*0.0932 ,height:Metrics.HEIGHT*0.072}}   />
            //     </TouchableOpacity>

                 
                
                
            //   </HStack>
              
              
            // </Box> 