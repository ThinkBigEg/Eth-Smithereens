import React, { Component } from 'react'
import User from './user';

class Users_List extends Component {

  constructor(props) {
    super(props);
    
    this.state={
      isLoading:true,
      users:[]
    }
  }

  
  componentDidMount = async()=>{

    var users = await this.props.UserModel.getUsers();
    let user = JSON.parse(await window.sessionStorage.getItem("user"));
    this.setState({isLoading:false,users, user});
  }

  follow = async(user_contract_address)=>{
    let user = JSON.parse(await window.sessionStorage.getItem("user"));
    await this.props.UserModel.followNewUser(user.address,user_contract_address);
  }

  render() {
    return (
        <div className="bg-white p-3 mb-3">
        <div>
          <span className="text-lg font-bold">Who to follow</span>
          <span>·</span>
          <span><a href="#" className="text-teal text-xs">Refresh</a></span>
          <span>·</span>
          <span><a href="#" className="text-teal text-xs">View All</a></span>
        </div>
        {!this.state.isLoading  &&this.state.users.map((user)=>{
          if (this.state.user.address != user.address){
            let follower = this.props.followers.filter((address) => {
              return user.address == address;
            });
            if(!follower.length) { 
              return (
                
                <User key={user.address} follow={this.follow} user={user} />
              )
            }
            
          }
            
        })}
      </div>
    )
  }
}

export default Users_List;
