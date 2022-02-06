var SquareVerifier = artifacts.require("./verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function(deployer) {
  deployer.deploy(SquareVerifier).then(() => deployer.deploy(SolnSquareVerifier, SquareVerifier.address)).then( async () => {
    var contract = await SolnSquareVerifier.deployed();

    var account = '0x9AC86711b5b63f99bf531cF63660287f2B73e61A';

    var proof = [
      require("../../zokrates/code/square/proof_0.json"),
      require("../../zokrates/code/square/proof_1.json"),
      require("../../zokrates/code/square/proof_2.json"),
      require("../../zokrates/code/square/proof_3.json"),
      require("../../zokrates/code/square/proof_4.json"),
      require("../../zokrates/code/square/proof_5.json"),
      require("../../zokrates/code/square/proof_6.json"),
      require("../../zokrates/code/square/proof_7.json"),
      require("../../zokrates/code/square/proof_8.json"),
      require("../../zokrates/code/square/proof_9.json"),
    ];

    var items = 10;
    for (let i = 0; i < items ; i++) {
      var item = i+1;
      var { proof: { a, b, c }, inputs: inputs } = proof[i];
      await contract.mintToken(account, item, a, b, c, inputs, {from:account});
    }

  });
}