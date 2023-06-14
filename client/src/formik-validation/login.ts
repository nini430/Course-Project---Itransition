import {ObjectSchema,object,string} from 'yup'
import { LoginValues } from '../types/login'

const loginValues:LoginValues={
    email:'',
    password:''
}

const loginValidationSchema:ObjectSchema<LoginValues>=object({
    email:string().required('email_required').matches(/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'valid_email'),
    password:string().required('password_required')
})

export {loginValues,loginValidationSchema};