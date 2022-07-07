// We do not import classic ethers anymore, we use hardhat's version
const { ethers, run, network } = require('hardhat')
require('dotenv').config()

async function main() {
  // Because it's ethers from hardhat, it knows where SimpleStorage is and we do not have to worry about the path
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
  // We did not include the rpc url nor the private key, how does this still work?
  console.log('Deploying contract...')
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`Deployed contract to: ${simpleStorage.address}`)
  // What happens when we deploy to our hardhat network?
  // It does not have any verification, so we should avoid the verify step for it
  // Hardhat's chain id is 31337
  if (network.config.chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(7)
    await verify(simpleStorage.address, [])
  }

  const currentValue = await simpleStorage.retrieve()
  console.log(`Current Value is: ${currentValue}`)

  // Update current value
  const transactionResponse = await simpleStorage.store(49)
  await transactionResponse.wait(1)
  const newValue = await simpleStorage.retrieve()
  console.log(`New Value is: ${newValue}`)
}

async function verify(contractAddress, args) {
  console.log('Verifying contract...')
  // :verify is the subtask of the console command verify
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    })
    console.log('Verified!!')
  } catch (e) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already verified!')
    } else {
      console.log(e)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
