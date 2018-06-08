const express = require("express"),
      bodyParser = require("body-parser"),
      cookieParser = require("cookie-parser"),
      mongoose = require("mongoose"),
      path = require("path"),
      app = express();




mongoose.Promise = global.Promise;

mongoose.connect("mongodb://ranjiitk121:Gohan12@ds149960.mlab.com:49960/cic_hub_final_project").
then(res => console.log("connected to database")).
catch(err => console.log("failed to connect"));


app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));




// Routes
const indexRoutes = require("./routes/index"),
      employeeRoutes = require("./routes/employees"),
      adminRoutes = require("./routes/admin");

app.use("/api", indexRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/admin", adminRoutes);




const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
      console.log("magic is happening at ", PORT);
});
