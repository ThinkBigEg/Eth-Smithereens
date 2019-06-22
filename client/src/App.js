import React, {
  Component
} from "react";

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

  
  render() {
    return (

      <Routes/>
      
      );
    }
  }

  export default App;