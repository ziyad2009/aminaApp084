import React, { useContext, useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, Platform, PermissionsAndroid, RefreshControl, Alert, Linking } from 'react-native';
import { Skeleton, StatusBar, VStack, Center, Box, Button, FlatList, Stack, Heading, Input, Icon, Spinner, Spacer,Modal } from 'native-base'
import { UserContext } from '../services/UserContext';
import api from '../services/api';
import { Fonts, Metrics, Colors, Images, fontPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel, heightPixel } from '../assets/Themes';
import styles from './styles';
import Geolocation from 'react-native-geolocation-service';

import setItem from '../services/storage'
import { URL_ws, URL } from '../services/links';
import io from "socket.io-client";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Sound from 'react-native-sound';
import OneSignal from 'react-native-onesignal';
import { getDistance, convertDistance } from 'geolib';
import DeviceInfo from 'react-native-device-info';
import {RemoteDataSetExample} from './autocompleate'
import appsFlyer from 'react-native-appsflyer';
import {SliderBox} from './components/SliderBox';
import FastImage from 'react-native-fast-image';
import Disprofile from '../services/utils/disprofile';
import notifee, { EventType ,AuthorizationStatus} from '@notifee/react-native';

page = 0
//sound setting 
Sound.setCategory('Playback');
var ding = new Sound(Platform.OS === 'android' ? 'notification.mp3' : "IphoneNotification.m4r", Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // when loaded successfully
  console.log('duration in seconds: ' + ding.getDuration() + 'number of channels: ' + ding.getNumberOfChannels());

});

let myloc = null
let MOTHERID = null



var onInstallConversionDataCanceller = appsFlyer.onInstallConversionData(
  (res) => {
      if (JSON.parse(res.data.is_first_launch) == true) {
          if (res.data.af_status === 'Non-organic') {
              var media_source = res.data.media_source;
              var campaign = res.data.campaign;
              console.log('This is first launch and a Non-Organic install. Media source: ' + media_source + ' Campaign: ' + campaign);
          } else if (res.data.af_status === 'Organic') {
              console.log('This is first launch and a Organic Install');
          }
      } else {
          console.log('This is not first launch');
      }
  },
);


 var onAppOpenAttributionCanceller =()=>{
   appsFlyer.onAppOpenAttribution((res) => {
  console.log("appsFlyer  onAppOpenAttribution ",res);
});
}


   // AppsFlyer initialization flow. ends with initSdk.
   appsFlyer.initSdk(
    {
      devKey: 'zvsFgDrB4ZqMP8N92apjrU',
      isDebug: true, // set to true if you want to see data in the logs 
      appId: '1642193505', // iOS app id
      onInstallConversionDataListener: true,
      timeToWaitForATTUserAuthorization: 10,
      onDeepLinkListener: true,
    },
    (result) => {
      console.log("Test aap flayer2 from HOME ",result);
    },
    (error) => {
      console.error("Test aap flayer  Erorr",error);
    }
  );


