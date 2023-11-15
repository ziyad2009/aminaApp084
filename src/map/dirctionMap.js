import  React,{ useEffect, useState ,useRef} from 'react';
 
import { Spacer,Actionsheet,HStack,Box,Text,Center,Button,Modal, Stack,Fab, Spinner,useDisclose} from 'native-base';

import {View,StyleSheet, Platform,SafeAreaView, Alert,PermissionsAndroid,Linking,Image, TouchableOpacity} from 'react-native'
import MapView,{Marker ,PROVIDER_GOOGLE,Callout } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import moment from 'moment' 
import {Metrics,Colors,Fonts,Images, widthPixel, fontPixel, heightPixel} from '../assets/Themes/'
import Geolocation  from 'react-native-geolocation-service';
import setItem from '../services/storage/'
import {URL } from '../services/links';
import api from '../services/api';
import CustomButton from '../services/buttons/buttton';
import openMap from 'react-native-open-maps';
import { set } from 'lodash';
import CountdownTimer from '../workscreen/CountdownTimer';
import images from '../assets/Themes/Images';
 
const GOOGLE_MAPS_APIKEY = "AIzaSyBtKLEuD_50bKofX67ZV2hfLWvjPaY3aac";


  let lat=0
  let long=0
  let MOTHERLOCATION=[]
  let SETTERLOCATION=[]


 const DDirctionMap =(props)=>{
  const setterdata=props.route.params.setter
  const babysetter=props.route.params.data1
  const ORDERID=props.route.params.data1.orderid.substring(0, 5)
 

  
    const [latitudeX,setlatitudeX] = useState("")
        
       
      const[longitudeY,setlongitudeY]=useState("")

      const[getlocatin,setgetloation]=useState(false)

       
    
      const[ motherLocation,setmotherLocation]=useState({})
     const [userinfo,setuserinfo]=useState([])
      const[Distance,setDistance]=useState(null)
      const [Time,setTime]=useState(null)
      const[info,setinfo]=useState('')
     const[showModal,setShowModal]=useState(false)
     const[onmoveto,setonmoveto]=useState(null)
     const[securtyCode,SetSecurtyCode]=useState('')
     const[fullmapp,setFullmap]=useState(false)
      const[loading,setloading]=useState(false)
      const[loadingcords,setloadingcords]=useState(null)
      const [erorrMSg,setErorrMsg]=useState(null)
      const [originData,setoriginData]=useState()
      const [startServiceStatus,setstartServiceStatus]=useState(false)
      const [Activeservice,setActiveservice]=useState(false)

      
      const mapRef = useRef(null);
      const watchId = useRef(null)

      const {
        isOpen,
        onOpen,
        onClose
      } = useDisclose();
    
      
    //  const LATITUDE_DELTA = 0.08;
    //  const LONGITUDE_DELTA = LATITUDE_DELTA * (width /height );  
    const ASPECT_RATIO = Metrics.WIDTH / Metrics.HEIGHT;  
    const latDelta= 0.13015  
    const longDelta=0.10121*ASPECT_RATIO
 
    const  requestPermissions= async()=> {
      console.log("start 1")
      
      if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization("whenInUse");
      if(auth === "granted") {
         // do something if granted...
         console.log("user gtante from IOS")
         
         flowLocation()
      }}
      
      if (Platform.OS === 'android')  {
        console.log("start ask to androis")
         
        requestLocationaPermission()
      
      }
    
    
  }

const requestLocationaPermission = async () => {
    setloadingcords(true)
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "تفعيل خدمات الموقع",
          message:
            " تطبيق امينه بحاجه الى منح الاذن للوصول الى الموقع " +
            "لخدمتك بشكل افضل "+
            "Alow Location  Aminh App to  access this divice ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location Android");
         flowLocation()
         console.log("You can use the location Android22");
      } else {
        console.log("location permission denied");
      }
    } catch (err) {
      console.log(err);
    }
  };

  
