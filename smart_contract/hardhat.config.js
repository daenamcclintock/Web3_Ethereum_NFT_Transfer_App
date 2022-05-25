require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/pW4wl-Hlh6oyF3EAgb-iAs4rbho2Ejht',
      accounts: ['3e0d16007fd89c1756e704b3dad9d02d8fe4ce58a11cd650f0a8294ee072018e']
    }
  }
}
