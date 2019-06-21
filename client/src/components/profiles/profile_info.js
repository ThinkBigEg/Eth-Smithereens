import React, { Component } from 'react'

class ProfileInfo extends Component {

  render() {
    const {user} = this.props
    return (
      <div>
        <h1><a href="#" className="text-black font-bold no-underline hover:underline">{user.name}</a></h1>
        <div className="mb-4"><a href="#" className="text-grey-darker no-underline hover:underline">{user.email}</a></div>
        <div className="mb-4">
          A utility-first CSS framework for rapid UI development. By <a href="#" className="text-teal no-underline hover:underline">@adamwathan</a>, <a href="#" className="text-teal no-underline hover:underline">@reinink</a>, <a href="#" className="text-teal no-underline hover:underline">@davidhemphill</a>, and <a href="#" className="text-teal no-underline hover:underline">@steveschoger</a>.
        </div>
        <div className="mb-2"><i className="fa fa-link fa-lg text-grey-darker mr-1" /><a href="#" className="text-teal no-underline hover:underline">tailwindcss.com</a></div>
        <div className="mb-4"><i className="fa fa-calendar fa-lg text-grey-darker mr-1" /><a href="#" className="text-teal no-underline hover:underline">Joined August 2017</a></div>
        <div className="mb-4"><i className="fa fa-user fa-lg text-grey-dark mr-1" /><a href="#" className="text-teal no-underline hover:underline">27 Followers you know</a></div>
        {/* <div className="mb-4">
          <a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower01.jpg" alt="avatar" className="rounded-full h-12 w-12" /></a>
          <a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower02.jpg" alt="avatar" className="rounded-full h-12 w-12" /></a>
          <a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower03.jpg" alt="avatar" className="rounded-full h-12 w-12" /></a>
          <a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower04.jpg" alt="avatar" className="rounded-full h-12 w-12" /></a>
          <a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower05.jpg" alt="avatar" className="rounded-full h-12 w-12" /></a>
          <a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower06.jpg" alt="avatar" className="rounded-full h-12 w-12" /></a>
          <a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower07.jpg" alt="avatar" className="rounded-full h-12 w-12" /></a>
          <a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower08.jpg" alt="avatar" className="rounded-full h-12 w-12" /></a>
          <a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower09.jpg" alt="avatar" className="rounded-full h-12 w-12" /></a>
          <a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower10.jpg" alt="avatar" className="rounded-full h-12 w-12" /></a>
        </div>
        <div className="mb-4"><i className="fa fa-picture-o fa-lg text-grey-dark mr-1" /><a href="#" className="text-teal">Photos and videos</a></div>
        <div className="mb-4">
          <a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_photo1.jpg" alt="photo" className="h-20 w-20 mr-1 mb-1" /></a>
          <a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_photo2.jpg" alt="photo" className="h-20 w-20 mr-1 mb-1" /></a>
          <a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_photo3.jpg" alt="photo" className="h-20 w-20 mr-1 mb-1" /></a>
          <a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_photo4.jpg" alt="photo" className="h-20 w-20 mr-1 mb-1" /></a>
          <a href="#"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_photo5.jpg" alt="photo" className="h-20 w-20 mr-1 mb-1" /></a>
        </div> */}
      </div>
    )
  }
}


export default ProfileInfo;