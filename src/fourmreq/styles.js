
 
import {StyleSheet,I18nManager, Platform} from 'react-native'
import { Metrics,Colors, Fonts, widthPixel, heightPixel } from '../assets/Themes';

const styles = StyleSheet.create({
    container: {
        // width:Metrics.WIDTH,
        // height:Metrics.HEIGHT,
        alignItems: "center",
        justifyContent: "center"
    },
    splite:{
        borderBottomColor:'#337A91',
        borderWidth:1,
        width:Metrics.WIDTH*0.88,
        margin:10,
    },
    rightTex:{
        fontFamily:Fonts.type.light,
        color:Colors.black,
        fontWeight:'600',
        marginLeft:12,
        fontSize:18,
        textAlign:'center'
    },
    leftText:{
        fontFamily:Platform.OS==='android'?Fonts.type.light: Fonts.type.light,
        color:'#616171',
        fontWeight:'500',
        fontSize:12,
        alignContent:'flex-start',
        marginRight:8
    },
    framView:{
        flexDirection:'column' ,
         marginLeft:20,
         marginRight:20,
         borderColor:Colors.white,
         borderWidth:.2,
         marginTop:15,
         alignItems:'flex-start',
         backgroundColor:Colors.white,
         width:widthPixel(380),
         height:heightPixel(100)
    },
    datapicker:{

        flexDirection:'row',
        alignItems:'baseline',
        padding:2,
        // width:Metrics.WIDTH*0.399,
        // justifyContent:,
        // borderColor:"#214F5E",
        // borderWidth:1,
        // padding:2,
        // borderRadius:10 ,
        // //height:Metrics.HEIGHT*0.0353,
        // width:Metrics.WIDTH*0.3399,
     
    },
    datapicker2:{
        height:Metrics.HEIGHT*0.0353,
        width:Metrics.WIDTH*0.2299,
         padding:2,
       borderColor:"#214F5E",
    //    borderRadius:10,
    //    backgroundColor:Colors.white,
    //    borderWidth:1,
       justifyContent:'space-around'
    },
    icon:{
      marginLeft:Metrics.HEIGHT*0.0221,
       
  
      
    },
    timeView:{
          flexDirection:'row',
          padding:3,
          width:Metrics.WIDTH*0.353,
      //   justifyContent:"flex-start",
      //  // borderColor:"#214F5E",borderWidth:1,
      //   padding:3,
      //   borderRadius:10 ,
      //   //backgroundColor:'red',
      //   width:Metrics.WIDTH*0.383,
    },
    timeTex:{
        fontFamily:Fonts.type.base,
        fontSize:18,
        fontWeight:'400',
        color:"#2E2E2E",
        // alignItems:'flex-start',
        // paddingBottom:2
        
    },
    ddateTex:{
        fontFamily:Fonts.type.base,
        fontSize:18,
        fontWeight:'400',
        color:"#2E2E2E",
       // alignItems:'flex-start',
        //paddingBottom:2
        
    },
    mapTextView:{
        alignItems:'flex-start',
        flexDirection:'row',
        justifyContent:'space-between',
        //borderColor:"#214F5E",
        //borderWidth:1,
        padding:1,
        borderRadius:10 ,
        marginLeft:10,
        //height:Metrics.HEIGHT*0.0353,
        width:Metrics.WIDTH*0.8544,
        marginBottom:3
        
    },
    mapText:{
        fontFamily:Fonts.type.base,
        fontSize:14,
        fontWeight:'400',
        color:"#2E2E2E",
    },
    endButton:{
        backgroundColor:Colors.amin1Button1,
        alignItems:'center',
        alignContent:'center',
        width:Metrics.WIDTH*0.400,
        height:Metrics.HEIGHT*0.0621,
        marginTop:2,
        //marginLeft:0,
        //marginRight:Metrics.WIDTH*0.9
             borderRadius:10
      },
      endButton2:{
        backgroundColor:Colors.amin1Button1,
        alignItems:'center',
        alignContent:'center',
        width:Metrics.WIDTH*0.400,
        height:Metrics.HEIGHT*0.0621,
        marginTop:2,
        //marginLeft:0,
        //marginRight:Metrics.WIDTH*0.9
             borderRadius:10,
             borderWidth:1,
             borderColor:'#214F5E'
      },
      endButtonTxt:{
        justifyContent:'space-around',
        marginTop:3,
        fontFamily:Fonts.type.light,
        fontWeight:"400",
        color:Colors.AmonaButtontext,
        fontSize:20
      },

      endButtonTxt2:{
        justifyContent:'space-around',
        marginTop:3,
        fontFamily:Fonts.type.base,
        fontWeight:"400",
        color:Colors.blacktxt,
        fontSize:20
      },
      servidatVie:{
          marginBottom:8,
          //marginLeft:1,
         // marginRight:0,
          padding:10,
          borderColor:Colors.bloodOrange,
          borderWidth:1,
          borderRadius:14,
          alignItems:'stretch',
          width:Metrics.WIDTH*0.908,
          flexDirection:'column'
      },
      servidayall:{
        marginBottom:5,
        marginLeft:1,
        marginRight:1,
        padding:1,
        borderColor:Colors.bloodOrange,
        borderWidth:1,
        borderRadius:10,
        backgroundColor:Colors.transparent,
        width:Metrics.WIDTH*0.921,
        flexDirection:'column'
    },
      serrvdayView:{
          //alignItems:'flex-start',
         // justifyContent:'center',
          marginBottom:10,
          marginTop:10,
        //   marginLeft:3,
          marginRight:1,
            
          flexDirection:'row',
          backgroundColor:Colors.transparent,
          width:Metrics.WIDTH*0.118,
          height:Metrics.HEIGHT*0.0321,
          borderRadius:5,
          borderColor:'#214F5E',
          borderWidth:.6

      },
      serrvdayText:{
          fontSize:12,
          fontWeight:'400',
          alignSelf:'center',
          fontFamily:Fonts.type.base,
          color:'#214F5E',
          marginLeft:2
          
           
      },
      serrvnumberView:{
            // alignSelf:'center',
          //alignItems:'center',
          
          marginLeft:3,
          marginRight:2,
          borderRadius:20,
          borderColor:Colors.text,
          borderWidth:.7,
          backgroundColor:'#214F5E',
          height:30,width:30
      },
      serrvnumberText:{
         fontSize:10,
         color:Colors.white,
         marginTop:8,
         alignSelf:'center'

      },
      serrvtimesView:{
        //alignItems:'flex-start',
         justifyContent:'center',
        marginBottom:10,
        marginTop:10,
      //   marginLeft:3,
        marginRight:1,
          
        flexDirection:'row',
        backgroundColor:Colors.transparent,
        width:Metrics.WIDTH*0.118,
        height:Metrics.HEIGHT*0.0321,
        borderRadius:5,
        borderColor:'#214F5E',
        borderWidth:.6

    },
    serrvtimesText:{
        fontSize:12,
        fontWeight:'400',
        alignSelf:'center',
        fontFamily:Fonts.type.base,
        color:'#214F5E',
        marginLeft:2
        
         
    },
     // Style for iOS ONLY...
  datePicker: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Metrics.WIDTH ,
    height: Metrics.HEIGHT*0.3921,
    display: 'flex',
    backgroundColor:Colors.transparent
    
  },
 


});
  
export default styles;