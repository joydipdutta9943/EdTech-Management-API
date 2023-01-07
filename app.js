require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// rest of the packages
const cookieParser = require('cookie-parser');


// database
const connectDB = require('./db/connect');

//  routers
const userRouter = require('./routes/userRoutes');
const roleRouter = require('./routes/roleRoutes');
const schoolRouter = require('./routes/schoolRoutes');
const studentRouter = require('./routes/studentRouter');

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(express.static('./public'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use('/api/v1/user', userRouter);
app.use('/api/v1', schoolRouter);
app.use('/api/v1', roleRouter);
app.use('/api/v1', studentRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()