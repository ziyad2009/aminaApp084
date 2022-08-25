import  React,{ useEffect, useState ,useRef} from 'react';
 
import { Spacer, VStack ,HStack,Avatar,Box,Text,Center,Button,Modal, Stack,Fab} from 'native-base';

import {View,StyleSheet, Platform, Alert} from 'react-native'
import MapView,{Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Feather from 'react-native-vector-icons/Feather'
 
import moment from 'moment' 
 import {Metrics,Colors,Fonts,Images} from '../assets/Themes/'
 
 import setItem from '../services/storage/'
import {URL } from '../services/links';
import api from '../services/api';
import CustomButton from '../services/buttons/buttton';

const GOOGLE_MAPS_APIKEY = "AIzaSyBtKLEuD_50bKofX67ZV2hfLWvjPaY3aac";


 const DDirctionMap =(props)=>{
  const babysetter=props.route.params.data1
  const ORDERID=props.route.params.data1.orderid.substring(0, 5)
 

  
    const [coordinates,sw5cord] = useState([
        {
          latitude: 24.4964011049956521,
          longitude: 39.610248372631446,
        }
       
      ]);
      const [coordinates2] = useState([
        {
          latitude:  24.494012912599302,
          longitude: 39.609486148526926,
        }
         
      ]);
      
      const[location,setlocation]=useState([
        {
          latitude:  24.501504274426775,
        longitude: 39.62894194086621
        }
      ])
     const [userinfo,setuserinfo]=useState([])
      const[Distance,setDistance]=useState(null)
      const [Time,setTime]=useState(null)
     const[showModal,setShowModal]=useState(false)
     const[securtyCode,SetSecurtyCode]=useState('')
     const[fullmapp,setFullmap]=useState(false)
      const[loading,setloading]=useState(false)

      const mapRef = useRef(null);

    //  const LATITUDE_DELTA = 0.08;
    //  const LONGITUDE_DELTA = LATITUDE_DELTA * (width /height );    
     

      const onReady = (result) => {
        setDistance(Math.ceil(result.distance));
        setTime(Math.ceil(result.duration));
    }

    useEffect( async()=>{
      const token = await setItem.getItem('BS:Token');
      api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
      const response= await api.get("/mothers/me").then((res)=>{
          return res.data
       }).finally(()=> setloading(true))
       //)
       console.log("test mother data",response)
       setuserinfo(response)
       console.log("cord",coordinates ,"  corddd2",coordinates2)
      //  setTimeout(()=>{
      //   console.log("cord",coordinates[0].latitude,"  corddd2",coordinates2)
      //  },[2000])


      const userRegion = {
        latitude: coordinates[0].latitude,
        longitude: coordinates[0].longitude,
        // latitudeDelta:latitudeDelta,
        // longitudeDelta: latitudeDelta,
      };
      mapRef.current?.animateToRegion(userRegion, {
        edgePadding: {
          top: 100,
          right: 20,
          bottom: 20,
          left: 20,
        },
        animated: true,
      });

    },[])


    useEffect(()=>{
      setLocationMother()
      const orderid=babysetter.orderid.substring(0, 5);
      console.log("test distanse",Distance,"time",Time)
      console.log("test distanse",orderid)
      
      

    },[Time,Distance])

    const setLocationMother= async()=>{
      const location= await setItem.getItem('BS:Location') 
      const  existLocation=JSON.parse(location)
      if(existLocation===null){
        Alert.alert("تنبيه","يحب عليك نحديث العنوان من صفحة حسابي")
        props.navigation.popToTop()
      }
      console.log("test location3 ",existLocation)
      sw5cord(
        [{
          latitude:existLocation.lat,longitude:existLocation.lon
        }]
        )

    }
   const ReternScreeen=()=>{
    //props.navigation.popToTop()
    var ss= moment(babysetter.start).diff( moment(), 'minutes')
  console.log("test hours",ss)
  if(ss<= 60 || ss <= 0){
    props.navigation.navigate('WorkScreen',{data1:babysetter,motherinfo:userinfo.mother.displayname})

  }else{
    Alert.alert("تنبيه","لايمكن بداء الخدمه ال قبل الموعد بساعه")
  }
    
   }

   const showCode=(value)=>{
    modelShow()
    console.log("Test codde",value.scurtycode)
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
const timeCalclutDiff=()=>{
  const startShiftTime = moment(babysetter.start, 'DD-MM-YYYY hh:mm:ss A');
  const endShiftTime = moment(babysetter.end, 'DD-MM-YYYY hh:mm:ss A');
  var ss= moment(babysetter.start).diff( moment(), 'minutes')
  console.log("test hours",ss)
 // const duration = moment.duration(endShiftTime.diff(startShiftTime));
}

return(
    <View style={styles.container2}>
     
     <MapView
          style={styles.map}
          ref={mapRef}
          pointerEvents={false}
          initialRegion={{
            latitude: coordinates[0].latitude,
            longitude: coordinates[0].longitude,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.1121,
          }}>
             <MapViewDirections
            origin={coordinates[0]}
            destination={coordinates2[0]}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor={Colors.amin1Button1}
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
            onReady={onReady}
            
            onError={errorMessage => {
              console.log("DIRCTION eroor",errorMessage);
            }}
            
            
          /> 
          
          <Marker coordinate={coordinates[0]} />
          <Marker coordinate={coordinates2[0]} />
          </MapView>
        
      
      
       {!fullmapp&&
       <View style={{width:Metrics.WIDTH*0.833}} >
        <Box    flexDirection='row'  mt={4} mb={1}  >

       <HStack justifyContent='flex-start' w={Metrics.WIDTH*0.877}  >
        <Avatar bg='white' source={{
             uri:`${URL}/users/${babysetter.settterowner}/avatar` }}
            ml='5' size={'lg'} />
             
            <HStack flexDirection={'column'} alignItems='flex-start' ml={4}    >
            <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} fontSize={22} fontWeight='bold'  mt="3">{babysetter.settername}</Text>
            <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} fontSize={18} fontWeight='light'>{babysetter.serviestype}</Text>
            <VStack flexDirection={'row'}>
            <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} fontSize={18} fontWeight='light'>رقم الطلب</Text>
            <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} fontSize={18} fontWeight='light' ml={3} >{ORDERID}</Text>
            </VStack>
            </HStack>

            <Spacer />
        </HStack> 
       
       
        <Box  marginRight='100'>
          <Feather name='mail'  color={"#00ABB9"}  size={28} style={{margin:2}}/>
        </Box>

        </Box>
        
        <Box flexDirection={'row'} alignItems="baseline" mt={2} mb={3}>
          <Text ml="2">{moment(babysetter.start).format("hh:mm a")}</Text>
          <HStack background={'#00ABB9'}  borderRadius={10} 
            mr="3" ml='3' w={Metrics.WIDTH*0.6531} h={Metrics.HEIGHT*0.0131} mt={5} /> 
            <Text>{moment(babysetter.end).format("hh:mm a")}</Text>
        </Box>
        
            <VStack flexDirection={'row'}>
                
                    <Box alignItems={'center'} w={Metrics.WIDTH*0.461} ml='3' mr='4' mt={1} rounded='lg'>
                        {/* <Button bgColor={Colors.AminaButtonNew} size={'lg'} mb='1.5' w='full'
                            onPress={() => {ReternScreeen() }}> صفحة بداء الخدمة</Button> */}
                            
                            <CustomButton
                              buttonColor={Colors.AminaButtonNew}
                              title="صفحة بداء الخدمة"
                              buttonStyle={{width: '90%', alignSelf: 'center'}}
                              textStyle={{fontSize: 15}}
                              onPress={() => ReternScreeen() }
                                />
                        </Box>
                
                
                
                    <Box alignItems={'center'} w={Metrics.WIDTH*0.401} ml='3' mr='4' mt={1}   >
                            {/* <Button bgColor={Colors.AminaButtonNew} size={'lg'} mb='1.5' w='full'
                                onPress={() => {showCode(babysetter) }}>كود بداء الخدمة</Button> */}
                              <CustomButton
                              buttonColor={Colors.AminaButtonNew}
                              title="كود بداء الخدمة"
                              buttonStyle={{width: '90%', alignSelf: 'center'}}
                              textStyle={{fontSize: 15}}
                              onPress={() => showCode(babysetter)  }
                                />
                                
                                {/* <CustomButton
                              buttonColor={Colors.AminaButtonNew}
                              title="كود   الخدمة"
                              buttonStyle={{width: '90%', alignSelf: 'center'}}
                              textStyle={{fontSize: 15}}
                              onPress={() => timeCalclutDiff()  }
                                /> */}
                    </Box>
                
                
                
                        
                
            </VStack>
        </View>}
        <Center>

          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content width={Metrics.WIDTH } >
          <Modal.CloseButton p={3}/>
          <Modal.Header>
              
          </Modal.Header>
          <Modal.Body alignItems={'center'}  mt={1} borderColor='white'>
          
              <Text fontFamily={Fonts.type.aminafonts} fontSize={33}  textAlign={'center'} >كود الخدمه</Text>
              <Text fontFamily={Fonts.type.aminafonts} fontSize={25} letterSpacing={2} textAlign={'center'} >{babysetter.scurtycode}</Text>
              
          </Modal.Body>
          
          <Modal.Footer alignItems={'center'} justifyContent='center'>
          <Text fontFamily={Fonts.type.aminafonts} fontSize={18} letterSpacing={2}  color='warning.500' textAlign={'center'} >الرجاد عدم ابراز الكود الا للحاضنه فققط</Text>
          <Box alignItems={'center'} w={Metrics.WIDTH*0.834} ml='3' mr='4' mt={5} rounded='lg'>   
                      
                      <CustomButton
                              buttonColor={Colors.AminaButtonNew}
                              title="اغلاق"
                              buttonStyle={{width: '90%', alignSelf: 'center'}}
                              textStyle={{fontSize: 15}}
                              onPress={()  => modelShow()  }
                                />
              </Box> 
            
          </Modal.Footer>
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
      // justifyContent: 'center',
      // alignItems: 'center',
      // alignSelf: "center",
      marginBottom: 20,
      marginTop:2,
      backgroundColor:Colors.white
  },
  map: {

      height:Metrics.HEIGHT*0.631
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


{/* <Marker  coordinate={coordinates[0]} image={Images.maplogo}/>
        <Marker  coordinate={coordinates2[0]}  />
        <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates2[0]}
          apikey={GOOGLE_MAPS_APIKEY} // insert your API Key here
          strokeWidth={3}
          strokeColor={Colors.amin1Button1}
          optimizeWaypoints={true}
          onStart={(params) => {
            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
          }}
          mode={'DRIVING'}
          onReady={onReady}
          
        />   */}









      //   <MapView
      //     showsTraffic
      //     style={fullmapp?styles.map2: styles.map}
      //     zoomEnabled={true}
      //     scrollEnabled={true}
      //     showsScale={true}
      //     minZoomLevel={0}  // default => 0
      //     maxZoomLevel={20} // default => 20
      //     initialRegion={{
      //     latitude: coordinates[0].latitude,
      //     longitude: coordinates[0].longitude,
      //     latitudeDelta: 0.015,
      //     longitudeDelta: 0.0121,
      //   }}>
      //     <MapViewDirections
      //                       origin={coordinates[0]}
      //                       destination={coordinates2[0]}
      //                       apikey={GOOGLE_MAPS_APIKEY}
      //                       strokeWidth={4}
      //                       strokeColor={'red'}
      //                       mode={'DRIVING'}
      //                       onReady={onReady}
      //                   />
      //                   <Marker
      //                       coordinate={coordinates[0]}
      //                       title=''
      //                       description=''
      //                   />
      //                   <Marker
      //                       coordinate={coordinates2[0]}
      //                       title=''
      //                       description=''
      //                   />

        
         
        
     
      // </MapView>