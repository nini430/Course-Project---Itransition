import express,{Request,Response} from 'express';
import path from 'path'
import cors from 'cors';
import morgan from 'morgan'

import apiRouter from './routes/api'

import errorHandler from './middleware/errorHandler';
import authProtect from './middleware/authProtect';

const app = express();
 
app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({limit:'10mb',extended:true}));
app.use(cors())
app.use(morgan('dev'));

app.use('/api/v1',apiRouter);


app.get('/api/v1/test',authProtect,(req:any,response:Response)=>{
    return response.status(200).json({success:true,data:'test_success',user:req.user});
});

app.use(express.static(path.join(__dirname,'..','public')));
app.get('/*',(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'));
})

app.use(errorHandler);

export default app;
