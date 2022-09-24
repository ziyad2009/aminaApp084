import React, { useState ,useEffect} from 'react';
import {View,TouchableOpacity,FlatList,Image, Alert, Platform} from 'react-native'
import {Box, Button,Heading,Spinner,HStack,Spacer,VStack,Text,Modal, Stack,Center,TextArea} from 'native-base';
import styles from './styles';
import {Metrics,Colors,Fonts,Images} from '../assets/Themes/';
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import setItem from '../services/storage'
 import moment from 'moment';
 import { Rating } from 'react-native-ratings';
import api from '../services/api';
import { URL_ws,URL } from '../services/links';
import CustomButton from '../services/buttons/buttton';
import OutlaintButton from '../services/buttons/buttonsOutlain';
 

const Request=(props)=>{
    const[select,setselect]=useState(null)
    const[serviestype,setserviestype]=useState("النشطة")
    const[motherReq,setmotherReq]=useState([])
    const[loading,setloading]=useState(false)
    const[loadingpage,setloadingpage]=useState(false)
     
    const[like,setLike]=useState(true)
    const[IsFetching,setIsFetching]=useState(false)
    const [filterData,setFilterData]=useState({work:false})
    const data=[
        {id:1,status:"النشطة"},
        {id:2,status:"القديمة"},
        {id:3,status:"الملغاة"}
    ]
    const[ShowModal,setShowModal]=useState(false)
    const[resoncansel,setresoncansel]=useState('')



    const Item = ({title,i}) => { 
    return( 
        <TouchableOpacity style={{flexDirection:'column' ,backgroundColor:Colors.AminaButtonNew, marginLeft:1,marginTop:2,width:Metrics.WIDTH*0.313 ,height:Metrics.HEIGHT*0.0521} } 
             key={title} onPress={()=>handleSelection(i,title)}> 
             <View style={{alignItems:'center',padding:2,paddingBottom:4,backgroundColor:Colors.transparent,height:Metrics.HEIGHT*0.0341}} > 
                    <Text fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.base}
                    fontSize={18} fontWeight='500' color={Colors.white}>{title.status}</Text>
            </View>
                <View style={{alignItems:'center',paddingBottom:1,borderBottomColor:i===select?"#000000":null,borderBottomWidth:i===select?2:null}}>
                </View>
             </TouchableOpacity>
        );
    }


   const handleSelection = (id,title) => {
    setselect(id)
    console.log( "test title ",title)
      setserviestype(title.status)
      switch (title.id,title.status){
        case  1 && "النشطة":
            console.log("start filter active expeted canceled" )
            
            setFilterData({work:false})

            break;
        case  2 && "القديمة":
            console.log("start filter pendeng")
            setFilterData({statuse:"completed",work:true})
         break;
        case  3 && "الملغاة":
            console.log("start filter cansel")
            setFilterData({statuse:"canceled",work:true})

         break;
      }
      
      
    } 
     
    
      
    useEffect(()=>{
       
        if(IsFetching){
            console.log("TAP TAP",serviestype)
        //     if(serviestype ==='النشطة'){ 
        //     console.log("ACTIVE++++++")
        //      setFilterData({work:false})
        //     }else{
        //     console.log("ALL ORDER++++++")
        //     handelREQ()
        //    }
        console.log("ALL ORDER++++++")
            handelREQ()
        }

        
    },[IsFetching])

    useEffect(()=>{
        console.log("Have change?")
        
       
            // if(serviestype==='النشطة'){
                
            //      console.log("ACTIVE++++++ filterData")
            //      return  setFilterData({work:false})
            //  }

            handelREQ()
            console.log("ALL ORDERS++++++ filterData")
    },[filterData])  

    const handelREQ= async(id)=>{ 
        let orders1=[]
        
        const user = await setItem.getItem('BS:User');
        const token = await setItem.getItem('BS:Token');
        const motherData=JSON.parse(user)
        const motherID=motherData._id
       
            api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
            const response= await  api.get(`${URL}/mothereadrallorder/${motherID}`).then((res)=>{
                console.log("DATA, POST OK",filterData)
                //alll condtion expete filte
                const ordersrq=res.data
                orders1=ordersrq.filter(function(item){
                    for(var key in filterData){
                        if(item[key]===undefined || item[key] !=  filterData[key]){
                            return false
                        }
                        return true
                    }
                })
                //console.log("DATA Orders filter,",orders1)
                return orders1
             
            }).catch((err)=>{ 
            console.log("ERORR",err)
            
            })

            console.log("Test Response ",response)
            setmotherReq(response)
            
 
        }

        const loadinActivReq= async(id)=>{ 
            
            
            const user = await setItem.getItem('BS:User');
            const token = await setItem.getItem('BS:Token');
            const motherData=JSON.parse(user)
            const motherID=motherData._id
            // console.log("motherID==",motherID)
            // console.log("usestat filter",filterData)
            //interval = setInterval(async() => {
            
            api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
                await api.get(`${URL}/mothereadrallorder/${motherID}`).then((res)=>{
                 
                // alll condtion expete filte
                 console.log("get active data",res.data)
                 const ordersrq=res.data
                  const orders1=ordersrq.filter(function(item){
                      for(var key in filterData){
                          if(item[key]===undefined || item[key] != filterData[key]){
                              return false
                          }
                          return true
                      }
                  })
                  console.log("ORDERS! ",orders1)
                  setmotherReq(orders1)
                })

                setTimeout(() => {
                    console.log("stoop loadinf",motherReq)
                     
                   
                 },3000);
             
                 

                // if(response.length >= 1){
                //     console.log("DATA Orders with condtions,",response)
                //     setmotherReq(response)
                //     setloading(!loading)
                //     console.log("response gooof -Active")
                // }
                // else{
                //     setmotherReq(response)
                //     setloading(!loading)
                //     console.log("response baad -Active")
                // }
               
            }

    
        const stReq=(val)=>{
            
   
            if(val==='pending'){
              return  <Box w={'50%'} bgColor={Colors.white}  alignItems='center'    justifyContent={'center'} >
                <Text  color={Colors.AminaButtonNew} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}  fontWeight='800' textAlign={'center'} justifyContent='center' mt='4'>انتظار الدفع</Text> </Box>
            }
            if (val==='processing'){
                return  <Box w={'50%'} bgColor={Colors.white}  alignItems='center' justifyContent={'center'} >
                     <Text  color={Colors.AminaButtonNew} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}  fontWeight='800' textAlign={'center'} justifyContent='center' mt='1'>قيد الانتظار</Text></Box>
            }
            if (val==='canceled'){
                return  <Box w={'50%'} bgColor={Colors.white}  alignItems='center' justifyContent={'center'} >
                     <Text  color={Colors.AminaButtonNew} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}   fontWeight='800' textAlign={'center'} justifyContent='center' mt='3' > لم يتم الموافقه</Text></Box>
            }   
            if (val==='completed'){
                return <Box w={'50%'} bgColor={Colors.white}  alignItems='center' justifyContent={'center'} >
                     <Text  color={Colors.AminaButtonNew} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontWeight='800' textAlign={'center'} justifyContent='center' mt='3'> تم الحجز</Text></Box>
            }
            if (val==='failed'){
                return <Box w={'50%'} bgColor={Colors.white} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}   alignItems='center' justifyContent={'center'} >reservition</Box>
            }
        }
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const onRefresh = async () => {
            setIsFetching(true);
            await sleep(2000);
            setIsFetching(false);
          };

          const ConfimSetterData=(item)=>{
             console.log("test",item.statuse)

             switch (item.statuse) {
                case "canceled":
                    console.log("cansel orders",1)
                    Alert.alert("تنبيه","تم الغاد الطلب لاتوجد تفاصيل اضافيه")
                break;
                case  "processing":
                    console.log(" wait for setter accssepted",2)
                    Alert.alert("تنبيه","بانتضار موافقة الحاضنه علي الطلب")
                    
                break;
                case  "completed":
                    console.log("  Go Invoice screen",2)
                    props.navigation.navigate('Invoice',{data1:item})
                   
                break;
                case  "pending":
                    console.log("  Go Payment screen",2)
                    props.navigation.navigate('PaymentForm',{data1:item})
                   
                break;

             }
            
          }

