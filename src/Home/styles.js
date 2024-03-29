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
      marginLeft:2,
      borderRadius:10,
      borderColor:Colors.AminaButtonNew,
      borderWidth:.2,
      height:Metrics.HEIGHT*0.2151,
     justifyContent:'flex-end'
      //marginVertical: 8
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff"
    },
    title: {
      fontSize: 12,
      fontFamily:Platform.OS==='android'? Fonts.type.bold:Fonts.type.bold,
      color:Colors.blacktxt,
      fontWeight:'200',
      textAlign:'center',
      marginTop:5
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
        
    },
    slideContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    image: {
      width: 200,
      height: 200,
    },
    title: {
      fontSize: 24,
      marginTop: 16,
    },
    text: {
      fontSize: 16,
      marginTop: 8,
    },
  });
  
  export default styles;