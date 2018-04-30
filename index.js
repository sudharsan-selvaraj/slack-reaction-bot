const express = require('express')
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var BACKEND_IP = process.env.npm_package_config_backend || "127.0.0.1";
const PORT = process.env.PORT || 5000

app.engine('.html', exphbs({extname: '.html'}));
app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', ".html");

// app.all("*", function (req, res) {
//     console.log(`http://${BACKEND_IP}:3000`);
//     apiProxy.web(req, res, {target: `http://${BACKEND_IP}:3000`});
// });

app.post("/getimage", (req, res)=> {

    var response = {
        "text": "New comic book alert!",
        "attachments": [
            {
                "title": "The Further Adventures of Slackbot",
                "image_url": "http://2.bp.blogspot.com/-I5q_amc2t-s/U-edLQWIRWI/AAAAAAAAEio/79sbZFCUIzo/s1600-d/v4.jpg"
            },
            {
                "fallback": "Would you recommend it to customers?",
                "title": "Would you recommend it to customers?",
                "callback_id": "comic_1234_xyz",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "send",
                        "text": "send",
                        "type": "button",
                        "value": "send"
                    },
                    {
                        "name": "shuffle",
                        "text": "shuffle",
                        "type": "button",
                        "value": "shuffle"
                    }
                ]
            }
        ]
    }

    res.send(response);

});

app.post("/shuffle", (req, res)=> {

});

app.post("/send", (req, res)=> {

});

app.post("/save", (req, res)=> {

});

app.get("/", (req, res)=> {
    res.render('index.html')
});

app.listen(PORT, () => console.log('Example app listening on port 3000!'))