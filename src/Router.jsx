import React from 'react';
import {Route,Switch} from 'react-router';
import {Home, SignUp, SignIn,ChannelEdit} from './templates';
import Auth from './Auth'

const Router = () => {
    return (
        <Switch>
            <Route exact path={"/signup"} component={SignUp} />
            <Route exact path={"/signin"} component={SignIn} />

            <Auth>
                <Route exact path={"(/)?"} component={Home} />
                <Route exact path={"/channel/edit"} component={ChannelEdit} />
            </Auth>
        </Switch>
    )
};
export default Router