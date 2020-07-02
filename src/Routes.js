import React from 'react'
import Home from './pages/Home'
import { Route, Switch, Redirect } from 'react-router-dom'

 const Routes = () => {
    return (
        <>
            <Switch>
              <Route path="/" component={Home}/>
              <Redirect from="/*" to="/" strict exact/>
            </Switch>
        </>
    )
}

export default Routes