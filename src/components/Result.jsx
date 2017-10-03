import React, { Component } from 'react';

import fixtures from '../tests/fixtures.json';


export default class Result extends Component {
    render() {
        return (
            <div className="container-fluid">
              <div className="container-fluid voter">
                <div className="column">
                  
                </div>
                <div className="column">
                  
                </div>
              </div>
              
              <div className="legend">
                <span className="legend-name">
                 {fixtures.users.pi.name}
                </span>
                <span className="legend-name">
                  {fixtures.users.pz.name}
                </span>
              </div>
              
            </div>        
        );
    }
}
