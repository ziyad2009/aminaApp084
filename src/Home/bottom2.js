
import React,{useEffect,useState,useRef,useContext} from 'react';
import {View,Image, TouchableOpacity, Alert,Platform} from 'react-native'
import {Actionsheet,Box,Avatar,Text,VStack,HStack,Spacer,Fab, Button,Spinner,Icon,Center,useDisclose, Stack} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Metrics,Colors ,Fonts,Images, fontPixel} from '../assets/Themes/';
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

        //sethome(false)
          RNRestart.Restart()
      })}

      const moveScreen=(value)=>{
        if(value==="sitting"){
          props.data.navigate('SettingScreen')
          onClose()
        }else if(value==="AboutScreen"){
          props.data.navigate('AboutScreen')
          onClose()
        }else if(value==="HoldNottifaction"){
        props.data.navigate('HoldNottifaction')
        onClose()
      }
        else if(value==="PrivecyScreen"){
          props.data.navigate('PrivecyScreen')
          onClose()
        }
        else if(value==="PubNubChat"){
          props.data.navigate('PubNubChat')
          onClose()
        }else if(value==="HELPFOURM"){
          props.data.navigate('HELPFOURM')
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
            <Box justifyContent='flex-end'  flexDirection={'row'} w={"95%"}>
              <TouchableOpacity onPress={()=> onClose()} style={{alignItems:'baseline',flexDirection:'row' }}>
                <Text color={Colors.newTextClr} fontSize={fontPixel(12)}  mr={3} fontFamily={Fonts.type.regular}>اغلاق</Text>
                <MaterialIcons name='close' color={Colors.red} size={12}
                  onPress={()=> onClose()} />
              </TouchableOpacity>
            </Box>

            <Actionsheet.Item alignItems={'baseline'} tintColor={Colors.AminaButtonNew}
             onPress={()=>moveScreen("sitting")  }
            startIcon={<Image source={Images.settingicon} style={{width:18 ,height:18} } />}  >
              <Stack  justifyContent='center' flexDirection={'row'}>
                <Text color={"#00ABB9"} textAlign='left'
                  fontFamily={Platform.OS=='android'?Fonts.type.regular:Fonts.type.regular}
                  fontSize={fontPixel(16)}  ml={3}>الاعدادت
                </Text>
              </Stack>  
             
            </Actionsheet.Item>

            {/* <Actionsheet.Item alignItems={'baseline'}
              onPress={()=>moveScreen("AboutScreen") }
              startIcon={<Image source={Images.infoico} style={{width:18 ,height:18} } />}  >
              <Stack  justifyContent='center' flexDirection={'row'}>
              
              <Text color={Colors.AminaButtonNew} textAlign='left'  
                fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular}
                fontSize={fontPixel(16)}  ml={3} onPress={()=> moveScreen("AboutScreen")  }
                >حول التطبيق</Text>
              </Stack>
             
            </Actionsheet.Item> */}
            <Actionsheet.Item alignItems={'baseline'}
              onPress={()=>moveScreen("AboutScreen") }
              startIcon={<Image source={Images.infoico} style={{width:18 ,height:18} } />}  >
              <Stack  justifyContent='center' flexDirection={'row'}>
              
              <Text color={Colors.AminaButtonNew} textAlign='left'  
                fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular}
                fontSize={fontPixel(16)}  ml={3} onPress={()=> moveScreen("AboutScreen")  }
                >حول التطبيق</Text>
              </Stack>
             
            </Actionsheet.Item>
            
            <Actionsheet.Item alignItems={'baseline'} 
              onPress={()=> moveScreen("HELPFOURM") }
              startIcon={<Image source={Images.helpicon1} style={{width:18 ,height:18} } />} >
              <Stack  justifyContent='center' flexDirection={'row'}>
              
              <Text color={Colors.AminaButtonNew} textAlign='left'  fontFamily={Platform.OS=='android'?Fonts.type.regular:Fonts.type.regular}
                onPress={()=> moveScreen("HELPFOURM")  }
                fontSize={fontPixel(16)}  ml={3}>المساعدة</Text>
              </Stack>
             
            </Actionsheet.Item>
            <Actionsheet.Item alignItems={'baseline'} 
            startIcon={<Image source={Images.infoico} style={{width:18 ,height:18} } />} >
              <Stack  justifyContent='center' flexDirection={'row'}>
              
              <Text color={Colors.AminaButtonNew} textAlign='left'  fontFamily={Platform.OS=='android'?Fonts.type.regular:Fonts.type.regular}
                onPress={()=>moveScreen("PrivecyScreen") }
                fontSize={fontPixel(16)}  ml={3}>الخصوصيه</Text>
              </Stack>
             
              
            </Actionsheet.Item>
            
            
            <Actionsheet.Item alignItems={'baseline'} onPress={()=>logOut()} 
            startIcon={<Image source={Images.logouticon} style={{width:18 ,height:18} } />}   >
              <Stack  justifyContent='center' flexDirection={'row'}>
               
              <Text color={Colors.TexTPink} textAlign='left'  fontFamily={Platform.OS=='android'?Fonts.type.regular:Fonts.type.regular}
                fontSize={fontPixel(16)}  ml={3}>تسجيل خروج</Text>
              </Stack>
             
            </Actionsheet.Item>
             
          </Actionsheet.Content>
        </Actionsheet>
      </Center>;
        </Box>
    )
  }
  export default BottomScreen;