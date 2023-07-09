
interface MailCosntructor {
    email:string;
    firstName:string;
    lastName:string;
    token:string;
    userId:string;
}

const generatePasswordMail=({email,firstName,lastName,token,userId}:MailCosntructor)=>{
    return {
        from: process.env.EMAIL_FROM as string,
        subject:'Reset Password',
        to:email,
        template:'email',
        context : {
            title:`Reset Password for ${firstName} ${lastName}`,
            message: 'You requested password reset, please follow',
            linkMessage: 'this link',
            extra: 'if this wasnot you, we should increase your security',
            link: `${process.env.MY_APP}/reset-password/${token}?userId=${userId}`,
        }
    }
}

const generateEmailMail=({email,firstName,lastName,token,userId}:MailCosntructor)=>{
    return {
    from: process.env.EMAIL_FROM as string,
    subject:'Verify Email',
    to:email,
    template:'email',
    context:{
        title:`Email Verification for ${firstName} ${lastName}`,
        message:'You are about to verify your email, please follow',
        linkMessage:'this link',
        extra:'if this wasnot you, we should increase your security',
        link:`${process.env.MY_APP}/verify-email/${token}?userId=${userId}`
    }
    }
}

export {generatePasswordMail,generateEmailMail};