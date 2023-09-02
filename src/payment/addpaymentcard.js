import React, { Fragment } from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, Alert,TouchableOpacity} from 'react-native';
import { AddCard ,SelectPayment} from 'react-native-checkout'
import { Colors, Metrics } from '../assets/Themes/';

const AddPaymentCard=()=>{

    const MyScanCardContainer = (props) => {
        return <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => props.onClose()} style={{marginTop: 20, padding: 20, width: 150}}>
            <Text style={{fontSize: 18}}>Close</Text>
          </TouchableOpacity>
          {props.children}
        </View>
      }

return(
    <SafeAreaView>
      <View style={{backgroundColor:Colors.AminabackgroundColor, flexDirection:'column',height:Metrics.HEIGHT}}>
        <View style={{backgroundColor:Colors.textZahry,height:Metrics.HEIGHT*0.4712}}>
          <AddCard
              addCardHandler={(cardNumber, cardExpiry, cardCvc) => {
                console.log(`${cardNumber} ${cardExpiry} ${cardCvc}`)
                return Promise.resolve(cardNumber) //return a promise when you're done
              }}
              styles={{}} // Override default styles
              onCardNumberBlur={() => console.log('card number blurred')}
              onCardNumberFocus={() => console.log('card number focused')}
              onCvcFocus={() => console.log('cvc focused')}
              onCvcBlur={() => console.log('cvc blurred')}
              onExpiryFocus={() => console.log('expiry focused')}
              onExpiryBlur={() => console.log('expiry blurred')}
              onScanCardClose={() => console.log('scan card closed')}
              onScanCardOpen={() => console.log('scan card opened')}
              activityIndicatorColor="pink"
              addCardButtonText="اضف بطاقتك"
              scanCardButtonText="Scan Card"
              scanCardAfterScanButtonText="Scan Card Again"
              scanCardVisible={false}
              placeholderTextColor="black"
              cardNumberPlaceholderText="xxx-0000-000"
              expiryPlaceholderText="MM/YY"
              cvcPlaceholderText="CVC"
              cardNumberErrorMessage="تاكد من رقم البطاقة"
              expiryErrorMessage="Expiry is incorrect"
              cvcErrorMessage="CVC is incorrect"
              
            // scanCardContainer={MyScanCardContainer}
            />

  
   

    </View>
      
    </View>
    
    </SafeAreaView>
)
}

export default AddPaymentCard;