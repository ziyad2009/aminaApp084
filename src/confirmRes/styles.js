
import {StyleSheet,I18nManager} from 'react-native'
import { Metrics,Colors, Fonts } from '../assets/Themes';

const styles = StyleSheet.create({
    container: {
        // width:Metrics.WIDTH,
        // height:Metrics.HEIGHT,
        alignItems: "center",
        justifyContent: "center"
    },

    mainTex:{
        fontFamily:Platform.OS==='android'?Fonts.type.medium:Fonts.type.base,
        fontSize:18,
        fontWeight:'500',
        color:"#2E2E2E",
        marginStart:10,
        padding:2

    },
    allText:{
        fontFamily:Platform.OS==='android'?Fonts.type.medium:Fonts.type.base,
        fontSize:18,
        fontWeight:'600',
        padding:2
        
    },
    leftText:{
        fontFamily:Platform.OS==='android'?Fonts.type.medium:Fonts.type.base,
        fontSize:18,
        fontWeight:'400',
        padding:2
        
    },
    rightTex:{
        fontFamily:Platform.OS==='android'?Fonts.type.aminafonts:Fonts.type.base,
        fontSize:18,
        fontWeight:'300',
      textAlign:"left",
        backgroundColor:Colors.transparent,
        width:Metrics.WIDTH*0.482,
        padding:2
        
    }

})

export default styles;