import Router from "koa-router";
import RfsController from "../controllers/rfs-controller";
import {accessMiddleware} from "../../auth/middlewares/authorization-middleware";
import {validateFormInput} from "../middlewares/validateFormInput";

const rfsRouter = new Router({prefix: '/rfs'});
const rfsController = new RfsController()

rfsRouter.get('/predict-damage/:rfsId', accessMiddleware, (ctx) =>
    rfsController.predictDamage(ctx))

rfsRouter.get('/', accessMiddleware, (ctx) => rfsController.getAllRfs(ctx))

rfsRouter.post('/', validateFormInput,  accessMiddleware, (ctx) => rfsController.saveRfs(ctx))

export default rfsRouter