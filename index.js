const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(
  express.static(path.join(__dirname, "public"), {
    extensions: ["html"]
  })
);

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (
    !req.secure &&
    req.get("x-forwarded-proto") !== "https" &&
    process.env.NODE_ENV !== "development"
  ) {
    return res.redirect("https://" + req.get("host") + req.url);
  }
  next();
}
app.use(requireHTTPS);

const PORT = 443;

app.listen(process.env.PORT || PORT, err => {
  if (err) console.log;
  console.log(`Server started on port: ${PORT}`);
});
