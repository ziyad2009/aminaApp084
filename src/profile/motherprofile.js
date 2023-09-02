import React, { useState, useEffect,useContext } from 'react';
import {View, SafeAreaView,Alert,ScrollView, Platform,KeyboardAvoidingView,Image,TouchableOpacity} from 'react-native'
import {Stack,Text,Input,Button,Select,CheckIcon,Spinner,IconButton,Icon,HStack,Heading, Box,Modal,Center,Radio,Popover, Spacer} from 'native-base'
import styles from './styles'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import api from '../services/api';
import setItem from '../services/storage'
import{Metrics,Colors,Fonts,Images,fontPixel,widthPixel,heightPixel,pixelSizeHorizontal,pixelSizeVertical} from '../assets/Themes/'
import { UserContext } from '../services/UserContext';
import CustomButton from '../services/buttons/buttton';
import { FacebookLoader, InstagramLoader } from 'react-native-easy-content-loader';
import { TouchableHighlight } from 'react-native-gesture-handler';

const Motherprofilw=(props)=>{
    const[motherData,setmotherData]=useState({})
    const[motherName,setmotherName]=useState("")
    const[motherFamyly,setmotherFamyly]=useState("")
    const[motherId,setmotherId]=useState("")
    const[motherEmail,setmotherEmail]=useState("")
    const[lat,setlat]=useState(0)
    const[lon,setlon]=useState(0)
    const[chiled,setChiled]=useState(null)
    const[selcChiled,setSelectchiled]=useState('')
    const[selectDies,setSelectdies]=useState(null)
    const[locationmother,setlocation]=useState('')
    const[age,setAge]=useState(0)
    const[gender,setgender]=useState(null)
    const[desise,setDesise]=useState([])
    const [chieldList,setChiledLest]=useState([])
    const [chiieldAcount,setchiieldAcount]=useState(0)

    const[isopen,setOpen]=useState(false)
    const[isopen1,setOpen1]=useState(false)
    const [ShowModal,setShowModal]=useState(false)
    const [loding ,setLoding]=useState(false)
    const [msgerorr,setmsgerorr]=useState(false)
    const [msg,setmsge]=useState(false)
    const{sethome,ErorrMessage,errmsg}=useContext(UserContext)
    let alllrets=true
    const [position, setPosition] = useState("auto");
    const [isOpen, setIsOpen] = useState(false);
    useEffect(async()=>{
       
        profileChick()
         alldesise()
        allchiled()
         

        const location= await setItem.getItem('BS:Location') 
        if (!location){
            console.log("cant get location")
          setlocation('...')
        }else{
          const  existLocation=JSON.parse(location)
          setlocation(existLocation.formatted)
          console.log("Mother Locattiont",existLocation)
          setlat(existLocation.lat)
          setlon(existLocation.lon)
        }
      
        
    },[])

    

   const allchiled= async()=>{
    const token = await setItem.getItem('BS:Token');
    api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
       await api.get("/mother/childe").then((chld)=>{
            
            const data=Object.entries(chld.data)
            setchiieldAcount(data.length)
            setChiledLest(chld.data)
            console.log("cheild acount",data.length)
            //from get is object not array
            setLoding(false)
        })
    }
    const alldesise= async()=>{
        const token = await setItem.getItem('BS:Token');
        api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
         await api.get("/mother/diseases").then((des)=>{
            console.log("Desisess",des.data)
            setDesise(des.data)
        })

    }
    useEffect(  () => {
        const unsubscribe = props.navigation.addListener('focus',async () => {
            console.log("test event")
            const location= await setItem.getItem('BS:Location') 
           
            if(location===null){
                console.log("no location exist?")
                
            }else{
              const  existLocation=JSON.parse(location)
              setlocation(existLocation.formatted)
              setlat(existLocation.lat)
              setlon(existLocation.lon)
            }
        });
    
        return unsubscribe;
      }, []);
    
      const profileChick=async()=>{
        setLoding(true)
        const token = await setItem.getItem('BS:Token');
        const location= await setItem.getItem('BS:Location') 
        const  existLocation=JSON.parse(location)
        
        console.log("LOCATION from Storage",existLocation)
        if(existLocation===null){
            console.log("no location exist?")
        }
        //start get profile
        setLoding(true)
        api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
       const response= await api.get("/mothers/me").then((res)=>{
           return res
        })
         
        if (response.status===undefined){
              console.log("test Res is undefined++",)
              setLoding(false)
             return;
         }
         if(response.data.message==="mother is not exist!"){
            console.log("mother is not regester")
            setLoding(false)
            return;
         }
        if (response.status===401){
              console.log("test Res status",response.status)
              setLoding(false) 
              return;
        }
        
        setmotherData(response.data)
        setLoding(false)
        const intialmotherdata=response.data.mother
        
         setmotherName(intialmotherdata.name)
         setmotherFamyly(intialmotherdata.displayname)
         setmotherId(intialmotherdata.idcard)
         setmotherEmail(intialmotherdata.email)

     }



     const addChield=  ()=>{
        setShowModal(!ShowModal)
        if(msgerorr===false){}
        setmsgerorr(false)
        setmsge ('')
    }
    

    const addChield2= async()=>{
       
        if(chiled===null || age==="" || gender===null  ){
             Alert.alert("تنبيه","الرجاء التاكد من ادخال الاسم والعمر والجنس للطفل")
            return;
        }
            setShowModal(!ShowModal)
            const token = await setItem.getItem('BS:Token');
            const newData={id:Number(Math.floor(Math.random() * 1000)), chiled,age,gender,selectDies}
            console.log("tets disess ",selectDies)
            console.log("TEST TOKEN",token)
            //update state in  app
            //setChiledLest (oldarray=>[...oldarray,newData]) 
        
            api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
            const getMotherChieeld=await  api.post("/mother/addchilde",{
            id:(newData.id).toString(),
            name:chiled,
            age:age,
            gender:gender,
            diseasses:selectDies
        }).then((res)=>{
            return res.data
        }).finally(()=> allchiled() )
        .catch((err)=>{
            console.log("Erorr in add chiled",err)
        })

            console.log("test mother chiled",getMotherChieeld)

            setChiled(null) 
            setAge('')
            setgender(null)
            setSelectdies(null)
        }
        const removeChiiled=async(val,name)=>{
            console.log("name  ",name,"",val)
            const token = await setItem.getItem('BS:Token');            
            api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
            await api.delete(`chailedbynamedelete/${name}`).then((res)=>{
            console.log("tes remove chiled",res.data)
            }).finally((done)=> allchiled())
            .catch((err)=>{
                console.log("Erorr Editt chiled",err)
            })
        
        }


            const updateChiled =async (chld)=>{
                console.log("name deisi",chld.name,"name chiled",chld._id    )
                const token = await setItem.getItem('BS:Token');            
                api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
                const getMotherChieeld=await  api.post("/motherupdatechiledisease",{
                    name:chiled,
                    disease:selectDies
                }).then((res)=>{
                  return res.data
                })
                console.log("tets",getMotherChieeld)
                setOpen(!isopen)
                setOpen1(!isopen1)
        }

        const updatemotherdata=async(id)=>{
            console.log("test mother id",id)
            const location= await setItem.getItem('BS:Location') 
            const  existLocation=JSON.parse(location)
            if(existLocation===null){
                Alert.alert("تنبيه", "الرجاء تفعيل خدمة الموقع لكي نتمكن من خدمتك ")
                return;
          }
            console.log("LOCATIO",existLocation)
            
            const motherPhone= await setItem.getItem('BS:Phone');
            const  existPhone=JSON.parse(motherPhone)
            console.log("mother phone",existPhone)
            console.log("mother name",motherName)
            
            const response=await api.patch(`/updatemother/${id}`,{
                    name:motherName,
                    email:motherEmail,
                    gender:'female',
                   // phone:existPhone,
                    idcard:motherId,
                    location:{
                        "type": "Point",
                        "coordinates": [lat, lon] 
                    },
                        address:locationmother,
                        chiled:chieldList,
                        displayname:motherFamyly
                }).then((res)=>{
                    console.log("test  mother res",res.data)
                   Alert.alert("تنبيه","تم تحديث البيانات بشكل صحيح")
                     
                }).finally(()=> profileChick()).catch(err=>{
                    if(err.message==="Request failed with status code 500"){
                        setmsgerorr(!msgerorr)
                        msgerorr('الرجاد التواصل مع الدعم الفني')
                    }
                })
                if(response==='undefined'){
                    setmsgerorr(true)
                    setmsge('الرجاء التاكد من ادخال جميع المعلومات')
                }
                console.log("test response mother ",response)
    
        }
    
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 1 : 0
    return(
    <SafeAreaView  >
        <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                 keyboardVerticalOffset={keyboardVerticalOffset} enabled  >
     
            
        {loding? <InstagramLoader active />
        :
        <View style={{ backgroundColor:Colors.AminabackgroundColor,alignItems:'center',width:Metrics.WIDTH ,height:Metrics.HEIGHT
                    , paddingTop:Platform.OS==='android'?18:4}}> 
         
                   
                   
      
        <Box  flexDirection={'column'} w={Metrics.WIDTH *0.991} alignItems={'center'}   backgroundColor={Colors.AminabackgroundColor}>
        {/* <View style={{flexDirection:'row',justifyContent:'space-around',alignContent:'baseline',marginLeft:12,}}>
            
             <Text alignItems='
             flex-start' fontSize={18} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontWeight='400' ml={'2'} >الاسم الاول</Text>
        </View> */} 
        <Box   width={Metrics.WIDTH*0.9873 } height={Metrics.HEIGHT*0.02112} justifyContent={'flex-end'} mt={'1.5'}  flexDirection={'row'}
                 >
            {/* <TouchableOpacity onPress={()=>props.navigation.push("PaymentCardDisplay")}>
                <Image source={Images.bankcard} style={{width:50,height:50}} />
            </TouchableOpacity> */}
            
                                <IconButton icon={<Icon as={MaterialIcons} name="system-update-alt" />} borderRadius="full" _icon={{
                                    color:Colors.AminaPinkButton,
                                    size: "lg"
                                }} _hover={{
                                    bg: "orange.600:alpha.20"
                                }} _pressed={{
                                    bg: Colors.rmadytext,
                                    _icon: {
                                        name: "system-update-alt"
                                    },
                                    _ios: {
                                        _icon: {
                                            size: "2xl"
                                        }
                                    }
                                }} _ios={{
                                    _icon: {
                                        size: "2xl"
                                    }
                                }}_android={{
                                    _icon: {
                                        size: "2xl"
                                    }
                                }}  onPress={()=> updatemotherdata(motherData.mother._id)} />
                   
                </Box>
            <Box  w={Metrics.WIDTH *0.971} mr={'12'} flexDirection={'row'} margin={2} ml={'12'}>
                <Stack >
                    <Image source={Images.MainLogo1} resizeMode='cover'
                    style={{borderRadius:70 ,borderWidth:.2,borderColor:Colors.pinkystack,width:100,height:100 ,padding:2}}/>
                </Stack>
                <Stack flexDirection={'column'} alignContent={'space-around'} ml={'3'}>
                    <Stack flexDirection={'row'} alignItems={'center'} ml={'1.5'} mt={'2'} >
                        <Text>{motherName}</Text>
                        <Text>{motherFamyly}</Text>
                        
                    </Stack>
                    <Stack flexDirection={'row'} alignItems={'center'} ml={'1.5'} mt={'2'} >
                        <Text>{motherEmail}</Text>
                    </Stack>
                    <Stack  flexDirection={'row'} mt={'2'} w={'100%'} >
                    <Image source={Images.location} resizeMode='contain' style={{width:22,height:22,marginRight:3}} />
                        <TouchableOpacity style={{backgroundColor:Colors.ricePaper ,width:Metrics.WIDTH*0.322}}
                            onPress={()=>props.navigation.push("Mapscreen")}>
                            <Text   numberOfLines={1} flex={1} flexWrap={'wrap'}>{locationmother}</Text>
                        </TouchableOpacity>
                        
                        
                    </Stack>
                </Stack>
                
                
                
            </Box>
            <Box borderColor={Colors.rmadytext} borderWidth={1}   width={'80'} />
            
            <Box  width={Metrics.WIDTH*0.9143} flexDirection={'row'}   mt={2} ml={'2'} mr={2}  backgroundColor={Colors.AminabackgroundColor} >
                <Image source={Images.chiled} style={{width:33,height:26,marginRight:3,marginTop:10}} resizeMode='contain' />
                <Box    ml={'1'} backgroundColor={Colors.AminabackgroundColor} justifyContent={'space-around'}>
                    {chieldList.length>=1? <HStack   >
                    
                    {chieldList.map((chld)=>{    
                        return(
                            <Box backgroundColor={Colors.transparent} marginX={'1'} >
                                <Popover trigger={triggerProps => {
                                    return <Box  key={chld._id}   w={'auto'} flexDirection={'row'} borderColor={Colors.ricePaper} alignItems={'center'} borderWidth='.2' borderRadius={10}  mt={3}  h={Metrics.HEIGHT*0.0424} ml={2} mr={2}>
                                           <TouchableOpacity  key={chld._id} {...triggerProps} style={{flexDirection:'row' ,width:'auto',marginRight:2,marginLeft:2}} >
                                                <Stack flexDirection={'row'}>
                                                    <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontSize={fontPixel(15)} color={Colors.newTextClr} alignItems={'stretch'}> {chld.name} </Text>
                                                    {/* <Text fontSize={fontPixel(12)} color={Colors.newTextClr}  > {chld.age} -سنوات</Text> */}
                                                    {/* <Text  style={{fontSize:10,color:Colors.blacktxt,fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base ,marginLeft:4}} >- {chld.diseasses}</Text> */}
                                                </Stack>
                                            </TouchableOpacity>
                                            </Box> 
                                    }}>
                                    <Popover.Content accessibilityLabel="Delete Customerd" w='24'>
                                    <Popover.Arrow />
                                    <Popover.CloseButton />
                                    <Popover.Header fontSize={18} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} >ازالة من القائمة</Popover.Header>
                                    
                                    <Popover.Footer justifyContent='center'>
                                        <Button.Group space={1} alignItems={'center'}>
                                                <Stack flexDirection={'row'} alignItems={'center'}>
                                                    <EvilIcons name={"trash"} size={33} color={Colors.textZahry} onPress={()=>removeChiiled(chld.id,chld.name)}  style={{marginTop:1}}/>
                                                    {/* <EvilIcons name={"pencil"} size={30} color={Colors.bloodOrange} onPress={()=>updateChiled(chld)}  style={{marginTop:1}}/> */}
                                                </Stack>
                                        </Button.Group>
                                    </Popover.Footer>
                                    </Popover.Content>
                                </Popover>
                                 
                            </Box>
                            
                            
                            )
                            })}
                    </HStack>
                    :<Box> </Box>}
                </Box>
                    <TouchableOpacity onPress={()=>addChield()} style={{ marginLeft:22,alignItems:'center',justifyContent:'center'}}>
                        <Image source={Images.addchiled} resizeMode='contain' style={{height:33,width:33, }} />
                    </TouchableOpacity>
                </Box>
                <Box marginTop={'7'}>
                    <Box  w={widthPixel(343)} height={'20'} flexDirection={'column'}  alignItems='baseline' justifyContent={'center'} marginLeft={Platform.OS==='android'?3:4} marginBottom={Platform.OS==='android' ?2:2} >
                        <Stack>
                            <Text alignItems='flex-start' fontSize={18} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontWeight='400'   color={Colors.black} ml={'2'} >الاسم الاول</Text>
                        </Stack>  
                        <Stack space={4}   alignItems={'center'} >
                            <Input value={motherName}  onChangeText={(e)=>setmotherName(e)} variant='outline'  placeholder="الاسم الاول " color={Colors.blacktxt} 
                            fontSize={18} fontFamily={ Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base }   borderColor='#00ABB9'  borderWidth='1' style={{textAlign:'right'}} mt={2} height={Metrics.HEIGHT*0.0624} />
                        </Stack>
                    </Box>
                    <Box  w={widthPixel(343)} height={'20'} flexDirection={'column'}  alignItems='baseline' justifyContent={'center'} marginLeft={Platform.OS==='android'?5:4} marginBottom={Platform.OS==='android' ?2:2} >
                        <Stack>
                            <Text alignItems='flex-start' fontSize={18} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontWeight='400' ml={'2'} mt="2">اسم العائلة</Text> 
                        </Stack>
                        <Stack  space={4}   alignItems={'center'}>
                            <Input value={motherFamyly} onChangeText={(e)=>setmotherFamyly(e)} variant='outline'  placeholder="اسم العائلة " color={Colors.blacktxt} 
                                fontSize={18}  fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}  borderColor='#00ABB9'  borderWidth='1' style={{textAlign:'right'}} mt={2} height={Metrics.HEIGHT*0.0624} />
                        </Stack>
                    </Box>

                    <Box  w={widthPixel(343)} height={'20'} flexDirection={'column'}  alignItems='baseline' justifyContent={'center'} marginLeft={Platform.OS==='android'?5:4} marginBottom={Platform.OS==='android' ?2:2} >
                        <Stack>
                            <Text alignItems='flex-start' fontSize={18} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontWeight='400' ml={'2'}  mt="2">رقم الهوية</Text>
                        </Stack>
                        <Stack  space={4}   alignItems={'center'}>
                            <Input value={ (motherId).toString()}   maxLength={10} onChangeText={(e)=>setmotherId(e)} variant='outline'    color={Colors.blacktxt} 
                                fontSize={18}  fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}  borderColor='#00ABB9'  borderWidth='1' style={{textAlign:'right'}} mt={2} height={Metrics.HEIGHT*0.0624} />
                        </Stack>
                    </Box>
                    
                    <Box  w={widthPixel(343)} height={'20'} flexDirection={'column'}  alignItems='baseline' justifyContent={'center'} marginLeft={Platform.OS==='android'?5:4} marginBottom={Platform.OS==='android' ?2:2} >
                        <Stack>
                            <Text alignItems='flex-start' fontSize={18} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontWeight='400' ml={'2'}  mt="2">البريد الالكتروني</Text>
                        </Stack>
                        <Stack  space={4}   alignItems={'center'}>
                            <Input value={motherEmail }  onChangeText={(e)=>setmotherEmail(e)} variant='outline'   placeholder="البريد الالكتروني" color={Colors.blacktxt} 
                                fontSize={18}  fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}  borderColor='#00ABB9'  borderWidth='1' style={{textAlign:'right'}} mt={2} height={Metrics.HEIGHT*0.0624} />
                        </Stack>    
                    </Box>
                </Box>
        </Box>
       

        {msgerorr&&<View style={{ backgroundColor:Colors.bloodOrange, width:Metrics.WIDTH,height:Metrics.HEIGHT*0.0583,alignItems:'center',alignContent:'space-around',marginTop:8}}>
            <Text style={{color:Colors.error,fontSize:20}}>{msg}</Text>  
        </View> }

        
        <Center >

            <Modal isOpen={ShowModal} backgroundColor={Colors.AminabackgroundColor} onClose={() => setShowModal(false)}>
            <Modal.Content width={Metrics.WIDTH }  h={Metrics.HEIGHT*0.752}>
            <Modal.CloseButton padding={1} />
            <Modal.Header backgroundColor={Colors.AminaPinkButton}  alignItems={'center'}>
            <Heading fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}   color={'white'}>بيانات طفلك</Heading>
            </Modal.Header> 
            <Modal.Body alignItems={'center'} >
 
            <Stack flexDirection={"column"} alignItems='flex-start'  space={4} w="95%" padding={2}   >
                <Text style={{alignItems:"center",fontSize:12,fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base,
                            marginLeft:1}}>اسم الطفل</Text>
                <Input variant='outline' placeholder="اسم الطفل" onChangeText={(e)=>setChiled(e)}  borderColor='#00ABB9'  borderWidth='1'  style={{textAlign:'right'}}
                        fontSize={12} w={Metrics.WIDTH*0.754}   />

                <HStack flexDirection={'row'} justifyContent='space-between'   w={Metrics.WIDTH*0.824}>
                    <Box alignItems={'flex-start'}  w={Metrics.WIDTH*0.324}  >
                        <Text style={{alignItems:"center",fontSize:15,fontFamily:Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base,fontWeight:'400',marginLeft:1}}> العمر</Text>
                        <Input variant='outline' placeholder="العمر"  onChangeText={(e)=>setAge(e)}   borderColor='#00ABB9'  borderWidth='1' style={{textAlign:'right'}}
                                fontSize={18} />
                    </Box>
                    
                    <Box alignItems={'flex-start'}  w={Metrics.WIDTH*0.324}   >
                        <Text style={{alignItems:"center",fontSize:12,fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base,
                        fontWeight:'400',marginLeft:1}}>الجنس</Text>    
                        <Select selectedValue={gender===null?"":null}  accessibilityLabel="الجنس" placeholder="الجنس" defaultValue="ذكر"
                                    _selectedItem={{
                                        bg: "gray.200", endIcon: <CheckIcon size="5" />}}
                                    w={Metrics.WIDTH*0.246}  
                                    borderColor='#00ABB9'  borderWidth='1'
                                    variant='outline' fontSize={18} 
                                    onValueChange= {itemValue => setgender(itemValue)} textAlign={"center"}
                                    >  
                                    <Select.Item label="ذكر" value="ذكر" />
                                    <Select.Item label="انثى" value="انثى" />
                        </Select>
                    </Box>
                </HStack>

                <Stack Stack direction={{ base: "column",md: "row"}} space='4'   >
                            <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={selectDies} 
                                
                                onChange={nextValue => {
                            setSelectdies(nextValue) 
                                    }}>
                                    {desise.map((ds)=>{ 
                                    return( <Radio fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} key={ds._id} value={ds.name}  >{ds.name}</Radio>)
                                    
                                    })}
                            
                            
                            </Radio.Group>
                </Stack>
            </Stack>
            
             </Modal.Body>
            
             <Modal.Footer alignItems={'flex-start'}>
                {chieldList.length>=1? <HStack   flexDirection={'row'} justifyContent='space-around' flexWrap='wrap'   alignItems='center'  width={Metrics.WIDTH*0.8973}  >
                   {chieldList.map((chld)=>{ 
                    return(
                        <Box  key={chld.id} borderColor={Colors.AminaPinkButton}  alignItems={'center'} borderWidth='1' borderRadius={'lg'}  flexDirection={'row'} w={'auto'} p={1} >
                            <EvilIcons name={"trash"} size={18} color={Colors.blacktxt} onPress={()=>removeChiiled(chld.id,chld.name)}  style={{marginTop:3,marginBottom:3}}/>
                                    {/* <EvilIcons name={"close"} size={18} color={Colors.skyblue} onPress={()=>console.log(chld)}  style={{marginTop:3}}/> */}
                            <Text fontSize={12} color={Colors.newTextClr} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base }
                                 > {chld.name} </Text>
                        </Box> )
                        })}
                </HStack>:null}
                
                <Stack alignItems={'center'}   w={"100%"} p='2' mt={2}> 
                    <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base ,fontSize:15 ,fontWeight:'400',textAlign:'center',color:Colors.textZahry} } >
                                    الرجاء الحرص على ادخال بيانات طفلك بشكل دقيق </Text>
                    {chiieldAcount >=1 ? <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base ,fontSize:15 ,fontWeight:'400',textAlign:'center' ,marginTop:2} } >
                            عدد الاطفال المسجلين  مسبقا {chiieldAcount} </Text>:null}
                </Stack>
                <Box alignItems={'center'} w={Metrics.WIDTH*0.834} ml='3' mr='4' mt={5} rounded='lg'>
                    <CustomButton
                        buttonColor={Colors.AminaPinkButton}
                        title=" اضف الطفل"
                        buttonStyle={{width: '88%', alignSelf: 'center',borderRadius:15}}
                        textStyle={{fontSize: 20}}
                        onPress={() =>   addChield2()  }
                    />
                     
                </Box> 
            </Modal.Footer>
            </Modal.Content>
            </Modal>
    </Center>
</View>}        
   
    </KeyboardAvoidingView>
    </SafeAreaView>
    )

}

export default Motherprofilw;