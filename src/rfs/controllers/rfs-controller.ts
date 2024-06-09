import RfsService from "../service/rfs-service";
import {ParameterizedContext} from "koa";
import {response} from "../../libraries/helpers";
import {InternalServerError} from "../../libraries/errors";

export default class RfsController {
    private rfsService = new RfsService()

    public async predictDamage(ctx: ParameterizedContext): Promise<void> {
        const rfsId = Number(ctx.params.rfsId)
        const user = ctx.state.user
        try {
            const responseText = await this.rfsService.predictDamage(user, rfsId)
            response(ctx, 200, JSON.stringify({response: responseText}))
        } catch (error) {
            if (error.message == "Email error!") {
                response(ctx, 513, JSON.stringify({response: "Email error!"}))
            } else if (error.message == "Model Server Error!") {
                response(ctx, 514, JSON.stringify({response: "Model Server Error!"}))
            } else if (error.message == "Model Response Error!") {
                response(ctx, 515, JSON.stringify({response: "Model Response Error!"}))
            } else {
                const err = new InternalServerError()
                response(ctx, err.status, err.message)
            }
        }
        console.log("Predict")
    }

    public async getAllRfs(ctx: ParameterizedContext): Promise<void> {
        const userId = ctx.state.user.id
        try {
            const rfs = await this.rfsService.getAllRfs(userId)
            response(ctx, 200, JSON.stringify(rfs))
        } catch (error) {
            const err = new InternalServerError()
            response(ctx, err.status, err.message)
        }
        console.log("Get all")
    }

    public async saveRfs(ctx: ParameterizedContext): Promise<void> {
        const userId = ctx.state.user.id
        const testName = ctx.request.body.testName
        const file = ctx.request.files.file
        try {
            await this.rfsService.saveRfs(userId, testName, file)
            response(ctx, 200, JSON.stringify({response: "RFS saved successfully!"}))
        } catch (error) {
            const err = new InternalServerError()
            response(ctx, err.status, err.message)
        }
    }
}
