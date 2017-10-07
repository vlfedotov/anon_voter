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
                                     checked={props.winners.indexOf(person.code) !== -1}
                                     onChange={props.toggleCheckbox.bind(this, person.code)}
                                     value={ person.code } />
                              { person.name }
                        </label>
                    </li>;
            })}
          </ul>
        </div>
    );
}


export default class Voter extends Component {
    constructor(props) {
        super(props);

        this.vote = this.vote.bind(this);
        this.getProperCriterion = this.getProperCriterion.bind(this);
        this.getProperApplicants = this.getProperApplicants.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        this.getResultsDB = this.getResultsDB.bind(this);
        this.getCurrentCriteria = this.getCurrentCriteria.bind(this);

        this.state = {
            user: props.user,
            role: '',
            criterion: {},
            applicants: [],
            
            current_criteria: null,
            winners: [],

            ready: false
        };

        this.getProperCriterion();
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

    getProperCriterion() {
        db.getRole(this.state.user)
            .then(snap => {
                const user_role = snap.val()[this.state.user].role;
                this.setState({role: user_role});
                db.getCriterion(user_role)
                    .then(snap => {
                        let criterion = snap.val()[user_role];
                        const ref = this.getResultsDB();
                        ref.once('value')
                            .then(snap => {
                                const userResults = snap.val();
                                if (userResults) {
                                    for (let key in criterion) {
                                        if (Object.keys(userResults).indexOf(key) !== -1) {
                                            delete criterion[key];
                                        }
                                    }
                                }
                                this.setState({criterion: criterion});
                                this.getCurrentCriteria();
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    })
                    .catch(error => {
                        console.log(error);
                    });

            })
            .catch(error => {
                console.log(error);
            });
    }

    getCurrentCriteria() {
        for (let key in this.state.criterion) {
            this.setState({current_criteria: {code: key, title: this.state.criterion[key]}});
            this.setState({ready: true});
            return;
        }
        this.setState({current_criteria: null});
        this.setState({ready: true});
    }

    toggleCheckbox(person_code) {
        let new_winners = this.state.winners;
        const idx = this.state.winners.indexOf(person_code);
        if (idx === -1) {
            new_winners.push(person_code);
        } else {
            new_winners.splice(idx, 1);
        }
        this.setState({winners: new_winners});
    }

    getResultsDB() {
        const MONTHS = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                       ];

        const today = new Date(),
              year = today.getUTCFullYear(),
              month = MONTHS[today.getMonth()];

        return db.setResult(year, month, this.state.user, this.state.role);
    }
    
    vote() {
        if (this.state.winners.length === 0) {
            console.log('Nobody is choisen');
            return null;
        }
        this.setState({ready: false});
        
        const ref = this.getResultsDB();
        const updates = {
            [this.state.current_criteria.code]: this.state.winners
        };

        ref.update(updates);
        this.getProperCriterion();
        return null;
    }

    render() {
        let screen;
        if (!this.state.ready) {
            screen = <div>Ждём</div>;
        } else {
            if (this.state.current_criteria) {
                screen = <div>
                    <OneVote criteria={this.state.current_criteria.title} winners={this.state.winners} applicants={this.state.applicants} toggleCheckbox={this.toggleCheckbox}/>
                    <button onClick={this.vote}>Submit</button>
                    </div>;
            } else {
                screen = <div>Все критерии выбраны</div>;
            }
        }
        return (
            <div>
              {screen}
            </div>
        );
    }
}
