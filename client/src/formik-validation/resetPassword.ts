import {ObjectSchema,object, string} from 'yup'

interface ResetPasswordValues {
    newPassword:string;
    confirmNewPassword:string;
}


const resetPasswordValues:ResetPasswordValues={
    newPassword:'',
    confirmNewPassword:''
}


const resetPasswordValidationSchema:ObjectSchema<ResetPasswordValues>=object({
    newPassword: string().required('password_required'),
    confirmNewPassword: string().required('confirm_new_password_required')
})

export {resetPasswordValidationSchema,resetPasswordValues}