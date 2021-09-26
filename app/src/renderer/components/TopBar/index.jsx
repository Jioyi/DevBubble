import React from 'react';
import { Route, Switch } from 'react-router-dom';
//components
import DirectMessageTopBar from './components/DirectMessageTopBar';

const TopBar = () => {
  return (
    <Switch>
      <Route path="/direct_message/:ID" render={() => <DirectMessageTopBar />} />
    </Switch>
  );
};

export default TopBar;
