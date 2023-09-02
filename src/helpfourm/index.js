import * as React from 'react';
import { Alert, SafeAreaView, View } from 'react-native';

import { Form, FormItem, Picker, PinInput } from 'react-native-form-component';
import { Fonts ,Metrics,Colors,fontPixel} from '../assets/Themes';
import api from '../services/api';
 import setItem from '../services/storage';

const firstnameInput = React.createRef();
const lastnameInput = React.createRef();
const DetalisReqest = React.createRef();
const emailInput=React.createRef();
const phoneInput=React.createRef();

const HELPFOURM=(props)=> {
  
const [firstname, setFirstname] = React.useState('');
const [number, setNumber] = React.useState(1);
const [lastName, setLastName] = React.useState('');
const [gender, setGender] = React.useState('male');
const [requesttype, serequesttype] = React.useState('');
const [requestdetils, serequestdetils] = React.useState('');
const[email,setemail]=React.useState('')
const[phone,setphone]=React.useState()
  
  
 

React.useEffect(()=>{
  convertRequestTitle()
},[number])


const convertRequestTitle=()=>{
if( number===1){
  serequesttype("استفسار")
}else if(number===2){
  serequesttype("شكوى")
}else if(number===3){
  serequesttype("اعتراض")
}else if(number===4){
  serequesttype("طلب ميزة تطوير")
}else if(number===5){
  serequesttype("تطوير خدمة'")
}
   
}
const sendReeq=async()=>{
    const token = await setItem.getItem('BS:Token');
    api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    
    const from="app.aminah8530@gmail.com"
    await api.post("setteremail",{
      to: 'app.aminah8530@gmail.com',
      from: 'info@amina.app',
        subject: `${requesttype}`,
        text:"طلب  دعم او شكوى",
        html: `<h2 style="color: #00abb9">الاسم:</h2>
        <h3 style="color: #f38193">${firstname}</h3>
        <h2 style="color: #00abb9">رقم الجوال:</h2>
        <h3 style="color: #f38193">${phone}</h3>
        <h2 style="color: #00abb9">الايميل:</h2>
        <h3 style="color: #f38193">${email}</h3>
        <h2 style="color: #00abb9">الموضوع:</h2>
        <h3 style="color: #f38193">${requestdetils}</h3>`,
    }).then((res)=>{
        console.log("test rres",res.data)
        Alert.alert("خدمة العملاء","سوف يتم مراجعة طلبك وسوف يتم الرد قريبا")
    }).finally(()=>props.navigation.popToTop()).catch((err)=>{
        console.log("Erorr" ,err)
    })
    return from ;
}


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:Colors.AminabackgroundColor, padding: 24 }}>
      <View style={{ padding: 24 }}>
        <Form buttonStyle={{backgroundColor:Colors.AminaPinkButton}} buttonText="ارسال الطلب" onButtonPress={() => sendReeq()}>
          <FormItem
            value={firstname}
            label="الاسم"
            asterik
            onChangeText={(firstname ) => setFirstname(firstname)}
            floatingLabel
            isRequired
            style={{backgroundColor:"#F1F1F1"}}
            //secureTextEntry
            ref={firstnameInput}
          />

          <Picker
            items={[
              { label: 'استفسار', value: 1 },
              { label: 'شكوى', value: 2 },
              { label: 'اعتراض', value: 3 },
              { label: 'طلب ميزة تطوير', value: 4 },
              { label: 'تطوير خدمة', value: 5 },
               
            ]}
            label="الغرض   من الطلب"
            selectedValue={number}
            onSelection={(item) => setNumber(item.value)}
             selectedValueStyle={{fontFamily:Fonts.type.bold}}
             iconWrapperStyle={{backgroundColor:Colors.AminaButtonNew}}
              
            type="modal"
            itemLabelStyle={{backgroundColor:Colors.transparent}}
            buttonStyle={{backgroundColor:Colors.AminaButtonNew}}
          />

          {/* <Picker
            items={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
            ]}
            label="Gender"
            selectedValue={gender}
            //onSelection={(item: any) => setGender(item.value)}
            
            floatingLabel
          /> */}

          <FormItem
            value={requestdetils}
            label="ملخص الطلب"
            asterik
            onChangeText={(text) => serequestdetils(text)}
            floatingLabel
            isRequired
            textArea
            style={{backgroundColor:"#F1F1F1"}}
            showErrorIcon={false}
            ref={DetalisReqest}
          />
        <FormItem
            label="الايميل"
            isRequired
            value={email}
            onChangeText={(email) => setemail(email)}
            style={{backgroundColor:"#F1F1F1"}}
            asterik
            ref={emailInput}
        />
         <FormItem
            label="رقم الهاتف"
            isRequired
            value={phone}
            onChangeText={(phone) => setphone(phone)}
            style={{backgroundColor:"#F1F1F1"}}
            asterik
            ref={phoneInput}
        />
          {/* <PinInput

            numOfInput={10}
            onChangeText={(pin) => console.log('pin:', pin)}
          /> */}
        </Form>
      </View>
    </SafeAreaView>
  );
}

export default HELPFOURM;