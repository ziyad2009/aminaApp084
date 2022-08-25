
import {StyleSheet,I18nManager} from 'react-native'
import { Metrics,Colors, Fonts } from '../assets/Themes';

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
    fontWeight: 'bold'
  },
  imagHome:{
   // justifyContent:'center',
   marginLeft:3,marginRight:3,
   width:Metrics.WIDTH*0.813,
   height:Metrics.HEIGHT*0.3192,
   marginRight:10,
   marginLeft:10,
   marginTop:5
  }
  })
  export default styles;