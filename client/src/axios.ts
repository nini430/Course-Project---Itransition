import axios,{AxiosError} from 'axios';


declare module 'axios' {
  interface AxiosRequestConfig {
    _isRetry: boolean;
  }
}

const axiosApiInstance = axios.create({
  baseURL: 'http://localhost:7070/api/v1',
  _isRetry: false,
});


axiosApiInstance.interceptors.response.use((response)=>{
  return response;
},async(err:AxiosError)=>{
  const errorMessage=err.response?.data;
  err.message=errorMessage as any;
  return Promise.reject({...err});
});


export default axiosApiInstance;
