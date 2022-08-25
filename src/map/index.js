
import React, { useState, useEffect,useRef } from 'react';
import {StyleSheet,PermissionsAndroid, Alert, View, Platform} from 'react-native'
import { Box, Stack, Button,Text ,Center,Fab,Icon,HStack,CheckIcon,Modal,Heading} from 'native-base';
import Geolocation  from 'react-native-geolocation-service';
import MapView,{PROVIDER_GOOGLE,Marker}from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign'
import setItem from '../services/storage/'
import api from '../services/api';
import CustomButton from '../services/buttons/buttton';
import {Colors,Metrics,Fonts} from '../assets/Themes/'
 

const Mapscreen = ({ route ,navigation}) => {
   const[arraydata,setarraydata]=useState([])
    const [user_latitude, setUserLatitude] = useState(0)
    const [user_longitude, setUserLongitude] = useState(0)
    const [latitudeDelta,setlatitudeDelta]=useState(0)
    const [longitudeDelta,setlongitudeDelta]=useState(0)
    const [position_error, setPositionError] = useState(null)
    const[disableButton,setdisableButton]=useState(true)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ location, setLocation ] = useState(null);
    const [loaded, setLoaded] = useState(false)
    const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [locationDialog, setLocationDialog] = useState(true);
  const [useLocationManager, setUseLocationManager] = useState(false);
  const  [ShowModal,setShowModal]=useState(false)
   
  const mapRef = useRef(null);
    useEffect(async() => {
      const location= await setItem.getItem('BS:Location') 
    let  existLocation=JSON.parse(location)
   if(existLocation===null){
      
      requestPermissions()
   }else{
    fetchGeoPosition()
   }
        
   },[isLoading] );

      useEffect(()=>{

        const userRegion = {
          latitude: user_latitude,
          longitude: user_longitude,
          latitudeDelta:latitudeDelta,
          longitudeDelta: latitudeDelta,
        };
        mapRef.current?.animateToRegion(userRegion);

      },[isLoading])
        
     const  requestPermissions= async()=> {
        console.log("ASk permmeesion ")
        if (Platform.OS === 'android'){
          console.log("ASk Android ")
        }

        if (Platform.OS === 'ios') {
        const auth = await Geolocation.requestAuthorization("whenInUse");
        if(auth === "granted") {
           // do something if granted...
           console.log("user gtante from IOS")
           console.log("start get locaton")
           fetchGeoPosition()
        }}
        
        if (Platform.OS === 'android')  {
          console.log("ask to androis")
           
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
          console.log("You can use the location");
           fetchGeoPosition()
        } else {
          console.log("location permission denied");
        }
      } catch (err) {
        console.log(err);
      }
    };
    

    const fetchGeoPosition = () => {
       Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          setUserLatitude(position.coords.latitude);
          setUserLongitude(position.coords.longitude);
          setPositionError(null);
          setIsLoading(false)
          console.log('Location Accessed',position.coords)
        },
        (error) => {
          // See error code charts below.
          //Alert.alert("تنبيه","الرجاء تفعيل خدمة الموقع  لديك")
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  
      
      // let isActive = true;
      //   navigator.geolocation.getCurrentPosition(
      //   position => { 
      //     if (isActive){
      //     setUserLatitude(position.coords.latitude);
      //     setUserLongitude(position.coords.longitude);
      //     setPositionError(null);
      //     console.log('Location Accessed')
      //   } 
      //   setIsLoading(false)

      // }, 

      // error => isActive && setPositionError(error.message),
      // {enableHighAccuracy: true, timeout: 0, maximumAge: 1000} 
      // ); 
    }
    const saveData=()=>{
      //console.log("tetst latuted",user_latitude)
      const coords={latitude:user_latitude,longitude:user_longitude,latitudeDelta:latitudeDelta,longitudeDelta:longitudeDelta}
      return setarraydata({...arraydata,
        coords
      })
      setShowModal(false)
       // setTimeout(()=>{
      //   gScreen()
      //   //navigation.navigate('List',{data:arraydata})
      // },1000)
     // console.log("tetst latuted",coords)
      
    }

    const saveLocation =async ()=>{
     saveData()
    const user=  await setItem.getItem('BS:User')
      const token=await setItem.getItem('BS:Token') 
      const newuser=  await  JSON.parse(user)    
      console.log('START NOW ',JSON.parse(token))

      const latd= user_latitude
      const  lond= user_longitude
 
      console.log('START NOW id',token) 
      
      try{ 
       // api.defaults.headers.Authorization = `Bearer ${token}`;
        api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        const response =await api.post(`/motheraddres`,  {
          lat:latd,
          lon:lond,
        });

        console.log('START test API ',response.data.features[0].properties)
        if(response){
               await setItem.setItem('BS:Location', JSON.stringify(response.data.features[0].properties));
                 
        }
        }catch(err){
          console.log('START Erorr',err) 
        }
        navigation.goBack()
       // const response =await api.post(`/motheraddres`,  {
      //     lat:latd,
      //     lon:lond,
        
      // }).then((res)=>{
      //     return res
      // }).catch((error) => {
      //     if(error.message='Request failed with status code 404'){
      //         //setstatuscode(404)
      //         console.log("404")
      //     }
      //     console.log("Erorr from location ",error)
      // })
      // console.log("test code result",response)

      // await setItem.setItem('prevlocation',arraydata);

      
    }
    const prepareSreen=()=>{
      saveData() 
        Alert.alert(
          "Amina App",
          "هل تريد اضافة موقعك الحالي بشكل دائم",
          [
            {
              text: "حفظ",
              onPress: () => saveLocation()
            },
            {
              text: "الغاء",
              onPress: () => navigation.goBack(),
              style: "cancel"
            },
            { text: "الاستمرار", onPress: ()=> saveLocation() }
          ],
          { cancelable: false }
        );
      
    }

    const getMylocation=(value)=>{
      //console.log("Map data",value)
      setUserLatitude(value.latitude);
      setUserLongitude(value.longitude);
      setlatitudeDelta(value.latitudeDelta)
      setlongitudeDelta(value.longitudeDelta)
      
    }
     

  return(

    <View style={styles.container}>
    
       <MapView
            ref={mapRef}
           style={styles.map}
           initialRegion={{
            latitude: user_latitude,
            longitude: user_longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
         }}
        
         
         onRegionChange={(e)=> getMylocation(e)}
        //  showsMyLocationButton
        //  zoomEnabled={true}
        //  scrollEnabled={true}
        //  showsScale={true}
           >
    <Marker
        coordinate={{
            latitude: user_latitude,
            longitude: user_longitude,
            error: position_error,
          }}
        title='Flatiron School Atlanta'
        description='This is where the magic happens!'
     >
     </Marker >
   
     </MapView>
          <View style={{position:'absolute',bottom:2,right:10,height:30,width:30}}>
             
          <View style={{position:'absolute',right:10,bottom:20,}} >
            <View  style={{width:Metrics.WIDTH * 0.21}} >
              <AntDesign name='enviromento' size={50} color={Colors.amin1Button1}  onPress={()=>setShowModal(true)} />
            {/* <Fab renderInPortal={false} shadow={4} size='sm'   
             colorScheme='fuchsia' icon={<Icon color={Colors.amin1Button1} as={AntDesign} name="enviromento" size="25" />} 
               onPress={()=>prepareSreen()}/> */}
              
            </View>
          </View> 
         
          </View>
     
    
          <Center >

            <Modal isOpen={ShowModal} onClose={() => setShowModal(false)} borderColor={Colors.AminaButtonNew} borderWidth='1'>
            <Modal.Content width={Metrics.WIDTH*0.9372 } >
            <Modal.CloseButton padding={3} mt='2' mb={'2'} />
            <Modal.Header alignItems={'center'} backgroundColor={Colors.amin1Button1}>
            <Heading fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.base}  >رسالة تنبيه</Heading>
            </Modal.Header> 
            <Modal.Body alignItems={'center'} justifyContent='center' >

            <Stack flexDirection={"column"} alignItems='flex-start'   w="95%" padding={2}   >
              <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} fontSize={22} fontWeight='bold' >
               لكي نتمكن من خدمتك بشكل افضل سوف يتم حفظ موقعك بشكل دائم</Text>
            </Stack>

            </Modal.Body>
            <Modal.Footer alignItems={'center'}>
               
                <Box alignItems={'center'}  w={Metrics.WIDTH*0.834} ml='3' mr='4' mt={5} rounded='lg'>
                <CustomButton
                  buttonColor={Colors.AminaButtonNew}
                  title="استمرار"
                  buttonStyle={{width: '90%', alignSelf: 'center',marginTop:1}}
                  textStyle={{fontSize: 20}}
                  onPress={() => saveLocation()}
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
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Mapscreen;

{/* <Center>
      <Box height="20" w="20" shadow="2" rounded="lg" _dark={{
      bg: "coolGray.200:alpha.20"
    }} _light={{
      bg: "coolGray.200:alpha.20"
    }}>
        <Fab renderToHardwareTextureAndroid={false} shadow={2} size="sm" icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />} 
        onPress={()=>gScreen()}/>
      </Box>
      </Center> */}