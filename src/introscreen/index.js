

import React,{useState, useContext} from 'react';
 
import {
  SafeAreaView,Image,
  Text,TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,Fonts,Metrics
} from '../assets/Themes/';
import styles from './styles'
import AppIntroSlider from 'react-native-app-intro-slider';
import UserProvider, { UserContext } from '../services/UserContext';
 


const slides = [
  {
    key: 1,
    title: 'تطبيق امينه',
    text: 'مجموعة مميزة من الحاضنات والجليسات بإنتظار طفلك.. اِنضمي إلينا الآن لبدء الخدمة',
    image: require('../assets/images/1.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'تطبيق امينه',
    text: 'سنقوم بإختيار الحاضنة أو الجليسة المناسبة لطفلك بعد إدخالك للبيانات المطلوبه خلال وقت قصير',
    image: require('../assets/images/2.png'),
    backgroundColor: '#E5E5E5',
  },
  {
    key: 3,
    title: 'تطبيق امينه',
    text: 'سنقوم باختيار الجليسة او الحاضنه المناسبه لطفلك فقط ادخلي البينات المطلوبة خلال وقت قصير',
    image: require('../assets/images/3.png'),
    backgroundColor: '#22bcb5',
  }
];


const IntroScreen =(props) => {
   
  const {tryGetUser} = useContext(UserContext);
 
 const [goButton,setGoButton]=useState(false)
  const onDone = () => {
   //()=> setshowRealAppval(true);
   console.log("fdd")
  };
  
  const onSkip = () => {
    setshowRealAppval(true);
  };
  
  const  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={{fontSize:24,color:"black",margin:10}}>next</Text>
      </View>
    );
  };
  const moveSlide=()=>{
    console.log('Test')
    this.slider?.goToSlide(i, true)
  }

  const _renderDoneButton = () => {
    return (
      <TouchableOpacity onPress={()=>console.log("test")} style={styles.buttonCircle}>
        <Text style={{fontSize:24,color:"black"}} >Skip</Text>
      </TouchableOpacity>
    );
  };
  const _renderPagination = (activeIndex= Number) => {
    return (
      <View style={styles.paginationContainer}>
        <SafeAreaView>
          <View style={styles.paginationDots}>
            {slides.length > 1 &&
              slides.map((_, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.dot,
                    i === activeIndex
                      ? {backgroundColor: 'white'}
                      : {backgroundColor: 'rgba(0, 0, 0, .2)',width:10},
                  ]}
                  onPress={() => moveSlide()}
                />
                 
              ))}
          </View>
          <View style={{alignItems:'center',backgroundColor:Colors.transparent,marginBottom:Metrics.HEIGHT*0.0971}}>
            {goButton?
            < TouchableOpacity onPress={()=>props.navigation.push('Singin')}   
              style={styles.endButton}>
            <Text style={styles.endButtonTxt}>هيا نبداء</Text>
          </TouchableOpacity>:
           
          < TouchableOpacity onPress={()=>props.navigation.push('Singin') } 
          style={{alignSelf:'center'}} >
          <Text style={{ justifyContent: 'center',fontFamily:Fonts.type.base,fontWeight:"800",color:"#214F5E",fontSize:20}}>تخطي</Text>
        </TouchableOpacity> 
          }
         
            
        </View>
        </SafeAreaView>
      </View>
    );
  };

  const RenderItem = ({item}) => {
    return (
      <View onTouchEnd={ ()=>{
        if(item.key===3 ){
          setGoButton(true)
        }else{setGoButton(false)} 
        }}
        style={{
          flex: 1,
          backgroundColor: Colors.AminabackgroundColor,
          alignItems: 'center',
          marginRight:10
        }}>
          <Image
          style={styles.introImageStyle}
          source={item.image} resizeMode='stretch' />
          
        <Text style={styles.introTitleStyle}>
          {item.title}
        </Text>
        
        <Text style={styles.introTextStyle}>
          {item.text}
        </Text>
      </View>
    );
  };

     return(
      <View style={{height:Metrics.HEIGHT,width:Metrics.WIDTH ,backgroundColor:Colors.white}}>
      <AppIntroSlider
         data={slides}
         renderItem={RenderItem}
         onDone={onDone}
         renderPagination={_renderPagination}
         //showSkipButton={true}
          onSkip={onSkip}
        //  renderDoneButton={_renderDoneButton}
        //  renderNextButton={_renderNextButton}
       />
     </View>
     )
    };



export default IntroScreen;