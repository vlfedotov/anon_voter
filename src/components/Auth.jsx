import React, { Component } from 'react';

import app from '../config.jsx';


export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            username: '',
            email: '',
            password: ''
        };
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    login() {
        const email = this.state.email;
        const pass = this.state.password;
        app.auth().signInWithEmailAndPassword(email, pass)
            .then(firebaseUser => {
                this.setState({token: firebaseUser.refreshToken});
                this.setState({username: email});
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleChange(event) {
        this.setState({[event.target.type]: event.target.value});
    }
    
    render() {
        return (
            <div className="container-fluid">
              <div>{this.state.username}</div>
              <div className="form-group">
                <label>Email address
                  <input type="email" value={this.state.email} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </label>
              </div>
              <div className="form-group">
                <label>Password
                  <input type="password" value={this.state.password} onChange={this.handleChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </label>
              </div>
              <button onClick={this.login} className="btn btn-primary">Submit</button>
            </div>
        );
    }
}
