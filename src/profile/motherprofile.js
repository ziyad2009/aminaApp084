import React, { useState, useEffect,useContext } from 'react';
import {View, Alert,ScrollView, Platform} from 'react-native'
import {Stack,Text,Input,Button,Select,CheckIcon,Spinner,HStack,Heading, Box,Modal,Center,Radio} from 'native-base'
import styles from './styles'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import api from '../services/api';
import setItem from '../services/storage'
import{Metrics,Colors,Fonts} from '../assets/Themes/'
import { UserContext } from '../services/UserContext';
import CustomButton from '../services/buttons/buttton';
import { FacebookLoader, InstagramLoader } from 'react-native-easy-content-loader';
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
        setmsgerorr(!msgerorr)
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
        
        }


            const updateChiled =async (chld)=>{
                console.log("name deisi",chld.name,"name chiled",chld._id    )
        
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
    
    
    return(
       
       
        <ScrollView style={{flex:1,marginLeft:10,paddingTop:Platform.OS==='android'?20:30,backgroundColor:Colors.white}}>

        {loding? <InstagramLoader active />
        :
        <View> 
        <HStack  flexDirection={'column'} w='100%' alignItems={'flex-start'} ml='4'>
        {/* <View style={{flexDirection:'row',justifyContent:'space-around',alignContent:'baseline',marginLeft:12,}}>
            
             <Text alignItems='flex-start' fontSize={18} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontWeight='400' ml={'2'} >الاسم الاول</Text>
        </View> */}
            

        
            <View style={{flexDirection:'row',alignItems:'flex-start',justifyContent:'space-around',alignContent:'baseline',marginLeft:Platform.OS==='android'?1:12,marginBottom:Platform.OS==='android' ?3:2}}>
                <Text alignItems='flex-start' fontSize={18} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontWeight='400'   color={Colors.black} ml={'2'} >الاسم الاول</Text>
            </View>
            <Stack space={4} w="90%"  alignItems={'center'} >
                <Input value={motherName}  onChangeText={(e)=>setmotherName(e)} variant='filled'  placeholder="الاسم الاول " color={Colors.blacktxt} 
                    fontSize={18} fontFamily={ Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base }   borderColor='#00ABB9'  borderWidth='1' style={{textAlign:'right'}} mt={2} height={Metrics.HEIGHT*0.0624} />
            </Stack>
            
            <View style={{flexDirection:'row',alignItems:'flex-start',justifyContent:'space-around',alignContent:'baseline',marginLeft:Platform.OS==='android'?1:12,marginBottom:Platform.OS==='android' ?3:2}}>
                <Text alignItems='flex-start' fontSize={18} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontWeight='400' ml={'2'} mt="2">اسم العائلة</Text>
            </View>
            <Stack space={4} w="90%"  alignItems={'center'} >
                <Input value={motherFamyly} onChangeText={(e)=>setmotherFamyly(e)} variant='filled'  placeholder="اسم العائلة " color={Colors.blacktxt} 
                    fontSize={18}  fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}  borderColor='#00ABB9'  borderWidth='1' style={{textAlign:'right'}} mt={2} height={Metrics.HEIGHT*0.0624} />
            </Stack>
            
            <View style={{flexDirection:'row',alignItems:'flex-start',justifyContent:'space-around',alignContent:'baseline',marginLeft:Platform.OS==='android'?1:12,marginBottom:Platform.OS==='android' ?3:2}}>
               
                <Text alignItems='flex-start' fontSize={18} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontWeight='400' ml={'2'}  mt="2">رقم الهوية</Text>
            </View>
            <Stack space={4} w="90%"  alignItems={'center'} >
                <Input value={ (motherId).toString()}   maxLength={10} onChangeText={(e)=>setmotherId(e)} variant='filled'    color={Colors.blacktxt} 
                 fontSize={18}  fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}  borderColor='#00ABB9'  borderWidth='1' style={{textAlign:'right'}} mt={2} height={Metrics.HEIGHT*0.0624} />
            </Stack>
            <View style={{flexDirection:'row',alignItems:'flex-start',justifyContent:'space-around',alignContent:'baseline',marginLeft:Platform.OS==='android'?1:12,marginBottom:Platform.OS==='android' ?3:2}}>
                <Text alignItems='flex-start' fontSize={18} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontWeight='400' ml={'2'}  mt="2">العنوان</Text>
            </View>
            <Stack space={4} w="90%"  alignItems={'center'} >
                <Input value={locationmother} onPressIn={()=>props.navigation.push("Mapscreen")}
                  variant='filled'    color={Colors.blacktxt} 
                 placeholder="ادخل العنوان"  fontSize={18}  fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}
                   borderColor='#00ABB9'  borderWidth='1' style={{textAlign:'right'}} mt={2} height={Metrics.HEIGHT*0.0624} />
            </Stack>
            
            <View style={{flexDirection:'row',alignItems:'flex-start',justifyContent:'space-around',alignContent:'baseline',marginLeft:Platform.OS==='android'?1:12,marginBottom:Platform.OS==='android' ?3:2}}>
                
                <Text alignItems='flex-start' fontSize={18} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontWeight='400' ml={'2'}  mt="2">البريد الالكتروني</Text>
            </View>
            <Stack space={4} w="90%"  alignItems={'center'} >
                <Input value={motherEmail }  onChangeText={(e)=>setmotherEmail(e)} variant='filled'  backgroundColor={'white'} placeholder="البريد الالكتروني" color={Colors.blacktxt} 
                 fontSize={18}  fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}  borderColor='#00ABB9'  borderWidth='1' style={{textAlign:'right'}} mt={2} height={Metrics.HEIGHT*0.0624} />
            </Stack>

        
       
        
        {chieldList.length>=1? <HStack    flexDirection={'column'}>
        <Text textAlign={'left'} fontSize={18} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontWeight='400' ml={'2'}  mt="2">اطفالك</Text>
                   {chieldList.map((chld)=>{    
                    return(
                        <Box  key={chld.id}   w={"90%"} flexDirection={'row'} borderColor='#00ABB9' alignItems={'center'} borderWidth='1' borderRadius={5}  mt={3}  h={Metrics.HEIGHT*0.0624} >
                            <Box w={"80%"}  flexDirection={'row'} >
                                <Text  style={{fontSize:18,fontWeight:'600',color:Colors.blacktxt,fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base ,marginLeft:4}} > {chld.name} </Text>
                                <Text  style={{fontSize:18,fontWeight:'600',color:Colors.blacktxt,fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base ,marginLeft:4}} > {chld.age} - سنوات  </Text>
                                <Text  style={{fontSize:18,fontWeight:'600',color:Colors.blacktxt,fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base ,marginLeft:4}} >- {chld.diseasses}</Text>
                            </Box>
                            
                            <Box  w={"20%"} flexDirection={'row'}   >
                                <EvilIcons name={"trash"} size={30} color={"#9191A4"} onPress={()=>removeChiiled(chld.id,chld.name)}  style={{marginTop:3}}/>
                                <EvilIcons name={"pencil"} size={30} color={"#9191A4"} onPress={()=>updateChiled(chld)}  style={{marginTop:3}}/>
                            </Box>
                            
                        </Box> )
                        })}
                </HStack>
                :<Box> </Box>
            }
        <View  style={{alignItems:"center",padding:2 ,marginTop:30 ,width:Metrics.WIDTH*0.9272}}> 
            <HStack flexDirection={'row'} space={3} justifyContent='space-around' w={"37%"}>
                <Text alignItems="center" fontSize={20} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base}   >اضف طفلك</Text>
                <EvilIcons name={"plus"} size={33} color='#f38193' onPress={()=>addChield()}/>
            </HStack>
        </View>
        </HStack>

        {msgerorr?<View style={{ width:Metrics.WIDTH,height:Metrics.HEIGHT*0.0583,alignItems:'center',alignContent:'space-around',marginTop:8}}>
            <Text style={{color:Colors.error,fontSize:20}}>{msg}</Text>  
        </View>:<Box></Box>}

        <View style={{width:Metrics.WIDTH*0.943 ,marginBottom:20}}>
                    {/* <Button bgColor={Colors.amin1Button1} size={'lg'} onPress={() => 
                 updatemotherdata(motherData.mother._id) }>حفظ</Button> */}
                   <CustomButton
                    buttonColor={Colors.AminaButtonNew}
                    title="حفظ"
                    buttonStyle={{width: '90%', alignSelf: 'center'}}
                    textStyle={{fontSize: 20}}
                    onPress={() =>   updatemotherdata(motherData.mother._id)  }
                />
        </View>
        <Center >

            <Modal isOpen={ShowModal} backgroundColor={Colors.veryLightGray} onClose={() => setShowModal(false)}>
            <Modal.Content width={Metrics.WIDTH }  h={Metrics.HEIGHT*0.752}>
            <Modal.CloseButton padding={3} />
            <Modal.Header backgroundColor={Colors.AminaButtonNew}  alignItems={'center'}>
            <Heading fontFamily={Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base} fontWeight='500' color={'white'}>بيانات طفلك</Heading>
            </Modal.Header> 
            <Modal.Body alignItems={'center'} >
 
            <Stack flexDirection={"column"} alignItems='flex-start'  space={4} w="95%" padding={2}   >
                <Text style={{alignItems:"center",fontSize:15,fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base,
                fontWeight:'400',marginLeft:1}}>اسم الطفل</Text>
                <Input variant='outline' placeholder="اسم الطفل" onChangeText={(e)=>setChiled(e)}  borderColor='#00ABB9'  borderWidth='1'  style={{textAlign:'right'}}
                        fontSize={18} w={Metrics.WIDTH*0.824}   />

                <HStack flexDirection={'row'} justifyContent='space-between'   w={Metrics.WIDTH*0.824}>
                    <Box alignItems={'flex-start'}  w={Metrics.WIDTH*0.324}  >
                        <Text style={{alignItems:"center",fontSize:15,fontFamily:Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base,fontWeight:'400',marginLeft:1}}> العمر</Text>
                        <Input variant='outline' placeholder="العمر"  onChangeText={(e)=>setAge(e)}   borderColor='#00ABB9'  borderWidth='1' style={{textAlign:'right'}}
                                fontSize={18} />
                    </Box>
                    
                    <Box alignItems={'flex-start'}  w={Metrics.WIDTH*0.324}   >
                        <Text style={{alignItems:"center",fontSize:15,fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base,
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
                {chieldList.length>=1? <HStack   flexDirection={'row'} flexWrap='wrap'  alignItems={'flex-start'}   >
                   {chieldList.map((chld)=>{ 
                    return(
                        <Box  key={chld.id} borderColor='#00ABB9' alignItems={'center'} borderWidth='1' borderRadius={40}  mt={2} ml={2}  w={Metrics.WIDTH*0.232} >
                            <EvilIcons name={"close"} size={18} color={Colors.red} onPress={()=>removeChiiled(chld.id,chld.name)}  style={{marginTop:3,marginBottom:1}}/>
                                    {/* <EvilIcons name={"close"} size={18} color={Colors.skyblue} onPress={()=>console.log(chld)}  style={{marginTop:3}}/> */}
                            <Text  style={{fontSize:18,fontWeight:'600',color:Colors.blacktxt,fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base ,marginLeft:4}} > {chld.name} </Text>
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
                        buttonColor={Colors.AminaButtonNew}
                        title=" اضف الطفل"
                        buttonStyle={{width: '90%', alignSelf: 'center'}}
                        textStyle={{fontSize: 20}}
                        onPress={() =>   addChield2()  }
                    />
                     
                </Box> 
            </Modal.Footer>
            </Modal.Content>
            </Modal>
    </Center>
</View>}        
    </ScrollView>

    )

}

export default Motherprofilw;