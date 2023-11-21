import { Platform, StyleSheet, I18nManager } from "react-native";
import{Metrics,Fonts,Colors}from '../assets/Themes/'
import { color } from "react-native-reanimated";
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
     width: Metrics.WIDTH ,
      height: Metrics.HEIGHT *0.6332  ,
      borderBottomLeftRadius:88,
      borderBottomRightRadius:88,
      //borderRightColor:Colors.black,
     // borderLeftColor:Colors.black,
      borderWidth:1,
      backgroundColor:Colors.red
     // marginTop: Metrics.HEIGHT*0.0912,
    },
    introTextStyle: {
     // margin:1,
      fontSize: 18,
      color: Colors.black,
      textAlign: 'center',
      //paddingVertical: 30,
      fontFamily:Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.aminafonts,
      fontWeight:'400',
    },

    introTitleStyle: {
      fontSize: 30,
      fontFamily:Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base,
      color: Colors.textZahry,
      textAlign: 'center',
      fontWeight:'700',
      marginTop:1,
      marginBottom: 1,
      fontWeight:Platform.OS==='android'?'100':'700',
     // backgroundColor:"red"
    },
    paginationContainer: {
      ...StyleSheet.absoluteFillObject,
      // position: 'absolute',
      // bottom: 16,
      // left: 16,
      // right: 16,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)'
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
    buttonCircle: {
      width: 66,
      height: 37,
      backgroundColor: Colors.AminaPinkButton,
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
       
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    fadingContainer: {
      padding: 20,
      backgroundColor: Colors.AminabackgroundColor,
    },
    fadingText: {
      fontSize: 28,
    },
    buttonRow: {
      flexBasis: 100,
      justifyContent: 'space-evenly',
      marginVertical: 16,
    },
    lottie:{
      height:100,
      width:100
    }
  });

  export default styles;