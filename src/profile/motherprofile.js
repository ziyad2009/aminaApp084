import React, { useState, useEffect,useContext } from 'react';
import {View, SafeAreaView,Alert,FlatList, Platform,KeyboardAvoidingView,Image,TouchableOpacity} from 'react-native'
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
    const[selectButton,setselectButtons]=useState(0)
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
            console.log("tatse add chld",res.data)
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

        const childernSelctinfo=(val,indx)=>{
            setSelectdies(val)
            setselectButtons(indx)
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
    <SafeAreaView >
        <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                 keyboardVerticalOffset={keyboardVerticalOffset} enabled  >
     
            
        {loding? <InstagramLoader active />
        :
        <View style={{ backgroundColor:Colors.AminabackgroundColor,alignItems:'center',width:Metrics.WIDTH ,height:Metrics.HEIGHT
                    , paddingTop:Platform.OS==='android'?18:4}}> 
        <Box  flexDirection={'column'} w={Metrics.WIDTH *0.991} alignItems={'center'}   backgroundColor={Colors.AminabackgroundColor}>
         
         
            <Box  w={Metrics.WIDTH *0.771} mr={'12'} flexDirection={'row'} margin={2} ml={'12'} backgroundColor={'white'} borderRadius={'3xl'} alignItems={'center'}>
                <Stack ml={'2'} >
                    <Image source={Images.MainLogo1} resizeMode='contain'
                    style={{borderRadius:70 ,borderWidth:.2,borderColor:Colors.pinkystack,width:77,height:77 ,padding:2}}/>
                </Stack>
                <Stack flexDirection={'column'} alignContent={'space-around'} ml={'3'}>
                    <Stack flexDirection={'row'} alignItems={'center'} ml={'1.5'} mt={'2'} >
                        <Text>{motherName}</Text>
                        <Text>{motherFamyly}</Text>
                    </Stack>
                    <Stack flexDirection={'row'} alignItems={'center'} ml={'1.5'} mt={'2'} >
                        <Text>{motherEmail}</Text>
                    </Stack>
                    
                </Stack>
                
                
                
            </Box>
            
            <Box marginTop={'7'}>

                                <Box flexDirection={'row'} marginLeft={Platform.OS === 'android' ? 3 : 4} marginBottom={Platform.OS === 'android' ? 2 : 2} justifyContent={'space-around'} >
                                    <Stack width={widthPixel(150)} height={'20'} alignItems={'center'}>
                                        <Text alignItems='flex-start' fontSize={18} fontFamily={Platform.OS === 'android' ? Fonts.type.aminafonts : Fonts.type.base} fontWeight='400' color={Colors.black}   >الاسم الاول</Text>
                                        <Input value={motherName} onChangeText={(e) => setmotherName(e)} variant='outline' placeholder="الاسم الاول " color={Colors.blacktxt} borderRadius={'2xl'}
                                            fontSize={18} fontFamily={Platform.OS === 'android' ? Fonts.type.aminafonts : Fonts.type.base} borderColor={Colors.veryLightGray} backgroundColor={"rgba(243, 243, 243, 1)"} borderWidth='1' style={{ textAlign: 'right' }} mt={2} />
                                    </Stack>
                                    <Stack width={widthPixel(150)} height={'20'} alignItems={'center'}>
                                        <Text alignItems='flex-start' fontSize={18} fontFamily={Platform.OS === 'android' ? Fonts.type.aminafonts : Fonts.type.base} fontWeight='400' >اسم العائلة</Text>
                                        <Input value={motherFamyly} onChangeText={(e) => setmotherFamyly(e)} variant='outline' placeholder="اسم العائلة " color={Colors.blacktxt} borderRadius={'2xl'}
                                            fontSize={18} fontFamily={Platform.OS === 'android' ? Fonts.type.aminafonts : Fonts.type.base} borderColor={Colors.veryLightGray} backgroundColor={"rgba(243, 243, 243, 1)"} borderWidth='1' style={{ textAlign: 'right' }} mt={2} />
                                    </Stack>
                                </Box>

                                <Box width={widthPixel(343)} height={'20'} flexDirection={'column'} alignItems='baseline' justifyContent={'center'} marginLeft={Platform.OS === 'android' ? 5 : 4} marginBottom={Platform.OS === 'android' ? 2 : 2} mt={'3'} >
                                    <Stack>
                                        <Text alignItems='flex-start' fontSize={18} fontFamily={Platform.OS === 'android' ? Fonts.type.aminafonts : Fonts.type.base} fontWeight='400' ml={'2'} mt="2">رقم الهوية</Text>
                                    </Stack>
                                    <Stack space={4} alignItems={'center'}>
                                        <Input value={(motherId).toString()} maxLength={10} onChangeText={(e) => setmotherId(e)} variant='outline' color={Colors.blacktxt} backgroundColor={"rgba(243, 243, 243, 1)"}
                                            fontSize={18} fontFamily={Platform.OS === 'android' ? Fonts.type.aminafonts : Fonts.type.base} borderColor={Colors.veryLightGray} borderWidth='1' borderRadius={'lg'} style={{ textAlign: 'right' }} mt={2} height={Metrics.HEIGHT * 0.0624} />
                                    </Stack>
                                </Box>

                                <Box width={widthPixel(343)} height={'20'} flexDirection={'column'} alignItems='baseline' justifyContent={'center'} marginLeft={Platform.OS === 'android' ? 5 : 4} marginBottom={Platform.OS === 'android' ? 2 : 2} mt={'3'} >
                                    <Stack>
                                        <Text alignItems='flex-start' fontSize={18} fontFamily={Platform.OS === 'android' ? Fonts.type.aminafonts : Fonts.type.base} fontWeight='400' ml={'2'} mt="2">البريد الالكتروني</Text>
                                    </Stack>
                                    <Stack space={4} alignItems={'center'}>
                                        <Input value={motherEmail} onChangeText={(e) => setmotherEmail(e)} variant='outline' placeholder="البريد الالكتروني" color={Colors.blacktxt} backgroundColor={"rgba(243, 243, 243, 1)"}
                                            fontSize={18} fontFamily={Platform.OS === 'android' ? Fonts.type.aminafonts : Fonts.type.base} borderColor={Colors.veryLightGray} borderWidth='1' borderRadius={'lg'} style={{ textAlign: 'right' }} mt={2} height={Metrics.HEIGHT * 0.0624} />
                                    </Stack>
                                </Box>
                            </Box>
        </Box>
        <Box alignItems={'flex-start'}  flexDirection={'column'} width={widthPixel(343)}   mt={'3'} ml={'3'}>
            <Stack >
                <Text fontSize={18} fontFamily={Platform.OS === 'android' ? Fonts.type.aminafonts : Fonts.type.base}  fontWeight={Platform.OS==="android"?"400":"400"}  color={'black'}>الموقع</Text>
            </Stack>
             <Stack backgroundColor={"rgba(243, 243, 243, 1)"} flexDirection={'row'} mt={'2'} width={'72'}  >
                <Text numberOfLines={1}   color={'black'} flexWrap={'wrap'}  padding={'2'}>{locationmother}</Text>
                     
                    <TouchableOpacity style={{backgroundColor:Colors.blacktxt ,width:Metrics.WIDTH*0.1822,borderRadius:22,alignItems:'center',justifyContent:'center'}}
                            onPress={()=>props.navigation.push("Mapscreen")}>
                            <Text fontSize={18} fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} color={"white"}>تغيير</Text>
                     </TouchableOpacity>
            </Stack>
        </Box>
        <Box  width={widthPixel(343)} flexDirection={'row'}   mt={2} ml={'2'} mr={2}  backgroundColor={Colors.AminabackgroundColor} >
                
                <Box    ml={'1'}  backgroundColor={"rgba(243, 243, 243, 1)"} justifyContent={'space-around'} borderRadius={'lg'} mt={'2'} width={'72'} >
                    {chieldList.length>=1? <HStack   >
                    
                    {chieldList.map((chld)=>{    
                        return(
                            <Box backgroundColor={Colors.transparent} marginX={'1'} >
                                <Popover trigger={triggerProps => {
                                    return <Box  key={chld._id}   w={'auto'} flexDirection={'row'} borderColor={Colors.ricePaper} alignItems={'center'} borderWidth='.2' borderRadius={10}  mt={3}  h={Metrics.HEIGHT*0.0424} ml={2} mr={2}>
                                           <TouchableOpacity  key={chld._id} {...triggerProps} style={{flexDirection:'row' ,width:'auto',marginRight:2,marginLeft:2}} >
                                                <Stack flexDirection={'row'}>
                                                    <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontSize={fontPixel(15)} color={Colors.newTextClr}  > {chld.name} </Text>
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
                    
                    <TouchableOpacity style={{backgroundColor:Colors.AminaButtonNew ,width:Metrics.WIDTH*0.1822,borderRadius:22,alignItems:'center',justifyContent:'center'}}
                            onPress={()=>addChield() }  >
                            <Text fontSize={18} fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} color={"white"}>تغيير</Text>
                     </TouchableOpacity>
            
            </Box>
       

        {msgerorr&&<View style={{ backgroundColor:Colors.bloodOrange, width:Metrics.WIDTH,height:Metrics.HEIGHT*0.0583,alignItems:'center',alignContent:'space-around',marginTop:8}}>
            <Text style={{color:Colors.error,fontSize:20}}>{msg}</Text>  
        </View> }
        
        <Box  alignItems={'center'} mt={'12'}>
            <TouchableOpacity onPress={()=>updatemotherdata(motherData.mother._id) } style={{backgroundColor:"rgba(243, 243, 243, 1)", width:Metrics.WIDTH*0.7362,height:Metrics.HEIGHT*0.0583, alignItems:'center',justifyContent:'center',borderRadius:22}}>
                <Text fontSize={18} fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold}fontWeight={'700'}  color={Colors.AminaButtonNew}>تحديث البيانات</Text>
            </TouchableOpacity>
        </Box>
        
        <Center >

            <Modal isOpen={ShowModal} backgroundColor={Colors.transparent} onClose={() => setShowModal(false)} >
            <Modal.Content width={Metrics.WIDTH } height={Metrics.HEIGHT }>
             
            <Modal.Header backgroundColor={Colors.AminaPinkButton}  alignItems={'center'}>
            <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold}  fontWeight={Platform.OS==='android'?"600":"700"} color={'white'} fontSize={22}>بيانات طفلك</Text>
            </Modal.Header> 
            <Modal.Body alignItems={'center'} >
 
            <Stack flexDirection={"column"} alignItems='flex-start'  space={4} w="95%" padding={2}   >
                <Text style={{alignItems:"center",fontSize:12,fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base,
                            marginLeft:1}}>اسم الطفل</Text>
                <Input variant='outline' placeholder="اسم الطفل" onChangeText={(e)=>setChiled(e)}  borderColor={Colors.veryLightGray}  borderWidth='1'  style={{textAlign:'right'}}
                        fontSize={12} w={Metrics.WIDTH*0.754} borderRadius={'lg'} backgroundColor={"rgba(243, 243, 243, 2)"}  />

                <HStack flexDirection={'row'} justifyContent='space-between'   w={Metrics.WIDTH*0.824}>
                    <Box alignItems={'flex-start'}  w={Metrics.WIDTH*0.324}   >
                        <Text style={{alignItems:"center",fontSize:15,fontFamily:Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base,fontWeight:'400',marginLeft:1}}> العمر</Text>
                        <Input variant='outline' placeholder="العمر"  onChangeText={(e)=>setAge(e)} borderRadius={'lg'} backgroundColor={"rgba(243, 243, 243, 2)"}   borderColor={Colors.veryLightGray}  borderWidth='1' style={{textAlign:'right'}}
                                fontSize={18} />
                    </Box>
                    
                    <Box alignItems={'flex-start'}  w={Metrics.WIDTH*0.324}   >
                        <Text style={{alignItems:"center",fontSize:12,fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base,
                        fontWeight:'400',marginLeft:1}}>الجنس</Text>    
                        <Select selectedValue={gender===null?"":null}  accessibilityLabel="الجنس" placeholder="الجنس" defaultValue="ذكر"
                                    _selectedItem={{
                                        bg: "gray.200", endIcon: <CheckIcon size="5" />}}
                                    w={Metrics.WIDTH*0.246}  
                                    borderColor={Colors.veryLightGray } borderWidth='1'
                                    borderRadius={'lg'}
                                    backgroundColor={"rgba(243, 243, 243, 2)"}
                                    variant='outline' fontSize={18} 
                                    onValueChange= {itemValue => setgender(itemValue)} textAlign={"center"}
                                    >  
                                    <Select.Item label="ذكر" value="ذكر" />
                                    <Select.Item label="انثى" value="انثى" />
                        </Select>
                    </Box>
                </HStack>
                <Box   height={'24'}>
                    <FlatList 
                        data={desise}
                        numColumns={2}
                        renderItem={({ item,index}) => 
                        <TouchableOpacity key={item._id} onPress={()=>childernSelctinfo(item.name,index) } style={{width:Metrics.WIDTH*0.3713,height:Metrics.HEIGHT*.04421,backgroundColor:index===selectButton? Colors.amin1Button1:"rgba(243, 243, 243, 1)",borderRadius:22,alignItems:'center',justifyContent:'center',margin:5,padding:2}}>
                            <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} color={index===selectButton?'white':"rgba(0, 171, 185, 1)"} fontSize={'md'} alignSelf={'center'} >{item.name}</Text>
                        </TouchableOpacity>}
                        keyExtractor={(item, index) => item + index}
                    />
                </Box>
            </Stack>
            <Box>
                {chieldList.length>=1? 
                <Box   flexDirection={'column'}  alignItems='center'    width={Metrics.WIDTH}  >
                   {chieldList.map((chld)=>{ 
                    return(
                        <Box  key={chld.id} alignItems={'center'}   flexDirection={'row'} backgroundColor={"rgba(243, 243, 243, 1)"} borderRadius={'lg'} mt={'2'} width={'56'} >
                             <Stack backgroundColor={"rgba(243, 243, 243, 1)"} width={'48'} alignItems={'flex-start'} borderLeftRadius={'2xl'} >
                                <Text fontSize={18} color={Colors.textZahry} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base } padding={'2'}
                                 > {chld.name} </Text>
                             </Stack>
                            
                            <TouchableOpacity key={chld._id} onPress={()=>removeChiiled(chld.id,chld.name) } style={{width:Metrics.WIDTH*0.1713,height:Metrics.HEIGHT*.04421,backgroundColor:"rgba(244, 128, 147, 1)",borderRadius:22,alignItems:'center',justifyContent:'center',padding:2}}>
                                <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} color={'white'} fontSize={'md'} alignSelf={'center'} letterSpacing={1.5}>حذف</Text>
                             </TouchableOpacity>
                           
                        </Box> )
                        })}
                </Box>:null}
            </Box>
            
             </Modal.Body>
            
             <Modal.Footer alignItems={'flex-start'}>
               
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



// <IconButton icon={<Icon as={MaterialIcons} name="system-update-alt" />} borderRadius="full" _icon={{
//                                     color:Colors.AminaPinkButton,
//                                     size: "lg"
//                                 }} _hover={{
//                                     bg: "orange.600:alpha.20"
//                                 }} _pressed={{
//                                     bg: Colors.rmadytext,
//                                     _icon: {
//                                         name: "system-update-alt"
//                                     },
//                                     _ios: {
//                                         _icon: {
//                                             size: "2xl"
//                                         }
//                                     }
//                                 }} _ios={{
//                                     _icon: {
//                                         size: "2xl"
//                                     }
//                                 }}_android={{
//                                     _icon: {
//                                         size: "2xl"
//                                     }
//                                 }}  onPress={()=> updatemotherdata(motherData.mother._id)} />
                   