

import notifee, { EventType ,AuthorizationStatus} from '@notifee/react-native';

const notifee_onForegroundEvent=()=>{

    notifee.onForegroundEvent(({ type, detail }) => {
        //console.log("starr 00000000000000",type,"aand =",detail)
        if (type === EventType.APP_BLOCKED) {
          console.log('User toggled app blocked????', detail.blocked);
        }
      
        if (type === EventType.CHANNEL_BLOCKED) {
          console.log('User toggled channel block???', detail.channel.id, detail.blocked);
        }
      
        if (type === EventType.CHANNEL_GROUP_BLOCKED) {
          console.log('User toggled channel group block???', detail.channelGroup.id, detail.blocked);
        }
     });

}
         