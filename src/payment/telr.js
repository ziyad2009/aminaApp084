// <?xml version="1.0" encoding="UTF-8"?>
// <mobile>
// <store>Store ID</store>
// <key>Authentication Key</key> (Note 1)
// <device>
// <type>Mobile device type</type> (Note 2)
// <id>Mobile device ID</id> (Note 3)
// <agent>WebView user agent header</agent> (Note 4)
// <accept>WebView accept header</accept> (Note 4)
// </device>
// <app>
// </app>
// <tran>
// <name>Application name</name>
// <version>Application version</version>
// <user>Application user ID</user> (Note 5)
// <id>Application installation ID</id>
// <test>Test mode</test> (Note 6)
// <type>Transaction type</type>


// <class>Transaction class</class>
// <cartid>Transaction cart ID</cartid> (Note 7)
// <description>Transaction description</description>
// <currency>Transaction currency</currency> (Note 8)
// <amount>Transaction amount</amount> (Note 9)
// <ref>Previous transaction reference</ref> (Note 10)
// </tran>
// <card>
// <number>Card number</number>
// <expiry>
// <month>Expiry date - month</month> (Note 11)
// <year>Expiry date - year</year>
// </expiry>
// <cvv>CVV</cvv> (Note 12)
// </card>
// <billing> 

// <name>
// <title>Title</title>
// <first>Forenames</first>
// <last>Surname</last>
// </name>
// <address>
// <line1>Street address – line 1</line1>
// <line2>Street address – line 2</line2>
// <line3>Street address – line 3</line3>
// <city>City</city>
// <region>Region</region>
// <country>Country</country> (Note 14)
// <zip>Zip/Area/Postcode</zip>
// </address>
// <phone>Mobile number</phone>
// <email>Email address</email>
// </billing>
// </mobile>
import React,{useState,useRef,useEffect} from 'react';
 import { Image ,View,TouchableOpacity,Text, Platform, Alert,Modal,StyleSheet, SafeAreaView, Pressable,ActivityIndicator} from 'react-native';
