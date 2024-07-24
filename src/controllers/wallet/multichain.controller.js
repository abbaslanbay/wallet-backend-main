const multichainWallet = require('multichain-crypto-wallet');
const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const ApiError = require('../../utils/ApiError');
const { utils } = require('ethers');
const { uploadFile, readFile } = require('../../helper/uploadAws');

const createMnemonic = catchAsync(async (req, res) => {
  const mnemonic = multichainWallet.generateMnemonic();
  res.status(httpStatus.OK).send({ mnemonic });
});

const createWallet = catchAsync(async (req, res) => {
  const { network, cluster } = req.body;
  const wallet = multichainWallet.createWallet({
    network: network,
    cluster: cluster,
    derivationPath: "m/44'/0'/0'/0/0",
  });
  res.status(httpStatus.OK).send({ wallet });
});

const getBalance = catchAsync(async (req, res) => {
  const { network, rpcUrl, address } = req.body;
  const balance = await multichainWallet.getBalance({
    network: network,
    rpcUrl: rpcUrl,
    address: address,
  });
  res.status(httpStatus.OK).send({ data: balance });
});

const createWalletFromMnemonic = catchAsync(async (req, res) => {
  const { network, mnemonic } = req.body;
  const wallet = multichainWallet.generateWalletFromMnemonic({
    network: network,
    mnemonic: mnemonic,
    derivationPath: "m/44'/0'/0'/0/0",
  });
  res.status(httpStatus.OK).send({ wallet });
});

const getAddressFromPrivateKey = catchAsync(async (req, res) => {
  const { network, privateKey } = req.body;
  const address = multichainWallet.getAddressFromPrivateKey({
    network: network,
    privateKey: privateKey,
  });
  res.status(httpStatus.OK).send({ address });
});

const getTransaction = catchAsync(async (req, res) => {
  const { network, rpcUrl, txHash } = req.body;
  const transaction = await multichainWallet.getTransaction({
    network: network,
    rpcUrl: rpcUrl,
    hash: txHash,
  });
  res.status(httpStatus.OK).send({ transaction });
});

const transferCoin = catchAsync(async (req, res) => {
  const { network, rpcUrl, privateKey, recipientAddress, amount } = req.body;
  const transfer = await multichainWallet.transfer({
    network: network,
    rpcUrl: rpcUrl,
    privateKey: privateKey,
    recipientAddress: recipientAddress,
    amount: amount,
    gasPrice: '10',
    data: 'Money Transfer',
  });
  res.status(httpStatus.OK).send({ transfer });
});

const recoverWallet = catchAsync(async (req, res) => {
  const { network, mnemonic } = req.body;
  const wallet = multichainWallet.generateWalletFromMnemonic({
    network: network,
    mnemonic: mnemonic,
    derivationPath: "m/44'/0'/0'/0/0",
  });
  res.status(httpStatus.OK).send({ wallet });
});

const createEncryptedJson = catchAsync(async (req, res) => {
  const { network, password, privateKey } = req.body;
  const encryptedJson = await multichainWallet.getEncryptedJsonFromPrivateKey({
    network: network,
    password: password,
    privateKey: privateKey,
  });
  uploadEncryptedJson(encryptedJson.json);
  res.status(httpStatus.OK).send({ encryptedJson });
});

const uploadEncryptedJson = catchAsync(async (obj) => {
  const upload = uploadFile(obj, (data) => {
    if (data.status === true) {
      console.log('data', data);
      return data;
    } else {
      console.log('data2', data);
      return data;
    }
  });
});

const getEncryptedJson = catchAsync(async (req, res) => {
  const { network, password, fileKey } = req.body;
  const file = readFile(fileKey, async (data) => {
    if (data.status === true) {
      const json = JSON.parse(data.json);
      const encryptedJson = await multichainWallet.getWalletFromEncryptedJson({
        network: network,
        password: password,
        json: json,
      });
      console.log('encryptedJson', encryptedJson);
      return res.status(httpStatus.OK).send({ encryptedJson });
    } else {
      return res.status(httpStatus.OK).send({ data });
    }
  });
});

module.exports = {
  createMnemonic,
  createWallet,
  getBalance,
  createWalletFromMnemonic,
  getAddressFromPrivateKey,
  getTransaction,
  createEncryptedJson,
  getEncryptedJson,
  transferCoin,
  recoverWallet,
};
