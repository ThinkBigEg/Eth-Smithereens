class User {

    constructor(web3Wrapper) {

        this.web3Wrapper = web3Wrapper;
    }


    async getUser() {

      
        var data= await this.web3Wrapper.contracts["UserFactory"].methods.getUser(this.web3Wrapper.accounts[0]).call();

        let color = this.getUserColor(data[4]);
        let star = data[4] >= 9? 1: 0;
        var userObj = {
            name: data[0],
            email: data[1],
            address: data[2],
            following:data[3],
            rate:data[4],
            profilePic:data[5],
            followers:data[6],
            about: data[7],
            timestamp: (new Date(parseInt(data[8]) * 1000)).toLocaleString(),
            color:color,
            star: star
          };
       
        
        return userObj;
    };

    getUserColor(rate) { 
        if(rate >= 9){
            return "#128c00";
        }else if(rate >= 8) { 
            return "#00ff00"
        }else if (rate >= 7){ 
            return "#0cff00"
        }else if (rate >= 6){
            return "#e1e500"
        }else if(rate >= 5){
            return "#f99a00"
        }else if (rate == 0){
            return "#000"
        }else {
            return "#ff0000"
        }
    }

    async getUserData(user_contract_address){

        const User = await this.web3Wrapper.loadContract(user_contract_address, "User");
        var data = await User.methods.getData().call();
        let color = this.getUserColor(data[4]);
        let star = data[4] >= 9 ? 1 : 0;
        let userObj = {
            name: data[0],
            email: data[1],
            address: data[2],
            following: data[3],
            rate: data[4],
            profilePic: data[5],
            followers: data[6],
            about: data[7],
            timestamp: (new Date(parseInt(data[8]) * 1000)).toLocaleString(),
            color: color,
            star: star
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

    async updateInfo(user_contract_address,name,email,profile_pic,about){
        const User = await this.web3Wrapper.loadContract(user_contract_address, "User");
        await User.methods.updateInfo(name, email, profile_pic,about).send({
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
            let color = this.getUserColor(userData[4]);
            let star = userData[4] >= 9 ? 1 : 0;
            var user = {
                name: userData[0],
                email: userData[1],
                address: userData[2],
                following: userData[3],
                rate: userData[4],
                profilePic: userData[5],
                followers: userData[6],
                about: userData[7],
                timestamp: (new Date(parseInt(userData[8]) * 1000)).toLocaleString(),
                color: color,
                star: star
            }
            users.push(user);
        }
        console.log('users', users)
        return users;
    }
    


}

export default User;