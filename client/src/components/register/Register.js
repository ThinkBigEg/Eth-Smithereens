import React, { Component } from "react";
import './style.css'
export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        };
    }
    changeEmail(e){
        this.setState({email:e.target.value})
    }
    changePassword(e){
        this.setState({password:e.target.value})
    }
    submitForm() {
        // call your submit form with this.state.email & this.state.password

        this.setState({email:"",password:""})
    }
    render() {
        return (
            <div className="container" ref={this.myRef}>
                <div id="contact">
                    <h3>BSN Register Form</h3>

                    <fieldset>
                        <input onChange={this.changeEmail.bind(this)} placeholder="Your Email Address" type="email" tabIndex="1" required />
                    </fieldset>
                    <fieldset>
                        <input onChange={this.changePassword.bind(this)} placeholder="Your Password" type="text" tabIndex="2" required />
                    </fieldset>
                    <fieldset>
                        <button onClick={()=>{this.props.register(this.state.email,this.state.password)}} id="contact-submit" data-submit="...Sending">
                            Submit
                        </button>
                    </fieldset>
                </div>
            </div>
        );
    }
}
