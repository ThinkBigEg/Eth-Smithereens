import React, { Component } from 'react'

class SharedPost2 extends Component {
  render() {
    return (
        <div className="flex border-b border-solid border-grey-light">
        <div className="w-1/8 text-right pl-3 pt-3">
          <div><i className="fa fa-retweet text-grey-dark mr-2" /></div>
          <div><a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_avatar_adam.jpg" alt="avatar" className="rounded-full h-12 w-12 mr-2" /></a></div>
        </div>
        <div className="w-7/8 p-3 pl-0">
          <div className="text-xs text-grey-dark">Tailwind CSS Retweeted</div>
          <div className="flex justify-between">
            <div>
              <span className="font-bold"><a href="#" className="text-black">Adam Wathan</a></span>
              <span className="text-grey-dark">@adamwathan</span>
              <span className="text-grey-dark">·</span>
              <span className="text-grey-dark">7 Dec 2017</span>
            </div>
            <div>
              <a href="#" className="text-grey-dark hover:text-teal"><i className="fa fa-chevron-down" /></a>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <p className="mb-6">💥 Check out this Slack clone built with <a href="#" className="text-teal">@tailwindcss</a> using no custom CSS and just the default configuration:</p>
              <p className="mb-4"><a href="#" className="text-teal">https://codepen.io/adamwathan/pen/JOQWVa...</a></p>
              <p className="mb-6">(based on some work <a href="#" className="text-teal">@Killgt</a> started for <a href="#" className="text-teal">tailwindcomponents.com</a> !)</p>
              <p><a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_tweet2.jpg" alt="tweet image" className="border border-solid border-grey-light rounded-sm" /></a></p>
            </div>
            <div className="pb-2">
              <span className="mr-8"><a href="#" className="text-grey-dark hover:no-underline hover:text-blue-light"><i className="fa fa-comment fa-lg mr-2" /> 19</a></span>
              <span className="mr-8"><a href="#" className="text-grey-dark hover:no-underline hover:text-green"><i className="fa fa-retweet fa-lg mr-2" /> 56</a></span>
              <span className="mr-8"><a href="#" className="text-grey-dark hover:no-underline hover:text-red"><i className="fa fa-heart fa-lg mr-2" /> 247</a></span>
              <span className="mr-8"><a href="#" className="text-grey-dark hover:no-underline hover:text-teal"><i className="fa fa-envelope fa-lg mr-2" /></a></span>
            </div>
            <div><a href="#" className="text-teal">Show this thread</a></div>
          </div>
        </div>
      </div>
    )
  }
}
export default SharedPost2;