require("dotenv").config()
require('express-async-errors')
const cors = require('cors')
const express = require('express');
const app = express()
const teams = require("./routes/TeamRoutes")
const members = require("./routes/MemberRoutes")
const presentations = require("./routes/PresentationRoutes")
const auth = require("./routes/userRoutes")
const account = require("./routes/accountRoutes")
const event = require("./routes/eventRoutes")
const result = require("./routes/resultRoutes")      
const lookp = require("./routes/LookprRoutes")
const registrations = require("./routes/registrationRoutes")




const connectDB = require("./db/connect")
const notFound = require('./middlwares/notFound')
const errorHandler = require('./middlwares/errHandler')
const { authUser } = require('./middlwares/authUser')

const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.static('./view'))
app.use(express.json())
app.use('/api/v1/', auth)
app.use('/api/v1/', authUser, teams) 
app.use('/api/v1/', authUser, members) 
app.use('/api/v1/', authUser, presentations)
app.use('/api/v1/', authUser, account)
app.use('/api/v1/', authUser, event)
app.use('/api/v1/', authUser, result)
app.use('/api/v1/', authUser, lookp) 
app.use('/api/v1/', authUser, registrations)





app.use(notFound)
app.use(errorHandler)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`Server is listening on port ${PORT}`))

    } catch (error) {
        console.log(error)
    }
}

start()