import React ,{useState}from 'react';
import {View,Platform} from 'react-native';
import{Button,Modal,Center,TextArea,Text,Box, HStack, Stack,Switch} from 'native-base';
 
import { Colors ,Metrics, Fonts} from '../assets/Themes/';
import WebView from 'react-native-webview';
 
const PrivecyScreen=()=>{
    return(
        <Box mt={Platform.OS==='android'?55:44} background='white' w={"100%"} flex={1}>
            
      <WebView
        source={{
          uri: 'https://amina.app/privacy-policy/',
        }}
        style={{marginTop: 20}}
      />
    
        </Box>
    )
}
export default PrivecyScreen;




// <Text textAlign={'left'} color= {Colors.blacktxt} fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base}
// fontSize={18} mt={4} mb={2}  >
//   الحماية والخصوصية
// </Text>
// <HStack alignItems="center" w={"100%"} padding={5} justifyContent='space-between' backgroundColor='white' borderColor={Colors.text} borderWidth={1} mt="1" mb="1">
// <Text textAlign={'right'} color= {Colors.blacktxt} fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base}
//  fontSize={18}   >
// </Text>
//  <Stack w={'99%'} h='lg' backgroundColor={'white'}>
//  <TextArea    numberOfLines={10} isFullWidth isReadOnly={true} padding={2} borderColor={Colors.white}
//  value='تلتزم إي أف بحماية خصوصية عملائنا. وتنطبق سياسة حماية الخصوصية المعتمدة من قبل إي أف ("سياسة حماية الخصوصية") على كل المعلومات الشخصية التي يتم جمعها من قبلنا أو تقديمها لنا، إن دون الاتصال بالإنترنت (offline) أو بالاتصال بالإنترنت (online)، بما في ذلك المعلومات الشخصية التي يتم جمعها أو تقديمها من خلال مواقعنا الإلكترونية ("مواقعنا الإلكترونية") وعلى أي مواقع على الهواتف الجوالة والتطبيقات الصغيرة وغيرها من الميزات التفاعلية للجوّال (والمشار إليها مجتمعةً بـ"تطبيقاتنا")، من خلال صفحاتنا الرسمية على وسائل التواصل الاجتماعي التي نتحكم بها ("صفحاتنا على وسائل التواصل الاجتماعي")، ومن خلال رسائل HTML التي نرسلها إليكم (والمشار إليها مجتمعةً، بما في ذلك الصفحات على وسائل التواصل الاجتماعي والتطبيقات والمواقع الإلكترونية، بـ"المواقع"). ومن خلال تقديمكم المعلومات الشخصية لنا، توافقون على أحكام وشروط هذه السياسة.'
//   _dark={{ placeholderTextColor:Colors.red} }  
//     w={'100%'}  h={"100%"} conte fontFamily={Platform.OS==='android'? Fonts.type.aminafonts:Fonts.type.base}  fontSize="md" textAlign={'right'}/>


//  </Stack>

// </HStack>;