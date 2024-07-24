const { generateMnemonic, mnemonicToEntropy } = require('ethereum-cryptography/bip39');
const { wordlist } = require('ethereum-cryptography/bip39/wordlists/english');
const { HDKey } = require('ethereum-cryptography/hdkey');
const { getPublicKey, ecdsaSign } = require('ethereum-cryptography/secp256k1');
const { keccak256 } = require('ethereum-cryptography/keccak');
const { bytesToHex } = require('ethereum-cryptography/utils');
const { writeFileSync, readFileSync } = require('fs');
const { getDefaultProvider, Wallet, utils } = require('ethers');
const Web3API = require('web3');

function _generateMnemonic() {
  const strength = 256; // 256 bits, 24 words; default is 128 bits, 12 words
  const mnemonic = generateMnemonic(wordlist, strength);
  const entropy = mnemonicToEntropy(mnemonic, wordlist);
  return { mnemonic, entropy };
}

function _getHdRootKey(_mnemonic) {
  return HDKey.fromMasterSeed(_mnemonic);
}

function _generatePrivateKey(_hdRootKey, _accountIndex) {
  return _hdRootKey.deriveChild(_accountIndex).privateKey;
}

function _getPublicKey(_privateKey) {
  return getPublicKey(_privateKey);
}

function _getEthAddress(_publicKey) {
  return keccak256(_publicKey).slice(-20);
}

function _store(_privateKey, _publicKey, _address) {
  const accountOne = {
    privateKey: _privateKey,
    publicKey: _publicKey,
    address: _address,
  };
  const accountOneData = JSON.stringify(accountOne);
  writeFileSync('wallet_1.json', accountOneData);
}

const createAccount = async (req, res, next) => {
  const { mnemonic, entropy } = _generateMnemonic();
  console.log(`WARNING! Never disclose your Seed Phrase:\n ${mnemonic}`);

  const hdRootKey = _getHdRootKey(entropy);

  const accountOneIndex = 0;
  const accountOnePrivateKey = _generatePrivateKey(hdRootKey, accountOneIndex);

  const accountOnePublicKey = _getPublicKey(accountOnePrivateKey);

  const accountOneAddress = _getEthAddress(accountOnePublicKey);
  console.log(`Account One Wallet Address: 0x${bytesToHex(accountOneAddress)}`);
  console.log(`Account One Wallet Private Key: 0x${bytesToHex(accountOnePrivateKey)}`);

  _store(accountOnePrivateKey, accountOnePublicKey, accountOneAddress);
  res.json({ address: bytesToHex(accountOneAddress) });
  // const web3 = new Web3API(new Web3API.providers.HttpProvider('https://mainnet.infura.io'));
  // let account = web3.eth.accounts.create(web3.utils.randomHex(32));
  // let wallet = web3.eth.accounts.wallet.add(account);
  // let keystore = wallet.encrypt(web3.utils.randomHex(32));
  // console.log({
  //   account: account,
  //   wallet: wallet,
  //   keystore: keystore,
  // });
};

const restoreAccount = async (req, res, next) => {
  const { _mnemonic } = req.body;
  const entropy = mnemonicToEntropy(_mnemonic, wordlist);
  const hdRootKey = HDKey.fromMasterSeed(entropy);
  const privateKey = hdRootKey.deriveChild(0).privateKey;
  const publicKey = getPublicKey(privateKey);
  const address = keccak256(publicKey).slice(-20);
  console.log(`Account One Wallet Address: 0x${bytesToHex(address)}`);

  const accountOne = {
    privateKey: privateKey,
    publicKey: publicKey,
    address: address,
  };
  const accountOneData = JSON.stringify(accountOne);
  writeFileSync('restore.json', accountOneData);
  res.json({ address: bytesToHex(address) });
};

const sendAmount = async (req, res, next) => {
  const { amount, to } = req.body;

  const { rpcUrl, options } = await getProvider();
  const provider = getDefaultProvider(rpcUrl, options);
  const accountRawData = readFileSync('wallet_1.json', 'utf8');
  const accountData = JSON.parse(accountRawData);

  const privateKey = Object.values(accountData.privateKey);
  console.log('privateKey', privateKey);
  const signer = new Wallet(privateKey, provider);

  console.log('signer', signer.address);
  console.log('signer', signer);

  //get balance
  const balance = await provider.getBalance(signer.address);
  console.log('balanceeeee', utils.formatEther(balance));

  const transaction = await signer.sendTransaction({
    to: to,
    value: utils.parseEther(amount),
  });

  res.json({ transaction: transaction });
};

const getAmount = async (req, res, next) => {
  const { address } = req.body;
  const { rpcUrl, options } = await getProvider();
  const provider = getDefaultProvider(rpcUrl, options);
  const balance = await provider.getBalance(address);
  res.json({ balance: utils.formatEther(balance) });
  console.log(utils.formatEther(balance));
};

const getAmountByFile = async (req, res, next) => {
  const { rpcUrl, options } = await getProvider();
  const provider = getDefaultProvider(rpcUrl, options);
  const accountRawData = readFileSync('wallet_1.json', 'utf8');
  const accountData = JSON.parse(accountRawData);

  const privateKey = Object.values(accountData.privateKey);
  console.log('privateKey', privateKey);
  const signer = new Wallet(privateKey, provider);
  const balance = await provider.getBalance(signer.address);
  res.json({ balance: utils.formatEther(balance) });
  console.log(utils.formatEther(balance));
};
const getProvider = async () => {
  //use network binance test
  const rpcUrl = 'https://data-seed-prebsc-1-s1.binance.org:8545';
  const options = {
    chainId: 97,
    chainName: 'Binance Smart Chain - Testnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'bnb',
      decimals: 18,
    },
  };

  return { rpcUrl, options };
};

module.exports = {
  createAccount,
  restoreAccount,
  sendAmount,
  getAmount,
  getAmountByFile,
};
