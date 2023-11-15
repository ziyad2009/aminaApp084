import React, { useContext, useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { View ,Image, TouchableOpacity,Linking, Platform, PermissionsAndroid, RefreshControl, Alert } from 'react-native';
import { Skeleton,Text, StatusBar, VStack, Center, Box, Button, FlatList, Stack, Heading, Input, Icon, Spinner, Spacer,Modal, IconButton } from 'native-base'
import { UserContext } from '../services/UserContext';
import { Fonts,Colors, heightPixel, widthPixel, Metrics, fontPixel, Images } from '../../assets/Themes';
import { URL_ws,URL } from '../links';
import Ionicons from 'react-native-vector-icons/Ionicons'
const Disprofile=(props)=>{
    
   return(
    <Box borderRadius={'lg'} padding={'1.5' } width={props.width} backgroundColor={'rgba(255, 255, 255, 1)'} borderWidth={.2} borderColor={Colors.veryLightGray}>
        <Box flexDirection={'row'}>
            <Stack mt={'1'}>
                <Image source={{ uri: `${URL}/users/${props.data.owner}/avatar` }} resizeMode='stretch' style={{
                        height: heightPixel(100), width: widthPixel(88),
                        marginTop: 7, borderRadius: 22
                }} />
            </Stack>
            <Stack flexDirection={'column'} width={'48'} ml={'3'} mt={'1'}>
                <Stack flexDirection={'row'} justifyContent={'space-between'} >
                    <Text fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontSize={fontPixel(17)} fontWeight={'700'} color={Colors.newTextClr}>{props.data.displayname}</Text>
                    <Stack  width={'10'} alignItems={'baseline'} flexDirection={'row'}backgroundColor={'rgba(255, 176, 30, 1)'} borderRadius={'lg'} p={'1'}>
                        <Text color={'white'}  fontSize={'10'}>4.5</Text>
                        <Image source={Images.starswhite} resizeMode='contain' style={{width:12,height:12}} />
                    </Stack>
                </Stack>
                <Stack alignItems={'flex-start'}>
                    <Text fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontSize={fontPixel(11)} fontWeight={'700'} letterSpacing={1.5} color={"rgba(0, 171, 185, 1)"}>{props.data.mainservice}</Text>
                </Stack>
                <Stack mt={'1'}>
                    <Stack backgroundColor={'rgba(243, 243, 243, 1)'} flexDirection={'row'} width={'32'} padding={'1'} borderRadius={'lg'}  >
                        <Image source={Images.locationblack} resizeMode='contain' style={{ height: 15, width: 15 ,marginLeft:2}} />
                        <Text fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontSize={fontPixel(9)} fontWeight={'700'} color={Colors.newTextClr} ml={'2'}>{props.data.district}</Text>
                        <Text fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontSize={fontPixel(9)} fontWeight={'700'} color={Colors.newTextClr} ml={'2'}> - {props.data.city}</Text>
                    </Stack>
                </Stack>
                <Stack flexDirection={'row'} justifyContent={'space-around'} mt={'1'}>
                    <Stack backgroundColor={'rgba(243, 243, 243, 1)'} flexDirection={'row'} width={'20'} padding={'1'} borderRadius={'lg'}  >
                        <Text fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontSize={fontPixel(9)} fontWeight={'700'} color={"rgba(0, 171, 185, 1)"} ml={'2'}>{props.data.price} رس/ساعة</Text>
                    </Stack>
                    <Stack backgroundColor={'rgba(243, 243, 243, 1)'} flexDirection={'row'} width={'24'} padding={'1'} borderRadius={'lg'} mr={'3'}  >
                        <Text fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontSize={fontPixel(9)} fontWeight={'700'} color={"#EC1F46"} ml={'2'}>{props.data.accompany?"مرافقة الام متاحة":"غير متاح مرافقة الام"}</Text>
                    </Stack>
                </Stack>
                <Stack flexDirection={'row'} justifyContent={'space-around'} mt={'1'}>
                    <Stack backgroundColor={'rgba(243, 243, 243, 1)'} flexDirection={'row'} width={'20'} padding={'1'} borderRadius={'lg'}  >
                        <Text fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontSize={fontPixel(9)} fontWeight={'700'} color={"rgba(0, 171, 185, 1)"} ml={'2'}>{props.data.weeklyprice} رس/ساعة</Text>
                    </Stack>
                    <Stack backgroundColor={'rgba(243, 243, 243, 1)'} flexDirection={'row'} width={'24'} padding={'1'} borderRadius={'lg'} mr={'3'}  >
                    <Text fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontSize={fontPixel(9)} fontWeight={'700'} color={"rgba(0, 171, 185, 1)"} ml={'2'}>{props.data.monthlyprice} رس/ساعة</Text>
                    </Stack>
                </Stack>
            </Stack>
        </Box>

        <Box flexDirection={'row-reverse'} height={'10'} justifyContent={'space-around'} mt={'2'}>
            <Button width={'32'} borderRadius={'lg'}  backgroundColor={Colors.textZahry} onPress={()=>props.movScreen()}>
                <Text fontSize={'sm'} color={'white'} >احجزي الان</Text>
            </Button>
            <Button  width={'24'} borderRadius={'lg'} p={'1'} backgroundColor={Colors.grayButton} flexDirection={'row'}
                    rightIcon={<Icon as={Ionicons} name="call" size="sm" color={Colors.textZahry} />}
                        onPress={()=>Linking.openURL(`tel:${props.data.phone}`)} >
                <Text fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold}  fontSize={'sm'} color={Colors.textZahry}>اتصال</Text>
                 
            </Button>
        </Box>
    </Box>
   )

}
export default Disprofile;