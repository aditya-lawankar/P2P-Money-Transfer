require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/CcdFduKO-O19lG7k0rOMxiitRa-41Wu8',
      accounts: [
        'a29bc840c66f47a312b26825ca0f4cbf37cb9e917ba92896a6b928fbd20b6436',
      ],
    },
  },
};
