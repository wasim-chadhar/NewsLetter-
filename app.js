
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const { futimes } = require("fs");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");

});

app.post("/", function (req, res) {

    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;

    const data = {
        members:[
            {
                email_address: email,
                status : "subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };
    
    const jasonData = JSON.stringify(data);

    const url = "https://us13.api.mailchimp.com/3.0/lists/6f0054a06d";

    const options = {
        method : "POST",
        auth : "wasim1:af687fe50f2b5c9bc2adc495b520e461-us13"
    }

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    });

    request.write(jasonData);
    request.end()

});
 

app.post("/failure", function (req, res) {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function () {
    console.log("3000 activated!");
});



// API Key
// af687fe50f2b5c9bc2adc495b520e461-us13
 
//Audiece/list id
// 6f0054a06d
