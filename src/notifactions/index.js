import React,{useState,useRef, useEffect} from 'react';
 import { Image ,View,TouchableOpacity, Platform} from 'react-native';
import {Center,Box,Text, Heading,VStack,Icon, HStack,Pressable,Avatar,ScrollView,Spacer,Spinner, Button, Stack} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
 import Ionicons  from 'react-native-vector-icons/Ionicons'
import{Metrics,Colors,Images, Fonts,heightPixel,widthPixel, fontPixel} from '../assets/Themes/'
import setItem from '../services/storage'
import api from '../services/api';
import {URL_ws,URL} from '../services/links';
import moment from 'moment/moment';
const  Notifactionscreen =(props)=>{ 

  const[loading,setLoding]=useState(false)
  const[notifactions,setnotifactions]=useState([])
  const [oncliks,setoncliks]=useState(0)

 
 
 useEffect(async()=>{
 
  getNotifaction()
    
 },[])

const getNotifaction= async()=>{
    const motherData = await setItem.getItem('BS:User');
    const token = await setItem.getItem('BS:Token');
    const mother=JSON.parse(motherData)
    console.log("test",mother._id)
   
    api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    // const response =api.get(`/receivernotfications/${mother._id}`).then((res)=>{
    const response =api.post(`/notficationsread`,{receiverid:mother._id }).then((res)=>{
      console.log("test=== mother respons",(res.data))
      setnotifactions(res.data)
     
    }).finally(()=> {setLoding(true)}).catch((err)=>console.log("Eorr to load  load nottifaction",err))
    console.log()
   }


  const handelNotifcation=async(id)=>{
    console.log("update notifactions",id)
    const user = await setItem.getItem('BS:User');
    const token = await setItem.getItem('BS:Token');
    const transctionID=Number(Math.floor(Math.random() * 1000))
     const userData=JSON.parse(user)
    
    api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    const response = await api.patch(`/notfications/${id}`,{
      is_read:true 
    })
    .then((item)=>{
         console.log("test notifactions",item.data)
      }).finally(()=> getNotifaction() ).catch((err)=> {return err,console.log("test notifactions",err)})

      
  }
  

   

    return (
     <ScrollView >
      <Box alignItems={'center'} backgroundColor={Colors.AminabackgroundColor}  height={Metrics.HEIGHT*0.8863}  mt={Platform.OS==='android'?20:88} flex='1'    >
      {!loading?
        <Spinner mt={Platform.OS==='android'?40:88} size={'lg'} color={Colors.TexTPink} />
        :
        <Stack mt={2} w="90%" alignItems={'center'} >
                
                {notifactions.map((item,index)=>{
                  return(
                    <TouchableOpacity key={item._id} style={{marginTop:3,marginBottom:2,width:Metrics.WIDTH*0.890,backgroundColor:"rgba(243, 243, 243, 1)",
                      flexDirection:'column',borderWidth:.4,borderColor:Colors.lightGray,borderRadius:22,padding:4,
                       marginTop:6,marginBottom:16,height:Metrics.HEIGHT*0.099421}}  >
                      <Box flexDirection={'column'}   justifyContent={'space-around'} >
                        <Stack flexDirection={'row'} justifyContent={'space-between'}  padding={'1'}>
                          <Text fontSize={fontPixel(20)} fontFamily={Platform.OS==="android"?Fonts.type.aminafonts: Fonts.type.base} fontWeight='bold' color={Colors.textZahry} >{item.title}</Text>
                          <Text fontSize={fontPixel(20)} fontFamily={Platform.OS==="android"?Fonts.type.aminafonts: Fonts.type.base} fontWeight='bold' color={Colors.newTextClr} ml={'3'} >{moment(item.createdAt).format('HH:MM a')}</Text>
                        </Stack>
                        <Spacer/>
                        <Stack flexDirection={'row'} justifyContent={'space-between'}  padding={'1'}>
                          <Text fontSize={fontPixel(18)} fontFamily={Platform.OS==="android"?Fonts.type.aminafonts: Fonts.type.base}>{item.content}</Text>
                          <Text fontSize={fontPixel(12)} fontFamily={Platform.OS==="android"?Fonts.type.aminafonts: Fonts.type.base}>رقم الطلب#{item.orderid}</Text>
                        </Stack>
                         
                       
                   
                        
                  </Box>
                              
                  
                  </TouchableOpacity>
               
                  )
                } 
          )}
          </Stack> 
         }
          
      
          
      
    </Box>
    </ScrollView>
      
    )

}
  
export default Notifactionscreen;
