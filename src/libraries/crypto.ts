import * as bcrypt from 'bcryptjs'

export const compareEncryptedPass = (unencryptedPassword: string, hashedPassword: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(unencryptedPassword, hashedPassword, (error, res) => {
            if (error) reject(error)

            resolve(res)    
        })
    });
}

export const encryptPassword = (password: string, salt: number | string): Promise<string> => {
    return bcrypt.hash(password, salt)
}