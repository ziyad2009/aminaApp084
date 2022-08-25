import React from 'react';
import {Text, TouchableOpacity, StyleSheet,Platform} from 'react-native';
import {Metrics,Colors,Fonts} from '../../assets/Themes/'
const OutlaintButton = ({
  title,
  onPress,
  buttonColor,
  titleColor,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...buttonStyle,
        backgroundColor: buttonColor || Colors.AminaButtonNew,
      }}
      onPress={onPress}>
      <Text
        style={{...styles.title, ...textStyle, color: titleColor || '#fff'}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default OutlaintButton;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: Colors.white,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor:Colors.AminaButtonNew,
    borderWidth:1.5,
    borderRadius:10
  },
  title: {
    color:Colors.blacktxt,
    fontSize: 16,
    fontFamily:Platform.OS==='android'?Fonts.type.light:Fonts.type.base
  },
});