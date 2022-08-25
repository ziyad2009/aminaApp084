const Babysetter =require('../modals/Babysetter/Babysettermodal')

const userevent=(socket)=>{
   const idsocket=socket.id
console.log('Welcome a user connected io',socket.id);
socket.on('disconnect', async(data) => {
    const setter= await Babysetter.updateOne({
        soktid:socket.id},{
            $set:  {onlaine:false} }
        )
     
    console.log('user disconnected',data);
});
socket.on("login",async (data)=>{
    const setter= await Babysetter.updateOne({
        owner:data.id},{
            $set:  {onlaine:true ,soktid:socket.id} }
        )
     
    socket.emit("user-login",(data)=>{
        console.log("Welcome  user", JSON.stringify(data))
    })
})
socket.on("logout",async (data)=>{
    const setter= await Babysetter.updateOne({
        owner:data.id},{
            $set:  {onlaine:false ,soktid:socket.id} }
        )
     
    socket.emit("user-logout",(data)=>{
        console.log("user logout",data.name)
    })
})
}
module.exports=userevent