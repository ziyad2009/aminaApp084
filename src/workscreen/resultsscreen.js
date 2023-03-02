import React, { useState,useEffect ,useCallback,useContext,useRef} from 'react';
import {TouchableOpacity, View,Image,Platform,KeyboardAvoidingView,AppState,ActivityIndicator, Alert} from 'react-native'
import {Box,Avatar,HStack,VStack,Spacer,Center,Text,Button, Radio,Modal,Stack, Input, Badge} from 'native-base'
import{Metrics,Colors,Fonts,Images,fontPixel,widthPixel,heightPixel,pixelSizeHorizontal,pixelSizeVertical} from '../assets/Themes/'
import CustomButton from '../services/buttons/buttton';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
 
const ResultScreen=(props)=>{
    return(
        <Box alignItems={'center'} >
            <Stack backgroundColor={Colors.backgroundimage} borderRadius={22} mt={5} p={10}>
              <Image source={Images.wowimage} style={{width:77,height:77}} />
            </Stack>
            <Stack  mt={5}>
              <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(20)}  > لقد تم قبول طلبك للاستمرار بالحجز</Text> 
            </Stack>
            <Stack backgroundColor={Colors.transparent}>
              <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(20)} mt={4}>اكمل الدفع</Text>
            </Stack>
            
            <Stack flexDirection={'row'} alignItems={'center'} w={Metrics.WIDTH * 0.940} justifyContent='space-between' ml='3' mr='4' mt={3}  >
                  <CustomButton
                    buttonColor={Colors.AminaPinkButton}
                    title="الغاء"
                    buttonStyle={{ width: '44%', alignSelf: 'center',borderRadius:10 }}
                    textStyle={{ fontSize: fontPixel(18) ,fontFamily:Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium }}
                    onPress={() => props.canselextratime() }
                  />
                  <CustomButton  
                    buttonColor={Colors.enabledButton}
                    title="ادفع الان"
                    buttonStyle={{ width: '44%', alignSelf: 'center',borderRadius:10 }}
                    textStyle={{ fontSize: fontPixel(18) ,fontFamily:Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium  }}
                    titleColor={Colors.newTextClr}
                    onPress={() =>  props.goPayemnet(true) }
                  />
            </Stack>
          </Box>

    )
}
export default ResultScreen;