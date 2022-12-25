const express = require("express");
const bodyparser = require("body-parser");
const request =require("request");
const https = require("https");


const app =express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    const firstname =req.body.fname;
    const lastname =req.body.lname;
    const email =req.body.email;

    const data ={
        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };

    const jsonData= JSON.stringify(data);

   const url="https://us10.api.mailchimp.com/3.0/lists/612e4d86ff";

   const options = {
    method: "POST",
    auth: "vinay:29a918064498478338221151a948903f-us10"
   }
    const request = https.request(url, options, function(response){

      if(response.statusCode == 200) {
        res.sendFile(__dirname +"/success.html");
      } 
      else {
        res.sendFile(__dirname +"/failure.html");
      }  
      response.on("data",function(data){
        console.log(JSON.parse(data));
      })
    })
    
    request.write(jsonData);
    request.end();
});


app.post("/failure", function(req, res){
    res.redirect("/")
})

app.listen(process.env.PORT || 5000,function(){
    console.log("server is runninh on port 5000");
});


//api id 
//9cae44ac72bce929977f6ca9c12a36f1-us10

// new api id
//29a918064498478338221151a948903f-us10

//audicance id or list id
//612e4d86ff