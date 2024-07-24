const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user/user.validation');
const userController = require('../../controllers/user/user.controller');
const { authVerify } = require('../../middlewares/auth');

const router = express.Router();

router.post('/resetPasswordByEmail', validate(userValidation.resetPasswordByEmail), userController.resetPasswordByEmail);
router.post('/changePasswordByReset', validate(userValidation.changePasswordByReset), userController.changePasswordByReset);
router.post('/getUser', authVerify, userController.getUser);
router.post('/changePassword', authVerify, validate(userValidation.changePassword), userController.changePassword);
router.post('/updateUser', authVerify, validate(userValidation.updateUser), userController.updateUser);
router.post(
  '/updateNotifySettings',
  authVerify,
  validate(userValidation.updateNotifySettings),
  userController.updateNotifySettings
);
// router.post(
//   '/updateAllUserWalletAddress',
//   authVerify,
//   validate(userValidation.updateAllUserWalletAddress),
//   userController.updateAllUserWalletAddress
// );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Management
 */

/**
 * @swagger
 * /user/resetPasswordByEmail:
 *   post:
 *     summary: Reset password by email
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *             example:
 *               email: abbaslanbay@gmail.com
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
 * /user/changePasswordByReset:
 *   post:
 *     summary: Reset password by email
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - verification_code
 *               - passwordAgain
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
 *               email: abbaslanbay@gmail.com
 *               password: "19031996"
 *               passwordAgain: "19031996"
 *               verification_code: "123456"
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
 * /user/getUser:
 *   post:
 *     summary: Get User
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 * /user/changePassword:
 *   post:
 *     summary: Change Password
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - password
 *               - passwordAgain
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               oldPassword:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               passwordAgain:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               password: "19031996"
 *               passwordAgain: "19031996"
 *               oldPassword: "19031996"
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
 * /user/updateUser:
 *   post:
 *     summary: Update User
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
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
 *               - phone
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *             example:
 *               first_name: "Abbas"
 *               last_name: "Aslanbay"
 *               email: "abbaslanbay@gmail.com"
 *               phone: "5458173979"
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
 * /user/updateNotifySettings:
 *   post:
 *     summary: Update Notify Settings
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - is_email_campaing
 *               - is_sms_campaing
 *               - is_push_notification
 *             properties:
 *               is_email_campaing:
 *                 type: boolean
 *               is_sms_campaing:
 *                 type: boolean
 *               is_push_notification:
 *                 type: boolean
 *             example:
 *               is_email_campaing: true
 *               is_sms_campaing: true
 *               is_push_notification: true
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
