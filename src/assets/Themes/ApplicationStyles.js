import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors';
 

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android
const backgroundColorTemplate={
  bg:"violet.100",
  bg1:"violet.400",
  bg2:"violet.800",
  secondary:'secondary.300',
  secondary50:'secondary.50',
  sexondry:"#f472b6",
  danger:'#881337',
  erorr:'#dc2626',
  warning:"#ea580c",
  warning1: 'warning.300',
  lightpink:"#f472b6",
  cyan:"#ecfeff",
  muted:"#525252",
  muted2:"#262626",
  transparent:Colors.transparent
}
const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.transparent
    },
    bacgroundScreens:{
      backgroundColor:backgroundColorTemplate.bg1
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin,
      backgroundColor: Colors.transparent
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.snow,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center'
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    titleText: {
      ...Fonts.style.h2,
      fontSize: 14,
      color: Colors.red,
    },
    mutedTex:{
      color1: backgroundColorTemplate.muted,
      color2:backgroundColorTemplate.muted2
    },
    mainScreenBackground:{
      color:backgroundColorTemplate.transparent
    }
  },
  
  buttonTex:{
    dangerBt:Colors.white
  },
  mainButton:{
    backgroundColor: Colors.banner,
    borderRadius: Metrics.HEIGHT * 0.04,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: Metrics.WIDTH * 0.84,
    height: Metrics.HEIGHT * 0.08
  },

  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.baseMargin
  },

  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  },

  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  
  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: .02,
    borderColor: Colors.bloodOrange,
    alignItems: 'center',
    textAlign: 'center'
  },
  alretMsg:{
      backgroundColor: backgroundColorTemplate.bg1,
      padding: Metrics.smallMargin,
      marginTop: Metrics.smallMargin,
      marginHorizontal: Metrics.baseMargin,
      borderWidth: .2,
      borderColor: Colors.lightgrey,
      alignItems: 'center',
      textAlign: 'center'
  
  },
  fontApp:{
    fontFamily:Fonts.type.LatoBold
  }
}

export default ApplicationStyles
