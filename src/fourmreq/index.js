import React, { useState, useEffect } from 'react';
import {View,TouchableOpacity,Platform,ScrollView,Image, Alert,StatusBar} from 'react-native';
import {Spinner,Text,VStack,HStack,Spacer,FlatList,Button,Checkbox, Input,Box,Icon,Modal,Center,Radio,Stack} from 'native-base'
import styles from './styles'
import api from '../services/api';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/Feather'
import DateTimePicker from '@react-native-community/datetimepicker';

import { Colors ,Metrics, Fonts,Images} from '../assets/Themes/';
import moment from 'moment';
import {URL_ws,URL} from '../services/links';
import setItem from '../services/storage/'
import 'moment/locale/ar-sa';
import { Rating,AirbnbRating } from 'react-native-ratings';
import images from '../assets/Themes/Images';
import CustomButton from '../services/buttons/buttton';
  

let MOTHERARRAY=[]

const Fourm1=(props)=>{
    const[loading,setloding]=useState(false);
    const [subservice,setsubservice]=useState([]);
    const [select,setselect]=useState(1)
    const [serviestype, setserviestype] = React.useState("");
    const [mainservice, setmainservice] = React.useState("");
    const [location,setlocation]=useState('')
    const[babsetersData,setbabysetterData]=useState([])
    const[like,setlike]=useState(false)

    const [timePicker, setTimePicker] = useState(false);
    const [timePicker2, setTimePicker2] = useState(false);
    const [time, setTime] = useState(new Date(Date.now()));
    const [time2, setTime2] = useState(new Date(Date.now()));
    const [datePicker, setDatePicker] = useState(false);
    const [date, setDate] = useState(new Date(Date.now()));
    const[totalInminuts,settotalInminuts]=useState(0)
    const [reservion,setReservion]=useState("")
 
    const[mother,setMother]=useState([])

    const[ResWay,setResWay]=useState(1)
    const [isTimelayDate1, setSimelayDate1] = useState(false);
     const [isTimelayDate2,setSimelayDate2] = useState(false);
    const [isDisplayDate, setShow] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const[childeArray,settChiledArray]=useState([])
    const[sDay,setsDay]=useState("")
    const[sMonth,setsMont]=useState("")
    const[sPriod,setsPreoid]=useState("")
    const[sPriod2,setsPreoid2]=useState("")
    const[Start,setstart]=useState("")
    const[End,setEnd]=useState('')
    const [motherch,setmothersh]=useState([])

    

//Clender
   
  const  onDateSelected=((event, value)=>{
    //     const inputDate = selectedDate.toISOString();
//     const outputDate = inputDate.split('T')[0];
//    //setSelectedDate(outputDate);
//     setDate(selectedDate);
//     console.log("outputDate",outputDate)
       
if(Platform.OS==='ios'){
    return setDate(value) ,setDatePicker(!datePicker);
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
 
  } )

  
 
  const onTimeSelected=((event, value)=>{
    console.log("time value ====", value)

    if(Platform.OS==='ios'){
        return setTime(value), setTimePicker(false);
    }
    setTimePicker(!timePicker);
    setTime(value);
    // if (event?.type === 'dismissed') {
    //     console.log("ddessmes time")
    //     setTimePicker(false);
    // }else if(event?.type === 'set'){
    //     setTime(value);
    //     setTimePicker(false);
    // }



  })
 

  const  onTimeSelected2=((event, value)=>{
    if(Platform.OS==='ios'){
        return setTime2(value), setTimePicker2(false);
     }
     setTimePicker2(!timePicker2);
     setTime2(value)
    //  if (event?.type === 'dismissed') {
    //      console.log("ddessmes time2")
    //      setTimePicker2(false);
    //  }else if(event?.type === 'set'){
    //      setTime2(value);
    //      setTimePicker2(false);
    //  }
    
   })


  const modelShow=()=>{
    setShowModal(false)
     //console.log("time1",moment(time1).format('HH:MM a'))
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
 

   const handleSelection = (id,title) => {
          setselect(id)
          console.log( "test title ",title.services)
            setserviestype(title.services)
    }

     
    const Item = ({title,i}) => { 
        //console.log("test section item ",title)
       return( 
            <TouchableOpacity style={{flexDirection:'column' , marginLeft:1,justifyContent:'space-around',width:Metrics.WIDTH*0.313,  }} 
             key={title._d} onPress={()=>handleSelection(i,title)}>
                
                <View style={{alignItems:'center',paddingTop:15,paddingBottom:5}} > 
                    <Text color={ i===select?Colors.Milky:Colors.white} fontWeight={i===select?"light":"bold" }fontFamily={Fonts.type.aminafonts} >{title.services}</Text>
                </View>
                <View style={{alignItems:'center',paddingBottom:5,borderBottomColor:i===select?"#000000":null,borderBottomWidth:i===select?1:null}}>
                    <Text style={{color: i===select?Colors.Milky:Colors.white,fontWeight:'600'}} >{title.descripton}</Text>
                
                </View> 
            </TouchableOpacity>
        
      );
    }
    const BabyseterProfile=()=>{
        return(
            <Box borderWidth=".3"  bgColor={Colors.white} borderColor="#00ABB9" borderRadius="sm"  pr="5" py="2" ml="3" mr="5"  width={Metrics.WIDTH*0.953}  h={Metrics.HEIGHT*0.185}>
              <HStack space={3} justifyContent='space-around' key={babsetersData._id}>
                <Image  source={{ uri: `${URL}/users/${babsetersData.owner}/avatar`}} resizeMode='stretch' 
                style={{width: Metrics.WIDTH*0.281, height: Metrics.HEIGHT*0.170,marginLeft:5,marginRight:20,borderBottomLeftRadius:10}} />
                <Spacer />
                
                <VStack flexDirection={'column'}   alignItems={'flex-start'} >
                  <Text  color= "#000000"
                   fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.base} fontSize={15} fontWeight="400" >
                    {babsetersData.displayname}
                  </Text>
                  <Text color= "#000000"fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.base} fontSize={15} fontWeight="400"  mr={6}>
                    {babsetersData.mainservice}
                  </Text>
                  <VStack flexDirection={'row'} alignItems='baseline'  bgColor='coolGray.50' >
                   <AirbnbRating
                         selectedColor={Colors.TexTPink}
                        //onFinishRating={(e)=>ratingCompleted(e)}
                        style={{ paddingVertical: 10 ,backgroundColor:Colors.transparent,padding:10}}
                        ratingCount={5}
                        imageSize={20}
                        size={15}
                        
                        ratingBackgroundColor={"#BFD1D6"}
                        ratingColor={"#F38193"}
                        tintColor={"#FFFFFF"}
                        showRating ={false}
                        starContainerStyle={styles.ratingContainerStyle}
                        isDisabled 
                />
                <Box>
                   <Text color= "#000000" fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.base} fontSize={15} >التقييم {babsetersData.rate ? Number(babsetersData.rate):0}</Text>
                </Box>
               
                
                </VStack>
                  
                <Box>
                   <Text color= "#000000" >{babsetersData.hourstotal} ساعة عمل</Text>
                </Box>
                <Box>
                <Text   color= "#000000" fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.base} fontSize={15} >
                  تكلفة الخدمه بالساعه {babsetersData.price} ريال
                </Text>
                <HStack backgroundColor={'amber.200'}>
                
                </HStack>
               
                </Box>

                </VStack>
                
                <Spacer />
                <TouchableOpacity onPress={()=>setlike(!like)}>
                  <Image source={like? images.like1:images.like} resizeMode ={'cover'} style={{width:Metrics.WIDTH*0.0932 ,height:Metrics.HEIGHT*0.072}}   />
                </TouchableOpacity>

                 
                
                
              </HStack>
              
              
            </Box> 

        )
        
    }


