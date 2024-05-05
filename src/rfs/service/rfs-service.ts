import RfsRepository from "../persistance/rfs-repository";
import EmailProvider from "../../libraries/email-provider";
import {User} from "@prisma/client";
import {DamageCreateInput} from "../types/DamageCreateInput";
import {RfsWithDamages} from "../types/RfsWithDamages";

export default class RfsService {
    private rfsRepo = new RfsRepository()
    private emailProvider = new EmailProvider()


    public async predictDamage(user: User, rfsId: number): Promise<string> {
        const rfs = await this.rfsRepo.getRfsById(rfsId)
        const requestBody = {rfs: [rfs.mode1, rfs.mode2, rfs.mode3, rfs.mode4, rfs.mode5, rfs.mode6,
                rfs.mode7, rfs.mode8]}
        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }).then((response) => {
            response.json().then(async (data) => {
                const damageCreateInput: DamageCreateInput = {
                    location1: data.position[0],
                    location2: data.position[1],
                    depth1: data.position[2],
                    depth2: data.position[3],
                    cost: data.cost,
                    rfsId: rfsId

                }
                const damage = await this.rfsRepo.createDamage(damageCreateInput)
                this.emailProvider.sendEmail(user.email, damage, rfsId)
            }).catch((error) => {
                throw new Error("Model Response Error!")
            })

        }).catch((error) => {
            throw new Error("Model Server Error!")
        })

        return "Damage prediction in progress. Check your email for the results. Estimated time: 5 minutes.";

    }

    public async getAllRfs(userId: number): Promise<RfsWithDamages[]> {
        return this.rfsRepo.getAllRfs(userId)
    }

}