import {ParameterizedContext} from "koa";
import {verify} from "../../libraries/helpers";
import {formWithoutFileSchema} from "../schemas/formWithoutFileSchema";
import {fileSchema} from "../schemas/fileSchema";

export const validateFormInput = async (ctx: ParameterizedContext, next: () => Promise<any>)=>  {
    await verify(ctx, next, ctx.request.body, formWithoutFileSchema);
    // await verify(ctx, next, ctx.request.files, fileSchema);
}