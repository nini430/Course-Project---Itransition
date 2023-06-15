const removeTokens=(token?:'access_token'|'refresh_token')=>{
    if(token) {
        localStorage.removeItem(token);
    }else{
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
}   

export default removeTokens;