
import {StyleSheet,I18nManager, Platform} from 'react-native'
import { Metrics,Colors, Fonts } from '../assets/Themes';

const styles = StyleSheet.create({
    wrapper: {
      backgroundColor:Colors.AminabackgroundColor,
     
       marginBottom:2,
       marginTop:Platform.OS==='android'?1: 20,
      // marginHorizontal:30,
        alignItems:'center',
        
    },
  slide1: {
    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
   
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  title:{
    color: Colors.blacktxt,
    fontSize: 18,
    fontWeight: '600',
    fontFamily:Platform.OS==='android'?Fonts.type.medium:Fonts.type.base
  },
  imagHome:{
   // justifyContent:'center',
   marginLeft:3,marginRight:3,
   width:Metrics.WIDTH*0.843,
   height:Metrics.HEIGHT*0.1192,
   marginRight:20,
   marginLeft:10,
   marginTop:5
  },
  ratingContainerStyle:{
    margin:5,
    padding:10
 },
 icon:{
  marginLeft:3,
  marginRight:2
},
  })
  export default styles;