import React, { Component } from 'react'
import GroupItem from './group_item';

class GroupList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      groups: []
    }
  }


  componentDidMount = async () => {

    var groups = await this.props.GroupModel.getGroups();
    this.setState({ isLoading: false, groups });

  }

  joinGroup = async (group_contract_address) => {
    await this.props.GroupModel.join(group_contract_address, this.props.user.address);
  }

  leaveGroup = async (group_contract_address) => {
    await this.props.GroupModel.leave(group_contract_address, this.props.user.address);
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  } 


  sectionTitle(userGroups){
    if (userGroups.userGroups == true){
      return <span className="text-lg font-bold">Your Groups</span>;

    }else{
      return <span className="text-lg font-bold">Groups to join</span>;

    }
  }

  render() {
    return (
      <div className="bg-white p-3 mb-3">
        <div>
          <this.sectionTitle userGroups={this.props.userGroups} />
          
          <span>   </span>
          <span><a href="#" className="text-teal text-xs" onClick={this.shuffle(this.state.groups)}>Refresh</a></span>
        </div>
        {!this.state.isLoading && this.state.groups.map((group) => {
          let arr = group[4].filter((address) => {
            return this.props.user.address == address;
          });
          if (!arr.length >= 1 && this.props.userGroups == false) {
            return (
              <GroupItem key={group[5]} group={group} isMember={false} action={this.joinGroup} />
            )
          } else if (arr.length >= 1 && this.props.userGroups == true ){
            return (
              <GroupItem key={group[5]} group={group} isMember={true} action={this.leaveGroup} />
            )
          }

        })}
      </div>
    )
  }
}

export default GroupList;
