import React,{useState,useRef, useEffect} from 'react';
 import { Image ,View,TouchableOpacity, Platform} from 'react-native';
import {Center,Box,Text, Heading,VStack,Icon, HStack,Pressable,Avatar,ScrollView,Spacer,Spinner, Button, Stack} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
 import Ionicons  from 'react-native-vector-icons/Ionicons'
import{Metrics,Colors,Images, Fonts} from '../assets/Themes/'
import setItem from '../services/storage'
import api from '../services/api';
 
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
     <ScrollView>
     <Box alignItems={'center'}   mt={Platform.OS==='android'?20:88} flex='1'    >
          {!loading?
              <Spinner mt={Platform.OS==='android'?40:88} size={'lg'} color={Colors.TexTPink} />:

              <Stack mt={2} w="90%" >
                <Text fontFamily={Fonts.type.aminafonts} fontSize={22}>التنبيهات</Text>
                {notifactions.map((item,index)=>{
                  return(
                    <TouchableOpacity key={item._id} style={{marginTop:3,marginBottom:2,width:Metrics.WIDTH*0.910,
                      flexDirection:'column',borderBottomWidth:1,borderColor:Colors.amin1Button1,
                      marginRight:3,padding:10 }}  onPress={()=>setoncliks(index)} >

                   
              
                  <Box flexDirection={'row'}>
                    <Stack w={"15%"} backgroundColor='#F38193' justifyContent={'center'} alignItems='center' 
                    borderRadius={70} borderColor={'warmGray.200'} borderWidth={1} >
                      <Ionicons  name='notifications' size={25} color={Colors.white}/>
                    </Stack>
                    
                    <VStack  alignItems={'flex-start'} ml={2} flexWrap={'wrap'} >
                        <Text  mr={2} fontSize={18} fontFamily={Fonts.type.bold}>{item.title}</Text>
                        <Text  mr={2} fontSize={12} fontFamily={Fonts.type.bold}>{item.content}</Text>
                    </VStack>
                  <Spacer/>
                  {/* <Stack alignItems={'center'} flexDirection='row' justifyContent={'space-between'} w={"24%"}  >
                  <Ionicons  name={Platform.OS==='ios'?'ios-eye-outline':"eye"} size={25} color={Colors.lightGray} style={{marginRight:25}}/>
                  <Ionicons  name={Platform.OS==='ios'?'close':"close"} size={25} color={Colors.red} style={{marginRight:7}}  />
                  </Stack> */}
                  <Stack alignContent={'flex-end'} flexDirection='row' justifyContent={'flex-end'} w={"10%"}  >
                   
                  <Ionicons  name={Platform.OS==='ios'?'ios-eye-outline':"eye"} size={30} color={Colors.TexTPink} 
                   onPress={()=>handelNotifcation(item._id)} style={{marginRight:1}}  />
                  </Stack>
                  </Box>
                  {!oncliks===index&&<Stack mt={2} alignItems='flex-end'>
                   {/* <Button   bgColor={'green.100'} onPress={()=> console.log(index)}>testooo</Button> */}
                   <TouchableOpacity style={{backgroundColor:Colors.AminaButtonNew,width:Metrics.WIDTH*0.221 ,alignItems:'center',padding:2}}>
                    <Text fontSize={18} color={Colors.blacktxt} fontFamily={Fonts.type.base} p="1">تمديد</Text>
                   </TouchableOpacity> 
                  </Stack>}
                  
                  
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

{/* <TouchableOpacity>
                    <Text fontSize={18} color={Colors.blacktxt} fontFamily={Fonts.type.base}>rnhVi</Text>
                   </TouchableOpacity> */}

{/* <Center mt={'50'}  flex={1} > 
<Box  backgroundColor={'amber.400'}  _dark={{
bg:'coolGray.800'
}} _light={{
bg: 'white'
}} flex="1" safeAreaTop maxW="400px" w="100%">
  {/* <Heading p="4" pb="3" size="lg">
    Notifaction
  </Heading> */}
//   {notifactions.map((item)=>{
//     <Box alignItems={'center'}><Text>{item._id}</Text>
//     <Button>ttEst</Button>
//       </Box>
     
//   })}
 
//   {/* <ScrollView  showsVerticalScrollIndicator={false}>
//     <Basic />
//   </ScrollView> */}
// </Box>
// </Center> */}
