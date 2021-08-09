import React from 'react';
import {Route,Switch} from 'react-router';
import {ChannelAdd,ChannelDetail,ChannelList, SignUp, SignIn,ChannelEdit} from './templates';
import Auth from './Auth'

const Router = () => {
    return (
        <Switch>
            <Route exact path={"/signup"} component={SignUp} />
            <Route exact path={"/signin"} component={SignIn} />
            <Auth>
                <Route exact path={"(/)?"} component={ChannelList} />
                <Route exact path={'/channel/:id'} component={ChannelDetail} />
                <Route path={"/channel/edit(/:id)?"} component={ChannelEdit} />
                <Route path={"/channel/add"} component={ChannelAdd} />    
            </Auth>
        </Switch>
    )
};

export default Router