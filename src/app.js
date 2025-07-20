
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const path=require("path")
console.log(__dirname)
const x=path.join(__dirname,"../puplic")
app.use(express.static(x))
///////////////////////////////////////////////////////////////////////////////////
app.set('view engine','hbs')
const hbs=require("hbs");
const { error } = require("console");
const partialspath=path.join(__dirname,"../partials")
hbs.registerPartials(partialspath)

app.get("/home",(req,res)=>{
   res.render('index',{
    title:"home",
    des:"this home page"
   }) 
})

/////////////////////////////////////////////////////////////////////////////////

app.get('/product',(req,res)=>{
    console.log(req.query)
    console.log(req.query.model)
    res.send({
        product:"bmw 2020"
    })
})
///////////////////////
const geocode=require('./tools/geocode')
const forcast=require('./tools/forcast')
app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"you must enter address"
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error || !data || !data.latitude || !data.Longitude){
            return res.send({
                error: "Unable to find location. Try another search."
                 });
        }
        forcast(data.latitude,data.Longitude,(error,forcastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forcast:forcastdata,
                location: data.location
            })
        })
    })
})
////////////////////////////////




app.use("/" ,(req,res)=>{
    res.send('404 page not found')
})

  app.listen(port, () => {
    console.log(`app work on port ${port}`);
});