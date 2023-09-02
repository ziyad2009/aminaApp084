import React, { useState ,useEffect} from 'react';
import {View,TouchableOpacity,FlatList,Image, Alert, Platform} from 'react-native'
import {Box, Button,Heading,Spinner,HStack,Spacer,VStack,Text,Center,Modal, Stack} from 'native-base';
import styles from './styles';
import {Metrics,Colors,Fonts,Images,pixelSizeHorizontal,pixelSizeVertical,fontPixel,heightPixel,widthPixel} from '../assets/Themes';
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

 import { Rating,AirbnbRating } from 'react-native-ratings';
import api from '../services/api';
import { URL_ws,URL } from '../services/links';
import { sendNotifcation } from '../services/fucttions';
import CustomButton from '../services/buttons/buttton';
import OutlaintButton from '../services/buttons/buttonsOutlain';
 
let HOURSWORK 
let TOTALRATING=0
const FinleScreeen=(props)=>{
    
    const  babysetter=props.route.params.data1
    const[rating1,setrating1]=useState(0)
    const[rating2,setrating2]=useState(0)
    const[rating3,setrating3]=useState(0)
    const[rating4,setrating4]=useState(0)
    const[rating5,setrating5]=useState(0)
    const[rating6,setrating6]=useState(0)
    const[totalRating,settotalRating]=useState(1)
    const[loading,setloading]=useState(false)
    const[showModal,setShowModal]=useState(false)
    const [hourswork, sethourswork] = useState(false)
    const[hoursworktotal,sethoursworktotal]=useState(0)

    useEffect(async () => {
    setTimeout(() => {
          readWorkhours(props.route.params.data1.settterowner)
          
          sethourswork(true)
        }, 1000);
    
      }, [])
    

    const endingRate= async( )=>{
        //get ttotal reating from babysetter orders
        const id =babysetter.settterfaileid
        const setterrevew=await api.get(`totalratforsetter/${id}`)
        .then((res)=>{  return res.data }) 
        //next
        const result= await setterrevew
          const totalrate= result.map((item)=>{
            return item.total 
        })
        //het finle rate 
        const finleResult=Number(totalrate) 
        //update rating for  baby setter profile to backend by id of babysetter
        const updateRate= await api.patch(`updatesetter/${id}`,{
            rate:finleResult
            
        }).then((res)=>{
             console.log(' Update total total',res.data)
        }) .finally(()=>{
            sendNotif()
          })
    }

    const totalratingSetter=async( )=>{
        setloading(true)
        const total=(rating1+rating2+rating3+rating4+rating5+rating6)
        const finleRating=total/5
        settotalRating(finleRating)
        let TOTALRATING=finleRating
 
        await api.patch('/rateordersetter',{
            orderID:babysetter._id,
            totalrating:finleRating
        }).then((res)=>console.log("order after rating==",res.data) ).finally(() =>endingRate(finleRating)  
        ).catch((err)=>console.log("Erorr",err))
     
    
    }
      

    const sendNotif= ()=>{
    
        const data={
            receiver:babysetter.settterowner,
            content:" لقد تم تقييم الحاضنه من قبل الام ",
            title:"تقيم طلب ",
            orderid:babysetter.orderid
        }
        sendNotifcation(data)
        setloading(false)
        setShowModal(true)
    }

    
  const readWorkhours = async (id) => {

    const response = await api.get(`allorderbysetterworkhours/${id}`).then((res) => {
      console.log(res.data[0].totalhours)
        HOURSWORK = res.data[0].totalhours
        sethoursworktotal(res.data[0].totalhours)
        console.log("from req",res.data[0].totalhours)
    }).finally(() => sethourswork(true)).catch((err) => {
      HOURSWORK = 0
     
    })
    return response
  }

  const GoMainScreen=()=>{
    setShowModal(false)
    //props.navigation.popToTop()
    props.navigation.navigate('Home')
         
  }
       
    return(
        <Box w={Metrics.WIDTH} flex={1} alignItems='center' backgroundColor={'white'} mt={Platform.OS==='android'?"33":"70"}>
          <Box    marginLeft={pixelSizeHorizontal(15)} marginTop={'12'}   paddingBottom={2} flexDirection={'row'} 
                width={widthPixel(388)} height={heightPixel(140)} backgroundColor={"#FFFFFF"}   >
          <Box>
            <Image source={{ uri: `${URL}/users/${babysetter.settterowner}/avatar` }} resizeMode='contain' style={{height:heightPixel(109),width:widthPixel(109),
              marginTop:pixelSizeVertical(6),marginRight:pixelSizeHorizontal(10),borderRadius:10 }} />
          </Box>
          <Box flexDirection={'column'}   width={Metrics.WIDTH*0.560} ml={pixelSizeHorizontal(20)} backgroundColor={Colors.transparent} marginTop={3} > 
              {/* <Box flexDirection={'row'} justifyContent='space-between' alignItems={'baseline'} backgroundColor='amber.100' >
                  <Stack flexDirection={'column'} justifyContent='space-around' >
                    <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold,fontSize:fontPixel(24),color:Colors.newTextClr }}  >{babysetter.settername}</Text>
                    <Text  style={{fontFamily:Platform.OS==='android'?Fonts.type.light:Fonts.type.light,fontSize:fontPixel(12),color:"#585858",marginLeft:pixelSizeHorizontal(4) }} >{babysetter.serviestype}</Text>
                  </Stack>
                  <Image source={Images.save} style={{width:widthPixel(20),height:heightPixel(20)}} resizeMode='contain'/>
              </Box>
              <Box flexDirection={'row'} justifyContent="space-between">
                
                <Stack position={'relative'} bottom={1} >
                  <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium,fontSize:fontPixel(10),color:Colors.rmadytext ,marginLeft:pixelSizeHorizontal(2)} }>حفظ  </Text>
                </Stack>
                
              </Box> */}
              <Box flexDirection={'row'} justifyContent='space-between' alignItems={'baseline'} >
                <Stack flexDirection={'row'} justifyContent='space-between' mt={1} ml={2}   width={widthPixel(222)}>
                  <Text  fontFamil={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontSize={fontPixel(24)} color={Colors.newTextClr} >{babysetter.settername}</Text>
                  <Image source={Images.save} style={{width:widthPixel(20),height:heightPixel(20)}} resizeMode='contain'/>
                </Stack>
              </Box> 
          
            <Box flexDirection={'row'} justifyContent="space-between">
              <Stack flexDirection={'row'} >
                <Text  fontFamil={Platform.OS==='android'?Fonts.type.light:Fonts.type.light} fontSize={fontPixel(12)} color={Colors.smolegrayColors} marginLeft={pixelSizeHorizontal(4)} >{babysetter.serviestype}</Text>
              </Stack>
              
              <Stack position={'relative'} bottom={1} >
                <Text fontFamil={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(10)} color={Colors.rmadytext} marginLeft={pixelSizeHorizontal(2)}  >حفظ  </Text>
              </Stack>
            </Box>

              <Box flexDirection={'row'} justifyContent="space-between" mt={1} >
                <Stack width={60} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={Colors.pinkystack}>
                    <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(10),color:Colors.newTextClr }}>{babysetter.price} ر.س/ساعة</Text>
                  </Stack>
                  <Stack width={60} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={Colors.yellowstack} flexDirection='row'>
                    <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(10),color:Colors.newTextClr }}>{babysetter.rating}</Text>
                    <Image source={Images.starticon} style={{width:widthPixel(20),height:heightPixel(20)}} resizeMode='contain'/>
                  </Stack>
              
                {/* <TouchableOpacity onPress={() => props.navigation.navigate('Shrtcutprofile', { data1: setterdata, settertTitle: setterdata.name })}>
                  <Stack width={60} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={Colors.pinkystack} flexDirection='row' >
                  <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(10),color:Colors.newTextClr }}>احجزي الان</Text>
                  </Stack>
                </TouchableOpacity> */}
                
                
                  <Stack width={60} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={Colors.pinkystack} flexDirection='row' >
                  {hourswork && <Text fontFamil={Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular} fontSize={fontPixel(10)} color={Colors.newTextClr}>{HOURSWORK}ساعه عمل</Text>}
                  </Stack>
                 

                  {/* <AirbnbRating
                  // onFinishRating={(e)=>ratingCompleted(e)}
                  style={{ paddingVertical: 1, backgroundColor: Colors.transparent }}
                  count={5}
                  //defaultRating={setterdata.rating ? Number(setterdata.rating)/5:0}
                  imageSize={20}
                  tintColor={"#E5E5E5"}
                  showRating={false}
                  size={8}  
                  starContainerStyle={styles.ratingContainerStyle}
                  isDisabled /> */}
              </Box>
          </Box>
      
      
      
    </Box>
    <Box flexDirection={'column'}    alignItems='baseline'  justifyContent={'space-around'}  w={"95%"}>
      <Stack alignItems={'flex-start'}   flexDirection='row' w={"90%"}  mt={3} mb={1}>
        <Feather name='star' color={Colors.AminaButtonNew} size={22} />
        <Text ml={3} fontFamily={Fonts.type.aminafonts} fontSize={18}>التقييم </Text>
          {totalRating > 0 &&<Text fontFamily={Fonts.type.aminafonts} fontSize={18}>{TOTALRATING}</Text>}
      </Stack>
      <Box flexDirection={'row'}  backgroundColor={Colors.AminabackgroundColor} borderRadius={10} borderColor={Colors.black} alignItems='baseline'  justifyContent={'space-around'} borderWidth={.2} w={"100%"}>
        <Stack>
          <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(16),color:Colors.newTextClr }}>راضي</Text>
        </Stack>
        <Stack>
          <AirbnbRating
            style={{ paddingVertical: 10 ,backgroundColor:Colors.transparent,padding:10,width:Metrics.WIDTH*0.343}}
            selectedColor={Colors.TexTPink}
            unSelectedColor='#BDC3C7'
            size={15}
            
            onFinishRating={(e)=>setrating1(e)}
            starContainerStyle={styles.ratingContainerStyle}
            ratingContainerStyle={{ paddingVertical: 10 ,backgroundColor:Colors.transparent,padding:10,width:Metrics.WIDTH*0.343}}
            count={totalRating}
            

            showRating ={false}
            isDisabled ={true}
          />
        </Stack>
        <Stack>
          <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(16),color:Colors.newTextClr }}>غير راضي</Text>
        </Stack>
      </Box>
    </Box>

    <Stack alignItems={'center'} flexDirection='column'  w={"99%"}>

    <HStack borderRadius={10} borderColor={Colors.black} borderWidth={.2}
      alignItems='baseline' flexDirection='row' w={"95%"}  backgroundColor={Colors.AminabackgroundColor}
      justifyContent='space-between' padding={1} mt={1} mb={1} >
      <Text fontFamily={Fonts.type.aminafonts} fontWeight='500' fontSize={15} ml='2'>التزام الحاضنه بالوقت</Text>
      <AirbnbRating
        selectedColor={Colors.TexTPink}
        unSelectedColor='#BDC3C7'
        size={15}
        onFinishRating={(e)=>setrating1(e)}
        starContainerStyle={styles.ratingContainerStyle}
        ratingContainerStyle={{backgroundColor:Colors.transparent ,marginRight:1}}
        count={5}
        defaultRating={0}

        showRating ={false}
      />
        </HStack>
        <HStack borderRadius={10} borderColor={Colors.black} borderWidth={.2}
            alignItems='baseline' flexDirection='row' w={"95%"} backgroundColor={Colors.AminabackgroundColor}
            justifyContent='space-between' padding={1} mt={1} mb={1} >
          <Text fontFamily={Fonts.type.aminafonts} fontWeight='500' 
            fontSize={15} ml='2' w="44%" textAlign={'left'} >التزام الحاضنه بالوقت</Text>
          <AirbnbRating
            selectedColor={Colors.TexTPink}
            unSelectedColor='#BDC3C7'
            size={15}
            onFinishRating={(e)=>setrating2(e)}
            starContainerStyle={styles.ratingContainerStyle}
            ratingContainerStyle={{backgroundColor:Colors.transparent ,marginRight:1}}
            count={5}
            defaultRating={0}
            showRating ={false}
          />
        </HStack>
        <HStack borderRadius={10} borderColor={Colors.black} borderWidth={.2}
            alignItems='baseline' flexDirection='row' w={"95%"}  backgroundColor={Colors.AminabackgroundColor}
            justifyContent='space-between' padding={1} mt={1} mb={1} >
          <Text fontFamily={Fonts.type.aminafonts} fontWeight='500' 
            fontSize={15} ml='2' w="44%" textAlign={'left'} >اتباع الحاضنة التعليمات </Text>
          <AirbnbRating
            selectedColor={Colors.TexTPink}
            unSelectedColor='#BDC3C7'
            size={15}
            onFinishRating={(e)=>setrating3(e)}
            starContainerStyle={styles.ratingContainerStyle}
            ratingContainerStyle={{backgroundColor:Colors.transparent ,marginRight:1}}
            count={5}
            defaultRating={0}
            showRating ={false}
          />
        </HStack>
        <HStack borderRadius={10} borderColor={Colors.black} borderWidth={.2}
            alignItems='baseline' flexDirection='row' w={"95%"}  backgroundColor={Colors.AminabackgroundColor}
            justifyContent='space-between' padding={1} mt={1} mb={1} >
          <Text fontFamily={Fonts.type.aminafonts} fontWeight='500' 
            fontSize={15} ml='2' w="44%" textAlign={'left'} >متابعة الاطفال ورعاييتهم</Text>
          <AirbnbRating
            selectedColor={Colors.TexTPink}
            unSelectedColor='#BDC3C7'
            size={15}
            onFinishRating={(e)=>setrating4(e)}
            starContainerStyle={styles.ratingContainerStyle}
            ratingContainerStyle={{backgroundColor:Colors.transparent ,marginRight:1}}
            count={5}
            defaultRating={0}
            showRating ={false}
           />
        </HStack>
        <HStack borderRadius={10} borderColor={Colors.black} borderWidth={.2}
            alignItems='baseline' flexDirection='row' w={"95%"} backgroundColor={Colors.AminabackgroundColor}
            justifyContent='space-between' padding={1} mt={1} mb={1} >
          <Text fontFamily={Fonts.type.aminafonts} fontWeight='500' 
            fontSize={15} ml='2' w="44%" textAlign={'left'} >هل ترشح الحاضنة لاسرى اخرى</Text>
          <AirbnbRating
             selectedColor={Colors.TexTPink}
             unSelectedColor='#BDC3C7'
             size={15}
             onFinishRating={(e)=>setrating5(e)}
             starContainerStyle={styles.ratingContainerStyle}
             ratingContainerStyle={{backgroundColor:Colors.transparent ,marginRight:1}}
             count={5}
             defaultRating={0}
             showRating ={false}
          />
        </HStack>
        <HStack borderRadius={10} borderColor={Colors.black} borderWidth={.2}
            alignItems='baseline' flexDirection='row' w={"95%"} backgroundColor={Colors.AminabackgroundColor}
            justifyContent='space-between' padding={1} mt={1} mb={1}>
          <Text fontFamily={Fonts.type.aminafonts} fontWeight='500' 
            fontSize={15} ml='2' w="44%" textAlign={'left'} >مستوى رضاك العام عن الحاضنه</Text>
          <AirbnbRating
            selectedColor={Colors.TexTPink}
            unSelectedColor='#BDC3C7'
            size={15}
            onFinishRating={(e)=>setrating6(e)}
            starContainerStyle={styles.ratingContainerStyle}
            ratingContainerStyle={{backgroundColor:Colors.transparent ,marginRight:1}}
            count={5}
            defaultRating={0}
            showRating ={false}
          />
        </HStack>
    </Stack>
    <Box flexDirection={'row'} justifyContent='space-between'  w={"90%"} mt={1}>
      <OutlaintButton
              buttonColor={"#F5F5F5"}
              title="الغاء"
              titleColor={Colors.newTextClr}
              buttonStyle={{width: '44%', alignSelf: 'center',borderColor:"#F5F5F5",borderRadius:10}}
              textStyle={{fontSize: 20}}
              onPress={() => props.navigation.popToTop()}
      />
      <CustomButton
              buttonColor={Colors.AminaPinkButton}
              title="ارسال"
              buttonStyle={{width: '50%', alignSelf: 'center',borderRadius:10}}
              textStyle={{fontSize: 20}}
             // onPress={() => totalratingSetter()}
             onPress={() => totalratingSetter()}
      />
      

    </Box>
      {loading&&<Box>
                        <Spinner size={'lg'} color={Colors.AminaButtonNew} />
      </Box>}
        <Center  >
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}
            backgroundColor={Colors.transparent} borderColor={"#a3a2a2"} opacity={1} borderRadius={'md'}
            avoidKeyboard justifyContent="flex-end" >
            <Modal.Content width={Metrics.WIDTH} h={ Metrics.HEIGHT * 0.522} backgroundColor='white' >
            <Box alignItems={'center'} justifyContent='center' >
              <Stack backgroundColor={Colors.backgroundimage} borderRadius={22} mt={5} p={10}>
                <Image source={Images.wowimage} style={{width:77,height:77}} />
              </Stack>
              <Stack  mt={5}>
                <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontSize={fontPixel(24)}  >تم ارسال التقييم بنجاح</Text> 
              </Stack>
              <Stack backgroundColor={Colors.transparent} alignItems='center' justifyContent={'center'}>
                <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(18)} mt={4}>شكرا على تقييمك للخدمة</Text>
                <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(18)} mt={4}>يومك سعيد</Text>
              </Stack>
              <Stack flexDirection={'row'} alignItems={'center'} w={Metrics.WIDTH * 0.940} justifyContent='center' ml='3' mr='4' mt={3}  >
                  <CustomButton
                    buttonColor={Colors.AminaPinkButton}
                    title="الرئيسية"
                    buttonStyle={{ width: '90%', alignSelf: 'center',borderRadius:10 }}
                    textStyle={{ fontSize: fontPixel(18) ,fontFamily:Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium }}
                    onPress={() => GoMainScreen()}
                  />
                   
              </Stack>
            </Box>


            </Modal.Content>


          </Modal>


        </Center>        
             
  </Box>
    )

}
export default FinleScreeen;