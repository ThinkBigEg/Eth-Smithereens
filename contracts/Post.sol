pragma solidity ^0.5.0;

contract Post {

    address public creator;
    string public text;
    uint256 public timestamp;

    constructor (address user_contract_address,string memory post_text) public {
        creator = user_contract_address;
        text = post_text;
        timestamp = now;
    }

    function getPost() public view returns(address,string memory,uint256){
        return (
        creator,
        text,
        timestamp
        );
    }

}