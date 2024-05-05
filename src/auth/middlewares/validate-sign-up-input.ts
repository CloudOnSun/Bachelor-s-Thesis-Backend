import {ParameterizedContext} from "koa";
import {verify} from "../../libraries/helpers";
import {signUpSchema} from "../schemas/signUpSchema";

export const validateSignUpInput = async (ctx: ParameterizedContext, next: () => Promise<any>) =>  {
    await verify(ctx, next, ctx.request.body, signUpSchema)
}