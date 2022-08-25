import { Platform, StyleSheet } from "react-native";
import { Metrics, Fonts, Colors } from "../assets/Themes/";

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: Colors.snow,
    marginTop:Platform.OS==='android'?55:80
  },

  HeaderBg: {
    backgroundColor: Colors.white,
    ...Platform.select({
      ios: { height: Metrics.HEIGHT * 0.12 }
    })
  },

  left: {
    flex: 0.1
  },

  body: {
    flex: 4
  },

  right: {
    flex: 0.1
  },

  titleText: {
    color: "#C2C4CA",
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    fontSize: Fonts.moderateScale(16),
    padding: 15
  },

  searchText: {
    color: "#4A4A4A",
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(16),
    paddingBottom: 10
  },

  recommandedMainRow: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center"
  },

  itemImg: {
    height: Metrics.HEIGHT * 0.12,
    width: Metrics.HEIGHT * 0.16,
    borderRadius: 5
  },

  infoMainView: {
    paddingLeft: 15,
    width: Metrics.WIDTH * 0.65
  },

  itemName: {
    color: "#262628",
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    fontSize: Fonts.moderateScale(16)
  },

  address: {
    color: "#9B9B9B",
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(14)
  },

  ratingStar: {
    height: 15,
    width: 15,
    marginRight: 5
  },

  reviewText: {
    color: "#9B9B9B",
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(12),
    marginLeft: 10
  }
});

export default styles;
