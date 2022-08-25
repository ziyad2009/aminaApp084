import React,{useState} from 'react';
import {View,useWindowDimensions} from 'react-native'
import {Box,Text,Stack, Button} from 'native-base'
import axios from 'axios';
import WebView from 'react-native-webview';
import RenderHtml from 'react-native-render-html';
import { Metrics,Colors } from '../assets/Themes/';
 
const Ewallet=()=>{
    const[loading,setLoading]=useState(false)
    const[htmlcod,sehtmlcod]=useState('')
    
    let customHTML=null

    // let payload = {
    //       "command": "TOKENIZATION",
    //     "access_code": "NiIpEzKzWmEZKJUbBbZs",
    //     "merchant_identifier":"d491f52d",
    //     "merchant_reference": "1040960005",
    //     "amount":2,
    //     "currency":"SAR",
    //     "language": "ar",
    //     "signature": "31560bdb616b959b4935c0ff691c752369a2e57cb287cb75d54bd86c10c675fe",
    //     "order_description":"iphon 5 lte",
    //     "customer_email":"ziayd2009@gmail.com",
    //     "payment_option":"MADA",
    //     "card_holder_name":"ziayd mansoer",
    //     "remember_me":"YES",
    //     "card_number": 5297412542005689,
    //     "expiry_date":'05/25',
    //     "card_security_code":350,
    //     "customer_ip":"92.178.3.10"
    //   }
      let payload = {
      "service_command": "TOKENIZATION",
      "access_code": "NiIpEzKzWmEZKJUbBbZs",
      "merchant_identifier":"d491f52d",
      "merchant_reference": "10xxv40960005",
      "amount":"1000",
      "currency":"SAR",
      "language": "ar",
      "signature": '31560bdb616b959b4935c0ff691c752369a2e57cb287cb75d54bd86c10c675fe',
       "phone_number":"00966543437660",
      "customer_email":"ziayd2009@gmail.com",
      "payment_option":"MADA",
      "card_holder_name":"ziayd mansoer",
      
      "card_number": "5297412542005689",
      "expiry_date":'05/25',
      "card_security_code":"350",
      "customer_ip":"92.178.3.10"
    }

    const goWalet=async()=>{
      // url: `https://sbcheckout.PayFort.com/FortAPI/paymentPage?service_command=${payload.command}&access_code=${payload.access_code}&merchant_identifier=${payload.merchant_identifier}&merchant_reference=${payload.merchant_reference}&amount=${payload.amount}&currency:=${payload.currency}&language=${payload.language}&signature=${payload.signature}&customer_email=${payload.customer_email}&payment_option=${payload.payment_option}&expiry_date=${payload.expiry_date}&card_number=${payload.card_number}&order_description=${payload.order_description}&card_security_code=${payload.card_security_code}&remember_me=${payload.remember_me}&card_holder_name=${payload.card_holder_name}`,
        var config = {
          method: 'POST',
          url: `https://sbcheckout.PayFort.com/FortAPI/paymentPage?service_command=${payload.service_command}&access_code=${payload.access_code}&merchant_identifier=${payload.merchant_identifier}&merchant_reference=${payload.merchant_reference}&currency=${payload.currency}&language=${payload.language}&signature=${payload.signature}&amount=${payload.amount}&customer_email=${payload.customer_email}&phone_number=${payload.phone_number}&payment_option=${payload.payment_option}&expiry_date=${payload.expiry_date}&card_number=${payload.card_number}&card_security_code=${payload.card_security_code}&card_holder_name=${payload.card_holder_name}`,
          headers: { "Content-type": "application/json" }
          };
          const response=await axios(config).then((res)=>{
            console.log("test wallet res",res)
           sehtmlcod(res)
          }).finally(()=> setLoading(true))

    }
   
    const source = {
      html: `${htmlcod.data}`
    };

  const { width } =useWindowDimensions();
      
return(
    <View style={{flex:1}}>
      {loading?
      <View style={{backgroundColor:Colors.transparent,width:Metrics.WIDTH ,height:Metrics.HEIGHT}}>
        <Text style={{paddingTop:100}}>Welcome</Text>
        <Button onPress={()=>setLoading(false)}>unload page</Button>
        <View style={{ width:Metrics.WIDTH,height:Metrics.HEIGHT,backgroundColor:Colors.agreen}}>
        <WebView 
        originWhitelist={['*']}
        onNavigationStateChange={()=>{console.log("test")}}
          source={source}
          javaScriptEnabled={true}
         // domStorageEnabled={true} 
           
        />
        {/* <RenderHtml
            contentWidth={width}
            source={source}
    /> */}
        </View>
      </View>:
      <Box>
        <Button onPress={()=>goWalet()}>test</Button>
        <Button onPress={()=>console.log(htmlcod)}>test2</Button>


      </Box>
      }
        
        
    </View>
)
}
export default Ewallet