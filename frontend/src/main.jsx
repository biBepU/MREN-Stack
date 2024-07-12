import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import Router from './routers/index'
import { AuthContextProvider } from './contexts/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
        <Router/>
 </AuthContextProvider>
)
