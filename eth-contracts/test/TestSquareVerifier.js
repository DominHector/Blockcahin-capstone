// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
const SquareVerifier = artifacts.require('verifier');
let proof = {
    "proof": {
        "a": ["0x2a3cb83dde1107afd700cdc87d4e510c1961d0b61be523f3b8e892c86da72af1", "0x1e0a24aaeb28fb335673ca5f190054beed52b94e265cbe2eb882198bbfc77f30"],
        "b": [["0x027a837d089894c1174e3a31b6d2bc9c2ea5bcc52d512c40d96544cc628e0658", "0x0a9aa41fdc704e3d4c75e71e507ee5b7ffc633863cd2c531c2cb38860d4fee6e"],
            ["0x1421c7831dec7ffcdc49c0128ea3bc4f9311a6af22beeb70bec8fb006d832e1d", "0x3020ff798e78b68c69a0c1433090cce8c015d278e3c8789354a05350c8748b31"]],
        "c": ["0x0de91ea4ef79993cfc41a0b1b46c9f61d9f1af660c367e055ac7834ed91e1d83", "0x01688a8c9cc12cbaca9c3f9fde02b10bed4b7be2a70fe0264ab8435aff2470f4"
        ]},
        "inputs": ["0x0000000000000000000000000000000000000000000000000000000000000009", "0x0000000000000000000000000000000000000000000000000000000000000001"]
    }

contract('TestVerifier', accounts => {
    describe('Exercise Verifier', function(){
        beforeEach(async function(){
            this.contract = await SquareVerifier.new();
        });

        // Test verification with correct proof
        // - use the contents from proof.json generated from zokrates steps
        it('should verify with the correct proof', async function(){
            let result = await this.contract.verifyTx.call(proof.proof.a, proof.proof.b , proof.proof.c, proof.inputs);
            assert.equal(result, true)
        });

        // Test verification with incorrect proof
        it('should NOT verify with the incorrect proof', async function () {
            let incorrectInputs = ["0x0000000000000000000000000000000000000000000000000000000000000003", "0x0000000000000000000000000000000000000000000000000000000000000005"];
            let result = await this.contract.verifyTx.call(proof.proof.a, proof.proof.b, proof.proof.c, incorrectInputs);
            assert.equal(result, false);
        });
    });
});