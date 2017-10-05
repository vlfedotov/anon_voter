import React, { Component } from 'react';
import './App.css';

import Auth from './components/Auth.jsx';
import Voter from './components/Voter.jsx';
import Result from './components/Result.jsx';

import './config.jsx';


class App extends Component {
    render() {
        return (
            <div>
              <Auth/>
              <Voter user="vf"/>
              <Result/>
            </div>
        );
    }
}

export default App;