const Home = (props) => {
  const [services, setservices] = useState({})
  const [loading, setloding] = useState(false)
  const [loading2, setloding2] = useState(false)
  const [babseters, setbabseters] = useState([])
  const [itemnumber, setitemnumber] = useState(0)
  const [lemitsetters, setlimetsetter] = useState(10)
  const { setnotifaction, SOKITIOSetter } = useContext(UserContext);

  const [newSetter, setneswSetter] = useState(false)
  const [isFetching, setIsFetching] = useState(false);
  const [search, setsearch] = useState('')
  const [selectedItem, setSelectedItem] = useState(null);
  const {getnotfctionstatuse,getnotfctionstring,getnotfeeStause} = useContext(UserContext);
  const socket = useRef(null);
  socket.current = SOKITIOSetter;



  const sendEventToappsFlyer=()=>{
    console.log("starrt send event ")
    const eventName = "af_login";
    const eventValues = {
      af_success: "af_success",
       
    };
    appsFlyer.logEvent(
      eventName,
      eventValues,
      (res) => {
        console.log("appsFlyer event Test",res);
      },
      (err) => {
        console.error("appsFlyer Error Event",err);
      }
    );
  
  }
  const sendEvent2=()=>{
    const eventName2 = 'af_add_to_cart';
      const eventValues2 = {
        af_content_id: 'id123',
        af_currency: 'SAR',
        af_revenue: '2',
      };

      appsFlyer.logEvent(
        eventName2,
        eventValues2,
        (res) => {
          console.log("Send to cart evvvent",res);
        },
        (err) => {
          console.error("Errorr=>cart evvvent",err);
        }
      );

  }

  const sendEvent3=()=>{
    appsFlyer.getAppsFlyerUID((err, appsFlyerUID) => {
      if (err) {
        console.error("Erorr=>getAppsFlyerUID  ",err);
      } else {
        console.log('on getAppsFlyerUID: ' + appsFlyerUID);
      }
    });
  }


useEffect(() => {
  return notifee.onForegroundEvent(({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log('User dismissed notification home', detail.notification);
        break;
      case EventType.PRESS:
        console.log('User pressed notification Home', detail.notification);
         
        props.navigation.navigate('Notifactionscreen', detail.notification)
        break;
    }
  });
}, []);

      
  useEffect(() => {
    return () => {
        // Optionaly remove listeners for deep link data if you no longer need them after componentWillUnmount
        if (onInstallConversionDataCanceller) {
          onInstallConversionDataCanceller();
          console.log('unregister onInstallConversionDataCanceller');
          onInstallConversionDataCanceller = null;
        }
        if (onAppOpenAttributionCanceller) {
          onAppOpenAttributionCanceller();
          console.log('unregister onAppOpenAttributionCanceller');
          onAppOpenAttributionCanceller = null;
        }
    };
});
 


  useEffect(async () => {
  
    const user = await setItem.getItem('BS:User');
    const token = await setItem.getItem('BS:Token');

    const motherData = JSON.parse(user)
    const motherId = motherData._id
    const username = motherData.phone
    //start login useer to get notifacttion
    const data = {
      "receiverid": motherId, "username": username, "token": JSON.parse(token)
    }
    socket.current.emit("newuser", data)

    //test connection
    // socket.current.on("seconds",(msg)=>{
    //   console.log("test SOKET ping ",msg)
    // })


    //start  receve notifacttion from server 
    socket.current.on("newnotifaction", (response) => {
      //console.log("start read  Notifctions ",response)
      notifee.setBadgeCount(response).then(() => console.log('Badge count set!'));
      setnotifaction(response)
      //palysound()
    })

    // const userIdOsignal= OneSignal.getDeviceState().then(async(ID)=>{
    //   console.log("tets useer ID+__+++",ID)
    //   const playerid=(ID.userId)
    //   await setItem.setItem('BS:playerid', JSON.stringify(playerid) );
    //   api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    //   await api.patch(`mother/${motherId}`,{playerid:playerid}).then((res)=>{
    //     console.log("test upsate player ID++ for mother profile ",res.data)
    //   }).catch((err)=>{
    //     console.log("ERORR Upate profile",err)
    //   })
    // })

    var fcmToken = await setItem.getItem("@FCMTOKEN")
    var newToken = fcmToken
    getnotfctionstring(newToken)
    await api.patch(`mother/${motherId}`, { playerid: newToken }).then((res) => {
      //  console.log("test Update player ID++ for mother profile ", res.data)
      }).catch((err) => {
        console.log("ERORR Upate profile +++", err)
      })


    if (fcmToken = !null) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      //console.log("test new token from Mothers", newToken)
      appsFlyer.updateServerUninstallToken(newToken,(success)=>{
        console.log("token firbase update inappsFlyer ",success)
      })
    }


  }, [])

