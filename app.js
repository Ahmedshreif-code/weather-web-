// lec7
// Express     node frame
// 4 crud operation  creat => post    read=> get      update=> patch      delete=>delete
// local host: 3000 5000 node
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const path=require("path")
console.log(__dirname)
const x=path.join(__dirname,"../puplic")
app.use(express.static(x))
 

// app.get('/', (req, res) => {
//     res.send({
      
// }); });

app.get('/prices', (req, res) => {
    res.send("hello prices page");
});
app.get('/about', (req, res) => {
    res.send("hello about page");
});
app.get('/page', (req, res) => {
    res.send("hello page 1");
});
app.get('/page2', (req, res) => {
    res.send("hello page 2");
});

///////////////////////////////////////////////////////////////////////////////////
// lec8
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
app.get("/services",(req,res)=>{
   res.render('servcies',{
    title:"servcies",
    name:"ahmedddd",
    city:"mansoura",
    age:10,

   }) 
})
/////////////////////////////////////////////////////////////////////////////////
// lec 9
app.get('/product',(req,res)=>{
    console.log(req.query)
    console.log(req.query.model)
    res.send({
        product:"bmw 2020"
    })
})
///////////////////////
// app.get('/weather',(req,res)=>{
//     if(!req.query.address){
//         return res.send({
//             error:"you must enter address"
//         })
//     }
//     res.send({
//         location:'Egypt',
//         weather:"cold"
//     })
// })
////////////////////////
const geocode=require('./tools/geocode')
const forcast=require('./tools/forcast')
app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"you must enter address"
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({error})
        }
        forcast(data.latitude,data.Longitude,(error,forcastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forcast:forcastdata,
                location:req.query.address
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