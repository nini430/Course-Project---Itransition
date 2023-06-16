import express,{Request,Response} from 'express';
import path from 'path'
import cors from 'cors';

import apiRouter from './routes/api'

import errorHandler from './middleware/errorHandler';
import authProtect from './middleware/authProtect';

const app = express();

app.use(express.json());
app.use(cors())

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
