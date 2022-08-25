import * as React from 'react';
import {View ,Text,Image,StyleSheet,Platform,TouchableHighlight} from 'react-native'
import {Box,VStack,Badge} from 'native-base'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import  {UserContext} from '../services/UserContext';

import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Singin from '../login';
import Authbycode from '../login/authbycode';
import Home from '../Home';
import Wallet from '../Wallet';
import Favourite from '../favourite';
import Request from '../Request';
import IntroScreen from '../introscreen';
 import Mapscreen from '../map';
 import Fourm1 from '../fourmreq';
 import Poitment from '../fourmreq/poetment';
 import Profile from '../profile';
 import Babysetesrs from '../babysetesrs'
 import BabysetesrsProfile from '../Setterprofile'
 import ConfirmRes from '../confirmRes'
 import PaymentForm from '../payment';
import Invoice from '../confirmRes/invoice'
import DDirctionMap from '../map/dirctionMap'
import Shrtcutprofile from '../Setterprofile/Shrtcutprofile';
import WorkScreen from '../workscreen/WorkScreen';
import Notifactionscreen from '../notifactions';
import Motherprofilw from '../profile/motherprofile';
import FinleScreeen from '../workscreen/FinleScreeen';
import SearchScreen from '../SearchScreen';
 
import { Metrics,Colors,Fonts,Images } from '../assets/Themes/';
import UserProvider from '../services/UserContext';
import { NavigationContext } from '@react-navigation/native';
import Logo from '../assets/images/Asset1.svg'; 
import BottomScreen from '../Home/bottom2';
import SettingScreen from '../extrascreen/settingscreen';
import PrivecyScreen from '../extrascreen/privcy';
import AboutScreen from '../extrascreen/about';
import Zoomphoto from '../Setterprofile/zoomphoto';
import Ewallet from '../Wallet/ewalet';
  




 


const Stack = createNativeStackNavigator();
const Auth = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HeaderBackButton =(nav)=> {
  const navigation = React.useContext(NavigationContext);
  const {notifaction} = React.useContext(UserContext);

return(
  <View style={{ marginRight:2,flexDirection:'row',justifyContent:'flex-start'}}>
    
    <View >
      <Badge // bg="red.400"
      colorScheme="danger" rounded="full" mb={-4} mr={-4} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
        fontSize: 9
      }}>
          {notifaction}
        </Badge>
        <Ionicons name="notifications" size={22} color={"#F5F5F5"} style={{marginLeft:3}} onPress={()=> navigation.navigate('Notifactionscreen') } /> 
      
    </View>
    
    <Ionicons name="search" size={22} color={"#F5F5F5"} style={{marginLeft:20}} onPress={ ()=>navigation.navigate('SearchScreen')} /> 
    <Ionicons name="mail" size={22} color={"#F5F5F5"} style={{marginLeft:15}} onPress={ ()=>console.log("mail")} /> 
    
  </View>
   
)
//()=>nav.navigate.push('Authbycode'
  
}


const HeaderMenuButton =(nav)=> {
  const navigation = React.useContext(NavigationContext);
return(
  <View style={{ marginRight:1,flexDirection:Platform.OS==='android'?"row":"row-reverse",alignContent:'baseline'}}>
      {/* <Image source={Images.MainLogo3} resizeMode='stretch' style={{alignItems:'center',height:Metrics.HEIGHT*0.0431,width:Metrics.WIDTH*0.2578,marginRight:10}}/> */}
      {/* <Ionicons name="menu" size={22} color={"#F5F5F5"} onPress={  ()=>navigation.navigate('BottomScreen')} /> */}
        <BottomScreen data={navigation}/>
    
      <Logo width={Metrics.HEIGHT*0.1321} height={Metrics.HEIGHT*0.044} />
    
    
    
  </View>
   
)
//()=>nav.navigate.push('Authbycode'
  
}

