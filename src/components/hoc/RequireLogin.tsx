

import React, { ReactNode, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import Login from '../auth/Login';
import { useAppContext } from '../../contexts/AppProvider';
import Feed from '../feed/Feed';

function RequireLogin({children}:{children:ReactNode}) {

    const user= useAppContext().userLoggedin.user;
    const navigate = useNavigate();


    if(!user){
        
        return <Login/>
    }
    else{
        return <>{children}</>
    }
}

export default RequireLogin;