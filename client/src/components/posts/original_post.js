import React, { Component } from 'react'
import CommentEditor from '../editors/comment_editor';
import Comment from '../comments/comment';
import CommentsList from '../comments/comments_list';
import { Link } from "react-router-dom";
import { PassThrough } from 'stream';
import { convertToBuffer, submitToIPFS } from "../../utils/IPFSWrapper"
import {UserModel} from "../../models/User"
import Vote from './vote';
class OriginalPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      toggleThread: false,
      toggleComment: false,
    }
  }




  changeToggleThread = () => {
    this.setState({ toggleThread: !this.state.toggleThread });
  }



  changeToggleComment = () => {
    this.setState({ toggleComment: !this.state.toggleComment });
  }

  createComment = async (post_address, text, reader) => {
    let contentUrl = "null";
    if(reader !== undefined) {
      var buffer = await convertToBuffer(reader);
      
      submitToIPFS(buffer).then(async (res) => {
        contentUrl = "https://gateway.ipfs.io/ipfs/" + res[0].hash;
        await this.props.PostModel.createComment(this.props.user.address, post_address, text, contentUrl);
      });
    }else {
      await this.props.PostModel.createComment(this.props.user.address, post_address, text, contentUrl);
    }
  }

  postContentUrl(contentUrl) {
    if(contentUrl.contentUrl !=="null") {
      return <p><a href="#"><img src={contentUrl.contentUrl} alt="tweet image" className="border border-solid border-grey-light rounded-sm" /></a></p>
    }else {
      return <span></span>
    }
  }


  render() {

    return (
      <div className="mb-3">
        <div className="flex border-b border-solid border-grey-light bg-white">
          <div className="w-1/8 text-right pl-3 pt-3">
            <div>
              {
                this.props.post.ownerProfilePic !== "null" &&
                <img htmlFor="image-upload" src={this.props.post.ownerProfilePic} alt="logo" className="rounded-full h-12 w-12 mr-2" />
              }
              {
                this.props.post.ownerProfilePic=== "null" &&
                <img htmlFor="image-upload" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_tailwind_logo.jpg" alt="logo" className="rounded-full h-12 w-12 mr-2" />
              }
            </div>

          </div>
          <div className="w-7/8 p-3 pl-0">
            <div className="flex justify-between">
              <div>
                <Link to={`/user/${this.props.post.ownerAddress}`} >
                  <span className="font-bold" cool ><a href="#" style={{ color: this.props.post.ownerColor }} className="text-black">{this.props.post.ownerName}</a>
                    {this.props.post.hasStar == 1 &&
                      <span className="rate text-grey-dark hover:no-underline text-teal">
                        <i className="fa fa-star fa-lg">
                        </i>
                      </span>

                    }
                  </span>
                  {/* <span className="text-grey-dark">@tailwindcss</span> */}
                </Link>
                <span className="text-grey-dark">·</span>
                <span className="text-grey-dark">{this.props.post.timestamp}</span>

              </div>
              <div>
                <a href="#" className="text-grey-dark hover:text-teal"><i className="fa fa-chevron-down" /></a>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <p className="mb-4">{this.props.post.text}</p>
                <this.postContentUrl contentUrl={this.props.post.contentUrl}/>
                
              </div>
              <div className="pb-2">
                <span className="mr-8"><button onClick={() => this.changeToggleComment()} className="text-grey-dark hover:no-underline hover:text-blue-light"><i className="fa fa-comment fa-lg mr-2" /> {this.props.post.totalComments}</button></span>
                <span className="mr-8"><button onClick={() => this.props.sharePost(this.props.post.address)} className="text-grey-dark hover:no-underline hover:text-green"><i className="fa fa-retweet fa-lg mr-2" /> {this.props.post.totalShares}</button></span>
                <span className="mr-8"><a href="#" className="text-grey-dark hover:no-underline hover:text-red"><i className="fa fa-star-o fa-lg mr-2" /> {this.props.post.totalVotes}</a></span>
                {/* <span className="mr-8"><a href="#" className="text-grey-dark hover:no-underline hover:text-teal"><i className="fa fa-envelope fa-lg mr-2" /></a></span> */}
                <Vote address={this.props.post.address} vote={this.props.voteOnPost} value={this.props.post.vote} />
             
              </div>
            </div>

            <div>
              {
                !this.state.toggleThread ?
                  <button onClick={() => this.changeToggleThread()} className="text-teal">Show this thread</button>
                  :
                  <button onClick={() => this.changeToggleThread()} className="text-teal">Hide this thread</button>
              }
            </div>
          </div>
        </div>
          {
      this.state.toggleThread &&
      <CommentsList
        comments={this.props.post.comments}
        voteOnComment={this.props.voteOnComment} />
    }

    {
      this.state.toggleComment &&
      <CommentEditor postAddress={this.props.post.address} createComment={this.createComment} />
    }

      </div>
    )
  }
}


export default OriginalPost;