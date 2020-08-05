import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Pin from './components/Pin'
import PinChat from './components/PinChat';
import LoginPanel from './components/LoginPanel';
import { useDispatch, useSelector } from 'react-redux';
import { loadToken } from './actions/authentication';
import SignUp from './components/SignUp';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.needLogin === true ? <Redirect to='/login' /> : <Component {...props} />
  )} />
)

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const needLogin = useSelector(state => !state.auth.token);

  useEffect(() => {
    setLoaded(true);
    dispatch(loadToken())
  }, [dispatch])

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact={true} component={LoginPanel} />
        <Route path='/signup' exact={true} component={SignUp} />
        <PrivateRoute path='/pins' exact={true} needLogin={needLogin} component={Pin} />
        <PrivateRoute path='/pins/:id' exact={true} needLogin={needLogin} component={PinChat} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;