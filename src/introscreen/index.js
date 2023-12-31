

import React, { useState, useEffect, useContext, useRef, version } from 'react';

import {
  SafeAreaView, Image, TouchableOpacity
  , StyleSheet, Animated, View, Platform, Alert, Linking,Text
} from 'react-native';
import  {UserContext} from '../services/UserContext';

import {
  Colors, fontPixel, Fonts, Images, Metrics, widthPixel
} from '../assets/Themes/';
import styles from './styles'
import AppIntroSlider from 'react-native-app-intro-slider';
 
import DeviceInfo from 'react-native-device-info';
import { Box, Button, Checkbox, Stack, StatusBar } from 'native-base';

import setItem from '../services/storage/'
import AnimatedLoader from 'react-native-animated-loader';


const slides = [
  {
    key: 1,
    extrashow:true,
    extratext:"ماهو",
    title: 'تطبيق أمينة',
    text: "يقوم تطبيق امينة على ابتكار طريقه سهله\nللتواصل بين الام والحاضنة المنزلية لتوفير منصةامنه وسهلةالاستخدام لاختيارالحاضنة",
    image: Images.intro11,
    backgroundColor: Colors.AminabackgroundColor,
    
  },
  {
    key: 2,
    extrashow:false,
    title: 'حضانة منزلية',
    text:"احجزي جليسة اطفال لطفلك في بيتك",
    image: Images.intro12,
    backgroundColor:Colors.AminabackgroundColor,
  },
  {
    key: 3,
    extrashow:false,
    title: 'جليسة أطفال',
    text: "اختصري وقتك وابحثي عن اقرب حاضنة منزلية لبيتك",
    image: Images.intro13,
    backgroundColor: Colors.AminabackgroundColor,
  }
];


