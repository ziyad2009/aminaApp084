
import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, Platform,TouchableOpacity } from 'react-native'
import { Box, Heading, Avatar, Text, VStack, HStack, TextArea, Stack, Spinner, Spacer, Button, Modal, Center } from 'native-base';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import Swiper from 'react-native-swiper'
import setItem from '../services/storage';
import api from '../services/api';
import { Rating } from 'react-native-ratings';
import { Colors, Fonts, Metrics, Images,fontPixel,widthPixel,heightPixel,pixelSizeHorizontal,pixelSizeVertical } from '../assets/Themes';
import styles from './styles';
import { URL_ws, URL } from '../services/links';
import CustomButton from '../services/buttons/buttton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'



let HOURSWORK = 0
let DATAHOLDE = []
let chikTimer
const BabysetesrsProfile = (props) => {
  const [babseters, setbabyseters] = useState([])
  const [loading, setLoding] = useState(false)
  const [seterloc, setseterloc] = useState('')
  const [imageswork, setimageswork] = useState([])

  const [imgList1] = useState(props.route.params.data1.imagesInWork)
  const [hourswork, sethourswork] = useState(false)
  const[hoursworktotal,sethoursworktotal]=useState(0)
  const [prevvorder, setprevorrder] = useState(false)
  const [disButton, setdisButton] = useState(false)

  useEffect(async () => {
    setbabyseters(props.route.params.data1)
    console.log("test data props++++ ",props.route.params.data1)
  }, [])

  useEffect(async () => {
    
    const from = props.route.params.data1.start
    const to = props.route.params.data1.end
    const owner = props.route.params.data1.settterowner
     setTimeout(() => {
      readWorkhours(props.route.params.data1.settterowner)
      cheakOrder(owner, from, to)
      sethourswork(true)
    }, 1000);

  }, [props.route.params.data1])

  const getsetter = async () => {
    const id = babseters.settterowner
    if (id === 'undefined') {
      console.log("und++++++")
    }
    const token = await setItem.getItem('BS:Token')
    console.log("id setter", babseters.settterowner)
    api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    const response = await api.get(`/setter/${id}`).then((res) => {
      return res.data
    })

 
    setimageswork(response)
  }

  const confirmReservisionTime = () => {
    
    props.navigation.navigate('ConfirmRes', { data1: JSON.stringify(babseters) })
  }

  const cheakOrder = async (owner, from, to) => {

    const token = await setItem.getItem('BS:Token');
    const motherData = await setItem.getItem('BS:User');
    const mother = JSON.parse(motherData)
    const motheerId = mother._id
    // const start =moment(from).toISOString()
    // const end =moment(to).toISOString()
   
    api.defaults.headers.Authorization = (`Bearer ${JSON.parse(token)}`);
    const response = await api.post("checkorder", {
      SETTEROWNER: owner,
      MOTHEROWNER: motheerId,
      STATUSE: "processing",
    }).then((res) => {
      return res.data
    }).catch((err) => {
      console.log("Erorr checkorder order", err)
    })

    if (response.length >= 1) {
      console.log("test res", response.length)
      DATAHOLDE = response
      setprevorrder(true)
      setdisButton(true)
    }
  } 

  const readWorkhours = async (id) => {

    const response = await api.get(`allorderbysetterworkhours/${id}`).then((res) => {
      console.log("Test total",res.data[0].totalhours)
        HOURSWORK = res.data[0].totalhours
        sethoursworktotal(res.data[0].totalhours)
    }).finally(() => sethourswork(true)).catch((err) => {
      console.log("Erorr from readWorkhours",err)
        HOURSWORK = 0
     
    }) 
    return response
  }

  const canselRequest = async (id) => {
    const from = props.route.params.data1.start
    const to = props.route.params.data1.end
    const owner = props.route.params.data1.owner
    const orderId = id.toString()

    console.log("canssel", orderId)
    await api.delete(`/mother/order/${orderId}`).then((res) => {
      setprevorrder(false)
    }).finally(() => cheakOrder(owner, from, to))
      .catch((err) => { console.log("ERORR", err) })

  }
  const ReternScreen=()=>{
    setdisButton(true)
    props.navigation.goBack()
  }


  return (
    <Box  backgroundColor={Colors.white}  h={"100%"} w={"99%"}>
    <Box backgroundColor={Colors.white} marginTop={Platform.OS==='android'?'20':32}    height={"100%"}  >
     
      <Box  borderColor={Colors.veryLightGray} borderRadius={10} marginLeft={pixelSizeHorizontal(15)} marginTop={2}   paddingBottom={2} flexDirection={'row'} 
            width={widthPixel(370)}   backgroundColor={Colors.white} >
        <Box>
          <Image source={{ uri: `${URL}/users/${babseters.settterowner}/avatar` }} resizeMode='contain' style={{height:heightPixel(109),width:widthPixel(109),
           marginTop:pixelSizeVertical(6),marginRight:pixelSizeHorizontal(10),borderRadius:10 }} />
        </Box>

        <Box flexDirection={'column'}   width={widthPixel(228)} ml={pixelSizeHorizontal(20)}  marginTop={1} > 
          <Box flexDirection={'row'} justifyContent='space-between' alignItems={'baseline'} >
            <Stack flexDirection={'row'} mt={1} ml={2} >
              <Text  fontFamil={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontSize={fontPixel(24)} color={Colors.newTextClr} >{babseters.settername}</Text>
             </Stack>
             <Stack>
             <Image source={Images.save} style={{width:widthPixel(20),height:heightPixel(20)}} resizeMode='contain'/>
             </Stack>
          </Box> 
        
          <Box flexDirection={'row'} justifyContent="space-between">
            <Stack flexDirection={'row'} >
              <Text  fontFamil={Platform.OS==='android'?Fonts.type.light:Fonts.type.light} fontSize={fontPixel(12)} color={Colors.smolegrayColors} marginLeft={pixelSizeHorizontal(4)} >{babseters.mainservice}</Text>
            </Stack>
             
            <Stack position={'relative'} bottom={1} >
              <Text fontFamil={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(10)} color={Colors.rmadytext} marginLeft={pixelSizeHorizontal(2)}  >حفظ  </Text>
            </Stack>
          </Box>

          <Box flexDirection={'row'} justifyContent="space-between" mt={1} >
            <Stack width={60} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={Colors.pinkystack}>
              <Text  fontFamil={Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular} fontSize={fontPixel(10)} color={Colors.newTextClr}  >{babseters.price} ر.س/ساعة</Text>
            </Stack>
            <Stack width={60} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={Colors.yellowstack} flexDirection='row'>
             <Text  fontFamil={Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular} fontSize={fontPixel(10)} color={Colors.newTextClr} >{babseters.rate}</Text>
             <Image source={Images.starticon} style={{width:widthPixel(20),height:heightPixel(20)}} resizeMode='contain'/>

            </Stack>
            <Stack width={60} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={Colors.pinkystack}>
            {hourswork && <Text fontFamil={Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular} fontSize={fontPixel(10)} color={Colors.rmadytext}>{HOURSWORK} ساعه عمل</Text>}
              
            </Stack>
            
              
          </Box>
           
          </Box>
          
          
          </Box>
          <Box  alignItems='flex-start' ml={3} mt={1}>
          <TextArea mt={1} mb={2}    placeholder="نبذه عن الحاضنه" value={babseters.bio} isReadOnly={true} borderColor={'white'}
            width={"100%"}  height={20}  numberOfLines={20}  fontFamily={Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular} 
            fontSize={12} textAlign={'right'}  />
          </Box>
          
         
 

        <Box mt={3} ml={3}  >
          <Stack flexDirection={'column'}  >
            <Stack alignItems={'flex-start'} flexDirection={'row'} ml={4} >
            <Image source={Images.cirtfcate} style={{width:widthPixel(17),height:heightPixel(17)}} resizeMode='contain'/>
            <Text  fontFamil={Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular} fontSize={fontPixel(14)}  color={Colors.newTextClr} ml={2} >شهادات ودورات مهنية</Text>
            
            </Stack>
            <Stack>
              <TextArea mt={1} mb={2}    placeholder="  الشهادات والموهلات الحاضنه" value={babseters.certificate} isReadOnly={true} borderColor={'white'}
              width={"100%"}  height={20}  numberOfLines={20}   fontFamily={Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular} 
              fontSize={12} textAlign={'right'}  textDecorationLine='underline' />
            </Stack>
            
          </Stack>
        
        
          
        </Box>



        <View style={{
          alignItems: 'center', marginBottom: 10, marginLeft: 8, marginTop: 8, width: Metrics.WIDTH * 0.952,
          height: Metrics.HEIGHT * 0.2381, backgroundColor: Colors.transparent
        }}>

          <Swiper style={styles.wrapper}
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
                style={{ backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }}
              />}
            autoplay={true}
            autoplayTimeout={2.5}
            showsButtons={true}
            buttonWrapperStyle={{ backgroundColor: Colors.transparent, borderColor: Colors.red, flexDirection: 'row', position: 'absolute', top: 0, left: 0, flex: 1, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center' }}
          >
            {imgList1.map(({ name, type }) => {
              return (
                <View key={name} style={{ alignItems: 'center' }}>
                  <Image
                    resizeMode='cover'
                    style={styles.imagHome}
                    source={{ uri: `${URL}/${name}` }}
                  />
                  <MaterialIcons name='zoom-out-map' size={33} color={Colors.white} onPress={() => props.navigation.navigate('Zoomphoto', { setterdata: name })}
                    style={{ position: 'absolute', left: 25, top: 2 }} />

                </View>


              )
            })}
          </Swiper>

        </View>
        <Box alignItems={'center'} w={Metrics.WIDTH * 0.934} ml='3' mr='4' mt={'16'} mb={Platform.OS === 'android' ? 4 : '10'}  >
          <CustomButton
            buttonColor={Colors.textZahry}
            title="احجزي الان"
            buttonStyle={{ width: '90%', alignSelf: 'center', borderRadius: 10 }}
            textStyle={{ fontSize: 20 }}
            disabled={disButton}
            onPress={() =>  confirmReservisionTime() }
          />

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
    </Center>
    </Box>
  )

}

export default BabysetesrsProfile;