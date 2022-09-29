
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

      const moveScreen=(value)=>{
        if(value==="sitting"){
          props.data.navigate('SettingScreen')
          onClose()
        }else if(value==="AboutScreen"){
          props.data.navigate('AboutScreen')
          onClose()
        }
        else if(value==="PrivecyScreen"){
          props.data.navigate('PrivecyScreen')
          onClose()
        }
        else if(value==="PubNubChat"){
          props.data.navigate('PubNubChat')
          onClose()
        }
        else if(value===""){
          props.data.navigate('SettingScreen')
          onClose()
        }
      }
    return (
        <Box alignItems={'flex-start'}>
            <Center>

           

             
        {/* <Button variant={'ghost'} w="20%" onPress={onOpen}>Aminah</Button> */}
        <Ionicons name="menu" size={33} color={"#F5F5F5"}  onPress={onOpen} /> 
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box justifyContent='flex-end' alignItems={'baseline'} flexDirection={'row'} w={"100%"}>
              <Text color={Colors.TexTPink} fontSize={12}  m={2} fontFamily={Fonts.type.base}>اغلاق</Text>
                <MaterialIcons name='close' color={Colors.red} size={17}
                onPress={()=> onClose()} />
            </Box>

            <Actionsheet.Item alignItems={'baseline'} tintColor={Colors.AminaButtonNew}
             onPress={()=>moveScreen("sitting")  }
            startIcon={<Icon as={AntDesign} size="6" color={Colors.AminaButtonNew} name="setting" />}  >
              <Stack  justifyContent='center' flexDirection={'row'}>
              <Text color={Colors.AminaButtonNew} textAlign='left'
                 bgColor={Colors.red}
                fontWeight={'500'} fontFamily={Platform.OS=='android'?Fonts.type.aminafonts:Fonts.type.base}
                fontSize={18}  ml={3}>الاعدادت</Text>
              </Stack>
             
            </Actionsheet.Item>

            <Actionsheet.Item alignItems={'baseline'}
            startIcon={<Icon as={MaterialIcons} size="6" color={Colors.AminaButtonNew} name="info-outline" />}  >
              <Stack  justifyContent='center' flexDirection={'row'}>
              
              <Text color={Colors.AminaButtonNew} textAlign='left' fontWeight={'500'} 
                fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}
                fontSize={18}  ml={3} onPress={()=> moveScreen("AboutScreen")  }
                >حول التطبيق</Text>
              </Stack>
             
            </Actionsheet.Item>
            <Actionsheet.Item alignItems={'baseline'} 
            startIcon={<Icon as={MaterialIcons} size="6" color={Colors.AminaButtonNew} name="help" />} >
              <Stack  justifyContent='center' flexDirection={'row'}>
              
              <Text color={Colors.AminaButtonNew} textAlign='left' fontWeight={'500'} fontFamily={Platform.OS=='android'?Fonts.type.aminafonts:Fonts.type.base}
              onPress={()=> moveScreen("PubNubChat")  }
                fontSize={18}  ml={3}>المساعدة</Text>
              </Stack>
             
            </Actionsheet.Item>
            <Actionsheet.Item alignItems={'baseline'} 
            startIcon={<Icon as={MaterialIcons} size="6" color={Colors.AminaButtonNew} name="privacy-tip" />} >
              <Stack  justifyContent='center' flexDirection={'row'}>
              
              <Text color={Colors.AminaButtonNew} textAlign='left' fontWeight={'500'} fontFamily={Platform.OS=='android'?Fonts.type.aminafonts:Fonts.type.base}
                onPress={()=>moveScreen("PrivecyScreen") }
                fontSize={18}  ml={3}>الخصوصيه</Text>
              </Stack>
             
              
            </Actionsheet.Item>
            
            
            <Actionsheet.Item alignItems={'baseline'} onPress={()=>logOut()} 
            startIcon={<Icon as={MaterialIcons} size="6" color={Colors.textZahry} name="logout" />}   >
              <Stack  justifyContent='center' flexDirection={'row'}>
               
              <Text color={Colors.TexTPink} textAlign='left' fontWeight={'500'} fontFamily={Platform.OS=='android'?Fonts.type.aminafonts:Fonts.type.base}
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