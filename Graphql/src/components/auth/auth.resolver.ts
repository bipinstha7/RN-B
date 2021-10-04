const authResolvers = {
  Query: {
    me: () => {
      return {
        id: 1,
        email: 'bipin',
        token: 'jfkdjfdkd',
      };
    },
  },

  Mutation: {
    login: async (_, { email }) => {
      const user = { token: '', id: 4, email: '444' };
      if (user) {
        user.token = Buffer.from(email).toString('base64');
        return user;
      }
    },
  },
};

export default authResolvers;
