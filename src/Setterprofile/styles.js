
import {StyleSheet,I18nManager} from 'react-native'
import { Metrics,Colors, Fonts, pixelSizeVertical } from '../assets/Themes';

const styles = StyleSheet.create({
    wrapper: {
      
    //  // height:Metrics.HEIGHT*0.0512,
    //   backgroundColor:'black',
    //   width:Metrics.WIDTH*0.572,
    //   height:Metrics.HEIGHT*0.002312,
    //    marginBottom:2,
    //    marginTop:20,
    //   // marginHorizontal:30,
        alignItems:'center'
    },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    
  },
  // imagHome:{
  //  // justifyContent:'center',
  //  marginLeft:3,marginRight:3,
  //  width:Metrics.WIDTH*0.813,
  //  height:Metrics.HEIGHT*0.3192,
  //  marginRight:10,
  //  marginLeft:10,
  //  marginTop:5
  // },
  imagHome:{
      
    width: 150,
    height:150 ,
    resizeMode:'cover',
    borderColor:Colors.yellow,
    borderWidth:.2,
    borderRadius:44,
    flexBasis: 'auto',
    margin:4,
    backgroundColor:Colors.transparent
    
   },
   imagHomefullLength:{
    flex:1/2,
    width: Metrics.WIDTH*0.6211,
    height:Metrics.HEIGHT*0.1492 ,
    resizeMode:'stretch',
    borderColor:Colors.gray,
    borderWidth:.2,
    borderRadius:30,
    //alignItems:'center',
    flexGrow: 0,
    flexShrink: 1,
    margin:2
    
   },
   containerimage: {
  
   // flexGrow: 0,
    //flexShrink: 1,
    alignItems: 'center',
    justifyContent:'space-around',
    backgroundColor:Colors.transparent,
    paddingTop: 1,
    marginVertical: pixelSizeVertical(3),
    
  },
  buttonViewimage: {
   position:'absolute',
   left:1,
   bottom:3,
    
  },
  })
  export default styles;