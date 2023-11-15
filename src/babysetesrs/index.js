

import React,{useEffect,useState} from 'react';
import {View,Image, TouchableOpacity,Platform,RefreshControl, Alert} from 'react-native'
import {FlatList,Box,Heading,Avatar,Text,VStack,HStack,Spacer,Stack, Button,Spinner} from 'native-base';
import SocketIOClient from "socket.io-client";
import setItem from '../services/storage';
import api from '../services/api';
import { Colors,Fonts ,Metrics,Images,fontPixel,heightPixel,widthPixel,pixelSizeHorizontal,pixelSizeVertical} from '../assets/Themes';
import styles from './styles';
import images from '../assets/Themes/Images';
import {URL_ws,URL} from '../services/links';
import CustomButton from '../services/buttons/buttton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDistance ,convertDistance} from 'geolib';
import { useCallback } from 'react';
import Disprofile from '../services/utils/disprofile';
let pageNumber=0
let limitNumber=3
const Babysetesrs=(props)=>{
 
const[babseters,setbabyseters]=useState([])
const[loading,setLoading]=useState(true)
const[loadStorage,setloadStorage]=useState(false)
 const[mylocattion,setmylocation]=useState({})
const [favoriteList, setFavoriteList] = useState([]);
const [page,setpage]=useState(0)
const [selectedId, setSelectedId] = useState();
const  [loadrate,setloadrate]=useState(false)
const[ratedata,setratedata]=useState([])
const [refreshing, setRefreshing] = React.useState(false);
const[limit,setlimit]=useState(5)

useEffect( ()=>{
 getDate()
   
},[loadStorage ])

useEffect( async ()=>{
  //  props.navigation.addListener('beforeRemove',async (e) => {
  //   console.log("add items")
    // await setItem.setItem("on:like",favoriteList).then(()=>{
     // console.log("asynstorage upddate=>add")
   //})
  
//})
 
  // setterData()
  setterApisrch(limitNumber)

   const location= await setItem.getItem('BS:Location') 
   const  existLocation=JSON.parse(location)
   //console.log("test location3 ",existLocation.lat,"$$",existLocation.lon)
    setmylocation( existLocation)

},[])

const savedataTofav= async(item)=> {
  const favSetter=await setItem.getItem("on:like") || {}
  
  let setterrFav=favSetter[item._id]
 
  if(!setterrFav){
    favSetter[item._id]=item
    
  }
 // setterrFav[item._id]=item
  //console.log("Get fav from storage",favSetter)
  const succses = setItem.setItem("on:like",favSetter)
  if(succses){
    const newFav=setItem.getItem("on:like").then((res)=>{
     // console.log("test from storage data",res)
      setFavoriteList(res)
      setloadStorage(!loadStorage)
    })
   
    //console.log("items add to  storage ",favSetter)
  }

}

const onRemoveFavorite = async(itemId) => {
  //console.log("start remove ",itemId)
 delete favoriteList[itemId]
 //console.log("test == remove ",favoriteList)
 const succses= await setItem.setItem("on:like",favoriteList)
 
 if(succses){
 // console.log("start remove by ID ",itemId)
 
  // setFavoriteList(favoriteList)
 }
 setloadStorage(!loadStorage)
};

 

const getDate=async()=>{
  const favSetter=await setItem.getItem("on:like") ||{}
  setFavoriteList(favSetter)
  ifExists()
  //console.log("from storage favSetter",favSetter)
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
    //console.log("exist data ",favoriteList)
    
    if (favoriteList[itemID]) {
     // console.log("exist data is true")
      return true;
    }else{
     // console.log("exist data is not? false ")
      return false;
    }
    

    
  };

   
 

  const setterApisrch=async(limitval)=>{
    setLoading(true)
    const {mainservice,serviestype}=JSON.parse(props.route.params.setterdata)
    
    const user = await setItem.getItem('BS:User');
    const token = await setItem.getItem('BS:Token');
    const location= await setItem.getItem('BS:Location') 
    const  existLocation=JSON.parse(location)
    const motherDtat=JSON.parse(user)
    
    const skip=0
    console.log("tets limt", "mainservice =<",mainservice,"  -" ,serviestype)
     
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      const response=await  api.post(`${URL}/setterlocation?limit=${limitval}&skip=${skip}`,{
        "coordinates":[existLocation.lat,existLocation.lon],
        "mainservice":mainservice,
        "service":serviestype?serviestype:"",
    }).then((res)=>{
      console.log("tets limt",res.data)
      return  res.data
       
    }).finally(()=>{ setLoading(false)}
    ).catch(err=>console.log("Erorr 500 ",err.message))
    setbabyseters(response);
 
  
  return response

  
  
  }
    
  const movToProfileScreen=(item)=>{
 
     props.navigation.navigate('Shrtcutprofile', { data1: item, settertTitle: item.name })
  }

  const calcDistance=  (locat)=>{
   

    let myLoca={latitude: mylocattion.lat,longitude :mylocattion.lon}
    let setteerloc={latitude:locat.coordinates[0],longitude :locat.coordinates[1]}
    let distance=getDistance(myLoca,setteerloc,1000) 
    let distatnkm=convertDistance(distance,"km")
    if(distance <= 1000){
      return<Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontSize={12} fontWeight='300'>{distance} M</Text>
    }else{
      return<Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontSize={12} fontWeight='300'>{distatnkm} KM</Text>
    }
   
  }
  const calcRevew= async  (id)=>{
    console.log('test id',id)
    let rate=0
    // const token = await setItem.getItem('BS:Token');
    // api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    const setterrevew=api.get(`totalratforsetter/${id}`).then((res)=>{
      
      return res.data
        
    }) 
    
      const result= await setterrevew
     return   result.map((item)=>{
     // console.log('test total',item.total)
      return console.log('test total',item.total)
    })
   
   
   }


   const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    limitNumber = limitNumber + 5;
    console.log("test fresh limit",limitNumber)
    setTimeout(() => {
      setterApisrch(limitNumber).then((item)=>{
        console.log("test onRefresh",item)
        setRefreshing(false);
      })
     
    }, 2000);
  }, []);

  const fetchMore = async () => {
    limitNumber = limitNumber + 5;
    console.log("test limit",limitNumber)
    const newData = await setterApisrch(limitNumber);
    console.log("test newData",newData)
   //setbabyseters([...babseters,...newData])
    setlimit(limitNumber);
    
   
  };
  const ListFooterComponent = () => (
    <Text
      style={{
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5,
      }}
    >
      Loading...
    </Text>
  );
  const renderItem = ({item}) => {
    return(
      <Box alignItems={'center'}>
       <Disprofile  data={item} width={Metrics.WIDTH*0.79273}  height={Metrics.HEIGHT*0.8321} movScreen={()=> movToProfileScreen(item) }/>
      </Box>
    )
    
   
  }

  //  const renderItem = ({item}) => {
  //    const backgroundColor = item._id === selectedId ? Colors.Milky : Colors.white;
  //   // const color = item.id === selectedId ? 'white' : 'black';

  //   return (
  //       <Box key={item._id} backgroundColor={backgroundColor} borderColor={Colors.border}  marginLeft={4} marginTop={ Platform.OS==='android'?"5":21 }   paddingBottom={2} flexDirection={'row'} 
  //           width={Platform.OS==='android'? widthPixel(371): widthPixel(371)} height={'24'}  >
  //         <Box>
  //           <Image source={{ uri:`${URL}/users/${item.owner}/avatar` }} resizeMode='contain' style={{height:heightPixel(109),width:widthPixel(109),
  //             marginTop:6,marginLeft:1,borderRadius:10 }} />
  //         </Box>
          
  //         <Box flexDirection={'column'}   width={Metrics.WIDTH*0.560} ml={3} backgroundColor={Colors.transparent} marginTop={3} > 
  //           <Box flexDirection={'row'} justifyContent='space-between' alignItems={'baseline'} >
  //             <Stack flexDirection={'row'} justifyContent='space-around' >
  //               <Text   >{item.name}</Text>
  //               <Text fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular} fontsize={fontPixel(16)} color={"#FB5353"} marginLeft='1' >{item.mainservice}</Text>
  //             </Stack>
  //             <TouchableOpacity   onPress={()=>ifExists(item._id)?onRemoveFavorite(item._id): savedataTofav(item) }>
  //                     <Image source={ifExists(item._id)? images.like1:images.like} style={{width:widthPixel(20),height:heightPixel(20)}} resizeMode='contain'  />
  //             </TouchableOpacity>
                    
  //           </Box>
  //           <Box flexDirection={'row'} justifyContent="space-between">
  //             <Stack flexDirection={'row'} >
  //               <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(10),color:Colors.newTextClr }}>{item.hourstotal}</Text>
  //               <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(10),color:Colors.newTextClr ,marginLeft:pixelSizeHorizontal(2)}}>ساعة عمل</Text>
  //             </Stack>
  //             <Stack>
  //               {calcDistance(item.location) }
  //             </Stack>
  //             <Stack position={'relative'} bottom={1} >
  //               <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium,fontSize:fontPixel(10),color:Colors.rmadytext ,marginLeft:pixelSizeHorizontal(2)} }>حفظ  </Text>
  //             </Stack>
  //           </Box>
  //           <Box flexDirection={'row'} justifyContent="space-between" mt={1} >
  //             <Stack width={60} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={Colors.pinkystack}>
  //               <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(10),color:Colors.newTextClr }}>{item.price} ر.س/ساعة</Text>
  //             </Stack>
  //             <Stack width={60} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={Colors.yellowstack} flexDirection='row'>
  //               <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(10),color:Colors.newTextClr }}>{item.rate}</Text>
  //               <Image source={Images.starticon} style={{width:widthPixel(20),height:heightPixel(20)}} resizeMode='contain'/>
  //             </Stack>
  //             <Stack width={60} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={Colors.AminaPinkButton} flexDirection='row' >
  //               <Button onPress={() => ConfimSetterData(item)} bgColor={Colors.AminaPinkButton} variant='link' >
  //               <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(10),color:Colors.white }}>احجزي الان</Text>
  //               </Button>
  //             </Stack>
  //           </Box>
  //         </Box>
  //   </Box>
  //   );
  // };