import axios from 'axios';
import { Button } from 'native-base';
import {parseString} from 'react-native-xml2js'
import  DeviceInfo  from 'react-native-device-info';
import WebView from 'react-native-webview';
import XMLParser from 'react-xml-parser';

 const TelerPage =(props)=>{
    const [xmldata,sexmltdata]=useState(null)

    const [isLoading, setIsLoading] = useState(true);
    const [startUrl, setStartUrl] = useState(null);
    const [code, setCode] = useState(null);
    const [isStatusApiCall, setIsStatusApiCall] = useState(true);

    const[modalVisible,setmodalVisible]=useState(false)
    const [messageload,setmessageload]=useState(false)
    const[message,setmessage]=useState(null)


    const storId='27456-ameena app'
    const key='rPBH5-wLBp#g4fkq'
    let buildNumber = DeviceInfo.getBuildNumber();
    const device_id=DeviceInfo.getDeviceId() 
    const price=props.route.params.price
    const appName="aminah"
    const useID='62f030c75992b468d6faf831'
    const appInstalId='15'
    const  cart_ID= `${Math.floor(Math.random() * 100) + 2}`
    const Card_number="5555 5555 5555 4444"
    const Expiry_date_m= Number("09")
    const Expiry_date_y= Number("2022")
    const CVC="123"
    const title_name="ziayd"
    const Forenames="Mr"
    const title_surname="aljohany"

     

   
    const  dataXML=`<?xml version="1.0" encoding="UTF-8"?>
    <mobile>
    <store>${storId}</store>
    <key>${key}</key>
    <device>
    <type>${device_id}</type> 
    <id>${device_id}</id>  
     
    </device>
     
    <app>
    <name>{${appName}</name>
    <version>${buildNumber}</version>
    <user>${useID}</user>  
    <id>${appInstalId}</id>
    </app>
    <tran>
        <test>1</test> 
        <type>paypage</type>
        <class>Ecom</class>
     
        <cartid>${cart_ID}</cartid>  
         <description>pay from service from app</description>
        <currency>SAR</currency>  
         <amount>340.50</amount>  
    </tran>

    <card>
    <number>${Card_number}</number>
    <expiry>
    <month>${Expiry_date_m}</month>  
    <year>${Expiry_date_y}</year>
    </expiry>
    <cvv>${CVC}</cvv>  
    </card>

    <billing> 
    
    <name>
         <title>${title_name}</title>
         <first>${Forenames}</first>
        <last>${title_surname}</last>
    </name>
    <address>
    <line1>umer bin utba street</line1>
     
    <city>Maddinah</city>
    <region>Maddinah</region>
    <country>SA</country>  
    
    </address>
    <phone>9666543437660</phone>
    <email>ziayd2009@gmail.com</email>
    </billing>
    </mobile>`

    const _onNavigationStateChange =(webViewState) =>{
        this.hide()
     }
     const show =()=> {
      setmodalVisible(true)
     }
     
     const hide =()=> {
        setmodalVisible(false)
     }
   
    useEffect( async() => {
       // sendXmlData()
       console.log("tetst price ",props.route.params.price)
    }, )

     
    const postrequestpayment=()=>{
        console.log("start payment")
        setmodalVisible(true)
        var config = {
            headers: {'Content-Type': 'text/xml'}
       };
       axios.post(`https://secure.innovatepayments.com/gateway/mobile.xml`, dataXML, config)
       .then((res)=>{
       console.log("test respons 2 ",res.request._response)
        const result=res.request._response
      
        var xml=new XMLParser().parseFromString(result);
        const start = xml.getElementsByTagName("start");
        var startUrlTemp = start[0]?.value;

        if (startUrlTemp != null) {
            const code = xml.getElementsByTagName("code");
            var codeTemp = code[0]?.value;
            setCode(codeTemp)
            setStartUrl(startUrlTemp)
            console.log("GET code=>",codeTemp)
            console.log("GET url=>",startUrlTemp)

          } else {
            const abort = xml.getElementsByTagName("abort");
            var abortTemp = abort[0]?.value;
            const message = xml.getElementsByTagName("message");
            var messageTemp = message[0]?.value;

            const canselOp=abortTemp ===undefined?messageTemp:abortTemp
            console.log("field",canselOp)
            setmessage(canselOp)
            setmessageload(true)
            // props.didFailWithError(abortTemp)
          }

       })
       .catch(errr=>

        console.log("Erorr",errr))
    }
    const transStatusApiCall=()=>{
      console.log("sttart second RESpons" )
        setIsLoading(true)
        var xmlRequest = `<?xml version="1.0" encoding="UTF-8"?>
        <mobile>
            <store>${storId}</store>
            <key>${key}</key>
            <complete>${code}</complete>
        </mobile>`
        var config = {
            headers: {'Content-Type': 'text/xml'}
       };
        axios.post(`https://secure.innovatepayments.com/gateway/mobile_complete.xml`, xmlRequest, config)
        .then((txtresponse)=>{
            console.log("test txt respons",txtresponse)
            var xml = new XMLParser().parseFromString(txtresponse);
            const status = xml.getElementsByTagName("status");
            var statusTemp = status[0]?.value;
            const code = xml.getElementsByTagName("code");
            var codeTemp = code[0]?.value;
            const message = xml.getElementsByTagName("message");
            var messageTemp = message[0]?.value;
            const tranref = xml.getElementsByTagName("tranref");
            var tranrefTemp = tranref[0]?.value;
            const cvv = xml.getElementsByTagName("cvv");
            var cvvTemp = cvv[0]?.value;
            const avs = xml.getElementsByTagName("avs");
            var avsTemp = avs[0]?.value;
            const cardcode = xml.getElementsByTagName("cardcode");
            var cardcodeTemp = cardcode[0]?.value;
            const cardlast4 = xml.getElementsByTagName("cardlast4");
            var cardlast4Temp = cardlast4[0]?.value;
            const ca_valid = xml.getElementsByTagName("ca_valid");
            var ca_validTemp = ca_valid[0]?.value;
            const trace = xml.getElementsByTagName("trace");
            var traceTemp = trace[0]?.value;
            if (messageTemp != null) {
              var response = {
                status:statusTemp,
                code:codeTemp,
                message:messageTemp,
                tranref:tranrefTemp,
                cvv:cvvTemp,
                avs:avsTemp,
                cardcode:cardcodeTemp,
                cardlast4:cardlast4Temp,
                ca_valid:ca_validTemp,
                trace:traceTemp
              }
              if(messageTemp=="Authorised"){
    
                //props.didPaymentSuccess(response)
                console.log("didPaymentSuccess",response)
              }else{
                //props.didFailWithError(messageTemp)
                console.log("didFailWithError",messageTemp)
              }
            }else{
              //props.didFailWithError(messageTemp)
              console.log("didFailWithError == 2",messageTemp)
            }
            setIsLoading(false)
          })
          .catch((error) => {
            console.log(error);
            console.log("Erorr2",error);
            //props.didFailWithError(error?.message ? error?.message : something_went_wrong_message)
          
        })

    }

    const didFailWithError=(msg)=>{
      setmodalVisible(false)
       props.navigation.goBack()

    }
    return(
        <View>
            <Text>Test Page</Text>
            <Button onPress={()=>postrequestpayment()} >test</Button>
            <Modal
                animationType={'slide'}
                visible={modalVisible}
                onRequestClose={()=>hide()}
                transparent
            >
              <SafeAreaView style={styles.centeredView}>
                <Pressable  style={styles.buttonBackStyle}
                   onPress={() => setmodalVisible(false)}>
                    <Text style={styles.backButtonTextStyle}>{"Back"}</Text>
                </Pressable>
                  
            <View style={styles.modalView}>
            {messageload&&
            <View style={{alignItems:'center',marginBottom:22}}>
              <Text style={{fontSize:22,color:"black",}}>{message}</Text>
              <Button bgColor={'warning.700'} size='lg'  onPress={()=>props.navigation.goBack()}>اغلاق</Button>
            </View>}

          {
            startUrl != null ? <WebView
              textZoom={100}
              onLoad={() => { setIsLoading(true) }}
              onLoadEnd={() => { setIsLoading(false) }}
              onShouldStartLoadWithRequest={event => {
                  return true;
              }} 
              onNavigationStateChange={navState => {
                console.log("teest change",navState)
                  if (navState.url.includes("gateway/details.html")) {
                    if (isStatusApiCall) {
                      setIsStatusApiCall(false)
                      transStatusApiCall()
                    }
                  } else if (navState.url.includes("gateway/webview_close.html")) {
                    didFailWithError(navState.url)
                }
              
                if (navState.url.includes("/gateway/mobile_complete.xml")) {
                  if (isStatusApiCall) {
                    setIsStatusApiCall(false)
                    transStatusApiCall()
                  }
                } else if (navState.url.includes("gateway/webview_close.html")) {
                   didFailWithError(navState.url)
                  
                }
              }}
              source={{
                uri: startUrl
              }} /> : null
              
          }
           <ActivityIndicator style={{ position: 'absolute', alignSelf: 'center' }} animating={isLoading}></ActivityIndicator>
          </View>
          
          </SafeAreaView>
          </Modal>
        </View>
        
    )

 }

 const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
       
    },
    modalView: {
      flex: 1,
      backgroundColor: "white",
      justifyContent: "center",
    },
    buttonBackStyle: {
      borderRadius: 20,
      padding: 5,
      margin: 5,
      elevation: 2,
      width: 80,
       backgroundColor: "#2196F3",
    },
    buttonBackColor: {
      backgroundColor: "#2196F3",
    },
    backButtonTextStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    }
  });
  
