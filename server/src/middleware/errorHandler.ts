import {Request,Response,NextFunction} from 'express'
import {StatusCodes} from 'http-status-codes'
import ErrorResponse from '../utils/errorResponse';
import errorMessages from '../utils/errorMessages';

const errorHandler=(err:any,req:Request,res:Response,next:NextFunction)=>{
    console.log(err);
    let errors={...err};
    errors.message=err.message;

    if(err.code==='P2002') {
        errors=new ErrorResponse(errorMessages.uniqueEmailError,StatusCodes.CONFLICT);
    }
    return res.status(errors.statusCode || 500).json({
        success:false,
        error:errors.message || 'Something went wrong'
    })
}

export default errorHandler;