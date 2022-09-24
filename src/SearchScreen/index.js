import React, { useEffect, useState } from "react";
import { Platform, View, Image, BackHandler, Easing,TouchableOpacity } from "react-native";
import { Box, Stack,Spacer,Text ,VStack,Divider,Heading,Input,Icon, HStack, Button} from "native-base";
import { Metrics, Colors, Images, Fonts } from "../assets/Themes/";
import { SearchBar } from "react-native-elements";
import styles from "./style";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Rating } from 'react-native-ratings';
import api from "../services/api";
import SocketIOClient from "socket.io-client";
import { URL_ws,URL } from "../services/links";
 import setItem from '../services/storage'
 
const  SearchScreen =(props)=> {

const RecommendedArrayOne =
"http://antiquerubyreact.aliansoftware.net/all_live_images/ic_seafood.jpg";
const RecommendedArrayTwo =
"http://antiquerubyreact.aliansoftware.net/all_live_images/ic_fajitas.jpeg";

    const [search,setserch]=useState('')
    const[rating,setrating]=useState(0)
    const [loading,setloading]=useState(false)
    const[dummydata,setdummydata]=useState([])
    const[searchArray]=useState([
        {
        id: 1,
        search: "Restaurant"
      },
      {
        id: 2,
        search: "Seafood in Da nang city"
      },
      {
        id: 3,
        search: "Craft Burgers"
      }
    ])
    const[recommandedArray]=useState( [
        {
          id: 1,
          itemImg: { uri: RecommendedArrayOne },
          itemName: "Chicken & Seafood",
          address: "7204 Cronin Station Apt. 678",
          rating: 5,
          review: "238"
        },
        {
          id: 2,
          itemImg: { uri: RecommendedArrayTwo },
          itemName: "Fajitas & Enchiladas",
          address: "60 Kub Pines Apt. 797",
          rating: 4,
          review: "238"
        },
        {
          id: 3,
          itemImg: { uri: RecommendedArrayOne },
          itemName: "Chicken & Seafood",
          address: "7204 Cronin Station Apt. 678",
          rating: 5,
          review: "238"
        },
        {
          id: 4,
          itemImg: { uri: RecommendedArrayTwo },
          itemName: "Fajitas & Enchiladas",
          address: "60 Kub Pines Apt. 797",
          rating: 4,
          review: "238"
        }
      ]
    )
    
  const updateSearch = search => {
    console.log("new text",search)
    setserch(search)
    
  };
useEffect(()=>{
     
},[])
const setterData= async(name)=>{
  setserch(name) 
    // const user = await setItem.getItem('BS:User');
    const token = await setItem.getItem('BS:Token');
    // const location= await setItem.getItem('BS:Location') 
    // const  existLocation=JSON.parse(location)
    // console.log("test location3 ",existLocation.lat,"$$",existLocation.lon)
  
    api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
   
    api.defaults.headers.Authorization = `Bearer ${token}`;
    const response=await  api.post(`${URL}/setterbyname`,{
      name:search
    }).then((res)=>{
    console.log("DATA SETEER ",res.data)
    setdummydata(res.data)
    return  res.data
  }).catch(err=>console.log("Erorr 500 ",err.massege))

  }

  const setterDataSubmit= async(name)=>{
    
    // const user = await setItem.getItem('BS:User');
    const token = await setItem.getItem('BS:Token');
    // const location= await setItem.getItem('BS:Location') 
    // const  existLocation=JSON.parse(location)
    // console.log("test location3 ",existLocation.lat,"$$",existLocation.lon)
  
    api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
   
    api.defaults.headers.Authorization = `Bearer ${token}`;
    const response=await  api.post(`${URL}/setterbyname`,{
      name:search
    }).then((res)=>{
    console.log("DATA SETEER ",res.data)
    setdummydata(res.data)
    return  res.data
  }).catch(err=>console.log("Erorr 500 ",err.massege))

  }

 

 
    return (
      <View style={styles.mainView}>
        <Box  backgroundColor={'red'} >
           
        <Input placeholder="بخث" variant='outline' width="99%" size={'xl'} borderRadius="10" py="1" px="2" mt='3' borderWidth="2"
         onChangeText={(v)=>updateSearch(v)}  backgroundColor= {Colors.white} alignItems='flex-start'
         onSubmitEditing={(val)=> setterDataSubmit(val.nativeEvent.text) } InputLeftElement={<Icon ml="2" size="22" color="gray.400" as={<Ionicons name="ios-search" size={25} onPress={()=>setterData()} style={{padding:10}} />} />} />
        
        </Box>

        <View style={{ flex: 1 }}>
          {dummydata.length >= 1 ? <Box>
            <Text fontFamily={Platform.OS=='android'?Fonts.type.base:Fonts
          .type.base}  fontSize={18} fontWeight={'light'} color='red' mr='3' mt={3} mb='3' >تنائج عملية البحث</Text>
            {dummydata.map((item, index) => {
              return (
                <Box key={index} borderWidth="1"  bgColor={Colors.white} borderColor="#00ABB9" borderRadius='md'  pr="5" py="2" ml="3" mr="5" mb={4} width={Metrics.WIDTH*0.953}  h={Metrics.HEIGHT*0.243}>
              <HStack space={3} justifyContent='space-around' key={item._id}>
                <Image  source={{ uri: `${URL}/users/${item.owner}/avatar`}} resizeMode='stretch' 
                style={{width: Metrics.WIDTH*0.281, height: Metrics.HEIGHT*0.170,marginLeft:5,marginRight:20,borderBottomLeftRadius:10}} />
                <Spacer />
                
                <VStack flexDirection={'column'}    alignItems={'flex-start'} >
                  <Text  color= "#000000"
                    fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold}   fontSize={18}>
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
                <Text   color= "#000000" fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold}   fontSize={15} >
                  تكلفة الخدمه بالساعه {item.price} ريال
                </Text>
                <HStack backgroundColor={'amber.200'}>
                
                </HStack>
               
                </Box>

                </VStack>
                
                <Spacer />
                
                {/* <TouchableOpacity   onPress={()=>ifExists(item) ? onRemoveFavorite(item) : onFavorite(item)}>
                  <Image source={ifExists(item)? images.like1:images.like} resizeMode ={'cover'} style={{width:Metrics.WIDTH*0.0932 ,height:Metrics.HEIGHT*0.072}}   />
                </TouchableOpacity> */}

                
                
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
                 onPress={() => props.navigation.navigate('Shrtcutprofile',{data1:item,settertTitle:item.name}) }>
                <Text   letterSpacing={1.5} color= '#fff' fontSize= {16}  
                     
                      fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} >
                    احجز الان </Text>
                 </TouchableOpacity>
              
            </Box>
              );
              })}

          </Box>
          
          :<Box alignItems={'center'} mt='10'><Heading>
            <Text fontFamily={Platform.OS
            ==='android'?Fonts.type.aminafonts:Fonts.type.base} fontWeight='light' >لاتوجد نتائج للبحث !</Text></Heading></Box>}
          
        </View>
      </View>
    );
}
export  default SearchScreen;