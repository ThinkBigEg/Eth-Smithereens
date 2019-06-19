class User {

    constructor(web3Wrapper) {

        this.web3Wrapper = web3Wrapper;
    }


    async getUser() {

      
        var data= await this.web3Wrapper.contracts["UserFactory"].methods.getUser(this.web3Wrapper.accounts[0]).call();

        
        var userObj = {
            name: data[0],
            email: data[1],
            address: data[2],
            following:data[3],
            rate:data[4],
            profilePic:data[5]
          };
       
        
        return userObj;
    };

    async getUserData(user_contract_address){

        const User = await this.web3Wrapper.loadContract(user_contract_address, "User");
        var data = await User.methods.getData().call();
        let userObj = {
            name: data[0],
            email: data[1],
            address: data[2],
            following:data[3],
            rate:data[4],
            profilePic:data[5]
          };

        return userObj;
    }

    async checkUserExists() {

        return await this.web3Wrapper.contracts["UserFactory"].methods.checkUserExists(this.web3Wrapper.accounts[0]).call();

    };

    async registerNewUser(name, email) {

        await this.web3Wrapper.contracts["UserFactory"].methods.createUser(name, email).send({
            from: this.web3Wrapper.accounts[0]
        });

    };

    async updateInfo(user_contract_address,name,email,profile_pic){
        const User = await this.web3Wrapper.loadContract(user_contract_address, "User");
        await User.methods.updateInfo(name, email, profile_pic).send({
            from: this.web3Wrapper.accounts[0]
        });
    }

    async followNewUser(current_user_address, user_contract_address) {


        const User = await this.web3Wrapper.loadContract(current_user_address, "User");
        await User.methods.follow(user_contract_address).send({
            from: this.web3Wrapper.accounts[0]
        });

    }

    async getFollowers(user_contract_address) {

        const User = await this.web3Wrapper.loadContract(user_contract_address, "User")
        const followers = await User.methods.getFollowers().call();
        return followers;

    }

    async getUsers() {

        var user_addresses = await this.web3Wrapper.contracts["UserFactory"].methods.getUsers().call();
        var users=[]
        for(var i=0;i<user_addresses.length;i++){
            var User = await this.web3Wrapper.loadContract(user_addresses[i],"User");
            var userData  = await User.methods.getData().call();
            var user = {
                name:userData[0],
                email:userData[1],
                address:userData[2],
                followers:userData[3],
                profilePic: userData[5]
            }
            users.push(user);
        }
        return users;
    }
    


}

export default User;