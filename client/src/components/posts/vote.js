import React, { Component } from 'react'

import Rating from "react-rating"

class Vote extends Component {


    constructor(props){
        super(props);
        this.state={
            value:props.value
        }
    }

    

    vote = async(value)=>{
        console.log(value);
        this.setState({value});
        this.props.vote(this.props.address,value);
    }

    render() {
        return (
            <span className="rate text-grey-dark hover:no-underline text-teal float-right">
                <Rating
                        emptySymbol="fa fa-star-o fa-lg"
                        fullSymbol="fa fa-star fa-lg"
                        fractions={2}
                        start={0}
                        stop={5}
                        initialRating={this.state.value}
                        onClick={(value)=>{this.vote(value)}}
                        />
                {/* <i onClick={()=>this.vote(2)}  style={{color:this.state.value>=2?'red':''}} className="fa fa-star fa-lg mr-2 " />
                <i onClick={()=>this.vote(3)}  style={{color:this.state.value>=3?'red':''}} className="fa fa-star fa-lg mr-2 " />
                <i onClick={()=>this.vote(4)}  style={{color:this.state.value>=4?'red':''}} className="fa fa-star fa-lg mr-2 " />
                <i onClick={()=>this.vote(5)}  style={{color:this.state.value>=5?'red':''}} className="fa fa-star fa-lg mr-2 " /> */}
            </span>
        )
    }
}


export default Vote