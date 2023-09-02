
import React,{useEffect,useState,useRef} from 'react';
import {View,Image, TouchableOpacity, Alert, Platform} from 'react-native'
import {FlatList,Box,Heading,Avatar,Text,VStack,HStack,Spacer, Button,Spinner,Modal,Center, Stack} from 'native-base';
import { Colors,Fonts ,Metrics,Images,fontPixel,widthPixel,heightPixel,pixelSizeHorizontal,pixelSizeVertical} from '../assets/Themes';
import CustomButton from '../services/buttons/buttton';


const Compleatfourm=(props)=>{
    return(
        <Box alignItems={'center'} w={"100%"} >
                    <Stack backgroundColor={Colors.backgroundimage} >
                        <Image source={Images.wowimage} style={{width:77,height:77}} />
                    </Stack>
                    <Stack  mt={5}>
                        <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(20)}> لقد تم قبول طلبك للاستمرار بالحجز</Text> 
                    </Stack>
                    <Stack backgroundColor={Colors.transparent}>
                        <Text color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(20)} mt={4}>اكمل الدفع</Text>
                    </Stack>
                    <Stack flexDirection={'row'} alignItems={'center'} w={Metrics.WIDTH * 0.8140} justifyContent='space-between' ml='3' mr='4' mt={'10'}  >
                            <CustomButton
                                buttonColor={"#6BB05A"}
                                title="الغاء الطلب"
                                buttonStyle={{ width: Metrics.WIDTH*0.3622, alignSelf: 'center',borderRadius:10 }}
                                textStyle={{ fontSize: fontPixel(18) ,fontFamily:Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium }}
                                onPress={() => props.cancel() }
                            />
                            <CustomButton  
                                buttonColor={Colors.enabledButton}
                                title="ادفع الان"
                                buttonStyle={{ width: Metrics.WIDTH*0.3622, alignSelf: 'center',borderRadius:10 }}
                                textStyle={{ fontSize: fontPixel(18) ,fontFamily:Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium  }}
                                titleColor={Colors.newTextClr}
                                onPress={() => props.pay()  }
                            />
                    </Stack>
                    </Box>
    )
}

export default Compleatfourm ;