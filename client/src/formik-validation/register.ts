import {ObjectSchema,string,object} from 'yup'

import { RegisterValues } from "../types/register";


const registerValues:RegisterValues={
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:''
}

const registerValidationSchema:ObjectSchema<RegisterValues>=object({
    firstName:string().required('first_name_required'),
    lastName: string().required('last_name_required'),
    email:string().required('email_required').matches(/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'valid_email'),
    password:string().required('password_required'),
    confirmPassword:string().required('confirm_password_required')
});

export {registerValues, registerValidationSchema};