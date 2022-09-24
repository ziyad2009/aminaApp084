import {StyleSheet,I18nManager,Platform} from 'react-native'
import { Metrics,Colors, Fonts } from '../assets/Themes';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Metrics.HEIGHT,
      marginHorizontal: 16
    },
    item: {
      backgroundColor: Colors.transparent,
      padding:1,
      marginLeft:10,
      borderRadius:10,
      borderColor:Colors.AminaButtonNew,
      borderWidth:.8,
      height:Metrics.HEIGHT*0.2151,
     justifyContent:'space-around'
      //marginVertical: 8
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff"
    },
    title: {
      fontSize: 14,
      fontFamily:Platform.OS==='android'? Fonts.type.bold:Fonts.type.base,
      color:Colors.blacktxt,
      
      textAlign:'center'
    },
    title2: {
      fontSize: 14,
      fontFamily:Platform.OS==='android'? Fonts.type.aminafonts:Fonts.type.base,
      color:Colors.blacktxt,
      fontWeight:"500",
      textAlign:'center'
    },
    imagecross:{
      marginTop:1,
        height:Metrics.HEIGHT*0.09021,
        width:Metrics.WIDTH*0.273
    },
    ratingContainerStyle:{
        backgroundColor:Colors.transparent,
        
    }
  });
  
  export default styles;