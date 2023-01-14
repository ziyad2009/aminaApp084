
import React,{ useEffect,useState} from 'react';
import api from '../services/api';
import setItem from '../services/storage';
import socketio from "socket.io-client";
import { URL_ws, URL_ws_chat } from './links';
import DeviceInfo from 'react-native-device-info';
import deviceInfoModule from 'react-native-device-info';

//export const SocketContext = React.createContext();


export const UserContext =React.createContext({})

  const SOKITIO = socketio(URL_ws_chat);
  const SOKITIOSetter = socketio(URL_ws);

   
   
 const  UserProvider= ({children})=> {
      const [user, setUser] = useState(null);
      const [token, setToken] = useState('');
      const [expoPushToken, setExpoPushToken] = useState();
      const [loading, setLoading] = useState(true);
     const [verify,setverify]=useState(false)
     const [regUser,setRegUser]=useState(false)
     const [statuscode,setstatuscode]=useState(null)
    const[home,sethome]=useState(false)
    const[errmsg,seterrmsg]=useState('')
    const[notifaction,setnotifaction]=useState(0)
    const [DeviceID,setDeviceId]=useState(0)
    const[chatroom,setchatroom]=useState('')
      useEffect(() => {
         async function tryGetUser(){ 
            await setItem.removeItem('BS:User');
            await setItem.removeItem('BS:Token');
           // await setItem.removeItem('BS:Location');
           //await setItem.removeItem('on:like');
          
            const user = await setItem.getItem('BS:User');
            const token = await setItem.getItem('BS:Token');
            if(!user || !token){
                setLoading(false);
                setRegUser(false);
                console.log("can t get user fro Contxt");
                return false;
            }
            try{
                api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
                const {data : user_from_api} = await api.get('/users/me')
                if(!user_from_api){
                    setUser(false)
                    setLoading(false)
                    setRegUser(false)
                    return;
                }
                if(!user_from_api.verify){
                    setverify(false)
                    setUser(user_from_api);
                    setRegUser(true);
                    
                    console.log(" user vervay not ",user_from_api.verify)
                    return;
                }
                console.log("test USER Data ",token)
                ///go home
                setUser(user_from_api);
                setToken(token);       
                setRegUser(true)                                          
                setLoading(false);
                sethome(true);
            } catch(err){
                console.log(err);
                console.log("can t get user");
            }
        };
        
        tryGetUser();
    }, [])

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
                console.log("Contxt  test respons Comtext",response.data)
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
         loginbyphone,
         loginbycoded,
         sethome,
         ErorrMessage,
         setnotifaction,
         Getchatoom
        

         
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