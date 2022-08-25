
import React,{ useEffect,useState} from 'react';
import api from '../services/api';
import setItem from '../services/storage';
import socketio from "socket.io-client";
import { URL_ws, URL_ws_chat } from './links';


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

    const regestrationPhone= async(val)=>{
        console.log(`Contx  -start regester by ${val}`)
        const newresponse =await api.post(`/adduser`,
        {  
            phone:val,
         }
         ).then((res)=>{
            console.log("Data Regster",res)
            
           
        }).then((res)=>{
            console.log("second res starrrrt")
            loginbyphone(val)
        })
        .catch((error) => {
            if(error.message='Request failed with status code 404'){
                console.log("ContXErorr",error.message)
                 return  setstatuscode(404)
            }
        }) 

       // return newresponse;
    }


      const  loginbyphone =async(val)=>{
         const response =await api.get(`/userphone/${val}`).then((res)=>{
            
             if( res.data.message==='User is not found!'){
                 console.log(`Contx  -user  regester!  by ${res.data.message}`)
                    regestrationPhone(val)
              // return;
            }
            
            // if(res.data.message==="User is not verify code!"){
            // // if(!res.data.status&&res.data.verify){
            //     console.log("   Contxt   Auth Code  ")
            //     setRegUser(true)
            //      setUser(response.data.user)
            //     // sethome(true);
            //     return res; 
            // } 

            // console.log("contxt test Data user OK",res)
            //  homeScreen(res)
            console.log("contxt test Data user OK++",res.data)
            setstatuscode(res.status)
           return homeScreen(res)
            
         }).catch((error) => {
             if(error.message='Request failed with status code 404'){
                
                 //setstatuscode(404)
             }
             console.log("Contex-Code Erorr",error)
         }) 
       
        //   if(response.role != "mather"){
        //     throw(`You are not registered as , please enter with your correct user`);
        // }
       
        

           
        }

        const homeScreen= async(response)=>{
            //console.log("Home screen",response)
            if(response){
                console.log("Contxt  test respons Comtext",response)
                api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
            
                await setItem.removeItem('BS:User');
                await setItem.removeItem('BS:Token');
                await setItem.setItem('BS:User', JSON.stringify(response.data.user));
                await setItem.setItem('BS:Token', JSON.stringify(response.data.token));
                await setItem.setItem('BS:Phone',JSON.stringify(response.data.user.phone));
                setToken(response.data.token);
                setUser(response.data.user);
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
         loginbyphone,
         loginbycoded,
         sethome,
         ErorrMessage,
         setnotifaction,
        

         
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