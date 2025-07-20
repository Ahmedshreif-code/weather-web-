const requset =require ("request")
const forcast=(latitude,Longitude,callback)=>{
const url ="http://api.weatherapi.com/v1/current.json?key=71b4071f02664801add225236250607&q="+latitude+","+Longitude
requset({url,json:true},(error,response)=>{
    if (error){
        callback("can't fint the website ",undefined)
    }else if (response.body.error)  {
        callback(response.body.error.message,undefined)
    }
    else {
        callback(undefined,response.body.location.name +" "+ response.body.current.condition.text+" "+ response.body.current.temp_c)
    }
})
}
module.exports=forcast