import React, { useContext } from 'react'
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import Feed from '../Components/Feed';
import { Navigate } from 'react-router-dom';

function PrivateRoute() {
    const {user} = useContext(AuthContext)
    return (
        user ? <Feed /> : <Navigate to="/login" />
    )
}

export default PrivateRoute