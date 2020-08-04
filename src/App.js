import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Pin from './components/pin'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/pins' component={Pin} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;