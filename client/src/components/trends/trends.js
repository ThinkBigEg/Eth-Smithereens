
import React, { Component } from 'react'
import {Link} from "react-router-dom";
class Trends extends Component {
  render() {
    return (
        <div className="bg-white p-3 mb-3">
        <Link to={"/group"}>
          <div className="mb-3">
            <span className="text-lg font-bold">Trends for you</span>
            <span>·</span>
            <span><a href="#" className="text-teal text-xs">Change</a></span>
          </div>
        </Link>
        <div className="mb-3 leading-tight">
          <div><a href="#" className="text-teal font-bold">Happy New Year</a></div>
          <div><a href="#" className="text-grey-dark text-xs">645K Tweets</a></div>
        </div>
        <div className="mb-3 leading-tight">
          <div><a href="#" className="text-teal font-bold">Happy 2018</a></div>
          <div><a href="#" className="text-grey-dark text-xs">NYE 2018 Celebrations</a></div>
        </div>
        <div className="mb-3 leading-tight">
          <div><a href="#" className="text-teal font-bold">#ByeBye2017</a></div>
          <div><a href="#" className="text-grey-dark text-xs">21.7K Tweets</a></div>
        </div>
        <div className="mb-3 leading-tight">
          <div><a href="#" className="text-teal font-bold">#SomeHashTag</a></div>
          <div><a href="#" className="text-grey-dark text-xs">45K Tweets</a></div>
        </div>
        <div className="mb-3 leading-tight">
          <div><a href="#" className="text-teal font-bold">Something Trending</a></div>
          <div><a href="#" className="text-grey-dark text-xs">36K Tweets</a></div>
        </div>
        <div className="mb-3 leading-tight">
          <div><a href="#" className="text-teal font-bold">#ColdAF</a></div>
          <div><a href="#" className="text-grey-dark text-xs">100K Tweets</a></div>
        </div>
      </div>
    )
  }
}
export default Trends;
