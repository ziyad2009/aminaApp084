import {StyleSheet,I18nManager} from 'react-native'
import { Metrics,Colors, Fonts } from '../assets/Themes';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop:Platform.OS==='android'?55:10 ,
        backgroundColor:Colors.AminabackgroundColor,
        
      },
      label: {
        color: 'black',
        paddingBottom: 20,
        fontSize: 20
      },
      maskedInput: {
        borderWidth: 2,
        borderRadius: 6,
        width: '80%',
        padding: 12,
        color: 'black',
        fontSize: 20
      },
      endButton:{
        backgroundColor:Colors.amin1Button1,
        alignItems:'center',
        
        justifyContent:'center',
        width:Metrics.WIDTH*0.400,
        height:Metrics.HEIGHT*0.0651,
        marginTop:2,
        //marginLeft:0,
        //marginRight:Metrics.WIDTH*0.9
             borderRadius:10
      },
      endButtonTxt:{
        justifyContent:'space-around',
        marginTop:3,
        fontFamily:Fonts.type.light,
        fontWeight:"400",
        color:Colors.AmonaButtontext,
        fontSize:20
      },
      inputBasic: {
        marginVertical: 8,
        fontSize: 18,
        borderWidth: 1,
        backgroundColor:Colors.veryLightGray,
        borderColor: '#cdcdcd',
        paddingHorizontal: 12,
        height: Metrics.HEIGHT*0.05582,
        width:Metrics.WIDTH*0.8582
      },
     
      billMaintext:{
        fontFamily:Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold,
        color : Colors.AminaButtonNew ,
        fontSize:22
      },
      billRighttext:{
        fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base,
        fontWeight:'400',
        color : Colors.black ,
        fontSize:15,
        marginStart:10,
        marginTop:2,
       

      },
      billLifttext:{
        fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base,
        fontWeight:'800',
        color : Colors.black ,
        fontSize:15,
        marginStart:10,
        marginTop:2,
       

      }
})
export default styles;