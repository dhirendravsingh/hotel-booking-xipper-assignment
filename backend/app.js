const express = require('express')
const cors = require('cors')
const prisma = require('./prisma/index')
const app = express()
const jwt = require("jsonwebtoken")
const authenticateToken = require("./utilities")

app.use(cors({
    origin : "*"
}))
app.use(express.json())

app.post('/signup', async (req, res)=> {
    try {
        const {email, password } = req.body;
        if(!email) return res.status(400).json({message : "Email is required"})
        if(!password) return res.status(400).json({message : "Password is required"})

        const userInfo = await prisma.user.findUnique({where : {email}})
        if(userInfo) return res.status(400).json({message : "Email already exists"})

        const user = await prisma.user.create({data : {email : email, password : password }})

        const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn : "360000m"
        })

        res.status(201).json({message: "User created successfully", user, accessToken});

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message : "Internal Server Error"})
    }
    
})


app.post('/login', async (req, res)=> {
    try {
        const {email, password} = req.body;
        if(!email) return res.status(400).json({message : "Email is required"})
        if(!password) return res.status(400).json({message : "Password is required"})
        
        const userInfo = await prisma.user.findUnique({where : {email}})
        if(!userInfo) return res.status(400).json({message : "Email is not registered!"})
        
        if(userInfo.email===email && userInfo.password===password){
            const accessToken = jwt.sign({user : userInfo}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn : "360000m" })
            return res.status(200).json({message:  "User is successfully logged in", email, accessToken})
        }     
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message : "Internal Server Error"})
    }
})


app.post(`/${hotelId}/booking`, authenticateToken, (req,res)=>{
    
})


app.listen(6000, ()=> {console.log("Server is running on port 6000")})