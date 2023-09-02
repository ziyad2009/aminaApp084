
import React from 'react';
import { useCountdown } from '../services/useCountdown';
 import { Box ,Heading,Stack,Text} from 'native-base';
import DateTimeDisplay from './DateTimeDisplay';
import { Fonts, Metrics,Colors, fontPixel } from '../assets/Themes/';
 import AntDesign  from 'react-native-vector-icons/AntDesign'
 
const CountdownTimer =  ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

const ExpiredNotice = () => {
    return (
        // <div className="expired-notice">
     <Box alignItems='center' flexDirection={'column'}>
        <Stack flexDirection={'row'} alignItems='baseline'>
          <AntDesign name='exclamationcircleo' size={15} color={Colors.black}  style={{marginRight:3}}/>
          <Text flexWrap={'wrap'} color={Colors.error} fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base}
            fontSize={12} >عفوا! وقت الخدمة قد بداء</Text>
        </Stack>
        
         
      </Box>
    );
  };

  const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
        
      <Box    flexDirection='column'   alignItems='baseline'   >
        
        {/* <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} /> */}

             {/* <Text fontFamily={Platform.OS==='android'?Fonts.type.regular: Fonts.type.regular} fontSize={fontPixel(12)}
              textAlign='right' >
             الوقت المتبقي على بدء الخدمة</Text> */}
                <Stack flexDirection={'row'} justifyContent='space-around'>
                <DateTimeDisplay value={days} type={'يوم'} isDanger={false} />
                <DateTimeDisplay value={hours} type={'ساعه'} isDanger={true} />
                <DateTimeDisplay value={minutes} type={'دقائق'} isDanger={true} />

                </Stack>
                
            
         

 
          {/* <Text>:</Text>
          <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} /> */}
 
        
      </Box>
    );
  };
  

export default CountdownTimer;