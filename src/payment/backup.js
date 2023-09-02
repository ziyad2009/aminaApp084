
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator,
  Modal,
  Pressable,
  View
} from 'react-native';
import WebView from 'react-native-webview';
import XMLParser from 'react-xml-parser';
const TelrSdk = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [startUrl, setStartUrl] = useState(null);
  const [code, setCode] = useState(null);
  const [isStatusApiCall, setIsStatusApiCall] = useState(true);

  var devUrl = "https://uat-secure.telrdev.com"
  var prodUrl = "https://secure.innovatepayments.com/gateway/mobile.xml"
  var something_went_wrong_message = "Something went wrong"
  useEffect(() => {
    if (props.telrModalVisible) {
      setStartUrl(null)
      setIsStatusApiCall(true)
      setCode(null)
      setIsLoading(true)
      var request = props.paymentRequest
      if(request.something_went_wrong_message != "" || request.something_went_wrong_message != null){
        something_went_wrong_message = request.something_went_wrong_message
      }
      if(request.sdk_env != "" || request.sdk_env != null || request.sdk_env != undefined){
        makePaymentApiCall();
      }else{
        props.didFailWithError("Please set sdk env as prod or dev")
      }
    }
  }, [props.telrModalVisible]);

  const makePaymentApiCall = () => {
    var request = props.paymentRequest
    var xmlRequest = `<?xml version="1.0" encoding="UTF-8"?>
    <mobile>
        <store>${request.store_id}</store>
        <key>${request.key}</key>
        <framed>2</framed>
        <device>
            <type>${request.device_type}</type>
            <id>${request.device_id}</id>
        </device>
        <app>
            <name>${request.app_name}</name>
            <version>${request.app_version}</version>
            <user>${request.app_user}</user>
            <id>${request.app_id}</id>
        </app>
        <tran>
            <test>${request.tran_test}</test>
            <type>${request.tran_type}</type>
            <class>${request.tran_class}</class>
            <cartid>${request.tran_cartid}</cartid>
            <description>${request.tran_description}</description>
            <currency>${request.tran_currency}</currency>
            <amount>${request.tran_amount}</amount>
            <language>${request.tran_language}</language>
            <firstref>${request.tran_firstref}</firstref>   
        </tran>
        <billing>
            <name>
                <title>${request.billing_name_title}</title>
                <first>${request.billing_name_first}</first>
                <last>${request.billing_name_last}</last>
            </name>
            <address>
                <line1>${request.billing_address_line1}</line1>
                <city>${request.billing_address_city}</city>
                <region>${request.billing_address_region}</region>
                <country>${request.billing_address_country}</country>
            </address>
                <custref>${request.billing_custref}</custref>
                <email>${request.billing_email}</email>
                <phone>${request.billing_phone}</phone>
        </billing>
    </mobile>`

    var requestUrl = `${request.sdk_env=="dev"?devUrl:prodUrl}/gateway/mobile.xml`
    console.log(requestUrl)
    fetch(requestUrl, {
      method: 'POST',
      body: xmlRequest
    }).then((response) => response.text())
      .then((textResponse) => {
        console.log(textResponse)
        var xml = new XMLParser().parseFromString(textResponse);
        const start = xml.getElementsByTagName("start");
        var startUrlTemp = start[0]?.value;
        if (startUrlTemp != null) {
          const code = xml.getElementsByTagName("code");
          var codeTemp = code[0]?.value;
          setCode(codeTemp)
          setStartUrl(startUrlTemp)
        } else {
          const message = xml.getElementsByTagName("message");
          var messageTemp = message[0]?.value;
          props.didFailWithError(messageTemp)
        }

      })
      .catch((error) => {
        console.log(error);
        props.didFailWithError(error?.message ? error?.message : something_went_wrong_message)
      });
  };

  const transStatusApiCall = () => {
    var request = props.paymentRequest
    setIsLoading(true)
    var xmlRequest = `<?xml version=\"1.0\"?>
    <mobile>
        <store>${request.store_id}</store>
        <key>${request.key}</key>
        <complete>${code}</complete>
    </mobile>`
    var requestUrl = `${request.sdk_env=="dev"? devUrl : prodUrl}/gateway/mobile_complete.xml`
    console.log(requestUrl)
    fetch(requestUrl, {
      method: 'POST',
      body: xmlRequest
    }).then((response) => response.text())
      .then((textResponse) => {
        console.log(textResponse)
        var xml = new XMLParser().parseFromString(textResponse);
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

            props.didPaymentSuccess(response)
          }else{
            props.didFailWithError(messageTemp)
          }
        }else{
          props.didFailWithError(messageTemp)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error);
        props.didFailWithError(error?.message ? error?.message : something_went_wrong_message)
      });
  };
  return (
    <Modal
      animationType="slide"
      visible={props.telrModalVisible}
      onRequestClose={() => {
        props.telrModalClose();
      }}>
      <SafeAreaView style={styles.centeredView}>
        <Pressable
          style={[props.buttonBackStyle ? props.buttonBackStyle : styles.buttonBackStyle, props.buttonBackColor ? props.buttonBackColor : styles.buttonBackColor]}
          onPress={() => props.telrModalClose()}>
          <Text style={props.backButtonTextStyle}>{props.backButtonText ? props.backButtonText : "Back"}</Text>
        </Pressable>
        <View style={styles.modalView}>
          {
            startUrl != null ? <WebView
              onLoad={() => { setIsLoading(true) }}
              onLoadEnd={() => { setIsLoading(false) }}
              onShouldStartLoadWithRequest={event => {
                  return true;
              }}
              onNavigationStateChange={navState => {
                if (navState.url.includes("gateway/details.html")) {
                  if (isStatusApiCall) {
                    setIsStatusApiCall(false)
                    transStatusApiCall()
                  }
                } else if (navState.url.includes("gateway/webview_close.html")) {
                  props.didFailWithError(something_went_wrong_message)
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
  );

};

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

export default TelrSdk;
