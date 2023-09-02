import whatapi from  '../whatapi';


const sendbyWhats = async (Bodytext,Tomobaile,FromMobaile,appname,orderId) => {
    console.log("Test WHATS", "order id===",orderId)
    await whatapi.post(`/whatsapptemplate`,{
        Body:Bodytext,
        From:FromMobaile,
        To:Tomobaile,
        appname:appname,
        orderId:Number(orderId)
    }).then((res) => {
      console.log("test response from whats",res.data)
      return res.data
    })
    .catch((err) => { console.log("ERORR from whats", err) })
    
}

export default sendbyWhats;
   