import React, { Component } from 'react'
import {Link} from "react-router-dom";
class MiniProfile extends Component {


  render() {
    
    return (
        <div className="bg-white p-3 mb-3">
        <div className="flex border-b border-solid ml-2 border-grey-light">
          <div className="py-2">
            {
              this.props.user.profilePic !== "null" &&
              <img htmlFor="image-upload" src={this.props.user.profilePic} alt="logo" className="rounded-full h-20 w-20" />
            }
            {
              this.props.user.profilePic === "null" &&

              <img htmlFor="image-upload" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_tailwind_logo.jpg" alt="logo" className="rounded-full h-20 w-20" />
            }
          </div>
          <div className="pl-2 py-2 w-full">
            <div className="flex justify-between mb-1">
              <Link to={`/user/${this.props.user.address}`}>
                <div className="mt-5">
                  <a href="/user/${user.address}" style={{color:this.props.user.color}} className="font-bold text-black">{this.props.user.name}</a>
                  {this.props.user.star == 1 && 
                    <span className="rate text-grey-dark hover:no-underline text-teal">
                      <i className="fa fa-star fa-lg">
                      </i>
                    </span>

                  }
                  <br />
                  <a href="/user/${user.address}" className="text-grey-dark">{this.props.user.email}</a>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <ul className="list-reset flex">
            <li className="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
              <a href="#" className="text-grey-darker no-underline hover:no-underline">
                <div className="text-sm font-bold tracking-tight mb-1">Posts</div>
                <div className="text-lg tracking-tight font-bold text-teal">{this.props.posts.length}</div>
              </a>
            </li>
            <li className="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
              <a href="#" className="text-grey-darker no-underline hover:no-underline">
                <div className="text-sm font-bold tracking-tight mb-1">Following</div>
                <div className="text-lg tracking-tight font-bold text-teal">{this.props.user.following}</div>
              </a>
            </li>
            <li className="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
              <a href="#" className="text-grey-darker no-underline hover:no-underline">
                <div className="text-sm font-bold tracking-tight mb-1">Followers</div>
                <div className="text-lg tracking-tight font-bold text-teal">{this.props.user.followers}</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default MiniProfile;
