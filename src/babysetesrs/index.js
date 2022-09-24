

import React,{useEffect,useState} from 'react';
import {View,Image, TouchableOpacity,Platform, Alert} from 'react-native'
import {FlatList,Box,Heading,Avatar,Text,VStack,HStack,Spacer, Button,Spinner} from 'native-base';
import SocketIOClient from "socket.io-client";
import setItem from '../services/storage';
import api from '../services/api';
import {Rating} from 'react-native-ratings' 
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors,Fonts ,Metrics,Images} from '../assets/Themes';
import styles from './styles';
import images from '../assets/Themes/Images';
import {URL_ws,URL} from '../services/links';
import CustomButton from '../services/buttons/buttton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Babysetesrs=(props)=>{
 
const[babseters,setbabyseters]=useState([])
const[loading,setLoading]=useState(true)
const[loadStorage,setloadStorage]=useState(false)
 
const [favoriteList, setFavoriteList] = useState([]);


useEffect( ()=>{

  console.log("Pre ====Data ==== Babysetter==========" )
  getDate()
   
},[loadStorage ])

useEffect( async ()=>{
  //  props.navigation.addListener('beforeRemove',async (e) => {
  //   console.log("add items")
    // await setItem.setItem("on:like",favoriteList).then(()=>{
     // console.log("asynstorage upddate=>add")
   //})
  
//})

   setterData()

},[])

const savedataTofav= async(item)=> {
  const favSetter=await setItem.getItem("on:like") || {}
  
  let setterrFav=favSetter[item._id]
 
  if(!setterrFav){
    favSetter[item._id]=item
    
  }
 // setterrFav[item._id]=item
  console.log("Get fav from storage",favSetter)
  const succses = setItem.setItem("on:like",favSetter)
  if(succses){
    const newFav=setItem.getItem("on:like").then((res)=>{
      console.log("test from storage data",res)
      setFavoriteList(res)
      setloadStorage(!loadStorage)
    })
   
    console.log("items add to  storage ",favSetter)
  }

}

const onRemoveFavorite = async(itemId) => {
  console.log("start remove ",itemId)
 delete favoriteList[itemId]
 console.log("test == remove ",favoriteList)
 const succses= await setItem.setItem("on:like",favoriteList)
 
 if(succses){
  console.log("start remove by ID ",itemId)
 
  // setFavoriteList(favoriteList)
 }
 setloadStorage(!loadStorage)
};

 

const getDate=async()=>{
  const favSetter=await setItem.getItem("on:like") ||{}
  setFavoriteList(favSetter)
  ifExists()
  console.log("from storage favSetter",favSetter)
  // AsyncStorage.getItem('on:like', (err, result) => {
  //   console.log("result of fav album",JSON.parse(result));
  //   setFavoriteList(JSON.parse(result))
  //   // this.setState({
  //   //   favorites_list: JSON.parse(result),
  //   //     })
  //     });
   

}
 
 



  const ifExists =  (itemID) => {
   // const newFav= await setItem.getItem("on:like") ||{}
    //console.log("exist data ",JSON.stringify(newFav))
    console.log("exist data ",favoriteList)
    
    if (favoriteList[itemID]) {
      console.log("exist data is true")
      return true;
    }else{
      console.log("exist data is not? false ")
      return false;
    }
    

    
  };

   


const setterData= async()=>{
  let babySeterData=null
  const {mainservice,serviestype}=JSON.parse(props.route.params.setterdata)
  const user = await setItem.getItem('BS:User');
  const token = await setItem.getItem('BS:Token');
  const location= await setItem.getItem('BS:Location') 
  const  existLocation=JSON.parse(location)
  console.log("test location3 ",existLocation.lat,"$$",existLocation.lon)

  api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  const socket = SocketIOClient(URL_ws, {
    jsonp: false,
  });
  const motherDtat=JSON.parse(user)

  const data={
    "id":motherDtat._id,
    "name":motherDtat.name?motherDtat.name:"DEMOUSER",
    "mainservice":mainservice,
    "service":serviestype?serviestype:"",
    "coordinates":[existLocation.lat,existLocation.lon],
    "token":JSON.parse(token) 

}
console.log("tets DATA",data)
 

    socket.on("connect", () => {
      console.log("connected");

      socket.on("welcome", (data) => {
        console.log("welcom from Soket ",data);
        
      });
    
    socket.emit("setterlocation",(data))
        
       socket.on("seteeslocation", (loc) => {
        // console.log("setter ddata",loc);
         setbabyseters(loc)
         if(loc.length >= 1){
          setLoading(false)
        }
        setLoading(false)
      })
  
     

    });
   
   
  }

    
    
  const ConfimSetterData=(item)=>{
    const prevReservion= JSON.parse(props.route.params.setterdata)
    const  num = prevReservion.hours;
    const  hours = (num / 60);
    const  rhours = Math.floor(hours);
    const  minutes = (hours - rhours) * 60;
    const  rminutes = Math.round(minutes);
    console.log( num + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).")
    const totPrice=Number(rhours*item.price)
    const securenumber =  Math.floor(1000 + Math.random() * 9000);
    const orderid= Math.floor(1000 + Math.random() * 90000);
    console.log("securenumber",prevReservion)
     
    
     
    const newOrder={
      ...prevReservion,
     // serviestype:item.service, 
      scurtycode:securenumber,
       orderid:orderid,
       serviestype:item.mainservice,
      settername:item.name,
      imagesInWork:item.imagesInWork,
      displayname:item.displayname,
      address:item.address,
      statuse:"processing",
      reson:"",
      read:false,
      settterowner:item.owner,
      price:item.price,
      settterfaileid:item._id,
      totalprice:totPrice,
      totalhours:rhours,
      bio:item.bio
    }
    console.log("Babysetesrs Final data=",item)
    props.navigation.navigate('BabysetesrsProfile',{data1:newOrder,settertTitle: item.displayname})
    
  }

  
   
