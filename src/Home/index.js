import React,{useContext,useEffect, useState,useRef,useMemo,useCallback} from 'react';
import {View,Text,Image, TouchableOpacity, Platform ,PermissionsAndroid,RefreshControl, Alert} from 'react-native';
import {Skeleton, StatusBar,VStack,Center, Box, Button ,FlatList, Stack, Heading,Input,Icon, Spinner} from 'native-base'
import { UserContext } from '../services/UserContext';
import api from '../services/api';
import { Fonts, Metrics,Colors, Images, fontPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel, heightPixel } from '../assets/Themes';
import styles from './styles';
import Geolocation  from 'react-native-geolocation-service';
import {Rating,AirbnbRating} from 'react-native-ratings' 
import setItem from '../services/storage'
import {URL_ws,URL} from '../services/links';
import io from "socket.io-client";
 import EvilIcons from 'react-native-vector-icons/EvilIcons'
 import Ionicons from 'react-native-vector-icons/Ionicons'
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import Sound from 'react-native-sound';
import OneSignal from 'react-native-onesignal';


page=0
//sound setting 
Sound.setCategory('Playback');
 var ding = new Sound(Platform.OS==='android'?'notification.mp3':"IphoneNotification.m4r", Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // when loaded successfully
  console.log('duration in seconds: ' + ding.getDuration() + 'number of channels: ' + ding.getNumberOfChannels());

});


