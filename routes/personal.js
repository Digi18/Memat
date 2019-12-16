const express = require('express');
const router = express.Router();
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

var dburl = process.env.URL;

router.get('/personal',(req,res) => {

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

                                    	 let output = result.map(r => ({'img':r.img,'title':r.title}));

                        	             res.send(output);
                                         client.close();  
                                    }
                      	});

                      }
       });
});

module.exports = router;