import React from 'react';
import {
    Route,
    Switch
} from "react-router-dom";
import auth from './components/auth/auth'
import home from './components/home/home'
import counter from './components/counter/friendCount'

export default function Router() {
    return (

            <Switch>
                <Route path="/" component={auth} exact/>
                <Route path="/home" component={home}/>
                <Route path="friendCunt" component={counter}/>
              
            </Switch>

    )
}
