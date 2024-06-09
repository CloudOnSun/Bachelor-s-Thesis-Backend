export const fileSchema = {
  type: "object",
  properties: {
    file: {
      type: "PersistentFile",
      description: "File with frequencies",
    },
  },
  required: ["file"],
  additionalProperties: false,
};