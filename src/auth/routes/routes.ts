import Router from "koa-router";
import AuthController from "../controllers/auth-controller";
import {validateLoginInput} from "../middlewares/validate-login-input";
import {validateSignUpInput} from "../middlewares/validate-sign-up-input";

const authRouter = new Router({prefix: '/auth'});

const authController = new AuthController()


authRouter.post('/login', validateLoginInput, async (ctx) =>
    authController.loginUser(ctx));

authRouter.post('/sign-up', validateSignUpInput, async(ctx) =>
    authController.signUpUser(ctx))

export default authRouter