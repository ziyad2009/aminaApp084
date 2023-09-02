// import React, { Fragment } from 'react';
// import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, Alert} from 'react-native';
// import {Header, Colors} from 'react-native/Libraries/NewAppScreen';
// import { CardField, useStripe } from '@stripe/stripe-react-native';

// const METHOD_DATA = [{
//   supportedMethods: ['apple-pay'],
//   data: {
//     merchantIdentifier: 'merchant.com.Aminah8530aminahapp1702',
//     supportedNetworks: ['visa', 'mastercard', 'amex'],
//     countryCode: 'US',
//     currencyCode: 'USD'
//   }
// }];

// const DETAILS = {
//   id: 'basic-example',
//   displayItems: [
//     {
//       label: 'Movie Ticket',
//       amount: { currency: 'USD', value: '15.00' }
//     },
//     {
//       label: 'Grocery',
//       amount: { currency: 'USD', value: '5.00' }
//     }
//   ],
//   shippingOptions: [{
//     id: 'economy',
//     label: 'Economy Shipping',
//     amount: { currency: 'USD', value: '0.00' },
//     detail: 'Arrives in 3-5 days' // `detail` is specific to React Native Payments
//   }],
//   total: {
//     label: 'Enappd Store',
//     amount: { currency: 'USD', value: '20.00' }
//   }
//  };
// // const OPTIONS = {
// //   requestPayerName: true,
// //   requestPayerPhone: true,
// //   requestPayerEmail: true,
// //   requestShipping: true
// // };
// // const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS, OPTIONS);

// // paymentRequest.addEventListener('shippingaddresschange', e => {
// //   const updatedDetails = getUpdatedDetailsForShippingAddress(paymentRequest.shippingAddress);

// //   e.updateWith(updatedDetails);
// // });

// // paymentRequest.addEventListener('shippingoptionchange', e => {
// //   const updatedDetails = getUpdatedDetailsForShippingOption(paymentRequest.shippingOption);

// //   e.updateWith(updatedDetails);
// // });

// // check = () => {
// //   paymentRequest.canMakePayments().then((canMakePayment) => {
// //     if (canMakePayment) {
// //       Alert.alert(
// //         'Apple Pay',
// //         'Apple Pay is available in this device'
// //       );
// //     }
// //   })
// // }

// // pay = () => {
// //     paymentRequest.canMakePayments().then((canMakePayment) => {
// //     if (canMakePayment) {
// //       console.log('Can Make Payment')
// //       paymentRequest.show()
// //         .then(paymentResponse => {
// //           // Your payment processing code goes here

// //           paymentResponse.complete('success');
// //         });
// //     }
// //     else {
// //       console.log('Cant Make Payment')
// //     }
// //   })
// // }

// const applepayscreen = () => {
//     const { confirmPayment } = useStripe();
//     return (
//         <CardField
//           postalCodeEnabled={true}
//           placeholders={{
//             number: '4242 4242 4242 4242',
//           }}
//           cardStyle={{
//             backgroundColor: '#FFFFFF',
//             textColor: '#000000',
//           }}
//           style={{
//             width: '100%',
//             height: 50,
//             marginVertical: 30,
//           }}
//           onCardChange={(cardDetails) => {
//             console.log('cardDetails', cardDetails);
//           }}
//           onFocus={(focusedField) => {
//             console.log('focusField', focusedField);
//           }}
//         />
//       );
// };
 

// export default applepayscreen;