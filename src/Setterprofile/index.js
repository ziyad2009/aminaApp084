
import React,{useEffect,useState} from 'react';
import {View,Image, ScrollView,Platform} from 'react-native'
import { Box,Heading,Avatar,Text, VStack, HStack,TextArea,Stack, Spinner, Spacer,Button} from 'native-base';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import Swiper from 'react-native-swiper'
import setItem from '../services/storage';
import api from '../services/api';
import {Rating} from 'react-native-ratings' ;
import { Colors,Fonts ,Metrics,Images} from '../assets/Themes';
import styles from './styles'; 
import {URL_ws,URL} from '../services/links';
import CustomButton from '../services/buttons/buttton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'




const BabysetesrsProfile=(props )=>{
const[babseters,setbabyseters]=useState([])
const[loading,setLoding]=useState(false)
const [seterloc,setseterloc]=useState('')
const [imageswork,setimageswork]=useState([])

const [imgList1]=useState( props.route.params.data1.imagesInWork)
 

useEffect( async()=>{
setbabyseters(props.route.params.data1)
console.log("ALL LLL",props.route.params.data1)

//  setTimeout(()=>{
//   console.log("TestUR",babseters)
//    // getLocation()
  
//  },3000) 
 
},[])

// useEffect( async()=>{
//   getsetter()
 
   
//   },[babseters])
   
const getsetter= async()=>{
  const id =babseters.settterowner
   if (id==='undefined'){
    console.log("und++++++")
   }
    const token=await setItem.getItem('BS:Token')
      console.log("id setter",babseters.settterowner)
       api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      const response =await api.get(`/setter/${id}`).then((res)=>{
        return res.data
      })
      
  
      setimageswork(response)
}

const confirmReservisionTime =()=>{
  console.log("Test ddata",babseters)
  props.navigation.navigate('ConfirmRes',{data1:JSON.stringify(babseters)})
}


return(
  <ScrollView>
    <Box flex={1} backgroundColor={Colors.white} mt={Platform.OS==='android'?55:94} >
        <VStack alignItems={'center'}   space={1} >
       <Image  source={{ uri: `${URL}/users/${babseters.settterowner}/avatar`}} resizeMode='stretch' 
                style={{width: 100, height:100,marginLeft:5,marginRight:20,borderRadius:60}} />
        <Image source={Images.like1} resizeMode='contain'  style={{position:'absolute',left:150,bottom:3, width:Metrics.WIDTH*0.09922,backgroundColor:Colors.transparent}} />
        </VStack>
        <VStack alignItems={'center'}>
            <Box flexDirection={'column'} justifyContent={'space-around'}  mt="1" >
                <Text  fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} fontSize={22} textAlign='center'  fontWeight="medium"letterSpacing={1.5} >{babseters.displayname} </Text>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} fontSize={15}  textAlign='center' fontWeight="light" >"{babseters.serviestype?babseters.serviestype:"-"}"</Text>
            </Box>
            
        </VStack>  

        <Stack flexDirection={'row'} width={Metrics.WIDTH}  justifyContent={'space-around'} alignItems='baseline'>
      <VStack flexDirection={'column'} flex={1} alignItems='center'  mt={3}>
        <Foundation name="dollar" size={40} color={Colors.AminaButtonNew} style={{ marginLeft: 3 }} />
        <Text fontFamily={Platform.OS === 'android' ? Fonts.type.light : Fonts.type.base} fontSize={18} fontWeight="light" ml={3}>{babseters.price}ريال</Text>
      </VStack>
      <VStack flexDirection={'column'} flex={1} alignItems='center'  mt={3}>
        <EvilIcons name="calendar" size={40} color={Colors.AminaButtonNew} />
        <Text fontFamily={Platform.OS === 'android' ? Fonts.type.aminafonts : Fonts.type.base} fontSize={18} fontWeight='light'>{babseters.totalhours === undefined ? "0" : babseters.totalhours} ساعه عمل</Text>
      </VStack>  

      </Stack> 
      
      <HStack flexDirection={'column'}   ml='2'>
      <Heading textAlign={'left'}>
        <Text  fontFamily={Fonts.type.bold} fontSize={18} fontWeight="700"> عن {babseters.displayname} </Text>
        </Heading>
      <TextArea    numberOfLines={4} placeholder="نبذه عن الحاضنه"    value={babseters.bio} isReadOnly={true}
         _dark={{
        placeholderTextColor: "gray.100"
      }}  w={'95%'} conte fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base} fontWeight={'light'} 
          fontSize={18} textAlign={'right'} flexWrap='wrap' />
      </HStack>
       
         <VStack flexDirection={'row'} alignItems='flex-start' ml={2} mt={3} space='3'  >
          <EvilIcons name="location" size={28} color={'#00ABB9'} />
          <Text  fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base} fontSize={11} fontWeight='light'  mr='10' alignItems='flex-start'>{babseters.address} </Text>
         </VStack>

         <Box mt={2} mb={1}>
         <Image source={Images.awsma} resizeMode='contain' style={{ width: Metrics.WIDTH*0.9321 , height: Metrics.HEIGHT * 0.0453}} />
         </Box>
        
          
        
        <View style={{ alignItems:'center',marginBottom:10,marginLeft:8, marginTop:8,width:Metrics.WIDTH*0.952,
          height:Metrics.HEIGHT*0.2381,backgroundColor:Colors.transparent}}>

        <Swiper    style={styles.wrapper}
          dot={
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,.2)',
                width: 5,
                height: 5,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
                 
              }}
            />
          }
          activeDot={
            <View
              style={{backgroundColor: '#000',width: 8,height: 8,borderRadius: 4,marginLeft: 3,marginRight: 3,marginTop: 3,marginBottom: 3 }}
            /> }
            autoplay={true}
            autoplayTimeout={2.5}
            showsButtons={true}
            buttonWrapperStyle={{backgroundColor: Colors.transparent, borderColor:Colors.red, flexDirection: 'row', position: 'absolute', top: 0, left: 0, flex: 1, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center'}}
            >
              {imgList1.map(({name,type})=>{
                return  (
                  <View key={name} style={{alignItems:'center'}}>
                    <Image
                      resizeMode='cover'
                      style={styles.imagHome}
                      source={{uri: `${URL}/${name}` }}
                      />
                    <MaterialIcons name='zoom-out-map' size={33} color={Colors.white} onPress={()=>props.navigation.navigate('Zoomphoto',{setterdata :name}) }
                    style={{position:'absolute',left:25,top:2}} />
                   
                  </View>
                  
                  
                 )
              })}
            </Swiper>

        </View>
          <Box alignItems={'center'} w={Metrics.WIDTH*0.934} ml='3' mr='4' mb={Platform.OS==='android'?4:1}  >
                    {/* <Button bgColor={Colors.AminaButtonNew} size={'lg'} mb='1.5' w='full' onPress={() => {
                        confirmReservisionTime() }}
                    > احجز</Button> */}
                      <CustomButton
                        buttonColor={Colors.AminaButtonNew}
                        title="احجز"
                        buttonStyle={{width: '90%', alignSelf: 'center',borderRadius:6}}
                        textStyle={{fontSize: 20}}
                        onPress={() =>  confirmReservisionTime()}
                      />

          </Box>
        </Box>
    </ScrollView>
)

}

export default BabysetesrsProfile;