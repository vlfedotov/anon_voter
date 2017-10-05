import React, { Component } from 'react';


function OneVote(props) {
    return <div>
        Hello, {props.criteria}
        <ul>
            <li>vf</li>
            <li>pz</li>
            <li>pi</li>
            <li>di</li>
        </ul>
    </div>;
}


export default class Voter extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.vote = this.vote.bind(this);
        this.getProperCriterion = this.getProperCriterion.bind(this);

        this.state = {
            user: props.user,
            applicants: []
        };

        this.state['criterion'] =this.getProperCriterion();
    }

    getProperCriterion() {

        return [this.state.user, this.state.user]
    }

    vote() {
        const email = this.state.email;
        const pass = this.state.password;
    }


    render() {
        return (
            <OneVote criteria="ert"/>

        );
    }
}
