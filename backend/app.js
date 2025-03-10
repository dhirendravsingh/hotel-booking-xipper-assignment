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


//this route is for user registration/signup
app.post('/signup', async (req, res)=> {
    try {
        const {email, password } = req.body;
        if(!email) return res.status(400).json({message : "Email is required"})
        if(!password) return res.status(400).json({message : "Password is required"})

        const userInfo = await prisma.user.findUnique({where : {email}})
        if(userInfo) return res.status(400).json({message : "Email already exists"})

        const user = await prisma.user.create({data : {email : email, password : password }})

        const accessToken = jwt.sign({id: user.id}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn : "360000m"
        })

        res.status(201).json({message: "User created successfully", user, accessToken});

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message : "Internal Server Error"})
    }
    
})


//this route is for user login
app.post('/login', async (req, res)=> {
    try {
        const {email, password} = req.body;
        if(!email) return res.status(400).json({message : "Email is required"})
        if(!password) return res.status(400).json({message : "Password is required"})
        
        const userInfo = await prisma.user.findUnique({where : {email}})
        if(!userInfo) return res.status(400).json({message : "Email is not registered!"})
        
        if(userInfo.email===email && userInfo.password===password){
            const accessToken = jwt.sign({ id: userInfo.id }, process.env.ACCESS_TOKEN_SECRET, {

                expiresIn : "360000m" })
            return res.status(200).json({message:  "User is successfully logged in", email, accessToken})
        }     
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message : "Internal Server Error"})
    }
})


//this is a dynamic which is for booking of a specific hotelId
app.post(`/booking/:hotelId`, authenticateToken, async (req,res)=>{
   try {
    const {hotelId} = req.params
    const { bookingDate, people} = req.body
    const userId = req.user.id
    if(!userId) return res.status(404).json({message : "Kindly check for the user"})
    if(!hotelId) return res.status(404).json({message : "Kindly check the hotel"})
    if(!bookingDate) return res.status(404).json({message : "Kindly fill in the dates"})
    if(!people) return res.status(404).json({message : "Kindly fill in the number of people"})
    
    const booking = await prisma.booking.create({
        data : {
            userId,
            hotelId,
            bookingDate : new Date(bookingDate),
            numberOfPeople : people
         }
    })

    return res.status(200).json({message : "Booking has been created successfully", booking})
   } catch (error) {
    console.error(error.message)
    return res.status(500).json({message : "Internal Server Error"})
   }
})

//this will be a route on /webcheckin to get all the available booking for the user
app.get('/webcheckin', authenticateToken, (req,res)=>{
    try {
        const userId = req.user.id
        if(!userId) return res.status(404).json({message : "Kindly check for the user"})
        const booking = prisma.booking.findMany({where : {userId}})
        return res.status(200).json({message : "Booking has been retrieved successfully", booking})
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({message : "Internal Server Error"})
    }
})

//this is also a dynamic route, which will be based on the specific bookingId and is used to do web check in
app.post("/webcheckin/:bookingId", authenticateToken, async (req,res)=>{
    try {
        const {bookingId} = req.params 
        const {aadhaarNumbers} = req.body

        const bookingIdNumber = Number(bookingId);

        if(!aadhaarNumbers) return res.status(404).json({message : "Kindly enter the aadhar details"})
        const booking = await prisma.booking.findUnique({
            where : {
                id : bookingIdNumber
            }
        })
        if(!booking) return res.status(404).json({message : "Booking not found"})
        
        if(aadhaarNumbers.length!== booking.numberOfPeople){
            return res.status(404).json({message : "Number of aadhar numbers does not match to the number of people for booking"})
        }

        const webCheckin = await prisma.webCheckin.create({
            data : {
                bookingId : bookingIdNumber,
                aadhaarNumbers 
            }
        })
        return res.status(200).json({message : "Web checkin has been created successfully"})
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({message : "Internal Server Error"})

    }
})


app.listen(3000, ()=> {console.log("Server is running on port 3000")})
