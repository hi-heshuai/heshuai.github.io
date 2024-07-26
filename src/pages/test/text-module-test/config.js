export const createSchema = (info) => {
  return {
    type: 'object',
    properties: {
      ...info
    }
  };
}