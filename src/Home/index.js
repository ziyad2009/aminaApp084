import React,{useContext,useEffect, useState,useRef,useMemo,useCallback} from 'react';
import {View,Text,Image, TouchableOpacity, Platform ,PermissionsAndroid,ScrollView, Alert} from 'react-native';
import {Skeleton, StatusBar,VStack,Center, Box, Button ,FlatList, Stack} from 'native-base'
import { UserContext } from '../services/UserContext';
import api from '../services/api';
import { Fonts, Metrics,Colors, Images } from '../assets/Themes';
import styles from './styles';
import Geolocation  from 'react-native-geolocation-service';
import {Rating,AirbnbRating} from 'react-native-ratings' 
 
import setItem from '../services/storage'
import {URL_ws,URL} from '../services/links';
import io from "socket.io-client";
import BottomSheet, {
  BottomSheetView
} from '@gorhom/bottom-sheet';
import Sound from 'react-native-sound';

 page=0

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
    const [services,setservices]=useState({})
    const [loading,setloding]=useState(false)
    const [loading2,setloding2]=useState(false)
    const [babseters,setbabseters]=useState([])
    const [change,setchange]=useState(false)
    const [itemnumber,setitemnumber]=useState(0)
    const[lemitsetters,setlimetsetter]=useState(10)
    const {setnotifaction,SOKITIOSetter} = useContext(UserContext);
    
    const[newSetter,setneswSetter]=useState(false)
    const [isFetching, setIsFetching] = useState(false);


    const socket = useRef(null);
    socket.current =SOKITIOSetter;
    // ref
    const bottomSheetRef = useRef(<BottomSheet />|| null );
  
    // variables
    const snapPoints =  ['25%','33%','50%']
    //open
    const [isOpen,setIsopen]=useState(true)
  
    // callbacks
    // const handleSheetChanges = useCallback((index: number) => {
    //   console.log('handleSheetChanges', index);
    //  }, []);

    const initialSnapPoints = useMemo(() => ['25%', 'CONTENT_HEIGHT'], []);

    useEffect( async() => {
     
      
      const user = await setItem.getItem('BS:User');
      const token = await setItem.getItem('BS:Token');
     
      const motherData=JSON.parse(user)
      const motherId=motherData._id
      const username= motherData.phone
      const data={
        "receiverid":motherId,"username":username,"token":JSON.parse(token) 
      }
     // socket.current = io(URL_ws);
      socket.current.emit("newuser",data)
      socket.current.on("welcomeuser",msg=>{
        console.log("start login",msg)
      })

      socket.current.on('connection',(data)=>{
        console.log("test SOKET",data)
       },{})

    // socket.current.on("seconds",(msg)=>{
    //   console.log("test SOKET ping ",msg)
    // })
   

    socket.current.on('userlogin',(data)=>{
      console.log("new login from setter",data)
     // setneswSetter(true)
    })

    socket.current.on("newnotifaction",(response)=>{
       console.log("start read  Notifctions ",response)
      setnotifaction(response)
     // setItem.setItem("notifaction",response)
      //palysound()
    })
    
    ///
  },[])

  //serch all setter by near location
  useEffect( async() => {
    setTimeout(() => {
      console.log('start upddate seteeers array')
      setterSerchall()
    }, 4000);
    
  }, [newSetter]);

  useEffect(() => {
    ding.setVolume(1);
    return () => {
      ding.release();
    };
  }, []);


  useEffect( async() => {
    setloding2(true)
    const location= await setItem.getItem('BS:Location') 
    let  existLocation=JSON.parse(location)
   if(existLocation===null){
      requestPermissions()
   }else{
            console.log("test location3 ",existLocation)
            const user = await setItem.getItem('BS:User');
            const token = await setItem.getItem('BS:Token');
            const  coordinates=[ existLocation.lat,existLocation.lon]
            const limit=lemitsetters
            const skip=itemnumber
            api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
            const response =await api.post(`setterlocationall?limit=${limit}&skip=${skip}`,{coordinates}).then((res)=>{
                if(res.data){
                setbabseters(res.data)
                console.log("get ",coordinates)
                
                }
              }).finally(()=> setloding2(false)).catch(err=>console.log("Erorr",err))

   }
   
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

     

    const fetchGeoPosition = async() => {
      const user = await setItem.getItem('BS:User');
      const token = await setItem.getItem('BS:Token');
      Geolocation.getCurrentPosition(
         async (position) =>   {
         console.log(position);
         
         console.log('Location Accessed',position.coords)

         const  coordinates=[ position.coords.latitude,position.coords.longitude]
         api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
         const response =await api.post('setterlocationall',{coordinates}).then((res)=>{
            if(res.data){
             setbabseters(res.data)
             console.log("get ",coordinates)
            
            }
           }).finally(()=> setloding2(false)).catch(err=>console.log("Erorr",err))

       },
       (error) => {
         // See error code charts below.
         Alert.alert("تنبيه","الرجاء تفعيل خدمة الموقع  لديك")
         console.log(error.code, error.message);
       },
       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
   );
  }

  const  requestPermissions= async()=> {
    console.log("ASk permmeesion ")
    
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

const setterSerchall=async ()=>{
  const location= await setItem.getItem('BS:Location') 
    let  existLocation=JSON.parse(location)
   if(existLocation===null){
    Alert.alert("يجب عليك تفعيل الموقع لأظهار الحاضنات الاقرب لديك")
    return;
   }else{
            console.log("test is location! ",existLocation)
            const user = await setItem.getItem('BS:User');
            const token = await setItem.getItem('BS:Token');
            const  coordinates=[ existLocation.lat,existLocation.lon]
            const limit=30 
            const skip=itemnumber
            api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
            const response =await api.post(`setterlocationall?limit=${limit}&skip=${skip}`,{coordinates}).then((res)=>{
                if(res.data){
                setbabseters(res.data)
              }
              }).finally(()=> setneswSetter(false)).catch(err=>console.log("Erorr",err))

   }
} 
    
    const Item = ({ setterdata }) => (
     
    
    <TouchableOpacity style={styles.item} onPress={()=>props.navigation.navigate('Shrtcutprofile',{data1:setterdata,settertTitle:setterdata.name}) }  >
        <Image source={{uri:  `${URL}/users/${setterdata.owner}/avatar`}} resizeMode='center' style={styles.imagecross} />
         <Text style={styles.title}>{setterdata.name}</Text>
         <AirbnbRating
         // onFinishRating={(e)=>ratingCompleted(e)}
          style={{ paddingVertical: 1 ,backgroundColor:Colors.transparent}}
          count={5}
          //defaultRating={setterdata.rating ? Number(setterdata.rating)/5:0}
          imageSize={20}
          tintColor={"#E5E5E5"}
          showRating={false}
          size={8}
          starContainerStyle={styles.ratingContainerStyle}
          isDisabled 
          />
          <Text style={styles.title2}>{setterdata.mainservice}</Text>

       
      </TouchableOpacity>
      
    );

//maiservice data
    const Req1=(val)=>{

      setchange(!change)
      console.log("service id ",val)
      if(change){
         props.navigation.push('Fourm1',{productTitle: val.maineservice, serviceid:val._id ,serviceNmae:val.maineservice,orderId:val.order})
      }
    
    }
    const myItemSeparator = () => {
      return (
        <View
         style={{ height: 1, backgroundColor: "gray", marginHorizontal:10 }}
        />
      );
    };

    const palysound=()=>{
      ding.setVolume(1)
      ding.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });

     
  }
    

return(
    <View  style={{backgroundColor:Colors.AminabackgroundColor,marginTop:0,flex:1}} >
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.hederup} />
        <View style={{alignItems:'flex-start' ,marginLeft:10}}>
        <Text style={{paddingTop:20,fontWeight:Platform.OS==='android'?"300":"700",fontFamily:Platform.OS==='android'? Fonts.type.bold:Fonts.type.base,fontSize:22,marginLeft:5,marginBottom:2}} >اختر الخدمة</Text>
        <Text style={{fontFamily:Platform.OS==='android'? Fonts.type.light:Fonts.type.light,fontSize:18,marginBottom:10}}>الرجاء اختيار نوع الخدمه والبدء بانشاء طلبك</Text>
        </View>
        
         
        <View   style={{backgroundColor:Colors.transparent,flexDirection:'row',justifyContent:'space-around',paddingTop:10,paddingBottom:10}}>
        {services.length>1&&
        services.map((serv,index)=>{
            return(
                  
                    <TouchableOpacity key={serv._id} style={{backgroundColor:Colors.AminaButtonNew ,padding:2,borderStyle:'solid',borderRadius:10,
                            width:Metrics.WIDTH*0.389,height:Metrics.HEIGHT*0.184,marginTop:1,borderColor:"#FFFAFA",borderWidth:.2
                             }} onPress={()=>Req1(serv)}>
                              {!change? 
                              <View style={{alignItems:'center'}}>
                              <Image source={ index===0? Images.caption2:Images.caption1 } resizeMode='stretch' style={{height:100,width:100,backgroundColor:Colors.transparent,margin:2}} />
                              <Text style={{fontSize:18,textAlign:'center', fontFamily:Fonts.type.aminafonts,  color:Colors.Milky,margin:3}}>
                                  {serv.maineservice}
                              </Text>
                              </View>:
                              <View>
                              <Text style={{fontSize:18,textAlign:'center', fontFamily:Fonts.type.bold,color:"#FCEBD2",textDecorationLine:'underline'}}>
                              {serv.maineservice}
                              </Text>
                              <Text style={{fontSize:14,letterSpacing:.5,fontWeight:Platform.OS==='ios'?"500":null, fontFamily:Platform.OS==='android'? Fonts.type.aminafonts:Fonts.type.base ,color:Colors.Milky,  textAlign:'center',lineHeight:18,marginTop:5}}>
                              {serv.descripton}
                              </Text></View>}
                    </TouchableOpacity>
                 
            )
        })
        }
        {/* <Box>
          <Button onPress={()=> props.navigation.navigate('Paymentint') }>chat</Button>
        </Box> */}
         {/* <Box>
          <Button onPress={()=> palysound()  }>sound</Button>
        </Box> */}

        </View>
        <View style={{alignItems:'flex-start' ,marginLeft:10}}>
        <Text style={{paddingTop:20,fontWeight:Platform.OS==='android'?"300":"700",fontFamily:Platform.OS==='android'? Fonts.type.bold:Fonts.type.base,fontSize:22,marginLeft:5,marginBottom:2}}>الافضل لك </Text>
        <Text style={{fontFamily:Platform.OS==='android'? Fonts.type.light:Fonts.type.light,fontWeight:'300',fontSize:18,marginBottom:4}}>نرشح لك افضل الحاضنات الاقرب للمنزل</Text>
        </View>
        {loading2? 
          <Center w="100%" >
            <VStack w="90%" maxW="400" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
              borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200" }}>
              <Skeleton h="40" />
              <Skeleton.Text px="4" />
              <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
            </VStack>
          </Center> :
          <Stack>
             
            <FlatList
              data={babseters}
              keyExtractor={(item, index) => item + index}
              renderItem={({
                item
              }) => <Item setterdata={item} /> }
               
              
              ItemSeparatorComponent={myItemSeparator}
              horizontal={true}
              // onRefresh={onRefresh}
              //  refreshing={isFetching}
              onEndReachedThreshold={0.5}
              
              onEndReached={()=> setneswSetter(true)}
             
            />
             
          </Stack>
           }       
     
    </View>

    
)
}
export default Home