const Home=(props)=>{
  const [services, setservices] = useState({})
  const [loading, setloding] = useState(false)
  const [loading2, setloding2] = useState(false)
  const [babseters, setbabseters] = useState([])
  const [change, setchange] = useState(false)
  const [itemnumber, setitemnumber] = useState(0)
  const [lemitsetters, setlimetsetter] = useState(10)
  const { setnotifaction, SOKITIOSetter } = useContext(UserContext);

  const [newSetter, setneswSetter] = useState(false)
  const [isFetching, setIsFetching] = useState(false);
  const[search,setsearch]=useState('')
  const socket = useRef(null);
  socket.current = SOKITIOSetter;

  useEffect( async() => {
      const user = await setItem.getItem('BS:User');
      const token = await setItem.getItem('BS:Token');
 
      const motherData=JSON.parse(user)
      const motherId=motherData._id
      const username= motherData.phone
      //start login useer to get notifacttion
      const data={
        "receiverid":motherId,"username":username,"token":JSON.parse(token) 
      }
       socket.current.emit("newuser",data)
    
    //test connection
    // socket.current.on("seconds",(msg)=>{
    //   console.log("test SOKET ping ",msg)
    // })
   

    //start  receve notifacttion from server 
    socket.current.on("newnotifaction",(response)=>{
       //console.log("start read  Notifctions ",response)
      setnotifaction(response)
      //palysound()
    })
      
    const userIdOsignal= OneSignal.getDeviceState().then(async(ID)=>{
      console.log("tets useer ID+__",ID.userId)
      const playerid=ID.userId

      await setItem.setItem('BS:playerid', JSON.stringify(playerid) );
      console.log("motther ID+__",motherId)
      
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      await api.patch(`mother/${motherId}`,{playerid:playerid}).then((res)=>{
        console.log("test upsate player ID++ for mother profile ",res.data)
      }).catch((err)=>{
        console.log("ERORR Upate profile",err)
      })
    })
   
    ///
  },[])
 
 
  //serch all setter by near location if user refresh list 
  useEffect( () => {
    setTimeout( async() => {
      const location = await setItem.getItem('BS:Location')
      let existLocation = JSON.parse(location)
      if (existLocation === null) {
        requestPermissions()
      } else {
      const coordinates = [existLocation.lat, existLocation.lon]
      setterSerchall(coordinates)
      }
    }, 4000);
    
  }, [newSetter]);


  //start load near setterr by location  
  useEffect(async () => {
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

  useEffect(() => {
    ding.setVolume(1);
    return () => {
      ding.release();
    };
  }, []);

 
    useEffect(async()=>{
        getallservice()
        console.log("Main services  from HOME service ",services)
        
       },[])

       const getallservice=async()=>{
        setloding(true)
        const response =await api.get(`/categories`).then((res)=>{
            setservices(res.data)
            setloding(false)
            return res;
            
        }).catch((error) => {
            if(error.message='Request failed with status code 404'){
            return  setstatuscode(404)
            }
        }) 
        
        api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
        console.log("result",response.data)

    }

     

  const fetchGeoPosition = async () => {
    const user = await setItem.getItem('BS:User');
    const token = await setItem.getItem('BS:Token');
    const limit=30 
    const skip=itemnumber
    Geolocation.getCurrentPosition(
      async (position) => {
        const coordinates = [position.coords.latitude, position.coords.longitude]
       console.log("COOOEDS from fetch poistion",coordinates)
        setterSerchall(coordinates)
        setloding2(false)
        setIsFetching(false)
        // api.defaults.headers.Authorization = (`Bearer ${JSON.parse(token)}`);
        // const response = await api.post(`setterlocationall?limit=${limit}&skip=${skip}`, { coordinates })
        //   .then((res) => {
        //     if (res.data) {
        //       setbabseters(res.data)
        //     }
        //   }).finally(() => setloding2(false))
        //   .catch(err => console.log("Erorr", err))

      },
      (error) => {
        // See error code charts below.
        Alert.alert("تنبيه", "الرجاء تفعيل خدمة الموقع  لديك",error)
        //console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
   
  }

  const  requestPermissions= async()=> {
    if (Platform.OS === 'ios') {
    const auth = await Geolocation.requestAuthorization("whenInUse");
    console.log("ask to IOS")
    if(auth === "granted") {
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

  const setterSerchall = async (coordinates) => {
    console.log("setterSerchall is location! from fuction ", coordinates)
    const user = await setItem.getItem('BS:User');
    const token = await setItem.getItem('BS:Token');
    const limit = 30
    const skip = itemnumber
    api.defaults.headers.Authorization = (`Bearer ${JSON.parse(token)}`);
    const response = await api.post(`setterlocationall?limit=${limit}&skip=${skip}`, { coordinates })
      .then((res) => {
        if (res.data) {
          setbabseters(res.data)
          setIsFetching(false)
        }
      })
      .finally(() => setloding2(false))
      .catch(err => console.log("Erorr setterSerchall fun", err))

      return response
  } 
    
  const onRefresh = React.useCallback(async () => {
    console.log("start refes")
    setIsFetching(true);
    const location = await setItem.getItem('BS:Location')
    let existLocation = JSON.parse(location)
    if (existLocation === null) {
      requestPermissions()
    } else{
      const coordinates = [existLocation.lat, existLocation.lon]
       setterSerchall(coordinates);
    }
   
   
  }, []);
 

  
  const Item = ({ setterdata }) => (
  
    <Box  borderColor={"#FFFFFF"} marginLeft={pixelSizeHorizontal(15)} marginTop={ 21}   paddingBottom={2} flexDirection={'row'} 
            width={widthPixel(388)} height={heightPixel(129)} backgroundColor={"#FFFFFF"}   >
      <Box>
        <Image source={{ uri: `${URL}/users/${setterdata.owner}/avatar` }} resizeMode='contain' style={{height:heightPixel(109),width:widthPixel(109),
           marginTop:pixelSizeVertical(6),marginRight:pixelSizeHorizontal(10),borderRadius:10 }} />
      </Box>
      <Box flexDirection={'column'}   width={Metrics.WIDTH*0.560} ml={pixelSizeHorizontal(20)} backgroundColor={Colors.transparent} marginTop={3} > 
          <Box flexDirection={'row'} justifyContent='space-between' alignItems={'baseline'} >
              <Stack flexDirection={'row'} justifyContent='space-around' >
                <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(16),color:Colors.newTextClr }}>{setterdata.name}</Text>
                <Text  style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(18),color:"#FB5353",marginLeft:pixelSizeHorizontal(4) }} >{setterdata.mainservice}</Text>
              </Stack>
               <Image source={Images.note} style={{width:widthPixel(20),height:heightPixel(20)}} resizeMode='contain'/>
          </Box>
          <Box flexDirection={'row'} justifyContent="space-between">
            <Stack flexDirection={'row'} >
              <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(10),color:Colors.newTextClr }}>{setterdata.hourstotal}</Text>
              <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(10),color:Colors.newTextClr ,marginLeft:pixelSizeHorizontal(2)}}>ساعة عمل</Text>
            </Stack>
            <Stack position={'relative'} bottom={1} >
              <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium,fontSize:fontPixel(10),color:Colors.rmadytext ,marginLeft:pixelSizeHorizontal(2)} }>حفظ  </Text>
            </Stack>
            
          </Box>

          <Box flexDirection={'row'} justifyContent="space-between" mt={1} >
            <Stack width={60} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={Colors.pinkystack}>
              <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(10),color:Colors.newTextClr }}>{setterdata.price} ر.س/ساعة</Text>
            </Stack>
            <Stack width={60} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={Colors.yellowstack} flexDirection='row'>
             <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(10),color:Colors.newTextClr }}>{setterdata.rate}</Text>
             <Image source={Images.starticon} style={{width:widthPixel(20),height:heightPixel(20)}} resizeMode='contain'/>

            </Stack>
           
            <TouchableOpacity onPress={() => props.navigation.navigate('Shrtcutprofile', { data1:setterdata, settertTitle: setterdata.name })}>
              <Stack width={60} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={Colors.pinkystack} flexDirection='row' >
              <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(10),color:Colors.newTextClr }}>احجزي الان</Text>
              </Stack>
            </TouchableOpacity>
            
              {/* <AirbnbRating
              // onFinishRating={(e)=>ratingCompleted(e)}
              style={{ paddingVertical: 1, backgroundColor: Colors.transparent }}
              count={5}
              //defaultRating={setterdata.rating ? Number(setterdata.rating)/5:0}
              imageSize={20}
              tintColor={"#E5E5E5"}
              showRating={false}
              size={8}  
              starContainerStyle={styles.ratingContainerStyle}
              isDisabled /> */}
          </Box>
      </Box>
      
      
      
    </Box>

  );

