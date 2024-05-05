import {ParameterizedContext} from "koa";
import TokenService from "../service/token-service";
import {InvalidToken} from "../../libraries/errors";

export async function accessMiddleware(ctx: ParameterizedContext, next: any) {
  const { authorization } = ctx.request.headers;
  if (!authorization) {
    ctx.throw(new InvalidToken());
  }
  const token = authorization.split(' ')[1];
  if (!token) {
    ctx.throw(new InvalidToken());
  }
  try {
    const decoded = await TokenService.verifyAccessToken(token);
    ctx.state.user = decoded;
    return next();
  } catch (err) {
    ctx.throw(new InvalidToken());
  }
}