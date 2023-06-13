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
    firstName:string().required('First Name is required'),
    lastName: string().required(),
    email:string().required().matches(/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Enter Valid E-mail'),
    password:string().required(),
    confirmPassword:string().required()
});

export {registerValues, registerValidationSchema};