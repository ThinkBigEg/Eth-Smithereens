import React, { Component } from 'react'

export class CreateGroupForm extends Component {


    constructor(props) {
        super(props);
        this.state={
            title:"",
            description:"",
            user: this.props.user,
            GroupModel: this.props.GroupModel
        }
    }

    CreateGroup = async()=>{
        await this.state.GroupModel.createGroup(this.state.user.address,this.state.title,this.state.description)
    }

    changeTitle(e){
        this.setState({title:e.target.value})
    }
    
    changeDescription(e){
        this.setState({description:e.target.value})
    }

    render() {
        return (
            <div className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                    </label>
                    <input  onChange={this.changeTitle.bind(this)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text"/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                    </label>
                    <input onChange={this.changeDescription.bind(this)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email"/>
                </div>
                <div className="flex items-center justify-center">
                <button onClick={this.CreateGroup.bind(this)} className="bg-teal hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-full">
                    Create Group
                </button>
                </div>
            </div>
        )
    }
}

export default CreateGroupForm
