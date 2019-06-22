import React, { Component } from 'react'
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <div className="bg-white">
        <div className="container mx-auto flex flex-col lg:flex-row items-center py-4">
          <nav className="w-full lg:w-2/5">

            <Link to={"/home"} >
              <span className="text-grey-darker text-sm mr-4 font-semibold pb-6 border-b-2 border-solid border-transparent no-underline hover:text-teal hover:border-teal hover:no-underline"><i className="fa fa-home fa-lg" /> Home</span>
            </Link>
            <a href="#" className="text-grey-darker text-sm mr-4 font-semibold pb-6 border-b-2 border-solid border-transparent no-underline hover:text-teal hover:border-teal hover:no-underline"><i className="fa fa-bolt fa-lg" /> Moments</a>
            <a href="#" className="text-grey-darker text-sm mr-4 font-semibold pb-6 border-b-2 border-solid border-transparent no-underline hover:text-teal hover:border-teal hover:no-underline"><i className="fa fa-bell fa-lg" /> Notifications</a>

          </nav>
          <div className="w-full lg:w-1/5 text-center my-4 lg:my-0"><a href="#"><i className="fa fa-twitter fa-lg text-blue" /></a></div> 
          <div className="w-full lg:w-2/5 flex lg:justify-end">

          <Link to={`/user/${this.props.user.address}`}>
            <div className="mr-4">
              {
                this.props.user.profilePic !== "null" &&
                <img htmlFor="image-upload" src={this.props.user.profilePic} alt="logo" className="h-8 w-8 rounded-full" />
              }
              {
                this.props.user.profilePic === "null" &&
                <img htmlFor="image-upload" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_tailwind_logo.jpg" alt="logo" className="h-8 w-8 rounded-full " />
              }
            </div>
            </Link>
            <div><button className="bg-teal hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-full">Post</button></div>
            <Link to={"/options"}>
              <div><button className="bg-teal hover:bg-teal-dark text-white font-medium py-2 px-4 ml-3 rounded-full">Options</button></div>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
export default Navbar;
