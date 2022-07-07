const { ethers } = require('hardhat')
const { expect, assert } = require('chai')

describe('SimpleStorage', function () {
  let simpleStorageFactory, simpleStorage

  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
    simpleStorage = await simpleStorageFactory.deploy()
  })

  // Command to test only one test:
  // yarn hardhat test --grep substringOfText
  it('Should start with a favourite number of 0', async function () {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = '0'
    // assert or expect
    assert.equal(currentValue.toString(), expectedValue)
  })
  it('Should update when we call store', async function () {
    const expectedValue = '7'
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const currentValue = await simpleStorage.retrieve()

    assert.equal(currentValue.toString(), expectedValue)
  })
  it('Should add person to people array and set favourite number mapped to the person', async function () {
    expectedValue = 49
    const transactionResponse = await simpleStorage.addPerson(
      'Jane',
      expectedValue
    )
    await transactionResponse.wait(1)
    const currentValue = await simpleStorage.nameToFavoriteNumber('Jane')

    assert.equal(currentValue.toString(), expectedValue.toString())
  })
})
