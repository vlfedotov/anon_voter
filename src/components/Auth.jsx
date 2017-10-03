import React, { Component } from 'react';


export default class Auth extends Component {
    constructor (props) {
        super(props);
        this.state = {
            token: '',
            name: ''
        };
    }





    render() {
        return (
            <div className="container-fluid">
                <form>
                    <div className="form-group">
                        <label>Email address
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Password
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" value="Check me out" /> Subscribe to newsletter?
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}
