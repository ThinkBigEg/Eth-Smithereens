var UserFactory =  artifacts.require("./UserFactory.sol");
var GroupFactory =  artifacts.require("./GroupFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(GroupFactory, UserFactory.address,  { gas: 40000000 });
};
