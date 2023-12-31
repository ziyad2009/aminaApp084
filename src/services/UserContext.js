
import React,{ useEffect,useState} from 'react';
import api from '../services/api';
import setItem from '../services/storage';
import socketio  from "socket.io-client";
import SocketIOClient from "socket.io-client";
import { URL_ws, URL_ws_chat } from './links';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';

//export const SocketContext = React.createContext();


export const UserContext =React.createContext({})

  


const SOKITIO = socketio(URL_ws_chat);
 // const SOKITIOSetter = socketio(URL_ws);
  const SOKITIOSetter = SocketIOClient(URL_ws, {
    jsonp: false,
  });
    
  const userphone="966543437660"
    const user = {
        "username": userphone, "expirtime": 99000,room:`aminaorders${userphone}`
    }
    console.log("ROOMM",user)
    SOKITIOSetter.emit("join",user)
      
    SOKITIOSetter.emit("motherorders",user)
    SOKITIOSetter.on("message", (messageData) => {
        console.log("Data from Room  ",messageData)
      })
    SOKITIOSetter.on("uriserv", (response) => {
        console.log("start send Evettn====++ ",response)
    })

   
 const  UserProvider= ({children})=> {
      const [user, setUser] = useState(null);
      const [token, setToken] = useState('');
      const [expoPushToken, setExpoPushToken] = useState();
      const [loading, setLoading] = useState(true);
     const [verify,setverify]=useState(false)
     const [regUser,setRegUser]=useState(false)
     const[dirction,setdirction]=useState(null)
     const [statuscode,setstatuscode]=useState(null)
    const[home,sethome]=useState(false)
    const[errmsg,seterrmsg]=useState('')
    const[notifaction,setnotifaction]=useState(0)
    const [DeviceID,setDeviceId]=useState(0)
    const[chatroom,setchatroom]=useState('')
    const[notifactionStatuse,setnotifactionStatuse]=useState(null)
    const[notifactionstring,setnotifactionstring]=useState('')
    const[notifeeStatuse,setnotifeeStatuse]=useState(null)
      useEffect(() => {
         async function tryGetUser(){ 
        //    await setItem.removeItem('BS:User');
        //    await setItem.removeItem('BS:Token');
        //    await setItem.removeItem('BS:Location');
        //    await setItem.removeItem('on:like');
        //   await setItem.removeItem(' @FCMTOKEN');
       
          
            const user = await setItem.getItem('BS:User');
            const token = await setItem.getItem('BS:Token');
            if(!user || !token){
                setLoading(false);
                setRegUser(false);
                setdirction(false)
                console.log("can t get user fro Contxt no user!");
                return false;
            }
            try{
                api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
                const {data : user_from_api} = await api.get('/users/me')
                if(!user_from_api){
                    setUser(false)
                    setLoading(false)
                    setRegUser(false)
                    setdirction(false)
                    console.log(" User dont have token!");
                    return;
                }
                if(!user_from_api.verify){
                    setverify(false)
                    setUser(user_from_api);
                    setRegUser(true);
                    
                    console.log("User is not verify ++++  ",user_from_api.verify)
                    return;
                }
                console.log("User token is from backend ?? ",token)
                console.log("User information from  backend ?? ",user_from_api)
                ///go home
                setUser(user_from_api);
                setToken(token);       
                setRegUser(true)                                          
                setLoading(false);
                setverify(true)
                setdirction(true)
                getfromToken()
               // sethome(true);
            } catch(err){
                setUser(false)
                setLoading(false)
                setRegUser(false)
                setdirction(false)
                console.log("Erorr  from backendd",err);
                 
            }
        };
        
        tryGetUser();
    }, [])

    const getfromToken=async()=>{
        try {
          const fcmToken = await messaging().getToken()
          await setItem.setItem("@FCMTOKEN",fcmToken)
          console.log("fcm token: fromm context==", fcmToken)
            
        } catch (error) {
          console.log("error in creating token ++++ +++++ ++",error)
      }
    }
    const diviceID= async()=>{
        const DevId= await DeviceInfo.getUniqueId()
        return DevId
    }
    diviceID().then((res)=>{
         console.log("DIVICE IDD ==>", res)
         setDeviceId(res)
    })
    
    const Getchatoom=(val)=>{
        setchatroom(val)
        console.log("test oom name",val)
    }

    const regestrationPhone= async(val)=>{
        console.log(`Contx  -start regester by ${val}`)
        const newresponse =await api.post(`/adduser`,
        {  
            phone:val,
         }
         ).then((res)=>{
            console.log(" new Data Regster",res.data)
            
           
        }).finally(( )=>{
            console.log("start login by new DATA***")
            loginbyphonefirstTime(val)
        })
        .catch((error) => {
            if(error.message='Request failed with status code 404'){
                console.log("ContXErorr",error.message)
                 return  setstatuscode(404)
            }
        }) 

       // return newresponse;
    }


    const loginbyphonefirstTime =async(val)=>{
        await api.get(`/userphone/${val}`).then((res)=>{
            setstatuscode(res.status)
            homeScreen(res,{new:true})
        }).catch((error) => {
         if(error.message='Request failed with status code 404'){
            //setstatuscode(404)
         }
         console.log("Contex-Code Erorr",error)
     }) 
   
       
    }

    const  loginbyphone =async(val)=>{
            await api.get(`/userphone/${val}`).then((res)=>{
            
            if( res.data.message==='User is not found!'){
                 return regestrationPhone(val)
            }

            setstatuscode(res.status)
            homeScreen(res,{new:false})
            
            return  {data:res.data}
            
         }).catch((error) => {
             if(error.message='Request failed with status code 404'){
                
                 //setstatuscode(404)
             }
             console.log("Contex-Code Erorr",error)
         }) 
      
        }

        const  newCode=async(user)=>{
            const motherData = await setItem.getItem('BS:User');
            const mother=JSON.parse(motherData)
            const token= await setItem.getItem('BS:Token');
            console.log("start send cod")
            if(user.login===true){
               return console.log("this user not accsept code")
            }
                api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
                 await api.post('/user/newcode', {
                        id:  mother._id
                        
                      }).then((res)=>{
                        console.log("new code send ",res.data)
                      }).catch((err)=> console.log("Erorr ",err) )
                      
      
           }
      

        const homeScreen= async(response,data)=>{
             
            if(response){
                console.log("Contxt  test respons Comtext",response.data.token)
                api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
            
                await setItem.removeItem('BS:User');
                await setItem.removeItem('BS:Token');
                await setItem.setItem('BS:User', JSON.stringify(response.data.user));
                await setItem.setItem('BS:Token', JSON.stringify(response.data.token));
                await setItem.setItem('BS:Phone',JSON.stringify(response.data.user.phone));
                setToken(response.data.token);
                setUser(response.data.user);
                console.log("user data pre load",response.data.token)
                if(!data.new ){
                    newCode(response.data.user)
                }
                setRegUser(true)
                
                // if(!response.data.user.verify){
                //     setRegUser(true);
                // }
                //==================================
                // if(response.data.user.verify){
                //     setRegUser(true);
                //     // sethome(true);
                // }
            }

        }
       

       const  loginbycoded =async(code,id)=>{
           
            const response =await api.post(`/user/code`,  {
                id,
                code
            }).then((res)=>{
                 if(res.data.status===false){
                     console.log("code Erorr",res.data.status)
                     seterrmsg("الرجاء التاكد من الكود المرسل")
                     setstatuscode(res.status)
                     
                 }
                 if(res.data.status===true){
                    console.log("code Sucsseful ",res.data.status)
                    seterrmsg("")
                    setstatuscode(res.status)
                    
                }
               // sethome(true);
                
                return res.data
                
             }).catch((error) => {
                 if(error.message='Request failed with status code 404'){
                    console.log("Contex-Code Erorr",error.message)
                   
                    //setstatuscode(404)
                 }
             })
             console.log("test  By code result",response)

             return  response;
       }
         
      
 
       const ErorrMessage=(msg)=>{
        seterrmsg(msg)
       }

       const getnotfeeStause=(val)=>{
        setnotifeeStatuse(val)
       }
       const getnotfctionstatuse=(val)=>{
        setnotifactionStatuse(val)
       }
       const getnotfctionstring=(val)=>{
        setnotifactionstring(val)
       }

        return(
        <UserContext.Provider value={
         {loading,
            user,
            verify,
            regUser,
            statuscode,
            errmsg,
            home,
            notifaction,
            SOKITIO,
            SOKITIOSetter,
            DeviceID,
            chatroom,
            dirction,
            notifactionStatuse,
            notifactionstring,
            notifeeStatuse,
         loginbyphone,
         loginbycoded,
         sethome,
         ErorrMessage,
         setnotifaction,
         Getchatoom,
         getnotfctionstatuse,
         getnotfctionstring,
         getnotfeeStause
        
         
         
        }
        }>
         {children}
        </UserContext.Provider>
         
        )

   }

   export default UserProvider;

   // console.log(res.data);
            // console.log(res.status);
            // console.log(res.statusText);
            // console.log(res.headers);
            // console.log(res.config);
            //return res.data;