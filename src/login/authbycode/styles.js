import { Platform, StyleSheet, I18nManager } from "react-native";
import { Fonts, Metrics, Colors } from "../../assets/Themes/";

const styles = StyleSheet.create({
    contaner:{
        backgroundColor:Colors.white,
        alignItems:'center',
        flex:1
    },
    mainlogo:{
        alignItems:'center',
        marginTop:Metrics.HEIGHT*0.132,
        marginBottom:10,
        borderColor:"black",
        borderWidth:0,
        width:Metrics.WIDTH*0.910,
         height:Metrics.HEIGHT*0.230
      },
      labetText:{
          //paddingTop:10,
        alignSelf:'center',
        fontFamily:Fonts.type.base,
        fontSize:18,
        fontWeight:'500',
        color:'#2E2E2E',
        marginBottom:1 ,
        height:Metrics.HEIGHT*0.0361
    },
    loginButton:{
        backgroundColor:Colors.amin1Button1,
        alignItems:'center',
        alignContent:'center',
        width:Metrics.WIDTH*0.800,
        height:Metrics.HEIGHT*0.0740,
        marginTop:20,
        padding:3,
        //marginRight:Metrics.WIDTH*0.9
             borderRadius:10
      },
      endButtonTxt:{
      paddingTop:4,
      justifyContent:'space-around',
      marginTop:3,
      fontFamily:Fonts.type.base,
      fontWeight:Platform.OS==='android'?"500":null,
      color:Colors.Milky,
      fontSize:18
    },
    timerText:{
      fontFamily:Fonts.type.sembold,
      fontSize:18,
      fontWeight:"400",
      color:"#2E2E2E"
    },
})
export default styles;