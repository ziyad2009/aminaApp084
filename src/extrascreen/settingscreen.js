import React ,{useState}from 'react';
import {View,Platform} from 'react-native';
import{Button,Modal,Center,Text,Box, HStack, Stack,Switch} from 'native-base';
 
import { Colors ,Metrics, Fonts} from '../assets/Themes/';
 
const SettingScreen=()=>{
    return(
        <Box mt={Platform.OS==='android'?60:44} background='white' flex={1}>
            <HStack alignItems="center" w={"100%"} padding={5} justifyContent='space-between' backgroundColor='white' borderColor={Colors.text} borderWidth={1} mt="1" mb="1">
                <Text textAlign={'right'} color= {Colors.blacktxt} fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base}
                  fontSize={18}  fontWeight='bold' >الاشعارات</Text>
                <Switch size="sm" />
            </HStack>
            <HStack alignItems="center" w={"100%"} padding={5} justifyContent='space-between' backgroundColor='white' borderColor={Colors.text} borderWidth={1} mt="1" mb="1">
                <Text textAlign={'right'} color= {Colors.blacktxt} fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base} 
                  fontSize={18}  fontWeight='bold'    >اللغه</Text>
                <Text>العربيه</Text>
            </HStack>
            <HStack alignItems="center" w={"100%"} padding={5} justifyContent='space-between' backgroundColor='white' borderColor={Colors.text} borderWidth={1} mt="1" mb="1">
                <Text textAlign={'right'} color= {Colors.blacktxt} fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base}
                     fontSize={18}  fontWeight='bold'  onPress={()=>console.log("test")} >حول التطبيق</Text>
                
            </HStack>;
        </Box>
    )
}
export default SettingScreen;