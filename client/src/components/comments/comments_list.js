import React, { Component } from 'react'
import Comment from './comment';

class CommentsList extends Component {

    
    constructor(props) {
        super(props);
        this.state={
            
        }
      }

    render() {
        return (

            <div>
                {this.props.comments.map((comment)=>{
                    return(
                        <Comment key={comment.address} comment={comment} voteOnComment={this.props.voteOnComment}/>
                    )
                })}
            </div>
        )
    }
}


export default CommentsList;
