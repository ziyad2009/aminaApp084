import React, { useState,useEffect ,useCallback,useContext,useRef} from 'react';
import {TouchableOpacity, View,Image,Platform,KeyboardAvoidingView,AppState,ActivityIndicator, Alert} from 'react-native'
import {Box,Avatar,HStack,VStack,Spacer,Center,Text,Button, Radio,Modal,Stack, Input, Badge} from 'native-base'
import{Metrics,Colors,Fonts,Images,fontPixel,widthPixel,heightPixel,pixelSizeHorizontal,pixelSizeVertical} from '../assets/Themes/'
import CustomButton from '../services/buttons/buttton';
 
 const TimeSlots=(props)=>{
    const [slot,setslot]=useState([1,2,3])
    
    return(
        <Box>
            <Stack  alignItems={'flex-start'} mt={'16'} ml={4}>
              <Text fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.base} fontSize={fontPixel(18)} fontWeight={400} textAlign={'right'} >عدد ساعات التمديد</Text>
            </Stack>
            <Stack  direction={'row'} space='3'  ml={pixelSizeVertical(20)} mr={pixelSizeVertical(18)} mt={pixelSizeHorizontal(1)}>
              {slot.map((slt,index)=>{
                return(
                  <Box key={slt} backgroundColor={props.slctslots===index? "#F38193":Colors.white} borderRadius='md'  alignItems={'center'} justifyContent='center'
                      w={widthPixel(63)} height={heightPixel(45)} ml={Platform.OS==='android'?pixelSizeVertical(1): pixelSizeVertical(16)} mr={pixelSizeVertical(18)} mt={pixelSizeHorizontal(2)}  >
                    <TouchableOpacity onPress={()=>props.clcprice(slt,index)}>
                      <Text alignSelf={'center'} fontSize={fontPixel(15)} color={"#000000"}>{slt}</Text>
                    </TouchableOpacity>
                 </Box>
                )
              })}
            </Stack>
            <Stack alignItems={'center'} flexDirection='row'  justifyContent='center' mt={10} alignContent='flex-end'>
              <Image source={Images.priceicon}  style={{width:25,height:25,marginRight:3}} />
              <Text alignSelf={'center'} fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium} color={"#000000"} fontSize={fontPixel(16)} >{props.total===undefined?0:props.total} ريال</Text>
            </Stack>
            <Stack alignItems={'center'} w={Metrics.WIDTH * 0.940} ml='3' mr='4' mt={10}  >
              <CustomButton
                buttonColor={Colors.AminaPinkButton}
                title="ارسال الطلب للحاضنة"
                buttonStyle={{ width: '88%', alignSelf: 'center',borderRadius:10 }}
                textStyle={{ fontSize: fontPixel(18) }}
                onPress={() => props.handelscreens(1)}
              />
            </Stack>
          </Box>
    )
}

export default TimeSlots;