const showCanselMsg=(val)=>{
    setShowModal(!ShowModal)
    setresoncansel(val)
}
return(
    <View style={styles.wrapper}>
       <Box h={Metrics.HEIGHT*0.0412}>
            <FlatList
            // sections={subservice}
            data={data}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item ,index}) => <Item title={item} i={index} />}
            style={{marginLeft:11,marginRight:11 ,backgroundColor:'#00ABB9',borderRadius:10}}
            horizontal={true}
            />
        </Box>
        
        <Box alignItems={'center'} mt='1' backgroundColor={'white'}>
        
        <Box bgColor={Colors.transparent}  >
         {loading?
            <Box>
                <Text alignItems={'center'} fontSize='md' color={'gray.500'}>sory ther is no Request ?</Text>
                <Button  variant={'link'}  onPress={()=>handelREQ(11)}>Refresh</Button>
                <Spinner  size={'lg'} color={Colors.bloodOrange}/></Box>:
            <Box>
            
            <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontSize="lg"  p="2" pb="3" textAlign={'left'}> بيانات الطلبات</Text>
            <FlatList data={motherReq} renderItem={({item }) => (
                 <Box   key={item._id} borderWidth=".5"  bgColor={Colors.white} borderColor="#00ABB9" borderRadius="md"  pr="5" py="2" ml="3" mr="5" mb={7} width={Metrics.WIDTH*0.963}>
                    <HStack space={3} justifyContent='space-around' >
                        <Image  source={{ uri: `${URL}/users/${item.settterowner}/avatar`}} resizeMode='stretch' 
                            style={{width: Metrics.WIDTH*0.25130, height: Metrics.HEIGHT*0.124570,marginLeft:5,marginRight:2,borderRadius:80}} />
                        <Spacer />
                        <VStack flexDirection={'column'}   alignItems={'flex-start'} >
                            <Text  color={ Colors.blacktxt}fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontWeight="bold" fontSize={20}>
                                {item.settername}
                            </Text>
                             
                            <Text color={ Colors.blacktxt} fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base} fontWeight="thin" fontSize={18} mr={2}>
                                {item.serviestype}
                            </Text>
                            <Box flexDirection={'row'} alignItems='baseline'  bgColor='coolGray.50' >
                                    <Rating
                                        type='custom'
                                        //onFinishRating={(e)=>ratingCompleted(e)}
                                        style={{ paddingVertical: 3 ,backgroundColor:Colors.transparent,padding:10}}
                                        ratingCount={5}
                                        imageSize={15}
                                        ratingBackgroundColor={"#BFD1D6"}
                                        tintColor={"#FFFFFF"}
                                        showRating ={false}
                                        starContainerStyle={styles.ratingContainerStyle}
                                        isDisabled ={true}
                                    />
                            </Box>
                            <Box flexDirection={'row'}  justifyContent='space-around'>
                                <Stack flexDirection={'row'} alignItems='baseline' ml={'1'}>
                                    <Feather name="calendar" size={18}  color={'#00ABB9'}   />
                                    <Text color= "#000000" letterSpacing={1} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}
                                   fontWeight="thin"  ml={'1'} fontSize={10}>{moment(item.potementdate).format("LL")}</Text>
                                </Stack>
                                <Stack flexDirection={'row'} alignItems='baseline' ml={'1'}> 
                                    <Feather name="clock" size={18}  color={'#00ABB9'}   />
                                     <Text color= "#000000" fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontWeight="thin" ml={'1'} fontSize={10}>
                                    {moment(item.start).format("hh:mm a")} - {moment(item.end).format("hh:mm a")}</Text>
                                </Stack>
                                
                            </Box>
                             
                            

                            <Box flexDirection={'row'} justifyContent='space-around'>
                                <FontAwesome name="child" size={18}  color={'#00ABB9'}  style={{marginLeft:1}} />
                                <Text color= {Colors.blacktxt} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}fontWeight="thin"  ml='3' fontSize={18}>{item.childeaccount} اطفال</Text>
                                </Box>
                                 
                        </VStack>
                            <Spacer />
                            <TouchableOpacity >
                            <Image source={like? Images.like1:Images.like} resizeMode ={'cover'} style={{width:Metrics.WIDTH*0.0932 ,height:Metrics.HEIGHT*0.072}}   />
                            </TouchableOpacity>
                        </HStack>
                        {item.statuse==="canceled"?
                             
                            <TouchableOpacity   style={{marginTop:2,marginBottom:1 , marginHorizontal:100}} onPress={()=> showCanselMsg(item.reson)} >
                                <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}  color={"#551A8B"}> عرض سبب الرفض</Text>
                            </TouchableOpacity>:
                              <Box />
                        }
                        <Box  flexDirection={'row'} borderLeftRadius='10' >
                           
                            {stReq(item.statuse)}
                            
                            {/* <Button w={'55%'} bgColor={"#DDF1F4"} variant='outline' onPress={()=> ConfimSetterData(item)}>تفاصيل الطلب</Button> */}
                            {item.statuse==="canceled"?
                             <Box alignItems={'center'} justifyContent='center' backgroundColor={'error.100'} w="55%" >
                                <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontSize={12}>طلب ملغي</Text>
                            </Box>:
                             <CustomButton
                                        buttonColor= {Colors.AminaButtonNew}
                                        title="تفاصيل الطلب"
                                        buttonStyle={{width: '53%', alignSelf: 'center',marginTop:1}}
                                        textStyle={{fontSize: 18}}
                                        titleColor={Colors.white}
                                        onPress={()=> ConfimSetterData(item)}
                             /> }
                        </Box> 
                        
                </Box>)
                }
                keyExtractor={item => item._id}  onRefresh={onRefresh} refreshing={IsFetching}/>
            </Box>}
            </Box>
          
      </Box>

      <Center >

