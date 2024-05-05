import {LogInPayload} from "../types/LogInPayload";
import TokenService from "./token-service";
import AuthRepository from "../persistance/auth-repository";
import {compareEncryptedPass, encryptPassword} from "../../libraries/crypto";
import {SignUpPayload} from "../types/SignUpPayload";
import * as process from "node:process";
import {UserCreatInput} from "../types/UserCreatInput";
import {LogInDTO} from "../types/LogInDTO";

export default class AuthService {

    private tokenService = new TokenService()
    private authRepo = new AuthRepository()

    public async loginUser(credentials: LogInPayload): Promise<LogInDTO> {
        const user = await this.authRepo.findUser(credentials.email)
        if (!user) {
            throw(new Error('Incorrect email'));
        }
        const passwordCorrect = await compareEncryptedPass(credentials.password, user.password)
        if (!passwordCorrect) {
            throw(new Error('Incorrect password'));
        }

        return {accessToken: await this.tokenService.generateAccessToken(user), user: {
            id: user.id,
            email: user.email,
            name: user.name
            }}
    }

    public async signUpUser(userPayload: SignUpPayload): Promise<LogInDTO> {
        const userExists = await this.authRepo.findUser(userPayload.email)
        if (userExists) {
            throw(new Error('User already exists'))
        }
        const cryptedPassword = await encryptPassword(userPayload.password, 8)
        const userCreateInput: UserCreatInput = {
            email: userPayload.email,
            password: cryptedPassword,
            name: userPayload.name
        }
        const user = await this.authRepo.addUser(userCreateInput);
        return {accessToken: await this.tokenService.generateAccessToken(user), user: {
            id: user.id,
            email: user.email,
            name: user.name
            }}
    }
}