const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL ||
    process.env.MONGODB_URI || 'mongodb://user:password123@ds151626.mlab.com:51626/heroku_whnb1d1j',{
    useUnifiedTopology: true,                
    useNewUrlParser: true
  }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);


const port = process.env.PORT || 5000;


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
