import {PrismaClient} from "@prisma/client";
import {DamageCreateInput} from "../types/DamageCreateInput";
import {RfsCreateInput} from "../types/RfsCreateInput";

export default class RfsRepository {
    private prisma = new PrismaClient()

    public async createDamage(damage: DamageCreateInput) {
        return this.prisma.damage.create({
            data: {
                location1: damage.location1,
                location2: damage.location2,
                depth1: damage.depth1,
                depth2: damage.depth2,
                cost: damage.cost,
                rfs: {
                    connect: {
                        id: damage.rfsId
                    }
                }
            }
        })
    }

    public async getRfsById(rfsId: number) {
        return this.prisma.rFS.findUnique({
            where: {
                id: rfsId
            }
        })
    }

    public async getAllRfs(userId: number) {
        return this.prisma.rFS.findMany({
            where: {
                userId
            },
            include: {
                predictedCracks: true
            }
        })
    }

    public async saveRfs(rfsCreateInput: RfsCreateInput) {
        return this.prisma.rFS.create({
            data: {
                testName: rfsCreateInput.testName,
                mode1: rfsCreateInput.mode1,
                mode2: rfsCreateInput.mode2,
                mode3: rfsCreateInput.mode3,
                mode4: rfsCreateInput.mode4,
                mode5: rfsCreateInput.mode5,
                mode6: rfsCreateInput.mode6,
                mode7: rfsCreateInput.mode7,
                mode8: rfsCreateInput.mode8,
                user: {
                    connect: {
                        id: rfsCreateInput.userId
                    }
                }
            }
        })
    }
}