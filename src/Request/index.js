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
    const[select,setselect]=useState(0)
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
    const [temDdata,setTempdata]=useState(null)

    const Item = ({title,i}) => { 
    return( 
        <Box flexDirection={'row'} alignItems='baseline'justifyContent={'center'} width={Metrics.WIDTH*0.299963} height={'16'} paddingBottom={'3'} backgroundColor={Colors.transparent}>
         <TouchableOpacity style={{flexDirection:'row'  ,marginTop:8,borderColor:Colors.gray,borderWidth:.2,justifyContent:'center',alignItems:'center',borderRadius:15} } 
             key={title} onPress={()=>handleSelection(i,title)}> 
            <Stack alignItems={'center'}  justifyContent='center' borderRadius={'xl'}   backgroundColor={i===select?Colors.AminaPinkButton:"#F1F1F1"} height={'10'} width={'20'} > 
                    <Text fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} textAlign='center'
                    fontSize={fontPixel(16)}   color={i===select?Colors.white:Colors.newTextClr}>{title.status}</Text>
            </Stack>
        </TouchableOpacity>
        </Box>   
         
        );
    }
   


    // <TouchableOpacity style={{flexDirection:'column'  , marginLeft:1,marginTop:2,width:widthPixel(77) ,height:heightPixel(50)} } 
    //          key={title} onPress={()=>handleSelection(i,title)}> 
    //          <Stack alignItems={'center'} borderRadius={15}  justifyContent='center' backgroundColor={i===select?Colors.AminaPinkButton:Colors.white} height={'12'} width={Metrics.WIDTH*0.2532} > 
    //                 <Text fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium}
    //                 fontSize={18}   color={i===select?Colors.white:Colors.newTextClr}>{title.status}</Text>
    //         </Stack>
    //             {/* <View style={{alignItems:'center',paddingBottom:1,borderBottomColor:i===select?"#000000":null,borderBottomWidth:i===select?2:null}}>
    //             </View> */}
    //          </TouchableOpacity>


   const handleSelection = (id,title) => {
    
        console.log( "test title ",title)
        setselect(id)
        setserviestype(title)
      switch (title.id,title.status){
        case  1 && "النشطة":
            console.log("++start filter Actiive expeted Canceled++" )
            handelREQActive()
            setFilterData({work:false})
           // setserviestype1("النشطة")

            break;
        case  2 && "القديمة":
            console.log("++start filter OLD request++")
            handelREQComplet()
            //setFilterData({statuse:"completed",work:true})
            //setserviestype1("القديمة")
         break;
        case  3 && "الملغاة":
            console.log("+++start filter CANSELED+++")
            handelREQcansel()
            setFilterData({statuse:"canceled",work:true})
           // setserviestype1("الملغاة")
         break;
      }
      
      
    } 
     
    
      
    useEffect(()=>{
       
        if(IsFetching){
            console.log("Start Feching Data",serviestype," and id servvice =",select)
        //     if(serviestype ==='النشطة'){ 
        //     console.log("ACTIVE++++++")
        //      setFilterData({work:false})
        //     }else{
        //     console.log("ALL ORDER++++++")
        //     handelREQ()
        //    }
        console.log("ALL ORDER++++++")
           // handelREQ()
           handleSelection(select,serviestype)
        }

        
    },[IsFetching])

    useEffect(()=>{
        console.log("Have change?")
        const intialData={id:1,status:"النشطة"}
        handleSelection(select,intialData)
        console.log(" load ALL ORDERS++++++ filterData",intialData)
    },[])  

    useEffect(  () => {
        const unsubscribe = props.navigation.addListener('focus',async () => {
            const intialData={id:1,status:"النشطة"}
            console.log("start refresh data on FOCUS mode",select,"---",serviestype)
            handleSelection(intialData.id,intialData)
            setselect(0)
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
             
            }).finally(()=>setloadingpage(false),console.log("fIESh========")).catch((err)=>{ 
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


    const handelREQActive = async (id) => {
        let orders1 = []
        setloadingpage(true)
        const user = await setItem.getItem('BS:User');
        const token = await setItem.getItem('BS:Token');
        const motherData = JSON.parse(user)
        const motherID = motherData._id
        console.log("TOKENS", token)
        api.defaults.headers.Authorization = (`Bearer ${JSON.parse(token)}`);
        const response = await api.get(`${URL}/alllorderbyacctive/${motherID}`).then((res) => {
            console.log("DATA, POST OK handelREQActive")
            //alll condtion expete filte
            // const ordersrq = res.data
            // orders1 = ordersrq.filter(function (item) {
            //     for (var key in filterData) {
            //         if (item[key] === undefined || item[key] != filterData[key]) {
            //             return false
            //         }
            //         return true
            //     }
            // })
            //console.log("DATA Orders filter,",orders1)
            //return orders1
            return res.data

        }).finally(() => setloadingpage(false)).catch((err) => {
            console.log("ERORR in Activve REQ", err)

        })

        console.log("Test Response DATA ",)
        setmotherReq(response)


    }

    const handelREQComplet = async (id) => {
        let orders1 = []
        setloadingpage(true)
        const user = await setItem.getItem('BS:User');
        const token = await setItem.getItem('BS:Token');
        const motherData = JSON.parse(user)
        const motherID = motherData._id
        console.log("TOKENS", token)
        api.defaults.headers.Authorization = (`Bearer ${JSON.parse(token)}`);
        const response = await api.get(`${URL}/alllorderbyacomplet/${motherID}`).then((res) => {
             console.log("DATA, POST OK handelREQComplet")
            //alll condtion expete filte
            // const ordersrq = res.data
            // orders1 = ordersrq.filter(function (item) {
            //     for (var key in filterData) {
            //         if (item[key] === undefined || item[key] != filterData[key]) {
            //             return false
            //         }
            //         return true
            //     }
            // })
            //console.log("DATA Orders filter,",orders1)
            //return orders1
            return res.data

        }).finally(() => setloadingpage(false)).catch((err) => {
            console.log("ERORR in Compleate REQ", err)

        })

        console.log("Test Response DATA ",)
        setmotherReq(response)


    }

    const handelREQcansel = async (id) => {
        let orders1 = []
        setloadingpage(true)
        const user = await setItem.getItem('BS:User');
        const token = await setItem.getItem('BS:Token');
        const motherData = JSON.parse(user)
        const motherID = motherData._id
        console.log("TOKENS", token)
        api.defaults.headers.Authorization = (`Bearer ${JSON.parse(token)}`);
        const response = await api.get(`${URL}/alllorderbyacanceld/${motherID}`).then((res) => {
             console.log("DATA, POST OK handelREQcansel")
            //alll condtion expete filte
            // const ordersrq = res.data
            // orders1 = ordersrq.filter(function (item) {
            //     for (var key in filterData) {
            //         if (item[key] === undefined || item[key] != filterData[key]) {
            //             return false
            //         }
            //         return true
            //     }
            // })
            //console.log("DATA Orders filter,",orders1)
            //return orders1
            return res.data

        }).finally(() => setloadingpage(false), console.log("fIESh========")).catch((err) => {
            console.log("ERORR", err)

        })

        console.log("Test Response  DATA",)
        setmotherReq(response)


    }
        
                 


    
const stReq=(val,work)=>{
            
   
            if(val==='pending'){
              return  <Box w={'20'} height={9} borderRadius={'3xl'} borderWidth={.2} borderColor={'gray.100'} bgColor={Colors.AminaButtonNew}  alignItems='center'    justifyContent={'center'} >
                <Text  color={Colors.white} fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular}   fontSize={12} textAlign='center' justifyContent={'center'} mt={4} >انتظار الدفع</Text> </Box>
            }
            if (val==='processing'){
                return  <Box w={'20'} height={9} borderRadius={'3xl'} borderWidth={.2} borderColor={'gray.100'} bgColor={Colors.AminaButtonNew}  alignItems='center' justifyContent={'center'} >
                     <Text  color={Colors.white} fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular}   fontSize={12} textAlign='center' justifyContent={'center'}>قيد الانتظار</Text></Box>
            }
            if (val==='canceled'){
                return  <Box w={'20'} height={9} borderRadius={'3xl'} borderWidth={.2} borderColor={'gray.100'} bgColor={Colors.AminaButtonNew}  alignItems='center' justifyContent={'center'} >
                     <Text  color={Colors.white} fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular}    fontSize={12} textAlign='center' justifyContent={'center'} >طلب ملغي</Text></Box>
            }   
            if (val==='completed'&& work===false){
                return <Box w={'20'} height={9} borderRadius={'3xl'} borderWidth={.2} borderColor={'gray.100'} bgColor={Colors.AminaButtonNew}  alignItems='center' justifyContent={'center'} >
                     <Text  color={Colors.white} fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular}  fontSize={12} textAlign='center' justifyContent={'center'}> تم الحجز</Text></Box>
            }
            if (val==='completed'&& work===true){
                return <Box w={'20'} height={9} borderRadius={'3xl'} borderWidth={.2} borderColor={'gray.100'} bgColor={Colors.AminaButtonNew}  alignItems='center' justifyContent={'center'} >
                     <Text  color={Colors.white} fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular}  fontSize={12} textAlign='center' justifyContent={'center'}>طلب مكتمل</Text></Box>
            }
            if (val==='failed'){
                return <Box w={'20'} height={9} borderRadius={'3xl'} borderWidth={.2} borderColor={'gray.100'} bgColor={Colors.AminaButtonNew} fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular}   alignItems='center' justifyContent={'center'} >reservition</Box>
            }
        }


    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const onRefresh = async () => {
        setIsFetching(true);
        await sleep(2000);
        setIsFetching(false);
    };

    const ConfimSetterData = (item) => {
         
        switch (item.statuse) {
            case "canceled":
                console.log("cansel orders", 1)
                Alert.alert("تنبيه", "تم الغاء الطلب لاتوجد تفاصيل اضافيه")
                break;
            case "processing":
                console.log(" wait for setter accssepted", 2)
                Alert.alert("تنبيه", "بانتضار موافقة الحاضنه علي الطلب")
                props.navigation.navigate('ConfirmRes', { data1: JSON.stringify(item), val: "chike" })
                break;
            case "completed":
                console.log("Go Invoice screen", 2)
                //Alert.alert("تنبيه","تم تنفيذ الخدمة حالة الطلب مكتملة")
                //direct to screen service befor start service
                var timeinhours = moment(item.start).diff(moment(), 'hours')
                var diffrenttime = moment(item.start).diff(moment(), 'minutes')
                const alowedtime = (diffrenttime / timeinhours)
                const nagitaveTime = Math.sign(diffrenttime)
                //canseel order auto
                if (Number(diffrenttime) <= 1 && item.work===false && item.status==="completed") {
                    return Alert.alert("امينة", "سوف يتم الغاء الطلب تلقائي بسبب تجاوز الوقت"),addResonAutomatic(item._id,"تم الالغاء من النظام")
                }

                if (Number(diffrenttime) > 61) {
                    console.log("tets time in hours >sexty", timeinhours)
                    return setchangeScreen(false), setShowModal(!ShowModal)
                }

                if (item.work === false) {
                    props.navigation.navigate('Invoice', { data1: item })

                } else if (item.work === true) {
                    //Alert.alert("Rating screen")
                    props.navigation.navigate('FinleScreeen',{data1:item})
                    // props.navigation.navigate('Invoice',{data1:item})
                }


                break;
            case "pending":
                console.log("  Go Payment screen", 2)
                //Alert.alert("Pinding screen")
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

    const twoOptionAlertHandler = (item) => {
        //function to make two option alert
        Alert.alert(
          //title
          'امينة',
          //body
          'هل تريدي الغاء الحجز الحالي',
          [
            {
              text: 'نعم',
              onPress: () => canselRequest(item)
            },
            {
              text: 'لا',
              onPress: () => console.log('No Pressed'), style: 'cancel'
            },
          ],
          {cancelable: false},
          //clicking out side of alert will not cancel
        );
      };
    

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
            setTempdata(item)
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
        console.log("TTEST DATA",temDdata)
        console.log("TTEST setter player id", temDdata.setterplayerid)
        const data = {
            receiver: temDdata.settterowner,
            content: "لقد تم الغاء الطلب من الام",
            title: "طلب ملغا",
            orderid: temDdata.orderid,
            playerid: temDdata.setterplayerid
        }
        console.log("Test Nortif beffrr++++", data)
        sendNotifcation(data)
    }



    const canselformout = (val) => {
        setShowModal(!ShowModal)
        setchangeScreen(null)
         
    }
    

    const addReson = async (value,userData) => {
        //first addreson=>canselorderbymother by oder ID
        const user = await setItem.getItem('BS:User');
        const token = await setItem.getItem('BS:Token');
        const orderId = orderID
        api.defaults.headers.Authorization = (`Bearer ${JSON.parse(token)}`);
        const response = await api.post("setterorderresone", {
            reson: value, orderID: orderId
        }).then((res) => {
            console.log('test resone response', res.data)
            sendNotifCansel()
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
            sendNotifCansel()
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
       <Box alignItems={'center'} justifyContent='center' height={'20'} p={2}  mt={'3'} ml={'3'} mr={'4'}   backgroundColor ={Colors.transparent} >
            <FlatList
            // sections={subservice}
            data={data}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item ,index}) => <Item title={item} i={index} />}
            //style={{borderWidth:1,borderColor:Colors.black}}
            horizontal={true}
            />
        </Box>
        
        <Box alignItems={'center'}  >
        
        <Box  >
         {loading?
            <Box>
                <Text alignItems={'center'} fontSize='md' color={'gray.500'}>sory ther is no Request ?</Text>
                <Button  variant={'link'}  onPress={()=>console.log(11)}>Refresh</Button>
                <Spinner  size={'lg'} color={Colors.bloodOrange}/></Box>:
            <Box backgroundColor={Colors.transparent}>
                {/* <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontSize="lg"  p="2" pb="3" textAlign={'left'}> بيانات الطلبات</Text> */}
                {loadingpage&&<Box width={"100%"}>
                 <Spinner size={'lg'} animating={loadingpage?true:false} color={Colors.AminaPinkButton} />
                </Box>}
            <FlatList data={motherReq} renderItem={({item }) => (
                    <Box  marginLeft={pixelSizeHorizontal(1)} mt={'0.5'} mb={4} flexDirection={'column'} borderRadius={'2xl'} borderColor={'gray.100'} borderWidth={'1'}
                        width={widthPixel(380)} height={heightPixel(200 )} shadow={'3'} backgroundColor={'white'} alignItems='center'   >
                     
                    <Box flexDirection={'row'} ml={1} backgroundColor={Colors.transparent} marginTop={3} > 
                        <Box justifyContent='center' alignItems={'center'} width={Metrics.WIDTH*0.21821} ml={'4'}   >
                            <Image source={{ uri: `${URL}/users/${item.settterowner}/avatar` }} resizeMode='contain' style={{height:90,width:90,
                             marginTop:1,marginRight:1,borderRadius:30 }} />
                        </Box>
                        {/* all boxess */}
                        <Box alignItems={'center'} justifyContent={'center'} ml={1} mr={'7'} >
                            <Box flexDirection={'row'} width={widthPixel(260)} justifyContent='space-between' alignItems={'baseline'}  >
                                 <Stack flexDirection={'row'} justifyContent='space-around' >
                                    <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold,fontSize:fontPixel(18),fontWeight:'700',color:Colors.newTextClr }}> {item.settername}</Text>
                                </Stack>
                                <Image source={Images.hartgray} style={{width:widthPixel(20),height:heightPixel(20),marginRight:8}} resizeMode='contain'/>
                            </Box>

                            <Box flexDirection={'column'} width={widthPixel(250)} alignItems={'flex-start'}justifyContent={'space-around'} mt={'0.5'}  >
                                <Stack flexDirection={'row'} justifyContent='space-around' >
                                   <Text  style={{fontFamily:Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular,fontSize:fontPixel(18),color:"#00ABB9", }} >{item.serviestype}</Text>
                                </Stack>
                                <Stack flexDirection={'column'} alignItems={'flex-start'} >
                                    <Stack flexDirection={'row'} alignItems='baseline'>
                                        <Image source={Images.ccalendrgreen2} style={{width:widthPixel(18),height:heightPixel(18)}} resizeMode='contain'/>
                                        <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold,fontSize:fontPixel(10),fontWeight:"700" ,color:Colors.newTextClr ,marginLeft:3}}>{moment(item.potementdate).format("LL")}</Text>
                                    </Stack>
                                    <Stack flexDirection={'row'} alignItems='baseline' justifyContent='space-around'>
                                        <Image source={Images.clockgreennew} style={{width:widthPixel(18),height:heightPixel(18)}} resizeMode='contain'/>
                                        <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold,fontSize:fontPixel(12),fontWeight:"700" ,color:Colors.newTextClr ,marginLeft:3}}>{moment(item.start).format("hh:mm a")} - {moment(item.end).format("hh:mm a")}</Text>
                                    </Stack>
                                    <Stack flexDirection={'row'}alignItems='baseline' justifyContent='space-around' >
                                        <Image source={Images.chilednew} style={{width:widthPixel(18),height:heightPixel(18)}} resizeMode='contain'/>
                                        <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold,fontSize:fontPixel(10),fontWeight:'700',color:Colors.newTextClr ,marginLeft:3 }}>{item.childeaccount} طفل</Text>
                                    </Stack>
                                    
                                </Stack>
                                 
                            </Box>
                             
                        </Box>
                    </Box>
                    
                    <Box  flexDirection='row' alignItems={'center'}   width={widthPixel(377)} height={heightPixel(48)} borderRadius={'3xl'} mt={1} >
                            <Stack width={82} height={heightPixel(41)}  justifyContent='center' alignItems={'center'} borderRadius={'3xl'}  ml={2}>
                             {stReq(item.statuse,item.work)}
                                 
                            </Stack>
                            
                            {item.statuse==="canceled" || item.statuse==='completed'&& item.work===true?
                            <Box width={widthPixel(99)}/>:<Stack><CustomButton
                                        buttonColor= {Colors.AminaButtonNew}
                                        title="الغاء الطلب"
                                        buttonStyle={{width:widthPixel(99) ,height:heightPixel(40) ,borderRadius:35,marginLeft:pixelSizeHorizontal(16)}}
                                        textStyle={{fontSize: 12,fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.bold }}
                                        titleColor={Colors.white}
                                        margnBtn={1}
                                        onPress={()=> twoOptionAlertHandler (item)}
                             /></Stack>}
                        
                            
                       

                           
                            
                            {/* <Button w={'55%'} bgColor={"#DDF1F4"} variant='outline' onPress={()=> ConfimSetterData(item)}>تفاصيل الطلب</Button> */}
                            {item.statuse==="canceled"  ?
                                <CustomButton
                                    buttonColor= {Colors.AminaPinkButton}
                                    title="سبب الالغاء"
                                    buttonStyle={{width:widthPixel(148) ,height:heightPixel(40),borderRadius:35 ,marginLeft:pixelSizeHorizontal(18)}}
                                    textStyle={{fontSize: 16,fontFamily:Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold ,fontWeight:"700"}}
                                    titleColor={Colors.white}
                                    margnBtn={1}
                                     onPress={()=> showCanselMsg(item.reson)} /> 
                                :
                                <CustomButton
                                        buttonColor= {Colors.AminaPinkButton}
                                        title= {item.statuse==='completed'&& item.work===false?"بداء الخدمة":"تفاصيل الطلب"}
                                        buttonStyle={{width:widthPixel(138) ,height:heightPixel(40),borderRadius:35 ,marginLeft:pixelSizeHorizontal(18)}}
                                        textStyle={{fontSize: 16,fontFamily:Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold ,fontWeight:'700'}}
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

 {changeScreen? <CanselForm hidemodal={(val)=> canselformout(val) }/>:<ResonForm done={true} addReson={(value)=>addReson(value) } hidemodal={(val)=> canselformout(val) } />}

</Modal.Body>
 
</Modal.Content>
</Modal>
</Center>
    </View>
)
}
export default Request;