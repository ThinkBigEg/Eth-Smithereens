import { BrowserRouter as Router, Route} from "react-router-dom";

import React from 'react'
import Registeration from "./pages/registeration";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Options from "./pages/options";
import GroupPage from "./pages/group";

const Routes = () => {
  return (
    <Router>
          <Route exact path="/" component={Registeration} />
           <Route path="/home" component={Home} />
           <Route path='/user/:address' component={Profile} />
           <Route path='/options' component={Options}/>
           <Route path='/group/:address' component={GroupPage}/>
    </Router>
  )
}

export default Routes;
