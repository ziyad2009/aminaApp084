
import React, { useState, useRef, useEffect } from "react";
import Geolocation from 'react-native-geolocation-service';
import { StyleSheet, View, PermissionsAndroid,Image, Platform ,AppState, TouchableOpacity} from 'react-native'
import { Metrics, Colors, Fonts, Images, heightPixel, widthPixel } from "../assets/Themes/"
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Box, Button, Spinner ,Stack,Text} from "native-base";
import images from "../assets/Themes/Images";
 

const GOOGLE_MAPS_APIKEY = "AIzaSyBtKLEuD_50bKofX67ZV2hfLWvjPaY3aac";
 




const Attractionuser = (props) => {
  const mapRef = useRef(null);
  const appState = useRef(AppState.currentState);

  const [location, setLocation] = useState(null);
  const [startmottherlocation, settstartmotherlocation] = useState(false)
  const [Distance, setDistance] = useState(null)
  const{infourgroud,setinforground}=useState(false)
  const [Time, setTime] = useState(null)
  const [info, setinfo] = useState('')
  const [state, setstat] = useState({
    cruntloc: {},
    destnationloc: {}
  })

  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  let MOTHERLOCATION = props.route.params.motherloc
  const SETTERLOCATION = props.route.params.seetterloc

  
  const ASPECT_RATIO = Metrics.WIDTH / Metrics.HEIGHT;
  const latDelta = 0.13015
  const longDelta = 0.10121 * ASPECT_RATIO
  const watchId = useRef(null)


  useEffect(() => {
    requestPermissions()
  }, [])
 

  useEffect(() => {
    const intervval = setInterval(() => {
      requestPermissions()
    }, 4000)
    return () => {
      clearInterval(intervval)
    }

  }, [])

  useEffect(() => {
    if(infourgroud){ 
    const intervval = setInterval(() => {
      requestPermissions()
    }, 4000)
    return () => {
      clearInterval(intervval)
    }
  }

  }, [infourgroud])


  useEffect(() => {
     AppState.addEventListener("change", _handelappstate)

    return () => {
      AppState.addEventListener("change", _handelappstate)
    };
  }, []);


  useEffect(
    () => props.navigation.addListener('beforeRemove', (e) => {
      // watchId.current=null
      console.log('leave location')
    }),
    [props.navigation, watchId]
  );

  useEffect(
    () => props.navigation.addListener('beforeRemove', (e) => {
      watchId.current = null
      console.log('leave location')
    }),
    [props.navigation, watchId]
  ); 

  const _handelappstate=(nextAppState)=>{
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
      
    ) {
      console.log("App has come to the foreground!");
     
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
   
    // if(appState.current==='background'){
    //   setinforground(true)
    // }else{ setinforground(false)}
    const interval =setInterval(()=>{
      if(appState.current==='background'){
       requestPermissions()
      }
    },4000)
    return () => {
      clearInterval(interval)
    }
    
  }

  const onReady = (result) => {
    setDistance(Math.ceil(result.distance));
    setTime(Math.ceil(result.duration));
    setinfo(`المسافه" ${Distance} الوقت ${Time} `)

    console.log("ONready is done", Math.ceil(result.distance))
  }

  const requestPermissions = async () => {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization("whenInUse" || "always");
      if (auth === "granted") {
        getLocation()

      } else {
        console.log("user not gtante from IOS")
      }
    }

    if (Platform.OS === 'android') {
      console.log("start ask to androis")


      requestLocationPermission()

    }


  }

  const requestLocationPermission = async (props) => {

    try {

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === 'granted') {
        console.log('You can use Geolocation');
        getLocation()

      } else {
        console.log('You cannot use Geolocation');

      }
    } catch (err) {
      console.log("Erorr", err)
    }
  };

  // function to check permissions and get Location
  const getLocation = () => {

    watchId.current = Geolocation.getCurrentPosition(
      (position) => {
        console.log("Test pos=>", position);
        let data = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude)
        }
        console.log("Test pos2=>", data);
        setstat({ ...state, cruntloc: data, destnationloc: props.route.params.seetterloc })
        settstartmotherlocation(true)
      },
      (error) => {
        // See error code charts below.
        console.log("Erorr to gett locattion",error);
        settstartmotherlocation(false)
        
      }, {
      accuracy: {
        android: 'high',
        ios: 'best',
      }, enableHighAccuracy: true, timeout: 15000, maximumAge: 10000
    },
    );


  };




  const getCamera = async () => {
    const camera = await mapRef.current?.getCamera();
    console.log('current? camera', JSON.stringify(camera), [{ text: 'OK' }], {
      cancelable: true,
    });
  }
  const setCamera = async () => {
    const camera = await mapRef.current?.getCamera();
    // Note that we do not have to pass a full camera object to setCamera().
    // Similar to setState(), we can pass only the properties you like to change.
    mapRef.current?.setCamera({
      heading: camera.heading + 10,
    });
  }
  const animateCamera = async () => {
    const camera = await mapRef.current?.getCamera();
    const newCamera = {
      center: {
        latitude: state.cruntloc.latitude,
        longitude: state.cruntloc.longitude,
      },
      zoom: 25,
      heading: 0,
      pitch: 0,
      altitude: 5
    }
    mapRef.current?.animateCamera(newCamera, { duration: 2000 });
  }
  
  return (
    <View style={styles.container2}>
      {!startmottherlocation ?
        <Box marginTop={40} alignItems={'center'}>
          <Text fontFamily={Fonts.type.bold} fontSize={'lg'} marginTop={20} >جاري تحميل مكونات الخريطة..</Text>
          <Spinner size={'lg'} color={Colors.AminaButtonNew} style={{marginTop:10}} />
        </Box> :
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
            ...state.cruntloc,
          // latitude: MOTHERLOCATION[0].latitude,
          // longitude: MOTHERLOCATION[0].longitude,
          latitudeDelta: latDelta,
          longitudeDelta: longDelta,
        }}
        showsTraffic={true}

      >
        <MapViewDirections
          origin={state.cruntloc}
          destination={SETTERLOCATION[0]}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColor={Colors.blacktxt}
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
            setinfo(`المسافه" ${Distance} الوقت ${Time} `)
            console.log(`المسافه" ${Distance} الوقت ${Time} `)
            console.log(`tesst coord" `,result.coordinates)
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
            console.log("DIRCTION eroor", errorMessage);
          }}


        />

        <Marker.Animated coordinate={state.cruntloc}
          //pinColor={Colors.yellow}
          image={images.caricon}
          style={{width:10,height:10 }}
          
          rotation={33}
          identifier={'mrk1'}
          key={Math.floor(1000 + Math.random() * 90000)} />

        <Marker coordinate={SETTERLOCATION[0]}
          key={Math.floor(1000 + Math.random() * 90000)}
          // image={Images.maplogo} style={{height:20,width:20}}
          pinColor={Colors.AminaButtonNew}
          title='التوجه الى موقع الحاضنه'
          identifier={'mrk2'}
          description={"info"}
        // onCalloutPress={()=> openMap({ latitude: SETTERLOCATION[0].latitude, longitude: SETTERLOCATION[0].longitude })}

        >
           
        </Marker>

      </MapView>
    
    }

      
      <Box position={'absolute'} bottom={1}  flexDirection='row' backgroundColor={Colors.AminaPinkButton} borderRadius={22}
            justifyContent='space-around'  
            height={Metrics.HEIGHT*0.08211} width={Metrics.WIDTH*0.93473} marginLeft={2} marginRight={2}>

              <TouchableOpacity style={{backgroundColor:Colors.transparent ,alignItems:'center' ,marginTop:10,marginRight:2,
                          width:Metrics.WIDTH*0.2512,height:Metrics.HEIGHT*0.0511}} 
                  onPress={() => props.navigation.goBack()} >
                <Text fontFamily={Fonts.type.medium} fontSize={Fonts.moderateScale(15)}marginTop={3} color={Colors.white} >الرجوع</Text>
              </TouchableOpacity>
       

        <Stack borderColor={'black'}  marginTop={4} flexDirection={'row'}   >
          <Image source={Images.caricon2} resizeMode='contain' style={{height:heightPixel(22),width:widthPixel(22) }}  />
            <Stack flexDirection={'row'} marginTop={2}>
            <Text fontFamily={Fonts.type.medium} fontSize={Fonts.moderateScale(12)} color={Number(Distance)<=2 ?Colors.bloodOrange:Colors.white}  >  {Distance} km  </Text>
            <Text fontFamily={Fonts.type.medium} fontSize={Fonts.moderateScale(12)} color={Colors.white}  >  {Time} min</Text>

            </Stack>
          
        </Stack>
        <TouchableOpacity style={{backgroundColor:Colors.transparent ,alignItems:'center' ,marginTop:10,marginLeft:2,
                          width:Metrics.WIDTH*0.2512,height:Metrics.HEIGHT*0.0511}} 
                          onPress={() => animateCamera()} >
          <Text fontFamily={Fonts.type.medium} fontSize={Fonts.moderateScale(15)} color={Colors.white} marginTop={3} >تركيز</Text>
        </TouchableOpacity>
        
         

       
      </Box>

    </View>
  )
}


const styles = StyleSheet.create({
  container2: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignSelf: "center",
    marginBottom: 20,
    marginTop: 2,
    backgroundColor: Colors.white
  },

  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,

  },
  leftText: {
    fontFamily: Fonts.type.base,
    fontSize: 18,
    fontWeight: '400',
    padding: 1

  },
  rightTex: {
    fontFamily: Fonts.type.base,
    fontSize: 18,
    fontWeight: '400',
    textAlign: "left",
    backgroundColor: Colors.transparent,
    // width:Metrics.WIDTH*0.482,
    padding: 2

  }
})
export default Attractionuser;