
import React from 'react';
import { Box ,Stack,Text,Heading} from 'native-base';
import {Fonts} from '../assets/Themes/'
const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    // <Box className={isDanger ? 'countdown danger' : 'countdown'}></Box>
    <Box  flexDirection={'row'} alignItems='baseline'>
      {isDanger&&
      <Stack flexDirection={'row'}><Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base}
          fontSize={10} letterSpacing={1.2} > {value}</Text>
    <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base}
          fontSize={10} letterSpacing={1.2}  >{type}</Text>
          </Stack>}
    
  </Box>
    
  );
};

export default DateTimeDisplay;