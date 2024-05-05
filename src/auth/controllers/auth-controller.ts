import {ParameterizedContext} from "koa";
import {LogInPayload} from "../types/LogInPayload";
import AuthService from "../service/auth-service";
import {response} from "../../libraries/helpers";
import {
    InternalServerError,
    InvalidUserAccount, InvalidUserPassword,
    MissingRequestParameters,
    UserAlreadyExists,
    UserNotFound
} from "../../libraries/errors";
import {SignUpPayload} from "../types/SignUpPayload";

export default class AuthController {

    private authService = new AuthService()

    public async loginUser(ctx: ParameterizedContext): Promise<void> {
        const credentials: LogInPayload = ctx.request.body;
        try {
            const logInDTO = await this.authService.loginUser(credentials)
            response(ctx, 200, JSON.stringify(logInDTO))
        }
        catch (error) {
            if (error.message == "Incorrect email") {
                const err = new UserNotFound()
                console.log("B")
                response(ctx, err.status, err.message)
            }
            else if (error.message == "Incorrect password") {
                const err = new InvalidUserPassword("Password incorrect")
                response(ctx, err.status, err.message)
            }
            else {
                const err = new InternalServerError()
                response(ctx, err.status, err.message)
            }
        }
        console.log("Log in")
    }

    public async signUpUser(ctx: ParameterizedContext): Promise<void> {
        const userPayload: SignUpPayload = ctx.request.body;
        try {
            const logInDTO = await this.authService.signUpUser(userPayload)
            response(ctx, 200, JSON.stringify(logInDTO))
        }
        catch (error) {
            if (error.message == "User already exists") {
                const err = new UserAlreadyExists()
                console.log("A")
                response(ctx, 400, "User already exists")
            }
            else {
                const err = new InternalServerError()
                response(ctx, err.status, err.message)
            }
        }
        console.log("Sign up")
    }
}