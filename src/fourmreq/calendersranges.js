import * as React from 'react';
import { Alert, Platform, SafeAreaView, View } from 'react-native';

import { Form, FormItem, Picker, PinInput } from 'react-native-form-component';
import { Fonts ,Metrics,Colors,fontPixel} from '../assets/Themes';
import {Calendar,CalendarList, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';

const MonthlyBoking=(props)=> {
    const [selected, setSelected] = React.useState('');
    const [currentDay,setcurrentDay]=React.useState(new Date)
    const [markedDates, setMarkedDates] =React.useState({
        '2023-09-16': {textColor: 'green'},
        '2023-09-17': {startingDay: true, color: 'green'},
        '2023-09-18': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
        '2023-09-19': {disabled: true, startingDay: true, color: 'green', endingDay: true}
      })

    const handleDayPress = (day) => {
        setMarkedDates({
          [day.dateString]: {
            startingDay: true,color: 'green'
          },
          [moment(day.dateString).add(1, 'days').format('YYYY-MM-DD')]: {
            color: 'green'
          },
          [moment(day.dateString).add(2, 'days').format('YYYY-MM-DD')]: {
            color: 'green'
          },
          [moment(day.dateString).add(3, 'days').format('YYYY-MM-DD')]: {
            endingDay: true,color: 'green'
          }
        })
      }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:Colors.AminabackgroundColor, padding: 24 }}>
      <View style={{ padding: 24 ,marginTop:Platform.OS==='android'? 18:1}}>
      <Calendar
      theme={{
        backgroundColor: "#ffffff",
        calendarBackground: "#ffffff",
        todayTextColor: "#57B9BB",
        dayTextColor: "#222222",
        textDisabledColor: "#d9e1e8",
        monthTextColor: "#57B9BB",
        arrowColor: "#57B9BB",
        textDayFontWeight: "300",
        textMonthFontWeight: "bold",
        textDayHeaderFontWeight: "500",
        textDayFontSize: 1,
        textMonthFontSize: 2,
        selectedDayBackgroundColor: "#57B9BB",
        selectedDayTextColor: "white",
        textDayHeaderFontSize: 8
      }}
        onDayPress={day => {
            setSelected(day.dateString);
            console.log('selected day', day);
        }}
       // minDate={String(new Date())}
         onDayLongPress={handleDayPress}
         
        markedDates={{
            [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
        }}
    />
      </View>
    </SafeAreaView>
  );
}

export default MonthlyBoking;