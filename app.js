const express= require('express');
const app=express();
const morgan=require('morgan'); // used for see  all logs all requests
const bodyParser=require('body-parser');


app.use(morgan('dev')); // use morgan for development mode only;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Allow CORS(Cross-Origin-Resource-Sharing)
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
})

// Imports routes
const requestsRoutes=require('./api/routes/requests');
app.use('/requests', requestsRoutes);


// handle not founds errors or other one
app.use((req,res,next)=>{
    const error=new Error('Not Found');
    error.status=404;
    next(error);
})

// handle next requests

app.use((error,req, res, next)=>{
    console.log(error.message)
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})


module.exports=app;