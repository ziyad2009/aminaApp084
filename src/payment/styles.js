import {StyleSheet,I18nManager} from 'react-native'
import { Metrics,Colors, Fonts } from '../assets/Themes';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
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
        alignContent:'center',
        width:Metrics.WIDTH*0.400,
        height:Metrics.HEIGHT*0.0621,
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
})
export default styles;