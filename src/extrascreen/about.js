import React ,{useState}from 'react';
import {View,Platform} from 'react-native';
import{Button,Modal,Center,Text,Box, HStack, Stack,Switch} from 'native-base';
 import AntDesign  from 'react-native-vector-icons/AntDesign'
import { Colors ,Metrics, Fonts} from '../assets/Themes/';
 
const AboutScreen=()=>{
    const[slide,setslide]=useState(0)
    const[msg,setMsg]=useState('')


const bubleMsg=(val)=>{
  switch (val){
    case 1:
        console.log("screen",val)
        setMsg("تقديم خدمات رعاية الاطفال في منزل الحاضنه")
        setslide(1)

    break;
    case 2:
        console.log("screen",val)
        setMsg("تقديم خدمات رعاية الاطفال في منزل الام من سن شهر حتى سنتين")
        setslide(2)
    break;
    case 3:
        console.log("screen",val)
         setMsg("تقديم خدمات رعاية الاطفال في منزل الام من سن سنتين حتى 10 سنوات ")
        setslide(3)
    break;
    case 4:
      console.log("screen",val)
      setMsg("تقديم خدمات رعاية الاطفال في منزل الام من سن سنتين حتى 10 سنوات في منز الام ")
        setslide(4)
  break;
  case 5:
      console.log("screen",val)
      setMsg("تقديم خدمات رعاية الاطفال في منزل الام من سن سنتين حتى 10 سنوات في منز الام ")
        setslide(5)
  break;
   
break;
   }

}
    
    return(
        <Box mt={Platform.OS==='android'?58:46} background='white' flex={1}>
            <Text  fontSize={18}   textAlign={'left'}  ml='4' mt={3} mb={2}
            fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} 
                 >حول التطبيق</Text>

            <HStack alignItems="center" w={"100%"} padding={5} justifyContent='space-between' backgroundColor='white' borderColor={Colors.text} borderWidth={1} mt="1" mb="1">
                <Text textAlign={'right'} color= {Colors.blacktxt} fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base}
                  fontSize={18}  fontWeight='600' >حاضنة منزايه</Text>
                <AntDesign name='down' color={Colors.AminaButtonNew} size={25}  onPress={()=>bubleMsg(1)} />
            </HStack>

            { slide===1?<Stack borderWidth={1}  borderRadius={10} borderColor={Colors.AminaButtonNew} padding={6} w="97%" justifyContent={'center'} alignItems='center' ml={2} >
              <Text fontSize={18}   textAlign={'left'}  ml='1'
            fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base} >{msg} </Text></Stack>:null}
             
            <HStack alignItems="center" w={"100%"} padding={5} justifyContent='space-between' backgroundColor='white' borderColor={Colors.text} borderWidth={1} mt="1" mb="1">
                <Text textAlign={'right'} color= {Colors.blacktxt} fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base}
                  fontSize={18}  fontWeight='600' >حاضنه خاصة</Text>
                <AntDesign name='down' color={Colors.AminaButtonNew} size={25} onPress={()=>bubleMsg(2)}   />
                
            </HStack>
            { slide===2 &&<Stack borderWidth={1}  borderRadius={10} borderColor={Colors.AminaButtonNew} padding={6} w="97%" justifyContent={'center'} alignItems='center' ml={2} >
              <Text fontSize={18}   textAlign={'left'}  ml='1'
            fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base} >{msg} </Text></Stack>}

            

            <HStack alignItems="center" w={"100%"} padding={5} justifyContent='space-between' backgroundColor='white' borderColor={Colors.text} borderWidth={1} mt="1" mb="1">
                <Text textAlign={'right'} color= {Colors.blacktxt} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}
                  fontSize={18}  fontWeight='600' >الحاضنة</Text>
                <AntDesign name='down' color={Colors.AminaButtonNew} size={25}  onPress={()=>bubleMsg(3)} />
            </HStack>
            { slide===3 &&<Stack borderWidth={1}  borderRadius={10} borderColor={Colors.AminaButtonNew} padding={6} w="97%" justifyContent={'center'} alignItems='center' ml={2} >
              <Text fontSize={18}   textAlign={'left'}  ml='1'
            fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} >{msg} </Text></Stack>}

            

            <HStack alignItems="center" w={"100%"} padding={5} justifyContent='space-between' backgroundColor='white' borderColor={Colors.text} borderWidth={1} mt="1" mb="1">
                <Text textAlign={'right'} color= {Colors.blacktxt} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}
                  fontSize={18}  fontWeight='600' >الجليسة</Text>
                <AntDesign name='down' color={Colors.AminaButtonNew} size={25} onPress={()=>bubleMsg(4)}  />
            </HStack>

            { slide===4 &&<Stack borderWidth={1}  borderRadius={10} borderColor={Colors.AminaButtonNew} padding={6} w="97%" justifyContent={'center'} alignItems='center' ml={2} >
              <Text fontSize={18}   textAlign={'left'}  ml='1'
            fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} >{msg} </Text></Stack>}


            <HStack alignItems="center" w={"100%"} padding={5} justifyContent='space-between' backgroundColor='white' borderColor={Colors.text} borderWidth={1} mt="1" mb="1">
                <Text textAlign={'right'} color= {Colors.blacktxt} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}
                  fontSize={18}  fontWeight='600' >الجليسة المتخصصه</Text>
                <AntDesign name='down' color={Colors.AminaButtonNew} size={25} onPress={()=>bubleMsg(5)}   />
            </HStack>
            { slide===5 &&<Stack borderWidth={1}  borderRadius={10} borderColor={Colors.AminaButtonNew} padding={6} w="97%" justifyContent={'center'} alignItems='center' ml={2} >
              <Text fontSize={18}   textAlign={'left'}  ml='1'
            fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}>{msg} </Text></Stack>}

            
        </Box>
    )
}
export default AboutScreen;