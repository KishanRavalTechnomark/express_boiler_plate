import express from "express";
import * as Auth from "../../controllers/AuthController";
import * as AuthMiddleware from "../middleware/AuthMiddleware";
import bodyParser from "body-parser";

const auth = express.Router();

auth.post("/register", AuthMiddleware.validateRegisterRequest, Auth.register);

auth.post("/login", AuthMiddleware.validateLoginRequest,  Auth.login);

auth.post('/forgot-password',AuthMiddleware.validatePasswordForgetRequest, Auth.forgotPassword);
auth.get('/reset-password/:token',AuthMiddleware.validatePasswordResetRequest, Auth.resetPassword);
auth.post('/reset-password',bodyParser.urlencoded({extended:true}), AuthMiddleware.validatePasswordResetRequest, AuthMiddleware.validateConfirmPasswordRequest, Auth.resetPasswordConfirmed)

//common middleware
auth.use(AuthMiddleware.validateJWTToken);

auth.post('/change-password', AuthMiddleware.validatePasswordChangeRequest,  Auth.changePassword);

export default auth;
