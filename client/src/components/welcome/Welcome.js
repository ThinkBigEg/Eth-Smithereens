import React,{Component} from "react";
import Header from "../header/Header";
import Register from "../register/Register"
export default class Welcome extends Component{
    constructor(props){
        super();
        this.state = {
            register:false,
            login:false
        }
    }
    changeToRegister(){
        this.setState({register:true,login:false})
    }
    changeToLogin(){ // not impelemented yet
        this.setState({register:false,login:true})
    }
    render()   {
        return (
        <div className="pageContent">
            <Header logged={this.props.logged} 
            changeRegister = {this.changeToRegister.bind(this)}
            changeToLogin  = {this.changeToLogin.bind(this)}
            />
            {
                // if he clicked on register 
                this.state.register && <Register />
            }
            {
                !this.state.register &&
                <div className="welcomeScreen">
                    <h1 className="rotate-center">Block Chain Network</h1>
                </div>
            }
            
        </div>
    );}
};

