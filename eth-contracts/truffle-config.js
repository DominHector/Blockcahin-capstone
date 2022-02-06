var HDWalletProvider = require('truffle-hdwallet-provider');
var mnemonicLocal = 'fish skate trend copy ability hazard dismiss enroll orchard border grab degree';
var mnemonicRinkeby = 'skull bike patrol express claw insane gap impulse address violin addict carry';
var infuraKey = 'a93c26ceee2d4ccbbf46aac6223fff29';

module.exports = {
    networks: {
        development: {
            provider: function() {
                return new HDWalletProvider(mnemonicLocal, "http://127.0.0.1:8545/", 0, 50);
            },
            network_id: '*',
            gas: 6500000
        },
        rinkeby: {
            provider: function() {
                return new HDWalletProvider(mnemonicRinkeby, `https://rinkeby.infura.io/v3/${infuraKey}`);
            },
            network_id: 4,
        }
    },
    compilers: {
        solc: {
            // version: "^0.5.0"
        }
    }
};