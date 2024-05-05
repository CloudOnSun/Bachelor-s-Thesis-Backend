export const loginSchema = {
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
  },
  required: ["email", "password"],
  additionalProperties: false,
};