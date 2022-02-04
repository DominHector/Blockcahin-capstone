const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const proof =
{
    "proof": {
    "a": ["0x26e88aa03d5186566bb4540b33d1704f05fe3851910d8fc27c89f997e64e76e2", "0x038184db45429363a35b5808b22ca36a07b57a9a729b9469abeb24dea22b19fd"],
        "b": [["0x174dfee9a4ad743d736c08d59e63f65ce003f3bc6a53f163a72cf5a92dfc4df5", "0x20d437a8db149ac2f33dbffe57221e842a545d55d5b8b3ea8401f6dd4cbcdd22"], ["0x1748a7e7bf4e20b95c488f6cd22b97e1a4a3b97e6d8567faf3e9f2dd56568216", "0x2830a5ce78e0bbcf4b4063124f64aadabb0cd12c3c0392adb90e80d70d33fe22"]],
        "c": ["0x0acb35f554bbd3cc8f6655ceca48cadb63f4e60f99f455b43cf6b03ba3652c18", "0x2dd58f707316c16349c047f5d8517c336d73faad0ba2517e1e5dfc7d6445ffdb"]
},
    "inputs": ["0x0000000000000000000000000000000000000000000000000000000000000009", "0x0000000000000000000000000000000000000000000000000000000000000001"]
}

contract('TestSolnSquareVerifier', accounts => {

    describe('Exercise SolnSquareVerifier', function(){
        beforeEach(async function() {
            this.contract = await SolnSquareVerifier.new();
        });


        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('should add new solutions', async function(){

            let tx = await this.contract.addSolution(accounts[1], 1, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs, {from: accounts[0]});

            let verified_event = tx.logs[0].event;
            let added_event = tx.logs[1].event;
            assert.equal(verified_event, 'Verified', 'Invalid event emitted');
            assert.equal(added_event, 'SolutionAdded', 'Invalid event emitted');
        });


        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('should mint tokens for contract', async function(){
            await this.contract.addSolution(accounts[2], 1,  proof.proof.a,  proof.proof.b,  proof.proof.c, proof.inputs, {from: accounts[0]});
            let tx = await this.contract.mint(accounts[2], 1, {from: accounts[0]});

            let tokenTransferredEvent = tx.logs[0].event; //transferred == minted
            console.log('tokenTransferredEvent ' + tokenTransferredEvent);

            assert.equal(tokenTransferredEvent, 'Transfer', 'Invalid event emitted');
        });
    });
})