<Modal isOpen={ShowModal} onClose={() => setShowModal(false)} borderColor={Colors.AminaButtonNew} borderWidth='1'>
<Modal.Content width={Metrics.WIDTH*0.9372 } >
<Modal.CloseButton padding={3} mt='2' mb={'2'} />
<Modal.Header alignItems={'center'} backgroundColor={Colors.amin1Button1}>
<Heading fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.base}  >رسالة تنبيه</Heading>
</Modal.Header> 
<Modal.Body alignItems={'center'} justifyContent='center' >

<Stack flexDirection={"column"} alignItems='flex-start'   w="95%" padding={2}   >
  <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} fontSize={22} fontWeight='bold' >
  اسباب الرفض من قبل الحاضنه</Text>
  <TextArea isDisabled totalLines={6} value={resoncansel} ontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} fontSize={18} fontWeight='bold' />
</Stack>

</Modal.Body>
<Modal.Footer alignItems={'center'}>
   
    <Box alignItems={'center'}  w={Metrics.WIDTH*0.834} ml='3' mr='4' mt={5} rounded='lg'>
    <CustomButton
      buttonColor={Colors.AminaButtonNew}
      title="اغلاق"
      buttonStyle={{width: '90%', alignSelf: 'center',marginTop:1}}
      textStyle={{fontSize: 20}}
      onPress={() => setShowModal(!ShowModal)}
    />
    </Box> 
</Modal.Footer>
</Modal.Content>
</Modal>
</Center>
    </View>
)
}
export default Request;