//check version of App
useEffect(async () => {
  
     sendEventToappsFlyer()

}, [])

  //serch all setter by near location if user ### Refresh list ###
  useEffect(() => {
    setTimeout(async () => {
      const location = await setItem.getItem('BS:Location')
      let existLocation = JSON.parse(location)
      if (existLocation === null) {
        requestPermissions()
      } else {
        const coordinates = [existLocation.lat, existLocation.lon]
        myloc = [existLocation.lat, existLocation.lon]
        setterSerchall(coordinates)
      }
    }, 4000);

  }, [newSetter]);



  useEffect(async () => {
    //start load near setterr by location  fron prev asynstorage location
    setloding2(true)
    const location = await setItem.getItem('BS:Location')
    let existLocation = JSON.parse(location)
    if (existLocation === null) {
      requestPermissions()
    } else {
      const coordinates = [existLocation.lat, existLocation.lon]
      setterSerchall(coordinates)
    }

  }, []);

  // sound  leavel volume
  useEffect(() => {
    ding.setVolume(1);
    return () => {
      ding.release();
    };
  }, []);



  useEffect(async () => {
    getallservice()
  }, [])

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      const user = await setItem.getItem('BS:User');
      const token = await setItem.getItem('BS:Token');
      const motherData = JSON.parse(user)
      const motherId = motherData._id
      const username = motherData.phone
      //start login useer to get notifacttion
      const data = {
        "id": motherId, "name": username
      }
      // socket.current.emit("login",data)

      // socket.current.on("userlogin",(msg)=>{
      //     console.log("test SOKET ping ",msg)
      // })
      socket.current.on("eventnow", (msg) => {
        console.log("new setter log in ", msg)
      })

    });
    return unsubscribe;
  }, []);
 
 



  const getallservice = async () => {
    //start load catogries from backend
    setloding(true)
    const response = await api.get(`/categories`).then((res) => {
      setservices(res.data)
      setloding(false)
      return res;

    }).catch((error) => {
      if (error.message = 'Request failed with status code 404') {
        return Alert.alert("تنبيه", "الرجاء التاكد من خدمة الانترنت لديك")
      }
    })
  }

  const fetchGeoPosition = async () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const coordinates = [position.coords.latitude, position.coords.longitude]
        //start search near setter according to location
        setterSerchall(coordinates)
        setloding2(false)
        setIsFetching(false)
      },
      (error) => {
        // See error code charts below.
        Alert.alert("تنبيه", "الرجاء تفعيل خدمة الموقع  لديك", error)
        //console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

  }

  const requestPermissions = async () => {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization("whenInUse");
      console.log(" start ask to IOS")
      if (auth === "granted") {
        fetchGeoPosition()
      }
    }

    if (Platform.OS === 'android') {
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
            "لخدمتك بشكل افضل " +
            "Alow Location  Aminh App to  access this divice ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("  location granted by Android");
        fetchGeoPosition()
      } else {
        console.log("location permission denied");
        Alert.alert("تنبيه", "الرجاء تفعيل خدمة الموقع واعادة تسشغيل التطبيق")
      }
    } catch (err) {
      console.log("Erorr from requestLocationaPermission", err);
    }
  };

  const setterSerchall = async (coordinates) => {
    //console.log("setterSerchall is location! from fuction ", coordinates)
    const user = await setItem.getItem('BS:User');
    const token = await setItem.getItem('BS:Token');
    const limit = 30
    const skip = itemnumber
    api.defaults.headers.Authorization = (`Bearer ${JSON.parse(token)}`);
    const response = await api.post(`setterlocationall?limit=${limit}&skip=${skip}`, { coordinates })
      .then((res) => {
        if (res.data) {
          //console.log("ErRRRRR",res.data)
          setbabseters(res.data)
          setIsFetching(false)
        }
      })
      .finally(() => setloding2(false))
      .catch(err => console.log("Erorr setterSerchall fun", err))

    return response
  }

  const onRefresh = React.useCallback(async () => {
    setIsFetching(true);
    const location = await setItem.getItem('BS:Location')
    let existLocation = JSON.parse(location)
    if (existLocation === null) {
      requestPermissions()
    } else {
      const coordinates = [existLocation.lat, existLocation.lon]

      setterSerchall(coordinates);
    }
  }, []);


  const calcDistance = (locat) => {
    let myLoca = { latitude: myloc[0], longitude: myloc[1] }
    let setteerloc = { latitude: locat.coordinates[0], longitude: locat.coordinates[1] }
    let distance = getDistance(myLoca, setteerloc, 1000)
    let distatnkm = convertDistance(distance, "km")

    if (distance <= 1000) {
      return <Text style={{ fontFamily: Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular, fontSize: fontPixel(12), color: Colors.newTextClr, marginLeft: 5 }}>{distance} M</Text>
    } else {
      return <Text style={{ fontFamily: Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular, fontSize: fontPixel(12), color: Colors.newTextClr, marginLeft: 5 }}>{distatnkm} KM</Text>
    }

  } 

  const movToProfileScreen = (setterdata, settername) => {
    //block reservion from it self 
    if (MOTHERID === setterdata._id) {
      return Alert.alert("امينة", "عفوا لايمكنك اتمام عملية الحجز لنفس  الحاضنة")
    }
    props.navigation.navigate('Shrtcutprofile', { data1: setterdata, settertTitle: settername })
  }

  const movToProfileScreen2 = async(servData) => {
    const location = await setItem.getItem('BS:Location')
    let existLocation = JSON.parse(location)
    if (existLocation === null) {
      return Alert.alert("تطبيق امينة","الرجاد تحديث عنوانك من صفحة البرفايل")
    }else{
        //Main block reservion 
        const  OrderData={
          mainservice:servData.maineservice,
          serviestype: servData.maineservice==="حضانة منزلية"?"حاضنة":"حاضنة",
          order:servData.order
        }
        
        props.navigation.navigate('Babysetesrs',{ setterdata: JSON.stringify(OrderData) })

    }

  }

  const Item = ({ setterdata }) => (
     <TouchableOpacity style={{alignItems:'center', marginTop:1}} onPress={()=>movToProfileScreen(setterdata, setterdata.name) } >
       <Disprofile data={setterdata} width={Metrics.WIDTH*0.79273}  height={Metrics.HEIGHT*0.321} movScreen={()=>movToProfileScreen(setterdata, setterdata.name) }/>
     </TouchableOpacity>
     
   
    )
 
  
  const palysound = () => {
    ding.setVolume(1)
    ding.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  }
  const setterDataSubmit = (val) => {
    //console.log("tets tesxt sserch homw",val)
    //props.navigation.navigate('SearchScreen',{text:search})
    props.navigation.navigate('SearchScreen', { text: val })
    //setserch(search)

  };
  const slideImages=[
    // 'https://res.cloudinary.com/di6ghy1su/image/upload/v1697850567/amina/intro3_cozmlp.png',
    'https://res.cloudinary.com/di6ghy1su/image/upload/v1697850875/amina/AdobeStock_73114024_dnoeqq.jpg',
    'https://res.cloudinary.com/di6ghy1su/image/upload/v1697850958/amina/vdnnosi423ava7s6rdte.jpg',
    'https://res.cloudinary.com/djzx0zqms/image/upload/v1700915125/slideScreeen/mother1_nlmukj.jpg',
    'https://res.cloudinary.com/djzx0zqms/image/upload/v1700915125/slideScreeen/mother2_wi7fre.jpg',
    'https://res.cloudinary.com/djzx0zqms/image/upload/v1700915125/slideScreeen/mother3_ian968.jpg',
    require('../assets/images/motherbanner.png')
  ]

  return (
    <View style={{ backgroundColor: Colors.AminabackgroundColor, marginTop: 0, flex: 1 }} >
      <StatusBar barStyle="light-content" backgroundColor={Colors.AminaButtonNew} />
       
      <Box mb={'1'} mt={'1'} alignItems={'center'}>
         <RemoteDataSetExample props={props}/>
      </Box>
      
      <SliderBox
          ImageComponent={FastImage}
          images={slideImages}
          sliderBoxHeight={160}
          onCurrentImagePressed={index =>
            console.warn(`image ${index} pressed`)
          }
          
          //currentImageEmitter={index => console.warn(`image ${index} pressed`)}
          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
          paginationBoxVerticalPadding={20}
          paginationBoxStyle={{
            position: 'absolute',
            bottom: 0,
            padding: 0,
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            padding: 0,
            margin: 0,
            backgroundColor: 'rgba(128, 128, 128, 0.92)',
          }}
          autoplay
          circleLoop
          ImageComponentStyle={{borderRadius: 15, width: '88%', marginTop: 5}}
          imageLoadingColor="#2196F3"
        />
      <Box alignItems={'center'} alignContent={'center'} mt={'2'}>
      <Text style={{ fontSize: fontPixel(22), fontFamily: Fonts.type.bold, color: Colors.AminaButtonNew  }}>
         اختاري طلبك
      </Text>
      </Box>
      
     <Box backgroundColor={Colors.transparent} flexDirection={'row'} mt={'3'} ml={Metrics.WIDTH*0.17600}   width={Metrics.WIDTH * 0.62852} 
                   display={'flex'} height={Metrics.HEIGHT * 0.152994} justifyContent={'space-around'} borderTopLeftRadius={'2xl'} borderTopRightRadius={'2xl'}  >
        {services.length > 1 &&
          services.map((serv, index) => {
            return (
              <TouchableOpacity key={serv._id} style={{
                  backgroundColor:index === 1 ? Colors.AminaButtonNew:"rgba(239, 239, 239, 1)",borderRadius:44,borderColor:Colors.transparent,borderWidth:1,
                  alignItems:'center',alignContent:'center', 
                }} onPress={() => movToProfileScreen2(serv)}>
                  <Box flexDirection={'column'} width={widthPixel(146)} height={widthPixel(166)} alignItems={'center'} alignContent={'center'} >
                    <Stack backgroundColor={index === 1 ?Colors.AminaButtonNew:"rgba(239, 239, 239, 1)"} alignItems='center' justifyContent={'center'} borderTopRightRadius={20} borderTopLeftRadius={20} 
                          borderBottomRightRadius={20} borderBottomLeftRadius={20} height={'20'} width={'20'}  >
                      <Image source={index === 1 ? Images.babyiconnew : Images.homeiconnew} resizeMode='contain' style={{ height: heightPixel(59), width: widthPixel(58), backgroundColor: Colors.transparent, marginTop:3  }} />
                    </Stack>
                    <Stack justifyContent={'center'} alignItems='center' width={Metrics.WIDTH * 0.253}  >
                      <Text style={{ fontSize: fontPixel(16), fontFamily: Fonts.type.regular, color:index === 1 ?"rgba(255, 255, 255, 1)": Colors.AminaButtonNew, margin: 3 }}>
                        {serv.maineservice}
                      </Text>
                    </Stack>
                  </Box>
              </TouchableOpacity>

            )
          })
        }
        
      </Box>
      <Box ml={4} mt={'3'}  >
        <Text style={{ alignSelf: 'center', fontFamily: Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold, fontSize: fontPixel(16),fontWeight:'700',color:"rgba(244, 128, 147, 1)" }}>الافضل لك </Text>

      </Box>
      {loading2 ?
        <Center w="100%" >
          <VStack w="90%" maxW="400" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
            borderColor: "coolGray.500"
          }} _light={{ borderColor: "coolGray.200" }}>
            <Skeleton h="40" />
            <Skeleton.Text px="4" />
            <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
          </VStack>
        </Center> :
        <Stack>
          {babseters.length < 1 &&
            <Box width={Metrics.WIDTH} height={Metrics.HEIGHT * 0.121}
             mt={10} padding={1}
              alignItems={'center'}>
              {isFetching ? <Spinner color={Colors.textZahry} size={'lg'} /> :
                <EvilIcons name='refresh' size={100} onPress={() => onRefresh()} style={{ alignItems: 'center' }} color={Colors.AminaButtonNew} />
              }

            </Box>}
          <Box h={'64'}>
            <FlatList
              data={babseters}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => <Item setterdata={item} />}
              scrollEnabled

              // ItemSeparatorComponent={myItemSeparator}
              horizontal={false}
              refreshControl={
                <RefreshControl
                  refreshing={isFetching}
                  onRefresh={onRefresh}

                />}
              //refreshing={isFetching}
              onEndReachedThreshold={0.5}

              onEndReached={() => setneswSetter(true)}

            />
          </Box>

        </Stack>
      }
       
    </View>


  )
}
export default Home


///code for distanse
//<Stack flexDirection={'row'} justifyContent={'space-around'} >
{/* <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(10),color:Colors.newTextClr }}>{setterdata.hourstotal}</Text>
              <Text style={{fontFamily:Platform.OS=={{='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(10),color:Colors.newTextClr ,marginLeft:pixelSizeHorizontal(2)}}>ساعة عمل</Text> */}
// <Image source={images.distance} style={{width:20,height:20}} resizeMode='contain'/>
{/* <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(10),color:Colors.newTextClr }}>{setterdata.age}</Text> */ }
{/* {calcDistance(setterdata.location) } */ }
             // {myloc===null?<Spinner color={Colors.newTextClr} size={'sm'} style={{marginLeft:5}} />:   <Box>{calcDistance(setterdata.location) }</Box>}
           //  </Stack>