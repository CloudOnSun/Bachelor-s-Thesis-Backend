export type LogInDTO = {
    accessToken: string
    user: {
        id: number,
        email: string,
        name: string,
    }
}