//main service data
const Req1=(val)=>{
  console.log("service id ",val)
  props.navigation.push('Fourm1',{productTitle: val.maineservice, serviceid:val._id ,serviceNmae:val.maineservice,orderId:val.order})
      
    
}

const myItemSeparator = () => {
      return (
        <View
         style={{ height: 1, backgroundColor: "gray", marginHorizontal:10 }}
        />
      );
};

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
  console.log("tets tesxt sserch homw",val)
    //props.navigation.navigate('SearchScreen',{text:search})
    props.navigation.navigate('SearchScreen',{text:val})
    //setserch(search)
    
  };

return(
  <View style={{ backgroundColor: Colors.AminabackgroundColor, marginTop: 0, flex: 1 }} >
    <StatusBar barStyle="light-content" backgroundColor={Colors.AminaButtonNew  } />
    <Box>
        <Input placeholder="ابحثي عن حاضنه" shadow={'2'}  width={widthPixel(377)} size={'xl'} borderRadius="10"  mt='3' ml={5} mr={5} borderWidth=".7"
         onChangeText={(text)=>setsearch(text)}  backgroundColor= {'#FFFFFF'} textAlign='right' borderColor={Platform.OS==='android'?"gray.100":'gray.200'}  fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.light} fontSize={fontPixel(14)}
         onSubmitEditing={(val)=> setterDataSubmit(val.nativeEvent.text) } InputLeftElement={<Icon ml="2" size="22" color="gray.400" as={<Ionicons name="ios-search" size={25} onPress={(val)=> setterDataSubmit(val.nativeEvent.text)} style={{padding:1}} color={"#B7B7B7"} />} />} />
        
    </Box>
    <Box flexDirection={'row'} alignItems={'center'} height={'141'} width="90%" marginLeft={pixelSizeHorizontal(22)} marginRight={pixelSizeHorizontal(22)} backgroundColor={Colors.bannerColor} marginTop={pixelSizeVertical(10)} borderRadius={20}>
        {/* <Text style={{ paddingTop: 20, fontWeight: Platform.OS === 'android' ? "300" : "700", fontFamily: Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.base, fontSize: 22, marginLeft: 5, marginBottom: 2 }} >اختر الخدمة</Text>
        <Text style={{ fontFamily: Platform.OS === 'android' ? Fonts.type.light : Fonts.type.light, fontSize: 18, marginBottom: 10 }}>الرجاء اختيار نوع الخدمه والبدء بانشاء طلبك</Text> */}
        <Box flex={2}>
          <Text style={{ fontFamily: Platform.OS === 'android' ? Fonts.type.medium : Fonts.type.medium, fontSize: fontPixel(24),textAlign:'left',color:"#F5F5F5",marginLeft:pixelSizeHorizontal(23)}}>أمينة على أطفالك</Text> 
        </Box>
        <Image source={Images.motherbanner} style={{height:141,flex:1.2,backgroundColor:Colors.transparent,marginRight:pixelSizeHorizontal(22) }} resizeMode='cover'  />
    </Box>


    <View style={{ backgroundColor: Colors.transparent, flexDirection: 'row',  marginTop:44}}>
      {services.length > 1 &&
        services.map((serv, index) => {
          return (

            <TouchableOpacity key={serv._id} style={{
                  backgroundColor: Colors.transparent, borderStyle: 'solid',
                  marginLeft: pixelSizeHorizontal(22)
                }} onPress={() => Req1(serv)}>
               
                <Box   flexDirection={'row'}   width={widthPixel(177)} height={heightPixel(77)}  >
                  <Box  justifyContent={'center'} alignItems='center' width={Metrics.WIDTH*0.253}  >
                    <Text style={{ fontSize: fontPixel(16),  fontFamily: Fonts.type.regular, color: Colors.newTextClr, margin: 3 }}>
                      {serv.maineservice}
                    </Text>
                    <Text style={{ fontSize: fontPixel(10),  fontFamily: Fonts.type.light, color:"#000000", }}>
                      {serv.maineservice==="حضانة منزلية"?"في منزل الحاضنه":"في منزل الاسرة"}
                    </Text>

                  </Box>
                  
                  <Box backgroundColor={Colors.AminaButtonNew} alignItems='center' justifyContent={'center'} borderRadius={20}   height={heightPixel(70)} width={widthPixel(70)} mr={pixelSizeHorizontal(1)} >
                    <Image source={index === 0 ? Images.babyicon : Images.homeicon} resizeMode='contain' style={{ height:heightPixel(34), width:widthPixel(34), backgroundColor: Colors.transparent,marginRight:pixelSizeHorizontal(2)  }} />
                  </Box>
                </Box>
            </TouchableOpacity>

          )
        })
      }
      {/* <Box>
          <Button onPress={()=> props.navigation.navigate('PaymentForm') }>chat</Button>
        </Box> */}
      {/* <TouchableOpacity style={{backgroundColor:Colors.amin1Button1,width:100,height:100}} >
          <TelerPage  />
        </TouchableOpacity> */}

    </View>
    <Box ml={pixelSizeHorizontal(15)} mt={pixelSizeVertical(20) }  >
      <Text style={{  alignSelf:'flex-start', fontFamily: Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular, fontSize:fontPixel(16)}}>الافضل لك </Text>
       
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
              {isFetching?<Spinner color={Colors.textZahry} size={'lg'}/>:
              <EvilIcons name='refresh' size={100} onPress={() => onRefresh()} style={{ alignItems: 'center' }} color={Colors.AminaButtonNew} />
              }
            
          </Box>}

        <FlatList
          data={babseters}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <Item setterdata={item} />}


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

      </Stack>
    }

  </View>

    
)
}
export default Home