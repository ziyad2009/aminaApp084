import React, { useState,useEffect ,useCallback,useContext,useRef} from 'react';
import {TouchableOpacity, View,Image,Platform,KeyboardAvoidingView,AppState,ActivityIndicator, Alert} from 'react-native'
import {Box,Avatar,HStack,VStack,Spacer,Center,Text,Button, Radio,Modal,Stack, Input, Badge} from 'native-base'
import{Metrics,Colors,Fonts,Images,fontPixel,widthPixel,heightPixel,pixelSizeHorizontal,pixelSizeVertical} from '../assets/Themes/'
import CustomButton from '../services/buttons/buttton';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
 
const Counterscreen=(props)=>{
    const  children2 = ({ remainingTime }) => {
        // console.log("remain---",remainingTime)
         const hours = Math.floor(remainingTime / 3600)
         const minutes = Math.floor((remainingTime ) / 60)
        // const minutes = Math.floor((remainingTime ))
        // const seconds = remainingTime % 60
       
         return <Text fontSize={15} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} >{minutes}دقيقه</Text>
       }

    return(
        <Box alignItems={'center'} >
            <Stack backgroundColor={Colors.infotextbackground} mt={12}>
              <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(16)} >تم ارسال الطلب وفي انتظار قبول الحاضنة</Text>
            </Stack>
            <Stack backgroundColor={Colors.transparent}>
              <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(16)} mt={4}>في حال لم يتم الموافقةسيتم الإلغاد خلال ١٥ ةقيقة</Text>
            </Stack>
            <Box mt={5}>
                <CountdownCircleTimer
                    isPlaying
                    duration={900}
                    colors={[Colors.AminaButtonNew, '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[500, 300, 100, 50]}
                    size={80}
                    rotation='clockwise'
                    style={{fontFamily:Fonts.type.aminafonts}}
                    strokeWidth={8} >
                        {children2}
                    {/* {({ remainingTime }) => <Text>{remainingTime}</Text>} */}
                </CountdownCircleTimer>
                </Box> 
                <Stack alignItems={'center'} w={Metrics.WIDTH * 0.940} ml='3' mr='4' mt={10}  >
                  <CustomButton
                    buttonColor={Colors.AminaPinkButton}
                    title="الرجوع لصفحة الخدمة"
                    buttonStyle={{ width: '88%', alignSelf: 'center',borderRadius:10 }}
                    textStyle={{ fontSize: fontPixel(18) ,fontFamily:Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium }}
                    onPress={() => props.handelscreens(4) }
                  />
                </Stack>
          </Box>
    )
}

export default Counterscreen;