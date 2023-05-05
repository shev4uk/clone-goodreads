const { User } = require("../models/User.js");
const { hashPassword, comparePassword, createToken } = require('../utils/auth.js');

const userResolver = {
  Mutation: {
    create: async (parent, { input }) => {
      const { name, email, password } = input;
      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create user
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
      return newUser;
    },

    loginUser: async (parent, { input }) => {
      const { email, password } = input;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Compare passwords
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      // Create token
      const token = createToken(user);

      return { token, user };
    }
  },
};

module.exports = { userResolver };