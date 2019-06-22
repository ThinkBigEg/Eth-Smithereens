var UserFactory = artifacts.require("./UserFactory.sol");
var PostFactory = artifacts.require("./PostFactory.sol");

module.exports = function (deployer) {
  deployer.deploy(PostFactory, UserFactory.address, { gas: 40000000 });
};