useEffect( async()=>{
    // requestPermissions()
    requestPermissions()
    //watchId.current=null
   

},[])
   
    
    useEffect( async()=>{
      
      const token = await setItem.getItem('BS:Token');

      api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
      const response= await api.get("/mothers/me").then((res)=>{
          return res.data
       }).finally(()=> console.log("finsh from mother profile") ).catch((err)=>{
        console.log("Erorr from fettch mother data",err)
         
       })
       //)
       console.log("fettch mother data",response)
      //get mother info
       setuserinfo(response)

       //get mother location

       console.log("cord",response.mother.location.coordinates[0],"  corddd2",response.mother.location.coordinates[1])
      
          
          MOTHERLOCATION=[{latitude:Number(response.mother.location.coordinates[0]),
                          longitude:Number(response.mother.location.coordinates[1]) }]
         SETTERLOCATION=[{latitude:Number(setterdata.location.coordinates[0]),
                          longitude:Number(setterdata.location.coordinates[1]) }]
          setgetloation(true)
       
       //  sw5cord(
      //   [{
      //     latitude:response.mother.location.coordinates[0],longitude:response.mother.location.coordinates[0]
      //   }]
      //   )

      //  setTimeout(()=>{
      //   console.log("cord",coordinates[0].latitude,"  corddd2",coordinates2)
      //  },[2000])

      // console.log("test Settter result.log ",SETTERLOCATION)
      // const userRegion = {
      //   latitude: MOTHERLOCATION[0].latitude,
      //   longitude: MOTHERLOCATION[0].longitude,
      //   // latitudeDelta:latitudeDelta,
      //   // longitudeDelta: latitudeDelta,
      // };
    //   const  edgePaddingValue=70
    //   let r = {
    //     latitude: 42.5,
    //     longitude: 15.2,
    //     latitudeDelta: 7.5,
    //     longitudeDelta: 7.5,
    // };
   // movTo(SETTERLOCATION)


      // Platform.OS==='android'?mapRef.current?.animateToRegion(userRegion, {
      //   edgePadding: {
      //     top: 100,
      //     right: 20,
      //     bottom: 20,
      //     left: 20,
      //   },
      //   animated: true,
      // }):
      
      // mapRef.current?.animateToRegion(userRegion,{
      //   r,
      //   animated: true,
      
      // })

     
     
    },[])
     
  
    const fitToCoordinatesTo=()=>{
      console.log("start fit cordnit in map view")
      const  edgePaddingValue=15
       
      mapRef.current?.fitToSuppliedMarkers(['mrk1','mrk2'],{ edgePadding: 
        {top: 120+edgePaddingValue,
          right: 20+edgePaddingValue,
          bottom: 20+edgePaddingValue,
          left: 20+edgePaddingValue}
  
      })
    }

    useEffect(()=>{
      console.log("useEffect + after  chang in time and distance ")
      
      fitToCoordinatesTo()
      const orderid=babysetter.orderid.substring(0, 5);
      console.log("test distanse",orderid)
      console.log("test distanse",Distance,"time",Time)
      
      

    },[Time,Distance])

    useEffect(()=>{
     //movTo()
     //getCamera()
     //logFrames()
     
    },[getlocatin])
    useEffect(()=>{
      setShowModal(true)
    },[])

    useEffect(
      () => props.navigation.addListener('beforeRemove', (e) => {
             watchId.current=null
           console.log('leave location' )
        }),
      [props.navigation,watchId]
    );

    const flowLocation =async()=>{
      console.log("startt get locaion for user");
      
      Geolocation.getCurrentPosition((pos)=>{
        
        const cords= {
          latitude:Number(pos.coords.latitude),
          longitude:Number(pos.coords.longitude)
        }

        if (pos){
          console.log("get possition for user ",pos.coords)
          setmotherLocation(cords)
         
          setlatitudeX(pos.coords.latitude)
          setlongitudeY(pos.coords.longitude)
          setoriginData(pos.coords)
          if(pos.timestamp >10){
            setloadingcords(false)
              console.log("loding finsh")
            setTimeout(()=>{
              
  
            },2500)
           
          }
        }
       
       
      },(error) => {
        // See error code charts below.
        setloadingcords(false)
        setErorrMsg(error.message)
        console.log("Erorr from wacth pos",error.code, error.message);
      },
      { 
        accuracy: {
          android: 'high',
          ios: 'best',
        },enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      )
    }
    

  
  const ReternScreeen=()=>{
    props.navigation.goBack()
    // var ss= moment(babysetter.start).diff( moment(), 'minutes')
    // console.log("test hours" ,moment(babysetter.start).format('hh:mm a') )
    // if(ss<= 60 || ss <= 0){
    //   watchId.current=null
    //   props.navigation.navigate('WorkScreen',{data1:babysetter,motherinfo:userinfo.mother.displayname})

    // }else{
    //   Alert.alert("تنبيه","لايمكن بداء الخدمه ال قبل الموعد بساعه")
    // }
    //props.navigation.navigate('WorkScreen',{data1:babysetter,motherinfo:userinfo.mother.displayname})
    
   }

   const showCode=(value)=>{
    modelShow()
    
    SetSecurtyCode(value.scurtycode)
   }

   const modelShow=()=>{
    setShowModal(!showModal)
     //console.log("time1",moment(time1).format('HH:MM a'))
 }
 const showMAp=()=>{
  setFullmap(!fullmapp)
  console.log(fullmapp)
 }


const onPlaceselect=()=>{
  const position={
    atitude:Number(setterdata.location.coordinates[0]),
    longitude:Number(setterdata.location.coordinates[1])
  }
  set(position)
  // movTo(position)
}

const goLocation=()=>{
  watchId.current=null
  props.navigation.navigate('Attractionuser',{motherloc:MOTHERLOCATION,seetterloc:SETTERLOCATION})

}
 
const GotoOpenMap = async (cords, label='نقطة الوصول') => {
  console.log("L ",cords.latitude,"lo ",cords.longitude)
  const Androidscheme = `${Platform.OS === 'ios' ? 'maps' : 'geo'}:0,0?q=`;  
  const scheme = `${Platform.OS === 'ios' ? 'https://www.google.com/maps/search/?api=1&query=' : 'geo'}`;  
  const link = Platform.select({
    //ios:`https://www.google.com/maps/@${cords.latitude},${cords.longitude},6z`, 
    //ios: `${scheme}${label}@${cords.latitude},${cords.longitude}`,
    ios: `${scheme}${cords.latitude},${cords.longitude}`,
    android: `${Androidscheme}${cords.latitude},${cords.longitude}(${label})`
  });
 
  try {
      const supported = await Linking.canOpenURL(link);

      if (supported) Linking.openURL(link);
  } catch (error) {
      console.log(error);
  }
}

const startService=()=>{
  setstartServiceStatus(true)
  
}
const preActivetedService=(id)=>{
  setActiveservice(true)
  //order now is start 
  makeOrderAcctive(id)
}

const ActivetedService=()=>{
  onClose()
  props.navigation.popToTop()
}

const makeOrderAcctive=async(ID)=>{
  const token = await setItem.getItem('BS:Token');
  api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
      await api.patch("/Activeorder",{
      orderId:ID,
      opt:true
    }).then((res)=>{
      console.log("response for acive ordder",res.data)
    
    }).catch((err)=>console.log('erorr:',err)
    )
}


return(
  <SafeAreaView>
    <View style={styles.container}>
    {!loadingcords?
      <MapView
                style={styles.map2}
                ref={mapRef}
                provider={PROVIDER_GOOGLE} 
                //pointerEvents={false}
                zoomEnabled={true}
                getMarkersFrames='true'
                //onRegionChange={(e)=>console.log("location change",e)}
                followsUserLocation={true}
                showsUserLocation={true}
                region={{
                  latitude: latitudeX,
                  longitude: longitudeY,
                  latitudeDelta: latDelta,
                  longitudeDelta: longDelta,
                }}
                >
                <MapViewDirections
                  origin={originData}
                  destination={SETTERLOCATION[0]}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={4}
                  strokeColor={Colors.amin1Button1}
                  //optimizeWaypoints={true}
                  onStart={params => {
                console.log(
                  `Started routing between "${params.origin}" and "${params.destination
                  }"${params.waypoints.length
                    ? ' using waypoints: ' + params.waypoints.join(', ')
                    : ''
                  }`,
                );
              }}
              mode={'DRIVING'}
              onReady={(result)=>{
                setDistance(Math.ceil(result.distance));
                setTime(Math.ceil(result.duration));
                setinfo( `المسافه" ${Distance} الوقت ${Time} `)
                setloading(true)
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: (Metrics.WIDTH / 10),
                    bottom: (Metrics.HEIGHT / 10),
                    left: (Metrics.WIDTH / 10),
                    top: (Metrics.HEIGHT / 10),
                  }
                });
              }}
              
              onError={errorMessage => {
                console.log("DIRCTION eroor",errorMessage);
              }}
              
              
            /> 

            <Marker coordinate={motherLocation} 
              pinColor={Colors.TexTPink}
              identifier={'mrk1'}
              key={Math.floor(1000 + Math.random() * 90000)} />
            <Marker coordinate={SETTERLOCATION[0]} 
                  key={Math.floor(1000 + Math.random() * 90000)} 
                  // image={Images.maplogo} style={{height:20,width:20}}
                  pinColor={Colors.AminaButtonNew}
                  title='التوجه الى موقع الحاضنه'
                  identifier={'mrk2'}
                  description={info}
                  //onCalloutPress={()=> openMap({ latitude: SETTERLOCATION[0].latitude, longitude: SETTERLOCATION[0].longitude })}
                  onCalloutPress={()=> openMap({ latitude: SETTERLOCATION[0].latitude, longitude: SETTERLOCATION[0].longitude }) }
                  >
                  <Callout
                    onPress={()=>GotoOpenMap({ latitude: SETTERLOCATION[0].latitude, longitude: SETTERLOCATION[0].longitude }) }
                    style={{width:Metrics.WIDTH*0.4322 , height:Metrics.HEIGHT*0.09212  ,alignItems:'center'}}>
                    <Text fontSize={18} color="black" textAlign={'center'}>التوجه الى موقع الحاضنه</Text>
                  </Callout>
                  </Marker>
            </MapView>:
            <Box> <Spinner size={'lg'} color={Colors.black} marginTop={Metrics.HEIGHT*0.07173} alignItems='center' />
            </Box>}

            <Actionsheet isOpen={true} onClose={onClose}>
            {Activeservice?
              <Actionsheet.Content>
                <Box alignItems={'center'} flexDirection={'column'}>
                  <Stack alignItems={'center'}>
                    <Image source={images.rightbinky} style={{height:120,width:120,padding:1,marginTop:7,marginBottom:2}} resizeMode='contain' />
                  </Stack>
                  <Stack  alignItems={'center'} mt={'5'} mb={'2'}>
                  <Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontSize={fontPixel(20) }color={Colors.textZahry} letterSpacing={1.2} fontWeight={'700'} >تم بدء الخدمة بنجاح</Text>
                  </Stack>
                  <Stack width={'96'}>
                    <CustomButton
                        buttonColor={Colors.AminaPinkButton}
                        title="عودة"
                        titleColor={Colors.white}
                        buttonStyle={{ width: '90%', alignSelf: 'center',borderRadius:20 }}
                        textStyle={{ fontSize: fontPixel(18) ,fontFamily:Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium }}
                        onPress={() => ActivetedService() }
                      />
                  </Stack>
                </Box>
            </Actionsheet.Content>:

            <Actionsheet.Content >
            <Box flexDirection='row' justifyContent='space-between' mb={'3'} >
              <Box flexDirection={'row'}   width={widthPixel(320)} >
                <Image  source={{uri:`${URL}/users/${babysetter.settterowner}/avatar`}}
                  style={{width:80 ,height:80,marginRight:2,borderRadius:44}} />
                <Stack flexDirection={'column'} marginLeft={'3'}>
                  <Stack flexDirection={'column'}  alignItems={'flex-start'}>
                    <Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontSize={fontPixel(18) }color={Colors.newTextClr} fontWeight={'700'}>{babysetter.settername}</Text>
                    <Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontSize={fontPixel(18)} color={"#FB5353"} >{babysetter.serviestype}</Text>
                  </Stack>
                  <Stack  flexDirection={'row'} >
                    <Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontSize={fontPixel(18) }color={Colors.newTextClr} >رقم الطلب</Text>
                    <Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontSize={fontPixel(18) }color={Colors.newTextClr}  >{ORDERID}</Text>
                  </Stack>
                </Stack>
              </Box>
            </Box>
              <Box alignItems={'baseline'} flexDirection={'column'}>
                <Stack flexDirection={'row'}justifyContent={'space-between'}  w={widthPixel(355)} ml={'3'}>
                  <Text>{moment(babysetter.starttime).format("hh:mm a")}</Text>
                  <Text>{moment(babysetter.endtime).format("hh:mm a")}</Text>
                </Stack>
                <HStack background={'#214F5E'} borderRadius={10}
                  mr="3" ml='3' w={widthPixel(356)} h={Metrics.HEIGHT * 0.0131}  
                />
              </Box>
            
            
            <Box>
                  {startServiceStatus?
                  <Box alignItems={'center'}>
                    <Stack  flexDirection={'column'} alignItems={'center'} justifyContent={'space-around'} mt={'3'}>
                      <Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontSize={fontPixel(18) }color={Colors.newTextClr} fontWeight={'700'}>الرجاء تزويد الحاضنة بكود الخدمة</Text>
                      <Text fontFamily={Platform.OS==='android'?Fonts.type.bold: Fonts.type.bold} fontSize={'5xl'}color={Colors.newTextClr} fontWeight={'700'} letterSpacing={'2xl'} >{babysetter.scurtycode}</Text>
                      <Stack width={'96'}>
                        <CustomButton
                          buttonColor={Colors.AminaPinkButton}
                          title="عودة"
                          titleColor={Colors.white}
                          buttonStyle={{ width: '90%', alignSelf: 'center',borderRadius:33 }}
                          textStyle={{ fontSize: fontPixel(18) ,fontFamily:Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium }}
                          onPress={() => preActivetedService(babysetter._id) }
                        />
                      
                      </Stack>
                    </Stack>
                  </Box>:
                  <Box flexDirection={'column'} alignItems={'center'}   w={Metrics.WIDTH * 0.840} justifyContent='center' ml='3' mr='4' mt={3}  >
                     {babysetter.serviestype === "حضانة منزلية" ?
                      <Box  w={Metrics.WIDTH * 0.840}>
                        <CustomButton
                        buttonColor={Colors.grayButton}
                        title="فتح خريطة الموقع"
                        titleColor={Colors.textZahry}
                        buttonStyle={{ width: '90%', alignSelf: 'center',borderRadius:33 }}
                        textStyle={{ fontSize: fontPixel(18) ,fontFamily:Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium}}
                        onPress={() => GotoOpenMap({ latitude: SETTERLOCATION[0].latitude, longitude: SETTERLOCATION[0].longitude })}
                        />
                        <CustomButton
                        buttonColor={Colors.AminaPinkButton}
                        title="بدء الخدمة"
                        titleColor={Colors.white}
                        buttonStyle={{ width: '90%', alignSelf: 'center',borderRadius:33 }}
                        textStyle={{ fontSize: fontPixel(18) ,fontFamily:Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium }}
                        onPress={() => startService() }
                        />
                      </Box>:
                      <Box alignItems={'center'} justifyContent={'space-around'}>
                        <Text fontFamily={Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular} fontSize={fontPixel(16)} color={Colors.newTextClr} ml={3} > الوقت المقدر لوصول الحاضنة بناد على موقعها</Text>
                        <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(14)} mt={4}>مسافة الطريق{Distance} km  و الوقت المتوقع للوصول {Time} دقيقه</Text>
                        <Stack width={'96'}>
                          <CustomButton
                          buttonColor={Colors.greentext}
                          title="الحاضنه وصلت"
                          titleColor={Colors.white}
                          buttonStyle={{ width: '90%', alignSelf: 'center',borderRadius:33 }}
                          textStyle={{ fontSize: fontPixel(18) ,fontFamily:Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium }}
                          onPress={() => startService() }
                          />
                          <CustomButton
                          buttonColor={Colors.AminaPinkButton}
                          title="رجوع"
                          titleColor={Colors.white}
                          buttonStyle={{ width: '90%', alignSelf: 'center',borderRadius:33 }}
                          textStyle={{ fontSize: fontPixel(18) ,fontFamily:Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium }}
                          onPress={() =>  props.navigation.popToTop() }
                          />
                        </Stack>
                      </Box>}

                 </Box>
                    
                   
                }
                
              </Box>
            </Actionsheet.Content>
            
            }
            
            </Actionsheet>
              



          
 
      
     
      
    
    
    </View>
   
  </SafeAreaView>
)

 }

 const styles = StyleSheet.create({
  container:{
    height:Metrics.HEIGHT,
    width:Metrics.WIDTH
  },
  container2: {
    ...StyleSheet.absoluteFillObject,
     height: Metrics.HEIGHT,
      width: Metrics.WIDTH,
      
  },
  map: {
      width:widthPixel(388),
      height:Metrics.HEIGHT*0.380
  },
  map2: {
    ...StyleSheet. absoluteFillObject,
    height: Metrics.HEIGHT*0.5342,
    width: Metrics.WIDTH,
    
  },
  leftText:{
    fontFamily:Fonts.type.base,
    fontSize:18,
    fontWeight:'400',
    padding:1
    
},
rightTex:{
    fontFamily:Fonts.type.base,
    fontSize:18,
    fontWeight:'400',
    textAlign:"left",
    backgroundColor:Colors.transparent,
   // width:Metrics.WIDTH*0.482,
    padding:2
    
}
})
export default DDirctionMap;

 



