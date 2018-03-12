import React from 'react';
import { Switch, Route } from 'react-router-dom';
import auth from './components/auth/auth'


export default (
    <Switch >
        <Route exact path = '/' component = {auth} />
        
    </Switch >
)