import React, { useState ,useEffect} from 'react';
import {View,TouchableOpacity,FlatList,Image, Alert, Platform} from 'react-native'
import {Box, Button,Heading,Spinner,HStack,Spacer,VStack,Text, Stack} from 'native-base';
import styles from './styles';
import {Metrics,Colors,Fonts,Images} from '../assets/Themes';
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

 import { Rating,AirbnbRating } from 'react-native-ratings';
import api from '../services/api';
import { URL_ws,URL } from '../services/links';
import { sendNotifcation } from '../services/fucttions';
import CustomButton from '../services/buttons/buttton';
import OutlaintButton from '../services/buttons/buttonsOutlain';
 

const FinleScreeen=(props)=>{
    console.log("test",props.route.params.data1)
    const  babysetter=props.route.params.data1
    const[rating1,setrating1]=useState(0)
    const[rating2,setrating2]=useState(0)
    const[rating3,setrating3]=useState(0)
    const[rating4,setrating4]=useState(0)
    const[rating5,setrating5]=useState(0)
    const[rating6,setrating6]=useState(0)
    const[totalRating,settotalRating]=useState(2)
    const[loading,setloading]=useState(false)

const unitTes=async()=>{
    console.log("test id ",babysetter._id)
    const id =babysetter.settterfaileid
    const ownerid=babysetter.settterowner
    console.log("r1",rating1,"r1",rating2,"r1",rating3)
    const total=(rating1+rating2+rating3+rating4+rating5+rating6)
    const finleRating=total/5
    settotalRating(finleRating)
    console.log('test finel total',finleRating)

    

     
}
    const endingRate= async( )=>{
        const id =babysetter.settterfaileid
        const setterrevew=await api.get(`totalratforsetter/${id}`)
        .then((res)=>{  return res.data }) 

        const result= await setterrevew
          const totalrate= result.map((item)=>{
            return item.total 
        })

        const finleResult=Number(totalrate) 
        console.log('total all is',Number(finleResult))
        
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
        console.log("r1",rating1,"r1",rating2,"r1",rating3)
        const total=(rating1+rating2+rating3+rating4+rating5+rating6)
        const finleRating=total/5
        settotalRating(finleRating)

        console.log("id",babysetter._id ,"first  rating ",finleRating)
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
            title:"تقييم طلب ",
            orderid:babysetter.orderid
        }
        sendNotifcation(data)
        console.log("test noti",data)
        setloading(false)
        props.navigation.popToTop()
       }
       
    return(
        <Box w={Metrics.WIDTH} alignItems='center' backgroundColor={'white'} mt={Platform.OS==='android'?"70":"70"}>
            
            <Image   source={{uri: `${URL}/users/${babysetter.settterowner}/avatar`}}
                    style={{width:60,height:60, borderColor:"red",borderWidth:.1,borderRadius:50,marginTop:20}} />
                    <Box alignItems={'flex-start'}   flexDirection='row' w={"90%"}  mt={3} mb={1}>
                        <Feather name='star' color={Colors.loginGreen} size={22} />
                        <Text ml={3} fontFamily={Fonts.type.aminafonts} fontSize={18}>التقييم النهائي </Text>
                            {totalRating > 0 &&<Text fontFamily={Fonts.type.aminafonts} fontSize={18}> متوسط التقييم هو  : {totalRating}</Text>}
                        </Box>
                    
                    
                         <HStack  borderRadius={10} borderColor={Colors.black} alignItems='center' justifyContent={'center'} borderWidth={.2} w={"95%"}>
                         
                             <AirbnbRating
                              style={{ paddingVertical: 10 ,backgroundColor:Colors.transparent,padding:10,width:Metrics.WIDTH*0.343}}
                                selectedColor={Colors.TexTPink}
                                unSelectedColor='#BDC3C7'
                                size={15}
                                onFinishRating={(e)=>setrating1(e)}
                                starContainerStyle={styles.ratingContainerStyle}
                                ratingContainerStyle={{ paddingVertical: 10 ,backgroundColor:Colors.transparent,padding:10,width:Metrics.WIDTH*0.343}}
                                count={totalRating}
                                //startingValue={2}
                                showRating ={false}
                                isDisabled ={true}
                          />
                     </HStack>

                     <Stack alignItems={'center'} flexDirection='column'  w={"99%"}>

                     <HStack borderRadius={10} borderColor={Colors.black} borderWidth={.2}
                        alignItems='baseline' flexDirection='row' w={"95%"} 
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
                        startingValue={2}
                         showRating ={false}
                          />
                     </HStack>
                     <HStack borderRadius={10} borderColor={Colors.black} borderWidth={.2}
                        alignItems='baseline' flexDirection='row' w={"95%"} 
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
                        startingValue={2}
                         showRating ={false}
                          />
                     </HStack>
                     <HStack borderRadius={10} borderColor={Colors.black} borderWidth={.2}
                        alignItems='baseline' flexDirection='row' w={"95%"} 
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
                        startingValue={2}
                         showRating ={false}
                          />
                     </HStack>
                     <HStack borderRadius={10} borderColor={Colors.black} borderWidth={.2}
                        alignItems='baseline' flexDirection='row' w={"95%"} 
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
                            startingValue={2}
                            showRating ={false}
                          />
                     </HStack>
                     <HStack borderRadius={10} borderColor={Colors.black} borderWidth={.2}
                        alignItems='baseline' flexDirection='row' w={"95%"} 
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
                            startingValue={2}
                            showRating ={false}
                          />
                     </HStack>
                     <HStack borderRadius={10} borderColor={Colors.black} borderWidth={.2}
                        alignItems='baseline' flexDirection='row' w={"95%"} 
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
                        startingValue={2}
                         showRating ={false}
                          />
                     </HStack>
                     </Stack>
                    <Box flexDirection={'row'} justifyContent='space-between'  w={"90%"} mt={1}>
                        {/* <Button onPress={()=>totalratingSetter()} size={'lg'} bgColor={Colors.TexTPink} ml={5} w={"44%"} borderRadius={10}
                        >ارسال</Button> */}

                        <CustomButton
                                buttonColor={Colors.amin1Button1}
                                title="ارسال"
                                buttonStyle={{width: '50%', alignSelf: 'center'}}
                                textStyle={{fontSize: 20}}
                               // onPress={() => totalratingSetter()}
                               onPress={() => totalratingSetter()}
                            />
                        
                        {/* <Button size={'lg'}  variant={'outline'} ml={3} w={"44%"} borderRadius={10}
                        onPress={()=>props.navigation.popToTop()}>الغاء</Button> */}
                        <OutlaintButton
                                buttonColor={Colors.white}
                                title="الغاء"
                                titleColor={Colors.AminaButtonNew}
                                buttonStyle={{width: '44%', alignSelf: 'center'}}
                                textStyle={{fontSize: 20}}
                                onPress={() => props.navigation.popToTop()}
                            />

                    </Box>
                     {loading&&<Box>
                        <Spinner size={'lg'} color={Colors.AminaButtonNew} />
                        </Box>}
            
             
        </Box>
    )

}
export default FinleScreeen;