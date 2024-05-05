import {PrismaClient} from "@prisma/client";
import {DamageCreateInput} from "../types/DamageCreateInput";

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
}