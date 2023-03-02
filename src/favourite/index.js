import React,{useEffect,useState} from 'react';
import {View,Image, TouchableOpacity,Platform, Alert} from 'react-native'
import {FlatList,Box,Heading,Avatar,Text,VStack,HStack,Spacer, Button,Spinner,ScrollView, Stack} from 'native-base';
import setItem from '../services/storage';
import api from '../services/api';
import {Rating} from 'react-native-ratings' 
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { Colors,Fonts ,Metrics,Images,fontPixel,widthPixel,heightPixel,pixelSizeHorizontal,pixelSizeVertical} from '../assets/Themes';
import styles from './styles';
//      import images from '../assets/Themes/Images';
import {URL_ws,URL} from '../services/links';
import _ from 'lodash'


let HOURSWORK = 0


const Favourite=(props)=>{

 
const[babseters,setbabyseters]=useState([])
const[loading,setLoading]=useState(true)
const[like,setlike]=useState(null)
const [hourswork, sethourswork] = useState(false)
const [ favoriteList, setFavoriteList] = useState([]);

useEffect(async()=>{
  const unsubscribe = props.navigation.addListener('focus',async (e) => {
    const favariotSettter=await setItem.getItem("on:like") || {}
    if(!favariotSettter){
     setLoading(true)
    }else{
      setFavoriteList(favariotSettter)
    }
    console.log("Data for favariotSettter",favariotSettter)
   //console.log("Data for favariotSettter",Object.keys( favariotSettter).length)

   
  
})
   
  return unsubscribe;
  },[loading])

const onFavorite = async(favdata) => {
    console.log("favariot  item",favdata._id)
    setFavoriteList([...favoriteList, favdata]);
  };
  
    // function to remove an item from favorite list
    const onRemoveFavorite = async(itemId) => {
        console.log("start remove ",itemId)
       delete favoriteList[itemId]
       const succses= await setItem.setItem("on:like",favoriteList)
       if(succses){
        setFavoriteList(favoriteList)
       }
      
    };
  
    const readWorkhours = async (id) => {

      const response = await api.get(`allorderbysetterworkhours/${id}`).then((res) => {
        console.log("Test total",res.data[0].totalhours)
          HOURSWORK = res.data[0].totalhours
          sethoursworktotal(res.data[0].totalhours)
      }).finally(() => sethourswork(true)).catch((err) => {
        console.log("Erorr from readWorkhours",err)
          HOURSWORK = 0
       
      }) 
      return response
    }
  
     

return(
    <View  style={{flex:1}} backgroundColor={Colors.white}>
       
        {Object.keys(favoriteList).length >=1  ?
         
        <Box alignItems={'center'} mt="4" backgroundColor={Colors.white}>
            {_.map(favoriteList,(item,id) =>{
                return( 
                  <View key={id} style={{flexDirection:'column' ,alignItems:'center' ,justifyContent:'center' , borderColor:Colors.gray , borderWidth:1 }}>
                    <Box key={id}  marginLeft={pixelSizeHorizontal(15)} marginTop={'2'} paddingBottom={2} flexDirection={'row'}>
                     
                    <Box>
                      <Image source={{ uri: `${URL}/users/${item.owner}/avatar` }} resizeMode='contain' style={{
                        height: heightPixel(100), width: widthPixel(100),
                        marginTop:22, marginRight: pixelSizeHorizontal(1), borderRadius: 22
                      }} />
                    </Box>
                    <Box flexDirection={'column'} width={Metrics.WIDTH * 0.590} ml={pixelSizeHorizontal(20)} backgroundColor={Colors.transparent} marginTop={1} >
                      <Box flexDirection={'row'} justifyContent='space-between' alignItems={'baseline'} >
                        <Stack flexDirection={'row'} justifyContent='space-around' >
                          <Text style={{ fontFamily: Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular, fontSize: fontPixel(16), color: Colors.newTextClr }}>{item.name}</Text>
                          <Text style={{ fontFamily: Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular, fontSize: fontPixel(18), color: "#FB5353", marginLeft: pixelSizeHorizontal(4) }} >{item.mainservice}</Text>
                        </Stack>
                        <TouchableOpacity onPress={()=>onRemoveFavorite(item._id)}>
                          <EvilIcons name='trash' size={33} color={Colors.TexTPink} style={{marginTop:20}} />
                        </TouchableOpacity>
                      </Box>
                      
                      <Box flexDirection={'row'} justifyContent="space-between" mt={1} >
                        <Stack width={60} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={Colors.pinkystack}>
                          <Text style={{ fontFamily: Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular, fontSize: fontPixel(10), color: Colors.newTextClr }}>{item.price} ر.س/ساعة</Text>
                        </Stack>
                        <Stack width={60} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={Colors.yellowstack} flexDirection='row'>
                          <Text style={{ fontFamily: Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular, fontSize: fontPixel(10), color: Colors.newTextClr }}>{item.rate}</Text>
                          <Image source={Images.starticon} style={{ width: widthPixel(20), height: heightPixel(20) }} resizeMode='contain' />

                        </Stack>

                        <TouchableOpacity onPress={() => props.navigation.navigate('Shrtcutprofile', { data1: item, settertTitle: item.name })}>
                          <Stack width={60} height={36} alignItems='center' justifyContent={'center'} borderRadius={8} backgroundColor={Colors.pinkystack} flexDirection='row' >
                            <Text style={{ fontFamily: Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular, fontSize: fontPixel(10), color: Colors.newTextClr }}>احجزي الان</Text>
                          </Stack>
                        </TouchableOpacity>
                    </Box>
                    </Box>
                </Box>
                <Box flexDirection={'row'} justifyContent="space-between"  width={'88%'} ml={'12'}   >
                        <Stack flexDirection={'column'} textAlign='center' backgroundColor={Colors.ricePaper} >
                          <Text letterSpacing={Platform.OS === 'android' ? 2.3:.2} fontFamily={Platform.OS === 'android' ? Fonts.type.aminafonts : Fonts.type.light} fontSize={fontPixel(Platform.OS==='android'?10:18)} color={Colors.newTextClr} >{item.bio}</Text>
                        </Stack>
                </Box>
                      
                  
                  </View>
                  
                
                   
                )
            })}
            
        </Box>:
            <Box alignItems={'center'}  mt={40} ml='3' mr={3}>
                <Heading>
                    <Text fontFamily={Platform.OS==='android'? Fonts.type.aminafonts: Fonts.type.base} fontWeight='400' fontSize={22} color={Colors.blacktxt} textAlign='center'>عفوا لاتوجد لديك اضافات في المفضله !</Text>
                    
                </Heading>
            </Box> 
        }
        
        
    </View>
)
}
export default Favourite;




