pragma solidity >=0.4.21 <0.6.0;

import './ERC721Mintable.sol';
import './Verifier.sol';
import "openzeppelin-solidity/contracts/utils/Address.sol";

// define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract SquareVerifier is Verifier { }

// define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721Mintable {
    SquareVerifier public verifier;

    constructor(address verifierAddress) ERC721Mintable() public {
        verifier = SquareVerifier(verifierAddress);
    }

    // define a solutions struct that can hold an index & an address
    // define an array of the above struct
    struct Solution {
        uint256 index;
        address _address;
    }
    Solution[] solutions;

    // define a mapping to store unique solutions submitted
    mapping (bytes32 => address) public uniqueSolutions;

    // Create an event to emit when a solution is added
    event solutionAdded(uint index, address addr);

    // Create a function to add the solutions to the array and emit the event
    function addSolution(uint index, address _address, bytes32 key) public {
        Solution memory solution = Solution({index: index, _address: _address});
        solutions.push(solution);
        uniqueSolutions[key] = _address;
        emit solutionAdded(index, _address);
    }

    struct G1Point {
        uint X;
        uint Y;
    }

    struct G2Point {
        uint[2] X;
        uint[2] Y;
    }

    struct Proof {
        G1Point a;
        G2Point b;
        G1Point c;
    }

    // Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mint (address to, uint256 tokenId, uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) public {
        bytes32 key = _verifierKey(a, b, c, input);
        require(uniqueSolutions[key] == address(0), "Solution has already been used");
        require(verifier.verifyTx(a,b,c,input), "Solution failed");

        addSolution(tokenId, to, key);
        super.mint(to, tokenId);
    }

    function _verifierKey (uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) pure public returns(bytes32){
        return keccak256(abi.encodePacked(a, b, c, input));
    }
}