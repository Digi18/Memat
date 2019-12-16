const express = require('express');
const dburl = process.env.URL;
const router = express.Router();
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

router.get('/getGeneral',(req,res) => {

       MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

                      if(err){
                      	console.log("Error",err);
                      }
                      else{

                      	let collection = client.db('Memat').collection('General');

                      	collection.find({}).toArray((err,result) => {

                                
                                    if(err){
                                    	console.log("Error",err);
                                    }
                                    else{

                                    	 let output = result.map(r => ({'name':r.name,'image':r.image,'price':r.price}));

                        	             res.send(output);
                                         client.close();  
                                    }
                      	});

                      }
       });
});

module.exports = router;