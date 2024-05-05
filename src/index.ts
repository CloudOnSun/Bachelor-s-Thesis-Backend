import Koa from "koa"

import bodyparser from "koa-bodyparser";
import authRouter from "./auth/routes/routes";
import rfsRouter from "./rfs/routes/rfs-router";

const cors = require("@koa/cors");
const app = new Koa();

const port = 3001;


app.use(bodyparser())
    .use(cors())
    .use(authRouter.routes())
    .use(rfsRouter.routes())
    .listen(port, async () => {
        console.log(`🚀 Server is running on port http://localhost:${port}/`);
    });