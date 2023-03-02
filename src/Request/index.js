import React, { useState ,useEffect} from 'react';
import {View,TouchableOpacity,FlatList,Image, Alert, Platform} from 'react-native'
import {Box, Button,Heading,Spinner,HStack,Spacer,VStack,Text,Modal, Stack,Center,TextArea} from 'native-base';
import styles from './styles';
import {Metrics,Colors,Fonts,Images, pixelSizeHorizontal, widthPixel, heightPixel, pixelSizeVertical, fontPixel} from '../assets/Themes/';
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import setItem from '../services/storage'
 import moment from 'moment';
 import { Rating } from 'react-native-ratings';
import api from '../services/api';
import { URL_ws,URL } from '../services/links';
import CustomButton from '../services/buttons/buttton';
import OutlaintButton from '../services/buttons/buttonsOutlain';
import { sendNotifcation } from '../services/fucttions';
import CanselForm from './canselform';
import ResonForm from './resonform';
   

const Request=(props)=>{
    const[select,setselect]=useState(null)
    const[serviestype,setserviestype]=useState("النشطة")
    const[motherReq,setmotherReq]=useState([])
    const[loading,setloading]=useState(false)
    const[loadingpage,setloadingpage]=useState(false)
     
    const[orderID,setorderID]=useState('')
    const[IsFetching,setIsFetching]=useState(false)
    const [filterData,setFilterData]=useState({work:false})
    const data=[
        {id:1,status:"النشطة"},
        {id:2,status:"القديمة"},
        {id:3,status:"الملغاة"}
    ]
    const[ShowModal,setShowModal]=useState(false)
    const[resoncansel,setresoncansel]=useState('')
    const[changeScreen,setchangeScreen]=useState(null)


    const Item = ({title,i}) => { 
    return( 
        <Box flexDirection={'row'}  width={'20'} height={heightPixel(50)} backgroundColor="#FFFAFA">
         <TouchableOpacity style={{flexDirection:'column' ,backgroundColor:"#FFFAFA", marginLeft:1,marginTop:2,width:widthPixel(66) ,height:heightPixel(50)} } 
             key={title} onPress={()=>handleSelection(i,title)}> 
             <Stack alignItems={'center'} borderRadius={15}  justifyContent='center' backgroundColor={i===select?Colors.AminaPinkButton:Colors.white} height={heightPixel(50)} > 
                    <Text fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium}
                    fontSize={18}   color={i===select?Colors.white:Colors.newTextClr}>{title.status}</Text>
            </Stack>
                {/* <View style={{alignItems:'center',paddingBottom:1,borderBottomColor:i===select?"#000000":null,borderBottomWidth:i===select?2:null}}>
                </View> */}
             </TouchableOpacity>
             
        </Box>
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

    useEffect(  () => {
        const unsubscribe = props.navigation.addListener('focus',async () => {
            console.log("start refresh data")
            handelREQ()
        }); 
    
        return unsubscribe;
      }, []);

    const handelREQ= async(id)=>{ 
        let orders1=[]
        setloadingpage(true) 
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
             
            }).finally(()=>setloadingpage(false)).catch((err)=>{ 
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

    
        const stReq=(val,work)=>{
            
   
            if(val==='pending'){
              return  <Box w={78} height={9} borderRadius={5} borderWidth={.2} borderColor={'gray.100'} bgColor={Colors.AminaButtonNew}  alignItems='center'    justifyContent={'center'} >
                <Text  color={Colors.Milky} fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular}   fontSize={12} textAlign='center' justifyContent={'center'} mt={4} >انتظار الدفع</Text> </Box>
            }
            if (val==='processing'){
                return  <Box w={78} height={9} borderRadius={5} borderWidth={.2} borderColor={'gray.100'} bgColor={Colors.AminaButtonNew}  alignItems='center' justifyContent={'center'} >
                     <Text  color={Colors.Milky} fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular}   fontSize={12} textAlign='center' justifyContent={'center'}>قيد الانتظار</Text></Box>
            }
            if (val==='canceled'){
                return  <Box w={78} height={9} borderRadius={5} borderWidth={.2} borderColor={'gray.100'} bgColor={Colors.AminaButtonNew}  alignItems='center' justifyContent={'center'} >
                     <Text  color={Colors.Milky} fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular}    fontSize={12} textAlign='center' justifyContent={'center'} >طلب ملغي</Text></Box>
            }   
            if (val==='completed'&& work===false){
                return <Box w={78} height={9} borderRadius={5} borderWidth={.2} borderColor={'gray.100'} bgColor={Colors.AminaButtonNew}  alignItems='center' justifyContent={'center'} >
                     <Text  color={Colors.Milky} fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular}  fontSize={12} textAlign='center' justifyContent={'center'}> تم الحجز</Text></Box>
            }
            if (val==='completed'&& work===true){
                return <Box w={78} height={9} borderRadius={5} borderWidth={.2} borderColor={'gray.100'} bgColor={Colors.AminaButtonNew}  alignItems='center' justifyContent={'center'} >
                     <Text  color={Colors.Milky} fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular}  fontSize={12} textAlign='center' justifyContent={'center'}>طلب مكتمل</Text></Box>
            }
            if (val==='failed'){
                return <Box w={78} height={9} borderRadius={5} borderWidth={.2} borderColor={'gray.100'} bgColor={Colors.AminaButtonNew} fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular}   alignItems='center' justifyContent={'center'} >reservition</Box>
            }
        }


    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const onRefresh = async () => {
        setIsFetching(true);
        await sleep(2000);
        setIsFetching(false);
    };

    const ConfimSetterData = (item) => {
        console.log("test", item.statuse)
        //const a=item.statuse==='completed'&& item.work===false?
        switch (item.statuse) {
            case "canceled":
                console.log("cansel orders", 1)
                Alert.alert("تنبيه", "تم الغاد الطلب لاتوجد تفاصيل اضافيه")
                break;
            case "processing":
                console.log(" wait for setter accssepted", 2)
                Alert.alert("تنبيه", "بانتضار موافقة الحاضنه علي الطلب")
                props.navigation.navigate('ConfirmRes', { data1: JSON.stringify(item), val: "chike" })
                break;
            case "completed":
                console.log("  Go Invoice screen", 2)
                //Alert.alert("تنبيه","تم تنفيذ الخدمة حالة الطلب مكتملة")
                //direct to screen service befor start service
                var timeinhours = moment(item.start).diff(moment(), 'hours')
                var diffrenttime = moment(item.start).diff(moment(), 'minutes')
                const alowedtime = (diffrenttime / timeinhours)
                const nagitaveTime = Math.sign(diffrenttime)

                console.log("tets time in hours Cassses", timeinhours, "time in muint", diffrenttime)
                console.log("tets alow time Cassses", alowedtime, "time finle", nagitaveTime)
                if (Number(diffrenttime) <= 1 && item.work===false && item.status==="completed") {
                    return Alert.alert("امينة", "سوف يتم الغاء الطلب تلقائي بسبب تجاوز الوقت"),addResonAutomatic(item._id,"تم الالغاد من النظام")
                }

                if (Number(diffrenttime) > 61) {
                    console.log("tets time in hours >sexty", timeinhours)
                    return setchangeScreen(false), setShowModal(!ShowModal)
                }

                if (item.work === false) {
                    props.navigation.navigate('Invoice', { data1: item })

                } else if (item.work === true) {
                    Alert.alert("Rating screen")
                    props.navigation.navigate('FinleScreeen',{data1:item})
                    // props.navigation.navigate('Invoice',{data1:item})
                }


                break;
            case "pending":
                console.log("  Go Payment screen", 2)
                Alert.alert("Pinding screen")
                //props.navigation.navigate('PaymentForm',{data1:item})
                // const newData=item
                // props.navigation.navigate('TelerPage',paymentdata={newData})
                props.navigation.navigate('ConfirmRes', { data1: JSON.stringify(item), val: "chike" })

                break;

        }

    }

    const showCanselMsg = (val) => {
       Alert.alert('',` سبب الغاء الحجز ${val}`)
    }

    const canselRequest = async (item) => {
        setorderID(item._id)
        var timeinhours = moment(item.start).diff(moment(item.end), 'minutes')
        var diffrenttime = moment(item.start).diff(moment(), 'minutes')
        const alowedtime = (diffrenttime / timeinhours)
        const nagitaveTime = Math.sign(diffrenttime)

        console.log("tets time in hours", timeinhours, "time in muint", diffrenttime)
        console.log("tets alow time", alowedtime, "time finle", nagitaveTime)
        if (Number(diffrenttime) <= 61 || Number(diffrenttime) >1 ) {
            setchangeScreen(true)
            setShowModal(!ShowModal)
        }
        if (Number(diffrenttime) > 61) {
            console.log("tets time in hours", timeinhours)
            return setchangeScreen(false), setShowModal(!ShowModal)
        }
        if (Number(diffrenttime) < 1) { 
            console.log("tets time in hours", timeinhours)
            return setchangeScreen(false), setShowModal(!ShowModal)
        }
        // Alert.alert("تنبيه","سوف يتم الغاء الطلب بشكل نههائي")
        // const orderId = id
        // console.log("canssel", orderId)
        // await api.delete(`/mother/order/${orderId}`).then((res) => {
        //    console.log("test DELET FIILE",res.data)
        // }).finally(() => sendNotifCansel())
        //     .catch((err) => { console.log("ERORR DELET ORDER", err) })

    }

    const sendNotifCansel = () => {
        console.log("TTEST setter player id", motherReq.setterplayerid)
        const data = {
            receiver: motherReq.settterowner,
            content: "لقد تم الغاد الطلب من الام",
            title: "طلب ملغا",
            orderid: motherReq.orderid,
            playerid: motherReq.setterplayerid
        }
        console.log("Test Nortif beffrr++++", data)
        sendNotifcation(data)
    }



    const canselformout = (val) => {
        setShowModal(!ShowModal)
        setchangeScreen(null)
    }

    const addReson = async (value) => {
        //first addreson=>canselorderbymother by oder ID
        const user = await setItem.getItem('BS:User');
        const token = await setItem.getItem('BS:Token');
        const orderId = orderID
        api.defaults.headers.Authorization = (`Bearer ${JSON.parse(token)}`);
        const response = await api.post("setterorderresone", {
            reson: value, orderID: orderId
        }).then((res) => {
            console.log('test resone response', res.data)
        }).finally(() => canselorderbymother()).catch((err) => console.log("ERORR from reson post", err))
    }
