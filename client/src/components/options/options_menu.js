import React, { Component } from 'react'

class OptionsMenu extends Component {
    
    render() {
        return (
            <div className="bg-white mb-3">
                <div className="p-3 leading-tight text-center border-b-2 border-gray-600">
                    <div><button onClick={()=>{this.props.selectOption("update_account")}} className="text-teal font-bold">Update My Account</button></div>
                </div>
                <div className="p-3 leading-tight text-center border-b-2 border-gray-600">
                    <div><button onClick={()=>{this.props.selectOption("create_group")}} className="text-teal font-bold">Create Group</button></div>
                </div>
            </div>
        )
    }
}

export default OptionsMenu