useEffect(async()=>{
   getasubservice()
   getMotherChiled()
   getMotherData()
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

const getasubservice=async()=>{
    setloding(true)
    const id=props.route.params.serviceid
     setmainservice(props.route.params.serviceNmae)
   const  orderid=props.route.params.orderId
   console.log("result order",orderid)

   switch  (orderid) {
    
    case 1:
        //console.log("result",response.data)
    const response =await api.get(`/subcategories/${id}`).then((res)=>{
        // const data=res.sort(function(a, b){return b - a});
         // setsubservice(res.data.sort( function(x,y){
         //     return x.order - y.order;
         // }))
         setsubservice(res.data)
         setloding(false)
         setResWay(1)
         console.log("case1",)
         return res;
         
     }).catch((error) => {
         if(error.message='Request failed with status code 404'){
           //  console.log(error)
         //return  setstatuscode(404)
         }
     }) 
        break;

    case 2:
        console.log("case2",)
        setsubservice([])
        setloding(false)
        setResWay(2)
        break;

    case 3:
     console.log("result data",props.route.params.data1)
     console.log("case3",)
     setbabysetterData(props.route.params.data1)
     setloding(false)
     setResWay(3)
    break
   
    default:
        break;
   }

    

    //   if(response.role != "mather"){
    //     throw(`You are not registered as , please enter with your correct user`);
    // }
   

}

  
 const confirmReservisionTime=()=>{
    const startShiftTime = moment(time, 'DD-MM-YYYY hh:mm:ss A');
    const endShiftTime = moment(time2, 'DD-MM-YYYY hh:mm:ss A');
    
    const duration = moment.duration(endShiftTime.diff(startShiftTime));
    
    // console.log('as hours: ' + duration.asHours(), 'as minutes: ' + duration.asMinutes());
    // console.log('hours: ' + duration.hours(), 'minutes: ' + duration.minutes());
    setReservion(`${duration.asHours()} and ${duration.asMinutes()}`)
    settotalInminuts(duration.asMinutes())
    
   const extraMinuts= Math.floor((duration%3600)/60)
    
    if(extraMinuts >= 1){
      return  Alert.alert("تنبيه","يجب ان تكون الفتره فقط ساعات كامله من دون دقائق ")

    }else{
        modelShow()
    }
     
    }

    const getMotherData= async()=>{
        const token = await setItem.getItem('BS:Token');
        api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
        const response= await api.get("/mothers/me").then((res)=>{
            return res.data
        }).catch((err)=>{
            onsole.log("Erorr",err)
            Alert.alert("تنبيه","غير قادر على جلب  بينات البروفايل")
        })
        console.log("tets response",response)
        setMother(response)
    }

    
    const getMotherChiled= async()=>{ 
    const user = await setItem.getItem('BS:User');
    const token = await setItem.getItem('BS:Token');
    api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    const response =await api.get(`/mother/childe`).then((res)=>{
       return res.data
    })     
    //console.log("Start chiled",response)
    setmothersh(response)
}

const calclutDiff=()=>{ 
const startShiftTime = moment(time, 'hh:mm:ss A');
const endShiftTime = moment(time2, 'hh:mm:ss A');

const duration = moment.duration(endShiftTime.diff(startShiftTime));

// console.log('as hours: ' + duration.asHours(), 'as minutes: ' + duration.asMinutes());
// console.log('hours: ' + duration.hours(), 'minutes: ' + duration.minutes());
 
//return (`${duration.hours()}  hours:  ${duration.minutes()} minutes: ` );
return(
    <Box justifyContent={'space-around'} flexDirection='row'  backgroundColor={'amber.200'} w="40%">
        <Text>{duration.hours()} ساعات </Text>
        <Text>{duration.minutes()} دقائق </Text>
    </Box>
)
}   
 
const addOrRemove = (item) => {
    const {_id,name}=item
    const exists = childeArray.includes(item)
    if (exists) {
        return  settChiledArray(childeArray.filter(item => item.name !== name))
    }
    else if (!exists){
        const result = childeArray
        return result.push(item)
    }

  }

  const ConfirmScreen=async()=>{
    const location= await setItem.getItem('BS:Location') 
    const coordinates=JSON.parse(location)
    if(coordinates===null){
        return Alert.alert("تنبيه","الرجاء تحديث عنوان موقع المنزل")
    }
   switch (ResWay){
    case 1:
        console.log("screen",1)
        Request()

    break;
    case 2:
        console.log("screen",2)
        Request()
    break;
    case 3:
        console.log("screen",3)
        QiuqRREQUEST()
    break;
   }
  }

  const Request=async()=>{
    
    const token = await setItem.getItem('BS:Token');
    const location= await setItem.getItem('BS:Location') 
    const coordinates=JSON.parse(location)
   
    const timeresult=`${time} الى ${time}`
    if(totalInminuts<1  || childeArray.length < 1 ){
        console.log("account",totalInminuts,"=",childeArray.length < 1)
        return Alert.alert("تنبيه","الرجاء تحديد موعد الخدمه")
     }
    
    const requestData={
        serviestype:serviestype,
        mainservice:mainservice,
        childe:childeArray,
        childeaccount:childeArray.length,
        time:timeresult,
        
        statuse:"processing",
        reson:"",
        read:false,
        start:time,
        end:time2,
        potementdate:date,
        hours:totalInminuts,
        reservioninfo:reservion
    }
    props.navigation.navigate('Babysetesrs', {setterdata :JSON.stringify(requestData)});
    // api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    // await api.post("/mother/order",{
    //     serviestype:serviestype,
    //     scurtycode:0,
    //     childe:childeArray,
    //     childeaccount:childeArray.length,
    //     settterowner:"",
    //     time:timeresult,
    //     location: {
    //         type: "Point",
    //         coordinates: [
    //             coordinates.lat,
    //             coordinates.lon
    //         ]
    //     },
    //     settername:"sona",
    //     statuse:"processing",
    //     reson:"",
    //     read:false,
    //     start:time,
    //     end:time2,
    //     potementdate:date,
    //     settterowner:"62484b139f11d603923e0a2e",
    //     settterfaileid:"62484c66b4888f03a8fe8ad6",
    //     price:0,
    //     hours:totalInminuts,
    //     totalprice:0,
    //     totalhours:0,
    //     rreservioninfo:reservion
    // }).then((res)=>{
    //     console.log("Order",res)
    //    props.navigation.navigate('Babysetesrs', {setterdata :JSON.stringify(res)});
    // }).catch(err=> console.log("Erorr:",err ))


}
//qiuq reservition
const QiuqRREQUEST=async()=>{

    
    const token = await setItem.getItem('BS:Token');
    const location= await setItem.getItem('BS:Location') 
    const coordinates=JSON.parse(location)
    
    const timeresult=`${time} الى ${time}`

     
    const  num = totalInminuts;
    const  hours = (num / 60);
    const  rhours = Math.floor(hours);
    const  minutes = (hours - rhours) * 60;
    const  rminutes = Math.round(minutes);
    console.log( num + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).")
    const totPrice=Number(rhours*babsetersData.price)
    const securenumber =  Math.floor(1000 + Math.random() * 9000);
    const orderid= Math.floor(1000 + Math.random() * 90000);
    
    if(totalInminuts<1  || childeArray.length < 1 ){
        return Alert.alert("تنبيه","الرجاء تحديد موعد  الخدمه و عدد الاطفال")
     }
    
   
    

    const babseters={
        scurtycode:securenumber,
        childe:childeArray,
        serviestype:babsetersData.mainservice,
        orderid:orderid,
        childeaccount:childeArray.length,
        settterowner:babsetersData.owner,
        displayname:babsetersData.displayname,
        time:timeresult,
         
        settername:babsetersData.name,
        
        statuse:"processing",
        reson:"",
        read:false,
        start:time,
        end:time2,
        potementdate:date,
        settterfaileid:babsetersData._id,
        price:babsetersData.price,
        hours:totalInminuts,
        totalprice:totPrice,
        totalhours:rhours,
        rreservioninfo:reservion
    }
    console.log("tets items**",babseters)
    props.navigation.navigate('ConfirmRes',{data1:JSON.stringify(babseters)})
}
  
return(
    <ScrollView contentContainerStyle={{backgroundColor:Colors.white,flex:1} }>
    <View style={{marginTop: Platform.OS==='android'? Metrics.HEIGHT*0.0941: Metrics.HEIGHT*0.1301,backgroundColor:Colors.white}}>
        {!loading?
        <FlatList
        data={subservice}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item ,index}) => <Item title={item} i={index} />}
        style={{marginLeft:11,marginRight:11,backgroundColor:Colors.AminaButtonNew}}
        horizontal={true}
        />:
        <View><Spinner accessibilityLabel="جاري تحميل البيانات" size="lg"  color={Colors.loginBlue}/></View>}
    </View>
    
    <View>
        {babsetersData._id && ResWay && <BabyseterProfile/>}
    </View>
        
        
        <View style={styles.framView}>
                <View style={{justifyContent:'space-between',flexDirection:'row',padding:3}}>
                    <Text fontFamily={Fonts.type.aminafonts} fontWeight='bold'  color={Colors.blacktxt} fontSize={18} ml="5" mt="1" textAlign='left'>اختر طفلك</Text>
                </View>
                <View style={styles.splite}/>
                {motherch.map((nme,index)=>{
                   return(  
                  
                    <View  style={{justifyContent:'space-between',flexDirection:'row',width:Metrics.WIDTH*0.822,marginLeft:10}} key={nme._id}>
                    <Text  fontFamily={Fonts.type.light} fontWeight='600'  color={Colors.blacktxt} fontSize={15} ml="5" textAlign='center'>{nme.name}</Text>
                    <View style={{alignItems:'stretch',flexDirection:"row"}}>
                   <Text style={styles.leftText}>{nme.diseasses}</Text>
                    <Checkbox value="test"  size='sm'  onChange={()=> addOrRemove(motherch[index]) } accessibilityLabel="This is a dummy checkbox"/>
                    </View>
                    </View>
                    
                   )
                })}
                <View style={styles.splite}/>
                <View style={{justifyContent:'space-between',alignItems:'baseline',flexDirection:'row',width:Metrics.WIDTH*0.878,paddingBottom:4}} >
                       <Text fontFamily={Fonts.type.light} fontWeight='600'  color={Colors.blacktxt} fontSize={14} ml="5" textAlign='center'>عدد الاطفال</Text>
                       <View style={{flexDirection:'row'}}>
                        <Text style={{marginRight:5}}> {childeArray.length}</Text>
                       <Text style={{marginRight:5}}> اطفال</Text>
                       </View>
                </View>
                </View> 
                <View style={styles.framView}>
                    <View style={{justifyContent:'space-between',flexDirection:'row',width:Metrics.WIDTH*0.822,marginLeft:10,alignContent:"baseline"}}>
                    <Text fontFamily={Fonts.type.aminafonts} fontWeight='bold'  color={Colors.blacktxt} fontSize={15} ml="5" mt="2" textAlign='left'>اختر موعد الخدمة</Text>
                    <EvilIcons name="pencil" size={33} color={Colors.textZahry} onPress={()=>setShowModal(true)}   />
                    </View>
                    <View style={styles.splite}/>
                    <View style={{flexDirection:'row' ,marginBottom:10  ,alignItems:'baseline'}}>
                    <Feather name="clock" size={24}  color={Colors.textZahry} style={styles.icon}
                            onPress={()=>setShowModal(true)}  />
                    <View style={styles.timeView}>
                        <Text fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.base} fontSize={15} fontWeight="400" ml="1" >{moment(time).format("hh:mm a")}</Text>
                        <Text fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.base} fontSize={15} fontWeight="400" ml="1" >/</Text>
                        <Text fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.base} fontSize={15} fontWeight="400" ml="1" >{moment(time2).format("hh:mm a")}</Text>
                    </View> 
                     <View style={styles.datapicker}>
                        <Feather name="calendar" size={24}  color={Colors.textZahry}  style={styles.icon}
                                onPress={()=>setShowModal(true)} />
                      
                        <Text fontFamily={Fonts.type.medium}   fontSize={15} fontWeight="400" ml="1">{moment(date).format('LL')}</Text>
                        </View> 
                    </View>
                    

                </View>
                {/* 00000000 */}

                <View style={styles.framView}>
                    <View style={{justifyContent:'space-between',flexDirection:'row',width:Metrics.WIDTH*0.822,marginLeft:10}}>
                        <Text fontFamily={Fonts.type.light} fontWeight='bold'  color={Colors.blacktxt} fontSize={15} ml="5" mt="2" textAlign='left'>الموقع
                        </Text>
                        
                    </View>
                    <View style={styles.splite}/>
                    <View style={{flexDirection:'row',marginLeft:3 ,justifyContent:'space-around',marginBottom:2,marginTop:5,alignItems:'baseline'}}>
                        
                        <View style={styles.mapTextView}>
                            <Text fontFamily={Fonts.type.aminafonts} textAlign='left' color="#2E2E2E" >{location}</Text>
                            <EvilIcons name="pencil" size={33} color={Colors.textZahry} onPress={()=>props.navigation.push("Mapscreen")}   />
                        </View> 
                        

                        
                    </View>
                        <TouchableOpacity onPress={()=>props.navigation.push("Mapscreen")} style={styles.mapTextView}>
                            <Text fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.base} color="#2E2E2E" >اضف هنا عنوان جديد</Text>
                        </TouchableOpacity> 
                    </View>
                  

                    <View style={{flexDirection:'row',width:Metrics.WIDTH*0.8716,height:Metrics.HEIGHT*0.087,justifyContent:'space-around',marginLeft:20,marginTop:10
                                ,position:'absolute',bottom:10}}>
                    < TouchableOpacity onPress={()=>ConfirmScreen()}   
                            style={styles.endButton}>
                    <Text fontFamily={Fonts.type.light} fontWeight="400" color={Colors.AmonaButtontext} fontSize="18" mt="3" justifyContent={'space-around'}>التالي</Text>
                    </TouchableOpacity>
                    < TouchableOpacity onPress={()=> props.navigation.goBack() }   
                            style={styles.endButton2}>
                    <Text fontFamily={Fonts.type.light} fontWeight="400" color={Colors.AmonaButtontext} fontSize="18" mt="3" justifyContent={'space-around'} >السابق</Text>
                    </TouchableOpacity>
                     
                    </View>


        <Center>
           
            <Modal  isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content width={Metrics.WIDTH*0.9711} backgroundColor='white'>
            <Modal.CloseButton />
            <Modal.Header backgroundColor={Colors.AminaButtonNew}>
                    <View>
                        <Text  fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.base} fontSize={18} fontWeight="400"
                            textAlign={'center'} color='white'>حددي وقت الخدمة</Text>
                    </View>
            </Modal.Header>
            <Modal.Body>
                <View style={{justifyContent:'center',flexDirection:'column',marginLeft:1}}>
                    
                
                    <Stack space={1} w="100%" alignItems="center" marginTop={5} flexDirection='row' textAlign={'center'}>
                        <Text  fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.base} fontSize={18} fontWeight="400" mr={5} >اليوم</Text>
                    {datePicker ? (
                        <DateTimePicker
                            value={date}
                            mode={'date'}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={false}
                            dateFormat={"day month year"}
                            onChange={onDateSelected}
                            style={styles.datePicker}
                        />):(<Input isDisabled h={Metrics.HEIGHT*0.0682} textAlign={'left'}  value={moment(date).format("LL")}
                            w={{base: "75%", md: "20%" }} borderColor={Colors.black} fontSize={'lg'} 
                            InputLeftElement={<Icon as={ !datePicker && (<Feather name="calendar"  onPress={()=>setDatePicker(!datePicker)}/>  ) }
                            size={'lg'} ml="4"   color={Colors.blacktxt} />}
                            color={Colors.blacktxt}  placeholder="تاريخ الخدمة" /> 
                         )}
                    </Stack>


                    <Box flexDirection={'row'}>
                        <Stack space={1} w="39%" alignItems="center" marginTop={5} flexDirection='row'>
                            <Text fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.base}
                            fontSize={18} fontWeight="400" mr={8} color={Colors.red}>من</Text>
                    {timePicker?
                     (<DateTimePicker
                        value={time}
                        mode={'time'}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        is24Hour={false}
                        onChange={onTimeSelected}
                        //timeZoneOffsetInMinutes={60}
                        minuteInterval={60}
                        style={styles.datePicker}
                    />):(<Input isDisabled  h={Metrics.HEIGHT*0.0682}  textAlign={'left'} borderColor={Colors.blacktxt} fontSize={'lg'} value={moment(time).format("LT")}
                    w={{base: "75%",md: "20%"}}  
                    InputLeftElement={<Icon as={ !timePicker && (<Feather name="clock"    onPress={()=> setTimePicker(!timePicker) } /> )} 
                    size={'lg'} ml="4"   color={Colors.blacktxt}/>} 
                    color={Colors.blacktxt}  placeholder="وقت بداد  الخدمه و عدد الاطفال" />
                    )}
                    </Stack>

                    <Stack space={1} w="39%" alignItems="center" marginTop={5}  flexDirection='row'>
                    <Text  fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.base} fontSize={18} fontWeight="400" mr={5} ml='10' >الى</Text>
                        {timePicker2?
                     (<DateTimePicker
                        value={time2}
                        mode={'time'}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        is24Hour={false}
                        onChange={onTimeSelected2}
                        //timeZoneOffsetInMinutes={60}

                        style={styles.datePicker}
                    />):(<Input isDisabled h={Metrics.HEIGHT*0.0682} textAlign={'left'}borderColor={Colors.blacktxt} fontSize={'lg'} value={moment(time2).format("LT")}
                         w={{ base: "75%",md: "20%"}}  
                         InputLeftElement={<Icon as={<Feather name="clock" onPress={()=>setTimePicker2(!timePicker2)}/>} color={Colors.blacktxt} size={'lg'} ml="4" />} 
                         color={Colors.blacktxt}  placeholder="وقت انهاد الخدمه" />)}
                    </Stack>
                    </Box>

                </View>
          
                
           
            </Modal.Body>
            
            <Modal.Footer alignItems={'center'} justifyContent='center'>
            <View style={{flexDirection:'row' ,justifyContent:'space-around' ,marginBottom:10,alignContent:'stretch'}}>
                       <Text fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.base} color="#2E2E2E">
                        مدة الحجز الافتراضيه</Text>
                       <Text fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.base} color={Colors.textZahry}>
                        {calclutDiff()}</Text>
            </View>
                <View style={{width:Metrics.WIDTH*0.893}}>
                    {/* <Button bgColor={Colors.amin1Button1} size={'lg'} onPress={() => {
                        confirmReservisionTime() }}
                    > تم</Button> */}
                     <CustomButton
                        buttonColor={Colors.AminaButtonNew}
                        title="تم"
                        buttonStyle={{width: '90%', alignSelf: 'center'}}
                        textStyle={{fontSize: 20}}
                        onPress={() =>confirmReservisionTime()}
                    />
                                    

                 </View>
                
               
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