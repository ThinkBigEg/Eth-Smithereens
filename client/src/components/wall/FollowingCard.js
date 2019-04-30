import React, { Component } from "react";


export default class FollowingCard extends Component {
    constructor(props){
        super();
        this.state ={
            users:[]
        }
    }
    followUser(id) {
        console.log("ddddddd",id);
    }
    componentDidMount(){
        //get your users from backend
        let users = [
            {name:'karim mokhtar',id:1},
            {name:'omar khaled',id:2},
            {name:'amr alaa',id:3},
            {name:'mahmoud farouk',id:4},
        ];
        this.setState({users});
    }
    render() {
        return (
            <div className="col-sm-3">
                <div className="panel panel-default panel-custom">
                    <div className="panel-heading">
                        <h3 className="panel-title">Who to follow</h3>
                    </div>
                    <div className="panel-body">
                        {this.state.users.map((user,i)=>(
                            <div className="media" key={i}>
                                <div className="media-left">
                                    <img src="http://placehold.it/32x32" alt="" className="media-object img-rounded" />
                                </div>
                                <div className="media-body">
                                    <h4 className="media-heading">{user.name}</h4>
                                    <div onClick={this.followUser.bind(this,user.id)} className="btn btn-default btn-xs">
                                        +<span className="glyphicon glyphicon-user" />
                                        Follow
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="panel-footer">
                        <a href="">
                            <span className="glyphicon glyphicon-user" />
                            Find people you know
                        </a>
                    </div>
                </div>
                <div className="well well-sm">
                    <ul className="list-inline">
                        <li>© 2019 BSN</li>
                        <li>
                            <a href="#">About</a>
                        </li>
                        <li>
                            <a href="#">Help</a>
                        </li>
                        <li>
                            <a href="#">Terms</a>
                        </li>
                        <li>
                            <a href="#">Privacy</a>
                        </li>
                        <li>
                            <a href="#">Brand</a>
                        </li>
                        <li>
                            <a href="#">Blog</a>
                        </li>
                        <li>
                            <a href="#">Status</a>
                        </li>
                        <li>
                            <a href="#">Apps</a>
                        </li>
                        <li>
                            <a href="#">Jobs</a>
                        </li>
                        <li>
                            <a href="#">Advertise</a>
                        </li>
                        <li>
                            <a href="#">Businesses</a>
                        </li>
                        <li>
                            <a href="#">Media</a>
                        </li>
                        <li>
                            <a href="#">Developers</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