const IntroScreen = (props) => {

  const [loading,setloding] = useState(true)
  const {user,statuscode,dirction,regUser,home,sethome} = useContext(UserContext);
  const [index, setIndex] = useState(0)
  const [passScreen, setpassScreen] = useState(false)
  const [showRealApp, setShowRealApp] = useState(false);
  const ref = useRef(null)
  const [goButton, setGoButton] = useState(false)
  const[visible,setvisible]=useState(false)
  let buildNumber = DeviceInfo.getBuildNumber();
  const appName=DeviceInfo.getApplicationName();
  const app_version=DeviceInfo.getVersion()
  const app_type=Platform.OS==='android'?"android":"ios"
  const fadeAnim = useRef(new Animated.Value(0)).current;
 
 
  useEffect(async () => {
    
  showLOading(true)
  
  })

   
   
  // const onSlide = await setItem.getItem("BS@intro")
  // console.log("onslid ++++=",onSlide ," loood",loading)
  //   if (onSlide === null) {
  //     console.log("onslid null",onSlide)
  //     showLOading(false)
  //     setloding(false)
  //   } else if (onSlide===false) {
  //     console.log("onslid value===fals is", onSlide)
  //     showLOading(false)
  //     setloding(false)
  //   } else if (onSlide === true) {
  //     setloding(false)
  //     console.log("onslid ===true", onSlide)
  //    //start old inmation
  //    // fadeIn()
  //    //start load new inamtion 

  //   }



  // }, [])

  useEffect(async()=>{
    //await setItem.removeItem("BS@intro")
    console.log("useEffect 2")
    let isSubscribed=true

    const ScreenDirect= async()=>{
      const onSlide = await setItem.getItem("BS@intro")
        if (onSlide === null || onSlide === false ) {
            //checck if user asign to  welcome screen
            console.log("isSubscribed false to assign to welcome")
            setloding(false)
            showLOading(false)
             isSubscribed=false
        }else{ 
            //if user asign to screen then compleat steps
             if (isSubscribed){
               
               if (dirction === null) {
                 console.log("test DIRRCTIN ++ PAGE= was", dirction)
                } else if (dirction === true) {
                  console.log("test DIRRCTIN ++ PAGE", dirction)
                    setTimeout(() => {
                      showLOading(false)
                      sethome(true);
                      // goSignScreen()
                    }, 3000)
                } else if (dirction === false) {
                  setloding(false)
                    showLOading(false)
                   
                    console.log("test DIRRCTIN +++ PAGE=", dirction)
                    goSignScreen()
               }
             }
            
      }
    }

    ScreenDirect()

    
  },[dirction])


  const showLOading=(value)=>{
   if(value){
    setvisible(true)
   }else{
    setvisible(false)
    }
  }

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start((finished) => {
      console.log("Animated", finished)
      if (finished) {
        console.log("Animated done",)
        fadeOut()
      }
    });

  };

  const fadeOut = async () => {
    //await setItem.removeItem("BS@intro")
    // Will change fadeAnim value to 0 in 3 seconds
    // await setItem.setItem("BS@intro", (false)).then(() => {
    //   console.l
    // })
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start((finished) => {
      console.log("Animated1", finished)
      if (finished) {
        console.log("Animated 1 done",)

        goSignScreen()
      }
    });
  };


  const _renderNextButton = () => {
    return (
      <TouchableOpacity onPress={() => ref.current.goToSlide(index + 1, true)} style={styles.buttonCircle}>
        <Text style={{fontFamily:Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular,fontSize:fontPixel(16), color:Colors.whites ,alignSelf:'center'}}  >التالي</Text>
      </TouchableOpacity>
    );
  };
  const _renderSkipButton = () => {
    return (
      <TouchableOpacity onPress={() => hidIntroScreen()  } style={styles.buttonCircle}>
        <Text fontFamily={Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular} fontSize={fontPixel(18)} color={Colors.whites} alignSelf='center' >تخطي</Text>
      </TouchableOpacity>
    );
  };
  const moveSlide = (i) => {
    // console.log('Test',i)
    setIndex(i)
  }

  const _renderDoneButton = () => {
    return (
      <TouchableOpacity onPress={() => goSignScreen(false)} style={styles.buttonCircle}>
        <Text style={{fontFamily:Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular,fontSize:fontPixel(16), color:Colors.whites ,alignSelf:'center'}}>تخطي</Text>
      </TouchableOpacity>
    );
  };


  const RenderItem1 = ({ item, i }) => {
    return (
      <View onTouchEnd={() => {
        if (item.key === 3) {
          setGoButton(true)
        } else { setGoButton(false) }
      }}
        style={{
          //...StyleSheet.absoluteFill,
          //marginTop:2,
            backgroundColor:Colors.red
        }}
        >

        <Image
          style={styles.introImageStyle}
          source={item.image} resizeMode={Platform.OS === 'android' ? 'stretch' :'cover'} />
          <Box   height={'80'} alignItems={'center'} >
            {item.extrashow&&<Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={'700'} fontSize={fontPixel(29)} color={Colors.greentext} mt={'5'} letterSpacing={1.8}>{item.extratext}</Text>}
            <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={'700'} fontSize={fontPixel(33)} color={Colors.textZahry} mt={item.extrashow?'2':"10"} letterSpacing={1.3}>{item.title}</Text>
            <Text fontFamily={Platform.OS==='android'?Fonts.type.base:Fonts.type.base}   fontSize={fontPixel(18)}   color={Colors.black} mt={item.extrashow?'2':"2"} letterSpacing={1}>{item.text}</Text>
          </Box>
          {/* {!item.extrashow&&<Box flexDirection={'row'} position='absolute' bottom={'32'} right={'32'} justifyContent='space-around' backgroundColor={Colors.transparent} >
            <Checkbox value="test" size={'sm'} mr={'4'} borderRadius={50} onChange={() => changeoption()} accessibilityLabel="This is a dummy checkbox" colorScheme='lightBlue' />
            <Text fontSize={fontPixel(14)} color={Colors.blacktxt} >عدم الاظهار مرة اخرى</Text>
          </Box>} */}


        <Box alignItems='center' position={'absolute'} backgroundColor={"rgba(0,0,0,0.5)"} style={{ ...StyleSheet.absoluteFill }} >
          <Box position={'relative'} top={'96'}>
            <Stack mt={'10'} alignItems='center' >
              <Text fontFamily={Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular} fontSize={fontPixel(24)} color={Colors.Milky} alignSelf='center' >{item.title}</Text>
            </Stack>
            <Stack mt={'5'} alignItems='center' >
              <Text fontFamily={Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular} fontSize={fontPixel(16)} color={Colors.Milky} flexWrap='wrap' textAlign={'center'}>{item.text}</Text>
            </Stack>

          </Box>
        </Box>

      </View>
    );
  };

  const changeoption = async () => {
    if (passScreen === null) {
      const introscreenvalue = true
      await setItem.setItem("BS@intro", (introscreenvalue)).then(() => {
        setpassScreen(true)
      })
    } else if (passScreen === true) {
      const introscreenvalue = false
      await setItem.setItem("BS@intro", (introscreenvalue)).then(() => {
        setpassScreen(false)
      })

    } else if (passScreen === false) {
      const introscreenvalue = true
      await setItem.setItem("BS@intro", (introscreenvalue)).then(() => {
        setpassScreen(true)
      })
    }
  }

