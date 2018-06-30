module.exports = `pragma solidity ^0.4.0;

contract Wallet {

    // address that funds the channel (cold wallet)
    address public transferAddress; 
    
    // address that signs the messages (hot wallet)
    address public signerAddress;
    
    // address that recieves the _wei
    address public nodeAddress;
    
    // earliest time to revert. example: 1529508757
    uint public channelTimeout;
    
    constructor(address _transferAddress, address _signerAddress, address _nodeAddress, uint _channelTimeout) payable {
        transferAddress = _transferAddress;
        signerAddress = _signerAddress;
        nodeAddress = _nodeAddress;
        channelTimeout = _channelTimeout;
    }

    function Close(bytes32 _h, uint8 _v, bytes32 _r, bytes32 _s, uint _wei) public payable {
        // get address from signed message
        address signer = ecrecover(_h, _v, _r, _s);
        
        // verify signature
        if (signer != signerAddress) revert();

        // verify message: 'I approve _wei to this contract'
        bytes32 proof = keccak256(this, _wei);
        
        // verify message
        if (proof != _h) revert();

        // transfer wei to node address
        nodeAddress.transfer(_wei);
        
        // transfer remainder to transferAddress
        transferAddress.transfer(address(this).balance);
    }

    function Revert() public {
        // verify time
        if (channelTimeout > now) revert();
        
        // transfer to transferAddress
        transferAddress.transfer(address(this).balance);
    }
    
    function Extend(uint _channelTimeout) public {
        // only signer can extend their channel time
        if (msg.sender != signerAddress) revert();
        
        // new time can't be less than old time
        if (_channelTimeout < channelTimeout) revert();
        
        // extend
        channelTimeout = _channelTimeout;
    }
    
    function Change(address _transferAddress, address _signerAddress) public {
        // only nodeAddress can extend the channel time
        if (msg.sender != nodeAddress) revert();
        
        // channel must not be in use
        if (address(this).balance != 0) revert();
        
        // change
        transferAddress = _transferAddress;
        signerAddress = _signerAddress;
        
    }
    
    // gimme more
    function() payable {}

}
`
