import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './components/Home/Home';
import Mens from './components/Mens/Mens';
import Womens from './components/Womens/Womens';
import ShoppingBag from './components/ShoppingBag/ShoppingBag';



export default (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/mens" component={Mens} />
        <Route path="/womens" component={Womens} />
        <Route path="/bag" component={ShoppingBag} />
    </Switch>
)