const keyExtractor_k=useCallback((item)=>`${item._id}`)
return(
<Box backgroundColor={Colors.AminabackgroundColor}  mt={Platform.OS==='android'?66:94} flex={1}>
        
      {loading?<Box>
        <Spinner size={'lg'} color={Colors.bloodOrange}/>

      </Box>:
      <FlatList data={babseters} 
        renderItem={renderItem}
        keyExtractor={keyExtractor_k }
        ListEmptyComponent={<Box><Heading>Sory no data present!</Heading></Box>}
        contentContainerStyle={{ height: Metrics.HEIGHT*0.8721,backgroundColor:Colors.transparent }}
        refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        // onEndReachedThreshold={0.5}
        // onEndReached={()=>fetchMore()}
        maxToRenderPerBatch={5}
        ListFooterComponent={()=>loading &&<ListFooterComponent/>}
      //onEndReached={({distanceFromEnd})=> console.log("this is ",distanceFromEnd)}
      />}
        
      
    </Box>

)}
export default Babysetesrs;



// <FlatList data={babseters} renderItem={({item ,index}) => (<Box key={index} borderWidth=".5"  bgColor={Colors.white} borderRightColor="#00ABB9" borderLeftColor="#00ABB9" borderTopColor="#00ABB9" borderRadius='sm'  pr="5" py="2" ml="3" mr="5" mb={4} width={Metrics.WIDTH*0.953}  h={Metrics.HEIGHT*0.243}>
// <HStack alignItems={'center'} justifyContent='space-around' >
//   <Image  source={{ uri: `${URL}/users/${item.owner}/avatar`}} resizeMode='contain' 
//   style={{width: Metrics.WIDTH*0.280, height: Metrics.HEIGHT*0.1870,marginLeft:5,marginRight:20,borderRadius:70}} />
//   <Spacer />
  
