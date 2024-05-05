import Router from "koa-router";
import RfsController from "../controllers/rfs-controller";
import {accessMiddleware} from "../../auth/middlewares/authorization-middleware";

const rfsRouter = new Router();
const rfsController = new RfsController()

rfsRouter.get('/predict-damage/:rfsId', accessMiddleware, (ctx) =>
    rfsController.predictDamage(ctx))

rfsRouter.get('/all-rfs', accessMiddleware, (ctx) => rfsController.getAllRfs(ctx))

export default rfsRouter