export default TelerPage ;




// const  dataXML=`<?xml version="1.0" encoding="UTF-8"?>
//     <mobile>
//     <store>27456-ameena app</store>
//     <key>rPBH5-wLBp#g4fkq</key>
//     <device>
//     <type>${device_id}</type> 
//     <id>${device_id}</id>  
//     <agent>WebView user agent header</agent> 
//     <accept>WebView accept header</accept> 
//     </device>
     
//     <app>
//     <name>{${appName}</name>
//     <version>${buildNumber}</version>
//     <user>${useID}</user>  
//     <id>Application installation ID</id>
//     </app>
//     <tran>
//     <test>0</test> 
//     <type>SALE</type>
     
//     <cartid>${cart_ID}</cartid>  
//     <description>pay from service from app</description>
//     <currency>SAR</currency>  
//     <amount>340.50</amount>  
//     <ref>Previous transaction reference</ref>  

//     </tran>
//     <card>
//     <number>${Card_number}</number>
//     <expiry>
//     <month>${Expiry_date_m}</month>  
//     <year>${Expiry_date_y}</year>
//     </expiry>
//     <cvv>${CVC}</cvv>  
//     </card>
//     <billing> 
    
//     <name>
//     <title>${title_name}</title>
//     <first>${Forenames}</first>
//     <last>${title_surname}</last>
//     </name>
//     <address>
//     <line1>umer bin utba street</line1>
     
//     <city>Maddinah</city>
//     <region>Maddinah</region>
//     <country>SA</country>  
//     <zip>Zip/Area/Postcode</zip>
//     </address>
//     <phone>9666543437660</phone>
//     <email>ziayd2009@gmail.com</email>
//     </billing>
//     </mobile>`