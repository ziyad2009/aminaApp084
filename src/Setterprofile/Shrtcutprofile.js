
import React,{useEffect,useState} from 'react';
import {View,Image, TouchableOpacity,Platform,} from 'react-native'
import { Box,Heading,Avatar,Text, VStack, HStack,TextArea, Spinner, Spacer,Button,Center, Stack, ScrollView, Modal, FlatList} from 'native-base';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import Foundation from 'react-native-vector-icons/Foundation';
import Swiper from 'react-native-swiper'
import setItem from '../services/storage';
import api from '../services/api';
import {Rating} from 'react-native-ratings' ;
import { Colors,Fonts ,Metrics,Images,fontPixel,pixelSizeHorizontal,pixelSizeVertical,widthPixel,heightPixel} from '../assets/Themes';
import styles from './styles'; 
import {URL_ws,URL} from '../services/links';
import CustomButton from '../services/buttons/buttton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment';
import axios from 'axios';


let HOURSWORK
let DATAHOLDE=[]
const Shrtcutprofile=(props )=>{
const[babseters,setbabyseters]=useState([])
const[loading,setLoding]=useState(false)
const [seterloc,setseterloc]=useState('')
  
const [imgList1]=useState( props.route.params.data1.imagesInWork)
const[hourswork,sethourswork]=useState(false)
const[hoursworktotal,sethoursworktotal]=useState(0)
const[prevvorder,setprevorrder]=useState(false)
const [disButton, setdisButton] = useState(false)
const[locationdetails,setlocationdetals]=useState([])

useEffect( async()=>{
  setbabyseters(props.route.params.data1)
},[])

useEffect(async () => {
  HOURSWORK=0 
 //getLocattionDetails(props.route.params.data1.location)
  // const from=props.route.params.data1.start
  // const to =props.route.params.data1.end
  const owner=props.route.params.data1.owner
  setTimeout(() => {
    readWorkhours(props.route.params.data1.owner)
    cheakOrder(owner)
    sethourswork(true)
  }, 1000);
}, [props.route.params.data1])

 
const cheakOrder=async(owner)=>{
 
  const token = await setItem.getItem('BS:Token');
  const motherData = await setItem.getItem('BS:User');
  const mother=JSON.parse(motherData)
  const motheerId=mother._id
  
  api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
  const response=await api.post("checkorder",{
    SETTEROWNER:owner,
    MOTHEROWNER:motheerId,
    STATUSE:"processing",
  }).then((res)=>{
    return res.data
  }).catch((err)=>{
    console.log("Erorr Cjeak order",err)
  })
  if(response.length >=1){
    console.log("test res",response.length)
    DATAHOLDE=response
    setprevorrder(true)
    setdisButton(true)
   }
}


const confirmReservisionTime =()=>{
 // props.navigation.navigate('ConfirmRes',{data1:JSON.stringify(babseters)})
// props.navigation.push('Fourm1',{productTitle: babseters.mainservice, serviceid:null ,serviceNmae:babseters.service,data1:babseters,orderId:3})
  
 props.navigation.push('Poitment',{productTitle: babseters.mainservice, serviceid:null ,serviceNmae:babseters.service,data1:babseters,orderId:3})
}
 
const readWorkhours = async (id) => {
     
    const response = await api.get(`allorderbysetterworkhours/${id}`).then((res) => {
    console.log(res.data[0].totalhours)
        HOURSWORK = res.data[0].totalhours
        sethoursworktotal(res.data[0].totalhours)

  }).finally(() => sethourswork(true)).catch((err) => {
     
       console.log('Erorr acout hours=', err)
          HOURSWORK = 0 
  })
  return response
}

const canselRequest = async (id) => {
  const from=props.route.params.data1.start
  const to =props.route.params.data1.end
  const owner=props.route.params.data1.owner
  const orderId =id.toString()
 
  console.log("canssel", orderId)
  await api.delete(`/mother/order/${orderId}`).then((res) => {
     setprevorrder(false)
  }).finally(() => cheakOrder(owner,from,to))
      .catch((err) => { console.log("ERORR", err) })
  
}


const ImageItem=({item,index,len} )=>{
  return(
    <View key={item.name} style={styles.containerimage}>

      <Image
        //resizeMode='contain'
        
        //style={(len -1>index)? styles.imagHome:styles.imagHomefullLength}
        style={styles.imagHome}
        source={{ uri: `${URL}/${item.name}` }}
      />
     
      <MaterialIcons name='zoom-in' size={30} color={Colors.black} lineBreakMode='middle' onPress={() => props.navigation.navigate('Zoomphoto', { setterdata: item.name })}
        style={styles.buttonViewimage} />
    
                    {/* <Button onPress={()=>console.log("tets",setterdata.name)} >ttest</Button> */}

    </View>
  )
}

// const ImageItem=({setterdata})=>{
//   return(
//     <View key={setterdata.name} style={styles.containerimage}>
//        <ImageViewer
//                  enableImageZoom={true}
//                 renderHeader={()=><AntDesign name='close' size={30} color={Colors.white} style={{marginTop:Platform.OS==='android'? 20:88,marginRight:12}} onPress={()=>showModel() } />}
//                 imageUrls={images}/>
                
//       <Image
//         resizeMode='contain'
        
//         style={styles.imagHome}
//         source={{ uri: `${URL}/${setterdata.name}` }}
//       />
//       <EvilIcons name='eye' size={33} color={Colors.textZahry} onPress={() => props.navigation.navigate('Zoomphoto', { setterdata: setterdata.name })}
//         style={styles.buttonViewimage} />
                   
//                     {/* <Button onPress={()=>console.log("tets",setterdata.name)} >ttest</Button> */}

//     </View>
//   )
// }


const  getLocattionDetails=async(loc)=>{
  const  geoapify={
    key:'c4f58dbcba424e86be11ad602549059a',
    key2:"AIzaSyA2pSYX2J6rUcHE2d2W-YD4tpBeciHbDhw",
    site:'https://www.geoapify.com/reverse-geocoding-api'
}

//language
console.log("test llll",loc);
  var config = {
    method: 'get',
   // uri:`https://maps.googleapis.com/maps/api/geocode/json?address='+${loc.coordinates[0]}+ ',' +${loc.coordinates[1]}'&key=' + ${geoapify.key2}`,
    url: `https://api.geoapify.com/v1/geocode/reverse?lat=${loc.coordinates[0]}&lon=${loc.coordinates[1]}&apiKey=${geoapify.key}&lang=ar`,
    headers: { }
  };
  await axios(config)
  .then(function (response) {
      console.log(response.data.features);
      setlocationdetals(response.data.features) 
     //res.status(201).send(response.data)
  })
  .catch(function (error) {
    //res.status(404).send(error)
    console.log("tets api loca",error)
  });

}
return(
  <ScrollView  backgroundColor={Colors.white}  h={"100%"} w={"99%"}>
    <Box backgroundColor={Colors.AminabackgroundColor} mt={Platform.OS==='android'?'16':'32'}      >
     
       <Box  borderColor={Colors.AminabackgroundColor} borderRadius={10} marginLeft={'4'} marginTop={2}   paddingBottom={2} flexDirection={'row'} justifyContent={"space-around"} 
            width={ Platform.OS==='android'? Metrics.WIDTH*0.8902: widthPixel(391)} backgroundColor={Colors.AminabackgroundColor} >
        <Box>
          <Image source={{ uri:`${URL}/users/${babseters.owner}/avatar` }} resizeMode='contain' style={{
              height: heightPixel(109), width: widthPixel(109),
              marginTop: pixelSizeVertical(6), marginRight: pixelSizeHorizontal(10), borderRadius:44
            }} />
        </Box>

        <Box flexDirection={'column'}   width={Platform.OS==='android'? widthPixel(230): widthPixel(254)}  marginTop={1} backgroundColor='white'> 
          <Box flexDirection={'row'} justifyContent='space-between' alignItems={'baseline'}  >
            <Stack flexDirection={'row'} mt={1}  alignItems='baseline' width={Platform.OS==='android'? widthPixel(230):widthPixel(235)} justifyContent='space-between'  >
            <Text fontFamily={Platform.OS === 'android' ? Fonts.type.bold:Fonts.type.bold} fontSize={fontPixel(24)} fontWeight={700} color={Colors.newTextClr} >{babseters.displayname}</Text>
              <TouchableOpacity>
              <Image source={Images.hartgray} style={{width:widthPixel(20),height:heightPixel(20)}} resizeMode='contain'/>
              </TouchableOpacity>
            </Stack>
          </Box> 
        
          <Box flexDirection={'row'} justifyContent="space-between" mt={'1'}   width={Platform.OS==='android'? widthPixel(230):widthPixel(235)} >
            <Stack flexDirection={'row'}  >
              <Text  fontFamily={Platform.OS === 'android' ? Fonts.type.base : Fonts.type.base} fontSize={fontPixel(12)} letterSpacing={1.8} color={Colors.amin1Button1} marginLeft={pixelSizeHorizontal(4)} >{babseters.mainservice ? babseters.mainservice : "-"}</Text>
            </Stack>
            <Stack position={'relative'} bottom={1} >
                <EvilIcons name='share-apple' color={Colors.textZahry}  size={22}  />
            </Stack>
          </Box>

          <Box flexDirection={'row'} justifyContent="space-between" mt={'2'} >
            <Stack width={'16'} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={"#6BAF59"} padding={"1"}>
                  <Text fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontSize={fontPixel(12)} color={Colors.white}>{babseters.price} ر.س/ساعة</Text>
            </Stack>
            <Stack width={'12'} height={36} alignItems='center' justifyContent={'space-around'} borderRadius={'lg'} backgroundColor={"#FFB01E"} flexDirection='row' padding={'1'}>
                  <Text fontFamil={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontSize={fontPixel(12)} color={Colors.white} >{babseters.rate}</Text>
                  <Image source={Images.staryellow} style={{ width: widthPixel(20), height: heightPixel(20) }} resizeMode='contain' />
            </Stack>
            <Stack width={'20'} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={"#EFEEFF"}>
                  {hourswork && <Text fontFamily={Platform.OS === 'android' ? Fonts.type.base : Fonts.type.base} fontSize={fontPixel(12)} color={Colors.newTextClr}>{HOURSWORK} ساعه عمل</Text>}
            </Stack>
          </Box>
        </Box> 
          
          
      </Box>

      <Box  alignItems='flex-start' ml={3}     backgroundColor={Colors.white} mt={2}>
        <Stack alignItems={'flex-start'} flexDirection={'row'} ml={2} >
                <Image source={Images.noteRed} style={{ width: widthPixel(17), height: heightPixel(17) }} resizeMode='contain' />
                <Text fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontSize={fontPixel(18)} fontWeight='bold' color={Colors.red}ml={'2'} >نبذه مختصره</Text>
        </Stack>
              
        <TextArea  width={"100%"} placeholder="نبذه عن الحاضنه" value={babseters.bio} isReadOnly={true} borderColor={'gray.100'}
              numberOfLines={20} lineHeight='lg'  fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontWeight={'700'} 
              fontSize={fontPixel(16)} textAlign={'right'} color={Colors.newTextClr}  />
      </Box>
      <Box mt={'3'} ml={'3'}>
            <Stack flexDirection={'column'}  >
              <Stack alignItems={'flex-start'} flexDirection={'row'} ml={2} >
                <Image source={Images.certfcateRed} style={{ width: widthPixel(17), height: heightPixel(17) }} resizeMode='contain' />
                <Text fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontSize={fontPixel(18)} fontWeight='bold' color={Colors.red}  ml={'2'}>شهادات ودورات مهنية</Text>
              </Stack>
              <Stack>
                <TextArea mt={1} mb={2} ml={5} placeholder="شهادات ودورات مهنية" value={babseters.certificate} isReadOnly={true} borderColor={'white'}
                  width={"100%"} height={20} numberOfLines={20} fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontWeight={'700'}
                  fontSize={12} textAlign={'right'} textDecorationLine='underline' />
              </Stack>
            </Stack>
          </Box>

          <Box mt={3} ml={1} flexDirection={'column'} >
              <Stack alignItems={'flex-start'} ml={'4'} >
                <Text fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontSize={fontPixel(18)} fontWeight='bold' color={Colors.red} >العنوان</Text>
              </Stack>
              <Box alignItems={'baseline'} flexDirection={'row'}>
                <Stack flexDirection={'row'}    alignItems={'baseline'} ml={3}>
                  <Image source={Images.locationred} style={{width:widthPixel(16),height:heightPixel(22)}}/>
                </Stack>
                <Stack flexDirection={'row'}    alignItems={'baseline'} ml={3}>
                  <Text fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontSize={fontPixel(12)} fontWeight={'700'} color={Colors.newTextClr} ml={'2'}>{babseters.district}</Text>
                  <Text fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontSize={fontPixel(12)} fontWeight={'700'} color={Colors.newTextClr} ml={'2'}> - {babseters.city}</Text>
                </Stack>
              </Box>
          </Box>
          <Box mt={3} ml={1} alignItems={'baseline'}>
              <Stack flexDirection={'row'} alignItems={'baseline'}  ml={3}>
                <Image source={Images.acompany} style={{width:widthPixel(16),height:heightPixel(16),marginRight:6}}resizeMode='contain'  />
                <Text  fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontSize={fontPixel(14)} fontWeight='bold' color={Colors.red} >امكانية مرافقة الام</Text>
              </Stack>
              <Stack flexDirection={'row'} alignItems={'baseline'}  ml={3}>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontSize={fontPixel(18)} fontWeight={'700'} color={Colors.newTextClr} ml={'2'} >{babseters.accompany?"متاح":"غير متاح"}</Text>
              </Stack>
          </Box>
          <Box mt={3} ml={1} alignItems={'baseline'}>
              <Stack flexDirection={'row'} alignItems={'baseline'}  ml={3}>
                <Image source={Images.dollar} style={{width:widthPixel(16),height:heightPixel(16),marginRight:6}}resizeMode='contain'  />
                <Text  fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontSize={fontPixel(18)} fontWeight='bold' color={Colors.red} >سعر  الساعة يومي</Text>
              </Stack>
              <Stack flexDirection={'row'} alignItems={'baseline'}  ml={3}>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontSize={fontPixel(18)} fontWeight={'700'} color={Colors.newTextClr} ml={'2'} >{babseters.price}</Text>
              </Stack>
          </Box>
          <Box mt={3} ml={1} alignItems={'baseline'}>
              <Stack flexDirection={'row'} alignItems={'baseline'}  ml={3}>
                <Image source={Images.dollar} style={{width:widthPixel(16),height:heightPixel(16),marginRight:6}}resizeMode='contain' />
                <Text  fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontSize={fontPixel(18)} fontWeight='bold' color={Colors.red} >سعر  الساعة اسبوعي</Text>
              </Stack>
              <Stack flexDirection={'row'} alignItems={'baseline'}  ml={3}>
               <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontSize={fontPixel(18)} fontWeight={'700'} color={Colors.newTextClr} ml={'2'} >{babseters.weeklyprice}</Text>
              </Stack>
          </Box>
          <Box mt={3} ml={1} alignItems={'baseline'}>
              <Stack Stack flexDirection={'row'} alignItems={'baseline'}  ml={3}>
                <Image source={Images.dollar} style={{width:widthPixel(16),height:heightPixel(16),marginRight:6}}resizeMode='contain' />
                <Text  fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontSize={fontPixel(18)} fontWeight='bold' color={Colors.red} >سعر  الساعة شهري</Text>
              </Stack>
              <Stack flexDirection={'row'} alignItems={'baseline'}  ml={3}>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontSize={fontPixel(18)} fontWeight={'700'} color={Colors.newTextClr} ml={'2'} >{babseters.monthlyprice}</Text>
              </Stack>
          </Box>
          
      
     
{/* 
         <VStack flexDirection={'row'} alignItems='flex-start' ml={2} mt={2} w="88%" space='3'  >
          <EvilIcons name="location" size={28} color={'#00ABB9'} />
          <Text  fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base} fontSize={11} fontWeight='light'  mr='10' alignItems='flex-start'>{babseters.address} </Text>
         </VStack>
         
         <Box mt={2} mb={1}>
         <Image source={Images.awsma} resizeMode='contain' style={{ width: Metrics.WIDTH*0.9321 , height: Metrics.HEIGHT * 0.0453}} />
         </Box> */}
        
        <View style={{
          alignItems: 'center', marginBottom: 10, marginLeft: 8, marginTop: 8, width: Metrics.WIDTH * 0.952,
          height: Metrics.HEIGHT * 0.1881, backgroundColor: Colors.transparent
        }}>
        {/* <Swiper    style={styles.wrapper}
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
            </Swiper> */}

        <FlatList 
        data={imgList1}
        keyExtractor={(item, index) => item + index}
        renderItem={({item,index}) => <ImageItem item={item} index={index} len={imgList1.length}/>}
        style={{width:Metrics.WIDTH *0.911,  marginLeft:1,marginRight:2,backgroundColor:Colors.transparent}}
        horizontal={true}
        />
        </View>
        <Box alignItems={'center'} justifyContent={'center'} mb={'5'}   >
          {/* <Button bgColor={Colors.AminaButtonNew} size={'lg'} mb='1.5' w='full' 
            onPress={() => {confirmReservisionTime( ) }} > احجز</Button> */}
            <CustomButton
                        buttonColor={Colors.AminaPinkButton}
                        title="احجزي الان"
                        buttonStyle={{width: '88%', alignSelf: 'center',borderRadius:33}}
                        textStyle={{fontSize: 16}}
                        disabled={disButton}
                        onPress={() =>  confirmReservisionTime()}
                      />
                      {/* <CustomButton
                        buttonColor={Colors.AminaPinkButton}
                        title="احجزي ال ان"
                        buttonStyle={{width: '90%', alignSelf: 'center',borderRadius:10}}
                        textStyle={{fontSize: 16}}
                        disabled={disButton}
                        onPress={() =>  readWorkhours(props.route.params.data1.owner)}
                      /> */}
        </Box>
    </Box>
    <Center>
      <Modal animationPreset='fade' isOpen={prevvorder} height={heightPixel(570)} mt={'72'}  backgroundColor={Colors.white} onClose={()=>setprevorrder(false)} >
       
      <Modal.Body>
         
            <Box alignItems={'center'}>
            <Stack backgroundColor={Colors.backgroundimage} borderRadius={55} mt={10} p={10}>
                <Image source={Images.canselorder} style={{width:widthPixel(128),height:heightPixel(128)}} />
            </Stack>
            <Stack  mt={8}>
                <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(20)}  >لديك طلب مسبق لدى الحاضنة بانتظار التأكيد</Text> 
            </Stack></Box>
        <Box w={"100%"}>
          {DATAHOLDE.map((item)=>{
            return(
              <Box key={item._id} flexDirection='row' alignItems={'baseline'} justifyContent='space-around'>
              <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(16)}>{item.settername}</Text>
              <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(16)}>{item.serviestype}</Text>
               
              <Stack borderRadius={'lg'} borderColor='gray.200' m={3} flexDirection={'row'} marginLeft={4}>
                <Text fontSize={fontPixel(10)} color={Colors.black}>الغاء</Text>
                <EvilIcons name='close' size={22}  onPress={()=>canselRequest(item._id)} color={Colors.bloodOrange} />
              </Stack>
              
               
              </Box>
            ) 
            
          })}
             
        </Box>
        
      </Modal.Body>
      <Modal.Footer>
             <CustomButton
                        buttonColor={Colors.AminaPinkButton}
                        title="اغلاق"
                        buttonStyle={{width: '90%', alignSelf: 'center',borderRadius:10}}
                        textStyle={{fontSize: 20}}
                        onPress={() =>  setprevorrder(false)}
                      />
      </Modal.Footer>
    </Modal>
     
      <Modal animationPreset='fade' isOpen={prevvorder} height={heightPixel(570)} mt={'72'}  backgroundColor={Colors.white} onClose={()=>setprevorrder(false)} >
       
      <Modal.Body>
         
            <Box alignItems={'center'}>
            <Stack backgroundColor={Colors.backgroundimage} borderRadius={55} mt={10} p={10}>
                <Image source={Images.canselorder} style={{width:widthPixel(128),height:heightPixel(128)}} />
            </Stack>
            <Stack  mt={8}>
                <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(20)}  >لديك طلب مسبق لدى الحاضنة بانتظار التأكيد</Text> 
            </Stack></Box>
        <Box w={"100%"}>
          {DATAHOLDE.map((item)=>{
            return(
              <Box key={item._id} flexDirection='row' alignItems={'baseline'} justifyContent='space-around'>
              <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(16)}>{item.settername}</Text>
              <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(16)}>{item.serviestype}</Text>
               
              <Stack borderRadius={'lg'} borderColor='gray.200' m={3} flexDirection={'row'} marginLeft={4}>
                <Text fontSize={fontPixel(10)} color={Colors.black}>الغاء</Text>
                <EvilIcons name='close' size={22}  onPress={()=>canselRequest(item._id)} color={Colors.bloodOrange} />
              </Stack>
              
               
              </Box>
            ) 
            
          })}
             
        </Box>
        
      </Modal.Body>
      <Modal.Footer>
             <CustomButton
                        buttonColor={Colors.AminaPinkButton}
                        title="اغلاق"
                        buttonStyle={{width: '90%', alignSelf: 'center',borderRadius:10}}
                        textStyle={{fontSize: 20}}
                        onPress={() =>  setprevorrder(false)}
                      />
      </Modal.Footer>
    </Modal>
    </Center>
    </ScrollView>
)

}

export default Shrtcutprofile;