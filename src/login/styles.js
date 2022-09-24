import { Platform, StyleSheet, I18nManager } from "react-native";
import { Fonts, Metrics, Colors,ApplicationStyles } from "../assets/Themes/";

const styles = StyleSheet.create({
inputFieldSec: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT * 0.0950,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop:Metrics.HEIGHT*0.0852
  },
  mainlogo:{
    alignItems:'center',
    marginTop:Metrics.HEIGHT*0.132,
    marginBottom:10,
    borderColor:"black",
    borderWidth:0,
    width:Metrics.WIDTH*0.360,
     height:Metrics.HEIGHT*0.0920
  },
  labetText:{
      alignSelf:'center',
      fontFamily:Platform.OS==='android'?Fonts.type.medium:Fonts.type.base,
      fontSize:20,
      fontWeight:'400',
      color:'#2E2E2E',
      marginBottom:1 ,
      height:Metrics.HEIGHT*0.0361
  },
  loginButton:{
    backgroundColor:Colors.amin1Button1,
    alignItems:'center',
    alignContent:'center',
    width:Metrics.WIDTH*0.800,
    height:Metrics.HEIGHT*0.0640,
    marginTop:20,
    padding:3,
    //marginRight:Metrics.WIDTH*0.9
         borderRadius:10
  },
  endButtonTxt:{
      paddingTop:2,
    justifyContent:'space-around',
    marginTop:3,
    fontFamily:Fonts.type.base,
    fontWeight:"500",
    color:Colors.AmonaButtontext,
    fontSize:20
  },

})

export default styles;