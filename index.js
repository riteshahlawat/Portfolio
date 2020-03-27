const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.enable("trust proxy");

app.use(
    express.static(path.join(__dirname, "public"), {
        extensions: ["html"]
    })
);

app.get("*", function(request, response){
    response.redirect("https://" + request.headers.host + request.url);
  });

const PORT = 8787;

app.listen(process.env.PORT || PORT, (err) => {
    if (err) console.log
    console.log(`Server started on port: ${PORT}`);
});
