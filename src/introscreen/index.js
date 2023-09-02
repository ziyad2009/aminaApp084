

import React, { useState, useEffect, useContext, useRef, version } from 'react';

import {
  SafeAreaView, Image, TouchableOpacity
  , StyleSheet, Animated, View, Platform, Alert, Linking,
} from 'react-native';
import  {UserContext} from '../services/UserContext';
import NetInfo from "@react-native-community/netinfo";
import {
  Colors, fontPixel, Fonts, Images, Metrics, widthPixel
} from '../assets/Themes/';
import styles from './styles'
import AppIntroSlider from 'react-native-app-intro-slider';
 
import DeviceInfo from 'react-native-device-info';
import { Box, Button, Checkbox, Stack, StatusBar, Text } from 'native-base';

import setItem from '../services/storage/'
import AnimatedLoader from 'react-native-animated-loader';


const slides = [
  {
    key: 1,
    title: 'جليسة أطفال',
    text: "احجزي جليسة أطفال لطفلك في بيتك",
    image: Images.intro1,
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'حضانة منزلية',
    text: "اختصري وقتك وابحثي عن أقرب حضانة منزلية لبيتك",
    image: Images.intro2,
    backgroundColor: '#E5E5E5',
  },
  {
    key: 3,
    title: 'تطبيق أمينة',
    text: 'تواصلي مع أفضل جليسات الأطفال من حولك \n وأقرب الحضانات المنزلية من بيتك',
    image: Images.intro3,
    backgroundColor: '#22bcb5',
  }
];


const IntroScreen = (props) => {

  const [loading, setloding] = useState(true)
  const {user,statuscode,dirction,regUser,home,sethome} = useContext(UserContext);
  const [index, setIndex] = useState(0)
  const [passScreen, setpassScreen] = useState(false)

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
  NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    })
   
  const onSlide = await setItem.getItem("BS@intro")
    if (onSlide === null) {
      console.log("onslid null",)
      showLOading(false)
      setloding(false)
    } else if (!onSlide) {
      console.log("onslid value===fals is", onSlide)
      showLOading(false)
      setloding(false)
    } else if (onSlide === true) {
      setloding(true)
      console.log("onslid ===true", onSlide)
     //start old inmation
     // fadeIn()
     //start load new inamtion 

    }



  }, [])

  useEffect(()=>{
    let isSubscribed=true
    const ScreenDirect= async()=>{
      const onSlide = await setItem.getItem("BS@intro")
        if (onSlide === null || onSlide === false ) {
            //checck if user asign to  welcome screen
             isSubscribed=false
        }else{ 
            //if user asign to screen then compleat steps
             if (isSubscribed){
               
               if (dirction === null) {
                 console.log("test DIRRCTIN PAGE= was", dirction)
                } else if (dirction === true) {
                  console.log("test DIRRCTIN PAGE", dirction)
                    setTimeout(() => {
                      showLOading(false)
                      sethome(true);
                      // goSignScreen()
                    }, 3000)
                } else if (dirction === false) {
                    showLOading(false)
                    console.log("test DIRRCTIN PAGE=", dirction)
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
        <Text fontFamily={Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular} fontSize={fontPixel(18)} color={Colors.whites} alignSelf='center' >التالي</Text>
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
        <Text fontFamily={Platform.OS === 'android' ? Fonts.type.regular : Fonts.type.regular} fontSize={fontPixel(16)} color={Colors.whites} alignSelf='center' >تخطي</Text>
      </TouchableOpacity>
    );
  };


  const RenderItem = ({ item, i }) => {
    return (
      <View onTouchEnd={() => {
        if (item.key === 3) {
          setGoButton(true)
        } else { setGoButton(false) }
      }}
        style={{
          ...StyleSheet.absoluteFill,

          // backgroundColor: "rgba(0,0,0,0.5)",
          position: 'absolute',
          alignItems: 'center',
          marginRight: 0,
          top: 0, right: 0, left: 0, bottom: 0
        }}>

        <Image
          style={styles.introImageStyle}
          source={item.image} resizeMode={Platform.OS === 'android' ? 'stretch' : "contain"} />
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
const goHomScrreen=()=>{
  console.log("user info",user)
  console.log("user Is Regerster",regUser)
  console.log("GO SCREEN NO===>")
  //props.navigation.push('Singin')
}
  const goSignScreen = async (val) => {
    //ise vvaue ==null \\
    props.navigation.push('Singin')
  }

  return ( 
    <View style={{ height: Metrics.HEIGHT, width: Metrics.WIDTH, backgroundColor: Colors.AminabackgroundColor }}>
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
          <Box flexDirection={'row'} position='absolute' bottom={'64'} right={'32'} justifyContent='space-around' backgroundColor={Colors.transparent} >
            <Checkbox value="test" size={'sm'} mr={'4'} borderRadius={50} onChange={() => changeoption()} accessibilityLabel="This is a dummy checkbox" colorScheme='lightBlue' />
            <Text fontSize={fontPixel(14)} color={Colors.white} >عدم الاظهار مرة اخرى</Text>
          </Box>
          <View style={{ alignItems: 'center', backgroundColor: Colors.transparent, position: 'absolute', bottom: 33, left: 4 }}>
            <Text fontSize={fontPixel(14)} color={Colors.greys}>V.N:{buildNumber}</Text>
          </View>
        </Box>
      }




    </View>
  )
};



export default IntroScreen;
