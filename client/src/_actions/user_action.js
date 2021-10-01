import axios from "axios";
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types'

export function loginUser(dataToSubmit) {
    const request = axios.post('/api/login', dataToSubmit).then(response => response.data)
    console.log("loginUser",request)
    return {
        type: LOGIN_USER,
        payload : request
    }
};

export function registerUser(dataToSubmit) {

    const request = axios.post('/api/register', dataToSubmit).then(response => response.data)
    console.log("registerUser",request)
    
    return {
        type: REGISTER_USER,
        payload : request
    }
};

export function authUser() {

    const request = axios.get('/api/auth').then(response => response.data)
    console.log("AuthUser",request)
    
    return {
        type: AUTH_USER,
        payload : request
    }
};