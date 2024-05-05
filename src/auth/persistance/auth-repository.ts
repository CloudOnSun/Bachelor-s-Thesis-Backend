import {PrismaClient, User} from "@prisma/client";
import {SignUpPayload} from "../types/SignUpPayload";
import {UserCreatInput} from "../types/UserCreatInput";

export default class AuthRepository {

    private prisma = new PrismaClient()
    public async findUser(email: string): Promise<User> {
        return this.prisma.user.findUnique({
            where: {
                email: email,
            }
        })
    }

    public async addUser(user: UserCreatInput): Promise<User> {
        return this.prisma.user.create({
            data: {...user}
        })
    }
}