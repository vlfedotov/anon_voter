import React, { Component } from 'react';

import { db } from '../config.jsx';





function OneVote(props) {
    return (
        <div>
            <div>Критерий: {props.criteria}</div>
            <ul>
                {props.applicants.map(function(person, index){
                    return <li key={ index }>
                        <label>
                            <input type="checkbox"
                                                   onChange={props.toggleCheckbox.bind(this, index)}
                                                   value={ person.code } />
                            { person.name }
                        </label>
                    </li>;
                })}
            </ul>
        </div>
    )
}


export default class Voter extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.vote = this.vote.bind(this);
        this.getProperCriterion = this.getProperCriterion.bind(this);
        this.getProperApplicants = this.getProperApplicants.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);

        this.state = {
            user: props.user,
            role: '',
            criterion: {},
            applicants: [
                // { code: "di", name: "Дмитрий Иванюшин" },
                // { code: "pz", name: "Павел Завьялов" }
            ],
            
            current_criteria: { code: 'tests', title: 'Тесты' },
            winners: []
        };

        this.getProperCriterion(props.user);
        this.getProperApplicants(props.user);
        
    }

    getProperApplicants(user) {
        db.getRole(user)
            .then(snap => {
                const user_role = snap.val()[user].role;
                db.getColleges(user_role)
                    .then(snap => {
                        const dirty_applicants = snap.val();
                        let clean_applicants = [];
                        for (let key in dirty_applicants) {
                            let ap = dirty_applicants[key];
                            console.log(ap.joined);
                            let dirty_joined = ap.joined.split(".");
                            let joined = new Date(dirty_joined[2], dirty_joined[1] - 1, dirty_joined[0]);
                            const today = new Date();
                            let elapsed = (today - joined) / (1000 * 60 * 60 * 24);
                            if (key !== user && ap.role === user_role && elapsed > (90 + 30)) {
                                clean_applicants.push({code: key, name: ap.name});
                            }
                        }
                        this.setState({applicants: clean_applicants});
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    }

    getProperCriterion(user) {
        db.getRole(user)
            .then(snap => {
                const user_role = snap.val()[user].role;
                this.setState({'role': user_role});
                // this.vote();
                console.log(user_role);
                db.getCriterion(user_role)
                    .then(snap => {
                        this.setState({'criterion': snap.val()[user_role]});
                    })
                    .catch(error => {
                        console.log(error);
                    });

            })
            .catch(error => {
                console.log(error);
            });
    }

    toggleCheckbox(ind) {
        let new_winners = this.state.winners;

        if (this.state.winners.indexOf(this.state.applicants[ind].code) === -1) {
            new_winners.push(this.state.applicants[ind].code);
        } else {
            new_winners.splice(this.state.applicants[ind].code);
        }
        this.setState({winners: new_winners});
    }

    vote() {
        const MONTHS = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                       ];

        const today = new Date(),
              year = today.getUTCFullYear(),
              month = MONTHS[today.getMonth()];

        const ref = db.setResult(year, month, this.state.user, this.state.role);
        console.log(ref);
        const updates = {
            [this.state.current_criteria.code]: this.state.winners
        };

        ref.update(updates);

    }


    render() {
        return (
            <OneVote criteria={this.state.current_criteria.title} applicants={this.state.applicants} toggleCheckbox={this.toggleCheckbox}/>
        );
    }
}
