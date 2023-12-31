import React,{useState,useRef, useEffect} from 'react';
 import { Image ,View,TouchableOpacity, Platform} from 'react-native';
import {Center,Box,Text, Heading,VStack,Icon, HStack,Pressable,Avatar,ScrollView,Spacer,Spinner, Button, Stack, FlatList} from 'native-base';
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
  const [active,setactive]=useState(false )
 const[select,setselect]=useState(null)
 
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


  const activeNotifaction=(indx)=>{
    setselect(indx)
  }
  const ITEM= ({ Notifactions })=>{
   return(
    
  <TouchableOpacity key={Notifactions._id} onPress={()=>activeNotifaction(Notifactions._id)}
           style={{marginTop:3,marginBottom:2,width:Metrics.WIDTH*0.890,backgroundColor:"rgba(243, 243, 243, 1)",
    flexDirection:'column',borderWidth:select===Notifactions._id?1:.4,borderColor:select===Notifactions._id?Colors.textZahry:Colors.lightGray ,borderRadius:22,padding:4,
     marginTop:6,marginBottom:16,height:Metrics.HEIGHT*0.099421}}  >
    {select===Notifactions._id ?
    <Stack flexDirection={'column'} alignItems={'center'}>
        <Text fontSize={fontPixel(22)} fontFamily={Platform.OS==="android"?Fonts.type.aminafonts: Fonts.type.base}color={Colors.greys} fontWeight={Platform.OS==='android'?'600':'700'} >رقم الطلب#{Notifactions.orderid}</Text>
        <Button  size={'xs'} borderRadius={'lg'} bgColor={Colors.textZahry} onPress={()=>handelNotifcation(Notifactions._id)}>
          <Text alignSelf={'center'} color={Colors.white}>ازالة من القائمة</Text></Button>
    </Stack>
      :
    <Box flexDirection={'column'}   justifyContent={'space-around'} >
      <Stack flexDirection={'row'} justifyContent={'space-between'}  padding={'1'}>
        <Text fontSize={fontPixel(20)} fontFamily={Platform.OS==="android"?Fonts.type.aminafonts: Fonts.type.base} fontWeight='bold' color={Colors.textZahry} >{Notifactions.title}</Text>
        <Text fontSize={fontPixel(20)} fontFamily={Platform.OS==="android"?Fonts.type.aminafonts: Fonts.type.base} fontWeight='bold' color={Colors.newTextClr} ml={'3'} >{moment(Notifactions.createdAt).format('HH:MM a')}</Text>
      </Stack>
      <Spacer/>
      <Stack flexDirection={'row'} justifyContent={'space-between'}  padding={'1'}>
        <Text fontSize={fontPixel(18)} fontFamily={Platform.OS==="android"?Fonts.type.aminafonts: Fonts.type.base}>{Notifactions.content}</Text>
        <Text fontSize={fontPixel(12)} fontFamily={Platform.OS==="android"?Fonts.type.aminafonts: Fonts.type.base}>رقم الطلب#{Notifactions.orderid}</Text>
      </Stack>
      
    </Box>}
  </TouchableOpacity>
   )
   
  }
  

   

    return (
      
      <Box alignItems={'center'} backgroundColor={Colors.AminabackgroundColor}  height={Metrics.HEIGHT*0.8863}  mt={Platform.OS==='android'?20:88} flex='1'    >
      {!loading?
        <Spinner mt={Platform.OS==='android'?40:88} size={'lg'} color={Colors.TexTPink} />
        :
        <Box mt={2} w="90%"  alignItems={'center'} >
                
                 
                   <FlatList
                   
                   data={notifactions} 
                   keyExtractor={(item, index) => item + index}
                   renderItem={({ item }) => <ITEM Notifactions={item} />}
                   scrollEnabled
                   />
               
                 
          
          </Box> 
         }
          
      
          
      
    </Box>   
      
    )

}
  
export default Notifactionscreen;
