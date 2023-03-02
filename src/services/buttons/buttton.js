import React from 'react';
import {Text, TouchableOpacity, StyleSheet,Platform} from 'react-native';
import {Metrics,Colors,Fonts} from '../../assets/Themes/'
const CustomButton = ({
  title,
  onPress,
  buttonColor,
  titleColor,
  buttonStyle,
  textStyle,
  margnBtn,
  disabled
}) => {
  return (
    <TouchableOpacity
    
    disabled ={disabled}
      style={{
        ...styles.container,
        ...buttonStyle,
       
        backgroundColor: buttonColor || Colors.AminaButtonNew,
        marginTop: margnBtn ||20
      }}
      onPress={onPress}>
      <Text
        style={{...styles.title, ...textStyle, color: titleColor || '#fff',letterSpacing:1.5}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: Colors.AminaButtonNew,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: Platform.OS==='android'? '400':'500',
    fontFamily:Platform.OS==='android'?Fonts.type.light:Fonts.type.base,
    
  },
});
// ...
//     <>
//       <CustomButton
//         buttonColor="#536DFE"
//         title="SEND"
//         buttonStyle={{width: '90%', alignSelf: 'center'}}
//         textStyle={{fontSize: 20}}
//         onPress={() => console.log('I am the first button')}
//       />

//       <CustomButton
//         buttonColor="#4DB6AC"
//         titleColor="#000"
//         title="DONE"
//         buttonStyle={{width: '80%', alignSelf: 'center'}}
//         textStyle={{fontSize: 20}}
//         onPress={() => console.log('I am the second button')}
//       />

//       <CustomButton
//         buttonColor="#9C27B0"
//         titleColor="#FFF"
//         title="DONE"
//         buttonStyle={{width: '60%', alignSelf: 'center'}}
//         textStyle={{fontSize: 20}}
//         onPress={() => console.log('I am the third button')}
//       />

//       <CustomButton
//         buttonColor="transparent"
//         titleColor="#000"
//         title="CANCEL"
//         buttonStyle={{
//           width: '40%',
//           alignSelf: 'center',
//           borderWidth: 1,
//           borderColor: '#1c1c1c',
//           borderRadius: 6,
//         }}
//         textStyle={{fontSize: 20}}
//         onPress={() => console.log('I am the fourth button')}
//       />
//     </>
// ...

