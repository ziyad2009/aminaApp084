import {StyleSheet,I18nManager} from 'react-native'
import { Metrics,Colors, Fonts } from '../assets/Themes';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Metrics.HEIGHT,
      marginHorizontal: 16
    },
    item: {
      backgroundColor: Colors.transparent,
      padding: 20,
      marginVertical: 8
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff"
    },
    title: {
      fontSize: 18,
      fontFamily:Fonts.type.sembold,
      color:Colors.blacktxt,
      fontWeight:"500",
      lineHeight:30,
      textAlign:'center'
    },
    imagecross:{
        height:Metrics.HEIGHT*0.21,
        width:Metrics.WIDTH*0.343
    },
    ratingContainerStyle:{
       margin:2,
       padding:3,
       width:Metrics.WIDTH*0.343,
       
       
    }
  });
  
  export default styles;