//   <VStack flexDirection={'column'}    alignItems={'flex-start'} >
//     <Text  color= "#000000"
//       fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontWeight='bold' fontSize={18}>
//       {item.displayname}
//     </Text>
//       <VStack flexDirection={'row'} justifyContent='space-around' alignItems={'baseline'} >
//         <Text color= "#000000" fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base} fontWeight="thin" fontSize={15} mr={6}>
//           {item.mainservice}
//         </Text>
//         <Box>
//         { calcDistance(item.location) }
//         </Box>
//       </VStack>
      
//       <VStack flexDirection={'row'} alignItems='baseline'  bgColor='coolGray.50' >
//         <Rating
//         type='custom'
//         //onFinishRating={(e)=>ratingCompleted(e)}
//         style={{ paddingVertical: 10 ,backgroundColor:Colors.transparent,padding:10}}
//         readonly={true}
       
//         ratingCount={5}
//         startingValue={item.rate ? Number(item.rate)/5:0}
//        // ratingCount={item.rate ? Number(item.rate)/5:0}
//         imageSize={20}
//         ratingBackgroundColor={"#BFD1D6"}
//         ratingColor={"#F38193"}
//         tintColor={"#FFFFFF"}
//         showRating ={false}
//         starContainerStyle={styles.ratingContainerStyle}
      
