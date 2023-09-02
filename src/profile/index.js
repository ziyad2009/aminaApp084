import React, { useState, useEffect,useContext } from 'react';
import {View,SafeAreaView, Alert,ScrollView, Platform,KeyboardAvoidingView} from 'react-native'
import {Stack,Text,Input,Button,Select,CheckIcon,Spinner,HStack,Heading, Box,Modal,Center,Radio, VStack} from 'native-base'
import styles from './styles'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import api from '../services/api';
import setItem from '../services/storage'
import{Metrics,Colors,Fonts,fontPixel,widthPixel,heightPixel,pixelSizeHorizontal,pixelSizeVertical} from '../assets/Themes/'
import { UserContext } from '../services/UserContext';
import CustomButton from '../services/buttons/buttton';
import { FacebookLoader, InstagramLoader } from 'react-native-easy-content-loader';
import AnimatedLoader from "react-native-animated-loader";
const Profile=(props)=>{
   
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
    const[visible,setvisible]=useState(false)
    const{sethome,ErorrMessage,errmsg}=useContext(UserContext)
    let alllrets=true
    
    // const motherdata=[
    //     {
    //         "name":motherName,
    //         "gender":'female',
    //         "location":{
    //             "type": "Point",
    //              "coordinates": [24.515947160933145, 39.5480408585706] 
    //          },
     //            "address":""
    //     }
    // ]

    useEffect(async()=>{
        profileChick()
         alldesise()
        allchiled()
         

        const location= await setItem.getItem('BS:Location') 
        if (!location){
            console.log("cant get loccation")
            setlocation('عنوان المنزل')
        }else{
          const  existLocation=JSON.parse(location)
          setlocation(existLocation.formatted)
          setlat(existLocation.lat)
          setlon(existLocation.lon)
        }
      
        
    },[])
    
    const allchiled=()=>{
        api.get("/mother/childe").then((chld)=>{
            
            const data=Object.entries(chld.data)
            setchiieldAcount(data.length)
            console.log("cheild acount",data.length)
            //from get is object not array
        })
    }
    const alldesise= async()=>{
        const token = await setItem.getItem('BS:Token');
        api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
        api.get("/mother/diseases").then((des)=>{
            console.log("Desisess",des.data)
            setDesise(des.data)
        })

    }
    useEffect(  () => {
        const unsubscribe = props.navigation.addListener('focus',async () => {
            console.log("test event")
            const location= await setItem.getItem('BS:Location') 
            console.log("test Location first time ")
            if (!location){
                setlocation('عنوان المنزل')
              console.log("no location")

            }else{
              const  existLocation=JSON.parse(location)
              setlocation(existLocation.formatted)
              setlat(existLocation.lat)
              setlon(existLocation.lon)
              console.log("Mo location",existLocation)
            }
        });
    
        return unsubscribe;
      }, []);


    const profileChick=async()=>{
        console.log("start chick profiles")
        setvisible(true)
        const token = await setItem.getItem('BS:Token'); 
        const location= await setItem.getItem('BS:Location') 
        const  existLocation=JSON.parse(location)
        if(existLocation===null){
            //  Alert.alert("تنبيه", " لخدمة افضل الرجاء تحديد العنوان من مربع العنوان ")
            console.log("no location exist?")
        }
        

        api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
       const response= await api.get("/mothers/me").then((res)=>{
        console.log("loading MOTHER DATA finsh",res.data)
           return res
        })
        // .catch((err)=>{
        //     console.log("Erorr from mother/me",err.message)
        //     if(err.message==='Request failed with status code 404'){
        //         Alert.alert("تنبيه","يجب عليكي ادخال البينات الخاصه بك ")
        //     } 
        // })
        
        
        if (response.status===undefined){
              console.log("test Res is undefined++",)
              setLoding(true)
             return;
         }
         if(response.data.message==="mother is not exist!"){
            console.log("mother is not regester")
            setLoding(true)
            return;
         }
        if (response.status===401){
              console.log("test Res status",response.status)
              setLoding(true)
              return;
        }
        
        if (response.status===201){
            console.log("mother Profile Ok==***=",response.mother)
           
        setTimeout(() => {
            console.log("mother Profile Goo ===")
            setvisible(false)
            setLoding(false)
            sethome(true)
           
        },2000);

            
      }

        console.log("test mother profile  Response",response.data)
     }

    const addMother=async()=>{
        console.log("START ADD MOTTHER")
        setmsgerorr(!msgerorr)
        const token = await setItem.getItem('BS:Token');            
        const location= await setItem.getItem('BS:Location') 
        const  existLocation=JSON.parse(location)
         console.log("test location3 ",existLocation.lat,"$$",existLocation.lon)
        if(existLocation===null){
               return   Alert.alert("تنبيه", "الرجاء تفعيل خدمة الموقع واتحديد عنوانك من مربع العنوان ")
        }
        console.log("LOCATIO",(existLocation.address_line1).toString())
        
        const motherPhone= await setItem.getItem('BS:Phone');
        const MOTPhone=JSON.parse(motherPhone)
        if(MOTPhone===null){
            return   Alert.alert("تنبيه", "رقم الجوال غير مدخل")
              
         }
        console.log("mother phone",MOTPhone)
        const existPhone= Number(MOTPhone)
        const sex="female"
        //const IDCARD=Number(motherId)
        const IDCARD=Number(motherId)
        // const dadt=[
        //     {name:motherName,
        //     email:motherEmail,
        //     gender:'female',
        //     phone:existPhone,
        //     idcard:IDCARD,}
        // ]
        // console.log("mothrl",dadt)
        // console.log("mother name",motherName)
        
        // if (motherName.length<1 || motherEmail.length<1 || existPhone.length<1 ||motherFamyly.length<1 ){
        //     return Alert.alert("آمينة","يجب عليك تعبئة الحقول")
        // }
       
        api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
        //api.defaults.headers.Authorization =(`Bearer ${tttoken}`);
       // console.log("Token= ",JSON.parse(token) )
        const response=await api.post('/creatmother',{
                name:motherName,
                email:motherEmail,
                gender:sex,
                phone:existPhone,
                idcard:IDCARD,
                location:{coordinates:[lat, lon],"type":"Point"},
                // location:{
                //     "type": "Point",
                //     "coordinates": [lat, lon] 
                // },
                    address:locationmother,
                    chiled:chieldList,
                    displayname:motherFamyly
            }).then((res)=>{
                console.log("test  mother res",res.data)
                return res.data
               // sethome(true)
                 
            }).catch(err=>{
                console.log("Erorr from add mother ",err)
                if(err.message==="Request failed with status code 500"){
                    setmsgerorr(!msgerorr)
                    setmsge('الرجاءالتاكد من المدخلات بشكل صحيح')
                }
            })
           
            if(response==='undefined'){
                setmsgerorr(true)
                setmsge('الرجاء التاكد من ادخال جميع المعلومات')
            }else if(response){
                console.log("test response mother ",response)
                sethome(true)
            }
           
          

    }
    
     
    const addChield=  ()=>{
        console.log("test ")
        setShowModal(!ShowModal)
    }

    const addChield2= async()=>{

    if(chiled===null || age==="" || gender===null  ){
         Alert.alert("تنبيه","الرجاء التاكد من ادخال الاسم والعمر والجنس للطفل")
        return;
    }

    setShowModal(!ShowModal)
    const token = await setItem.getItem('BS:Token');
    const newData={id:Number(Math.floor(Math.random() * 1000)), chiled,age,gender,selectDies}
    //update state in  app
    setChiledLest (oldarray=>[...oldarray,newData]) 
    api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
    const getMotherChieeld=await  api.post("/mother/addchilde",{
     id:(newData.id).toString(),
      name:chiled,
      age:age,
      gender:gender,
      diseasses:selectDies
  }).then((res)=>{
    return res.data
  }).catch((err)=>{
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
   
    const newArray=chieldList.filter((item)=>{
        return item.id != val
            })

   setChiledLest(newArray)

    api.delete(`chailedbynamedelete/${name}`).then((res)=>{
    console.log("tes remove chiled",res.data)
    })

}
    const updateChiledDeusess=async (val)=>{
        console.log("name deisi",selectDies,"name chiled",selcChiled    )

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
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 1 : 0
return(
    <SafeAreaView  >
    <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
             keyboardVerticalOffset={keyboardVerticalOffset} enabled  >
    <ScrollView  contentContainerStyle={{backgroundColor:Colors.AminabackgroundColor,width:Metrics.WIDTH,height:Metrics.HEIGHT }}   >
        
    
    
        <View  style={{ backgroundColor:Colors.transparent,flexDirection:'column',width:Metrics.WIDTH,marginRight:Platform.OS==="android"?1:4,marginTop:Metrics.HEIGHT*0.1117}}> 
            { loding ?
                <HStack  flexDirection={'column'} backgroundColor='white'    alignItems={'center'} justifyContent='center' ml={1} mr={1}>
                    <Box  w={widthPixel(Platform.OS==='android'?343:343)} height={'20'} flexDirection={'column'}  alignItems='baseline' justifyContent={'center'} marginLeft={Platform.OS==='android'?5:4} marginBottom={Platform.OS==='android' ?2:2} >
                        <Stack>
                            <Text alignItems='flex-start' fontSize={fontPixel(18) } fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.type.base} fontWeight='400'   color={Colors.black} ml={'2'} >الاسم الاول</Text>
                        </Stack>  
                        <Stack space={4}   alignItems={'center'} >
                            <Input value={motherName}  onChangeText={(e)=>setmotherName(e)} variant='outline'  placeholder="الاسم الاول " color={Colors.blacktxt} 
                            fontSize={fontPixel(18) } fontFamily={ Platform.OS==='android'?Fonts.type.regular:Fonts.type.base }   borderColor='#00ABB9'  borderWidth='1' style={{textAlign:'right'}} mt={2} height={Metrics.HEIGHT*0.0624} />
                        </Stack>
                    </Box>

                    <Box  w={widthPixel(Platform.OS==='android'?343:343)} height={'20'} flexDirection={'column'}  alignItems='baseline' justifyContent={'center'} marginLeft={Platform.OS==='android'?5:4} marginBottom={Platform.OS==='android' ?2:2} >
                        <Stack>
                            <Text alignItems='flex-start' fontSize={fontPixel(18) } fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.type.base} fontWeight='400' ml={'2'} mt="2">اسم العائلة</Text> 
                        </Stack>
                        <Stack  space={4}   alignItems={'center'}>
                            <Input value={motherFamyly} onChangeText={(e)=>setmotherFamyly(e)} variant='outline'  placeholder="اسم العائلة " color={Colors.blacktxt} 
                                fontSize={fontPixel(18) }  fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.type.base}  borderColor='#00ABB9'  borderWidth='1' style={{textAlign:'right'}} mt={2} height={Metrics.HEIGHT*0.0624} />
                        </Stack>
                    </Box>

                    <Box  w={widthPixel(Platform.OS==='android'?343:343)} height={'20'} flexDirection={'column'}  alignItems='baseline' justifyContent={'center'} marginLeft={Platform.OS==='android'?5:4} marginBottom={Platform.OS==='android' ?2:2} >
                        <Stack>
                            <Text alignItems='flex-start' fontSize={fontPixel(18) } fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.type.base} fontWeight='400' ml={'2'}  mt="2">رقم الهوية</Text>
                        </Stack>
                        <Stack  space={4}   alignItems={'center'}>
                            <Input value={motherId} placeholder="1xxxxxxxxx"  type='text'  maxLength={10} onChangeText={(e)=>setmotherId(e)} variant='outline'    color={Colors.blacktxt} 
                                fontSize={fontPixel(18) }  fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.type.base}  borderColor='#00ABB9'  borderWidth='1' style={{textAlign:'right'}} mt={2} height={Metrics.HEIGHT*0.0624} />
                        </Stack>
                    </Box>

                    <Box  w={widthPixel(Platform.OS==='android'?343:343)} height={'20'} flexDirection={'column'}  alignItems='baseline' justifyContent={'center'} marginLeft={Platform.OS==='android'?5:4} marginBottom={Platform.OS==='android' ?2:2} >
                        <Stack>
                            <Text alignItems='flex-start' fontSize={fontPixel(18) } fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.type.base} fontWeight='400' ml={'2'}  mt="2">العنوان</Text>
                        </Stack>
                        <Stack  space={4}   alignItems={'center'}>
                            <Input value={locationmother} onPressIn={()=>props.navigation.push("Mapscreen")}
                                variant='outline'    color={Colors.blacktxt} 
                                placeholder="ادخل العنوان"  fontSize={fontPixel(18) }  fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.type.base}
                                borderColor='#00ABB9'  borderWidth='1' style={{textAlign:'right'}} mt={2} height={Metrics.HEIGHT*0.0624} />
                        </Stack>
                    </Box>
                    <Box  w={widthPixel(Platform.OS==='android'?343:343)} height={'20'} flexDirection={'column'}  alignItems='baseline' justifyContent={'center'} marginLeft={Platform.OS==='android'?5:4} marginBottom={Platform.OS==='android' ?2:2} >
                <Stack>
                    <Text alignItems='flex-start' fontSize={fontPixel(18) } fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.regular} fontWeight='400' ml={'2'}  mt="2">البريد الالكتروني</Text>
                </Stack>
                <Stack  space={4}   alignItems={'center'}>
                    <Input value={motherEmail }  onChangeText={(e)=>setmotherEmail(e)} variant='outline'   placeholder="البريد الالكتروني" color={Colors.blacktxt} 
                        fontSize={fontPixel(18) }  fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.type.base}  borderColor='#00ABB9'  borderWidth='1' style={{textAlign:'right'}} mt={2} height={Metrics.HEIGHT*0.0624} />
                </Stack>
            </Box>
            
            <Box  alignItems={"center"} justifyContent='center' padding={2} marginTop={'3'} backgroundColor={Colors.transparent}    > 
                    <HStack flexDirection={'row'} space={3} justifyContent='space-around' w={"37%"}>
                        <Text alignItems="center" fontSize={20} fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.base} fontWeight='400'  color={Colors.black} >اضف طفلك</Text>
                        <EvilIcons name={"plus"} size={35} color='#f38193' onPress={()=>addChield()}/>
                    </HStack>

                </Box>
                </HStack>
                : 
                <Box   alignItems='center'>
                    <AnimatedLoader
                    visible={visible} 
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require("./loadingdoots.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                >
                    <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base,fontSize:10,color:Colors.textZahry}} >جاري التوجيه للصفحة الرئيسيه...</Text>
                </AnimatedLoader>
                </Box>
               }
        </View>
      
         {/*end inputs */}  


        
        {msgerorr&&
        <View style={{width:Metrics.WIDTH,alignItems:'center',alignContent:'space-around',marginTop:1}}>
        <Text fontSize={18} color='error.500' fontFamily={Platform.OS==='android'? Fonts.type.regular:Fonts.type.base}>{msg}</Text>  
        </View>  
        }
         
        
        <View style={{backgroundColor:Colors.transparent,
             marginTop:Platform.OS==='android'?1:1,justifyContent:'center',alignItems:'center',
            position:Platform.OS==='android'?'relative':'relative',bottom:Platform.OS==='android'?2:22}}>
           { loding ?
                    <View style={{ width:Metrics.WIDTH,alignItems:'center',justifyContent:'center' ,marginTop:10}}>
                    {/* <Button bgColor={Colors.amin1Button1} size={'lg'} onPress={() => 
                    addMother() }>اكمال التسجيل</Button> */}
                    
                    < CustomButton
                    buttonColor={Colors.AminaPinkButton}
                    titleColor={Colors.white}
                    title="اكمال التسجيل"
                    buttonStyle={{width:"88%", alignSelf: 'center',borderRadius:15 ,marginLeft:16}}
                    textStyle={{fontSize: 20}}
                    onPress={() => addMother()}
                    />
                    
                </View>
            
            :<Box/>
                    
            //  <Box  backgroundColor={'amber.100'} justifyContent="center" alignItems={'center'} h={'40'} width={"100%"}  mt={'1'}   > 
            //     <Spinner accessibilityLabel="Loading posts"  color={Colors.greys} size={'lg'}/>
            //     <Text color={Colors.textZahry} fontFamily={Platform.OS==='android'? Fonts.type.medium:Fonts.type.medium} fontSize={fontPixel(22)}  mt={'5'} >
            //          جاري التوجيه الى الصفحة الرئيسية
            //     </Text>
            //      <AnimatedLoader
            //         visible={visible}
            //         overlayColor="rgba(255,255,255,0.75)"
            //         source={require("./loader.json")}
            //         animationStyle={styles.lottie}
            //         speed={1}
            //     >
            //         <Text>Doing something...</Text>
            //     </AnimatedLoader>
            //             </Box>
             }
        </View>
        
         <Center >

            <Modal isOpen={ShowModal} onClose={() => setShowModal(false)} mr={3}>
            <Modal.Content width={Metrics.WIDTH } h={Metrics.HEIGHT*0.822}>
             
            <Modal.Header alignItems={'center'}>
            <Heading fontFamily={Platform.OS==='android'?Fonts.type.regular:Fonts.type.regular} color={Colors.newTextClr} textAlign='center'>بيانات طفلك</Heading>
            </Modal.Header> 
            <Modal.Body alignItems={'center'} >
 
            <Stack flexDirection={"column"} alignItems='flex-start'  space={4} w="95%" padding={2}   >
                <Text alignItems={'center'} fontSize={fontPixel(16)} marginLeft={1} 
                 fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} color={Colors.newTextClr}>اسم الطفل</Text>
                <Input variant='outline' placeholder="اسم الطفل" onChangeText={(e)=>setChiled(e)}  borderColor='#00ABB9'  borderWidth='1'  style={{textAlign:'right'}}
                        fontSize={fontPixel(18)} w={Metrics.WIDTH*0.8001}   />

                <HStack flexDirection={'row'} justifyContent='space-between'   w={Metrics.WIDTH*0.8001}>
                    <Box alignItems={'flex-start'}  w={Metrics.WIDTH*0.324}  >
                        <Text alignItems={'center'} fontSize={fontPixel(16)} marginLeft={1} 
                            fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} color={Colors.newTextClr}> العمر</Text>
                        <Input variant='outline' placeholder="العمر"  onChangeText={(e)=>setAge(e)}   borderColor='#00ABB9'  borderWidth='1' style={{textAlign:'right'}}
                                fontSize={fontPixel(18)} />
                    </Box>
                    
                    <Box alignItems={'flex-start'}  w={Metrics.WIDTH*0.324}   >
                        <Text alignItems={'center'} fontSize={fontPixel(16)} marginLeft={1} 
                 fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} color={Colors.newTextClr}>الجنس</Text>    
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
                                    return( <Radio key={ds._id} value={ds.name}  >{ds.name}</Radio>)
                                    
                                    })}
                            
                            
                            </Radio.Group>
                </Stack>
            </Stack>
            
             </Modal.Body>
             <Modal.Footer alignItems={'center'}>
                {chieldList.length>=1? <HStack   flexDirection={'row'} flexWrap='wrap'  justifyContent={'center'} >
                   {chieldList.map((chld)=>{ 
                    return(
                        <Box  key={chld.id} borderColor='#00ABB9' alignItems={'center'} borderWidth='1' borderRadius={20}  mt={2}  w={Metrics.WIDTH*0.232} >
                            <EvilIcons name={"close"} size={18} color={Colors.blacktxt}  bg='white'onPress={()=>removeChiiled(chld.id,chld.name)}  style={{marginTop:3}}/>
                                    {/* <EvilIcons name={"close"} size={18} color={Colors.skyblue} onPress={()=>console.log(chld)}  style={{marginTop:3}}/> */}
                            <Text  style={{fontSize:18,fontWeight:'600',color:Colors.blacktxt,fontFamily:Platform.OS==='android'?Fonts.type.medium:Fonts.type.base ,marginLeft:4}} > {chld.chiled} </Text>
                        </Box> )
                        })}
                </HStack>:null}
                
                <Box alignItems={'center'}   w={"100%"} p='2'> 
                    <Text  alignItems={'center'} fontSize={fontPixel(16)} marginLeft={1} 
                 fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} color={Colors.newTextClr} >
                                    الرجاء الحرص على ادخال بيانات طفلك بشكل دقيق </Text>
                    {chiieldAcount >=1 ? <Text style={{fontFamily:Platform.OS==='android'?Fonts.type.medium:Fonts.type.base ,fontSize:15 ,fontWeight:'400',textAlign:'center'} } >
                            عدد الاطفال المسجلين  مسبقا {chiieldAcount} </Text>:null}
                </Box>
                <Box alignItems={'center'} w={Metrics.WIDTH*0.834} ml='3' mr='4' mt={5} rounded='lg'>
                    <Button bgColor={Colors.AminaPinkButton} size={'lg'} mb='1.5' w='full'
                            onPress={() => addChield2()}>
                        <Text alignItems={'center'} fontSize={fontPixel(16)} marginLeft={1} 
                             fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} color={Colors.white} > اضف الطفل</Text>
                    </Button>
                </Box> 
            </Modal.Footer>
            </Modal.Content>
            </Modal>
    </Center>
    </ScrollView>
     </KeyboardAvoidingView>
     
     </SafeAreaView>

)
}
export default Profile;