import  React,{ useEffect, useState ,useRef} from 'react';
 
import { Spacer, VStack ,HStack,Avatar,Box,Text,Center,Button,Modal, Stack,Fab, Spinner} from 'native-base';

import {View,StyleSheet, Platform, Alert,PermissionsAndroid,Linking,Image, TouchableOpacity} from 'react-native'
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
 

  
    const [coordinates,setcoordinates] = useState(null)
        
       
      const[location,setlocation]=useState([
        {
          latitude:  24.501504274426775,
        longitude: 39.62894194086621
        }
      ])

      const[getlocatin,setgetloation]=useState(false)

       
    
      const[ motherLocation,setmotherLocation]=useState([])
     const [userinfo,setuserinfo]=useState([])
      const[Distance,setDistance]=useState(null)
      const [Time,setTime]=useState(null)
      const[info,setinfo]=useState('')
     const[showModal,setShowModal]=useState(false)
     const[onmoveto,setonmoveto]=useState(null)
     const[securtyCode,SetSecurtyCode]=useState('')
     const[fullmapp,setFullmap]=useState(false)
      const[loading,setloading]=useState(false)

      const mapRef = useRef(null);
      const watchId = useRef(null)
    //  const LATITUDE_DELTA = 0.08;
    //  const LONGITUDE_DELTA = LATITUDE_DELTA * (width /height );  
    const ASPECT_RATIO = Metrics.WIDTH / Metrics.HEIGHT;  
    const latDelta= 0.13015  
    const longDelta=0.10121*ASPECT_RATIO
 
    const  requestPermissions= async()=> {
       
      
      if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization("whenInUse");
      if(auth === "granted") {
         // do something if granted...
         console.log("user gtante from IOS")
         console.log("start get locaton")
         flowLocation()
      }}
      
      if (Platform.OS === 'android')  {
        console.log("start ask to androis")
         
        requestLocationaPermission()
      
      }
    
    
  }

  const requestLocationaPermission = async () => {
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
    
  },[])
   
    
    useEffect( async()=>{
      
      const token = await setItem.getItem('BS:Token');
      api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
      const response= await api.get("/mothers/me").then((res)=>{
          return res.data
       }).finally(()=> setloading(true))
       //)
       console.log("123-",response)
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

      console.log("test Settter result.log ",SETTERLOCATION)
      const userRegion = {
        latitude: MOTHERLOCATION[0].latitude,
        longitude: MOTHERLOCATION[0].longitude,
        // latitudeDelta:latitudeDelta,
        // longitudeDelta: latitudeDelta,
      };
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
      console.log("sstartt fitcordinat")
      const  edgePaddingValue=15
       
      mapRef.current?.fitToSuppliedMarkers(['mrk1','mrk2'],{ edgePadding: 
        {top: 120+edgePaddingValue,
          right: 20+edgePaddingValue,
          bottom: 20+edgePaddingValue,
          left: 20+edgePaddingValue}
  
      })
        
       
      // mapRef.current?.fitToCoordinates(SETTERLOCATION,{edgePadding} )
      


    }

    useEffect(()=>{
      console.log("ia m 22222|")
      setLocationMother()
      fitToCoordinatesTo()
      const orderid=babysetter.orderid.substring(0, 5);
      console.log("test distanse",Distance,"time",Time)
      console.log("test distanse",orderid)
      
      

    },[Time,Distance])

    useEffect(()=>{
     //movTo()
     //getCamera()
     //logFrames()
     
    },[getlocatin])
    

    useEffect(
      () => props.navigation.addListener('beforeRemove', (e) => {
             watchId.current=null
           console.log('leave location' )
        }),
      [props.navigation,watchId]
    );

    const flowLocation =()=>{
      console.log("startt wacth locaion");
      watchId.current =Geolocation.watchPosition((pos)=>{
        const cords={
          latitude:pos.coords.altitude,
          longitude:pos.coords.latitude
        }
        console.log("TTest locaion",cords);
        setcoordinates(cords)
       
      },(error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { 
        accuracy: {
          android: 'high',
          ios: 'best',
        },enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      )
    }
    const setLocationMother= async()=>{
      const location= await setItem.getItem('BS:Location') 
      const  existLocation=JSON.parse(location)
      if(existLocation===null){
        Alert.alert("تنبيه","يحب عليك نحديث العنوان من صفحة حسابي")
        props.navigation.popToTop()
      }
      console.log("test location3 ",existLocation)
       

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
  console.log(cords.latitude)
  const scheme = `${Platform.OS === 'ios' ? 'maps' : 'geo'}:0,0?q=`;  
  const link = Platform.select({
      ios: `${scheme}${label}@${cords.latitude},${cords.longitude}`,
      android: `${scheme}${cords.latitude},${cords.longitude}(${label})`
  });

  try {
      const supported = await Linking.canOpenURL(link);

      if (supported) Linking.openURL(link);
  } catch (error) {
      console.log(error);
  }
}



return(
    <View style={styles.container2}>
      <Box  width={widthPixel(388)}  height={heightPixel(456)} backgroundColor={'white'} ml={2} mt={'24'} >
       {/* infoboxe */}
        <Box flexDirection='row' justifyContent='space-between'   mb={7} >
          <Box flexDirection={'row'}   width={widthPixel(260)}  >s
            <Image  source={{uri:`${URL}/users/${babysetter.settterowner}/avatar`}}
              style={{width:70 ,height:70,marginRight:2}} />
            <Stack flexDirection={'column'} alignItems='flex-start' ml={3} >
              <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16) }color={Colors.newTextClr}  mt="3">{babysetter.settername}</Text>
              <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16)} color={"#FB5353"} >{babysetter.serviestype}</Text>
            </Stack>
          </Box>
          
          <Box  flexDirection={'row'} >
            <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16) }color={Colors.newTextClr} mt={3} >رقم الطلب</Text>
              <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16) }color={Colors.newTextClr} mt={3}  >{ORDERID}</Text>
            {/* <Feather name='mail'  color={"#00ABB9"}  onPress={ props.navigation.navigate('Attractionuser',{data1:babysetter,motherinfo:userinfo.mother.displayname}) } size={28} style={{margin:2}}/> */}
            {/* <Feather name='mail'  color={"#00ABB9"}  onPress={ ()=> console.log("test") } size={28} style={{margin:2}}/> */}
            
            {/* <TouchableOpacity style={{ marginRight: 22 }} onPress={()=>GotoOpenMap({ latitude: SETTERLOCATION[0].latitude, longitude: SETTERLOCATION[0].longitude }) }>
              <Image source={Images.golocation} style={{ width: 44, height: 44 }} resizeMode='contain' />
            </TouchableOpacity > */}
            
            {/* <FontAwesome name='location-arrow'  color={"#00ABB9"}  onPress={ ()=> GotoOpenMap({ latitude: SETTERLOCATION[0].latitude, longitude: SETTERLOCATION[0].longitude }) } size={28} style={{margin:2}}/> 
            <AntDesign name='car' color={"#00ABB9"} size={28} style={{ margin: 2 }}
              onPress={() => goLocation()} /> */}
          </Box>

      </Box>
      
      {getlocatin?
    <MapView
     style={styles.map}
      ref={mapRef}
      provider={PROVIDER_GOOGLE} 
      //pointerEvents={false}
      zoomEnabled={true}
      getMarkersFrames='true'
      //onRegionChange={(e)=>console.log("location change",e)}
      followsUserLocation={true}
     showsUserLocation={true}
     region={{
       latitude: MOTHERLOCATION[0].latitude,
       longitude: MOTHERLOCATION[0].longitude,
       latitudeDelta: latDelta,
       longitudeDelta: longDelta,
     }}
     >
        <MapViewDirections
       origin={MOTHERLOCATION[0]}
       destination={SETTERLOCATION[0]}
       apikey={GOOGLE_MAPS_APIKEY}
       strokeWidth={4}
       strokeColor={Colors.amin1Button1}
       optimizeWaypoints={true}
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

        mapRef.current.fitToCoordinates(result.coordinates, {
          edgePadding: {
            right: (Metrics.WIDTH / 20),
            bottom: (Metrics.HEIGHT / 20),
            left: (Metrics.WIDTH / 20),
            top: (Metrics.HEIGHT / 20),
          }
        });
       }}
       
       onError={errorMessage => {
         console.log("DIRCTION eroor",errorMessage);
       }}
       
       
     /> 
     
     <Marker coordinate={MOTHERLOCATION[0]} 
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
     <Box marginTop={Metrics.HEIGHT*0.4321}>
     <Spinner size={'lg'} color={Colors.AminaButtonNew} marginTop={Metrics.HEIGHT*0.07173} alignItems='center' />
     </Box>
     
    }
    </Box>

    <Box flexDirection={"column"} alignItems="baseline" mt={5} mb={4}>
      {babysetter.serviestype==="حضانة منزلية"?
      <Stack>
        <TouchableOpacity onPress={()=>getlocatin(true)}>
          <Stack flexDirection={'row'} alignItems='baseline'>
            <Image  source={images.locationblack} style={{width:11 ,height:16,marginRight:2}} />
            <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16) }color={Colors.newTextClr} ml={3} >للتوجه للحاضنة المنزلية</Text>
          </Stack>
        </TouchableOpacity>
      </Stack>:
      <Stack>
        <TouchableOpacity onPress={()=> setShowModal(true)}>
          <Stack flexDirection={'row'} alignItems='baseline'>
            <Image  source={images.caricon2} style={{width:20 ,height:20,marginRight:2}} />
            <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16) }color={Colors.newTextClr} ml={3} >لمعرفة الوقت المقدر لوصول الحاضنة</Text>
          </Stack>
        </TouchableOpacity>
      </Stack>}
      
      <HStack background={'#214F5E'}  borderRadius={10} 
            mr="3" ml='3' w={widthPixel(356)} h={Metrics.HEIGHT*0.0131} mt={5} /> 
            
      </Box>
      <Box  flexDirection={'row'}   width={Metrics.WIDTH*0.932}  >
          <CountdownTimer targetDate={moment(babysetter.start).valueOf()}/>
      </Box>
      <Box>

      <Box flexDirection={'row'}  justifyContent='space-between'>

      <Box alignItems={'center'} w={Metrics.WIDTH} rounded='lg'>
          {/* <Button bgColor={Colors.AminaButtonNew} size={'lg'} mb='1.5' w='full'
                            onPress={() => {ReternScreeen() }}> صفحة بداء الخدمة</Button> */}
          <CustomButton
            buttonColor={Colors.AminaPinkButton}
            title="الرجوع للخلف"
            buttonStyle={{ width: '90%', alignSelf: 'center' }}
            textStyle={{ fontSize: 15 }}
            onPress={() => ReternScreeen()}
          />
        </Box> 
        </Box>


      </Box>
      <Center >

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} borderColor={Colors.AminaButtonNew} borderWidth='1'>
      <Modal.Content width={Metrics.WIDTH*0.9372 } >
      <Modal.Body alignItems={'center'} justifyContent='center' >
      
      <Box alignItems={'center'} >
            <Stack backgroundColor={Colors.transparent} borderRadius={22} mt={5} p={10}>
              <Image source={Images.samilogo} style={{width:200,height:200}} resizeMode='contain' />
            </Stack>
            <Stack  mt={5}>
              <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(17)}  >الوقت المتوقع لوصول الحاضنه من الموقع</Text> 
            </Stack>
            <Stack backgroundColor={Colors.transparent}>
              <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(14)} mt={4}>مسافة الطريق{Distance} km  و الوقت المتوقع للوصول {Time} دقيقه</Text>
            </Stack>
            
            <Stack flexDirection={'row'} alignItems={'center'}   w={Metrics.WIDTH * 0.840} justifyContent='center' ml='3' mr='4' mt={3}  >
                  <CustomButton
                    buttonColor={Colors.AminaPinkButton}
                    title="رجوع"
                    buttonStyle={{ width: '90%', alignSelf: 'center',borderRadius:10 }}
                    textStyle={{ fontSize: fontPixel(18) ,fontFamily:Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium }}
                    onPress={() => setShowModal(false) }
                  />
                 
                
            </Stack>
          </Box>
          
      </Modal.Body>
      
      </Modal.Content>
      </Modal>
      </Center>


                  
    </View>

)

 }

 const styles = StyleSheet.create({
  container2: {
      height: Metrics.HEIGHT,
      width: Metrics.WIDTH,
      flex:1,
      flexDirection:'column',
       justifyContent: 'center',
       alignItems: 'center',
      // alignSelf: "center",
      marginBottom: 20,
      // marginTop:2,
      backgroundColor:Colors.AminabackgroundColor
  },
  map: {
      width:widthPixel(388),
      height:Metrics.HEIGHT*0.380
  },
  map2: {
    flex:1,
     ...StyleSheet. absoluteFillObject,
      
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

 