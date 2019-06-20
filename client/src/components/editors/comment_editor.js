import React, { Component } from 'react'

class CommentEditor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            commentContent: "",
            user: {}
        }
    }

    componentDidMount = async () => {
        let user = JSON.parse(await window.sessionStorage.getItem("user"));
        this.setState({ user });
    }
    changeCommentContant(e) {
        this.setState({ commentContent: e.target.value })
    }

    changePostContant(e) {
        this.setState({ postContent: e.target.value })
    }

    captureFile = (event) => {
        event.stopPropagation();
        event.preventDefault();
        const file = event.target.files[0];
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        this.setState({ reader });
    }
    render() {
        return (
            <div className="bg-teal flex border-b border-solid border-grey-light">
                <div className="w-1/8 text-right pl-3 pt-3">
                    <div>
                    {
                        this.state.user.profilePic !== "null" &&
                        <img htmlFor="image-upload" src={this.state.user.profilePic} alt="logo" className="rounded-full h-12 w-12 mr-2" />
                        }
                        {
                            this.state.user.profilePic === "null" &&
                            <img htmlFor="image-upload" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_tailwind_logo.jpg" alt="logo" className="rounded-full h-12 w-12 mr-2" />
                        }
                    </div>


                </div>
                <div className="w-7/8 p-3 pl-0">
                    <div className="flex justify-between">
                        <div>
                            <span className="font-bold"><a href="#" className="text-black">{this.state.user.name}</a></span>
                            <span className="text-grey-dark">·</span>
                            <span className="text-white">{this.state.user.email}</span>
                        </div>
                    </div>
                    <div>
                        <div className="mb-3">
                            <textarea onChange={this.changeCommentContant.bind(this)} className="w-full h-10 bg-white-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight mt-3" cols={3} defaultValue={""} />
                        </div>
                        <div className="pb-1 float-right">
                            <label htmlFor="image-upload" className="fa fa-camera fa-lg mr-2 bg-teal text-white"></label>
                            <input id="image-upload" type="file" onChange={this.captureFile.bind(this)} hidden />


                            <button onClick={() => this.props.createComment(this.props.postAddress, this.state.commentContent, this.state.reader)} className="bg-white text-xs hover:bg-teal text-teal font-semibold hover:text-white py-2 px-6 border border-teal hover:border-transparent rounded-full">
                                Comment
                    </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentEditor;