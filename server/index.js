import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import PostRouters from './routes/posts.js'
import userRouters from './routes/users.js';
// import dotenv from 'dotenv';
const app= express();
// dotenv.config();

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use('/posts',PostRouters);
app.use('/user',userRouters)
 const CONNECTION_URL='mongodb+srv://test:test@cluster0.a33bp.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;



mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

// mongoose.set('useFindAndModify', false);
