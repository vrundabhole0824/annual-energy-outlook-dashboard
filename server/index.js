
const {MongoClient}=require('mongodb')
const url='mongodb://0.0.0.0:27017'
const client=new MongoClient(url);

async function getdata(){
    let result=await client.connect();
   let db= result.db('student');
   let collection=db.collection('info');
   let response=await collection.find({}).toArray();
   return response;
}
 module.exports=getdata;