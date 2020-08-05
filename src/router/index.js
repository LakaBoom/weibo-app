import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(()=> import('../pages/Login'));
const New = lazy(() => import('../pages/New'));

const Router = () => {
    return (
        <Suspense fallback='loading'>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/new" component={New} />
                <Route exact path="/comment/:id" component={New} />
            </Switch>
        </Suspense>
    )
}
export default Router;