const Authflow =()=>{
    return(
      <Auth.Navigator initialRouteName="IntroScreen">
        
        <Stack.Screen name="Singin" component={Singin}
         options={{
           headerShown:false
         }} />
  
         <Stack.Screen name="Authbycode" component={Authbycode}
         options={{
           headerShown:true,
           title:"التحقق من الرقم",
           headerStyle:{
            backgroundColor:Colors.white,
          },
          headerBackTitleVisible:false,
          headerTitleStyle:{
            fontFamily:Fonts.type.light,
            fontWeight: "600" ,
            color:'#00ABB9',
            fontSize:18,
            alignItems:'center',
            
          }
         }} />
         <Stack.Screen name="IntroScreen" component={IntroScreen}
         options={{
           headerShown:false,
            
         }} />
         <Stack.Screen name="Profile" component={Profile}
         options={{
           headerShown:false,
            
         }} />
         <Stack.Screen name="Mapscreen" component={Mapscreen}
         options={{
           headerShown:false,
            
         }} />
         {/* <Stack.Screen name="SignIn" component={SignIn}
         options={{
          headerStyle:{
            backgroundColor:Colors.banner
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
         }} /> */}
         
      </Auth.Navigator>
    )
  }

  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

const StackNav = () => {
  return (
    <Stack.Navigator   >
       <Stack.Screen
        name= {Platform.OS==='android'? " " :"HomeTap" } component={HomeTap}
        options={({rout,navigation})=>({
          headerTitle:"",
          headerTransparent: false,
           headerStyle:{
             backgroundColor:'#00ABB9'
             //#2A6578'
           },
           
          // headerTitle:"الرئيسية",
          //headerTitleStyle:{fontFamily:Fonts.type.medium},
          // headerShown: true ,
           headerLeft:()=>{
            return(
                <HeaderBackButton  val={navigation}/>
                )  
          },
          headerRight:()=>{
            return(
             <HeaderMenuButton/>
            )
          }
        })}/>
        
        <Stack.Screen name="SearchScreen" component={SearchScreen}
        options={({route,navigation})=>({
          headerTitle: Platform.OS==='android'? "بحث":"",
          headerTransparent: true,
           headerStyle:{
             backgroundColor:Colors.hederup,
            
           },
           
          
          headerBackTitle:"بحث",
          // headerBackImageSource:Images.backButton,
          headerBackTitleStyle:{
            fontFamily:Fonts.type.medium,
            
            
          },
          headerLargeTitleShadowVisible:true,
          
          
          headerTintColor:"#F5F5F5",
           
        })} />
        <Stack.Screen name="SettingScreen" component={SettingScreen}
        options={({route,navigation})=>({
          headerTitle: Platform.OS==='android'? "الاعدادت":"",
          headerTransparent: true,
           headerStyle:{
             backgroundColor:Colors.hederup,
            
           },
           
          
          headerBackTitle:"الاعدادت",
          // headerBackImageSource:Images.backButton,
          headerBackTitleStyle:{
            fontFamily:Fonts.type.medium,
            
            
          },
          headerLargeTitleShadowVisible:true,
          
          
          headerTintColor:"#F5F5F5",
           
        })} />
        
        <Stack.Screen name="Fourm1" component={Fourm1}
        options={({route,navigation})=>({
          headerTitle: Platform.OS==='android'? route.params.productTitle:"",
          headerTransparent: true,
           headerStyle:{
             backgroundColor:Colors.hederup,
            
           },
           
          
          headerBackTitle:route.params.productTitle,
          // headerBackImageSource:Images.backButton,
          headerBackTitleStyle:{
            fontFamily:Fonts.type.medium,
            
            
          },
          headerLargeTitleShadowVisible:true,
          
          
          headerTintColor:"#F5F5F5",
          headerRight:()=>{
            return(
                <HeaderBackButton  val={navigation}/>
                )  
          },
        })}/>
      <Stack.Screen name="Mapscreen" component={Mapscreen} 
      options={({route,navigation})=>({
        headerTitle: Platform.OS==='android'? "الموقع":"",
        headerTransparent: true,
         headerStyle:{
           backgroundColor:Colors.hederup,
          
         },
         
        
        headerBackTitle:"الموقع",
        // headerBackImageSource:Images.backButton,
        headerBackTitleStyle:{
          fontFamily:Fonts.type.medium,
          
          
        },
        headerLargeTitleShadowVisible:true,
        
        
        headerTintColor:"#F5F5F5",
         
      })} />
      <Stack.Screen name="Zoomphoto" component={Zoomphoto} 
      options={({route,navigation})=>({
        headerTitle: Platform.OS==='android'? "عارض الصور":"",
        headerTransparent: true,
         headerStyle:{
           backgroundColor:Colors.hederup,
          
         },
         
        
        headerBackTitle:"عارض الصور",
        // headerBackImageSource:Images.backButton,
        headerBackTitleStyle:{
          fontFamily:Fonts.type.medium,
          
          
        },
        headerLargeTitleShadowVisible:true,
        
        
        headerTintColor:"#F5F5F5",
         
      })} />

      <Stack.Screen name="Poitment" component={Poitment} />
      <Stack.Screen name="BottomScreen" component={BottomScreen} />
      
      <Stack.Screen name="PrivecyScreen" component={PrivecyScreen}
      options={({route,navigation})=>({
        headerTitle: Platform.OS==='android'? "الخصوصيه":"",
        headerTransparent: true,
         headerStyle:{
           backgroundColor:Colors.hederup,
          
         },
         
        
        headerBackTitle:"الخصوصيه",
        // headerBackImageSource:Images.backButton,
        headerBackTitleStyle:{
          fontFamily:Fonts.type.medium,
          
          
        },
        headerLargeTitleShadowVisible:true,
        
        
        headerTintColor:"#F5F5F5",
         
      })} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} 
      options={({route,navigation})=>({
        headerTitle: Platform.OS==='android'? "حول التطبيق":"",
        headerTransparent: true,
         headerStyle:{
           backgroundColor:Colors.hederup,
          
         },
         
        
        headerBackTitle:"حول التطبيق",
        // headerBackImageSource:Images.backButton,
        headerBackTitleStyle:{
          fontFamily:Fonts.type.medium,
          
          
        },
        headerLargeTitleShadowVisible:true,
        
        
        headerTintColor:"#F5F5F5",
         
      })} />
      <Stack.Screen name="Babysetesrs" component={Babysetesrs} 
      options={({route,navigation})=>({
        headerTitle:Platform.OS==='android'? "اختيار الجليسة":"",
        headerTransparent: true,
         headerStyle:{
           backgroundColor:Colors.hederup,
          },
          headerBackTitle: "اختيار الجليسة",
        // headerBackImageSource:Images.backButton,
        headerBackTitleStyle:{
          fontFamily:Fonts.type.medium,
          },
        headerLargeTitleShadowVisible:true,
        headerTintColor:"#F5F5F5",
        headerRight:()=>{
          return(
              <HeaderBackButton  val={navigation}/>
              )  
        },
      })}/>

      <Stack.Screen name="BabysetesrsProfile" component={BabysetesrsProfile} 
       options={({route,navigation})=>({
        headerTitle:Platform.OS==='android'? route.params.settertTitle:"",
        headerTransparent: true,
         headerStyle:{
           backgroundColor:Colors.hederup,
          },
          headerBackTitle: route.params.settertTitle,
        // headerBackImageSource:Images.backButton,
        headerBackTitleStyle:{
          fontFamily:Fonts.type.medium,
          },
        headerLargeTitleShadowVisible:true,
        headerTintColor:"#F5F5F5",
        headerRight:()=>{
          return(
              <HeaderBackButton  val={navigation}/>
              )  
        },
      })}/>

      <Stack.Screen name="ConfirmRes" component={ConfirmRes} 
      options={({route,navigation})=>({
        headerTitle:Platform.OS==='android'? "ملخص الطلب":"",
        headerTransparent: true,
         headerStyle:{
           backgroundColor:Colors.hederup,
          },
          headerBackTitle: "ملخص الطلب",
        // headerBackImageSource:Images.backButton,
        headerBackTitleStyle:{
          fontFamily:Fonts.type.medium,
          },
        headerLargeTitleShadowVisible:true,
        headerTintColor:"#F5F5F5",
        headerRight:()=>{
          return(
              <HeaderBackButton  val={navigation}/>
              )  
        },
      })}/>
       <Stack.Screen name="Ewallet" component={Ewallet} />
      <Stack.Screen name="PaymentForm" component={PaymentForm} />
      <Stack.Screen name='Invoice' component={Invoice} 
       options={({route,navigation})=>({
        headerTitle:Platform.OS==='android'?"طلباتي":"",
        headerTransparent: true,
         headerStyle:{
           backgroundColor:Colors.hederup,
          },
          headerBackTitle: "طلباتي",
        // headerBackImageSource:Images.backButton,
        headerBackTitleStyle:{
          fontFamily:Fonts.type.medium,
          },
        headerLargeTitleShadowVisible:true,
        headerTintColor:"#F5F5F5",
        headerRight:()=>{
          return(
              <HeaderBackButton  val={navigation}/>
              )  
        },
      })}/>
    
      <Stack.Screen name='DDirctionMap' component={DDirctionMap}
        options={({route,navigation})=>({
        headerTitle:Platform.OS==='android'?"تنبيه بقرب الحاضنه":"",
        headerTransparent: true,
         headerStyle:{
           backgroundColor:Colors.hederup,
          },
          headerBackTitle: "تنبيه بقرب الحاضنه",
        // headerBackImageSource:Images.backButton,
        headerBackTitleStyle:{
          fontFamily:Fonts.type.medium,
          },
        headerLargeTitleShadowVisible:true,
        headerTintColor:"#F5F5F5",
        headerRight:()=>{
          return(
              <HeaderBackButton  val={navigation}/>
              )  
        },
      })}/>

      <Stack.Screen name='Shrtcutprofile' component={Shrtcutprofile} 
      options={({route,navigation})=>({
        headerTitle:Platform.OS==='android'? route.params.settertTitle:"",
        headerTransparent: true,
         headerStyle:{
           backgroundColor:Colors.hederup,
          },
          headerBackTitle: route.params.settertTitle,
        // headerBackImageSource:Images.backButton,
        headerBackTitleStyle:{
          fontFamily:Fonts.type.medium,
          },
        headerLargeTitleShadowVisible:true,
        headerTintColor:"#F5F5F5",
        headerRight:()=>{
          return(
              <HeaderBackButton  val={navigation}/>
              )  
        },
      })}/>

      <Stack.Screen name='WorkScreen' component={WorkScreen} 
      options={({route,navigation})=>({
        headerTitle:Platform.OS==='android'?"تنبيه بقرب الحاضنه":"",
        headerTransparent: true,
         headerStyle:{
           backgroundColor:Colors.hederup,
          },
          headerBackTitle: "نبيه بقرب الحاضنه",
        // headerBackImageSource:Images.backButton,
        headerBackTitleStyle:{
          fontFamily:Fonts.type.medium,
          },
        headerLargeTitleShadowVisible:true,
        headerTintColor:"#F5F5F5",
        headerRight:()=>{
          return(
              <HeaderBackButton  val={navigation}/>
              )  
        },
      })}/>
      <Stack.Screen name='Notifactionscreen' component={Notifactionscreen} 
      options={({route,navigation})=>({
        headerTitle:Platform.OS==='android'? "التنبيهات":"",
        headerTransparent: true,
         headerStyle:{
           backgroundColor:Colors.hederup,
          },
          headerBackTitle: "التنبيهات",
        // headerBackImageSource:Images.backButton,
        headerBackTitleStyle:{
          fontFamily:Fonts.type.medium,
          },
        headerLargeTitleShadowVisible:true,
        headerTintColor:"#F5F5F5",
        headerRight:()=>{
          return(
              <HeaderBackButton  val={navigation}/>
              )  
        },
      })}/>

      <Stack.Screen name='FinleScreeen' component={FinleScreeen}
      options={({route,navigation})=>({
        headerTitle:Platform.OS==='android'? "تقييم الحاضنه":"",
        headerTransparent: true,
         headerStyle:{
           backgroundColor:Colors.hederup,
          },
          headerBackTitle: "تقييم الحاضنه",
        // headerBackImageSource:Images.backButton,
        headerBackTitleStyle:{
          fontFamily:Fonts.type.medium,
          },
        headerLargeTitleShadowVisible:true,
        headerTintColor:"#F5F5F5",
        headerRight:()=>{
          return(
              <HeaderBackButton  val={navigation}/>
              )  
        },
      })}/>

      
      
    </Stack.Navigator>
  );
};



  function HomeTap() {
    return (
      <Tab.Navigator initialRouteName="Home"
        
      screenOptions={({route})=>({
        tabBarInactiveTintColor:"#9191A4",
        tabBarActiveTintColor:Colors.veryLightGray,
        
        tabBarIcon:({ focused,size,color }) => {
          
          let Iconname;
          if(route.name ==="Home"){
            Iconname="home";
            size=focused?28:22 ;
            color=focused? Colors.AminaButtonNew:"#9191A4"
          }else if (route.name ==="Favourite"){
            Iconname="hearto";
            size=focused?28:22;
            color=focused? Colors.AminaButtonNew:"#9191A4"
          }else if(route.name ==="Request"){
            Iconname="filetext1";
            size=focused?28:22;
             color=focused? Colors.AminaButtonNew:"#9191A4"
          }else if(route.name ==="Wallet"){
            Iconname="creditcard";
            size=focused?28:22;
             color=focused? Colors.AminaButtonNew:"#9191A4"
          }else if(route.name==="Notification"){
            Iconname="notification";
            size=focused?28:22;
             color=focused? Colors.AminaButtonNew:"#9191A4"
          }
          return(
            <AntDesign name={Iconname} size={size} color={color} />
          )
          
        },
        // tabBarActiveBackgroundColor:Colors.veryLightGray,
        
      tabBarLabelStyle:{
        fontFamily:Fonts.type.base
      },
      tabBarActiveTintColor:{
        fontcolor:Colors.agreen
      },
        tabBarShowLabel:true,
        tabBarStyle:{
         backgroundColor:Colors.AminabackgroundColor,
         
         borderTopColor:Colors.text,
         borderWidth:.5,
          paddingLeft:10,
          paddingRight:10
         }
  
      }) 
    } >
        <Tab.Screen name="Home" component={Home}
         
        options={({route,navigation})=>({
         tabBarLabel:"الرئيسية",
         headerShown:false,
         tabBarActiveTintColor:Colors.AminaButtonNew,
         headerTransparent: false,
         tabBarLabelStyle:{
          fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base,
          fontWeight:'700'
         }
        
         })}/>
        <Tab.Screen name="Favourite" component={Favourite}
         options={({rout})=>({
          tabBarLabel:"المفضلة",
          tabBarActiveTintColor:Colors.AminaButtonNew,
          headerShown:false,
          tabBarLabelStyle:{
            fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base,
            fontWeight:'700'
          }
         })}/>
        <Tab.Screen name="Request" component={Request} 
        options={({rout})=>({
          tabBarLabel: 'طلباتي',
          tabBarActiveTintColor:Colors.AminaButtonNew,
          headerShown:false,
          tabBarLabelStyle:{
            fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base,
            fontWeight:'700'
          }
        })}/>
  
        <Tab.Screen name="Wallet" component={Motherprofilw}
        
         options={({rout})=>({
          tabBarLabel: 'حسابي',
          tabBarActiveTintColor:'#214F5E',
          headerShown:false,
          tabBarLabelStyle:{
            fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base,
            fontWeight:'700'
          }
          
         })}/>
         </Tab.Navigator>
    );
  }



  ////

