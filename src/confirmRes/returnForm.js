
import React,{useEffect,useState,useRef} from 'react';
import {View,Image, TouchableOpacity, Alert, Platform} from 'react-native'
import {FlatList,Box,Heading,Avatar,Text,VStack,HStack,Spacer, Button,Spinner,Modal,Center, Stack} from 'native-base';
import { Colors,Fonts ,Metrics,Images,fontPixel,widthPixel,heightPixel,pixelSizeHorizontal,pixelSizeVertical} from '../assets/Themes';
import CustomButton from '../services/buttons/buttton';


const ReturnFourm=(props)=>{
    return(
        <Box alignItems={'center'} justifyContent='center' backgroundColor={'white'}   w={Metrics.WIDTH * 0.940}>
                    <Stack backgroundColor={Colors.backgroundimage} borderRadius={22} mt={5} p={10}>
                        <Image source={Images.canselorder} style={{width:77,height:77}} />
                    </Stack>
                    <Stack  mt={5}>
                        <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(20)}  >نعتذر منك...</Text> 
                    </Stack>
                    <Stack backgroundColor={Colors.transparent}>
                        <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(20)} mt={4}>تم الغاءالطلب من قبل الحاضنة</Text>
                    </Stack>
                    <Stack flexDirection={'row'} alignItems={'center'} w={Metrics.WIDTH * 0.890}  ml='10'  mt={3}  >
                            <CustomButton
                                buttonColor={Colors.AminaPinkButton}
                                title=" الغاء الطلب"
                                buttonStyle={{ width: '90%', alignSelf: 'center',borderRadius:10 }}
                                textStyle={{ fontSize: fontPixel(18) ,fontFamily:Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium }}
                                onPress={() => props.back() }
                            />
                            
                    </Stack>
                    </Box>
    )
}

export default ReturnFourm ;