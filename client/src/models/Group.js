class Group {

    constructor(web3Wrapper) {
        this.web3Wrapper = web3Wrapper;
    }

    async getGroups() {

        var groupsAddresses = await this.web3Wrapper.contracts["GroupFactory"].methods.getGroups().call();

        var groups = [];
        for (var i = 0; i < groupsAddresses.length; i++) {

            var group = await this.getGroup(groupsAddresses[i]);
            group[6]=group[5];
            group[5] = groupsAddresses[i];
            
            groups.push(group);
        }

        return groups;
    }

    async createGroup(user_contract_address, title, description) {

        await this.web3Wrapper.contracts["GroupFactory"].methods
            .createGroup(title, description, user_contract_address)
            .send({
                from: this.web3Wrapper.accounts[0]
            })
    }

    async getGroup(group_address) {

        return await this.web3Wrapper.contracts["GroupFactory"].methods.getGroup(group_address).call();
    }

    async addAdmin(group_address, user_contract_address) {

        const Group = await this.web3Wrapper.loadContract(group_address, "Group");
        await Group.methods.addAdmin(user_contract_address).send({
            from: this.web3Wrapper.accounts[0]
        });
    }

    async join(group_address, user_contract_address) {

        const Group = await this.web3Wrapper.loadContract(group_address, "Group");
        await Group.methods.join(user_contract_address).send({
            from: this.web3Wrapper.accounts[0]
        });

    }

    async leave(group_address, user_contract_address) {

        const Group = await this.web3Wrapper.loadContract(group_address, "Group");
        await Group.methods.leave(user_contract_address).send({
            from: this.web3Wrapper.accounts[0]
        });

    }

    async removeUser(group_address, user_contract_address) {

        const Group = await this.web3Wrapper.loadContract(group_address, "Group");
        await Group.methods.leave(user_contract_address).send({
            from: this.web3Wrapper.accounts[0]
        });

    }

    async setTitle(user_contract_address,group_address, title) {

        const Group = await this.web3Wrapper.loadContract(group_address, "Group");
        await Group.methods.setTitle(user_contract_address,title).send({
            from: this.web3Wrapper.accounts[0]
        });
    }

    async setDescription(user_contract_address,group_address, description) {

        const Group = await this.web3Wrapper.loadContract(group_address, "Group");
        await Group.methods.setDescription(user_contract_address,description).send({
            from: this.web3Wrapper.accounts[0]
        });
    }

    async createPost(group_address, user_contract_address, text, imageUrl) {

        const Group = await this.web3Wrapper.loadContract(group_address, "Group");
        await Group.methods.createPost(user_contract_address, text, imageUrl).send({
            from: this.web3Wrapper.accounts[0]
        });
    }

    async getPosts (user_contract_address,group_address) {
        const Group = await this.web3Wrapper.loadContract(group_address, "Group");
        var postAddress = await Group.methods.getPosts(user_contract_address).call();
        return postAddress;
        
      }

    async checkMemberExists(group_address,user_contract_address){

        const Group = await this.web3Wrapper.loadContract(group_address, "Group");
        return await Group.methods.checkMemberExists(user_contract_address).call();
    }


}

export default Group;