import React ,{useState}from 'react';
import {View,Platform} from 'react-native';
import{Button,Modal,Center,TextArea,Text,Box, HStack, Stack,Switch} from 'native-base';
 
import { Colors ,Metrics, Fonts} from '../assets/Themes/';
 
const PrivecyScreen=()=>{
    return(
        <Box mt={Platform.OS==='android'?55:44} background='white' w={"100%"} flex={1}>
             <Text textAlign={'left'} color= {Colors.blacktxt} fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base}
                  fontSize={18}  fontWeight='bold' >
                    الحماية والخصوصية
                  </Text>
            <HStack alignItems="center" w={"100%"} padding={5} justifyContent='space-between' backgroundColor='white' borderColor={Colors.text} borderWidth={1} mt="1" mb="1">
                <Text textAlign={'right'} color= {Colors.blacktxt} fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base}
                   fontSize={18}  fontWeight='bold' >
                  </Text>
                   <Stack w={'99%'} h='lg' backgroundColor={'white'}>
                   <TextArea    numberOfLines={10} placeholder="Invalid TextArea"   isDisabled
                    value='تلتزم إي أف بحماية خصوصية عملائنا. وتنطبق سياسة حماية الخصوصية المعتمدة من قبل إي أف ("سياسة حماية الخصوصية") على كل المعلومات الشخصية التي يتم جمعها من قبلنا أو تقديمها لنا، إن دون الاتصال بالإنترنت (offline) أو بالاتصال بالإنترنت (online)، بما في ذلك المعلومات الشخصية التي يتم جمعها أو تقديمها من خلال مواقعنا الإلكترونية ("مواقعنا الإلكترونية") وعلى أي مواقع على الهواتف الجوالة والتطبيقات الصغيرة وغيرها من الميزات التفاعلية للجوّال (والمشار إليها مجتمعةً بـ"تطبيقاتنا")، من خلال صفحاتنا الرسمية على وسائل التواصل الاجتماعي التي نتحكم بها ("صفحاتنا على وسائل التواصل الاجتماعي")، ومن خلال رسائل HTML التي نرسلها إليكم (والمشار إليها مجتمعةً، بما في ذلك الصفحات على وسائل التواصل الاجتماعي والتطبيقات والمواقع الإلكترونية، بـ"المواقع"). ومن خلال تقديمكم المعلومات الشخصية لنا، توافقون على أحكام وشروط هذه السياسة.'
                    _dark={{ placeholderTextColor: "gray.300"}}  
                      w={'96%'}  h={"80%"} conte fontFamily={Fonts.type.base} fontWeight={'medium'}  textAlign={'right'}/>
                 

                   </Stack>
                  
            </HStack>;
        </Box>
    )
}
export default PrivecyScreen;