//     isDisabled 
//   />
//   <Box>
//      <Text color= "#000000" fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base}
//       fontWeight="thin" fontSize={15}>التقييم {item.rate ? Math.floor(item.rate):0}</Text>
//   </Box>
 
  
//   </VStack>
    
//   <Box>
//      <Text color= "#000000" fontFamily={Fonts.type.aminafonts} fontWeight="thin" fontSize={15} ml={1}>{item.hourstotal} ساعة عمل</Text>
//   </Box>
//   <Box>
//   <Text   color= "#000000" fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base} fontWeight="thin" fontSize={15} >
//     تكلفة الخدمه بالساعه {item.price} ريال
//   </Text>
   
   
   
//   <HStack backgroundColor={'amber.200'}>
  
//   </HStack>
 
//   </Box>

//   </VStack>
  
//   <Spacer />
 
//   <TouchableOpacity   onPress={()=>ifExists(item._id)?onRemoveFavorite(item._id): savedataTofav(item) }>
//     <Image source={ifExists(item._id)? images.like1:images.like} resizeMode ={'cover'} style={{width:Metrics.WIDTH*0.0932 ,height:Metrics.HEIGHT*0.072}}   />
  
//   </TouchableOpacity>
  
  
  
// </HStack>
// <TouchableOpacity style={{
//   marginTop: 30,
//   backgroundColor:"#F38193",
//   height: 48,
//   width:Metrics.WIDTH*0.950,
//   borderBottomLeftRadius:25,
//   alignItems: 'center',
//   justifyContent: 'center',
//   marginTop: 1 }}
//    onPress={() => ConfimSetterData(item) }>
//   <Text  style={{ color:'#fff',letterSpacing:1.5,color: '#fff',fontSize: 16,
//         fontWeight: Platform.OS==='android'? '400':'500',
//         fontFamily:Platform.OS==='android'?Fonts.type.light:Fonts.type.base,}}>
//       احجز الان </Text>
//    </TouchableOpacity>

// </Box>)

// }
// onEndReachedThreshold={0.5}
// onEndReached={()=> setpage(page+1)}
// keyExtractor={item => item.id} />}


// </Box>