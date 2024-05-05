export const signUpSchema = {
    type: "object",
    properties: {
        email: {
            type: "string",
            description: "Email of the user",
            pattern: "^\\S+@\\S+\\.\\S+$",
        },
        password: {
            type: "string",
            description: "Password of the user",
            minLength: 4,
            maxLength: 24,
        },
        name: {
            type: "string",
            description: "Name of the user",
        }
    },
    required: ["email", "password", "name"],
    additionalProperties: false,
};