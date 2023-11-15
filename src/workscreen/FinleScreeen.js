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
import images from '../assets/Themes/Images';
 
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
        const total=(rating1+rating2+rating3+rating4)
        const finleRating=total/4
        settotalRating(finleRating)
        let TOTALRATING=finleRating
 
        console.log("tets total",TOTALRATING)
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
          <Box flexDirection={'column'} justifyContent='space-around' alignItems={'center'} >
            <Stack  justifyContent='center' alignItems={'center'} mt={'10'}>
              <Text  fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontSize={fontPixel(22)} fontWeight="700" color={Colors.textZahry} letterSpacing={1.3} >قيم الخدمة</Text>
            </Stack>
          </Box> 

          <Box  alignItems="center" width={'80'} backgroundColor={'gray.100'} mt={'4'} padding={'1'} borderRadius={'3xl'} borderWidth={'1'} borderColor={'gray.200'} >
            <Stack  justifyContent='center' alignItems={'center'} mt={1}>
              <Text  fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontSize={fontPixel(20)} fontWeight={'700'} color={Colors.newTextClr} letterSpacing={1.2} >التقييم العام</Text>
            </Stack>
            <Stack  flexDirection={'row'} justifyContent='center' alignItems={'center'} mt={1} ml={2}>
              <Text  fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontSize={fontPixel(18)} color={Colors.greentext} >{babysetter.settername}</Text>
              <Stack flexDirection={'row'} ml={'2'}>
                {totalRating < 0 ? <Text  fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontSize={fontPixel(12)} fontWeight={'500'} color={Colors.greentext} > 0 </Text>:
                          <Text  fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontSize={fontPixel(12)} color={Colors.greentext} >{TOTALRATING}</Text> }
                <Image source={images.starticon} resizeMode='contain' style={{width:18,height:18,marginLeft:2}} />
              </Stack>
            </Stack>
          </Box>

          <Box flexDirection={'column'} justifyContent='space-around' alignItems={'center'}  >
            <Stack  alignItems="center" width={'80'} backgroundColor={'gray.100'} mt={'4'} padding={'1'} borderRadius={'3xl'} borderWidth={'1'} borderColor={'gray.200'}>
              <Text fontFamily={Fonts.type.aminafonts} fontWeight='700' fontSize={15}   ml='2'>مدى التزام مقم الخدمة</Text>
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
            </Stack>
            <Stack alignItems="center" width={'80'} backgroundColor={'gray.100'} mt={'4'} padding={'1'} borderRadius={'3xl'} borderWidth={'1'} borderColor={'gray.200'} >
              <Text fontFamily={Fonts.type.aminafonts} fontWeight='700' 
              fontSize={15} ml='2' mt={'2'} textAlign={'left'} >مدى جودة خدمات مقدم الخدمة  </Text>
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
            </Stack>
            <Stack alignItems="center" width={'80'} backgroundColor={'gray.100'} mt={'4'} padding={'1'} borderRadius={'3xl'} borderWidth={'1'} borderColor={'gray.200'} >
              <Text fontFamily={Fonts.type.aminafonts} fontWeight='700' 
              fontSize={15} ml='2' mt={'2'} textAlign={'left'} >هل تووصين الامهات بطلب الخدمة؟ </Text>
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
            </Stack>
            <Stack alignItems="center" width={'80'} backgroundColor={'gray.100'} mt={'4'} padding={'1'} borderRadius={'3xl'} borderWidth={'1'} borderColor={'gray.200'} >
              <Text fontFamily={Fonts.type.aminafonts} fontWeight='700' 
              fontSize={15} ml='2' mt={'2'} textAlign={'left'} >مدى رضاك العام عن الخدمة</Text>
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
            </Stack>
          
          </Box>
          
          <Box flexDirection={'row'} justifyContent='center' alignItems={'center'}   mt={'12'}>
             
          <CustomButton
              buttonColor={Colors.AminaPinkButton}
              title="تقييم"
              buttonStyle={{width: '88%', alignSelf: 'center',borderRadius:22}}
              textStyle={{fontSize: 20}}
             // onPress={() => totalratingSetter()}
             onPress={() => totalratingSetter()}
          />
        </Box>
      
      {loading&&<Box><Spinner size={'lg'} color={Colors.AminaButtonNew} />
        </Box>}

        <Center  >
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}
            backgroundColor={Colors.transparent} borderColor={"#a3a2a2"} opacity={1} borderRadius={'md'}
            avoidKeyboard justifyContent="flex-end" >
            <Modal.Content width={Metrics.WIDTH} h={ Metrics.HEIGHT * 0.522} backgroundColor='white' borderTopRadius={'3xl'} >
            <Box alignItems={'center'} justifyContent='center' >
              <Stack backgroundColor={Colors.transparent} borderRadius={22} mt={5} p={10}>
                <Image source={Images.rightbinky} style={{width:150,height:150}} />
              </Stack>
              <Stack  mt={3}>
                <Text color={Colors.textZahry} fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={'700'} fontSize={fontPixel(25)} letterSpacing={1.3}  >تم التقييم بنجاح</Text> 
              </Stack>
               
              <Stack flexDirection={'row'} alignItems={'center'} w={Metrics.WIDTH * 0.940} justifyContent='center' ml='3' mr='4' mt={3}  >
                  <CustomButton
                    buttonColor={Colors.AminaPinkButton}
                    title="عوددة"
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