{/* <MapView
style={styles.map2}
ref={mapRef}
provider={PROVIDER_GOOGLE} 
//pointerEvents={false}
zoomEnabled={true}
getMarkersFrames='true'
//onRegionChange={(e)=>console.log("location change",e)}
followsUserLocation={true}
showsUserLocation={true}
region={{
  latitude: latitudeX,
  longitude: longitudeY,
  latitudeDelta: latDelta,
  longitudeDelta: longDelta,
}}
>
<MapViewDirections
  origin={originData}
  destination={SETTERLOCATION[0]}
  apikey={GOOGLE_MAPS_APIKEY}
  strokeWidth={4}
  strokeColor={Colors.amin1Button1}
  //optimizeWaypoints={true}
  onStart={params => {
console.log(
  `Started routing between "${params.origin}" and "${params.destination
  }"${params.waypoints.length
    ? ' using waypoints: ' + params.waypoints.join(', ')
    : ''
  }`,
);
}}
mode={'DRIVING'}
onReady={(result)=>{
setDistance(Math.ceil(result.distance));
setTime(Math.ceil(result.duration));
setinfo( `المسافه" ${Distance} الوقت ${Time} `)
setloading(true)
mapRef.current.fitToCoordinates(result.coordinates, {
  edgePadding: {
    right: (Metrics.WIDTH / 10),
    bottom: (Metrics.HEIGHT / 10),
    left: (Metrics.WIDTH / 10),
    top: (Metrics.HEIGHT / 10),
  }
});
}}

onError={errorMessage => {
console.log("DIRCTION eroor",errorMessage);
}}


/> 

<Marker coordinate={motherLocation} 
pinColor={Colors.TexTPink}
identifier={'mrk1'}
key={Math.floor(1000 + Math.random() * 90000)} />
<Marker coordinate={SETTERLOCATION[0]} 
  key={Math.floor(1000 + Math.random() * 90000)} 
  // image={Images.maplogo} style={{height:20,width:20}}
  pinColor={Colors.AminaButtonNew}
  title='التوجه الى موقع الحاضنه'
  identifier={'mrk2'}
  description={info}
  //onCalloutPress={()=> openMap({ latitude: SETTERLOCATION[0].latitude, longitude: SETTERLOCATION[0].longitude })}
  onCalloutPress={()=> openMap({ latitude: SETTERLOCATION[0].latitude, longitude: SETTERLOCATION[0].longitude }) }
  >
  <Callout
    onPress={()=>GotoOpenMap({ latitude: SETTERLOCATION[0].latitude, longitude: SETTERLOCATION[0].longitude }) }
    style={{width:Metrics.WIDTH*0.4322 , height:Metrics.HEIGHT*0.09212  ,alignItems:'center'}}>
    <Text fontSize={18} color="black" textAlign={'center'}>التوجه الى موقع الحاضنه</Text>
  </Callout>
  </Marker>
</MapView> */}