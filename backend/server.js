const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const connectToMongo  = require("./utils/authDB");
const PORT = process.env.PORT;
dotenv.config();
connectToMongo ();
const app = express();
const path = require('path')

const authRoutes = require("./routes/authRoute")
const taskRoutes = require("./routes/taskRoute")
const userRoutes = require("./routes/userRoute")
const sendEmailRoute = require("./routes/sendEmailRoute")

const corsOptions = {
    origin:"*", 
    optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/send-email', sendEmailRoute);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
