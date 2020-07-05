import React from 'react'
import Login from './pages/Login'
import Home from './pages/Home'

import { Route, Switch, Redirect } from 'react-router-dom'

 const Routes = () => {
    return (
        <>
            <Switch>
              <Route path="/home" component={Home}/>
              <Route path="/login" component={Login}/>
              <Redirect from="/*" to="/home" strict exact/>
            </Switch>
        </>
    )
}

export default Routes