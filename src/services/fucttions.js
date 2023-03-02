//push notifction 
import React,{useContext,useRef} from 'react'
import api from "./api"
import { URL_ws,URL,URL_ws_chat } from "./links"
import setItem from './storage';

import  {UserContext} from '../services/UserContext';


// const emitnotifactio=()=>{
//   const {SOKITIOSetter} = useContext(UserContext);
//   Socket=SOKITIOSetter
//   Socket.emit("")
// }
 

export const sendNotifcation= async(data)=>{
  
    console.log("start send notifcation",data)
    const token = await setItem.getItem('BS:Token');
    const motherData = await setItem.getItem('BS:User');
    
    const mother=JSON.parse(motherData)
    const randoID =  Math.floor(1000 + Math.random() * 9000);
    
    console.log("test notifcation sender UUId",data.playerid)

    const motheerId=mother._id
    const username=mother.phone.toString()
    const datauseerr= {motheerId,username,token}


    api.defaults.headers.Authorization =(`Bearer ${JSON.parse(token)}`);
        try {
          await api.post("setternotfications",{
              "id":randoID,
              "sender":mother._id,
              "receiver":data.receiver,
              "type":"text",
              "content":data.content,
              "is_read":false ,
              "phone":mother.phone,
              "title":data.title,
              "orderid":data.orderid,
              "playerid":data.playerid
      }).then((res)=>{console.log("Notifcations",res.data)})
      .catch(err=>console.log("ERorr from notifaction",err))

        } catch (error) {
          console.log("ERorr from notifaction",error)
        } 
        
}