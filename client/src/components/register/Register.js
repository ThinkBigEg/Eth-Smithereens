import React, { Component } from "react";
import './style.css'
export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: ""
        };
    }
    changeName(e){
        this.setState({name:e.target.value})
    }
    changeEmail(e){
        this.setState({email:e.target.value})
    }
    submitForm() {
        // call your submit form with this.state.name & this.state.email

        this.setState({name:"",email:""})
    }
    render() {
        return (
            <div className="container" ref={this.myRef}>
                <div id="contact">
                    <h3>BSN Register Form</h3>

                    <fieldset>
                        <input onChange={this.changeName.bind(this)} placeholder="Your name Address" type="text" tabIndex="1" required />
                    </fieldset>
                    <fieldset>
                        <input onChange={this.changeEmail.bind(this)} placeholder="Your email" type="text" tabIndex="2" required />
                    </fieldset>
                    <fieldset>
                        <button onClick={()=>{this.props.register(this.state.name,this.state.email)}} id="contact-submit" data-submit="...Sending">
                            Submit
                        </button>
                    </fieldset>
                </div>
            </div>
        );
    }
}
