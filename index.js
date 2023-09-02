/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee,{ EventType } from '@notifee/react-native';

notifee.onBackgroundEvent(async ({type, detail}) => {
  console.log('type is ++', EventType[type], detail);
  if (type === EventType.ACTION_PRESS && detail.pressAction?.id === 'default') {
      await notifee.cancelNotification(detail.notification?.id)
  } else if (detail.pressAction?.id === "dismiss") {
      await notifee.cancelNotification(detail.notification?.id);
    }
})


//   Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    notifee.displayNotification(JSON.parse(remoteMessage.data.notifee));
  });
 

  
AppRegistry.registerComponent(appName, () => App);
