const express = require("express");
const cors = require("cors");
const db = require("../Database/Data");
const Admin = require("../Model/Admin");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = "hkfsjdkhfjksadhjknjnjdskdbfkj";

// Middleware
app.use(cors({  credentials: true,origin: 'http://localhost:5173' })); // Allow cross-origin requests from your frontend
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser());

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("This is the data");
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newAdmin = await Admin.create({
      email,
      password: hashedPassword,
    });
    res.json(newAdmin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    const isPasswordMatch = bcrypt.compareSync(password, admin.password);
    if (isPasswordMatch) {
        jwt.sign({username:admin.username,id:admin._id},secret,{},(err,token)=>{
            if(err)throw new Error('Error in the token',err);
            res.cookie('token',token).json('ok')
        })
     
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Profile
app.post('/profile',(req,res)=>{
    const{token}=req.cookies;
    jwt.verify(token,secret,{},(err,info)=>{
    if(!info)
    {
        res.status(500).json(err)
    }
    res.json(info)
    })


})
//Logout
app.post('/logout',(req,res)=>{
    req.cookies('token','');
    res.json();
})


// Start the Express server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
