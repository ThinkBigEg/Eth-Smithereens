import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './home';
import {contracts,initialize} from '../utils/Web3Wrapper.config'
import web3 from "../utils/Web3"
import Web3Wrapper from "../utils/Web3Wrapper"
import User from "../models/User"
class Registeration extends Component {
  
  state={
    name: "",
    email: "",
    UserModel:{}
  };

  changeName(e){
    this.setState({name:e.target.value})
  }

  changeEmail(e){
      this.setState({email:e.target.value})
  }

  submitForm=async ()=>{
      
      await this.state.UserModel.registerNewUser(this.state.name,this.state.email);
      await this.getAndStoreUser();
      this.props.history.push('/home')
  }

  getAndStoreUser=async()=>{
    var user = await this.state.UserModel.getUser();
    await window.sessionStorage.setItem("user", JSON.stringify(user));
  }

  componentDidMount=async ()=>{

    var web3Wrapper = new Web3Wrapper(web3, contracts);
    await web3Wrapper.initializeContracts(initialize);
    var UserModel = new User(web3Wrapper);
    this.setState({UserModel})
    var check = await UserModel.checkUserExists();
    if (check) {
      await this.getAndStoreUser();
      this.props.history.push('/home')
    } 
    
  }

  render() {
    return (
      <div className="bg-grey-lighter h-screen font-sans">
            <div className="container mx-auto h-full flex justify-center items-center">
              <div className="w-1/3">
                <h1 className="font-hairline mb-6 text-center text-teal font-bold">Blockcahin Social Network</h1>
                <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
                  <div className="mb-4">
                    <label className="font-bold text-grey-darker block mb-2">Username</label>
                    <input onChange={this.changeName.bind(this)} type="text" className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Your Username" />
                  </div>
                  <div className="mb-4">
                    <label className="font-bold text-grey-darker block mb-2">Email</label>
                    <input onChange={this.changeEmail.bind(this)} type="text" className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder="Your Email" />
                  </div>
                  <div className="flex items-end justify-end">
                    <button onClick={this.submitForm.bind(this)} className="bg-teal hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-full">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </div>
            
    )
  }
}

export default Registeration;
