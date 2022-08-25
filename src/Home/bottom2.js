
import React,{useEffect,useState,useRef,} from 'react';
import {View,Image, TouchableOpacity, Alert,Platform} from 'react-native'
import {Actionsheet,Box,Avatar,Text,VStack,HStack,Spacer,Fab, Button,Spinner,Icon,Center,useDisclose, Stack} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Metrics,Colors ,Fonts} from '../assets/Themes/';

const  BottomScreen=(props)=> {
  console.log("props",props)
    const {
      isOpen,
      onOpen,
      onClose
    } = useDisclose();
    return (
        <Box alignItems={'flex-start'}>
            <Center>

           

             
        {/* <Button variant={'ghost'} w="20%" onPress={onOpen}>Aminah</Button> */}
        <Ionicons name="menu" size={22} color={"#F5F5F5"}  onPress={onOpen} /> 
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            {/* <Box w="100%" h={60} px={4} justifyContent="center">
              <Text fontSize="22" color={Colors.TexTPink}  textAlign={'center'} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}>
                امينه
              </Text>
            </Box> */}
            <Actionsheet.Item alignItems={'baseline'}  >
              <Stack  justifyContent='center' flexDirection={'row'}>
              <AntDesign name='setting' color={Colors.AminaButtonNew} size={22}/>
              <Text color={Colors.AminaButtonNew} textAlign='left' onPress={()=>props.data.navigate('SettingScreen') }
                fontWeight={'bold'} fontFamily={Platform.OS=='android'?Fonts.type.aminafonts:Fonts.type.base}
                fontSize={18}  ml={3}>الاعدادت</Text>
              </Stack>
             
            </Actionsheet.Item>
            <Actionsheet.Item alignItems={'baseline'}  >
              <Stack  justifyContent='center' flexDirection={'row'}>
              <AntDesign name='exclamationcircleo' color={Colors.AminaButtonNew} size={18}/>
              <Text color={Colors.AminaButtonNew} textAlign='left' fontWeight={'bold'} fontFamily={Platform.OS=='android'?Fonts.type.aminafonts:Fonts.type.base}
                fontSize={18}  ml={3} onPress={()=>props.data.navigate('AboutScreen') }
                >حول التطبيق</Text>
              </Stack>
             
            </Actionsheet.Item>
            <Actionsheet.Item alignItems={'baseline'}  >
              <Stack  justifyContent='center' flexDirection={'row'}>
              <AntDesign name='exclamationcircleo' color={Colors.AminaButtonNew} size={18}/>
              <Text color={Colors.AminaButtonNew} textAlign='left' fontWeight={'bold'} fontFamily={Platform.OS=='android'?Fonts.type.aminafonts:Fonts.type.base}
                fontSize={18}  ml={3}>المساعدة</Text>
              </Stack>
             
            </Actionsheet.Item>
            <Actionsheet.Item alignItems={'baseline'}  >
              <Stack  justifyContent='center' flexDirection={'row'}>
              <AntDesign name='exclamationcircleo' color={Colors.AminaButtonNew} size={18}/>
              <Text color={Colors.AminaButtonNew} textAlign='left' fontWeight={'bold'} fontFamily={Platform.OS=='android'?Fonts.type.aminafonts:Fonts.type.base}
                onPress={()=>props.data.navigate('PrivecyScreen')}
                fontSize={18}  ml={3}>الخصوصيه</Text>
              </Stack>
             
            </Actionsheet.Item>
            <Actionsheet.Item alignItems={'baseline'}  >
              <Stack  justifyContent='center' flexDirection={'row'}>
              <MaterialIcons name='logout' color={Colors.textZahry} size={22}/>
              <Text color={Colors.TexTPink} textAlign='left' fontWeight={'bold'} fontFamily={Platform.OS=='android'?Fonts.type.aminafonts:Fonts.type.base}
                fontSize={18}  ml={3}>تسجيل خدوج</Text>
              </Stack>
             
            </Actionsheet.Item>
             
          </Actionsheet.Content>
        </Actionsheet>
      </Center>;
        </Box>
    )
  }
  export default BottomScreen;