import React, { Component } from 'react'
import CommentEditor from '../editors/comment_editor';
import Vote from '../posts/vote';
class Comment extends Component {
 
  commentContentUrl(contentUrl) {
    if (contentUrl.contentUrl !== "null") {
      return <p><a href="#"><img src={contentUrl.contentUrl} alt="tweet image" className="border border-solid border-grey-light rounded-sm" /></a></p>
    } else {
      return <span></span>
    }
  }
  render() {
   
    return (
        <div className="flex border-b border-solid border-grey-light bg-white">
        <div className="w-1/8 text-right pl-3 pt-3">

          {
            this.props.comment.ownerProfilePic !== "null" &&
            <img htmlFor="image-upload" src={this.props.comment.ownerProfilePic} alt="logo" className="rounded-full h-12 w-12 mr-2" />
          }
          {
            this.props.comment.ownerProfilePic === "null" &&

            <img htmlFor="image-upload" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_tailwind_logo.jpg" alt="logo" className="rounded-full h-12 w-12 mr-2" />
          }
         
        </div>
        <div className="w-7/8 p-3 pl-0">
          <div className="flex justify-between">
            <div>
              <span className="font-bold"><a href="#" className="text-black">{this.props.comment.ownerName}</a></span>
              {/* <span className="text-grey-dark">@tailwindcss</span> */}
              <span className="text-grey-dark">·</span>
              <span className="text-grey-dark">{this.props.comment.timestamp}</span>
            </div>
          </div>
          <div>
            <div className="mb-4">
            <p className="mb-4">{this.props.comment.text}</p>
            <this.commentContentUrl contentUrl={this.props.comment.contentUrl} />


            </div>
            <div className="pb-2">
             <Vote address={this.props.comment.address} vote={this.props.voteOnComment} value={this.props.comment.vote}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Comment;