// function HomeScreen() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Home Screen</Text>
//       </View>
//     );
//   }
  
 
  
//   function AppScreen() {
//     return (
      
//         <Stack.Navigator>
//           <Stack.Screen name="Home" component={HomeScreen} />
//         </Stack.Navigator>
     
//     );
//   }

const Navigation = () => {
  
    const [isloding,setIsloding]=React.useState(true)
    const [userToken,setuserToken]=React.useState(false)
    //const [userToken,setuserToken]=React.useState(null)
    
  
    // const authContext =React.useMemo(()=>{
    //   return{ 
    //     sigin:()=>{
    //       setIsloding(false)
    //       setuserToken("asd")
    //     },
    //     singup:()=>{
    //       setIsloding(false)
    //      setuserToken("asd")
    //     },
    //     singout:()=>{
    //       setIsloding(true)
    //       setuserToken(null)
    //     },
    //     setfreshToken:(token)=>{
    //       setuserToken(token)
    //     }
    //   }
    // })
    
    // React.useEffect(()=>{
    //   setTimeout(()=>{
    //     setIsloding(false)
    //   },3000)
    // })
    // if(isloding){
    //   return(
    //     <Splash />
    //   )
    // }
    const {loading,loginbyphone,user,verify,regUser,home} = React.useContext(UserContext);
    return(
        
             
      <NavigationContainer>
        {!home?
        <Authflow /> 
        :
        <StackNav />}
      
    </NavigationContainer>

        
      
    
    )
   
  }
  
  
  export default Navigation;
  