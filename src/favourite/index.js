import React,{useEffect,useState} from 'react';
import {View,Image, TouchableOpacity,Platform, Alert} from 'react-native'
import {FlatList,Box,Heading,Avatar,Text,VStack,HStack,Spacer, Button,Spinner,ScrollView, Stack} from 'native-base';
import setItem from '../services/storage';
import api from '../services/api';
import {Rating} from 'react-native-ratings' 
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { Colors,Fonts ,Metrics,Images} from '../assets/Themes';
import styles from './styles';
//      import images from '../assets/Themes/Images';
import {URL_ws,URL} from '../services/links';
import _ from 'lodash'


const Favourite=(props)=>{

 
const[babseters,setbabyseters]=useState([])
const[loading,setLoading]=useState(true)
const[like,setlike]=useState(null)
 
const [ favoriteList, setFavoriteList] = useState([]);

useEffect(async()=>{
  const unsubscribe = props.navigation.addListener('focus',async (e) => {
    const favariotSettter=await setItem.getItem("on:like") || {}
    if(!favariotSettter){
     setLoading(true)
    }else{
      setFavoriteList(favariotSettter)
    }
    
   console.log("Data for favariotSettter",Object.keys( favariotSettter).length)

   
  
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
  
     

return(
    <View  style={{flex:1}} backgroundColor={Colors.white}>
       
        {Object.keys(favoriteList).length >=1  ?
         
        <Box alignItems={'center'} mt="4" backgroundColor={Colors.white}>
            {_.map(favoriteList,(item,id) =>{
                return(
                  <Box  key={id} bordesrWidth="1"   bgColor={Colors.white} borderColor="#00ABB9" borderRadius='md'  pr="5" py="2" ml="3" mr="5" mb={4} width={Metrics.WIDTH*0.953}  h={Metrics.HEIGHT*0.220}>
                  <HStack space={3} justifyContent='space-around' key={item._id}>
                    <Image  source={{ uri: `${URL}/users/${item.owner}/avatar`}} resizeMode='stretch' 
                    style={{width: Metrics.WIDTH*0.281, height: Metrics.HEIGHT*0.170,marginLeft:5,marginRight:20,borderBottomLeftRadius:10}} />
                    <Spacer />
                    
                    <VStack flexDirection={'column'}    alignItems={'flex-start'} >
                      <Text  color= "#000000"
                        fontFamily={Fonts.type.base} fontWeight='bold' fontSize={15}>
                        {item.displayname}
                      </Text>
                      <Text color= "#000000" fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base} fontWeight="thin" fontSize={15} mr={6}>
                        {item.service}
                      </Text>
                      <VStack flexDirection={'row'} alignItems='baseline'  bgColor='coolGray.50' >
                       <Rating
                    type='custom'
                     //onFinishRating={(e)=>ratingCompleted(e)}
                     style={{ paddingVertical: 10 ,backgroundColor:Colors.transparent,padding:10}}
                    ratingCount={5}
                   imageSize={20}
                   ratingBackgroundColor={"#BFD1D6"}
                   ratingColor={"#F38193"}
                   tintColor={"#FFFFFF"}
                    showRating ={false}
                   starContainerStyle={styles.ratingContainerStyle}
                    
                   isDisabled 
                    />
                    <Box>
                       <Text color= "#000000" fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base}
                        fontWeight="thin" fontSize={15}>التقييم {item.rate ? Number(item.rate):0}</Text>
                    </Box>
                   
                    
                    </VStack>
                      
                    <Box>
                       <Text color= "#000000" fontFamily={Fonts.type.aminafonts} fontWeight="thin" fontSize={15} ml={1}>{item.hourstotal} ساعة عمل</Text>
                    </Box>
                    <Box>
                    <Text   color= "#000000" fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.base} fontWeight="thin" fontSize={15} >
                      تكلفة الخدمه بالساعه {item.price} ريال
                    </Text>
                    <HStack backgroundColor={'amber.200'}>
                    
                    </HStack>
                   
                    </Box>
        
                    </VStack>
                    
                    <Spacer />
                    {/* <TouchableOpacity onPress={()=>likeClike(item,index)}>
                      <Image source={ index===like? images.like1:images.like} resizeMode ={'cover'} style={{width:Metrics.WIDTH*0.0932 ,height:Metrics.HEIGHT*0.072}}   />
                    </TouchableOpacity>
                   < TouchableOpacity onPress={()=>readlike(item)}>
                      <Image source={ index===like? images.like1:images.like} resizeMode ={'cover'} style={{width:Metrics.WIDTH*0.0932 ,height:Metrics.HEIGHT*0.072}}   />
                    </TouchableOpacity> */}
        
                    <TouchableOpacity onPress={()=>onRemoveFavorite(item._id)}>
                      <EvilIcons name='trash' size={33} color={Colors.TexTPink} style={{marginTop:20}} />
                    </TouchableOpacity>
        
                    
                    
                  </HStack>
                  <Button  size={'md'} w={Metrics.WIDTH*0.944} bgColor={"#F38193"} onPress={()=> console.log(item) }>احجز الان</Button>
                  
                </Box>
                   
                )
            })}
            
        </Box>:
            <Box alignItems={'center'}  mt={40} ml='3' mr={3}>
                <Heading>
                    <Text fontFamily={Fonts.type.lightmore} fontSize={22} color={Colors.veryLightGray} textAlign='center'>عفوا لاتوجد لديك اضافات   في المفضله !</Text>
                    
                </Heading>
            </Box> 
        }
        
        
    </View>
)
}
export default Favourite;




