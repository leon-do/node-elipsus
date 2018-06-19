```
fromAddress
toAddress
contractAddress
nodeAddress
startDate
channelTimeout
wei
h
v
r
s
isChannelOpen
signedTransaction
```

```

[x] /nodeAddress

[] /open
    signedTransaction
    fromAddress
    nodeAddress
    startDate
    channelTimeout 

[] /balance
    h
    v
    r
    s
    fromAddress

[] /send
    h
    v
    r
    s
    fromAddress
    toAddress
    wei

[] /close
    h
    v
    r
    s
    contractAddress

```

```
 pragma solidity ^0.4.0;

        contract Channel {

            address public fromAddress = ${_args.fromAddress};
            address public nodeAddress = ${_args.nodeAddress};
            uint public startDate = ${_args.startDate};
            uint public channelTimeout = ${_args.channelTimeout};
            
            constructor() payable {}

            function CloseChannel(bytes32 _h, uint8 _v, bytes32 _r, bytes32 _s, uint _wei) public {
                address signer;
                bytes32 proof;
                
                signer = ecrecover(_h, _v, _r, _s);

                if (signer != nodeAddress) revert();

                proof = keccak256(this, _wei);

                if (proof != _h) revert();

                nodeAddress.transfer(_wei);
                
                selfdestruct(fromAddress);
            }

            function ChannelTimeout() public {
                if (startDate + channelTimeout > now) revert();

                selfdestruct(fromAddress);
            }

        }
```
