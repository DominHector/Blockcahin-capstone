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
    var { proof: { a, b, c }, inputs: inputs } = proof[i];
    console.log('a ' + a);
    console.log('b ' + b);
    console.log('c ' + c);
    console.log('inputs ' + inputs);
}
//node mint_test.js