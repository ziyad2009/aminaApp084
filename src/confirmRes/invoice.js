import React,{useEffect,useState,useRef} from 'react';
import {View,Image, Platform} from 'react-native'
import {FlatList,Box,Heading,Avatar,Text,VStack,HStack,Spacer, Button,Spinner,Modal,Center} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors,Fonts ,Metrics,Images} from '../assets/Themes';
import styles from './styles';
 import moment from 'moment'
import CircularProgress from 'react-native-circular-progress-indicator'
import setItem from '../services/storage';
import api from '../services/api';
import {URL_ws,URL} from '../services/links';
import QRCode from 'react-native-qrcode-svg';
import CustomButton from '../services/buttons/buttton';
 

const Invoice=(props)=>{
    const[babseters,setbabyseters]=useState([])
    const[chld,setChld]=useState([])
    const[loading,setLoding]=useState(false)
   const[showModal,setShowModal]=useState(false)
   const[OK,SETOK]=useState(false)
   const [newData,setNewData]=useState([])
   const[messageExpirationTimeMS,setmessageExpirationTimeMS]=useState(0)
 
    useEffect(()=>{
        // console.log("test props ConfitmScreen",JSON.parse(props.route.params.data1) )
         setbabyseters(props.route.params.data1)
         setChld(props.route.params.data1)


    },[])
    useEffect(()=>{
         setLoding(true)
      },[babseters,chld])
  
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
    console.log("start")
    props.navigation.navigate('DDirctionMap',{data1:item})
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
 


    return(

    <VStack mt={Platform.OS==='android'?30: 70}> 
    <HStack borderColor={"#00ABB9"} borderWidth='1' flexDirection={'column'}  justifyContent='center' mt='10' ml='3' p={3} w={Metrics.WIDTH*0.928} >
        <VStack  flexDirection={'row'} justifyContent='space-between' mt={2} mb={1}>
        <Text style={[styles.mainTex,{textAlign:'left'}]}  >ملخص الطلب</Text>
        <HStack>
            <Text style={styles.mainTex}>رقم الطلب</Text>
             <Text style={styles.mainTex}>{babseters.orderid}</Text>
            <Text style={styles.mainTex}>:</Text>
        </HStack>
        
        </VStack>
        <Box borderColor={'#00ABB9'} borderWidth='1' h={'1%'} />
        
        
        <HStack flexDirection={'column'} alignItems='flex-start' mt={2}  >
            <VStack flexDirection={'row'} w={"full" } justifyContent='space-between'  mt='1' p={1}  >
                <Text style={styles.leftText}>اسم الجليسه</Text>
                 <Text  textAlign={'left'} style={styles.rightTex}  > {babseters.settername}</Text>
            </VStack>
            <VStack flexDirection={'row'} w={"full" } justifyContent='space-between'  mt='1' p={1} >
                <Text  style={styles.leftText}>اليوم</Text>
                <Text  style={styles.rightTex}> {moment(babseters.potementdate).format('LL')}</Text>
                 
            </VStack>
            <VStack flexDirection={'row'} w={"full" } justifyContent='space-between'  mt='1' p={1}>
            <Text style={styles.leftText}>الوقت</Text>
                <Text style={styles.rightTex}>{moment(babseters.start).format('hh:mm a')} "الى "{moment(babseters.end).format('hh:mm a')}</Text>
            </VStack>
        
        
        </HStack>

        

        <VStack flexDirection={'row'} w={"full" } justifyContent='space-between'  mt='1' p={1}>
        <Text style={styles.leftText}>عدد االاطفال</Text>
        <Text style={styles.rightTex}> {babseters.childeaccount}</Text>
        </VStack>

        <VStack flexDirection={'row'} w={"full" } justifyContent='space-between'  mt='1' p={1}>
        <Text style={styles.leftText}>اسماء الاطفال</Text>
            {loading ?<Box>
            {chld.childe.map((item)=>{
                return(
                <Box key={item._id} flexDirection='row' justifyContent={'space-around'}>
                        <Text style={[styles.rightTex,{ width:Metrics.WIDTH*0.242,fontSize:14}]}> {item.name}</Text>
                        <Text style={[styles.rightTex,{ width:Metrics.WIDTH*0.242,fontSize:14}]}> * {item.diseasses}</Text>
                        </Box>
                )
            })  }
            </Box>:null }
        
        </VStack>
        
        <VStack flexDirection={'column'} w={"full" } justifyContent='space-between'  mt='1' p={1}>
            <Box borderColor={'#00ABB9'} borderWidth='1' h={'1%'} />
            <HStack mt='4'>
            <Text style={styles.leftText}>اجمالي التكلفه </Text>
             <Text style={styles.rightTex}> {babseters.totalprice}</Text>

            </HStack>
            <HStack>
            <QRCode
                value="3ddd3b267df85f9739b107389c544d80"
                color={Colors.AminaButtonNew}
             />
             <Box alignItems={'flex-start'} ml={3} flexWrap='wrap'  w={Metrics.WIDTH*0.555}>
                <Text   fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} letterSpacing='1.5' fontSize={Platform.OS==='android'?"14":"md"} textAlign="left" >لبداء الخدمه الرجاء ادخال رقم الكود  من قبل الحاضنه لبداءالخدمه  </Text>
                
                {/* <Text   fontFamily={Fonts.type.base}  letterSpacing='1' fontSize='md'>  من قبل الحاضنه لبداءالخدمه </Text> */}
             </Box>

            </HStack>
            
        
        </VStack>

        </HStack>
        <VStack flexDirection={'row'}>
             
                
            
            <Center alignItems={'center'}>
            <Box alignItems={'center'} w={Metrics.WIDTH*0.8861}  ml='5' mr='4' mt={0} rounded='lg'>
                     {/* <Button bgColor={Colors.AminaButtonNew} size={'lg'} mb='1.5' w='full'
                        onPress={() => {confirmRequest(babseters) }} fontFamily={Fonts.type.light} fontSize={20}> موقع الحاضنه الان</Button> */}
                        <CustomButton
                        buttonColor={Colors.AminaButtonNew}
                        title="موقع الحاضنه الان"
                        buttonStyle={{width: '88%', alignSelf: 'center'}}
                        textStyle={{fontSize: 20}}
                        onPress={() => confirmRequest(babseters) }
                     />
                </Box>
                {/* <Box alignItems={'center'} w={Metrics.WIDTH*0.401} ml='3' mr='4' mt={5} rounded='lg'>
                        <Button bgColor={Colors.AminaButtonNew} size={'lg'} mb='1.5' w='full'
                            onPress={() => {canselRequest(babseters) }}> الغاء الطلب</Button>
                </Box> */}
            </Center>
            
            
                     
            
        </VStack>


        </VStack>
        
    )

}
export default  Invoice;

