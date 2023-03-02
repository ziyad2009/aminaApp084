import React, { useEffect, useState } from "react";
import { Platform, View, Image, BackHandler, Easing,TouchableOpacity } from "react-native";
import { Box, Stack,Spacer,Text ,VStack,Divider,Heading,Input,Icon, HStack, Button, Spinner} from "native-base";
import { Metrics, Colors, Images, Fonts,pixelSizeHorizontal,pixelSizeVertical,widthPixel,heightPixel,fontPixel} from "../assets/Themes/";
import { SearchBar } from "react-native-elements";
import styles from "./style";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Rating } from 'react-native-ratings';
import api from "../services/api";
import SocketIOClient from "socket.io-client";
import { URL_ws,URL } from "../services/links";
 import setItem from '../services/storage'
import { color } from "react-native-reanimated";
 
const  SearchScreen =(props)=> {
  
    const [search,setserch]=useState('')
    const[rating,setrating]=useState(0)
    const [loading,setloading]=useState(false)
    const[dummydata,setdummydata]=useState([])
    
    
  const updateSearch = search => {
    //console.log("new text part","search","- and -",loading)
    // if(loading===true){
    //   console.log("new text",search)
    //   setserch(search)
    // }
    
  };
useEffect(async()=>{
  const text = props.route.params.text
  setloading(true)
  console.log("test come text==> ",text)
 
  setTimeout(() => {
    setterData(text)
  }, 1000);
},[props.route.params.text])


const setterData= async(name)=>{
 
 
  console.log("test name",name)
    // const user = await setItem.getItem('BS:User');
    const token = await setItem.getItem('BS:Token');
    // const location= await setItem.getItem('BS:Location') 
    // const  existLocation=JSON.parse(location)
    // console.log("test location3 ",existLocation.lat,"$$",existLocation.lon)
  
    api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    const response=await  api.post(`${URL}/setterbyname`,{
      name:name
    }).then((res)=>{
    console.log("DATA SETEER ",res.data)
    
    setdummydata(res.data)
    setloading(false)
    return  res.data
  }).catch(err=>console.log("Erorr from serch fun ",err),setloading(false))

  }

  const setterDataSubmit= async(name)=>{
    
    // const user = await setItem.getItem('BS:User');
    const token = await setItem.getItem('BS:Token');
    // const location= await setItem.getItem('BS:Location') 
    // const  existLocation=JSON.parse(location)
    // console.log("test location3 ",existLocation.lat,"$$",existLocation.lon)
    console.log("test location3 ",name)
    api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    
    const response=await  api.post(`${URL}/setterbyname`,{
      name:name
    }).then((res)=>{
    console.log("DATA SETEER ",res.data)
    setdummydata(res.data)
    setloading(false)
    return  res.data
  }).catch(err=>console.log("Erorr 500 ",err.massege),setloading(true))

  }

 

 
    return (
      <View style={styles.mainView}>
        <Box  >
          {!loading?
            <Box>
              <Input placeholder="ابحث باسم الحاضنه" shadow={'2'}  width="99%" size={'xl'} borderRadius="10" py="1" px="2" mt='3' borderWidth=".7"
                   backgroundColor= {Colors.white} textAlign='right' fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontSize={18}
                onSubmitEditing={(val)=> setterDataSubmit(val.nativeEvent.text) } InputLeftElement={<Icon ml="2" size="22" color="gray.400" as={<Ionicons name="ios-search" size={25} onPress={(val)=>setterData(val)} style={{padding:10}} />} />} />
            </Box>:<Box/>} 
        
        
        </Box>

        {!loading?
          <View style={{ flex: 1 }}>
          {dummydata.length >= 1 ? <Box>
            <Text fontFamily={Platform.OS=='android'?Fonts.type.regular:Fonts
          .type.regular}  fontSize={fontPixel(18)} textAlign='left'  color={Colors.newTextClr} mr='3' mt={3} mb='3' >تنائج عملية البحث</Text>
            {dummydata.map((item, index) => {
              return (
                  <Box key={index} borderColor={"#FFFFFF"} marginLeft={pixelSizeHorizontal(15)} marginTop={21} paddingBottom={2} flexDirection={'row'}
                    width={widthPixel(388)} height={heightPixel(129)} backgroundColor={"#FFFFFF"}   >
                    <Box>
                      <Image source={{ uri: `${URL}/users/${item.owner}/avatar` }} resizeMode='contain' style={{
                        height: heightPixel(109), width: widthPixel(109),
                        marginTop: pixelSizeVertical(6), marginRight: pixelSizeHorizontal(10), borderRadius: 10
                      }} />
                    </Box>

                    <Box flexDirection={'column'} width={Metrics.WIDTH * 0.560} ml={pixelSizeHorizontal(20)} backgroundColor={Colors.transparent} marginTop={3} >
                      <Box flexDirection={'row'} justifyContent='space-between' alignItems={'baseline'} >
                        <Stack flexDirection={'row'} justifyContent='space-around' >
                          <Text style={{ fontFamily: Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular, fontSize: fontPixel(16), color: Colors.newTextClr }}>{item.name}</Text>
                          <Text style={{ fontFamily: Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular, fontSize: fontPixel(18), color: "#FB5353", marginLeft: pixelSizeHorizontal(4) }} >{item.mainservice}</Text>
                        </Stack>
                        <Image source={Images.save} style={{ width: widthPixel(15), height: heightPixel(15) }} resizeMode='contain' />
                      </Box>
                      <Box flexDirection={'row'} justifyContent="space-between">
                        <Stack flexDirection={'row'} >
                          <Text style={{ fontFamily: Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular, fontSize: fontPixel(10), color: Colors.newTextClr }}>{item.hourstotal}</Text>
                          <Text style={{ fontFamily: Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular, fontSize: fontPixel(10), color: Colors.newTextClr, marginLeft: pixelSizeHorizontal(2) }}>ساعة عمل</Text>
                        </Stack>
                        <Stack position={'relative'} bottom={1} >
                          <Text style={{ fontFamily: Platform.OS === 'android' ? Fonts.type.medium : Fonts.type.medium, fontSize: fontPixel(10), color: Colors.rmadytext, marginLeft: pixelSizeHorizontal(2) }}>حفظ  </Text>
                        </Stack>

                      </Box>

                      <Box flexDirection={'row'} justifyContent="space-between" mt={1} >
                        <Stack width={60} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={Colors.pinkystack}>
                          <Text style={{ fontFamily: Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular, fontSize: fontPixel(10), color: Colors.newTextClr }}>{item.price} ر.س/ساعة</Text>
                        </Stack>
                        <Stack width={60} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={Colors.yellowstack} flexDirection='row'>
                          <Text style={{ fontFamily: Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular, fontSize: fontPixel(10), color: Colors.newTextClr }}>{item.rate}</Text>
                          <Image source={Images.starticon} style={{ width: widthPixel(20), height: heightPixel(20) }} resizeMode='contain' />

                        </Stack>

                        <TouchableOpacity onPress={() => props.navigation.navigate('Shrtcutprofile', { data1: item, settertTitle: item.name })}>
                          <Stack width={60} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={Colors.pinkystack} flexDirection='row' >
                            <Text style={{ fontFamily: Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular, fontSize: fontPixel(10), color: Colors.newTextClr }}>احجزي الان</Text>
                          </Stack>
                        </TouchableOpacity>

                        {/* <AirbnbRating
                // onFinishRating={(e)=>ratingCompleted(e)}
                style={{ paddingVertical: 1, backgroundColor: Colors.transparent }}
                count={5}
                //defaultRating={item.rating ? Number(setterdata.rating)/5:0}
                imageSize={20}
                tintColor={"#E5E5E5"}
                showRating={false}
                size={8}  
                starContainerStyle={styles.ratingContainerStyle}
                isDisabled /> */}
                      </Box>
                    </Box>


                  </Box>
              )})}

          </Box>:
          <Box alignItems={'center'} mt='10'><Heading>
            <Text fontFamily={Platform.OS
            ==='android'?Fonts.type.aminafonts:Fonts.type.base} fontWeight='light' >لاتوجد نتائج للبحث !</Text></Heading>
          </Box>}
          
           
        </View>:
        <Box mt={6} justifyContent='center' alignItems={'center'}>
          {loading&&<Spinner size={'lg'} color={Colors.amin1Button1} animating={loading}  />}
        </Box>
        
        }
       
          
           
      </View>
    );
}
export  default SearchScreen;