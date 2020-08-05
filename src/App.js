import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Pin from './components/pin'
import PinChat from './components/pinchat';
import LoginPanel from './components/LoginPanel';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/login' component={LoginPanel} />
        <Route exact path='/pins' component={Pin} />
        <Route exact path='/pins/:id' component={PinChat} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;