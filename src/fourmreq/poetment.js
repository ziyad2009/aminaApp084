import React ,{useState,useEffect}from 'react';
import {View, Pressable, Platform,Image,TouchableOpacity,SafeAreaView, Alert} from 'react-native';
import{Button,Modal,Center,Text,Box, Stack,Checkbox} from 'native-base';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import { Colors ,Metrics, Fonts, Images, fontPixel, heightPixel} from '../assets/Themes/';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import styles from './styles'
import AnimatedLoader from 'react-native-animated-loader';


let DataHolder;
let decrption=''
const Poitment=(props)=>{
  const[selecttext,setselecttext]=useState(1)
  const[selectname,setselectname]=useState('يومي')
  const[selectType,setselectType]=useState(false)
  const [selected, setSelected] = React.useState('');
  const[showCalender,setShowcalender]=useState(true)
  const[showTimebox,setShowTimebox]=useState(false)
  const[startDate,setstartDate]=useState(moment(new Date).format("YYYY-MM-DD"))
  const[endtDate,setSecndtDate]=useState(moment(new Date).format("YYYY-MM-DD"))
      const[showSecondDay,sethowSecondDay]=useState(false)  
      const [datePicker, setDatePicker] = useState(false);
      const [dateTime, seTime] = useState(new Date(Date.now()));
      const [dateTime1, seTime1] = useState(new Date(Date.now()))
      const[changTime1,setchangTime1]=useState(false)  
      const [changeTime2, setchangTime2] = useState(false);
      const[ready,setReady]=useState(false)
      const[dayTotal,setdayTotal]=useState('')
     const today = moment().format("YYYY-MM-DD");
  const [visible,setvisible]=useState(false)
      const slideType=[
        {"id":1,
        "name":"يومي",
        },
        {"id":2,
        "name":"اسبوعي"
        },
        {
          "id":3,
        "name":"شهري"
        }
    ]

   
  const selectPackege=(id,name)=>{
    decrption=''
    console.log(name)
    setselecttext(id)
    setselectname(name)
  }
   
    
    const handleDayPress = (day) => {
 
        console.log("test long ",day)
      }
    
      

 
      const workday_count=( start,end,workWithWeekend)=> {
        let calcDone=false
        let calccType=false
        let typePrice=0
        let price=0
        var Start = moment(start);
        var End = moment(end);
    
        const timedate =moment(start).format("YYYY-MM-DD")
        // var timeStart=moment(`${timedate} 08:50:35`) 
        // var timeToEnd= moment(`${timedate} 14:50:35`) 
        var timeStart=moment(dateTime) 
        var timeToEnd= moment(dateTime1) 
       //if order is one day start ccalclute for daily if odrer is more one day then ccalclut for week or mmonth
       if(Start.isSame(End)){
        console.log("is samme day")
       
        const startShiftTime = moment(dateTime, 'DD-MM-YYYY hh:mm:ss');
        const endShiftTime = moment(dateTime1, 'DD-MM-YYYY hh:mm:ss');
        if (startShiftTime.isAfter(endShiftTime)) {
          timeToEnd.add(1, 'days');
          console.log("start add one day Is after",moment(endShiftTime))
        }
        const totalDay=1
        const totaTime=moment.duration(timeToEnd.diff(timeStart)).asHours()
        let businessDay=1
        let weekend=0
        
       //calcute order price ++time 
       const {data1}=props.route.params
        if(selectname==="يومي"){
          typePrice=data1.price
        }else if(selectname==="اسبوعي"){
          typePrice=data1.weeklyprice
        }else if(selectname==="شهري"){
          typePrice=data1.monthlyprice
        }
        
        price=Number(typePrice)
        const workday=totalDay
        const totalTimework=totaTime
        console.log("Maie Price",selectname,"=",price)
        console.log("just for one day= ", workday ,
                    "total hours per one day=",totalTimework,
                    "compleat price for hours to one day= ",price*totalTimework,
                    "full price for all days ",workday*(price*totalTimework)
                    ," time start service",timeStart.format('HH:MM')
                    ,"time End serrvice ",timeToEnd.format("HH:MM"))
        
                    DataHolder={workday:workday,
                        totalTimework:totalTimework,
                        endPriceOnday:price*totalTimework,
                        endFullprrice:workday*(price*totalTimework),
                        startService:moment(Start),
                        endServvice:moment(End),
                        timeStart:moment(timeStart),
                        timeToEnd:moment(timeToEnd),
                        selectType:selectType,
                        selectname:selectname,
                        mainePrice:price}
                       
                    
           
       }else{
        const totalDay=moment.duration(End.diff(Start)).asDays()
        
        const startShiftTime = moment(dateTime, 'DD-MM-YYYY hh:mm:ss');
        const endShiftTime = moment(dateTime1, 'DD-MM-YYYY hh:mm:ss');
        if (startShiftTime.isAfter(endShiftTime)) {
          timeToEnd.add(1, 'days');
          console.log("start add one day Is after",moment(endShiftTime))
        }

        const totaTime=moment.duration(timeToEnd.diff(timeStart)).asHours()
      
        const searchLimit = totalDay;
        let businessDay=0
        let weekend=0
        let dateTodayStr=moment(Start).format('dddd')
        console.log("ttt====>total day FIRST===",searchLimit)
        
      for (let index = 0; index < searchLimit+1; index++) {
        businessDay+=1
        console.log("ttt====>OK businessDay=",businessDay)
        console.log("ttt====>OK day=",dateTodayStr)
         
        if(dateTodayStr==='السبت'||dateTodayStr==='الجمعة'){
            console.log("Is holday ^^ ",dateTodayStr)
           //add counter to weekend
            weekend+=1
          }  
          console.log(" loop ^^ ",index)
          //increase counter day
           dateTodayStr=moment(Start).add(businessDay,'day').format('dddd')
           if(searchLimit===index){
            calcDone=true
            console.log("Is loop done ^^ ")
           }
        }
        if(calcDone){
          const workdayWithoutweekend=businessDay-weekend
          const workday=businessDay
          const totalTimework=totaTime
          const {data1}=props.route.params
            if(selectname==="يومي"){
              typePrice=data1.price
              
               }else if(selectname==="اسبوعي"){
                typePrice=data1.weeklyprice
              }else if(selectname==="شهري"){
              typePrice=data1.monthlyprice
            }

          price=Number(typePrice)
          const typeWork=workWithWeekend
          if (!typeWork){
            DataHolder= {workday:workday,
                totalTimework:totalTimework,
                endPriceOnday:price*totalTimework,
                endFullprrice:workday*(price*totalTimework),
                startService:moment(Start),
                endServvice:moment(End),
                timeStart:moment(timeStart),
                timeToEnd:moment(timeToEnd),
                selectType:selectType,
                selectname:selectname,
                mainePrice:price }
              
            
            console.log("total work days=", workday ,
                         "total weekend - work days=", workdayWithoutweekend ,
                    "hours total for full days=",totalTimework,
                    "finle price per one day=",price*totalTimework,
                    "price for full days",workday*(price*totalTimework)
                    ,"start service ",Start.format('LLL')
                    ,"end service ",End.format("LLL"))
            }else{
              DataHolder={workday:workdayWithoutweekend,
                  totalTimework:totalTimework,
                  endPriceOnday:price*totalTimework,
                  endFullprrice:workdayWithoutweekend*(price*totalTimework),
                  startService:moment(Start),
                  endServvice:moment(End),
                  timeStart:moment(timeStart),
                  timeToEnd:moment(timeToEnd),
                  selectType:selectType,
                  selectname:selectname,
                  mainePrice:price}
                
              
              console.log("total work without --weekend", workdayWithoutweekend ,
                    "totla hours work withe full days",totalTimework,
                    "finle price to one day",price*totalTimework,
                    "total price for all days",workdayWithoutweekend*(price*totalTimework),
                    "service data start",Start.format('LLL'),
                    "service ddate End",End.format("LLL"),
                    "start time+++",moment(timeStart).format("hh:mm a"),
                    "end time+++",moment(timeToEnd).format("hh:mm a") )
            }
          }
        }
        console.log("discrption is =============",decrption)
      }
      
      // 

       const selectDate=(day) =>{
        //control date type daaely or weekly or nonthly and add days 
        // setReady(true) to show or hid calender
        setReady(true)
        let EndTimeService;
        let StartTimeService;
        
        setSelected(day.dateString)
          if(selectname==="اسبوعي"){
              decrption="الحجز فقط لمدة اسبوع"
              EndTimeService= moment(day.dateString).add(6,'day').format('YYYY-MM-DD')
              sethowSecondDay(true)
          }else if (selectname==="شهري"){
            decrption="الحجز فقط لمدة شهر"
              EndTimeService= moment(day.dateString).add(29,'day').format('YYYY-MM-DD')
              sethowSecondDay(true)
          }else if (selectname==="يومي"){
            decrption="الحجز فقط يوم واحد"
            EndTimeService= moment(day.dateString).format('YYYY-MM-DD')
            sethowSecondDay(false)
        }
            
        StartTimeService=moment(day.dateString).format('YYYY-MM-DD')  
        setstartDate(StartTimeService)
        setSecndtDate(EndTimeService)
      }


      const onDateSelected = ((event, value) => {
          setchangTime1(true)
          if (Platform.OS === 'ios') {
            return seTime(value), setDatePicker(!datePicker);
          }
          setDatePicker(!datePicker);
          seTime(value)
          
  
      })


    const onDateSelected2 = ((event, value) => {
      setchangTime2(true)
        if (Platform.OS === 'ios') {
            return seTime1(value), setDatePicker(!datePicker);
        }
        setDatePicker(!datePicker);
        seTime1(value)}
    )

    
    const typeOfOrder = () => {
      console.log("ruuuun?1 ")
      if (selectname === "اسبوعي") {
        decrption = "الحجز فقط لمدة اسبوع"

      } else if (selectname === "شهري") {
        decrption = "الحجز فقط لمدة شهر"

      } else if (selectname === "يومي") {
        decrption = "الحجز فقط يوم واحد"

      }
    } 


    const nextScreen=()=>{
      let confirmReservtion=false
      const workWithWeekend=selectType
      console.log("tet time chang",changTime1,"--",changeTime2)
      //check time of servvice befor reservion
      const startTIME=moment(dateTime)
      const endtTIME=moment(dateTime1)
      if(!changTime1 || !changeTime2 ){
        console.log("caanot Reserv")
        Alert.alert("آمينة","الرجاء التاكد من اختيار وقت الحجز")
        confirmReservtion=false
      }else{
        confirmReservtion=true
      }

      if(confirmReservtion===true){
        typeOfOrder()
        setvisible(!visible)
        workday_count(startDate,endtDate,workWithWeekend)
        setTimeout(()=>{
          //hold babysetter data and service derails 
          const arrayHolder={...props.route.params.data1,startservice:dateTime,endservice:dateTime1,startDateServ:startDate,endDateServ:endtDate}
          // console.log("test array holder",arrayHolder)
          // console.log("test array DATA holder2",DataHolder)
            setvisible(false)
          props.navigation.push('Fourm1', {arrayHolder,DataHolder })
        },2000)
      }
      
    
    }   


  return(
    <SafeAreaView   >
    <Box height={Metrics.HEIGHT*0.9121} backgroundColor={Colors.AminabackgroundColor}>
      {showCalender?
    <Box  backgroundColor={Colors.AminabackgroundColor} alignItems={'center'}>
      <Box alignItems={'center'} mt={'5'}>
        <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={'700'} letterSpacing={1.2} color={Colors.titleColor}>اختر نوع الحجز</Text>
      </Box>
      <Box alignItems={'center'} mt={'3'}>
        <Stack width={Metrics.WIDTH*0.9121} flexDirection={'row'} alignItems={'center'}>
          {slideType.map((item)=>{
            return(
              <Pressable key={item.id} onPress={()=>selectPackege(item.id,item.name)} style={{backgroundColor:selecttext===item.id? Colors.textZahry: Colors.grayButton,width:Metrics.WIDTH*0.25212,height:Metrics.HEIGHT*0.06312,borderRadius:40,alignItems:'center',justifyContent:'center',marginLeft:10}} >
                <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={'700'} letterSpacing={1.2} color={selecttext===item.id? Colors.white: Colors.textZahry}
                    textAlign={'center'} fontSize={fontPixel(15)}>{item.name}</Text>
              </Pressable>
            )
          })}
        </Stack>
      </Box>
      <Box alignItems={'center'} mt={'10'}>
        <Stack backgroundColor={Colors.grayButton} w={'64'} borderWidth={.1} borderColor={Colors.text} flexDirection={'row'} alignItems={'flex-end'}  p={'2.5'} borderRadius={'xl'} onTouchStart={()=>setShowcalender(!showCalender)}>
          <Image source={Images.blackCalendernew} resizeMode='contain' style={{width:19,height:18,marginRight:10,marginLeft:10}}/>
          <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={'700'} fontSize={fontPixel(15)} color={Colors.black} textAlign={'left'}>{moment(startDate).format('DD MMMM')}</Text>
          {showSecondDay&&<Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={'700'} fontSize={fontPixel(15)} color={Colors.black} textAlign={'left'}> الى </Text>}
          {showSecondDay&&<Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={'700'} fontSize={fontPixel(15)} color={Colors.black} textAlign={'left'}>{moment(endtDate).format('DD MMMM')}</Text>}
        </Stack>
      </Box>

      <Box>
        {selectname!="يومي" &&
        <Stack alignItems={'center'} flexDirection={'row'} mt={'3'}   >
          <Checkbox value="test"  size={'sm'}   borderRadius={50} color={'rose.100'} margin={'3'} onChange={()=> setselectType(!selectType) } accessibilityLabel="This is a dummy checkbox" colorScheme='rose' />
          <Text style={styles.leftText}>الحجز غير شامل لايام الجمعة والسبت </Text>
        </Stack>
        }
        
      </Box>

      <Box alignItems={'center'} mt={'5'}>
       
        <Stack   onTouchStart={()=>setShowTimebox(!showTimebox)} backgroundColor={Colors.grayButton} flexDirection={'row'}  w={'64'} borderWidth={.1} borderColor={Colors.black}  alignItems={'flex-end'}  p={'2.5'} borderRadius={'xl'} >
          <Image source={Images.blackOclock} resizeMode='contain' style={{width:19,height:18,marginRight:10,marginLeft:10}}/>
          <Stack flexDirection={'row'}>
          <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={'700'} fontSize={fontPixel(15)} color={Colors.black} >{moment(dateTime).format("hh:mm a")}</Text>
          <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={'700'} fontSize={fontPixel(15)} color={Colors.black}>الى</Text>
          <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={'700'} fontSize={fontPixel(15)} color={Colors.black}>{moment(dateTime1).format("hh:mm a")}</Text>
          </Stack>
        </Stack>
      </Box>

        {ready?
        <Box backgroundColor={'white'} borderRadius={'3xl'} borderColor={'black'} borderWidth={.1} width={'72'}  
              p={'2.5'}  alignItems={'center'} mt={'48'} shadow={'9'}>
            <Stack>
              <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={'700'} fontSize={fontPixel(18)} color={Colors.titleColor}>تفاصيل الخدمة</Text>
            </Stack>
            <Stack  flexDirection={'row'} alignItems={'center'}  p={'2.5'} >
              <Image source={Images.grreenCalendrnew} resizeMode='contain' style={{width:19,height:18,marginRight:10,marginLeft:10}}/>
              <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={'700'} fontSize={fontPixel(18)} color={Colors.black} textAlign={'left'}>{moment(startDate).format('DD MMMM')}</Text>
              {showSecondDay&&<Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={'700'} fontSize={fontPixel(15)} color={Colors.black} textAlign={'left'}> الى </Text>}
              {showSecondDay&&<Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={'700'} fontSize={fontPixel(15)} color={Colors.black} textAlign={'left'}>{moment(endtDate).format('DD MMMM')}</Text>}
            </Stack>
            <Stack  flexDirection={'row'}   alignItems={'center'}  p={'1'}   >
              <Image source={Images.clockgreen} resizeMode='contain' style={{width:19,height:18,marginRight:10,marginLeft:10}}/>
              <Stack flexDirection={'row'} alignItems={'baseline'}>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={'700'} fontSize={fontPixel(15)} color={Colors.black}>{moment(dateTime).format("hh:mm a")}</Text>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={'700'} fontSize={fontPixel(15)} color={Colors.black}>الى</Text>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={'700'} fontSize={fontPixel(15)} color={Colors.black}>{moment(dateTime1).format("hh:mm a")}</Text>
              </Stack>
            </Stack>
            <Stack  backgroundColor={Colors.transparent}flexDirection={'row'} alignItems={'center'} p={'1'}>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={'700'} fontSize={fontPixel(14)} color={Colors.black} letterSpacing={1.2}>{decrption}</Text>
            </Stack>
            {selectType&&selectname !="يومي"&&
            <Stack flexDirection={'row'} alignItems={'baseline'}>
                <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={'700'} fontSize={fontPixel(12)} color={Colors.black}>- غير شامل الإجازات الاسبوعية</Text>
            </Stack>}
          </Box>:
          <Box backgroundColor={'white'} borderRadius={'3xl'} borderColor={'black'} borderWidth={.11} width={'72'}  
            p={'2.5'}  alignItems={'center'} mt={'48'} shadow={'8'} >
            <Stack> 
              <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={'700'} fontSize={fontPixel(18)} color={Colors.titleColor}>تفاصيل الخدمة</Text>
            </Stack>
            <Stack>
              <Text fontFamily={Platform.OS==='android'?Fonts.type.light:Fonts.type.light} fontWeight={'400'} fontSize={fontPixel(18)} color={Colors.textZahry} textAlign={'center'} >حددي وقت و تاريخ بداية الحضانة لطفلك </Text>
            </Stack>
          </Box>}
      </Box>:
      <Box backgroundColor={Colors.AminabackgroundColor}>
         <Calendar
          theme={{
            'stylesheet.calendar.header': {
              dayTextAtIndex0: {
                color: 'red'
              },
              dayTextAtIndex6: {
                color: 'blue'
              }
          },
          textSaturdayColor: "blue",
          textSundayColor: "red"
          }}
            
              onDayPress={day => {
                selectDate (day);
                 // getMarked(day.dateString)
                  //console.log('selected day', day);
                 // selectDate(day)
              }}
              
               minDate={String(new Date())}
             // onDayLongPress={handleDayPress}
              
             markedDates={{
              [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
            }}
          />
            
           <Stack   alignItems={'center'} justifyContent={'center'} mt={'20'} >
               
               <TouchableOpacity onPress={()=> setShowcalender(!showCalender)  }    style={{height:Metrics.HEIGHT*0.0521 ,width:Metrics.WIDTH*0.7491,backgroundColor:Colors.textZahry,alignItems:'center',justifyContent:'center', padding:2,borderRadius:22,}}  >
                   <Text fontFamily={Platform.OS==='android'? Fonts.type.bold:Fonts.type.bold} fontWeight={"700"} letterSpacing={1.2} fontSize={fontPixel(16)} color={Colors.white} ml="1" >تاكيد</Text>
               </TouchableOpacity>
               {/* <TouchableOpacity onPress={()=>openModelWithshowTime() }    style={{height:Metrics.HEIGHT*0.0321 ,width:Metrics.WIDTH*0.5891,backgroundColor:Colors.textZahry,alignItems:'center',justifyContent:'center', padding:2,borderRadius:22,borderWidth:.4,borderColor:Colors.black}}  >
                   <Text fontFamily={Platform.OS==='android'? Fonts.type.bold:Fonts.type.bold} fontWeight={"700"} letterSpacing={1.2} fontSize={fontPixel(16)} color={Colors.white} ml="1" >تعديل</Text>
               </TouchableOpacity> */}
           </Stack>
           
      </Box>
      }
     {showCalender&& <Box alignItems={'center'}  position={'absolute'}bottom={'10'} right={'10'} left={'10'}  >
        <Stack backgroundColor={Colors.transparent} shadow={'3'} padding={'1.5'}>
          <TouchableOpacity onPress={()=> nextScreen() }    style={{height:Metrics.HEIGHT*0.054521 ,width:Metrics.WIDTH*0.8891,backgroundColor:Colors.textZahry,alignItems:'center',justifyContent:'center', padding:2,borderRadius:22,borderWidth:.4,borderColor:Colors.black}}  >
            <Text fontFamily={Platform.OS==='android'? Fonts.type.bold:Fonts.type.bold} fontWeight={"700"} letterSpacing={1.2} fontSize={fontPixel(15)} color={Colors.white} ml="1" >تاكيد الطلب</Text>
          </TouchableOpacity>
        </Stack>
      </Box>}
      </Box>
        <AnimatedLoader
      visible={visible}
      overlayColor="rgba(255,255,255,0.75)"
      source={require("./calender.json")}
      animationStyle={styles.lottie}
      speed={1}
      
    ></AnimatedLoader>
      <Center>
      <Modal isOpen={showTimebox} onClose={() => setShowTimebox(false)}
          borderColor={Colors.white} backgroundColor={Colors.transparent}
          avoidKeyboard justifyContent="flex-end" bottom="4"
           >
        <Modal.Content width={Metrics.WIDTH } alignItems={'center'} flexDirection={'column'}  backgroundColor={Colors.transparent}>
        <Modal.CloseButton/>
        <Modal.Body   width={Metrics.WIDTH}  height={heightPixel(522)}  alignItems={'center'}>
        <Box  width={Metrics.WIDTH*0.643} flexDirection={'row'} backgroundColor={"rgba(255, 255, 255, 1)"} borderRadius={'2xl'} borderWidth={.2} borderColor={'black'}>
          <Stack width={'20'}   justifyContent={'center'} alignItems={'center'} padding={'1'}>
            <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} letterSpacing={1.3}fontWeight={'700'} fontSize={fontPixel(20)} color={"#F27F92"} mr={'1'} ml={'1'}>الوقت</Text>
          </Stack>
          <Box  flexDirection={'column'} alignItems={'center'} p={'1.5'}>
            <Stack flexDirection={'row'}   width={Metrics.WIDTH*0.3611} >
              <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={'700'} fontSize={fontPixel(20)} color={"#232323"} mr={'1'} ml={'1'}>من</Text>
              <DateTimePicker
                value={dateTime}
                mode={'time'}
                display={Platform.OS === 'ios' ? 'compact' : 'default'}
                is24Hour={false}
                dateFormat={"day month year"}
                onChange={onDateSelected}
                theme='light'
                minuteInterval={30}
                style={styles.datapicker2}
              />
            </Stack>
            <Stack flexDirection={'row'}  width={Metrics.WIDTH*0.3611} mt={'2'}>
              <Text fontFamily={Platform.OS==='android'?Fonts.type.bold:Fonts.type.bold} fontWeight={'700'} fontSize={fontPixel(22)} color={"#232323"} mr={'1'} ml={'1'}>الى</Text>
              <DateTimePicker
                value={dateTime1}
                mode={'time'}
                display={Platform.OS === 'ios' ? 'compact' : 'default'}
                is24Hour={false}
                dateFormat={"day month year"}
                onChange={onDateSelected2}
                theme='light'
                minuteInterval={30}
                style={styles.datapicker2}
              />
            </Stack>
          </Box>
        </Box>
        </Modal.Body>
        </Modal.Content>
        
      </Modal>
      </Center>
    </SafeAreaView>
  )
}
export default Poitment;


 