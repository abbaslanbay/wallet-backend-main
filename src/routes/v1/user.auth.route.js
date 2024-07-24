const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/user/auth.validation');
const authController = require('../../controllers/user/auth.controller');
const { authVerify } = require('../../middlewares/auth');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/loginWithPhone', validate(authValidation.loginWithPhone), authController.loginWithPhone);
router.post('/verifyAccountByPhone', validate(authValidation.verifyAccountByPhone), authController.verifyAccountByPhone);
router.post('/loginWithEmail', validate(authValidation.loginWithEmail), authController.loginWithEmail);
router.post('/verifyAccountByEmail', validate(authValidation.verifyAccountByEmail), authController.verifyAccountByEmail);
router.post('/logout', authVerify, validate(authValidation.logout), authController.logout);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * paths:
 *  /auth/register:
 *   post:
 *     summary: Register as user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *               - ip_address
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               ip_address:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               first_name: Abbas
 *               last_name: Aslanbay
 *               phone: "5458173979"
 *               phone_code: "+90"
 *               email: abbaslanbay@gmail.com
 *               password: Abbas1903
 *               ip_address: 127.0.0.1
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
 * /auth/loginWithPhone:
 *   post:
 *     summary: Login as a user with Phone
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - phone_code
 *               - password
 *             properties:
 *               phone:
 *                 type: string
 *                 description: must be unique
 *               phone_code:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               phone: "5458173979"
 *               phone_code: "+90"
 *               password: password1
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
 * /auth/loginWithEmail:
 *   post:
 *     summary: Login with Email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               email: "abbaslanbay@gmail.com"
 *               password: password1
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
 * /auth/verifyAccountByPhone:
 *   post:
 *     summary: Verify account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - verification_code
 *             properties:
 *               phone:
 *                 type: string
 *                 description: must be unique
 *               verification_code:
 *                 type: string
 *                 minLength: 6
 *             example:
 *               phone: "5458173979"
 *               verification_code: "592665"
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
 * /auth/verifyAccountByEmail:
 *   post:
 *     summary: Verify account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - verification_code
 *             properties:
 *               email:
 *                 type: string
 *                 description: must be unique
 *               verification_code:
 *                 type: string
 *                 minLength: 6
 *             example:
 *               email: "abbaslanbay@gmail.com"
 *               verification_code: "592665"
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
