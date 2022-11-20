const conn = require('./conn');
const User = require('./User');

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [beejay] = await Promise.all([
    User.create({ username: 'beejay', password: '123' }),
  ]);

  return {
    users: {
      beejay,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
};
