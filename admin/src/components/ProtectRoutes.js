import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIsLogin } from '../redux/apiCalls/auth';

const ProtectRoutes = ({children}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLogin } = useSelector((state) => state.auth);

    useEffect(() => {
        checkIsLogin(dispatch)
        if(!isLogin) {
            return navigate('/')
        };
    
        return children;
    }, [dispatch, isLogin])

    // if(!isLogin) {
    //     return navigate('/')
    // };

    // return children;
}

export default ProtectRoutes
