import {ParameterizedContext} from "koa";

export const response = (
    context: ParameterizedContext,
    status: number,
    body?: Record<string, any> | string | Array<Record<string, any>>,
): void => {
    context.response.status = status
    context.response.body = body
}

import Ajv from "ajv";
import {inspect} from "util";
import {MissingRequestParameters} from "./errors";

const ajv = new Ajv({allErrors: true});

export const verify = (ctx: ParameterizedContext, next: () => Promise<any>, data: any, schema: any) => {
    const validate = ajv.compile(schema)
    const isValid = validate(data);
    if (isValid) {
        return next();
    }
    const err = new MissingRequestParameters(
        ajv.errorsText(
            validate.errors?.filter((err) => err.keyword !== "if"),
            {dataVar: "schemaValidation"}) + "\n\n" + inspect(data)
    );
    response(ctx, err.status, err.message)
};
