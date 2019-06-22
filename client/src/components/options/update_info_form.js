import React, { Component } from 'react'
import { convertToBuffer, submitToIPFS } from "../../utils/IPFSWrapper"

class UpdateInfoForm extends Component {

    constructor(props) {
        super(props);
        this.state={
            name: this.props.user.name,
            email: this.props.user.email,
            UserModel:this.props.UserModel,
            about: this.props.user.about
        }
    }

    
    changeName(e){
    this.setState({name:e.target.value})
    }
    
    changeEmail(e){
        this.setState({email:e.target.value})
    }

    changeAbout(e){
        this.setState({about:e.target.value})
    }

    captureFile = (event) => {
        event.stopPropagation();
        event.preventDefault();
        const file = event.target.files[0];
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        this.setState({ reader });
    }

    updateInfo = async()=>{
        let profilePic = "null";
        if (this.state.reader !== undefined) {
            var buffer = await convertToBuffer(this.state.reader);

            submitToIPFS(buffer).then(async (res) => {
                profilePic = "https://gateway.ipfs.io/ipfs/" + res[0].hash;
                await this.state.UserModel.updateInfo(this.props.user.address, this.state.name, this.state.email, profilePic, this.state.about);
                await this.getAndStoreUser();

            });
        } else {
            await this.state.UserModel.updateInfo(this.props.user.address, this.state.name, this.state.email, profilePic,this.state.about);
            await this.getAndStoreUser();

        }
    }

    getAndStoreUser=async()=>{
        var user = await this.state.UserModel.getUser();
        await window.sessionStorage.setItem("user", JSON.stringify(user));
    }
   
    render() {
        
        return (
            <div className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Name
                    </label>
                    <input onChange={this.changeName.bind(this)} value={this.state.name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text"/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Email
                    </label>
                    <input onChange={this.changeEmail.bind(this)} value={this.state.email} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email"/>
                </div>
                <div className="mb-3">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        About
                    </label>
                    <textarea onChange={this.changeAbout.bind(this)} className="w-full h-20 bg-white-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight mt-3" cols={4} defaultValue={""} />
                    </div>
                <div class="mb-6 flex items-center justify-center">
                    <label class="w-40 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                        <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span class="mt-2 text-base leading-normal">Profile Image </span>
                        <input type='file' onChange={this.captureFile} class="hidden" />
                    </label>
                </div>

               
                <div className="flex items-center justify-center" >
                <button onClick={this.updateInfo} className="bg-teal hover:bg-teal-dark text-white font-large py-2 px-8 rounded-full">
                    Save
                </button>
                </div>
            </div>
        )
    }
}


export default UpdateInfoForm;
