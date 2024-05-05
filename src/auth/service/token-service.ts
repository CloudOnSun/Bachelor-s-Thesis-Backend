import * as jwt from "jsonwebtoken";
import * as process from "node:process";
import {User} from "@prisma/client";


export default class TokenService {
    private async generateToken(
        payload: Object,
        salt: string,
        options: jwt.SignOptions
    ): Promise<string> {
        return new Promise((res, rej) => {
            jwt.sign(payload, salt, options, (err, token) => {
                if (err) {
                    return rej(err);
                }
                res(token!);
            });
        });
    }

    public generateAccessToken(user: User): Promise<string> {
        return this.generateToken({id: user.id, email: user.email}, process.env.ACCESS_TOKEN_SALT, {
            expiresIn: process.env.TOKEN_EXPIRES_IN,
        });
    }

    private static verifyToken(token: string, salt: string): Promise<jwt.JwtPayload> {
        return new Promise((res, rej) => {
            jwt.verify(token, salt, (err, decoded: jwt.JwtPayload) => {
                if (err) {
                    return rej(err);
                }
                res(decoded);
            });
        });
    }

    public static verifyAccessToken(token: string): Promise<jwt.JwtPayload> {
        return this.verifyToken(token, process.env.ACCESS_TOKEN_SALT);
    }
}