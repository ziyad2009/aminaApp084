const calclutDiff=()=>{ 
    const startShiftTime = moment(time, 'hh:mm:ss');
    const endShiftTime = moment(time2, 'hh:mm:ss');
    
    if (startShiftTime.isAfter(endShiftTime)){
        endShiftTime.add(1, 'days');
      }
    
    const duration = moment.duration(endShiftTime.diff(startShiftTime)) ;
    
    // console.log('as hours: ' + duration.asHours(), 'as minutes: ' + duration.asMinutes());
     console.log('hours: ' +Math.floor(duration.asHours()), 'minutes: ' );
     
    // return (`${duration.hours()}  hours:  ${duration.minutes()} minutes: ` );
    return(
        <Box alignItems={'flex-end'} flexDirection='row' ml={5} backgroundColor={'amber.200'} >
            <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} fontWeight='400' >{Math.floor(duration.asHours()) } ساعات </Text>
            <Text fontFamily={Platform.OS==='android'?Fonts.type.aminafonts: Fonts.type.base} fontWeight='400' >{ Math.floor(duration.minutes())==="59"?"0": Math.floor(duration.minutes())  } دقائق </Text>
        </Box>
    )
    }   