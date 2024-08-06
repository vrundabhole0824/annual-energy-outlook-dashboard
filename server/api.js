const express=require('express');
const getdata=require('./index');
const cors = require('cors');

const app=express();

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
};

app.use(cors(corsOptions));
const port = process.env.PORT || 5000;
app.get('/data',async (req,resp)=>{
    let data=await getdata();
    console.log(data);
    resp.send(data)

});
app.listen(port);

