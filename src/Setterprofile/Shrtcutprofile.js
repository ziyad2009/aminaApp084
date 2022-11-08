
import React,{useEffect,useState} from 'react';
import {View,Image, TouchableOpacity,Platform} from 'react-native'
import { Box,Heading,Avatar,Text, VStack, HStack,TextArea, Spinner, Spacer,Button, Stack, ScrollView} from 'native-base';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import Swiper from 'react-native-swiper'
import setItem from '../services/storage';
import api from '../services/api';
import {Rating} from 'react-native-ratings' ;
import { Colors,Fonts ,Metrics,Images} from '../assets/Themes';
import styles from './styles'; 
import {URL_ws,URL} from '../services/links';
import CustomButton from '../services/buttons/buttton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'



const Shrtcutprofile=(props )=>{
const[babseters,setbabyseters]=useState([])
const[loading,setLoding]=useState(false)
const [seterloc,setseterloc]=useState('')
  
const [imgList1]=useState( props.route.params.data1.imagesInWork)
 

useEffect( async()=>{
 
  setbabyseters(props.route.params.data1)
  
},[])



const confirmReservisionTime =()=>{
  console.log("Test ddata2",babseters)
 // props.navigation.navigate('ConfirmRes',{data1:JSON.stringify(babseters)})
  props.navigation.push('Fourm1',{productTitle: babseters.mainservice, serviceid:null ,serviceNmae:babseters.service,data1:babseters,orderId:3})
}
 
return(
  <ScrollView>
    <Box flex={1} backgroundColor={Colors.white} mt={Platform.OS==='android'?55:94}  >
        <VStack alignItems={'center'}   space={1} > 
        <Image  source={{ uri: `${URL}/users/${babseters.owner}/avatar`}} resizeMode='stretch' 
                  style={{width: 100, height:100,marginLeft:5,marginRight:20,borderRadius:60}} />
        <Image source={Images.like1} resizeMode='contain'  style={{position:'absolute',left:150,bottom:3, width:Metrics.WIDTH*0.09922,backgroundColor:Colors.transparent}} />
        </VStack>
        <VStack alignItems={'center'}>
            <Box flexDirection={'row'} justifyContent={'space-around'} mt="2">
                <Text  fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.base} fontSize={18} fontWeight="medium">{babseters.displayname} </Text>
                <Text fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.base} fontSize={18} fontWeight="light" >"{babseters.mainservice?babseters.mainservice:"-"}"</Text>
            </Box>
            <Image source={Images.awsma} resizeMode="contain"  style={{width:Metrics.WIDTH*0.622,height:Metrics.HEIGHT*0.033,backgroundColor:Colors.transparent}} />
        </VStack>   
      
      <HStack flexDirection={'column'}   ml='2'>
      <Heading textAlign={'left'}>
      <Text  fontFamily={Platform.OS==='android'? Fonts.type.aminafonts:Fonts.type.base} fontSize={18} fontWeight="700"> عن {babseters.displayname} </Text></Heading>
      <TextArea    numberOfLines={4}placeholder="نبذه عن الحاضنه"   value={babseters.bio}
            _dark={{
              placeholderTextColor: "gray.100"
            }}  w={'95%'} conte fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base} fontWeight={'light'} 
                fontSize={10} textAlign={'right'}/>
      </HStack>

         <VStack flexDirection={'row'} alignItems='flex-start' ml={2} mt={2} w="88%" space='3'  >
          <EvilIcons name="location" size={28} color={'#00ABB9'} />
          <Text  fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base} fontSize={11} fontWeight='light'  mr='10' alignItems='flex-start'>{babseters.address} </Text>
         </VStack>
         <VStack flexDirection={'row'} alignItems='flex-start' ml={2} mt={4}>
          <Foundation name="dollar" size={28} color={'#00ABB9'}  style={{marginLeft:3}}/>
          <Text  fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base} fontSize={15} fontWeight="light" ml={3}>{babseters.price} ريال- تكلفة الساعه الواحده</Text><Text  fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base} fontSize={15} fontWeight="light" ml={3}>{babseters.price} ريال- تكلفة الساعه الواحده</Text>
         </VStack>
         <VStack flexDirection={'row'} alignItems='flex-start' ml={2} mt={4}>
         <EvilIcons name="calendar" size={30   } color={'#00ABB9'} />
         <Text  fontFamily={Platform.OS==='android'? Fonts.type.aminafonts:Fonts.type.base} fontSize={15} fontWeight='light'>{babseters.totalhours===undefined ?"0":babseters.totalhours} ساعه عمل في التطبيق  </Text>
         </VStack>
        
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
          {/* <Button bgColor={Colors.AminaButtonNew} size={'lg'} mb='1.5' w='full' 
            onPress={() => {confirmReservisionTime( ) }} > احجز</Button> */}
            <CustomButton
                        buttonColor={Colors.AminaButtonNew}
                        title="احجز"
                        buttonStyle={{width: '90%', alignSelf: 'center'}}
                        textStyle={{fontSize: 20}}
                        onPress={() =>  confirmReservisionTime()}
                      />
        </Box>
    </Box>
    </ScrollView>
)

}

export default Shrtcutprofile;