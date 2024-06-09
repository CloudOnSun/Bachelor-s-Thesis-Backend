import RfsRepository from "../persistance/rfs-repository";
import EmailProvider from "../../libraries/email-provider";
import {RFS, User} from "@prisma/client";
import {DamageCreateInput} from "../types/DamageCreateInput";
import {RfsWithDamages} from "../types/RfsWithDamages";
import * as readline from "node:readline";
import * as fs from "node:fs";
import {RfsCreateInput} from "../types/RfsCreateInput";

export default class RfsService {
    private rfsRepo = new RfsRepository()
    private emailProvider = new EmailProvider()


    public async predictDamage(user: User, rfsId: number): Promise<string> {
        const rfs = await this.rfsRepo.getRfsById(rfsId)
        const requestBody = {
            rfs: [rfs.mode1, rfs.mode2, rfs.mode3, rfs.mode4, rfs.mode5, rfs.mode6,
                rfs.mode7, rfs.mode8]
        }
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
                this.emailProvider.sendEmail(user.email, damage, rfsId, rfs.testName)
            }).catch((error) => {
                console.log("Model Response Error!")
            })

        }).catch((error) => {
            console.log("Model Server Error!")
        })

        return "Damage prediction in progress. Check your email for the results. Estimated time: 5 minutes.";

    }

    public async getAllRfs(userId: number): Promise<RfsWithDamages[]> {
        return this.rfsRepo.getAllRfs(userId)
    }

    public async saveRfs(userId: number, testName: string, file: any): Promise<RFS> {
        console.log(file)
        const modes = await this.readCSV(file.filepath)
        const rfsCreateInput: RfsCreateInput = {
            userId: userId,
            mode1: modes[0],
            mode2: modes[1],
            mode3: modes[2],
            mode4: modes[3],
            mode5: modes[4],
            mode6: modes[5],
            mode7: modes[6],
            mode8: modes[7],
            testName: testName
        }
        return this.rfsRepo.saveRfs(rfsCreateInput)
    }

    private async readCSV(filePath: string): Promise<number[]> {
        return new Promise((resolve, reject) => {
            const rl = readline.createInterface({
                input: fs.createReadStream(filePath),
                output: process.stdout,
                terminal: false
            });

            let floats: number[] = [];

            rl.on('line', (line: any) => {
                const values = line.split(',').map(parseFloat);
                floats = values;
            });

            rl.on('close', () => {
                resolve(floats);
            });

            rl.on('error', (err: any) => {
                reject(err);
            });
        });
    }

}