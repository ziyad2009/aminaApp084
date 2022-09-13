
import React,{useEffect,useState,useRef,useContext} from 'react';
import {View,Image, TouchableOpacity, Alert,Platform} from 'react-native'
import {Actionsheet,Box,Avatar,Text,VStack,HStack,Spacer,Fab, Button,Spinner,Icon,Center,useDisclose, Stack} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Metrics,Colors ,Fonts} from '../assets/Themes/';
import api from '../services/api';
import { UserContext } from '../services/UserContext';
 import setItem from '../services/storage';
 import RNRestart from "react-native-restart";


const  BottomScreen=(props)=> {
  const{sethome,setRegUser}=useContext(UserContext)
  console.log("props",props)
    const {
      isOpen,
      onOpen,
      onClose
    } = useDisclose();

    const logOut= async()=>{
      const token = await setItem.getItem('BS:Token');
      api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
      api.post('/user/logout').then((res)=> {
        console.log("logout res",res)
      }).finally(async()=>{
        await setItem.removeItem('BS:User');
        await setItem.removeItem('BS:Token');
        //await setItem.removeItem('BS:Location')

        sethome(false)
          RNRestart.Restart()
      })}
    return (
        <Box alignItems={'flex-start'}>
            <Center>

           

             
        {/* <Button variant={'ghost'} w="20%" onPress={onOpen}>Aminah</Button> */}
        <Ionicons name="menu" size={33} color={"#F5F5F5"}  onPress={onOpen} /> 
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
            <Actionsheet.Item alignItems={'baseline'} onPress={()=>logOut()}  >
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