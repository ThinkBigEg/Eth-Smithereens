import React, {
  Component
} from "react";

import ipfs from './utils/ipfs.js';
import {convertToBuffer, submitToIPFS} from './utils/IPFSWrapper.js'

import "./App.css";
import './css/tailwind.css';
import Routes from "./routes";


class App extends Component {
  state = {
    showModal: false,
    loading: true,
    uploading:false,
    web3Wrapper: {},
    UserModel: {},
    PostModel: {},
    GroupModel: {},
    ipfsHash : null,
    image  : null
  };

  

  // componentDidMount = async () => {

  //   var contracts = [UserFactoryJSON, PostFactoryJSON, UserJSON, CommentJSON, OriginalPostJSON, SharedPostJSON, PostJSON, GroupFactoryJSON, GroupJSON]
  //   var web3Wrapper = new Web3Wrapper(web3, contracts);
  //   await web3Wrapper.initializeContracts(["UserFactory", "PostFactory", "GroupFactory"]);

  //   var UserModel = new User(web3Wrapper);
  //   var PostModel = new Post(web3Wrapper);
  //   var GroupModel = new Group(web3Wrapper);
  //   this.setState({
  //     web3Wrapper,
  //     UserModel,
  //     PostModel,
  //     GroupModel
  //   });



  //   var check = await UserModel.checkUserExists();
  //   if (!check) {
  //     await UserModel.registerNewUser("Omar Khaled", "omar@gmail.com");
  //   }
  //   var data = await UserModel.getUser();
  //   let userObj = {
  //     name: data[0],
  //     email: data[1],
  //     address: data[2]
  //   };
  //   await window.sessionStorage.setItem("user", JSON.stringify(userObj));
  //   this.setState({
  //     loading: false
  //   });



  // }


  /**return ( <div> {
                    !this.state.loading && < Layout UserModel = {this.state.UserModel}
                                PostModel = {this.state.PostModel}
                                GroupModel = {this.state.GroupModel}
                    />
                    } 
        </div>
      ); */

  // captureFile = (event) => {
  //    event.stopPropagation();
  //    event.preventDefault();

  //    const file = event.target.files[0];
  //    let reader = new window.FileReader();
  //    reader.readAsArrayBuffer (file);
  //    reader.onloadend = () => this.OnConvertToBuffer(reader);
  // }

  // // // Function for turning a file into a buffer

  // OnConvertToBuffer = async (reader) => {
  //   const buffer = await convertToBuffer(reader);
  //   // set state with buffer
  //   console.log('buffer : ', buffer);
  //   this.setState({buffer});
  //   //return buffer;
  // }

  // onIPFSSubmit = async (event) => { 
  //   event.preventDefault();
    
  //   let url = await submitToIPFS(this.state.buffer, this);
    
  //   console.log('loading', this.state.uploading);
    
  // };

  

  
  render() {
    return (
    //   <div className="App">
    //   <h2> 1. Add a file to IPFS Here </h2>
    //   <h1> state {
    //     this.state.uploading
    //   } </h1> 
    //   <form id = "ipfs-hash-form" className="scep-form" onSubmit={this.onIPFSSubmit}>
    //     <input type = "file" onChange={this.captureFile} />
    //     <button type="submit"> Send It </button> 
    //   </form>

    //   <img src= {this.state.imageUrl} />
      
    // </div>
      <Routes/>
      
      );
    }
  }

  export default App;