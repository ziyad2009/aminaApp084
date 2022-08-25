import { Platform, StyleSheet, I18nManager } from "react-native";
import{Metrics,Fonts,Colors}from '../assets/Themes/'
const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      fontFamily:Fonts.type.aminafontsold
    },
    highlight: {
      fontWeight: '700',
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      padding: 10,
      justifyContent: 'center',
    },
    titleStyle: {
      padding: 10,
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
    },
    paragraphStyle: {
      padding: 20,
      textAlign: 'center',
      fontSize: 16,
    },
    introImageStyle: {
     width: Metrics.WIDTH*0.7872,
      height: Metrics.HEIGHT*0.292,
      marginTop: Metrics.HEIGHT*0.212,
    },
    introTextStyle: {
      margin:3,
      fontSize: 18,
      color: '#214F5E',
      textAlign: 'center',
      //paddingVertical: 30,
      fontFamily:Platform.OS==='android'?Fonts.type.sembold: Fonts.type.aminafonts,
      fontWeight:'400',
     
      
    },
    introTitleStyle: {
      fontSize: 30,
      fontFamily:Platform.OS==='android'?Fonts.type.sembold: Fonts.type.aminafonts,
      color: '#2E2E2E',
  
      textAlign: 'center',
      marginTop:20,
      marginBottom: 1,
      fontWeight:Platform.OS==='android'?'bold':'700',
     // backgroundColor:"red"
    },
    paginationContainer: {
      position: 'absolute',
      bottom: 16,
      left: 16,
      right: 16,
    },
    paginationDots: {
      height: 16,
      margin: 16,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dot: {
      width: 30,
      height: 7,
      borderRadius: 5,
      marginHorizontal: 4,
    },
    endButton:{
      backgroundColor:Colors.amin1Button1,
      alignItems:'center',
      alignContent:'center',
      width:Metrics.WIDTH*0.800,
      height:Metrics.HEIGHT*0.0621,
      //marginLeft:0,
      //marginRight:Metrics.WIDTH*0.9
           borderRadius:10
    },
    endButtonTxt:{
      justifyContent:'space-around',
      marginTop:3,
      fontFamily:Fonts.type.aminafonts,
      fontWeight:"500",
      color:Colors.AmonaButtontext,
      fontSize:20
    },
  });

  export default styles;