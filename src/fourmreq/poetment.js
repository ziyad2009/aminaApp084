import React ,{useState}from 'react';
import {View,Text} from 'react-native';
import{Button,Modal,Center} from 'native-base';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import { Colors ,Metrics, Fonts} from '../assets/Themes/';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles'
const Poitment=()=>{
    const [time1, settim1] = useState(new Date());
    const [time2, settime2] = useState(new Date());
    const [mydate, setDate] = useState(new Date());
    const [displaymode, setMode] = useState('date');
   
    
    const [isDisplayDate, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const changeSelectedTime1 = (event, selectedDate) => {
        const currentDate = selectedDate || time1;
      
        settim1 (currentDate);
        console.log("Test dddat ",currentDate)
        setShow(false)
    }

    const changeSelectedTime2 = (event, selectedDate) => {
        const currentDate = selectedDate || time2;
      
        settime2(currentDate);
        console.log("Test dddat ",currentDate)
        setShow(false)
    }


    const changeSelectedDate = (event, selectedDate) => {
    const currentDate = selectedDate || mydate;
  
    setDate(currentDate);
    console.log("Test dddat ",currentDate)
    setShow(false)
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
     };

     const displayDatepicker = () => {
        showMode('date');
     };

   const handleSelection = (id) => {
          setselect(id)
         
     }

     const Modaitest=()=>{
         return(
            <View style={[styles.framView,{flexDirection:'column'}]}>

            <View style={{ marginLeft:10 ,justifyContent:'center',alignContent:'center'}}>
                <View style={{flexDirection:'row'}}>
                 <Feather name="clock" size={22}  color={'red'} onPress={()=>displayDatepicker()} style={styles.icon}  />
                 <View style={[styles.datapicker,{height:Metrics.HEIGHT*0.0353,width:Metrics.WIDTH*0.2119}]}>
                       
                        
                </View>
            
                </View> 
                <View style={{flexDirection:'row'}}>
                <Feather name="clock" size={22}  color={'#BA5B4F'} onPress={()=>displayDatepicker()} style={styles.icon}  />
                <View style={[styles.datapicker,{height:Metrics.HEIGHT*0.0353,width:Metrics.WIDTH*0.2119}]}>
                {isTimelayDate2&&
                <DateTimePicker
                    testID="dateTimePicker"
                    value={time2}
                    mode={'time'}
                    is24Hour={true}
                    display='default'
                    onChange={changeSelectedTime2}
                />}
                </View> 
                </View>
        
                <View style={{flexDirection:'row'}}>
                <Feather name="calendar" size={22}  color={'#BA5B4F'} onPress={()=>displayDatepicker()}  style={styles.icon} />
               <View style={styles.datapicker}>
                <DateTimePicker
               testID="dateTimePicker"
               value={mydate}
               mode={displaymode}
               is24Hour={true}
               display='default'
                
               onChange={changeSelectedDate}
               />
                </View> 
                </View>
        
            </View>
            
        
        </View>
         )
     }

return(
    <Center>
        <Button onPress={() => setShowModal(true)}>Button</Button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>
            <View style={{justifyContent:'space-between',flexDirection:'row',marginLeft:10}}>
            <Text style={styles.rightTex}>اختر موعد الخدمة</Text>
             </View>
            </Modal.Header>
            <Modal.Body>
               <Modaitest/>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setShowModal(false);
              }}>
                  Cancel
                </Button>
                <Button onPress={() => {
                setShowModal(false);
              }}>
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
)
}
export default Poitment;


 