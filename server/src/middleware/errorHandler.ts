import {Request,Response,NextFunction} from 'express'

const errorHandler=(err:any,req:Request,res:Response,next:NextFunction)=>{
    const errors={...err};
    errors.message=err.message;


    return res.status(errors.statusCode || 500).json({
        success:false,
        error:err.message || 'Something went wrong'
    })
}

export default errorHandler;