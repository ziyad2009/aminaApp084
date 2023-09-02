import React, { useState, useRef, useEffect ,useContext} from 'react';
import { Image, View, TouchableOpacity, TextInput, Platform, Alert, Modal, StyleSheet, SafeAreaView, Pressable, ActivityIndicator } from 'react-native';

import TelrSdk from "rn-telr-sdk";

function WrapperComponent() {
    const [telrModalVisible, setTelrModalVisible] = useState(false);
    const [paymentRequest, setPaymentRequest] = useState(null);
    const telrModalClose = () => {
      setTelrModalVisible(false)
      Alert.alert("Transaction aborted by user");
    }
    const didFailWithError = (message) => {
      setTelrModalVisible(false)
      Alert.alert(message);
    }
    const showTelrPaymentPage = () => {
      
    var paymentRequest = {
        framed:"1",//open card frame pass 1, and for webview pass 0
        sdk_env: "prod",//prod//dev
        something_went_wrong_message: "Something went wrong",//  this message for suppose someitng is happen wrong with payment then you can config this one.
        store_id: "27456-ameena app",
        key: "rPBH5-wLBp#g4fkq",
        device_type: Platform.OS === 'android' ?  "Android":"iOS",
        device_id: "36C0EC49-AA2F-47DC-A4D7-D9927A739F99",
        app_name: "Aminaapp",//enter app name
        app_version: "46.0",//app version
        app_user: "123456",//app user
        app_id: "102863o777",//app user id
        tran_test: "0", // 1=test, 0=production
        tran_type: "sale",//sale
        tran_class: "paypage",
        tran_cartid: `${Math.floor(Math.random() * 100) + 2}`,//enter cart id it shoud be unique for every transaction //1234567890
        tran_description: "paymetn from aminah app ",// enter tran description
        tran_currency: "SAR",
        tran_amount: tran_amount,
        tran_language: "en",
        tran_firstref: "",
        billing_name_title: "Ms",
        billing_name_first: billing_name_first,
        billing_name_last: billing_name_last,
        billing_address_line1: "omer bin otba",
        billing_address_city: "Riyad",
        billing_address_region: "Saudi Arabia",
        billing_address_country: "SA",
        billing_custref: "001",
        billing_email: email,
        billing_phone: phone,
        repeat_amount: "1",
        repeat_interval: "1",
        repeat_period: "M",
        repeat_term: "3",
        repeat_final: "",
        repeat_start: "27062023"
      }
  
      setPaymentRequest(paymentRequest)
      setTelrModalVisible(true)
    }
    return (
      <View>
        <TelrSdk paymentRequest={paymentRequest} telrModalVisible={telrModalVisible} telrModalClose={telrModalClose} didFailWithError={didFailWithError}/>
      </View>
    );
  }