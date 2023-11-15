import React, { useState, useEffect,useContext } from 'react';
import {View,SafeAreaView, Alert,ScrollView,FlatList, Platform,KeyboardAvoidingView,TouchableOpacity,Image} from 'react-native'
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
import images from '../assets/Themes/Images';
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
    const[selectButton,setselectButtons]=useState(0)
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

     const childernSelctinfo=(val,indx)=>{
        setSelectdies(val)
        setselectButtons(indx)
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
    <SafeAreaView>
    <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
             keyboardVerticalOffset={keyboardVerticalOffset} enabled  >
    
    <Box alignItems={'center'} flexDirection={'column'} height={Metrics.HEIGHT} width={Metrics.WIDTH} mt={'3'}>
        <Box  backgroundColor={Colors.AminabackgroundColor} mt={ Platform.OS==='android'? "6":"6"} > 
            { loding ?
                <Box  flexDirection={'column'} alignItems={'center'} justifyContent={'space-around'} mt={'1'} padding={'4'} >
                    <Stack alignItems={'center'} justifyContent={'center'}>
                            <Text alignItems='flex-start' fontSize={'2xl'} fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} fontWeight='700' color={Colors.black}>انشاء حساب</Text>
                    </Stack>
                    <Stack  width={widthPixel(343)}   alignItems={'flex-start'} > 
                        <Input value={motherName}  onChangeText={(e)=>setmotherName(e)} variant='outline'  placeholder="الاسم الاول "  color={Colors.blacktxt} borderRadius={'2xl'}
                                fontSize={18 } fontFamily={ Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold } backgroundColor={"rgba(243, 243, 243, 1)"}  borderWidth='1' style={{textAlign:'right'}} mt={2} />

                            <Input value={motherFamyly} onChangeText={(e)=>setmotherFamyly(e)} variant='outline'  placeholder="اسم العائلة " color={Colors.blacktxt} borderRadius={'2xl'}
                                fontSize={fontPixel(18) }  fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} backgroundColor={"rgba(243, 243, 243, 1)"}   borderWidth='1' style={{textAlign:'right'}} mt={2} />

                            <Input value={motherId} placeholder="1xxxxxxxxx"  type='text'  maxLength={10} onChangeText={(e)=>setmotherId(e)} variant='outline'  color={Colors.blacktxt} borderRadius={'2xl'}
                                    fontSize={fontPixel(18) }  fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold}  backgroundColor={"rgba(243, 243, 243, 1)"}  borderWidth='1' style={{textAlign:'right'}} mt={2}  />
                            
                            <Input value={locationmother} onPressIn={()=>props.navigation.push("Mapscreen")} variant='outline'  color={Colors.blacktxt} borderRadius={'2xl'}
                                    placeholder="ادخل العنوان"  fontSize={fontPixel(18) }  fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold}
                                    backgroundColor={"rgba(243, 243, 243, 1)"}   borderWidth='1' style={{textAlign:'right'}} mt={2}  />
                            
                            <Input value={motherEmail }  onChangeText={(e)=>setmotherEmail(e)} variant='outline'   placeholder="البريد الالكتروني" color={Colors.blacktxt} borderRadius={'2xl'}
                                    fontSize={fontPixel(18) }  fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} backgroundColor={"rgba(243, 243, 243, 1)"}  borderWidth='1' style={{textAlign:'right'}} mt={2} />
                        
                    </Stack>
                    <Box  alignItems={"center"} justifyContent='center' padding={2} marginTop={'3'} backgroundColor={Colors.transparent}    > 
                     <TouchableOpacity style={{backgroundColor:"rgba(21, 171, 185, 1)" ,width:Metrics.WIDTH*0.88,height:Metrics.HEIGHT*0.05512,borderRadius:22,alignItems:'center',justifyContent:'center',flexDirection:'row'}}
                        onPress={()=>addChield() }>
                        <Text fontSize={18} fontFamily={Platform.OS === 'android' ? Fonts.type.bold : Fonts.type.bold} color={"white"} mr={'1'} alignSelf={'center'}>اضف طفلك</Text>
                        <Image source={images.aminawbaby} style={{height:33,width:33}} resizeMode='contain'/> 
                    </TouchableOpacity>
                </Box>
                </Box>
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
                
        </Box>
          {/* page footer */}
        
        
        
            { loding ?
                < CustomButton
                        buttonColor={Colors.AminaPinkButton}
                        titleColor={Colors.white}
                        title="تسجيل"
                        buttonStyle={{width:"88%", alignSelf: 'center',borderRadius:44 }}
                        textStyle={{fontSize: 20}}
                        onPress={() => addMother()}
                        />
                :<Box/>
            }
        
        {/* eroor mesage */}
        <Box alignItems={"center"} justifyContent='center' padding={2} marginTop={'3'} backgroundColor={Colors.transparent}  >
        {msgerorr&&
            <Box width={Metrics.WIDTH} alignItems={'center'} alignContent={'space-around'}mt={'1'} >
                <Text fontSize={18} color='error.500' fontFamily={Platform.OS==='android'? Fonts.type.regular:Fonts.type.base}>{msg}</Text>  
            </Box>  
            }
        </Box>
      
    
        <Center >
         <Modal isOpen={ShowModal} onClose={() => setShowModal(false)}  >
            <Modal.Content width={Metrics.WIDTH }  h={Metrics.HEIGHT*0.952} borderTopRadius={'3xl'} >
                <Modal.Header alignItems={'center'}>
                    <Heading fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontWeight={'700'} size={'xl'}  color={Colors.greentext} >بيانات طفلك</Heading>
                    <Modal.CloseButton/>
                </Modal.Header> 
            <Modal.Body alignItems={'center'} height={'96'}>
                <Stack  flexDirection={"column"} alignItems='flex-start'  space={'10'} w="95%" padding={2}  >
                    <Stack alignItems={'flex-start'}>
                        <Text alignItems={'center'} fontSize={fontPixel(16)} marginLeft={1} 
                            fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} color={Colors.newTextClr}>اسم الطفل</Text>
                        <Input variant='outline' placeholder="اسم الطفل" onChangeText={(e)=>setChiled(e)} borderColor={Colors.veryLightGray}  borderWidth='1'  style={{textAlign:'right'}}
                            fontSize={12}  borderRadius={'3xl'} height={'10'} backgroundColor={"rgba(243, 243, 243, 2)"}   />
                    </Stack>
                    <HStack flexDirection={'row'} justifyContent='space-between'   w={Metrics.WIDTH*0.8001}>
                        <Stack alignItems={'flex-start'}  w={Metrics.WIDTH*0.324}  >
                            <Text alignItems={'center'} fontSize={fontPixel(15)} marginLeft={1} 
                                fontFamily={Platform.OS==='android'?Fonts.type.medium:Fonts.type.medium} color={Colors.newTextClr}> العمر</Text>
                            <Input variant='outline' placeholder="العمر"  onChangeText={(e)=>setAge(e)}   borderRadius={'3xl'} backgroundColor={"rgba(243, 243, 243, 2)"}   borderColor={Colors.veryLightGray}  borderWidth='1'  style={{textAlign:'center'}}
                                   fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} fontSize={fontPixel(18)} />
                        </Stack>
                        
                        <Stack alignItems={'flex-start'}  w={Metrics.WIDTH*0.324}   >
                            <Text alignItems={'center'} fontSize={fontPixel(16)} marginLeft={1} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} color={Colors.newTextClr}>الجنس</Text>    
                            <Select selectedValue={gender===null?"":null}  accessibilityLabel="الجنس" placeholder="الجنس" defaultValue="ذكر"
                                        _selectedItem={{
                                            bg: "gray.200", endIcon: <CheckIcon size="5" />}}
                                        w={Metrics.WIDTH*0.246}  
                                        borderColor={Colors.veryLightGray }  borderWidth='1'
                                        variant='outline' fontSize={18}  borderRadius={'2xl'}
                                        onValueChange= {itemValue => setgender(itemValue)} textAlign={"center"}
                                        >  
                                        <Select.Item label="ذكر" value="ذكر" />
                                        <Select.Item label="انثى" value="انثى" />
                            </Select>
                        </Stack>
                    </HStack>

                   
                    <Box   height={'24'}>
                        <FlatList 
                            data={desise}
                            numColumns={2}
                            renderItem={({ item,index}) => 
                            <TouchableOpacity key={item._id} onPress={()=>childernSelctinfo(item.name,index) } style={{width:Metrics.WIDTH*0.3713,height:Metrics.HEIGHT*.04421,backgroundColor:index===selectButton? Colors.amin1Button1:"rgba(243, 243, 243, 1)",borderRadius:22,alignItems:'center',justifyContent:'center',margin:5,padding:2}}>
                                <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} color={index===selectButton?'white':"rgba(0, 171, 185, 1)"} fontSize={'lg'} alignSelf={'center'} >{item.name}</Text>
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
                                <Text fontSize={18} color={Colors.textZahry} fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold } fontWeight={'700'}padding={'2'}
                                 > {chld.chiled} </Text>
                             </Stack>
                            
                            <TouchableOpacity key={chld._id} onPress={()=>console.log(chld.id,chld.chiled) } style={{width:Metrics.WIDTH*0.1713,height:Metrics.HEIGHT*.04421,backgroundColor:"rgba(244, 128, 147, 1)",borderRadius:22,alignItems:'center',justifyContent:'center',padding:2}}>
                                <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} color={'white'} fontSize={'md'} alignSelf={'center'} letterSpacing={1.5}>حذف</Text>
                             </TouchableOpacity>
                           
                        </Box> )
                        })}
                </Box>:
                <Box>
                    <Stack backgroundColor={'gray.100'} borderRadius={'lg'} paddingRight={'2'}  paddingLeft={'3'} mt={'3'} borderColor={'info.100'}borderWidth={'1'}>
                        <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} color={'warmGray.400'} fontSize={'md'} alignSelf={'center'} letterSpacing={1.5}t>لايوجد اطفال مضافون</Text>
                    </Stack>
                </Box>}  

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
    </Box>
   
    </KeyboardAvoidingView>
     
    </SafeAreaView>

)
}
export default Profile;