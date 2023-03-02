import React, { useState,useEffect ,useCallback,useContext,useRef} from 'react';
import {TouchableOpacity, View,Image,Platform,KeyboardAvoidingView,AppState,ActivityIndicator, Alert} from 'react-native'
import {Box,Avatar,HStack,VStack,Spacer,Center,Text,Button, Radio,Modal,Stack, Input, Badge} from 'native-base'
import{Metrics,Colors,Fonts,Images,fontPixel,widthPixel,heightPixel,pixelSizeHorizontal,pixelSizeVertical} from '../assets/Themes/'
import CustomButton from '../services/buttons/buttton';
 
 
const CanselForm=(props)=>{
    return(
        <Box alignItems={'center'} >
            <Stack backgroundColor={Colors.backgroundimage} borderRadius={22} mt={5} p={10}>
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
                    onPress={() =>  props.hidemodal(false) }
                  />
            </Stack>
          </Box>

    )
}
export default CanselForm;