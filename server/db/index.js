const conn = require('./conn');
const User = require('./User');

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [bos] = await Promise.all([
    User.create({ username: 'bos', password: '123' }),
  ]);

  return {
    users: {
      bos,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
};