//////////Cancel order automaticc by system/////////////////////////////
    const addResonAutomatic = async (id,value) => {
         console.log("sart aoto===")
        setorderID(id)
        const user = await setItem.getItem('BS:User');
        const token = await setItem.getItem('BS:Token');
        const orderId = orderID
        api.defaults.headers.Authorization = (`Bearer ${JSON.parse(token)}`);
        const response = await api.post("setterorderresone", {
            reson: value, orderID: orderId
        }).then((res) => {
            console.log('test resone response', res.data)
        }).finally(() => canselorderbymotherAuto()).catch((err) => console.log("ERORR from reson post", err))
    }
    const canselorderbymotherAuto = async () => {
        const token = await setItem.getItem('BS:Token');
        const orderId = orderID
        api.defaults.headers.Authorization = (`Bearer ${JSON.parse(token)}`);
        const response = await api.post("setterordercansel", {
            orderID: orderId
        }).then((res) => {
            console.log('order cansel+++')
        }).finally(() => onRefresh()).catch((err) => console.log("ERORR from reson post", err))
    }
///////////////////////////////////
    const canselorderbymother = async () => {
        const token = await setItem.getItem('BS:Token');
        const orderId = orderID
        api.defaults.headers.Authorization = (`Bearer ${JSON.parse(token)}`);
        const response = await api.post("setterordercansel", {
            orderID: orderId
        }).then((res) => {
            console.log('test ccansel order response', res.data)
            canselformout()
        }).finally(() => onRefresh()).catch((err) => console.log("ERORR from reson post", err))
    }

