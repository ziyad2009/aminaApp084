
import * as React from 'react';
import { Linking ,Platform,Image} from 'react-native';
import { Box,Stack, Text, Button } from 'native-base';
import { Fonts,Colors ,Images} from '../../assets/Themes';
 
 
 


const ModalScreen=({ navigation })=> {


const directoStor=()=>{
    navigation.goBack()
    if(Platform.OS==='android')
      Linking.openURL("market://details?id=com.amenid084")
      else{
        const link='itms-apps://apps.apple.com/us/app/تطبيق-أمينة/id1642193505'
        Linking.canOpenURL(link).then(
          (supported) => {
            supported && Linking.openURL(link);
          },
          (err) => console.log("Erorr open link",err)
        );
        
      }
      
  }

    return (
      <Box flex={1} backgroundColor={Colors.AminabackgroundColor} alignItems={'center'}justifyContent={'center'} >
        <Image source={Images.aminaLogoEmpty} style={{width:100,height:100 ,position:'relative',left:1,top:1 }} resizeMode='contain'  />
        <Text fontSize={'2xl'} textAlign={'center'} fontFamily={Platform.OS==="android"?Fonts.type.aminafonts:Fonts.type.bold}>انت تستخدم اصدارا قديما يرجى الضغط علي تحديث للحصول على اخر اصدار من تطبيق امينة </Text>
        <Button width={'56'} borderRadius={'lg'} mt={'3'} onPress={() => directoStor()} bgColor={Colors.textZahry}>
        <Text fontSize={'2xl'} bgColor={'blue.200'} textAlign={'center'} fontFamily={Platform.OS==="android"?Fonts.type.aminafonts:Fonts.type.bold} color={'white'}>تحديث</Text>
        </Button>
      </Box>
    );
  }
  
export default ModalScreen