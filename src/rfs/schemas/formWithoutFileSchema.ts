export const formWithoutFileSchema = {
  type: "object",
  properties: {
    testName: {
      type: "string",
      description: "Name of the test",
    },
  },
  required: ["testName"],
  additionalProperties: false,
};