const addUserSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
  required: [
    'username',
    'email',
    'password',
  ],
  additionalProperties: false,
};

const loginUserSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
  required: [
    'email',
    'password',
  ],
  additionalProperties: false,
};

export {
  addUserSchema,
  loginUserSchema,
};
