const express = require('express');

const app=express();
const port = 3023;

//parse JSON using express
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//array of object
let inboxes=[{
    "BarCode":"357883080233800",
    "BarCode2":"357883080233818",
    "Model":"Olvio L21",
    "Grade":null,
    "GradeReason":null,
    "RegistrationDate":"12/16/1901",
    "PhoneNumber":"+8801220000000",
    "DealerCode":"6563",
    "DealerName":"Sarker Telecom-Savar",
    "DealerDistributionDate":"7/8/2017",
    "OrderNo":"Order 1",
    "Price":750.0
}];


//get
app.get("/getall",(req,res)=>{
    res.json(inboxes);
});

//post
app.post("/inbox",(req,res)=>{
    const inbox=req.body;

    console.log(inbox);
    inboxes.push(inbox);
    res.send('data added to the list!!');
});

//search for barcode
app.get("/inbox",(req,res)=>{
    const barcode=req.query.barcode;
    console.log(barcode);
    for(let inbox of inboxes){
        if(inbox.BarCode===barcode){
            res.json(inbox);
            console.log(inbox);
            return;
        }
    }
    res.status(404),res.send('Barcode not found.');
});


//set server to listen
app.listen(port, ()=> console.log(`server listening at port ${port}`));