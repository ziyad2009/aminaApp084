import React,{useEffect,useState,useRef} from 'react';
import {View,Image, Platform} from 'react-native'
import {FlatList,Box,Stack,Avatar,Text,VStack,HStack,Spacer, Button,Spinner,Modal,Center} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors,Fonts ,Metrics,Images,fontPixel,widthPixel,heightPixel,pixelSizeHorizontal,pixelSizeVertical} from '../assets/Themes';
import styles from './styles';
 import moment from 'moment'
import CircularProgress from 'react-native-circular-progress-indicator'
import setItem from '../services/storage';
import api from '../services/api';
import {URL_ws,URL} from '../services/links';
import CustomButton from '../services/buttons/buttton';
 

const Invoice=(props)=>{
    const[babseters,setbabyseters]=useState([])
    const[chld,setChld]=useState([])
    const [setterdata,setsetterdata]=useState({})
    const[loading,setLoding]=useState(false)
    const[loaddata,setloaddata]=useState(false)
   const[showModal,setShowModal]=useState(false)
   const [userinfo,setuserinfo]=useState([])
 
   const[OK,SETOK]=useState(false)
   const [newData,setNewData]=useState([])
   const[messageExpirationTimeMS,setmessageExpirationTimeMS]=useState(0)
 
    useEffect(()=>{
        console.log("test use efevct 1111")
        // console.log("test props ConfitmScreen",JSON.parse(props.route.params.data1) )
         setbabyseters(props.route.params.data1)
         //map childrens 
         setChld(props.route.params.data1)


    },[])

    useEffect(async()=>{
       console.log("test use efevct2222")
         setLoding(true)
        
         const token = await setItem.getItem('BS:Token');
      
        api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
        const response= await api.get("/mothers/me").then((res)=>{
            return res.data
        }).finally(()=>  loadBabysetterdata(props.route.params.data1.settterowner) )
        //)
        console.log("123-",response)
        //get mother info
        setuserinfo(response)

      },[])
  

      const loadBabysetterdata=async(id)=>{
        console.log("startt load data")
        const token = await setItem.getItem('BS:Token');
        api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
        const response=await api.get(`/setter/${id}`).then((res)=>{
            console.log("test RESPONSe",res.data.setter)
            setsetterdata(res.data.setter)
        }).finally(()=>setloaddata(false)).catch(err=>{
            console.log("ERORR get dsetter dat from invoice",err),setloaddata(false)
        })
       
        
      }


const handelREQ= async(id)=>{ 
    const user = await setItem.getItem('BS:User');
    const token = await setItem.getItem('BS:Token');
    interval = setInterval(async() => {
        console.log("setInterval==",id)
        api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
        const response= await  api.post(`${URL}/serchorders`,{
         orderID:id
       }).then((res)=>{
         console.log("DATA, POST OK")
         //socket.emit("orders",res)
       // console.log("DATA,",res.data)
        if(!res.data.accepted&&res.data.statuse==='canceled'){
            alert("تم الاعتذار عن قبول الطلب")
            clearInterval(interval)
            setShowModal(false)
        }
        if(res.data.accepted&&res.data.statuse==='pending'){
            alert("تم الموافقه على الطلب")
            clearInterval(interval)
            setShowModal(true)
        }

       }).catch((err)=>console.log("ERORR",err))

      }, 6000);

    // setTimeout(
    //     () => {
    //       console.log("setTimeout==",id)
    //     },
    //     messageExpirationTimeMS,
    //   );
    }
  
    const disconnect=()=> {
     canselRequest()
    }

 
   const confirmRequest=async(item)=>{
    console.log(item)
    //move to maplocation of order and start service
     props.navigation.navigate('DDirctionMap',{data1:item,setter:setterdata})
   }

   // canssel Request and change to statuse:"canceled"
   const canselRequest=async(value)=>{
   const orderid= (value._id).toString()
   console.log("canssel",orderid)
   const token = await setItem.getItem('BS:Token');
   api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
   await api.post(`/setterordercansel`,{orderID:orderid}).then((res)=>{
    console.log("DATA cannseled",res.data)
    props.navigation.goBack()
   }).catch((err)=>{console.log("ERORR",err)})
    
   }
 
   
const showCode=(value)=>{
    setShowModal(!showModal)
}
  
const modelShow=()=>{
    setShowModal(!showModal)
     //console.log("time1",moment(time1).format('HH:MM a'))
 }

 const ReternScreeen=()=>{
    setShowModal(!showModal)
    props.navigation.navigate('WorkScreen',{data1:babseters,motherinfo:userinfo.mother.displayname})
    
   }


    return(

    <View style={{ flex:1,marginTop:Platform.OS==='android'?30: 70,backgroundColor:Colors.AminabackgroundColor ,flexDirection:'column'}} > 
    <Box borderColor={'gray.100'} backgroundColor='white' borderWidth='1' flexDirection={'column'}  justifyContent='space-around' mt='10' ml='3' p={3} w={Metrics.WIDTH*0.928} >
        <Box alignItems={'center'} justifyContent={'center'}   flexDirection={'row'}>
            <Stack flexDirection={'row'} justifyContent='flex-start'  flex={1} >
                <Image source={Images.girl} style={{width:widthPixel(16),height:heightPixel(20)}} resizeMode='contain'/>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.medium: Fonts.type.medium} fontSize={fontPixel(16)}  ml={3}  > {babseters.settername}</Text>
            </Stack>   
            <Stack   flex={2} justifyContent='flex-end' flexDirection={'row'}>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16)} color={Colors.newTextClr}>رقم الطلب</Text>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16)} color={Colors.newTextClr} ml={2} >{babseters.orderid}</Text>
            </Stack>
        </Box>
        <Box flexDirection={'row'} alignItems='flex-start' mt={2}  >
            <Stack flexDirection={'row'} justifyContent='flex-start'  flex={1} >
                <Image source={Images.calender} style={{width:widthPixel(16),height:heightPixel(20)}} resizeMode='contain'/>
            <Stack>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16)} color={Colors.newTextClr}  ml={3}> {moment(babseters.potementdate).format('LL')}</Text>
            </Stack>
            </Stack> 
        </Box>
        <Box flexDirection={'row'} alignItems='flex-start' mt={2}  >
            <Stack flexDirection={'row'} justifyContent='flex-start'  flex={1} >
                <Image source={Images.clock} style={{width:widthPixel(16),height:heightPixel(20)}} resizeMode='contain'/>
            <Stack>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16)} color={Colors.newTextClr}  ml={3}>{moment(babseters.start).format('hh:mm a')} "الى "{moment(babseters.end).format('hh:mm a')}</Text>
            </Stack>
            </Stack>
        
        </Box>
        <Box flexDirection={'row'} alignItems='flex-start' mt={2}>
            <Stack flexDirection={'row'} justifyContent='flex-start'  flex={1} >
                <Image source={Images.chiled} style={{width:widthPixel(16),height:heightPixel(20)}} resizeMode='contain'/>
            <Stack>
            <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16)} color={Colors.newTextClr}  ml={3}>{babseters.childeaccount}طفل</Text>
            </Stack>
                
            </Stack> 
        </Box>

        <Box flexDirection={'row'} alignItems='flex-start' mt={2}>
            <Stack flexDirection={'row'} justifyContent='flex-start'  flex={1} >
                <Image source={Images.chiled} style={{width:widthPixel(16),height:heightPixel(20)}} resizeMode='contain'/>
            <Stack>
                {loading ?<Box flexDirection={'row'} >
                {chld.childe.map((item,index)=>{
                    return(
                    <Box key={item._id} flexDirection='row' justifyContent={'space-around'}>
                         {index >=1 && <Text> - </Text>}
                            <Text  fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16)} color={Colors.newTextClr}  ml={3}> {item.name} </Text>
                            </Box>
                    )
                })  }
                
                </Box>:null }
            </Stack>
            </Stack> 
        </Box>
        <Box flexDirection={'row'} alignItems='flex-start' mt={2}>
            <Stack flexDirection={'row'} justifyContent='flex-start'  flex={1} >
                <Image source={Images.location} style={{width:widthPixel(16),height:heightPixel(20)}} resizeMode='contain'/>
            <Stack>
            <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16)} color={ Colors.newTextClr}  ml={3}>{babseters.address}</Text>
            </Stack>
                
            </Stack> 
        </Box>

        <Box alignItems={'center'} mt={'15'} mb={4}>
            <Stack borderTopColor={'light.100'} borderWidth={1} width={widthPixel(314)} mt={2} />
        </Box>
         
        <Box flexDirection={'row'} alignItems='flex-start' mt={2}>
            <Stack flexDirection={'row'} justifyContent='flex-start'  flex={1} >
                <Image source={Images.price} style={{width:widthPixel(16),height:heightPixel(20)}} resizeMode='contain'/>
            <Stack>
            <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16)} color={Colors.newTextClr}  ml={3}>{babseters.price} ريال</Text>
            </Stack>
                
            </Stack> 
        </Box>
    </Box>
     
    {loaddata?<Spinner size={'lg'} color={Colors.border} animating={loaddata}  style={{marginTop:22}}/>:
     <Box flexDirection={'row'} justifyContent='space-around' mt={4}>
        <Button bgColor={"#F5F5F5"}  width={widthPixel(170)} borderColor={Colors.text} borderRadius={7} onPress={()=>confirmRequest(babseters)}>
            <Text  fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16)} color={Colors.newTextClr}>موقع الحاضنه الان</Text>
        </Button>
        <Button bgColor={Colors.AminaPinkButton}  width={widthPixel(170)} borderColor={Colors.text} borderRadius={7} onPress={()=>showCode(babseters)}>
            <Text  fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16)} color={Colors.newTextClr}>كود الطلب</Text>
        </Button>
     </Box>
    
    
    }
    <Center>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} height={'72'} backgroundColor='white' position={'absolute'} bottom={0} >
        <Modal.Content width={Metrics.WIDTH } alignItems={'center'}  justifyContent='center'  >
            
            <Modal.Body alignItems={'center'}  justifyContent='center' mt={1} borderColor='white'>
                <Text    fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(16)} color={Colors.newTextClr} textAlign={'center'} > الرجاء مشاركة كود الطلب لبداء الخدمة</Text>
                <Stack borderColor={Colors.text} borderWidth={.2} backgroundColor={'#F5F5F5'} padding={2} alignItems='center' justifyContent={'center'} borderRadius={'md'} mt={5} >
                    <Text   fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(20)} color={Colors.newTextClr} letterSpacing={2} textAlign={'center'} >{babseters.scurtycode}</Text>
                </Stack>
                <Box alignItems={'center'} w={Metrics.WIDTH*0.834} ml='3' mr='4' mt={5} rounded='lg'>   
                    <CustomButton
                        buttonColor={Colors.AminaPinkButton}
                        title="بداء الخدمة"
                        buttonStyle={{width: '90%', alignSelf: 'center',borderRadius:10}}
                        textStyle={{fontSize: 15}}
                        onPress={()  =>  ReternScreeen() }
                      />
                </Box> 
            </Modal.Body>
             
</Modal.Content>
</Modal>
</Center>

        </View>
        
    )

}
export default  Invoice;

