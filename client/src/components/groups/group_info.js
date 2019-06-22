import React, { Component } from 'react'
import {Link} from "react-router-dom";
class GroupInfo extends Component {

  render() {
     const {group,owner,members} = this.props
    return (
      <div>
        <h1><a href="#" className="text-black font-bold no-underline hover:underline">{group[1]}</a></h1>
        <div className="mb-4">
          {group[2]}
        </div>
        <div className="mb-2">Creator: <Link to={`/user/${owner.address}`} ><span className="text-teal no-underline hover:underline">{owner.name}</span></Link></div>
        <div className="mb-4"><i className="fa fa-calendar fa-lg text-grey-darker mr-1" /><a href="#" className="text-teal no-underline hover:underline">August 2017</a></div>
        <div className="mb-4"><i className="fa fa-user fa-lg text-grey-dark mr-1" /><a href="#" className="text-teal no-underline hover:underline">{group[5]} Members</a></div>
        <div className="mb-4">
          {members.map((member)=>{
            return (
              <Link to={`/user/${member.address}`}>
                {
                  member.profilePic != "null" && 
                  <span ><img src={member.profilePic} alt="avatar" className="rounded-full h-12 w-12" /></span>

                }{
                  member.profilePic == "null" && 
                  <span ><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_tailwind_logo.jpg" alt="avatar" className="rounded-full h-12 w-12" /></span>

                }
              </Link>
            )
          })}
              
        </div>
      </div>
    )
  }
}


export default GroupInfo;