const hidIntroScreen=async()=>{
  const introscreenvalue = true
      await setItem.setItem("BS@intro", (introscreenvalue)).then(() => {
        setpassScreen(true)
    })
}
const goHomScrreen=()=>{
  console.log("user info",user)
  console.log("user Is Regerster",regUser)
  console.log("GO SCREEN NO===>")
  //props.navigation.push('Singin')
}
  const goSignScreen = async (val) => {
    const introscreenvalue = true
      await setItem.setItem("BS@intro", (introscreenvalue)).then(() => {
        props.navigation.push('Singin')
      })
   
  }

 const  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor:Colors.AminabackgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
        }}>
          <Image
          style={styles.introImageStyle}
          source={item.image} />
         <Text >
          {item.title}
        </Text>
        
        <Text >
          {item.text}
        </Text>
      </View>
    );
  }
  const RenderItem = ({item}) => {
    return (
       
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
        }}>
        <Image
          style={styles.introImageStyle}
          source={item.image} />

        <Text style={styles.introTitleStyle}>
          {item.title}
        </Text>
       
        <Text style={styles.introTextStyle}>
          {item.text}
        </Text>
      </View>
      
    );
  };
  const _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    //this.setState({ showRealApp: true });
    setShowRealApp(true);
  }
  const onSkip = () => {
    setShowRealApp(true);
  };

  return (
<>
<StatusBar barStyle="light-content" backgroundColor={Colors.textZahry} />
 {loading?
     ( <Box  alignItems={'center'} justifyContent={'center'} backgroundColor={Colors.gray}>
            <AnimatedLoader
      visible={visible}
      overlayColor="rgba(255,255,255,0.75)"
      source={require("./loading.json")}
      animationStyle={styles.lottie}
      speed={1}
      
    ></AnimatedLoader>

      
     </Box>):(<AppIntroSlider
    ref={ref}
    data={slides}
    renderItem={RenderItem}
    onSlideChange={moveSlide}
    renderDoneButton={_renderDoneButton}
    renderNextButton={_renderNextButton}
  />)
      }
      
</>
   
   

   
  )
};



export default IntroScreen;

{/* <View style={{ height: Metrics.HEIGHT, width: Metrics.WIDTH, backgroundColor: Colors.AminabackgroundColor }}>
<StatusBar barStyle="light-content" backgroundColor={"rgba(0,0,0,0.5)"} />
{loading ?
  // <Animated.View
  //   style={[styles.fadingContainer, {
  //     // Bind opacity to animated value
  //     opacity: fadeAnim,
  //   },
  //   ]}>
  <Box flex={1} alignItems={'center'} backgroundColor={Colors.gray}>
  <AnimatedLoader
    visible={visible}
    overlayColor="rgba(255,255,255,0.75)"
    source={require("./loading.json")}
    animationStyle={styles.lottie}
    speed={1}
    
  >
    <Box alignItems={'center'} justifyContent='center' height={'32'} mt={'4'}>
      <Image source={Images.introimage} style={{ height: 88, width: 88 }} resizeMode='contain' />
      <Image source={Images.MainLogo1} style={{ height: 88, width: 88 }} resizeMode='cover' />

    </Box>

  </AnimatedLoader>
  </Box> :
  <Box flex={1}>
    <AppIntroSlider
      ref={ref}
      data={slides}
      renderItem={RenderItem}
      //  onDone={onDone}
      // renderPagination={_renderPagination}
      //  //showSkipButton={true}
      //   onSkip={onSkip}
      onSlideChange={moveSlide}
      renderDoneButton={_renderDoneButton}
      renderNextButton={_renderNextButton}
    />
    
    <View style={{ alignItems: 'center', backgroundColor: Colors.transparent, position: 'absolute', bottom: 33, left: 4 }}>
      <Text fontSize={fontPixel(14)} color={Colors.black}>V.N:{buildNumber}</Text>
    </View>
  </Box>
}




</View> */}