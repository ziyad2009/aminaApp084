import React, { useState,useEffect ,useCallback,useContext,useRef} from 'react';
import {TouchableOpacity, View,Image,Platform,KeyboardAvoidingView,AppState,ActivityIndicator, Alert} from 'react-native'
import {Box,TextArea,HStack,VStack,Spacer,Center,Text,Button,Modal,Stack, Input,Radio} from 'native-base'
import{Metrics,Colors,Fonts,Images,fontPixel,widthPixel,heightPixel,pixelSizeHorizontal,pixelSizeVertical} from '../assets/Themes/'
import CustomButton from '../services/buttons/buttton';
import setItem from '../services/storage';
import api from '../services/api';
 
const ResonForm=(props)=>{
    const[value,setValue]=useState('')
    const[reson,setreson]=useState(true)
    useEffect(()=>{
        console.log("tetts val",value)
        // if(value==="وجود سبب اخر"){
        //     setreson(false)
        // }else{
        //     setreson(true)
            
       // }
    },[value])

    

    return(
        <Box alignItems={'center'} >

        {props.done===true?
         <Box alignItems={'center'} flexDirection='column'>
            <Box>
            <Stack alignItems={'flex-start'} >
            <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(14)} mt={4}>سبب الالغاء</Text>
            </Stack>
            <Stack>
                <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={value} onChange={nextValue => {
                     setValue(nextValue);
                    }}>
                    <Radio value="وجود خطاء في معلومات الطلب" my={1}>وجود خطاء في معلومات الطلب</Radio>
                    <Radio value="عدم حضور الحاضنة في الوقت المحدد" my={1}>عدم حضور الحاضنة في الوقت المحدد</Radio>
                    <Radio value="عدم جاهزية الحاضنه لتنفيذ الطلب" my={1}>عدم جاهزية الحاضنه لتنفيذ الطلب</Radio>
                    <Radio value="وجود سبب اخر" my={1}>وجود سبب اخر</Radio>
                </Radio.Group>
            </Stack>
            <Stack>
            <TextArea isDisabled={false} totalLines={6} value={reson} ontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} fontSize={18} fontWeight='bold'  onChangeText={(text)=>setValue(text)}/>
            </Stack>
            </Box>
            <Stack flexDirection={'row'} alignItems={'center'} w={Metrics.WIDTH * 0.740} justifyContent='space-between' ml='3' mr='4' mt={3}  >
                <CustomButton  
                    buttonColor={Colors.AminaPinkButton}
                    title="تاكيد الالغاء"
                    buttonStyle={{ width: '55%', alignSelf: 'center',borderRadius:15 }}
                    textStyle={{ fontSize: fontPixel(18) ,fontFamily:Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium  }}
                    titleColor={Colors.white}
                    onPress={() => props.addReson(value) }
                  />
                <CustomButton  
                    buttonColor={Colors.AminaPinkButton}
                    title="الرجوع لطلباتي"
                    buttonStyle={{ width: '55%', alignSelf: 'center',borderRadius:15 }}
                    textStyle={{ fontSize: fontPixel(18) ,fontFamily:Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium  }}
                    titleColor={Colors.white}
                    onPress={() =>  props.hidemodal(false) }
                  />
            </Stack>
         </Box>
        
        
        :
        <Box><Stack backgroundColor={Colors.backgroundimage} borderRadius={22} mt={5} p={10}>
           <Image source={Images.canselorder} style={{width:77,height:77}} />
         </Stack>
         <Stack  mt={5}>
              <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(36)}  >لايمكن الالغاء</Text> 
            </Stack>
            <Stack backgroundColor={Colors.transparent}>
              <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(14)} mt={4}> لايمكن الغاءء الخدمة قبل ساعة من البدء</Text>
            </Stack>
            
            <Stack flexDirection={'row'} alignItems={'center'} w={Metrics.WIDTH * 0.940} justifyContent='space-between' ml='3' mr='4' mt={3}  >
                  
                  <CustomButton  
                    buttonColor={Colors.AminaPinkButton}
                    title="الرجوع لطلباتي"
                    buttonStyle={{ width: '90%', alignSelf: 'center',borderRadius:15 }}
                    textStyle={{ fontSize: fontPixel(18) ,fontFamily:Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium  }}
                    titleColor={Colors.white}
                    onPress={() =>  props.hidmodal(false) }
                  />
            </Stack>
         </Box>
         
         } 


           



            
          </Box>

    )
}
export default ResonForm;




// ``<Stack flexDirection={"column"} alignItems='flex-start'   w="95%" padding={2}   >
// <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} fontSize={22} fontWeight='bold' >
// اسباب الرفض من قبل الحاضنه</Text>
// <TextArea isDisabled totalLines={6} value={props.resoncansel} ontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} fontSize={18} fontWeight='bold' />
// </Stack>