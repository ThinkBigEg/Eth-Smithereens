import React, { Component } from 'react'
import OriginalPost from './original_post';
import PostEditor from '../editors/post_editor';
import SharedPost from './shared_post';
import { convertToBuffer, submitToIPFS } from "../../utils/IPFSWrapper"
class PostLists extends Component {

    
    constructor(props) {
        super(props);
        this.state={
    
        }
      }

    // createComment=async(post_address,text)=>{
        
    //     await this.props.PostModel.createComment(this.props.user.address,post_address,text);
    // }

    sharePost=async(post_address)=>{
        
        await this.props.PostModel.sharePost(this.props.user.address,post_address,"");
    }

    voteOnPost=async(post_address,vote)=>{
        await this.props.PostModel.voteOnPost(post_address,this.props.user.address,vote);
    }

    voteOnComment=async(comment_address,vote)=>{
        await this.props.PostModel.voteOnComment(comment_address,this.props.user.address,vote);
    }

    render() {
        return (
            <div>
                {this.props.posts.map((post)=>{
                    return(
                        post.type?
                        <OriginalPost 
                                    key={post.address} 
                                    post={post} 
                                    PostModel={this.props.PostModel}
                                    sharePost={this.sharePost}
                                    voteOnPost={this.voteOnPost}
                                    voteOnComment={this.voteOnComment}
                                    user = {this.props.user}/>
                        :
                        <SharedPost 
                                    key={post.address} 
                                    post={post} 
                                    PostModel={this.props.PostModel}
                                    createComment={this.createComment}
                                    sharePost={this.sharePost}
                                    voteOnPost={this.voteOnPost}
                                    voteOnComment={this.voteOnComment}
                                    user={this.props.user}/>
                    )
                })}
            </div>
        )
    }
}


export default PostLists;