return(
    <View style={styles.wrapper}>
       <Box height={heightPixel(Platform.OS==='android'?53: 55)} >
            <FlatList
            // sections={subservice}
            data={data}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item ,index}) => <Item title={item} i={index} />}
            style={{marginLeft:4 ,marginRight:4}}
            horizontal={true}
            />
        </Box>
        
        <Box alignItems={'center'} mt='1' backgroundColor={'white'}>
        
        <Box bgColor={Colors.AminabackgroundColor}  >
         {loading?
            <Box>
                <Text alignItems={'center'} fontSize='md' color={'gray.500'}>sory ther is no Request ?</Text>
                <Button  variant={'link'}  onPress={()=>handelREQ(11)}>Refresh</Button>
                <Spinner  size={'lg'} color={Colors.bloodOrange}/></Box>:
            <Box>
            
            <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontSize="lg"  p="2" pb="3" textAlign={'left'}> بيانات الطلبات</Text>
                {loadingpage&&<Box>
                 <Spinner size={44} animating={loadingpage?true:false} color={Colors.AminaButtonNew} />
                </Box>}
            <FlatList data={motherReq} renderItem={({item }) => (
                 <Box  marginLeft={pixelSizeHorizontal(1)} mt={'0.5'} mb={4}     flexDirection={'column'} 
                        width={widthPixel(388)} height={heightPixel(160 )} backgroundColor={"#FFFFFF"} alignItems='center'   >
                     
                    <Box flexDirection={'row'}    ml={1} backgroundColor={Colors.transparent} marginTop={3} > 
                        <Box justifyContent='center' alignItems={'center'} width={widthPixel(97)} height={heightPixel(88)}>
                            <Image source={{ uri: `${URL}/users/${item.settterowner}/avatar` }} resizeMode='contain' style={{height:heightPixel(88),width:widthPixel(97),
                             marginTop:pixelSizeVertical(1),marginRight:pixelSizeHorizontal(3),borderRadius:10 }} />
                        </Box>
                        {/* all boxess */}
                        <Box alignItems={'center'} ml={1}>
                            <Box flexDirection={'row'} width={widthPixel(282)} justifyContent='space-between' alignItems={'baseline'}  >
                                 <Stack flexDirection={'row'} justifyContent='space-around' >
                                    <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(16),color:Colors.newTextClr }}> {item.settername}</Text>
                                    <Text  style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(18),color:"#FB5353",marginLeft:pixelSizeHorizontal(18) }} >{item.serviestype}</Text>
                                </Stack>
                                <Image source={Images.save} style={{width:widthPixel(20),height:heightPixel(20),marginRight:8}} resizeMode='contain'/>
                            </Box>
                            <Box flexDirection={'row'} width={widthPixel(282)} justifyContent='space-between' >
                                <Stack flexDirection={'row'} justifyContent='space-around' >
                                    <Stack flexDirection={'row'} alignItems='baseline' justifyContent='space-around'>
                                        <Image source={Images.clockgreen} style={{width:widthPixel(12),height:heightPixel(12)}} resizeMode='contain'/>
                                        <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(10),color:Colors.newTextClr ,marginLeft:pixelSizeHorizontal(2)}}>{moment(item.start).format("hh:mm a")} - {moment(item.end).format("hh:mm a")}</Text>
                                    </Stack>
                                    <Stack flexDirection={'row'} alignItems='baseline' justifyContent='space-around' ml={pixelSizeHorizontal(4)}>
                                        <Image source={Images.clandergreen} style={{width:widthPixel(12),height:heightPixel(12)}} resizeMode='contain'/>
                                        <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(10),color:Colors.newTextClr }}>{moment(item.potementdate).format("LL")}</Text>
                                    </Stack>
                                </Stack>
                                <Stack position={'relative'} bottom={1}right={2}>
                                    <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium,fontSize:fontPixel(10),color:Colors.rmadytext} }>حفظ</Text>
                                </Stack>
                            </Box>
                            <Box flexDirection={'row'} width={widthPixel(282)} justifyContent="space-between" >
                                <Stack alignItems='center' justifyContent={'center'}  >
                                    <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(10),color:Colors.newTextClr }}>{item.childeaccount} طفل</Text>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                    
                    <Box  flexDirection='row' width={widthPixel(388)} height={heightPixel(48)} mt={pixelSizeVertical(1)}>
                            <Stack width={82} height={heightPixel(41)}  justifyContent='center'  alignItems={'center'} ml={2}>
                             {stReq(item.statuse,item.work)}
                                 
                            </Stack>
                            
                            {item.statuse==="canceled" || item.statuse==='completed'&& item.work===true?
                            <Box width={widthPixel(99)}/>:<Stack><CustomButton
                                        buttonColor= {Colors.AminaButtonNew}
                                        title="الغاء الطلب"
                                        buttonStyle={{width:widthPixel(85) ,height:heightPixel(40) ,borderRadius:5,marginLeft:pixelSizeHorizontal(16)}}
                                        textStyle={{fontSize: 12,fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.bold }}
                                        titleColor={Colors.Milky}
                                        margnBtn={1}
                                        onPress={()=> canselRequest(item)}
                             /></Stack>}
                        
                            
                       

                           
                            
                            {/* <Button w={'55%'} bgColor={"#DDF1F4"} variant='outline' onPress={()=> ConfimSetterData(item)}>تفاصيل الطلب</Button> */}
                            {item.statuse==="canceled"  ?
                                <CustomButton
                                    buttonColor= {Colors.AminaPinkButton}
                                    title="سبب الالغاء"
                                    buttonStyle={{width:widthPixel(173) ,height:heightPixel(40),borderRadius:5 ,marginLeft:pixelSizeHorizontal(18)}}
                                    textStyle={{fontSize: 16,fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.bold }}
                                    titleColor={Colors.white}
                                    margnBtn={1}
                                     onPress={()=> showCanselMsg(item.reson)} /> 
                                :
                                <CustomButton
                                        buttonColor= {Colors.AminaPinkButton}
                                        title= {item.statuse==='completed'&& item.work===false?"بداء الخدمة":"تفاصيل الطلب"}
                                        buttonStyle={{width:widthPixel(173) ,height:heightPixel(40),borderRadius:5 ,marginLeft:pixelSizeHorizontal(18)}}
                                        textStyle={{fontSize: 16,fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.bold }}
                                        titleColor={Colors.white}
                                        margnBtn={1}
                                        onPress={()=> ConfimSetterData(item)}
                             /> }
                        </Box   > 
                   
                     
                </Box> 
                
                )}
                keyExtractor={item => item._id} 
                onRefresh={onRefresh}
                refreshing={IsFetching}/>
            </Box>}
            
            </Box>
          
      </Box> 

      <Center >

<Modal isOpen={ShowModal} onClose={() => setShowModal(false)} borderColor={Colors.AminaButtonNew} borderWidth='1'>
<Modal.Content width={Metrics.WIDTH*0.9372 } >
<Modal.Body alignItems={'center'} justifyContent='center' >

 {changeScreen? <CanselForm hidemodal={(val)=> canselformout(val) }/>:<ResonForm done={true} addReson={(value)=>addReson(value) } />}

</Modal.Body>
 
</Modal.Content>
</Modal>
</Center>
    </View>
)
}
export default Request;