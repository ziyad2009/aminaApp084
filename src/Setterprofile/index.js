
import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, Platform,TouchableOpacity,FlatList } from 'react-native'
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
  const[babsetersPhone,setbabysetersPhone]=useState(null)
  const [loading, setLoding] = useState(true)
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
      getsetter(props.route.params.data1.settterowner)
      console.log(" test und++++++",props.route.params.data1.settterowner)
    }, 2000);

  }, [props.route.params.data1])

  const getsetter = async (val) => {
    const id = await val
    if (id === 'undefined') {
      return console.log("und++++++")
    }
    const token = await setItem.getItem('BS:Token')
     api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    const response = await api.get(`/setter/${id}`).then((res) => {
      return res.data
    }).finally(()=>{setLoding(false)})
    console.log('setter phone',response.setter.phone)
   
    setbabysetersPhone(response.setter.phone)
    //setimageswork(response)
  }

  const confirmReservisionTime = () => {
    //add babyesetter phone to prev data
    const submitData={
      ...props.route.params.data1,
      setterphone:babsetersPhone
    }
    
    console.log("befor leave",submitData)
    props.navigation.navigate('ConfirmRes', { data1: JSON.stringify(submitData) })
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

  return (
    <Box flex={1} backgroundColor={Colors.AminabackgroundColor} justifyContent='center' w={"99%"}>
      {!loading? 
      <Box h={"90%"} backgroundColor={Colors.AminabackgroundColor} marginTop={Platform.OS === 'android' ? '12' : '24'}   >

        <Box borderColor={Colors.white} borderWidth={1} borderRadius={10} marginLeft={5} marginTop={2} paddingBottom={2} flexDirection={'row'}
          width={Platform.OS === 'android' ? widthPixel(300) : widthPixel(371)} backgroundColor={Colors.white} >
          <Box>
            <Image source={{ uri: `${URL}/users/${babseters.settterowner}/avatar` }} resizeMode='contain' style={{
              height: heightPixel(109), width: widthPixel(109),
              marginTop: pixelSizeVertical(6), marginRight: pixelSizeHorizontal(10), borderRadius:44
            }} />
          </Box>

          <Box flexDirection={'column'} width={widthPixel(228)} ml={1} marginTop={1} >
            <Box flexDirection={'row'} justifyContent='space-between' alignItems={'baseline'} >
              <Stack flexDirection={'row'} mt={1} ml={2} >
                <Text fontFamily={Platform.OS === 'android' ? Fonts.type.bold:Fonts.type.bold} fontSize={fontPixel(24)} fontWeight={700} color={Colors.newTextClr} >{babseters.displayname}</Text>
              </Stack>
              <TouchableOpacity>
                <Image source={Images.hartgray} style={{ width: widthPixel(20), height: heightPixel(20) }} resizeMode='contain' />
              </TouchableOpacity>
            </Box>

            <Box flexDirection={'row'} justifyContent="space-between" >
              <Stack flexDirection={'row'} >
                <Text fontFamily={Platform.OS === 'android' ? Fonts.type.base : Fonts.type.base} fontSize={fontPixel(12)} letterSpacing={1.8} color={Colors.amin1Button1} marginLeft={pixelSizeHorizontal(4)} >{babseters.mainservice}</Text>
              </Stack>

              <Stack position={'relative'} bottom={1} >
                <EvilIcons name='share-apple' color={Colors.textZahry}  size={22}  />
              </Stack>
            </Box>

            <Box flexDirection={'row'} justifyContent="space-between" mt={1} >
                <Stack width={60} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={"#6BAF59"} padding={"1"}>
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

        
        <Box alignItems='flex-start' backgroundColor={Colors.transparent} ml={3} mt={1}>
          <Text fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontSize={fontPixel(18)} fontWeight='bold' color={Colors.red} >نبذه مختصره</Text>
          <TextArea  width={"100%"} placeholder="نبذه عن الحاضنه" value={babseters.bio} isReadOnly={true} borderColor={'gray.100'}
             numberOfLines={20} lineHeight='lg'   fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontWeight={'700'}
            fontSize={fontPixel(16)} textAlign={'right'} color={Colors.newTextClr}  />
      
            
            {/* <Text numberOfLines={4} mt={1} mb={2} fontSize={fontPixel(12)} textAlign={'left'}
                flexWrap={'wrap'} letterSpacing={.2}lineHeight={'3xl'}
              fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontWeight={'700'}  >
            {babseters.bio}
            </Text> */}
        </Box>
        <Box mt={1} ml={1} alignItems={'baseline'}>
          <Text fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontSize={fontPixel(18)} fontWeight='bold' color={Colors.red} >العنوان</Text>
          <Stack flexDirection={'row'} justifyContent='space-around'  ml={3}>
            <Image source={Images.locationgreen} style={{width:widthPixel(16),height:heightPixel(22)}}  />
            <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontSize={fontPixel(13)} fontWeight={'700'} color={Colors.newTextClr} ml={2} >{babseters.address}</Text>
          </Stack>
        </Box>
        
        <Box mt={'3'}>
          <Stack flexDirection={'column'}>
            <Stack alignItems={'flex-start'} flexDirection={'row'} ml={'3'} >
              <Image source={Images.cirtfcate} style={{ width: widthPixel(17), height: heightPixel(17) }} resizeMode='contain' />
              <Text fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontSize={fontPixel(18)} fontWeight='bold' color={Colors.red} >شهادات ودورات مهنية</Text>
            </Stack>
            <Stack>
              <TextArea mt={1} mb={2} ml={5} placeholder="الشهادات والموهلات الحاضنه" value={babseters.certificate} isReadOnly={true} borderColor={'white'}
                width={"100%"} height={20} numberOfLines={20} fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontWeight={'700'}
                fontSize={12} textAlign={'right'} textDecorationLine='underline' />
            </Stack>

          </Stack>



        </Box>



        <View style={{
          alignItems: 'center', marginBottom: 10, marginLeft: 8, marginTop: 8, width: Metrics.WIDTH * 0.952,
          height: Metrics.HEIGHT * 0.1881, backgroundColor: Colors.transparent
        }}>
{/* 
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
          </Swiper> */}
          <FlatList 
            data={imgList1}
            keyExtractor={(item, index) => item + index}
            renderItem={({item,index}) => <ImageItem item={item} index={index} len={imgList1.length}/>}
            style={{width:Metrics.WIDTH *0.911,  marginLeft:1,marginRight:2,backgroundColor:Colors.transparent}}
            horizontal={true}
            //numColumns={2}
          />

        </View>
        <Box alignItems={'center'} w={Metrics.WIDTH * 0.934} ml='3' mr='4' mt={'4'} mb={Platform.OS === 'android' ? 4 : '10'}  >
          <CustomButton
            buttonColor={Colors.textZahry}
            title="احجزي الان"
            buttonStyle={{ width: '90%', alignSelf: 'center', borderRadius: 10 }}
            textStyle={{ fontSize: 20 }}
            disabled={disButton}
            onPress={() => confirmReservisionTime()}
          />

        </Box>
      </Box>:<Box mt={'40'} alignItems={'center'} ><Spinner size={'lg'} color={Colors.black} /></Box>}
      <Center>
        <Modal animationPreset='fade' isOpen={prevvorder} height={heightPixel(570)} mt={'72'} backgroundColor={Colors.white} onClose={() => setprevorrder(false)} >

          <Modal.Body>

            <Box alignItems={'center'}>
              <Stack backgroundColor={Colors.backgroundimage} borderRadius={55} mt={10} p={10}>
                <Image source={Images.canselorder} style={{ width: widthPixel(128), height: heightPixel(128) }} />
              </Stack>
              <Stack mt={8}>
                <Text color={Colors.newTextClr} fontFamily={Platform.OS === 'android' ? Fonts.type.medium : Fonts.type.medium} fontSize={fontPixel(20)}  >لديك طلب مسبق لدى الحاضنة بانتظار التأكيد</Text>
              </Stack></Box>
            <Box w={"100%"}>
              {DATAHOLDE.map((item) => {
                return (
                  <Box key={item._id} flexDirection='row' alignItems={'baseline'} justifyContent='space-around'>
                    <Text color={Colors.newTextClr} fontFamily={Platform.OS === 'android' ? Fonts.type.medium : Fonts.type.medium} fontSize={fontPixel(16)}>{item.settername}</Text>
                    <Text color={Colors.newTextClr} fontFamily={Platform.OS === 'android' ? Fonts.type.medium : Fonts.type.medium} fontSize={fontPixel(16)}>{item.serviestype}</Text>

                    <Stack borderRadius={'lg'} borderColor='gray.200' m={3} flexDirection={'row'} marginLeft={4}>
                      <Text fontSize={fontPixel(10)} color={Colors.black}>الغاء</Text>
                      <EvilIcons name='close' size={22} onPress={() => canselRequest(item._id)} color={Colors.bloodOrange} />
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
              buttonStyle={{ width: '90%', alignSelf: 'center', borderRadius: 10 }}
              textStyle={{ fontSize: 20 }}
              onPress={() => setprevorrder(false)}
            />
          </Modal.Footer>
        </Modal>
      </Center>
    </Box>
  )

}

export default BabysetesrsProfile;