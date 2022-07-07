require('@nomiclabs/hardhat-waffle')
require('dotenv').config()
require('@nomiclabs/hardhat-etherscan')
require('./tasks/block-number')
require('hardhat-gas-reporter')
require('solidity-coverage')

const RINKEBY_RPC_URL =
  process.env.RINKEBY_RPC_URL || 'https://eth-rinkeby/example'
const PRIVATE_KEY = process.env.PRIVATE_KEY || '0xkey'
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || 'key'
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || 'key'

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  // If we do not include anything else here the following line is automatically set
  // defaultNetwork: "hardhat"
  // You can also set the network on the command line like this:
  // yarn hardhat run scripts/deploy --network hardhat

  defaultNetwork: 'hardhat',
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      chainId: 4,
      accounts: [PRIVATE_KEY],
    },
    localhost: {
      url: 'http://127.0.0.1:8545/',
      chainId: 31337,
    },
  },
  solidity: '0.8.7',
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: 'gas-report.txt',
    noColors: true,
    currency: 'AUD',
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: 'MATIC',
  },
}