return(
<Box backgroundColor={Colors.red}  mt={Platform.OS==='android'?66:94} flex={1}>
       
      {loading?<Box>
        <Spinner size={'lg'} color={Colors.bloodOrange}/>

      </Box>:
      <FlatList data={babseters} renderItem={({item ,index}) => (<Box key={index} borderWidth="1"  bgColor={Colors.white} borderColor="#00ABB9" borderRadius='md'  pr="5" py="2" ml="3" mr="5" mb={4} width={Metrics.WIDTH*0.953}  h={Metrics.HEIGHT*0.243}>
              <HStack alignItems={'center'} justifyContent='space-around' >
                <Image  source={{ uri: `${URL}/users/${item.owner}/avatar`}} resizeMode='contain' 
                style={{width: Metrics.WIDTH*0.280, height: Metrics.HEIGHT*0.1870,marginLeft:5,marginRight:20,borderRadius:70}} />
                <Spacer />
                
                <VStack flexDirection={'column'}    alignItems={'flex-start'} >
                  <Text  color= "#000000"
                    fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontWeight='bold' fontSize={18}>
                    {item.displayname}
                  </Text>
                      <Text color= "#000000" fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base} fontWeight="thin" fontSize={15} mr={6}>
                        {item.mainservice}
                      </Text>
                      <VStack flexDirection={'row'} alignItems='baseline'  bgColor='coolGray.50' >
                      <Rating
                    type='custom'
                    //onFinishRating={(e)=>ratingCompleted(e)}
                    style={{ paddingVertical: 10 ,backgroundColor:Colors.transparent,padding:10}}
                    ratingCount={5}
                  imageSize={20}
                  ratingBackgroundColor={"#BFD1D6"}
                  ratingColor={"#F38193"}
                  tintColor={"#FFFFFF"}
                    showRating ={false}
                  starContainerStyle={styles.ratingContainerStyle}
                    
                  isDisabled 
                />
                <Box>
                   <Text color= "#000000" fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base}
                    fontWeight="thin" fontSize={15}>التقييم {item.rate ? Number(item.rate):0}</Text>
                </Box>
               
                
                </VStack>
                  
                <Box>
                   <Text color= "#000000" fontFamily={Fonts.type.aminafonts} fontWeight="thin" fontSize={15} ml={1}>{item.hourstotal} ساعة عمل</Text>
                </Box>
                <Box>
                <Text   color= "#000000" fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base} fontWeight="thin" fontSize={15} >
                  تكلفة الخدمه بالساعه {item.price} ريال
                </Text>
                <HStack backgroundColor={'amber.200'}>
                
                </HStack>
               
                </Box>

                </VStack>
                
                <Spacer />
               
                <TouchableOpacity   onPress={()=>ifExists(item._id)?onRemoveFavorite(item._id): savedataTofav(item) }>
                  <Image source={ifExists(item._id)? images.like1:images.like} resizeMode ={'cover'} style={{width:Metrics.WIDTH*0.0932 ,height:Metrics.HEIGHT*0.072}}   />
                
                </TouchableOpacity>
                
                
                
              </HStack>
              <TouchableOpacity style={{
                marginTop: 30,
                backgroundColor:"#F38193",
                height: 48,
                width:Metrics.WIDTH*0.957,
                borderBottomLeftRadius:25,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 1 }}
                 onPress={() => ConfimSetterData(item) }>
                <Text  style={{ color:'#fff',letterSpacing:1.5,color: '#fff',fontSize: 16,
                      fontWeight: Platform.OS==='android'? '400':'500',
                      fontFamily:Platform.OS==='android'?Fonts.type.light:Fonts.type.base,}}>
                    احجز الان </Text>
                 </TouchableOpacity>
              
            </Box>)
            
          }
          keyExtractor={item => item.id} />}
      
      
    </Box>

)}
export default Babysetesrs;

