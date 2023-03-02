import React,{useState,useRef} from 'react';
 import { Image ,View,TouchableOpacity, Platform} from 'react-native';
import {Box ,Stack,Radio,Text} from 'native-base';
import{Metrics,Colors,Images,Fonts ,fontPixel, widthPixel, heightPixel} from '../assets/Themes/'
import CustomButton from '../services/buttons/buttton';
import styles from './styles';
  


const  PaymentForm =(props)=>{ 
const[selected,setselected]=useState(null)
console.log("test payment DATA ", props.route.params.extrastatuse)
//props.navigation.navigate('TelerPage',paymentdata={newData})
const paymentmethode=[
  {
    id:1,
    type:"Mada Card",
    img:Images.madacard

  },{
    id:2,
    type:"Master Card",
    img:Images.mastercard
  },{
    id:3,
    type:"Apple Pay",
    img:Images.applepay
  }]
 
  const handelTonextScreen = ( ) => {
    const paymentMethode=selected
   const newData= props.route.params.data1
   const extrwork=props.route.params.extrastatuse===undefined?false:props.route.params.extrastatuse
   if(extrwork===true){
      console.log("go with extrastatuse ",extrwork)
    props.navigation.navigate('TelerPage',paymentdata={newData,paymentMethode,extrastatuse:extrwork })
   }else{
    console.log("Not go with extrastatuse ",extrwork)
    props.navigation.navigate('TelerPage',paymentdata={newData,paymentMethode,extrastatuse:extrwork })
   }
   
  }

    
    
    return (
      <View  style={styles.wrapper }>
        <Box   mt={10} >

        
        {paymentmethode.map((item)=>{
          return(
          <Box key={item.id}  flexDirection={'row'} backgroundColor={Colors.white} width={widthPixel(380)} height={heightPixel(70)} justifyContent={'space-around'} alignItems='center' mt={5}  ml={15}  >
            <Stack ml={2} alignItems='center'   justifyContent={'center'}>
            <Radio.Group defaultValue={selected} name="exampleGroup" onChange={nextValue => {
                setselected(nextValue) }}>
               <Radio key={item.id} value={item.type}> </Radio>
              </Radio.Group>
            </Stack>
            
            <Stack   width={260}  alignItems='flex-end' justifyContent={'center'} mr={2}>
              <Text fontSize={fontPixel(16)} >{item.type}</Text>
            </Stack>
            <Stack  width={10} mr={2} >
              <Image  source={item.img} resizeMode='contain' style={{width:widthPixel(45) ,height:heightPixel(28),marginRight:41 }} />
            </Stack>
            
            
          </Box>
          )
        })}
       
        <Box mt={'64'} flexDirection='row' justifyContent={'space-around'} mb={3}>
        <CustomButton
                    buttonColor={Colors.textZahry}
                    title="الرجوع"
                    buttonStyle={{width: '44%', alignSelf: 'center',borderRadius:10}}
                    textStyle={{ fontFamily:Fonts.type.bold,fontSize: 22 }}
                    onPress={() =>props.navigation.popToTop() } 
        />
        <CustomButton
                    buttonColor={Colors.textZahry}
                    title="التالي"
                    buttonStyle={{width: '44%', alignSelf: 'center',borderRadius:10}}
                    textStyle={{ fontFamily:Fonts.type.bold,fontSize: 22 }}
                    onPress={() => handelTonextScreen() } 
                />
        
        </Box>
         
        </Box>
      </View>
    );
}
  
export default PaymentForm;


 