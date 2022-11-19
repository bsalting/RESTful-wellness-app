const conn = require('./conn');
const User = require('./User');

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [Beejay] = await Promise.all([
    User.create({ username: 'Beejay', password: '123' }),
  ]);

  return {
    users: {
      Beejay,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
};
