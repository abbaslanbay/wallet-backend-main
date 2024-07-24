const express = require('express');
const validate = require('../../middlewares/validate');
const walletController = require('../../controllers/wallet/multichain.controller');

const router = express.Router();

router.post('/createWallet', walletController.createWallet);
router.post('/createMnemonic', walletController.createMnemonic);
router.post('/getBalance', walletController.getBalance);
router.post('/createWalletFromMnemonic', walletController.createWalletFromMnemonic);
router.post('/getAddressFromPrivateKey', walletController.getAddressFromPrivateKey);
router.post('/getTransaction', walletController.getTransaction);
router.post('/transferCoin', walletController.transferCoin);
router.post('/recoverWallet', walletController.recoverWallet);
router.post('/createEncryptedJson', walletController.createEncryptedJson);
router.post('/getEncryptedJson', walletController.getEncryptedJson);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Wallet
 *   description: Wallet Management
 */

/**
 * @swagger
 * /wallet/createWallet:
 *   post:
 *     summary: Create Wallet
 *     tags: [Wallet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - network
 *               - cluster
 *             properties:
 *               network:
 *                 type: string
 *               cluster:
 *                 type: string
 *             example:
 *               network: "ethereum"
 *               cluster: "goerly"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */

/**
 * @swagger
 * /wallet/createWalletFromMnemonic:
 *   post:
 *     summary: Create Wallet From Mnemonic
 *     tags: [Wallet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - network
 *               - mnemonic
 *             properties:
 *               network:
 *                 type: string
 *               mnemonic:
 *                 type: string
 *             example:
 *               network: "ethereum"
 *               mnemonic: "canyon bean tongue zone minor tray keep cheap short diary scale grant"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */

/**
 * @swagger
 * /wallet/createMnemonic:
 *   post:
 *     summary: Create Mnemonic
 *     tags: [Wallet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - network
 *             properties:
 *               network:
 *                 type: string
 *             example:
 *               network: "ethereum"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */

/**
 * @swagger
 * /wallet/getBalance:
 *   post:
 *     summary: Get Wallet Balance
 *     tags: [Wallet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - network
 *               - address
 *               - rpcUrl
 *             properties:
 *               network:
 *                 type: string
 *             example:
 *               network: "ethereum"
 *               address: "0x9CFe38e08BC4BfD0bf51a089B04B6AE8F1C9B1F9"
 *               rpcUrl: "https://rpc.ankr.com/bsc_testnet_chapel"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */

/**
 * @swagger
 * /wallet/getAddressFromPrivateKey:
 *   post:
 *     summary: Get Address From Private Key
 *     tags: [Wallet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - network
 *               - privateKey
 *             properties:
 *               network:
 *                 type: string
 *               privateKey:
 *                 type: string
 *             example:
 *               network: "ethereum"
 *               privateKey: "0xb225b423b871f67f6af51ea8511d6014ae0f2a34ee6edfd8c843f00bc421011d"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */

/**
 * @swagger
 * /wallet/getTransaction:
 *   post:
 *     summary: Get Transaction
 *     tags: [Wallet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - txHash
 *               - network
 *               - rpcUrl
 *             properties:
 *               network:
 *                 type: string
 *               txHash:
 *                 type: string
 *               rpcUrl:
 *                 type: string
 *             example:
 *               network: "ethereum"
 *               txHash: "0x5a90cea37e3a5dbee6e10190ff5a3769ad27a0c6f625458682104e26e0491055"
 *               rpcUrl: "https://rpc.ankr.com/bsc_testnet_chapel"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */

/**
 * @swagger
 * /wallet/transferCoin:
 *   post:
 *     summary: Send Transfer
 *     tags: [Wallet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - privateKey
 *               - network
 *               - rpcUrl
 *               - recipientAddress
 *               - amount
 *             properties:
 *               network:
 *                 type: string
 *               privateKey:
 *                 type: string
 *               rpcUrl:
 *                 type: string
 *               recipientAddress:
 *                 type: string
 *               amount:
 *                 type: string
 *             example:
 *               network: "ethereum"
 *               privateKey: "0xb225b423b871f67f6af51ea8511d6014ae0f2a34ee6edfd8c843f00bc421011d"
 *               rpcUrl: "https://rpc.ankr.com/bsc_testnet_chapel"
 *               recipientAddress: "0x5Fba5896E6BE5DB32415f5be949CEda7673f9FDa"
 *               amount: "0.08"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */

/**
 * @swagger
 * /wallet/recoverWallet:
 *   post:
 *     summary: Recover Wallet
 *     tags: [Wallet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mnemonic
 *             properties:
 *               mnemonic:
 *                 type: string
 *             example:
 *               mnemonic: "canyon bean tongue zone minor tray keep cheap short diary scale grant"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */

/**
 * @swagger
 * /wallet/createEncryptedJson:
 *   post:
 *     summary: Create Encrypted Json
 *     tags: [Wallet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - network
 *               - password
 *               - privateKey
 *             properties:
 *               network:
 *                 type: string
 *               password:
 *                 type: string
 *               privateKey:
 *                 type: string
 *             example:
 *               network: "ethereum"
 *               password: "123456"
 *               privateKey: "0xb225b423b871f67f6af51ea8511d6014ae0f2a34ee6edfd8c843f00bc421011d"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */

/**
 * @swagger
 * /wallet/getEncryptedJson:
 *   post:
 *     summary: Get Encrypted Json
 *     tags: [Wallet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - network
 *               - fileKey
 *               - password
 *             properties:
 *               network:
 *                 type: string
 *               password:
 *                 type: string
 *               fileKey:
 *                 type: string
 *             example:
 *               network: "ethereum"
 *               password: "123456"
 *               fileKey: "2aaa26a6-2375-42e0-9d3c-28884f54b96a.json"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */
