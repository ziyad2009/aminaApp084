import React, { Fragment } from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, Alert,TouchableOpacity} from 'react-native';
import { AddCard ,SelectPayment} from 'react-native-checkout'
import { Colors, Metrics } from '../assets/Themes/';

const PaymentCardDisplay=(props)=>{

    

return(
    
      <View style={{flex:1, backgroundColor:Colors.AminabackgroundColor, flexDirection:'column',height:Metrics.HEIGHT}}>
        
            <SelectPayment
                enableApplePay={true} // optional, default: false
                applePayHandler={() => console.log('apple pay happened')} // optional
                paymentSources={[
                    { last4: '1234', brand: 'American Express', more: 'stuff' },
                    { last4: '2345', brand: 'Visa', more: 'stuff' },
                    { last4: '2345', brand: 'Master Card', more: 'stuff' },
                    { last4: '34242', brand: 'mada', more: 'stuff' },
                ]} // mandatory, See: [Customer Object](https://stripe.com/docs/api/node#customer_object) -> sources -> data for Stripe format.
                
                addCardHandler={() =>  props.navigation.push("AddPaymentCard") }
                selectPaymentHandler={(paymentSource) => console.log(paymentSource)}
                addNewCardText="اضف بطاقة جديده"
                styles={{}} // Override default styles
            />
 
    </View>
 
)
}

export default PaymentCardDisplay;