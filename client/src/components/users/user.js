import React, { Component } from 'react'
import { Link } from "react-router-dom";

const User = (props) => {
  const { user } = props

  return (
    <div className="flex border-b border-solid border-grey-light">

      <div className="py-2">
        <div >
          {
            user.profilePic !== "null" &&
            <img htmlFor="image-upload" src={user.profilePic} alt="logo" className="rounded-full h-12 w-12" />
          }
          {
            user.profilePic === "null" &&
            <img htmlFor="image-upload" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_tailwind_logo.jpg" alt="logo" className="rounded-full h-12 w-12" />
          }

        </div>
      </div>
      <div className="pl-2 py-2 w-full">
        <Link to={`/user/${user.address}`} >
          <div className="flex justify-between mb-1">
            <div>
              <div className="font-bold text-black" style = {{color: user.color}}>{user.name}
                {user.star == 1 &&
                  <span className="rate text-grey-dark hover:no-underline text-teal">
                    <i className="fa fa-star fa-lg">
                    </i>
                  </span>

                }
              </div>
              
              <div className="text-grey-dark">{user.email}</div>
            </div>
            <div>
              <div className="text-grey hover:text-grey-dark"><i className="fa fa-times" /></div>
            </div>
          </div>
        </Link>
        <div>
          <button onClick={() => { props.follow(user.address) }} className="bg-transparent text-xs hover:bg-teal text-teal font-semibold hover:text-white py-2 px-6 border border-teal hover:border-transparent rounded-full">
            Follow
                </button>
        </div>
      </div>
    </div>
  )
}

export default User;
