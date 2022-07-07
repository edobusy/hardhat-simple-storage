const { task } = require('hardhat/config')

task('block-number', 'Prints the current block number').setAction(
  // hre is the Hardhat Runtime Environment, which works like an imported hardhat object with all its functionalities
  async (taskArgs, hre) => {
    const blockNum = await hre.ethers.provider.getBlockNumber()
    console.log(`Current Block Number: ${blockNum}`)
  }
)

module.exports = {}
