import {ParameterizedContext} from "koa";
import {loginSchema} from "../schemas/loginSchema";
import {verify} from "../../libraries/helpers";

export const validateLoginInput = async (ctx: ParameterizedContext, next: () => Promise<any>)=>  {
    await verify(ctx, next, ctx.request.body, loginSchema)
}